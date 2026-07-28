import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="relative w-full border-t border-white/[0.06] bg-[#0A0A0F] py-10"
    >
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12">
        <div className="flex items-center gap-2.5">
          <img src="/logo.png" alt="Calliope Logo" className="h-8 w-8 object-contain" />
          <span className="font-extrabold tracking-[0.2em] text-white text-lg sm:text-xl">
            CΛLL<span className="text-violet-400 font-normal">i</span>OPE
          </span>
        </div>
        <p className="text-[#9E9BAE] text-xs text-center">
          © {new Date().getFullYear()} Calliope.
        </p>
        <div className="flex items-center gap-5 text-xs font-medium text-[#9E9BAE]">
          <a href="https://github.com/johanmanoj-dev" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            About
          </a>
        </div>
      </div>
    </footer>
  );
}
