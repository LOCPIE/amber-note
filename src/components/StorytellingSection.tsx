import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  Mic, 
  FileText, 
  Sparkles, 
  TrendingUp, 
  ListTodo, 
  UserPlus, 
  CheckCircle,
  Play,
  Pause,
  ChevronRight
} from 'lucide-react';

interface TimelineStep {
  id: number;
  label: string;
  subLabel: string;
  desc: string;
  icon: any;
  color: string;
  baseApp?: string;
}

const STEPS: TimelineStep[] = [
  {
    id: 1,
    label: 'Meeting',
    subLabel: 'Khởi đầu buổi họp',
    desc: 'Doanh nghiệp bắt đầu buổi họp, trao đổi ý tưởng và phân công công việc trực tiếp trong phòng họp hoặc trực tuyến.',
    icon: Users,
    color: 'from-blue-500 to-indigo-500'
  },
  {
    id: 2,
    label: 'Recording',
    subLabel: 'Thu âm đa hướng ANC',
    desc: 'Thiết bị Amber Note thu âm toàn dải tần số cao, tự lọc tạp âm văn phòng, tiếng lật giấy hay gõ bàn phím.',
    icon: Mic,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 3,
    label: 'AI Speech to Text',
    subLabel: 'Bóc băng tự động 99%',
    desc: 'Chuyển toàn bộ hội thoại âm thanh thành văn bản hoàn chỉnh trong 3 giây ngay sau khi kết thúc cuộc họp.',
    icon: FileText,
    color: 'from-teal-500 to-emerald-500'
  },
  {
    id: 4,
    label: 'AI Summary',
    subLabel: 'Tóm tắt thông minh',
    desc: 'Trích lọc ý chính của buổi họp, phân biệt rõ người phát biểu và lập sơ đồ cấu trúc nội dung cô đọng.',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 5,
    label: 'Deal / CRM',
    subLabel: 'Đồng bộ cơ hội bán hàng',
    desc: 'Với cuộc gọi tư vấn, AI tự phát hiện giá trị hợp đồng và tạo/cập nhật trực tiếp Deal lên hệ thống Base CRM.',
    icon: TrendingUp,
    color: 'from-rose-500 to-red-500',
    baseApp: 'Base CRM'
  },
  {
    id: 6,
    label: 'Tasks Identification',
    subLabel: 'Trích xuất đầu việc',
    desc: 'Tự phân tách các lời nói như "Huy làm giao diện trước 12/07" thành các đầu việc (action items) rõ ràng.',
    icon: ListTodo,
    color: 'from-violet-500 to-fuchsia-500'
  },
  {
    id: 7,
    label: 'Assign Workflow',
    subLabel: 'Giao việc tự động',
    desc: 'Tự động gán người thực hiện, thiết lập hạn chót (deadline) và đẩy đầu việc trực tiếp vào Base Workflow.',
    icon: UserPlus,
    color: 'from-sky-500 to-blue-600',
    baseApp: 'Base Workflow'
  },
  {
    id: 8,
    label: 'Done',
    subLabel: 'Hoàn thành tự động',
    desc: 'Công việc được giao chạy trơn tru, không cần thủ tục lập biên bản họp hay báo cáo thủ công. Tiết kiệm 80% thời gian hành chính.',
    icon: CheckCircle,
    color: 'from-emerald-500 to-green-600'
  }
];

