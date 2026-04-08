import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Top Leaders List
const topLeaders = [
  {
    id: "lead-1",
    name: "Dr. S. B. Somani",
    role: "Principal",
    img: "/team/principal_c.png",
  },
  {
    id: "lead-2",
    name: "Dr. D. P. Tulaskar",
    role: "Faculty Advisor",
    img: "/team/tulaskar.jpg",
  },
  {
    id: "lead-3",
    name: "Mr. U. A. Jawadekar",
    role: "Faculty Advisor",
    img: "/team/UAJ.jpg",
  },
  {
    id: "lead-4",
    name: "Dr. Wechansing Suliya",
    role: "Faculty Advisor",
    img: "/team/WZSuliya.jpg",
  },
  {
    id: "lead-5",
    name: "Mrs. Snehal Gachke",
    role: "Faculty Advisor",
    img: "/team/gachke.jpg",
  },
];

// Extended team members list
const teamMembers = [
  {
    id: 1,
    name: "Vedanshu Bhole",
    role: "General Secretary",
    img: "/team/vedanshu-bhole.jpg",
    linkedin: "https://www.linkedin.com/in/vedanshu-bhole-232a782a3/",
    instagram: "https://www.instagram.com/ved.14_?igsh=YXc3ZG0xcTEycDM5",
  },
  {
    id: 2,
    name: "Bhumika Thakare",
    role: "Girls Representative",
    img: "/team/Bhumika-Thakare.jpg",
    instagram: "https://www.instagram.com/breezy_b27?igsh=MWF6OWVjdWJqbWoxYg==",
    linkedin: "https://www.linkedin.com/in/bhumika-thakare",
  },
  {
    id: 3,
    name: "Yash Dubey",
    role: "Cultural Secretary",
    img: "/team/yash-dubey.jpg",
    instagram:
      "https://www.instagram.com/_yash_dubey_0205_?igsh=MjMybmI3cGdwdmdp",
    linkedin: "https://in.linkedin.com/in/yash-dubey-466b4325a",
  },
  {
    id: 4,
    name: "Atharv Nage",
    role: "Management Team",
    img: "/team/adesh.jpeg",
    instagram: "https://www.instagram.com/adesh_nage_?igsh=c3UzcHZ2dGRndjMy",
  },
  {
    id: 5,
    name: "Pratik Tayde",
    role: "Management Team",
    img: "/team/Pratik-Tayde.jpg",
    instagram: "https://www.instagram.com/prxtikk_7?igsh=eXFkYWQ3dTNpcnl0",
    linkedin: "https://www.linkedin.com/in/pratiktayde9922",
  },
  {
    id: 6,
    name: "Aman Kodwani",
    role: "Management Team",
    img: "/team/Aman-Kodwani.jpg",
    instagram:
      "https://www.instagram.com/aman_kodwani_?igsh=MTJydDllMGc3bjh3OA==",
    linkedin: "https://www.linkedin.com/in/aman-kodwani-21859325b",
  },
  {
    id: 7,
    name: "Vivek Sawant",
    role: "Management Team",
    img: "/team/sawant.png",
    instagram: "https://www.instagram.com/vive_ksawant?igsh=OHM4b3Q4M2E0amR0",
  },
  {
    id: 8,
    name: "Shivam Mehenge",
    role: "Management Team",
    img: "/team/mehenge.png",
    instagram:
      "https://www.instagram.com/shivam_mehenge_321?igsh=MTV0b2l3dHQxb2Y5ZQ==",
  },
  {
    id: 9,
    name: "Shambhu Chavan",
    role: "Management Team",
    img: "/team/Shambhu.png",
    instagram:
      "https://www.instagram.com/shambhu_chavan25?igsh=MXY0Z3M4c2tlbHhvNw==",
  },
  {
    id: 10,
    name: "Rutuja Gadam",
    role: "Management Team",
    img: "/team/Rutuja-Gadam.jpg",
    instagram: "https://www.instagram.com/rutu_gadam?igsh=MWd6dHE4aHF4NDhscA==",
  },
  {
    id: 11,
    name: "Sharvari Deshmukh",
    role: "Management Team",
    img: "/team/Sharvari-Deshmukh.jpg",
    instagram: "https://www.instagram.com/sharvari.d__?igsh=NWN1ZmwzeHZ4cTF3",
    linkedin: "https://www.linkedin.com/in/sharvari-deshmukh-1a1a08257/",
  },
  {
    id: 12,
    name: "Apurv Gore",
    role: "Technical Team",
    img: "/team/apurv-gore.jpg",
    linkedin: "https://www.linkedin.com/in/apurvsprofile/",
  },
  {
    id: 13,
    name: "Devesh Pawar",
    role: "Technical Team",
    img: "/team/Devesh-Pawar.jpg",
    instagram: "https://www.instagram.com/deveshpawar__30",
    linkedin: "https://www.linkedin.com/in/devesh-pawar-74a52b294/",
  },
  {
    id: 14,
    name: "Piyush Agroya",
    role: "Technical Team",
    img: "/team/piyush-agroya.jpg",
    instagram:
      "https://www.instagram.com/pixel_piyushhhh?igsh=MXJhZ3VrdjA1c3locA==",
    linkedin: "https://www.linkedin.com/in/piyush-agroya-devx1602/",
  },
  {
    id: 15,
    name: "Nandini Jambhulkar",
    role: "Technical Team",
    img: "/team/nandini-jambhulkar.jpg",
    linkedin: "https://www.linkedin.com/in/nandini-jambhulkar-11978125b/",
  },
  {
    id: 16,
    name: "Devendra Sawdekar",
    role: "Technical Team",
    img: "/team/Devendra sawdekar.png",
    instagram:
      "https://www.instagram.com/bhraman_boy03?igsh=MWNlMTRqaGRvc3NvMA==",
    linkedin:
      "https://www.linkedin.com/in/devendra-sawdekar-a1681625b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 17,
    name: "Vedant Wadode",
    role: "Publicity Team",
    img: "/team/Vedant Wadode.jpg",
    instagram: "https://www.instagram.com/yaarvedantt?igsh=bGkzdGJza2ZwaDRy",
    linkedin: "https://www.linkedin.com/in/vedant-wadode-1a5190260/",
  },
  {
    id: 18,
    name: "Jay Joshi",
    role: "Content Creator",
    img: "/team/Jay Joshi.jpeg",
    instagram: "https://www.instagram.com/jayjoshi864?igsh=czZ4cjJsbnNocGV4",
    linkedin:
      "https://www.linkedin.com/in/jay-joshi-ba778325b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 19,
    name: "Ayush Thute",
    role: "Content Creator",
    img: "/team/Ayush-Thute.jpg",
    instagram: "https://www.instagram.com/ayyuu.ssshh?igsh=OGl6d3hsOGRsbDRh",
    linkedin: "linkedin.com/in/ayush-thute-0725b5275/",
  },
  {
    id: 20,
    name: "Nikhil Junare",
    role: "Content Creator",
    img: "/team/nikhil-junare.jpg",
    instagram: "https://www.instagram.com/nick_junare?igsh=b3lhYzU0YzRicHhn",
    linkedin: "https://www.linkedin.com/in/nikhil-junare-8b4103260/",
  },
  {
    id: 21,
    name: "Mansi Paraskar",
    role: "Decoration Team",
    img: "/team/mansi-paraskar.jpg",
    linkedin: "https://www.linkedin.com/in/mansi-paraskar-55b607260",
  },
  {
    id: 22,
    name: "Rutuja Balsaraf",
    role: "Decoration Team",
    img: "/team/Rutuja Balsaraf.jpg",
    instagram: "https://www.instagram.com/_rutu2510_?igsh=ZjRxZGFucDl2bGRk",
    linkedin: "https://www.linkedin.com/in/rutuja-balsaraf-435780324/",
  },
  {
    id: 23,
    name: "Shweteshwari Solanke",
    role: "Decoration Team",
    img: "/team/Shweteshwari-Solanke.jpg",
    instagram:
      "https://www.instagram.com/shweteshwari_01?igsh=MXcyMDBua3ZqODAzZg==",
  },
  {
    id: 24,
    name: "Vijaya Shegokar",
    role: "Decoration Team",
    img: "/team/Vijaya-Shegokar.jpeg",
    instagram:
      "https://www.instagram.com/aishwarya.verse?igsh=b2xjcTcyaG4yenU4",
    linkedin:
      "https://www.linkedin.com/in/vijaya-shegokar-42271b257?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 25,
    name: "Janvi Wakde",
    role: "Decoration Team",
    img: "/team/Janvi-Wakde.png",
    instagram: "https://www.instagram.com/janviiwakde?igsh=a3R5YmloZzRsbXk5",
    linkedin: "https://www.linkedin.com/in/janvi-wakde/",
  },
  {
    id: 26,
    name: "Samiksha Daberao",
    role: "Discipline Committee",
    img: "/team/boxer.jpg",
    instagram: "https://www.instagram.com/Samiksha_daberao",
  },
  {
    id: 27,
    name: "Rohit Dautpure",
    role: "Discipline Committee",
    img: "/team/rohit-dautpure.png",
    instagram:
      "https://www.instagram.com/rohit_dautpure?igsh=MWU2bDVvMGdwOGhpdw==",
    linkedin: "https://www.linkedin.com/in/rohit-dautpure-963185260/",
  },
  {
    id: 28,
    name: "Aniket Ingle",
    role: "Discipline Committee",
    img: "/team/aniket-ingle.png",
    instagram: "https://www.instagram.com/aniket_ingle07?igsh=aXA3bzVxYTcyN3gz",
  },
  {
    id: 29,
    name: "Devashish Sadavarte",
    role: "Discipline Committee",
    img: "/team/deva.png",
    instagram: "https://www.instagram.com/m_r_v_a_l?igsh=eWxhMmN5a3p1N2Fl",
  },
  {
    id: 30,
    name: "Ayush Ardak",
    role: "Treasurer",
    img: "/team/Ayush-Ardak.jpg",
    instagram: "https://www.instagram.com/ayush_ardak?igsh=NnQ3aTZsNXd5dGFn",
    linkedin:
      "https://www.linkedin.com/in/ayush-ardak-796105269?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 31,
    name: "Kartik Yeul",
    role: "Treasurer",
    img: "/team/Kartik-Yeul.jpg",
    instagram:
      "https://www.instagram.com/kartik_0650?igsh=MTc2ZWExZGpkbDRkMg==",
  },
  {
    id: 32,
    name: "Rasika Kulkarni",
    role: "Dance Club",
    img: "/team/Rasika-kulkarni.jpg",
    instagram:
      "https://www.instagram.com/rasika.__k?igsh=MnJ4NHp1YXIxcHcy&utm_source=qr",
    linkedin:
      "https://www.linkedin.com/in/rasika-kulkarni-305022289?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
  {
    id: 33,
    name: "Kushal Lambhate",
    role: "Music Club",
    img: "/team/kushal.jpg",
    instagram:
      "https://www.instagram.com/kushallambhate1535?igsh=dXh6a3d3bzF3ZTVj",
    linkedin: "https://www.linkedin.com/in/kushal-lambhate-75088325b/",
  },
  {
    id: 34,
    name: "Pratik Birpan",
    role: "Drama Club",
    img: "/team/birpan.png",
    instagram: "https://www.instagram.com/pratikbirpan03?igsh=ejB5Mm90YXF5Nmo3",
  },
  {
    id: 35,
    name: "Chetan Tidake",
    role: "TechBox",
    img: "/team/chetu.jpg",
    instagram:
      "https://www.instagram.com/mr_chetanpatil6890?igsh=endhOXpkMjVjand2",
    linkedin:
      "https://www.linkedin.com/in/chetan-tidake-042ba125b?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  },
];

const Team = () => {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const cursorRef = useRef(null);

  // Split the leadership array
  const principal = topLeaders[0];
  const facultyAdvisors = topLeaders.slice(1);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const slider = sliderRef.current;

      const getScrollAmount = () => {
        let sliderWidth = slider.scrollWidth;
        return -(sliderWidth - window.innerWidth);
      };

      // Horizontally slide the whole container
      const tween = gsap.to(slider, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${slider.scrollWidth - window.innerWidth}`,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    // ⚡ SUPER OPTIMIZED: Use gsap.quickTo() for cursor tracking to reduce CPU load drastically
    if (window.innerWidth >= 768) {
      // Create performant setters mapping directly to transform styling
      const xTo = gsap.quickTo(cursorRef.current, "x", {
        duration: 0.4,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(cursorRef.current, "y", {
        duration: 0.4,
        ease: "power3.out",
      });

      const moveCursor = (e) => {
        xTo(e.clientX);
        yTo(e.clientY);
      };

      window.addEventListener("mousemove", moveCursor);

      return () => {
        ctx.revert();
        window.removeEventListener("mousemove", moveCursor);
      };
    } else {
      return () => ctx.revert();
    }
  }, []);

  const handleMouseEnter = () => {
    if (window.innerWidth >= 768) {
      gsap.to(cursorRef.current, {
        scale: 3,
        backgroundColor: "#5724ff",
        opacity: 0.5,
        duration: 0.3,
      });
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 768) {
      gsap.to(cursorRef.current, {
        scale: 1,
        backgroundColor: "#edff66",
        opacity: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <div className="relative bg-black overflow-hidden selection:bg-violet-300 selection:text-black">
      {/* ⚡ OPTIMIZED: Added will-change-transform for smooth GPU acceleration */}
      <div
        ref={cursorRef}
        className="hidden md:block fixed top-0 left-0 w-4 h-4 bg-yellow-300 rounded-full pointer-events-none z-50 mix-blend-difference transform -translate-x-1/2 -translate-y-1/2 will-change-transform"
      />

      {/* --- LEADER HIERARCHY SECTION --- */}
      <section className="relative w-full min-h-screen bg-black flex flex-col justify-center items-center py-24 z-10">
        <div className="text-center mb-10 md:mb-16 px-5">
          <h1 className="text-4xl md:text-7xl font-zentry text-blue-50 tracking-wide uppercase">
            Cultural Council
          </h1>
          <h2 className="text-2xl md:text-4xl font-general text-yellow-300 mt-1">
            Leadership
          </h2>
        </div>

        <div className="flex flex-col w-full max-w-[95%] xl:max-w-[90%] mx-auto px-5 gap-10 md:gap-16">
          {/* 👑 ROW 1: PRINCIPAL (CENTERED) */}
          <div className="flex justify-center w-full">
            <div
              key={principal.id}
              className="group relative w-full sm:w-[400px] md:w-[450px] h-[450px] md:h-[550px] overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-yellow-300/30 hover:border-yellow-300/80 transition-all duration-500 shadow-[0_0_30px_rgba(253,224,71,0.05)] hover:shadow-[0_0_40px_rgba(253,224,71,0.2)]"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={principal.img}
                  alt={principal.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 ease-in-out md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-105 pointer-events-auto"
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

          {/* 👥 ROW 2: FACULTY ADVISORS (4-GRID) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full">
            {facultyAdvisors.map((leader) => (
              <div
                key={leader.id}
                className="group relative w-full h-[380px] md:h-[480px] overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-white/5 hover:border-white/30 transition-all duration-500"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <img
                    src={leader.img}
                    alt={leader.name}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 ease-in-out md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-110 pointer-events-auto"
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

      {/* --- ScrollTrigger Section for Core Team Slider --- */}
      <section
        ref={sectionRef}
        className="h-dvh bg-black flex flex-col justify-center relative overflow-hidden"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-300/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="absolute top-10 md:top-16 left-5 md:left-20 z-10">
          <h1 className="text-4xl md:text-7xl font-zentry text-blue-50 tracking-wide uppercase">
            Cultural Council
          </h1>
          <h2 className="text-2xl md:text-4xl font-general text-yellow-300 mt-1">
            Core Team
          </h2>
        </div>

        {/* ⚡ OPTIMIZED: Added will-change-transform for smooth horizontal scrolling */}
        <div
          className="flex mt-32 md:mt-16 pl-5 md:pl-20 will-change-transform"
          ref={sliderRef}
        >
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group relative w-[280px] sm:w-[320px] md:w-[450px] h-[380px] md:h-[520px] mr-6 md:mr-8 flex-shrink-0 overflow-hidden rounded-2xl cursor-pointer bg-zinc-900 border border-white/5 hover:border-white/20 transition-all duration-500"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <img
                  src={member.img}
                  alt={member.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover grayscale opacity-70 transition-all duration-700 ease-in-out md:group-hover:grayscale-0 md:group-hover:opacity-100 md:group-hover:scale-110 pointer-events-auto"
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
                      className="p-2.5 md:p-3 rounded-full bg-blue-50/10 backdrop-blur-md border border-blue-50/20 text-blue-50 hover:bg-violet-300 hover:text-white transition-all duration-300 cursor-pointer"
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
                        className="md:w-[24px] md:h-[24px]"
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
                      className="p-2.5 md:p-3 rounded-full bg-blue-50/10 backdrop-blur-md border border-blue-50/20 text-blue-50 hover:bg-blue-300 hover:text-black transition-all duration-300 cursor-pointer"
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
                        className="md:w-[24px] md:h-[24px]"
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
      </section>
    </div>
  );
};

export default Team;
