import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onPreOrderClick: () => void;
  onContactClick: () => void;
}

export default function Header({ onPreOrderClick, onContactClick }: HeaderProps) {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-gray-100"
      id="main-header"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Logos */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img 
            src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
            alt="Base.vn Logo" 
            className="h-5 sm:h-6 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-gray-300 font-light text-lg">|</span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-gray-900 leading-none">Amber Note</span>
            <span className="text-[9px] font-mono tracking-wider text-gray-400 mt-0.5 uppercase leading-none">AI Recording</span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('difference-section')}
            className="text-xs font-medium text-gray-600 hover:text-black transition-colors"
          >
            Tính năng
          </button>
          <button
            onClick={() => scrollToSection('trusted-enterprises')}
            className="text-xs font-medium text-gray-600 hover:text-black transition-colors"
          >
            Đối tác
          </button>
          <button
            onClick={() => scrollToSection('flow-section')}
            className="text-xs font-medium text-gray-600 hover:text-black transition-colors"
          >
            Luồng Hoạt Động
          </button>
          <button
            onClick={() => scrollToSection('compare-section')}
            className="text-xs font-medium text-gray-600 hover:text-black transition-colors"
          >
            So Sánh
          </button>
          <button
            onClick={() => scrollToSection('demo-playground')}
            className="text-xs font-medium text-gray-600 hover:text-black transition-colors"
          >
            Trải nghiệm AI
          </button>
          <button
            onClick={() => scrollToSection('specs-section')}
            className="text-xs font-medium text-gray-600 hover:text-black transition-colors"
          >
            Thông Số
          </button>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <a
            href="https://base.vn/dang-ky-demo?utm_source=ambernote-hearder"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-full border border-gray-200 text-xs font-medium text-gray-700 hover:bg-gray-50 active:scale-98 transition-all"
          >
            Tư vấn doanh nghiệp
          </a>
          <button
            onClick={onPreOrderClick}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-black text-white text-xs font-medium hover:bg-neutral-800 active:scale-98 shadow-sm transition-all gap-1.5"
          >
            Đặt trước
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
