import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";

const NavBar = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  const audioRef = useRef(null);
  const navRef = useRef(null);

  const { y: scrollY } = useWindowScroll();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Use refs to avoid re-rendering dependencies constantly
  const navAnimationRef = useRef(null);

  const toggleAudio = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  useEffect(() => {
    if (!audioRef.current) return;

    if (isAudioPlaying) {
      audioRef.current
        .play()
        .catch((e) => console.log("Audio autoplay prevented", e));
    } else {
      audioRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Handle Scroll state
  useEffect(() => {
    if (scrollY === 0) {
      setIsVisible(true);
    } else if (scrollY > lastScroll) {
      setIsVisible(false); // Scrolling down
    } else if (scrollY < lastScroll) {
      setIsVisible(true); // Scrolling up
    }
    setLastScroll(scrollY);
  }, [scrollY, lastScroll]);

  // ⚡ HIGH PERFORMANCE NAVBAR ANIMATION
  useEffect(() => {
    if (!navRef.current) return;

    if (!navAnimationRef.current) {
      // Initialize the quickTo instance once
      navAnimationRef.current = {
        y: gsap.quickTo(navRef.current, "y", {
          duration: 0.4,
          ease: "power3.out",
        }),
        opacity: gsap.quickTo(navRef.current, "opacity", {
          duration: 0.4,
          ease: "power3.out",
        }),
      };
    }

    navAnimationRef.current.y(isVisible ? 0 : -100);
    navAnimationRef.current.opacity(isVisible ? 1 : 0);
  }, [isVisible]);

  return (
    <div
      ref={navRef}
      className="fixed left-1/2 top-4 z-50 -translate-x-1/2 will-change-transform"
    >
      <nav
        className="
        group relative flex items-center justify-between
        px-4 py-2 rounded-full
        bg-black/60 backdrop-blur-lg border border-white/10
        shadow-[0_4px_30px_rgba(0,0,0,0.5)]
        w-[140px] hover:w-[380px]
        transition-all duration-500 overflow-hidden
      "
      >
        <img
          src="/img/logo.webp"
          alt="logo"
          loading="lazy" // ⚡ Opt
          className="w-8 h-8 rounded-full shrink-0 z-10 border border-white/20"
        />

        <p
          className="
          absolute left-16 text-white text-sm whitespace-nowrap
          opacity-0 translate-x-[-20px] font-robert-medium tracking-wide
          group-hover:opacity-100 group-hover:translate-x-0
          transition-all duration-500 cursor-pointer
        "
          onClick={toggleAudio}
        >
          Enter into the Culture
        </p>

        <button
          onClick={toggleAudio}
          className="flex items-center gap-[3px] ml-auto z-10"
        >
          <audio
            ref={audioRef}
            className="hidden"
            src="/audio/loop.mp3"
            loop
            preload="none"
          />

          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className={clsx("spotify-bar", {
                active: isIndicatorActive,
              })}
              style={{ animationDelay: `${bar * 0.15}s` }}
            />
          ))}
        </button>
      </nav>
    </div>
  );
};

export default NavBar;
