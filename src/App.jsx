import { useState, useEffect, useRef, Suspense, lazy } from "react";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";

// ⚡ IMPORT YOUR EXTRACTED TEAM DATA HERE
import { topLeaders, teamMembers } from "./constants/teamdata.js";

// 1️⃣ DYNAMIC IMPORTS
const About = lazy(() => import("./components/About"));
const Features = lazy(() => import("./components/Features"));
const Story = lazy(() => import("./components/Story"));
const Team = lazy(() => import("./components/Team"));
const Footer = lazy(() => import("./components/Footer"));

// 2️⃣ CUSTOM LAZY RENDER WRAPPER (With Spinner)
const LazySection = ({ children, placeholderHeight = "100vh" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 🌀 Tailwind Loading Spinner Fallback
  const LoadingFallback = (
    <div
      className="flex items-center justify-center w-full"
      style={{ minHeight: placeholderHeight }}
    >
      <div className="w-10 h-10 border-4 border-gray-800 border-t-white rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div
      ref={sectionRef}
      style={{ minHeight: isVisible ? "auto" : placeholderHeight }}
    >
      {isVisible ? (
        <Suspense fallback={LoadingFallback}>{children}</Suspense>
      ) : null}
    </div>
  );
};

function App() {
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  useEffect(() => {
    const updateCursorVisibility = () => {
      const isDesktopWidth = window.innerWidth >= 768;
      const hasFinePointer = window.matchMedia(
        "(hover: hover) and (pointer: fine)",
      ).matches;
      setShowCustomCursor(isDesktopWidth && hasFinePointer);
    };

    updateCursorVisibility();
    window.addEventListener("resize", updateCursorVisibility);

    return () => {
      window.removeEventListener("resize", updateCursorVisibility);
    };
  }, []);

  return (
    <main
      className={`relative min-h-screen w-screen overflow-x-hidden bg-black ${
        showCustomCursor ? "cursor-none" : "cursor-auto"
      }`}
    >
      {showCustomCursor ? <CustomCursor /> : null}

      {/* ⚡ ALWAYS LOAD AT START */}
      <NavBar />
      <Hero />

      {/* 🚀 LAZY LOADED SECTIONS WITH INDIVIDUAL SUSPENSE BOUNDARIES */}
      <LazySection>
        <About />
      </LazySection>

      <LazySection>
        <Features />
      </LazySection>

      <LazySection>
        <Story />
      </LazySection>

      <LazySection>
        {/* 🎯 PASS THE DATA AS PROPS HERE */}
        <Team topLeaders={topLeaders} teamMembers={teamMembers} />
      </LazySection>

      <LazySection placeholderHeight="20vh">
        <Footer />
      </LazySection>
    </main>
  );
}

export default App;
