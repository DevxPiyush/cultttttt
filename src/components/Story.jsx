import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const frameRef = useRef(null);
  const containerRef = useRef(null);

  const teamPhotos = [
    "/img/team-1.jpg",
    "/img/team-2.jpg",
    "/img/team-3.jpg",
    "/img/team-4.jpg",
    "/img/team-5.jpg",
    "/img/team-6.jpg",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // ⏱️ AUTOMATIC IMAGE CYCLER (Changes every 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % teamPhotos.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [teamPhotos.length]);

  // 📜 SCROLL ANIMATION (Upgraded for perfect responsiveness)
  useEffect(() => {
    const element = frameRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 📱 MOBILE
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          element,
          {
            width: "85%", // Use % instead of vw to prevent overflow
            height: "400px",
            borderRadius: "20px",
          },
          {
            width: "100%", // Expands safely within the container
            height: "60vh", // Use vh so it doesn't stretch too long on mobile
            borderRadius: "0px",
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // 💻 DESKTOP
      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          element,
          {
            width: "320px",
            height: "420px",
            borderRadius: "20px",
          },
          {
            width: "100%", // Use 100% instead of 100vw
            height: "100vh",
            borderRadius: "0px",
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 90%",
              scrub: true,
            },
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 🖱️ 3D MOUSE HOVER ANIMATION
  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;

    const element = frameRef.current;
    if (!element) return;

    const rect = element.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    gsap.to(element, {
      rotateX,
      rotateY,
      transformPerspective: 600,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(frameRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
    });
  };

  return (
    <div
      ref={containerRef}
      id="story"
      // Changed w-screen to w-full overflow-hidden to prevent horizontal scrollbars
      className="min-h-[200vh] w-full overflow-hidden bg-black text-blue-50"
    >
      <div className="flex flex-col items-center py-20 w-full">
        <p className="font-general text-sm uppercase md:text-[10px] tracking-widest text-gray-400">
          The Faces Behind the Hype
        </p>

        <AnimatedTitle
          title="MEET THE T<b>E</b>AM <br /> WHO RUNS IT <b>A</b>LL"
          containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
        />

        {/* 🔥 DYNAMIC IMAGE CONTAINER WITH SMOOTH TRANSITION */}
        <div className="mt-20 w-full flex justify-center px-4 md:px-0">
          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            // Removed fixed inline styles to let GSAP and Tailwind manage responsiveness
            className="relative overflow-hidden shadow-2xl will-change-transform bg-gray-900 w-[85%] md:w-[320px] h-[400px] md:h-[420px] rounded-[20px]"
          >
            {/* Smooth Cross-Fade Image Map */}
            {teamPhotos.map((photo, index) => (
              <img
                key={photo}
                src={photo}
                alt={`Cultural Council Team ${index + 1}`}
                // Changed size-full to w-full h-full for wider browser compatibility
                // Note: If faces are being cut off, change 'object-cover' to 'object-contain'
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  index === currentImageIndex
                    ? "opacity-100 z-10"
                    : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>
        </div>

        {/* 📝 TEXT CONTENT */}
        <div className="mt-40 w-full flex justify-center md:justify-end md:pr-20">
          <div className="max-w-sm text-center md:text-left px-5 md:px-0">
            <p className="text-violet-50 font-circular-web text-lg">
              Behind every deafening cheer, every massive stage, and every
              historic event stands this dedicated family. We are the architects
              of the main stage.
            </p>

            <a href="https://www.instagram.com/cultural_council_ssgmce?igsh=amUyZG5weTY4a3Bm">
              {" "}
              <Button
                title="Witness the Legacy"
                containerClass="mt-5 mx-auto md:mx-0"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Story;
