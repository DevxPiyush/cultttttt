import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

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
  const videoRefs = useRef([]);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => Math.min(prev + 1, SLIDES.length));
  };

  const handleVideoError = () => {
    // Treat failed assets as "resolved" so the loader cannot get stuck forever.
    setLoadedVideos((prev) => Math.min(prev + 1, SLIDES.length));
  };

  // Prevent layout jumps by refreshing ScrollTrigger after the loading screen disappears
  useEffect(() => {
    if (loadedVideos === SLIDES.length) {
      setLoading(false);
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [loadedVideos]);

  useEffect(() => {
    // Final safety net in case media events do not fire on a slow/unreliable network.
    const fallbackTimer = setTimeout(() => setLoading(false), 4000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setDirection(1);
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [currentIndex]);

  // CPU Optimization: Pause videos that are not currently visible
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === currentIndex || index === prevIndex) {
        video.play().catch((err) => console.log("Autoplay prevented:", err));
      } else {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, prevIndex]);

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

  // Text & Progress Animations
  useGSAP(
    () => {
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
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        { width: "100%", duration: 6, ease: "none" },
      );
    },
    { dependencies: [currentIndex, prevIndex, direction] },
  );

  // 🌟 THE FIX: "Normal & Sexy" Scroll Animation
  useGSAP(() => {
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // 1. NORMAL: Force it to start 100% full screen on load
      gsap.set("#video-frame", {
        clipPath: "inset(0% 0% 0% 0% round 0px)",
      });

      // 2. SEXY: Smoothly shrink into a rounded floating card ONLY when scrolling down
      gsap.to("#video-frame", {
        clipPath: isMobile
          ? "inset(4% 2% 8% 2% round 24px)" // Tighter margins for mobile
          : "inset(8% 4% 12% 4% round 32px)", // Cinematic margins for PC
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#video-frame",
          start: "center center",
          end: "bottom center",
          scrub: 0.5,
          fastScrollEnd: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden bg-black">
      {/* Loading Screen fades out smoothly */}
      <div
        className={`fixed inset-0 z-[100] flex-center h-dvh w-screen bg-violet-50 transition-opacity duration-1000 ${loading ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <div className="three-body">
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
          <div className="three-body__dot"></div>
        </div>
      </div>

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden bg-blue-75 group transform-gpu"
      >
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 z-50">
          <div
            ref={progressRef}
            className="h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.8)]"
          />
        </div>

        {/* Videos */}
        <div className="absolute left-0 top-0 size-full">
          {SLIDES.map((slide, index) => (
            <video
              key={slide.src}
              id={`video-${index}`}
              ref={(el) => (videoRefs.current[index] = el)}
              src={slide.src}
              loop
              muted
              playsInline
              onLoadedData={handleVideoLoad}
              onError={handleVideoError}
              className="absolute left-0 top-0 size-full object-cover object-center transform-gpu"
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

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-4 sm:left-10 top-1/2 z-50 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white opacity-0 transition-all duration-300 hover:bg-black/60 hover:scale-110 group-hover:opacity-100"
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
          className="absolute right-4 sm:right-10 top-1/2 z-50 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white opacity-0 transition-all duration-300 hover:bg-black/60 hover:scale-110 group-hover:opacity-100"
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

        {/* Foreground Text */}
        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 max-sm:!text-[22vw]">
          C<b>O</b>uncil 2025-26
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full pointer-events-none flex flex-col justify-start">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100 max-sm:!text-[22vw]">
              CUltu<b>r</b>al
            </h1>
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

      {/* Background Text (Revealed on Scroll) */}
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-zinc-800 max-sm:!text-[22vw]">
        C<b>O</b>uncil 2025-26
      </h1>
    </div>
  );
};

export default Hero;
