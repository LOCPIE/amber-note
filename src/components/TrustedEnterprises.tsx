import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, Building, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface Testimony {
  id: number;
  quote: string;
  author: string;
  position: string;
  company: string;
  stats: string;
  statsLabel: string;
}

const TESTIMONIALS: Testimony[] = [
  {
    id: 1,
    quote: "Amber Note giải phóng 80% thời gian làm báo cáo của đội ngũ Sales kinh doanh thực địa. Dữ liệu được bóc băng tự động và tự cập nhật Deal lên Base CRM chính xác đến từng con số ngay sau cuộc gặp.",
    author: "Anh Nguyễn Tấn Phát",
    position: "CEO",
    company: "Phát Đạt Group",
    stats: "80%",
    statsLabel: "Tiết kiệm thời gian báo cáo"
  },
  {
    id: 2,
    quote: "Khả năng phân tách giọng nói (Diarization) của thiết bị hoạt động xuất sắc kể cả trong môi trường ồn. Biên bản họp được lập tự động giúp chúng tôi giảm họp rác và tăng tốc độ ra quyết định lên gấp đôi.",
    author: "Anh Phạm Anh Tuấn",
    position: "CTO",
    company: "Base.vn Enterprise Partner",
    stats: "2.4x",
    statsLabel: "Tốc độ xử lý hành động sau họp"
  },
  {
    id: 3,
    quote: "Bảo mật thông tin là ưu tiên tối cao của chúng tôi đối với các cuộc họp chiến lược quốc tế. Amber Note đáp ứng xuất sắc các tiêu chuẩn mã hóa AES-256 phần cứng và vận hành hoàn toàn trong phân vùng Base Cloud khép kín.",
    author: "Chị Lê Hoàng Nam",
    position: "COO",
    company: "VinGroup Technology Lab",
    stats: "100%",
    statsLabel: "Mã hóa bảo mật tuyệt đối"
  }
];

export default function TrustedEnterprises() {
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }
    autoplayRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    }, 6000); // Tự động chuyển mỗi 6 giây
  };

  useEffect(() => {
    resetAutoplay();
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    resetAutoplay();
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    resetAutoplay();
  };

  const activeTestimony = TESTIMONIALS[activeIndex];

  return (
    <section className="py-20 bg-gray-50/50" id="trusted-enterprises">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Logos Bar Section */}
        <div className="text-center space-y-4 mb-16">
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-gray-400">
            Trusted by Vietnam's Leading Enterprises
          </p>
          
          {/* Symmetrical High-contrast Grid of Vector logos */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-75 grayscale hover:grayscale-0 transition-all duration-500 pt-4">
            
            {/* Logo 1: Phat Dat Group */}
            <div className="flex items-center gap-2 font-display font-bold text-gray-800 text-sm tracking-tight select-none">
              <div className="w-6 h-6 rounded bg-black flex items-center justify-center text-white text-xs">P</div>
              <span>PHAT DAT GROUP</span>
            </div>

            {/* Logo 2: VinGroup Tech */}
            <div className="flex items-center gap-1.5 font-display font-medium text-gray-800 text-sm tracking-wider select-none">
              <span className="text-blue-600 font-extrabold">V</span>
              <span>VINGROUP TECH</span>
            </div>

            {/* Logo 3: Base Enterprise */}
            <div className="flex items-center gap-2 font-display font-bold text-gray-800 text-sm select-none">
              <div className="w-5 h-5 rounded-full border-2 border-black flex items-center justify-center text-[10px] font-mono">B</div>
              <span>BASE PARTNER</span>
            </div>

            {/* Logo 4: FPT Software */}
            <div className="flex items-center gap-1 font-mono font-bold text-gray-800 text-sm select-none">
              <span className="text-orange-500">//</span>
              <span>FPT SOFTWARE</span>
            </div>

            {/* Logo 5: Bamboo Air */}
            <div className="flex items-center gap-1.5 font-display font-light text-gray-800 text-xs tracking-[0.15em] select-none">
              <span className="font-bold text-teal-600">▲</span>
              <span>BAMBOO AIR</span>
            </div>

          </div>
        </div>

        {/* Customer Quotes & Success Stories Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white border border-gray-200/60 rounded-[32px] p-8 sm:p-12 shadow-xl shadow-gray-100/30 relative overflow-hidden">
          
          {/* Subtle decoration */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full filter blur-[60px] pointer-events-none" />

          {/* Left Column: Testimonial Quotes Slider (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 flex flex-col justify-between h-full relative z-10">
            
            <div className="flex items-center gap-2 text-blue-600">
              <Quote className="w-8 h-8 opacity-20 fill-current shrink-0" />
              <span className="text-xs font-sans font-bold uppercase tracking-wider">Ý kiến chuyên gia đầu ngành</span>
            </div>

            {/* Quote Animation Container */}
            <div className="min-h-[140px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4 text-left"
                >
                  <p className="text-base sm:text-xl text-gray-800 leading-relaxed font-medium font-display italic">
                    "{activeTestimony.quote}"
                  </p>
                  
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{activeTestimony.author}</h4>
                    <p className="text-xs text-gray-400 font-mono">
                      {activeTestimony.position} • {activeTestimony.company}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slider Controls */}
            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={handlePrev}
                className="w-9 h-9 rounded-full border border-gray-200 hover:border-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-600 hover:text-black active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-mono text-gray-400">
                {activeIndex + 1} / {TESTIMONIALS.length}
              </span>
              <button
                onClick={handleNext}
                className="w-9 h-9 rounded-full border border-gray-200 hover:border-gray-900 hover:bg-gray-50 flex items-center justify-center transition-colors text-gray-600 hover:text-black active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Key Metric Accent Card (lg:col-span-5) */}
          <div className="lg:col-span-5 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-2xl bg-neutral-950 text-white border border-white/5 space-y-6 flex flex-col justify-between h-full shadow-2xl relative overflow-hidden"
              >
                {/* Visual light glare */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-blue-500/10 filter blur-[30px]" />
                
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-blue-400">
                    <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                    <span className="text-[10px] font-sans uppercase tracking-wider font-bold">Hiệu suất vận hành thực tế</span>
                  </div>
                  <h3 className="text-3xl font-display font-medium text-white">{activeTestimony.company}</h3>
                </div>

                <div className="py-4 border-y border-white/10 my-4">
                  <span className="text-5xl sm:text-6xl font-display font-bold text-amber-led block tracking-tight">
                    {activeTestimony.stats}
                  </span>
                  <span className="text-xs text-gray-400 mt-2 block font-medium">
                    {activeTestimony.statsLabel}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs text-emerald-400">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                    <Check className="w-3.5 h-3.5 stroke-[2.5px]" />
                  </div>
                  <span>Đã kiểm chứng thành công trên thực tế</span>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
