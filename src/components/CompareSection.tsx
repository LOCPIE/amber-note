import { motion } from 'motion/react';
import { Check, X, ShieldAlert, Sparkles } from 'lucide-react';
import { COMPARE_DATA } from '../data';

export default function CompareSection() {
  return (
    <section className="py-24 bg-gray-50" id="compare-section">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="text-center mb-16">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Ma Trận So Sánh
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 mt-4">
            Bước nhảy vọt về hiệu suất
          </h2>
          <p className="text-sm text-gray-500 mt-3 max-w-md mx-auto">
            Một chiếc máy ghi âm thông thường chỉ dừng lại ở tệp âm thanh.<br />
            Amber Note là cầu nối đưa tri thức từ cuộc họp vào vận hành doanh nghiệp thực tế.
          </p>
        </div>

        {/* Matrix Card Board */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white rounded-3xl border border-gray-200/80 overflow-hidden shadow-xl shadow-gray-100/50"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-6 text-xs font-mono font-bold uppercase text-gray-400 tracking-wider">
                    Tính năng
                  </th>
                  <th className="p-6 text-center text-xs font-mono font-bold uppercase text-gray-500 tracking-wider">
                    Máy ghi âm thường
                  </th>
                  <th className="p-6 text-center text-xs font-mono font-bold uppercase text-blue-600 tracking-wider bg-blue-50/40 relative">
                    <div className="flex items-center justify-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse text-blue-600" />
                      <span>Amber Note AI</span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARE_DATA.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    {/* Feature Label */}
                    <td className="p-5 text-xs sm:text-sm font-medium text-gray-900">
                      {row.feature}
                    </td>

                    {/* Normal Recorder Value */}
                    <td className="p-5 text-center">
                      {row.normal ? (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50 text-emerald-600">
                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-50 text-red-400">
                          <X className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                      )}
                    </td>

                    {/* Amber Note Value */}
                    <td className="p-5 text-center bg-blue-50/10 relative">
                      {row.amber ? (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white shadow-sm shadow-blue-500/20">
                          <Check className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 text-gray-400">
                          <X className="w-3.5 h-3.5 stroke-[3px]" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer of Matrix */}
          <div className="p-6 bg-blue-50/30 border-t border-blue-50 flex flex-col sm:flex-row items-center gap-4 justify-between">
            <p className="text-[11px] sm:text-xs text-gray-500 font-medium text-center sm:text-left flex items-center gap-1.5">
              <ShieldAlert className="w-4 h-4 text-blue-600" />
              Tương thích 100% với tài khoản Base Account của doanh nghiệp bạn.
            </p>
            <span className="text-[10px] font-mono font-bold text-blue-600 uppercase tracking-wider bg-blue-100/60 px-2.5 py-1 rounded-full border border-blue-200">
              Enterprise Recommended
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
