import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  // Helper function to split words into individual letters
  const renderWord = (word) => {
    return word.split("").map((char, index) => (
      <span key={index} className="relative inline-block group">
        {/* Layer 1: The Hollow Outline (Always visible) */}
        <span
          className="
            block text-transparent 
            [-webkit-text-stroke:1px_#1d4ed8] md:[-webkit-text-stroke:2px_#1d4ed8] lg:[-webkit-text-stroke:3px_#1d4ed8]
          "
        >
          {char}
        </span>

        {/* Layer 2: Refined 4-Color Gradient Fill (Fades in smoothly on hover) */}
        <span
          className="
            absolute inset-0 text-transparent bg-clip-text 
            /* Beautifully blended Purple -> Blue -> Orange -> Red */
            bg-[linear-gradient(135deg,#8B5CF6_0%,#3B82F6_35%,#F97316_70%,#EF4444_100%)]
            opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out
          "
        >
          {char}
        </span>
      </span>
    ));
  };

  return (
    <footer className="w-full bg-[#5542ff] text-black overflow-hidden relative pt-10 md:pt-16">
      <div className="container mx-auto px-4 sm:px-6 md:px-12 flex flex-col gap-8 md:gap-10">
        {/* Top Row: Info & Socials */}
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Fest Name & Copyright */}
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl font-robert-medium font-bold uppercase tracking-widest">
              Cultural Council
            </p>
            <p className="text-xs md:text-sm font-circular-web font-medium mt-1 opacity-90">
              © {new Date().getFullYear()} Cultural Council. All rights
              reserved.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-start">
            <a
              href="https://www.instagram.com/cultural_council_ssgmce?igsh=amUyZG5weTY4a3Bm"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-black bg-transparent transition-all duration-500 ease-[cubic-bezier(0.87,0,0.13,1)] hover:bg-black hover:text-[#5542ff] hover:scale-110 hover:-translate-y-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            >
              <FaInstagram className="text-2xl md:text-3xl transition-transform duration-500 group-hover:rotate-12" />
            </a>
          </div>
        </div>

        {/* Massive Background Text */}
        <div className="flex flex-col justify-center items-center w-full cursor-crosshair">
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold uppercase leading-none text-center flex flex-col items-center">
            <div className="flex">{renderWord("Cultural")}</div>
            <div className="flex">{renderWord("Council")}</div>
          </h1>
        </div>
      </div>

      <div className="flex items-center justify-center w-full p-4 md:p-8 mt-4">
        <div className="group relative cursor-none">
          {/* Animated background glow that appears on hover */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 via-blue-500 to-yellow-300 rounded-full blur opacity-0 group-hover:opacity-50 transition duration-500"></div>

          {/* Main pill container */}
          <h1 className="relative flex flex-wrap items-center justify-center gap-x-1 bg-black border border-white/10 px-5 py-1 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full text-[10px] sm:text-xs md:text-sm lg:text-base text-gray-400 font-circular-web text-center transform transition-all duration-300 ease-out group-hover:scale-[1] group-hover:border-white/20">
            <span className="transition-colors duration-300 group-hover:text-blue-50">
              Crafted with Creativity by
            </span>

            {/* Highlighted text with gradient */}
            <span className="font-bold tracking-wide bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent group-hover:from-yellow-300 group-hover:to-yellow-500 transition-all duration-500">
              Technical Team
            </span>

            <span className="transition-colors duration-300 group-hover:text-blue-50">
              of Cultural Council
            </span>
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
