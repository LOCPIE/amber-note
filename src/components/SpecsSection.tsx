import { motion } from 'motion/react';
import { 
  Mic, 
  Activity, 
  Battery, 
  Shield, 
  Cpu, 
  Zap,
  HardDrive,
  Fingerprint
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
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
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

        {/* Additional Tech Highlights Grid (Apple style details card) */}
        <div className="mt-12 bg-neutral-950 text-white rounded-[32px] p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-blue-500/10 filter blur-[80px] pointer-events-none" />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] font-mono text-blue-400 font-bold tracking-widest uppercase">
                Chế tác cơ khí chính xác
              </span>
              <h3 className="text-2xl sm:text-4xl font-display font-medium tracking-tight text-white leading-tight">
                Anodized Aluminum Casing
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Được CNC nguyên khối từ hợp kim nhôm hàng không vũ trụ series 6000, sau đó phun cát hạt siêu mịn và xử lý Anodized để tạo độ cứng bề mặt cao gấp 4 lần, chống trầy xước và bám vân tay hoàn hảo.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl space-y-2">
                <HardDrive className="w-5 h-5 text-amber-led" />
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">Lưu trữ Offline</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">32GB bộ nhớ tích hợp eMMC lưu trữ an toàn hơn 300 giờ họp âm thanh không lo mất điện.</p>
              </div>

              <div className="bg-white/5 border border-white/5 p-6 rounded-2xl space-y-2">
                <Fingerprint className="w-5 h-5 text-blue-400" />
                <h4 className="text-xs font-bold font-mono uppercase tracking-wider text-white">Xác thực Token</h4>
                <p className="text-[11px] text-gray-400 leading-relaxed">Tích hợp xác thực chip cứng Cryptographic Token đồng bộ hóa độc quyền tài khoản Base Account.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
