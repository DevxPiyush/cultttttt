import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaLinkedin, FaInstagram, FaTimes } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const Team = ({ topLeaders = [], teamMembers = [] }) => {
  const sliderRef = useRef(null);
  const facultyRef = useRef(null);
  const [activeTeam, setActiveTeam] = useState(null);

  const principal =
    topLeaders.find((l) => l.role === "Principal") || topLeaders[0];
  const facultyAdvisors = topLeaders.filter(
    (l) => l.role === "Faculty Advisor",
  );

  // 1. Process data to combine Clubs and merge TechBox into Technical
  const processedMembers = teamMembers.map((m) => {
    if (["Dance Club", "Music Club", "Drama Club"].includes(m.role)) {
      return { ...m, displayCategory: "Clubs" };
    }
    if (m.role === "TechBox" || m.role === "Technical Team") {
      return { ...m, displayCategory: "Technical Team" };
    }
    return { ...m, displayCategory: m.role };
  });

  // GS, GR, and Cultural Secretary stay as full cards
  const leadRoles = [
    "General Secretary",
    "Girls Representative",
    "Cultural Secretary",
  ];
  const coreLeads = processedMembers.filter((m) => leadRoles.includes(m.role));

  // Create unique vertical blocks from the "displayCategory"
  const teamCategories = [
    ...new Set(
      processedMembers
        .filter((m) => !leadRoles.includes(m.role))
        .map((m) => m.displayCategory),
    ),
  ];

  // --- SCALE UP ANIMATION (ON SCROLL) ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faculty-card", {
        scale: 0.5,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: facultyRef.current,
          start: "top 85%",
        },
      });

      gsap.from(".hub-item", {
        scale: 0.3,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: sliderRef.current,
          start: "top 95%",
        },
      });
    }, [facultyRef, sliderRef]);
    return () => ctx.revert();
  }, []);

  // Smooth slide-in for expansion
  useEffect(() => {
    if (activeTeam) {
      gsap.fromTo(
        ".injected-member",
        { width: 0, opacity: 0, scale: 0.5 },
        {
          width: "auto",
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power4.out",
        },
      );
    }
  }, [activeTeam]);

  return (
    <div className="relative bg-black text-white selection:bg-yellow-300 overflow-x-hidden">
      {/* --- LEADERSHIP SECTION --- */}
      <section ref={facultyRef} className="py-24 px-5 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-7xl font-zentry text-blue-50 uppercase tracking-wide">
            Cultural Council
          </h1>
          <h2 className="text-2xl md:text-4xl font-general text-yellow-300 mt-1 uppercase tracking-widest">
            Leadership
          </h2>
        </div>

        {principal && (
          <div className="flex justify-center mb-12 faculty-card">
            <div className="relative w-full max-w-[420px] h-[450px] md:h-[550px] overflow-hidden rounded-3xl border border-white/10 group shadow-[0_0_40px_rgba(255,255,255,0.05)]">
              <img
                src={principal.img}
                alt={principal.name}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-0 p-8 text-center w-full">
                <h3 className="text-3xl font-normal text-white uppercase">
                  {principal.name}
                </h3>
                <p className="text-yellow-300 text-sm uppercase tracking-widest mt-2">
                  {principal.role}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {facultyAdvisors.map((adv) => (
            <div
              key={adv.id}
              className="faculty-card relative h-[380px] overflow-hidden rounded-2xl border border-white/5 bg-zinc-900 group"
            >
              <img
                src={adv.img}
                alt={adv.name}
                className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 p-6 z-10">
                <h3 className="text-xl font-normal text-white uppercase leading-none">
                  {adv.name}
                </h3>
                <p className="text-violet-300 text-xs uppercase tracking-widest mt-1">
                  {adv.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- CONTINUOUS HUB SECTION --- */}
      <section className="py-20 min-h-[80vh] flex flex-col justify-center bg-zinc-950/20">
        <div className="px-5 md:px-20 mb-10">
          <h1 className="text-4xl md:text-8xl font-zentry text-blue-50 uppercase tracking-wide">
            Core Council
          </h1>
        </div>

        <div className="overflow-x-auto no-scrollbar px-5 md:px-20">
          <div className="flex gap-6 items-center w-max pb-10" ref={sliderRef}>
            {coreLeads.map((member) => (
              <div key={member.id} className="hub-item">
                <MemberCard member={member} />
              </div>
            ))}

            {teamCategories.map((cat) => (
              <div key={cat} className="flex gap-4 items-center">
                <div
                  onClick={() => setActiveTeam(activeTeam === cat ? null : cat)}
                  className={`hub-item group relative w-[120px] md:w-[160px] h-[400px] md:h-[500px] rounded-2xl border transition-all duration-500 cursor-pointer flex flex-col items-center justify-center overflow-visible flex-shrink-0 ${
                    activeTeam === cat
                      ? "bg-yellow-300 border-yellow-300 shadow-[0_0_40px_rgba(253,224,71,0.4)]"
                      : "bg-zinc-900 border-white/20 hover:border-yellow-300"
                  }`}
                >
                  <div className="h-full flex items-center justify-center">
                    <h3
                      className={`vertical-text text-2xl md:text-4xl font-zentry uppercase tracking-[0.15em] transition-colors whitespace-nowrap ${
                        activeTeam === cat
                          ? "text-black"
                          : "text-white group-hover:text-yellow-300"
                      }`}
                    >
                      {cat}
                    </h3>
                  </div>
                  <div
                    className={`absolute bottom-6 transition-transform ${activeTeam === cat ? "rotate-180 text-black" : "text-yellow-300 animate-bounce"}`}
                  >
                    {activeTeam === cat ? <FaTimes size={24} /> : "↓"}
                  </div>
                </div>

                {activeTeam === cat && (
                  <div className="flex gap-4">
                    {processedMembers
                      .filter((m) => m.displayCategory === cat)
                      .map((member) => (
                        <div key={member.id} className="injected-member">
                          <MemberCard member={member} />
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
          display: inline-block;
          line-height: 1;
        }
        @media (max-width: 768px) {
          .vertical-text { font-size: 1.4rem; }
        }
      `}</style>
    </div>
  );
};

const MemberCard = ({ member }) => (
  <div className="group relative w-[280px] md:w-[380px] h-[400px] md:h-[500px] flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all duration-500 hover:border-yellow-300/40">
    <img
      src={member.img}
      alt={member.name}
      className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10" />
    <div className="absolute bottom-0 left-0 w-full p-8 z-20">
      <h3 className="text-2xl md:text-4xl font-zentry uppercase text-blue-50 leading-tight">
        {member.name}
      </h3>
      <p className="text-yellow-300 text-xs md:text-sm uppercase tracking-widest mt-2 font-medium">
        {member.role}
      </p>
    </div>
    <div className="absolute top-5 right-5 flex flex-col gap-3 z-20 opacity-0 group-hover:opacity-100 translate-x-3 group-hover:translate-x-0 transition-all">
      {member.linkedin && (
        <a
          href={member.linkedin}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-black/60 rounded-full border border-white/10 hover:bg-blue-600"
        >
          <FaLinkedin size={18} />
        </a>
      )}
      {member.instagram && (
        <a
          href={member.instagram}
          target="_blank"
          rel="noreferrer"
          className="p-2.5 bg-black/60 rounded-full border border-white/10 hover:bg-pink-600"
        >
          <FaInstagram size={18} />
        </a>
      )}
    </div>
  </div>
);

export default Team;