export default function StorytellingSection() {
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-play interval for interactive demonstration
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev === STEPS.length ? 1 : prev + 1));
      }, 4500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const activeData = STEPS.find(s => s.id === activeStep) || STEPS[0];
  const ActiveIcon = activeData.icon;

  return (
    <section className="py-24 bg-gray-50 border-y border-gray-100 overflow-hidden" id="difference-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-blue-600 mb-3"
          >
            Từ cuộc họp... đến hành động
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900"
          >
            Amber Note vận hành toàn bộ hành trình AI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-500 max-w-xl mx-auto mt-4"
          >
            Một chiếc máy ghi âm không giải quyết được gì nếu bạn phải tự nghe lại và gõ tay. Amber Note kết nối trực tiếp với Base.vn để làm mọi việc thay bạn.
          </motion.p>
        </div>

        {/* Big Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Timeline list of steps */}
          <div className="lg:col-span-5 space-y-3 relative z-10">
            {/* Play/Pause Control */}
            <div className="flex justify-between items-center pb-2 border-b border-gray-200/60 mb-4">
              <span className="text-xs font-sans font-medium text-gray-500">Quy trình vận hành thông minh</span>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3 h-3 text-red-500 fill-current" />
                    <span>Dừng chạy thử</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3 text-blue-600 fill-current" />
                    <span>Chạy tự động</span>
                  </>
                )}
              </button>
            </div>

            <div className="relative pl-6 space-y-3">
              {/* Vertical line connector */}
              <div className="absolute left-10 top-4 bottom-4 w-[2px] bg-gray-200 -z-10" />

              {STEPS.map((step) => {
                const isSelected = step.id === activeStep;
                const StepIcon = step.icon;
                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setActiveStep(step.id);
                      setIsPlaying(false); // Stop playing when manually selecting
                    }}
                    className={`w-full flex items-center gap-4 p-3 rounded-2xl transition-all text-left relative overflow-hidden group ${
                      isSelected 
                        ? 'bg-white shadow-md border border-gray-100 translate-x-1' 
                        : 'hover:bg-gray-100/60'
                    }`}
                  >
                    {/* Active Step Progress Fill overlay */}
                    {isSelected && isPlaying && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-[2px] bg-blue-600"
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 4.5, ease: 'linear' }}
                      />
                    )}

                    <div className="text-[10px] font-sans text-gray-400 w-6 font-bold">
                      {step.id.toString().padStart(2, '0')}
                    </div>

                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                      isSelected 
                        ? 'bg-blue-600 text-white shadow-sm' 
                        : 'bg-gray-200 text-gray-500 group-hover:bg-gray-300'
                    }`}>
                      <StepIcon className="w-4 h-4" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-medium transition-colors ${
                          isSelected ? 'text-gray-900 font-bold' : 'text-gray-600'
                        }`}>
                          {step.label}
                        </span>
                        {step.baseApp && (
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-50 border border-blue-100 text-blue-600 font-semibold font-sans uppercase">
                            {step.baseApp}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-gray-400 block line-clamp-1">{step.subLabel}</span>
                    </div>

                    <ChevronRight className={`w-4 h-4 text-gray-300 transition-transform ${
                      isSelected ? 'translate-x-0.5 text-gray-900' : 'opacity-0 group-hover:opacity-100'
                    }`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Visual Showcase of the Active Step */}
          <div className="lg:col-span-7 h-[460px] flex items-center justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full bg-white rounded-3xl border border-gray-100 p-8 sm:p-12 flex flex-col justify-between shadow-xl shadow-gray-100/40 relative overflow-hidden"
              >
                {/* Background artistic mesh */}
                <div className={`absolute top-0 right-0 w-80 h-80 rounded-full filter blur-[80px] opacity-10 bg-gradient-to-br ${activeData.color} pointer-events-none`} />

                {/* Top header block */}
                <div className="flex justify-between items-start z-10">
                  <div>
                    <span className="text-[10px] font-sans font-bold uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100 tracking-wider">
                      Step {activeData.id} • {activeData.subLabel}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-display font-medium text-gray-900 mt-4 tracking-tight">
                      {activeData.label}
                    </h3>
                  </div>
                  
                  {/* Glowing dynamic badge indicating connection */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${activeData.color} text-white flex items-center justify-center shadow-lg shadow-blue-500/10`}>
                    <ActiveIcon className="w-7 h-7" />
                  </div>
                </div>

                {/* Center Content / Mini Simulation mockup */}
                <div className="my-6 py-4 border-y border-gray-100/80 z-10 flex-1 flex flex-col justify-center">
                  <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                    {activeData.desc}
                  </p>

                  {/* Micro UI Simulation blocks depending on active step */}
                  <div className="mt-6 bg-gray-50 rounded-xl p-4 border border-gray-100 font-mono text-xs text-gray-600 shadow-inner">
                    {activeStep === 1 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-blue-600 font-bold">
                          <Users className="w-3.5 h-3.5" /> <span>Base Meeting • Lịch biểu trực tuyến</span>
                        </div>
                        <p className="text-[11px] text-gray-500">Tiêu đề: Họp Tổng Kết Quý II - Kinh Doanh miền Nam</p>
                        <p className="text-[11px] text-gray-500">Thành viên tham dự: CEO, Sales Lead, Tech Lead</p>
                      </div>
                    )}
                    {activeStep === 2 && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="font-bold text-red-500">AMBER CAPTURING...</span>
                        </div>
                        <span className="text-[10px] text-gray-400">Nén 256kbps lossless</span>
                      </div>
                    )}
                    {activeStep === 3 && (
                      <div className="space-y-1 select-none">
                        <div className="text-[11px] font-bold text-emerald-600">[0:25] CEO Phát Đạt:</div>
                        <p className="text-[11px] italic bg-emerald-50/50 p-1 rounded">"...Anh muốn đặt cọc trước 30 máy Amber Note bản Space Gray để triển khai..."</p>
                      </div>
                    )}
                    {activeStep === 4 && (
                      <div className="space-y-1">
                        <div className="text-[11px] font-bold text-purple-600">💡 Tóm tắt AI (Summary Key):</div>
                        <ul className="list-disc pl-4 text-[10px] text-gray-500 space-y-0.5">
                          <li>Khách hàng Phát Đạt chốt mua 30 máy Space Gray.</li>
                          <li>Sales Minh làm hợp đồng gửi sáng 09/07.</li>
                        </ul>
                      </div>
                    )}
                    {activeStep === 5 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-rose-600 font-bold">
                          <span>Base CRM • Cơ hội vàng</span>
                          <span className="px-1.5 py-0.5 rounded bg-rose-50 text-[9px]">Tự Động</span>
                        </div>
                        <p className="text-[11px] text-gray-500">Deal: Amber Note 30 máy - Phát Đạt Group</p>
                        <p className="text-[11px] font-bold text-gray-800">Trị giá: 105,000,000 VND</p>
                      </div>
                    )}
                    {activeStep === 6 && (
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-violet-600 uppercase">AI Detected Action Items:</span>
                        <div className="bg-white px-2 py-1.5 rounded border border-gray-100 flex items-center justify-between">
                          <span className="text-[10px]">☐ Soạn hợp đồng 30 máy Amber Note</span>
                          <span className="text-[9px] text-gray-400">@Lê Minh</span>
                        </div>
                      </div>
                    )}
                    {activeStep === 7 && (
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-sky-600 font-bold">
                          <span>Base Workflow • Quản lý công việc</span>
                        </div>
                        <div className="flex justify-between text-[11px] text-gray-500 bg-white p-2 rounded border border-gray-100">
                          <span>⚡ Giao việc: Lê Minh (Sales)</span>
                          <span className="text-red-500 font-bold">DL: 09/07/2026</span>
                        </div>
                      </div>
                    )}
                    {activeStep === 8 && (
                      <div className="flex items-center gap-2 text-green-600 font-bold">
                        <CheckCircle className="w-4 h-4" />
                        <span>QUY TRÌNH HOÀN TẤT • TIẾT KIỆM 80% THỜI GIAN NHẬP LIỆU</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer brand indicator */}
                <div className="flex justify-between items-center z-10 pt-4 border-t border-gray-50 text-[10px] font-mono text-gray-400">
                  <span>AMBER PIPELINE SYSTEM</span>
                  <span>INTEGRATED WITH BASE.VN</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
