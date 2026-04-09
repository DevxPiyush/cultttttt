import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import Button from "./Button";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const frameRef = useRef(null);
  const containerRef = useRef(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const teamPhotos = [
    "/img/team-1.jpg",
    "/img/team-2.jpg",
    "/img/team-3.jpg",
    "/img/team-4.jpg",
    "/img/team-5.jpg",
    "/img/team-6.jpg",
  ];

  // Cache quick setters to eliminate CPU overhead during mousemove
  const hoverAnimRefs = useRef({});

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentImageIndex((prev) => (prev + 1) % teamPhotos.length),
      3000,
    );
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      if (!frameRef.current) return;

      // Initialize quick setters
      hoverAnimRefs.current = {
        x: gsap.quickTo(frameRef.current, "rotateY", {
          duration: 0.4,
          ease: "power3.out",
        }),
        y: gsap.quickTo(frameRef.current, "rotateX", {
          duration: 0.4,
          ease: "power3.out",
        }),
      };

      const mm = gsap.matchMedia();
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          frameRef.current,
          { width: "85%", height: "400px", borderRadius: "20px" },
          {
            width: "100%",
            height: "60vh",
            borderRadius: "0px",
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top center",
              end: "bottom top",
              scrub: 0.5,
              fastScrollEnd: true,
            },
          },
        );
      });

      mm.add("(min-width: 768px)", () => {
        gsap.fromTo(
          frameRef.current,
          { width: "320px", height: "420px", borderRadius: "20px" },
          {
            width: "100%",
            height: "100vh",
            borderRadius: "0px",
            ease: "power2.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 80%",
              end: "bottom 90%",
              scrub: 0.5,
              fastScrollEnd: true,
            },
          },
        );
      });
    },
    { scope: containerRef },
  );

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768 || !frameRef.current) return;
    const rect = frameRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y - rect.height / 2) / rect.height) * -8;
    const rotateY = ((x - rect.width / 2) / rect.width) * 8;

    // Use quick setters!
    hoverAnimRefs.current.y(rotateX);
    hoverAnimRefs.current.x(rotateY);
    gsap.set(frameRef.current, { transformPerspective: 600 });
  };

  const handleMouseLeave = () => {
    if (window.innerWidth < 768) return;
    hoverAnimRefs.current.y(0);
    hoverAnimRefs.current.x(0);
  };

  return (
    <div
      ref={containerRef}
      id="story"
      className="min-h-screen w-full overflow-hidden bg-black text-blue-50 transform-gpu pb-20"
    >
      <div className="flex flex-col items-center py-20 w-full">
        <p className="font-general text-sm uppercase md:text-[10px] tracking-widest text-gray-400">
          The Faces Behind the Hype
        </p>
        <AnimatedTitle
          title="MEET THE T<b>E</b>AM <br /> WHO RUNS IT <b>A</b>LL"
          containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
        />

        <div className="mt-20 w-full flex justify-center px-4 md:px-0">
          <div
            ref={frameRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative overflow-hidden shadow-2xl will-change-transform bg-gray-900 w-[85%] md:w-[320px] h-[400px] md:h-[420px] rounded-[20px] transform-gpu"
          >
            {teamPhotos.map((photo, index) => (
              <img
                key={photo}
                src={photo}
                alt={`Team ${index + 1}`}
                className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${index === currentImageIndex ? "opacity-100 z-10" : "opacity-0 z-0"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-20 md:mt-40 w-full flex justify-center md:justify-end md:pr-20">
          <div className="max-w-sm text-center md:text-left px-5 md:px-0">
            <p className="text-violet-50 font-circular-web text-lg">
              Behind every deafening cheer, every massive stage, and every
              historic event stands this dedicated family. We are the architects
              of the main stage.
            </p>
            <a
              href="https://www.instagram.com/cultural_council_ssgmce?igsh=amUyZG5weTY4a3Bm"
              target="_blank"
              rel="noopener noreferrer"
            >
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
