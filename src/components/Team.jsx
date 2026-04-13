// src/components/Team.jsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Team = ({ topLeaders = [], teamMembers = [] }) => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);

  const principal = topLeaders.length > 0 ? topLeaders[0] : null;
  const facultyAdvisors = topLeaders.length > 1 ? topLeaders.slice(1) : [];

  // 1. INDIVIDUAL CARD ANIMATION OBSERVER
  useEffect(() => {
    // This observer checks if the card is in the active "focus" area of the mobile screen
    const observerOptions = {
      root: null, // viewport
      rootMargin: "-20% 0px -20% 0px", // Triggers when card is in the middle 60% of the screen
      threshold: 0.6, // Requires 60% of the card to be visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Card enters the focus area
          entry.target.classList.add("is-active");
        } else {
          // Card leaves the focus area
          entry.target.classList.remove("is-active");
        }
      });
    }, observerOptions);

    const cards = document.querySelectorAll(".team-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [topLeaders, teamMembers]);

  // 2. GSAP SCROLL LOGIC (DESKTOP)
  useEffect(() => {
    if (teamMembers.length === 0) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const slider = sliderRef.current;
        const getScrollAmount = () => -(slider.scrollWidth - window.innerWidth);

        gsap.to(slider, {
          x: getScrollAmount,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            pin: true,
            start: "top top",
            end: () => `+=${slider.scrollWidth - window.innerWidth}`,
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [teamMembers]);

  return (
    <div className="relative bg-black overflow-hidden selection:bg-violet-300">
      {/* --- LEADERSHIP SECTION --- */}
      {principal && (
        <section className="relative w-full min-h-screen bg-black flex flex-col justify-center items-center py-24 px-5">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-7xl font-zentry text-blue-50 uppercase tracking-wide">
              Cultural Council
            </h1>
            <h2 className="text-2xl md:text-4xl font-general text-yellow-300 mt-1">
              Leadership
            </h2>
          </div>

          <div className="flex flex-col w-full max-w-7xl gap-10">
            <div className="flex justify-center">
              <div className="team-card group relative w-full max-w-[450px] h-[450px] md:h-[550px] overflow-hidden rounded-2xl border border-yellow-300/20 bg-zinc-900 transition-all duration-500">
                <img
                  src={principal.img}
                  alt={principal.name}
                  className="card-img w-full h-full object-cover grayscale opacity-60 transition-all duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-0 p-8 text-center w-full z-10">
                  <h3 className="text-3xl text-blue-50 font-circular-web">
                    {principal.name}
                  </h3>
                  <p className="text-yellow-300 uppercase tracking-widest text-sm">
                    {principal.role}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {facultyAdvisors.map((leader) => (
                <div
                  key={leader.id}
                  className="team-card group relative h-[380px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-900 transition-all duration-500"
                >
                  <img
                    src={leader.img}
                    alt={leader.name}
                    className="card-img w-full h-full object-cover grayscale opacity-60 transition-all duration-700 ease-in-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-6 z-10">
                    <h3 className="text-xl text-blue-50 font-circular-web">
                      {leader.name}
                    </h3>
                    <p className="text-violet-300 text-sm uppercase">
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
          className="min-h-screen md:h-dvh w-full bg-black flex flex-col justify-center relative overflow-hidden py-20 md:py-0"
        >
          <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 z-50">
            <div className="flex items-center justify-between gap-4 px-6 py-3 rounded-full border border-violet-400/30 bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(167,139,250,0.2)] animate-bounce min-w-[240px]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse [animation-delay:0.2s]" />
                </div>
                <span className="hidden md:block text-violet-200 font-robert-medium text-xs uppercase tracking-[0.2em]">
                  Scroll to view team
                </span>
                <span className="block md:hidden text-violet-200 font-robert-medium text-[10px] uppercase tracking-[0.15em]">
                  Slide right to view team
                </span>
              </div>
              <svg
                className="w-4 h-4 text-violet-300 transition-transform duration-500 md:rotate-90 rotate-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </div>
          </div>

          <div className="absolute top-10 left-5 md:left-20 z-10">
            <h1 className="text-4xl md:text-7xl font-zentry text-blue-50 uppercase tracking-wide">
              Cultural Council
            </h1>
            <h2 className="text-2xl md:text-4xl font-general text-yellow-300 mt-1">
              Core Team
            </h2>
          </div>

          <div className="w-full overflow-x-auto md:overflow-hidden no-scrollbar">
            <div
              className="flex mt-20 md:mt-16 pl-5 md:pl-20 pr-5 md:pr-20 w-max"
              ref={sliderRef}
            >
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="team-card group relative w-[280px] md:w-[450px] h-[400px] md:h-[520px] mr-6 md:mr-8 flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all duration-500"
                >
                  <div className="absolute inset-0 pointer-events-none">
                    <img
                      src={member.img}
                      alt={member.name}
                      className="card-img w-full h-full object-cover grayscale opacity-70 transition-all duration-700 ease-in-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 z-10">
                    <h3 className="text-2xl md:text-5xl font-circular-web text-blue-50">
                      {member.name}
                    </h3>
                    <p className="text-base md:text-xl font-robert-medium text-violet-300">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* On Mobile/Small screens, trigger animation via IntersectionObserver */
        @media (max-width: 767px) {
          .team-card.is-active {
            border-color: rgba(167, 139, 250, 0.6);
            box-shadow: 0 0 30px rgba(167, 139, 250, 0.15);
          }
          
          .team-card.is-active .card-img {
            filter: grayscale(0%);
            opacity: 1;
            transform: scale(1.08);
          }
        }

        /* On Desktop, trigger animation via Hover only */
        @media (min-width: 768px) {
          .team-card:hover {
            border-color: rgba(167, 139, 250, 0.6);
          }
          
          .team-card:hover .card-img {
            filter: grayscale(0%);
            opacity: 1;
            transform: scale(1.1);
          }
        }
      `}</style>
    </div>
  );
};

export default Team;
