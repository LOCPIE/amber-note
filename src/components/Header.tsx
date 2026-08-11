import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Menu, X } from 'lucide-react';

interface HeaderProps {
  onPreOrderClick: () => void;
  onContactClick: () => void;
}

export default function Header({ onPreOrderClick, onContactClick }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
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
      className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100"
      id="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logos */}
        <div 
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer shrink-0 select-none" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <img 
            src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
            alt="Base.vn Logo" 
            className="h-5 sm:h-6 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
          <span className="text-gray-300 font-light text-base sm:text-lg">|</span>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-gray-900 leading-none">Amber Note</span>
            <span className="text-[8.5px] sm:text-[9px] font-mono tracking-wider text-gray-400 mt-0.5 uppercase leading-none">AI Recording</span>
          </div>
        </div>

        {/* Navigation Links - Optimized for Tablet (md) & Desktop (lg/xl) */}
        <nav className="hidden md:flex items-center gap-1.5 md:gap-3 lg:gap-6 xl:gap-8">
          <button
            onClick={() => scrollToSection('difference-section')}
            className="text-xs lg:text-sm font-medium text-gray-600 hover:text-black transition-colors px-1.5 py-1 whitespace-nowrap"
          >
            Tính Năng
          </button>
          <button
            onClick={() => scrollToSection('flow-section')}
            className="text-xs lg:text-sm font-medium text-gray-600 hover:text-black transition-colors px-1.5 py-1 whitespace-nowrap"
          >
            Luồng Hoạt Động
          </button>
          <button
            onClick={() => scrollToSection('demo-playground')}
            className="text-xs lg:text-sm font-medium text-gray-600 hover:text-black transition-colors px-1.5 py-1 whitespace-nowrap"
          >
            Trải Nghiệm AI
          </button>
          <button
            onClick={() => scrollToSection('compare-section')}
            className="text-xs lg:text-sm font-medium text-gray-600 hover:text-black transition-colors px-1.5 py-1 whitespace-nowrap"
          >
            So Sánh
          </button>
          <button
            onClick={() => scrollToSection('specs-section')}
            className="text-xs lg:text-sm font-medium text-gray-600 hover:text-black transition-colors px-1.5 py-1 whitespace-nowrap"
          >
            Thông Số
          </button>
        </nav>

        {/* CTAs & Mobile/Tablet Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={onContactClick}
            className="hidden md:inline-flex items-center justify-center px-3 md:px-3.5 lg:px-4 py-1.5 lg:py-2 rounded-full border border-gray-200 text-xs lg:text-[13px] font-medium text-gray-700 hover:bg-gray-50 active:scale-98 transition-all shrink-0 whitespace-nowrap"
          >
            Tư vấn doanh nghiệp
          </button>

          <button
            onClick={onPreOrderClick}
            className="inline-flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-600 text-white text-xs sm:text-[13px] font-medium hover:bg-blue-700 active:scale-98 shadow-md shadow-blue-600/20 transition-all gap-1 sm:gap-1.5 shrink-0 whitespace-nowrap"
          >
            Đặt trước
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger toggle button for mobile & small screens */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:text-black hover:bg-gray-100 transition-colors focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Dropdown Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-white/95 backdrop-blur-2xl border-b border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              <button
                onClick={() => scrollToSection('difference-section')}
                className="block w-full text-left py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border-b border-gray-50"
              >
                Tính Năng
              </button>
              <button
                onClick={() => scrollToSection('flow-section')}
                className="block w-full text-left py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border-b border-gray-50"
              >
                Luồng Hoạt Động
              </button>
              <button
                onClick={() => scrollToSection('demo-playground')}
                className="block w-full text-left py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border-b border-gray-50"
              >
                Trải Nghiệm AI
              </button>
              <button
                onClick={() => scrollToSection('compare-section')}
                className="block w-full text-left py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border-b border-gray-50"
              >
                So Sánh
              </button>
              <button
                onClick={() => scrollToSection('specs-section')}
                className="block w-full text-left py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors border-b border-gray-50"
              >
                Thông Số
              </button>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="w-full py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 hover:bg-gray-50 text-center transition-colors"
                >
                  Tư vấn doanh nghiệp
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

