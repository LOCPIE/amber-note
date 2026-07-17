import { motion } from 'motion/react';
import { 
  Mic, 
  Activity, 
  Battery, 
  Shield, 
  Cpu, 
  Zap
} from 'lucide-react';
import { SPEC_ITEMS } from '../data';

const ICON_MAP: Record<string, any> = {
  Mic,
  Activity,
  Battery,
  Shield,
  Cpu,
  Zap
};

export default function SpecsSection() {
  return (
    <section className="py-24 bg-white" id="specs-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Thông Số Kỹ Thuật
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 mt-4">
            Thiết kế tối giản. Sức mạnh tối đa.
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-lg mx-auto">
            Không một chi tiết thừa. Từng milimet linh kiện được hiệu chỉnh cho độ nhạy micro tuyệt đối và bộ xử lý neural tối ưu thời lượng pin.
          </p>
        </div>

        {/* Specifications Bento-Grid / Detail Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SPEC_ITEMS.map((spec, idx) => {
            const IconComponent = ICON_MAP[spec.iconName] || Mic;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-8 rounded-3xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 hover:border-gray-200 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono text-gray-400 font-bold uppercase tracking-wider">
                      {spec.label}
                    </span>
                    <div className="w-9 h-9 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-blue-600 shadow-sm">
                      <IconComponent className="w-4.5 h-4.5" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-display font-medium text-gray-900 tracking-tight">
                    {spec.value}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-gray-500 mt-4 leading-relaxed">
                  {spec.desc}
                </p>
              </motion.div>
            );
          })}
        </div>



      </div>
    </section>
  );
}
