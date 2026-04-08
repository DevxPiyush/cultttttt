import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

// 🎥 DYNAMIC SLIDES: Grand, cinematic text focusing on tradition and an unprecedented legacy.
const SLIDES = [
  {
    src: "videos/hero-1.mp4",
    title: "Timeless Tradition",
    description:
      "Honoring the ancient echoes of our past.\nWitness the dawn of a new era.",
  },
  {
    src: "videos/hero-2.mp4",
    title: "Unprecedented",
    description:
      "A spectacle unlike anything ever witnessed in history.\nPrepare for an experience beyond imagination.",
  },
  {
    src: "videos/hero-3.mp4",
    title: "The Legacy",
    description:
      "Forging greatness that will echo through time.\nMasterfully brought to life by the Technical Team.",
  },
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(SLIDES.length - 1);
  const [direction, setDirection] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const timerRef = useRef(null);
  const progressRef = useRef(null);

  // 🛠️ NEW: Array of refs to control every video instance independently
  const videoRefs = useRef([]);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedVideos === SLIDES.length) {
      setLoading(false);
    }
  }, [loadedVideos]);

  // ⏱️ AUTO-PLAY LOGIC (6 seconds)
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);

    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  // 🚀 PERFORMANCE OPTIMIZATION: Play/Pause logic based on active state
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      // Only play the video if it's the current one, or the one transitioning out
      if (index === currentIndex || index === prevIndex) {
        // We use a promise catch here because some browsers strictly block programmatic playback
        video.play().catch((err) => console.log("Autoplay prevented:", err));
      } else {
        // Force pause background videos to save CPU/GPU and Battery
        video.pause();
        // Reset the video so it starts from the beginning next time it slides in
        video.currentTime = 0;
      }
    });
  }, [currentIndex, prevIndex]);

  // 🔘 MANUAL CONTROLS
  const handleNext = () => {
    setDirection(1);
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setPrevIndex(currentIndex);
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  // 🎬 DYNAMIC SLIDE, TEXT & PROGRESS ANIMATION
  useGSAP(
    () => {
      // 1. Video Slide Animation
      gsap.fromTo(
        `#video-${currentIndex}`,
        { xPercent: direction * 100 },
        { xPercent: 0, duration: 1.5, ease: "expo.inOut" },
      );

      gsap.fromTo(
        `#video-${prevIndex}`,
        { xPercent: 0 },
        { xPercent: direction * -30, duration: 1.5, ease: "expo.inOut" },
      );

      // 2. Text Reveal Animation
      gsap.fromTo(
        ".animated-text",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          delay: 0.5,
        },
      );

      // 3. Progress Bar Animation
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration: 6, ease: "none" },
      );
    },
    {
      dependencies: [currentIndex, prevIndex, direction],
    },
  );

  // 📜 SCROLL ANIMATION
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 💻 DESKTOP
      mm.add("(min-width: 768px)", () => {
        gsap.set("#video-frame", {
          clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
          borderRadius: "0% 0% 40% 10%",
        });
        gsap.from("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0% 0% 0% 0%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#video-frame",
            start: "center center",
            end: "bottom center",
            scrub: 0.5,
          },
        });
      });

      // 📱 MOBILE
      mm.add("(max-width: 767px)", () => {
        gsap.set("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 85%, 0% 95%)",
          borderRadius: "0% 0% 10% 10%",
        });
        gsap.from("#video-frame", {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          borderRadius: "0% 0% 0% 0%",
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: "#video-frame",
            start: "center center",
            end: "bottom center",
            scrub: 0.5,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {/* LOADING SCREEN */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75 group"
      >
        {/* ⏳ PROGRESS BAR */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 z-50">
          <div
            ref={progressRef}
            className="h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </div>

        {/* ✨ DYNAMIC VIDEO SLIDER ✨ */}
        <div className="absolute left-0 top-0 size-full">
          {SLIDES.map((slide, index) => (
            <video
              key={slide.src}
              id={`video-${index}`}
              // 🛠️ FIXED: Add the ref to our array and REMOVE 'autoPlay'
              ref={(el) => (videoRefs.current[index] = el)}
              src={slide.src}
              loop
              muted
              playsInline // Important for mobile optimization
              onLoadedData={handleVideoLoad}
              className="absolute left-0 top-0 size-full object-cover object-center"
              style={{
                zIndex:
                  currentIndex === index ? 20 : prevIndex === index ? 10 : 0,
                visibility:
                  currentIndex === index || prevIndex === index
                    ? "visible"
                    : "hidden",
              }}
            />
          ))}
        </div>

        {/* 🔘 NAVIGATION BUTTONS */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-10 top-1/2 z-50 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 transition-all duration-300 hover:bg-white/30 hover:scale-110 group-hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 sm:w-8 sm:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute right-4 sm:right-10 top-1/2 z-50 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 transition-all duration-300 hover:bg-white/30 hover:scale-110 group-hover:opacity-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-6 h-6 sm:w-8 sm:h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        {/* BOTTOM RIGHT STATIC TEXT */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 max-sm:!text-[22vw]">
          C<b>O</b>uncil
        </h1>

        {/* ✨ DYNAMIC TEXT OVERLAYS ✨ */}
        <div className="absolute left-0 top-0 z-40 size-full pointer-events-none flex flex-col justify-start">
          <div className="mt-24 md:mt-24 px-5 sm:px-10">
            {/* Main Cultural Heading (Static) */}
            <h1 className="special-font hero-heading text-blue-100 max-sm:!text-[22vw]">
              CUltu<b>r</b>al
            </h1>

            {/* Changing Content */}
            <div className="mt-2">
              <h2 className="animated-text text-2xl md:text-4xl font-bold text-blue-50 drop-shadow-lg uppercase tracking-wider mb-2">
                {SLIDES[currentIndex].title}
              </h2>
              <p className="animated-text max-w-74 font-robert-regular text-blue-100 md:text-lg drop-shadow-md whitespace-pre-line">
                {SLIDES[currentIndex].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* BACKGROUND SHADOW TEXT */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black max-sm:!text-[22vw]">
        C<b>O</b>uncil
      </h1>
    </div>
  );
};

export default Hero;
