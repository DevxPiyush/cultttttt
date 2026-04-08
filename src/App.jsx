import { useState, useEffect, useRef, Suspense, lazy } from "react";
import NavBar from "./components/Navbar";
import Hero from "./components/Hero";
import CustomCursor from "./components/CustomCursor";

// 1️⃣ DYNAMIC IMPORTS: This splits your code into smaller chunks.
// These won't be downloaded until they are actually needed.
const About = lazy(() => import("./components/About"));
const Features = lazy(() => import("./components/Features"));
const Story = lazy(() => import("./components/Story"));
const Team = lazy(() => import("./components/Team"));
const Footer = lazy(() => import("./components/Footer"));

// 2️⃣ CUSTOM LAZY RENDER WRAPPER
// This watches the scroll position and renders children only when they get close.
const LazySection = ({ children, placeholderHeight = "100vh" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once it has rendered
        }
      },
      // rootMargin: "300px" means it will start rendering 300px BEFORE
      // it enters the screen, ensuring it's ready by the time the user sees it.
      { rootMargin: "300px" },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    // We give it a temporary height so the page has scrollable space
    // before the actual components load in.
    <div
      ref={sectionRef}
      style={{ minHeight: isVisible ? "auto" : placeholderHeight }}
    >
      {isVisible ? children : null}
    </div>
  );
};

function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden cursor-none bg-black">
      <CustomCursor />

      {/* ⚡ ALWAYS LOAD AT START: NavBar and Hero are above the fold, 
          so we never lazy load them. We want them visible instantly. */}
      <NavBar />
      <Hero />

      {/* 🚀 LAZY LOADED SECTIONS */}
      <Suspense fallback={null}>
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
          <Team />
        </LazySection>

        <LazySection placeholderHeight="20vh">
          <Footer />
        </LazySection>
      </Suspense>
    </main>
  );
}

export default App;
