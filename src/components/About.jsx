import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // 📝 TEXT ANIMATION: Smooth fade-up for the subtext
      gsap.fromTo(
        textRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%", // Triggers when the top of the section hits 80% down the viewport
            toggleActions: "play none none reverse",
          },
        },
      );

      const mm = gsap.matchMedia();

      // 📱 MOBILE + TABLET
      mm.add("(max-width: 768px)", () => {
        gsap.fromTo(
          ".mask-clip-path",
          {
            width: "90%",
            height: "45vh",
            borderRadius: 20,
          },
          {
            width: "100%",
            height: "55vh",
            borderRadius: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#clip",
              start: "top 70%",
              end: "top 20%",
              scrub: true,
            },
          },
        );
      });

      // 💻 DESKTOP
      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#clip",
            start: "center center",
            end: "+=800",
            scrub: 0.6,
            pin: true,
          },
        });

        tl.to(".mask-clip-path", {
          width: "80vw",
          height: "80vh",
          borderRadius: 0,
          ease: "power2.inOut",
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="about"
      className="w-full min-h-screen overflow-hidden bg-white"
    >
      {/* 🔹 HEADER - Added z-10 so it doesn't get hidden behind anything */}
      <div className="relative z-10 flex flex-col items-center gap-5 mt-24 md:mt-36 mb-12 px-4 text-center">
        <p className="font-general text-xs uppercase text-gray-600 tracking-widest">
          Welcome to the Cultural Council
        </p>

        <AnimatedTitle
          title="REWRITING THE HISTORY OF <br /> OUR <b>C</b>AMPUS"
          containerClass="mt-5 !text-black text-center"
        />

        {/* Added ref here for the new GSAP animation */}
        <div
          ref={textRef}
          className="mt-6 max-w-2xl text-sm md:text-lg font-circular-web text-center opacity-0"
        >
          <p className="font-medium text-black">
            Some events happen every year.
          </p>
          <p className="text-gray-500 mt-2">
            Others happen once and change absolutely everything. For the very
            first time, we brought unprecedented, monumental celebrations to
            life right here on campus. We didn't just raise the bar; we became
            the bar.
          </p>
        </div>
      </div>

      {/* 🔹 IMAGE SECTION */}
      <div
        id="clip"
        className="relative w-full h-[60vh] md:h-screen overflow-hidden"
      >
        <div
          className="
            mask-clip-path
            absolute top-1/2 left-1/2
            -translate-x-1/2 -translate-y-1/2
            w-[90%] md:w-[28vw]
            h-[45vh] md:h-[30vw]
            overflow-hidden
            rounded-2xl md:rounded-3xl shadow-2xl
          "
        >
          <img
            src="/img/bg-pd-2.png"
            alt="Parampara Highlight"
            className="w-full h-full object-contain md:object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
