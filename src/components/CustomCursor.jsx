import { useEffect, useRef } from "react";
import gsap from "gsap";

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    // ⚡ SUPER OPTIMIZED: Pre-compile the animation handlers
    const xTo = gsap.quickTo(cursorRef.current, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(cursorRef.current, "y", {
      duration: 0.3,
      ease: "power3.out",
    });

    const moveCursor = (e) => {
      // Fire the compiled handlers directly
      xTo(e.clientX - 20);
      yTo(e.clientY - 20);
    };

    window.addEventListener("mousemove", moveCursor);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-10 h-10 border-2 border-red-200 rounded-full pointer-events-none z-[9999] will-change-transform hidden md:block"
    />
  );
};

export default CustomCursor;
