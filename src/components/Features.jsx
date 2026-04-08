import { useState, useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";
import gsap from "gsap";

export const BentoTilt = ({ children, className = "" }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (!itemRef.current) return;

    // ⚡ HIGH PERFORMANCE HOVER: gsap.quickTo
    const xTo = gsap.quickTo(itemRef.current, "rotationY", {
      duration: 0.5,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(itemRef.current, "rotationX", {
      duration: 0.5,
      ease: "power3.out",
    });

    const handleMouseMove = (event) => {
      const { left, top, width, height } =
        itemRef.current.getBoundingClientRect();
      const relativeX = (event.clientX - left) / width;
      const relativeY = (event.clientY - top) / height;

      const tiltX = (relativeY - 0.5) * 5;
      const tiltY = (relativeX - 0.5) * -5;

      xTo(tiltY);
      yTo(tiltX);

      gsap.set(itemRef.current, { scale: 0.98, transformPerspective: 700 });
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
      gsap.to(itemRef.current, { scale: 1, duration: 0.5, ease: "power3.out" });
    };

    itemRef.current.addEventListener("mousemove", handleMouseMove);
    itemRef.current.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      if (itemRef.current) {
        itemRef.current.removeEventListener("mousemove", handleMouseMove);
        itemRef.current.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={itemRef} className={`${className} will-change-transform`}>
      {children}
    </div>
  );
};

export const BentoCard = ({ src, title, description, ctaText, href }) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [hoverOpacity, setHoverOpacity] = useState(0);
  const hoverButtonRef = useRef(null);
  const videoRef = useRef(null);

  // 🚀 PERFORMANCE: IntersectionObserver for auto-pause background videos
  useEffect(() => {
    if (!videoRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current
            .play()
            .catch((e) => console.log("Autoplay blocked:", e));
        } else {
          videoRef.current.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (event) => {
    if (!hoverButtonRef.current) return;
    const rect = hoverButtonRef.current.getBoundingClientRect();

    setCursorPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => setHoverOpacity(1);
  const handleMouseLeave = () => setHoverOpacity(0);

  return (
    <div className="relative size-full overflow-hidden group">
      <video
        ref={videoRef}
        src={src}
        loop
        muted
        playsInline
        preload="none"
        className="absolute left-0 top-0 size-full object-cover object-center will-change-transform"
      />

      <div className="absolute inset-0 flex size-full flex-col justify-between p-5 transition-colors duration-500">
        <div>
          <h1 className="bento-title special-font mix-blend-difference text-yellow-300">
            {title}
          </h1>
          {/* 🎨 FLAWLESS BLENDING: Applied mix-blend-difference and pure white text */}
          {description && (
            <p className="mt-3 max-w-64 text-xs md:text-base text-white mix-blend-difference tracking-wide">
              {description}
            </p>
          )}
        </div>

        {ctaText && (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/80 hover:text-white transition-colors"
          >
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
              }}
            />
            <TiLocationArrow className="relative z-20" />
            <p className="relative z-20 font-bold">{ctaText}</p>
          </a>
        )}
      </div>
    </div>
  );
};

const Features = () => {
  const instaLink =
    "https://www.instagram.com/cultural_council_ssgmce?igsh=amUyZG5weTY4a3Bm";

  return (
    <section className="bg-black pb-52">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-circular-web text-lg text-blue-50 uppercase tracking-widest">
            Our Cultural Legacy
          </p>
          <p className="max-w-md font-circular-web text-lg text-blue-50 opacity-70 mt-4">
            Immerse yourself in the heartbeat of the campus. From the thunderous
            echoes of the Dhol-Tasha to the immense pride of our traditions,
            experience the memories that define our college life.
          </p>
        </div>

        {/* BIG HERO EVENT - PARAMPARA */}
        <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <BentoCard
            src="videos/parampara.mp4"
            title={
              <>
                p<b>a</b>rampara
              </>
            }
            description="The Grand Finale. Our tradition. Our pride. The biggest cultural extravaganza of the year. The climax of college life that every student waits for."
            ctaText="Experience the Magic"
            href={instaLink}
          />
        </BentoTilt>

        {/* 📐 FLAWLESS ASYMMETRICAL BENTO GRID FOR PC */}
        <div className="grid h-auto md:h-[80vh] w-full grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-7">
          {/* EVENT 2 - SHIVPARV (Tall Left Column) */}
          <BentoTilt className="bento-tilt_1 h-96 md:h-full md:col-span-1 md:row-span-2">
            <BentoCard
              src="videos/shivparv.mp4"
              title={
                <>
                  shivp<b>a</b>rv
                </>
              }
              description="The Royal Legacy. A grand tribute to the pride of Maharashtra. Saffron flags, powerful powadas, and an atmosphere filled with immense respect."
              ctaText="Feel the Pride"
              href={instaLink}
            />
          </BentoTilt>

          {/* EVENT 3 - ALUMNI MEET (Wide Top Right) */}
          <BentoTilt className="bento-tilt_1 h-96 md:h-full md:col-span-2 md:row-span-1">
            <BentoCard
              src="videos/hero-1.mp4"
              title={
                <>
                  alu<b>m</b>ni
                </>
              }
              description="The Homecoming. Reliving the golden days and making new memories with the seniors who started it all."
              ctaText="Relive Memories"
              href={instaLink}
            />
          </BentoTilt>

          {/* EVENT 4 - GANPATI (Small Bottom Middle) */}
          <BentoTilt className="bento-tilt_1 h-96 md:h-full md:col-span-1 md:row-span-1">
            <BentoCard
              src="videos/hero-3.mp4"
              title={
                <>
                  g<b>a</b>npati
                </>
              }
              description="The Devotion. The Dhol. Pure magic. The entire campus unites as Bappa arrives."
              ctaText="Watch the Vibe"
              href={instaLink}
            />
          </BentoTilt>

          {/* EVENT 5 - DAHIHANDI (Small Bottom Right) */}
          <BentoTilt className="bento-tilt_1 h-96 md:h-full md:col-span-1 md:row-span-1">
            <BentoCard
              src="videos/dahihandi.mp4"
              title={
                <>
                  dahih<b>a</b>ndi
                </>
              }
              description="The Unbreakable Chain. The roaring crowd, the teamwork, and that one perfect moment of victory."
              ctaText="Feel the Rush"
              href={instaLink}
            />
          </BentoTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
