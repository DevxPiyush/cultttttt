// src/components/Team.jsx

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ⚡️ Component now accepts props with empty array fallbacks
const Team = ({ topLeaders = [], teamMembers = [] }) => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const cursorRef = useRef(null);

  // Safely extract leaders if the array isn't empty
  const principal = topLeaders.length > 0 ? topLeaders[0] : null;
  const facultyAdvisors = topLeaders.length > 1 ? topLeaders.slice(1) : [];

  useEffect(() => {
    // If no team members exist, don't run the slider animation
    if (teamMembers.length === 0) return;

    let moveCursor;
    const ctx = gsap.context(() => {
      const slider = sliderRef.current;

      const getScrollAmount = () => -(slider.offsetWidth - window.innerWidth);

      gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${slider.offsetWidth - window.innerWidth}`,
          scrub: 0.5,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });

      if (window.innerWidth >= 768 && cursorRef.current) {
        gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(cursorRef.current, "x", {
          duration: 0.15,
          ease: "power3.out",
        });
        const yTo = gsap.quickTo(cursorRef.current, "y", {
          duration: 0.15,
          ease: "power3.out",
        });

        moveCursor = (e) => {
          xTo(e.clientX);
          yTo(e.clientY);
        };
        window.addEventListener("mousemove", moveCursor);
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      if (moveCursor) window.removeEventListener("mousemove", moveCursor);
    };
  }, [teamMembers]); // Re-run if the teamMembers prop changes

  const handleMouseEnter = () =>
    window.innerWidth >= 768 &&
    gsap.to(cursorRef.current, {
      scale: 3,
      backgroundColor: "#5724ff",
      opacity: 0.8,
      duration: 0.3,
    });
  const handleMouseLeave = () =>
    window.innerWidth >= 768 &&
    gsap.to(cursorRef.current, {
      scale: 1,
      backgroundColor: "#edff66",
      opacity: 1,
      duration: 0.3,
    });

  return (
    <div className="relative bg-black overflow-hidden selection:bg-violet-300 selection:text-black">
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-yellow-300 rounded-full pointer-events-none z-50 will-change-transform"
      />

      {/* --- LEADER HIERARCHY SECTION --- */}
      {principal && (
        <section className="relative w-full min-h-screen bg-black flex flex-col justify-center items-center py-24 z-10 transform-gpu">
          <div className="text-center mb-10 md:mb-16 px-5">
            <h1 className="text-4xl md:text-7xl font-zentry text-blue-50 tracking-wide uppercase">
              Cultural Council
            </h1>
            <h2 className="text-2xl md:text-4xl font-general text-yellow-300 mt-1">
              Leadership
            </h2>
          </div>

          <div className="flex flex-col w-full max-w-[95%] xl:max-w-[90%] mx-auto px-5 gap-10 md:gap-16">
            <div className="flex justify-center w-full">
              <div
                className="group relative w-full sm:w-[400px] md:w-[450px] h-[450px] md:h-[550px] overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-yellow-300/30 hover:border-yellow-300/80 transition-colors duration-500 shadow-[0_0_30px_rgba(253,224,71,0.05)] hover:shadow-[0_0_40px_rgba(253,224,71,0.2)] transform-gpu"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src={principal.img}
                    alt={principal.name}
                    decoding="async"
                    className="w-full h-full object-cover grayscale opacity-70 transition-[transform,filter,opacity] duration-700 ease-in-out md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105 pointer-events-auto"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-80" />
                </div>
                <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 transform transition-transform duration-500 md:group-hover:-translate-y-2 z-10 pointer-events-none flex flex-col items-center text-center">
                  <h3 className="text-3xl md:text-5xl font-circular-web text-blue-50 mb-1 drop-shadow-md">
                    {principal.name}
                  </h3>
                  <p className="text-lg md:text-xl font-robert-medium text-yellow-300 drop-shadow-md tracking-wider uppercase">
                    {principal.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
              {facultyAdvisors.map((leader) => (
                <div
                  key={leader.id}
                  className="group relative w-full h-[380px] md:h-[480px] overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-white/5 hover:border-white/30 transition-colors duration-500 transform-gpu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={leader.img}
                      alt={leader.name}
                      decoding="async"
                      className="w-full h-full object-cover grayscale opacity-70 transition-[transform,filter,opacity] duration-700 ease-in-out md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-110 pointer-events-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 transform transition-transform duration-500 md:group-hover:-translate-y-3 z-10 pointer-events-none">
                    <h3 className="text-2xl md:text-3xl font-circular-web text-blue-50 mb-1 drop-shadow-md">
                      {leader.name}
                    </h3>
                    <p className="text-base md:text-lg font-robert-medium text-violet-300 drop-shadow-md">
                      {leader.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* --- CORE TEAM SLIDER --- */}
      {teamMembers.length > 0 && (
        <section
          ref={sectionRef}
          className="h-dvh w-full bg-black flex flex-col justify-center relative overflow-hidden transform-gpu"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(167,139,250,0.08)_0%,transparent_60%)] pointer-events-none" />

          <div className="absolute top-10 md:top-16 left-5 md:left-20 z-10">
            <h1 className="text-4xl md:text-7xl font-zentry text-blue-50 tracking-wide uppercase">
              Cultural Council
            </h1>
            <h2 className="text-2xl md:text-4xl font-general text-yellow-300 mt-1">
              Core Team
            </h2>
          </div>

          <div className="w-full overflow-hidden">
            <div
              className="flex mt-32 md:mt-16 pl-5 md:pl-20 pr-5 md:pr-20 w-max transform-gpu"
              ref={sliderRef}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="group relative w-[280px] sm:w-[320px] md:w-[450px] h-[380px] md:h-[520px] mr-6 md:mr-8 flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-white/5 hover:border-white/20 transition-colors duration-500 transform-gpu"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <img
                      src={member.img}
                      alt={member.name}
                      decoding="async"
                      className="w-full h-full object-cover grayscale opacity-70 transition-[transform,filter,opacity] duration-700 ease-in-out md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-110 pointer-events-auto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-5 md:p-6 transform transition-transform duration-500 md:group-hover:-translate-y-3 z-10 pointer-events-none">
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-circular-web text-blue-50 mb-0.5">
                      {member.name}
                    </h3>
                    <p className="text-base sm:text-lg md:text-xl font-robert-medium text-violet-300 mb-4 md:mb-5">
                      {member.role}
                    </p>

                    <div className="flex gap-3 pointer-events-auto">
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 md:p-3 rounded-full bg-zinc-800/80 border border-blue-50/20 text-blue-50 hover:bg-violet-300 hover:text-white transition-colors duration-300 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="20"
                              height="20"
                              x="2"
                              y="2"
                              rx="5"
                              ry="5"
                            />
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                          </svg>
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2.5 md:p-3 rounded-full bg-zinc-800/80 border border-blue-50/20 text-blue-50 hover:bg-blue-300 hover:text-black transition-colors duration-300 cursor-pointer"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                            <rect width="4" height="12" x="2" y="9" />
                            <circle cx="4" cy="4" r="2" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Team;
