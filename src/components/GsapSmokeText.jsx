// src/components/GsapSmokeText.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GsapSmokeText = () => {
  const textWrapperRef = useRef(null);
  const colorRevealRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. The Scroll Fill Animation (Bottom to Top)
      gsap.fromTo(
        colorRevealRef.current,
        { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
        {
          clipPath: "polygon(0% -10%, 100% -10%, 100% 100%, 0% 100%)", // slightly past 0 to ensure full fill
          ease: "none",
          scrollTrigger: {
            trigger: textWrapperRef.current,
            start: "top 85%",
            end: "bottom 40%",
            scrub: 1, // Smooth scrub
          },
        },
      );

      // 2. Add a sexy scale-up effect as you scroll into the text
      gsap.fromTo(
        textWrapperRef.current,
        { scale: 0.9, opacity: 0.5 },
        {
          scale: 1.02,
          opacity: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: textWrapperRef.current,
            start: "top 95%",
            end: "center center",
            scrub: 1,
          },
        },
      );
    }, textWrapperRef);

    return () => ctx.revert();
  }, []);

  return (
    // Removed fixed 80vh height. It now naturally hugs the text size!
    <div
      ref={textWrapperRef}
      className="relative w-full flex justify-center py-8 md:py-12 bg-white overflow-hidden"
    >
      {/* LAYER 1: The Empty Outline */}
      <h1
        className="relative text-[15vw] md:text-[11vw] font-black uppercase leading-[0.9] text-center text-transparent"
        style={{ WebkitTextStroke: "2px #e5e7eb" }} // Light gray outline
      >
        CREATING
        <br />
        HISTORY
        {/* LAYER 2: The Vibrant Animated Fill */}
        <span
          ref={colorRevealRef}
          className="absolute left-0 top-0 w-full h-full text-transparent bg-clip-text"
          style={{
            // Ultra-vibrant sexy neon gradient
            backgroundImage:
              "linear-gradient(-45deg, #FF0055, #FFB800, #00FFAA, #0088FF, #FF0055)",
            backgroundSize: "400% 400%", // Much larger for more sweeping movement
            animation: "smokeSwirl 4s ease-in-out infinite", // Faster, smoother looping
            WebkitTextStroke: "0px", // Remove outline on the filled layer
            // Subtle pink drop-shadow to make it radiate
            filter: "drop-shadow(0px 10px 20px rgba(255, 0, 85, 0.3))",
          }}
        >
          CREATING
          <br />
          HISTORY
        </span>
      </h1>

      {/* Embedded CSS for the swirling gradient effect */}
      <style>{`
        @keyframes smokeSwirl {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
};

export default GsapSmokeText;
