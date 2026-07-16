import { motion } from 'motion/react';
import { 
  Cpu, 
  Sparkles, 
  ClipboardCheck, 
  Layers, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';
import { WHY_CARDS } from '../data';

// Map icon name string to Lucide component
const ICON_MAP: Record<string, any> = {
  Cpu,
  Sparkles,
  ClipboardCheck,
  Layers,
  FileText,
  ShieldCheck
};

export default function WhyAmberNote() {
  return (
    <section className="py-24 bg-white" id="why-amber-note">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-600 mb-3"
          >
            Sự Khác Biệt Cốt Lõi
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900"
          >
            Thiết kế riêng cho hệ điều hành Base.vn
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-500 max-w-xl mx-auto mt-4"
          >
            Amber Note loại bỏ hoàn toàn các bước xuất file ghi âm, gõ tay biên bản hay cập nhật CRM thủ công. Toàn bộ hội thoại biến thành hành động sau một cú bấm.
          </motion.p>
        </div>

        {/* 6 Bento Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {WHY_CARDS.map((card, idx) => {
            const IconComponent = ICON_MAP[card.iconName] || Cpu;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6 }}
                className="group relative bg-gray-50 hover:bg-white border border-gray-100 hover:border-gray-200 p-8 rounded-3xl transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-gray-100/50 flex flex-col justify-between overflow-hidden"
              >
                {/* Visual hover light effect */}
                <div className="absolute inset-0 bg-radial-gradient(circle_at_center,rgba(10,132,255,0.02)_0%,rgba(0,0,0,0)_100%) opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="space-y-4 relative z-10">
                  {/* Icon wrap */}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-gray-700 transition-all shadow-sm">
                    <IconComponent className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {card.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed relative z-10">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
