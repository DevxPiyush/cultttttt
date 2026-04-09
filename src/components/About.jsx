// src/components/About.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import AnimatedTitle from "./AnimatedTitle";
import GsapSmokeText from "./GsapSmokeText";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full min-h-screen overflow-hidden bg-white"
    >
      {/* 🔹 HEADER - Changed mb-24 to mb-8 to kill the huge gap */}
      <div className="relative z-10 flex flex-col items-center gap-5 mt-24 md:mt-36 mb-8 px-4 text-center">
        <p className="font-general text-xs uppercase text-gray-600 tracking-widest">
          Welcome to the Cultural Council
        </p>

        <div ref={titleRef}>
          <AnimatedTitle
            title="REWRITING THE HISTORY OF <br /> OUR <b>C</b>AMPUS"
            containerClass="mt-5 !text-black text-center"
          />
        </div>
      </div>

      {/* 🔹 NEW VIBRANT ANIMATION SECTION */}
      <GsapSmokeText />
    </section>
  );
};

export default About;
