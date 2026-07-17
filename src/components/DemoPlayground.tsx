import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  ClipboardCheck, 
  CheckCircle, 
  User, 
  Calendar, 
  Layers, 
  TrendingUp, 
  BellRing,
  Volume2
} from 'lucide-react';
import { DEMO_PRESETS } from '../data';
import { DemoPreset } from '../types';

export default function DemoPlayground() {
  const [selectedPresetId, setSelectedPresetId] = useState('meeting-client');
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [activeSegmentIndex, setActiveSegmentIndex] = useState(-1);
  const [showSummary, setShowSummary] = useState(false);
  const [showTasks, setShowTasks] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const timerRef = useRef<any>(null);

  const activePreset = DEMO_PRESETS.find(p => p.id === selectedPresetId) || DEMO_PRESETS[0];

  // Stop playback when switching presets
  useEffect(() => {
    resetDemo();
  }, [selectedPresetId]);

  // Audio Playback Simulation Engine
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setProgress((prev) => {
          const next = prev + 1;
          if (next >= 100) {
            setIsPlaying(false);
            clearInterval(timerRef.current);
            // End of audio: reveal everything
            setActiveSegmentIndex(activePreset.transcript.length - 1);
            setShowSummary(true);
            setShowTasks(true);
            triggerNotification();
            return 100;
          }
          
          // Calculate which transcript segment to show based on play progress
          const totalSegments = activePreset.transcript.length;
          const segmentIndex = Math.min(
            Math.floor((next / 100) * (totalSegments + 2)), // +2 to leave space for summary generation
            totalSegments - 1
          );
          
          if (segmentIndex >= 0 && segmentIndex !== activeSegmentIndex) {
            setActiveSegmentIndex(segmentIndex);
          }

          // Progressively trigger AI summary and tasks
          if (next > 40 && !showSummary) {
            setShowSummary(true);
          }
          if (next > 75 && !showTasks) {
            setShowTasks(true);
            triggerNotification();
          }

          return next;
        });
      }, 250); // Speed up playback so a 2min audio finishes in ~25 seconds
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, activeSegmentIndex, selectedPresetId]);

  const triggerNotification = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 6000);
  };

  const handlePlayToggle = () => {
    setIsPlaying(!isPlaying);
  };

  const resetDemo = () => {
    setIsPlaying(false);
    setProgress(0);
    setActiveSegmentIndex(-1);
    setShowSummary(false);
    setShowTasks(false);
    setShowToast(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const formatTimer = () => {
    // Calculate simulated duration based on preset
    const totalSecs = parseDuration(activePreset.duration);
    const elapsedSecs = Math.floor((progress / 100) * totalSecs);
    
    const m = Math.floor(elapsedSecs / 60).toString();
    const s = (elapsedSecs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const parseDuration = (dur: string) => {
    const parts = dur.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  };

  return (
    <section className="py-24 bg-white relative" id="demo-playground">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Toast Push Notification Alert */}
        <AnimatePresence>
          {showToast && (
            <motion.div
              initial={{ opacity: 0, y: -80, x: '-50%' }}
              animate={{ opacity: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, y: -40, x: '-50%' }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm bg-black text-white p-4 rounded-2xl shadow-2xl border border-white/10 flex items-start gap-3.5"
            >
              <div className="w-9 h-9 rounded-xl bg-amber-led text-black flex items-center justify-center shrink-0">
                <BellRing className="w-5 h-5 animate-bounce" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono text-amber-led font-bold uppercase tracking-wider">Base Notification</span>
                  <span className="text-[9px] text-gray-400">Just now</span>
                </div>
                <p className="text-xs font-bold text-white mt-1">Đồng bộ Base.vn thành công!</p>
                <p className="text-[11px] text-gray-300 mt-0.5">
                  {activePreset.tasks.length} công việc và biên bản cuộc họp đã được tự động khởi tạo trên hệ thống.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Section Headline */}
        <div className="text-center mb-16">
          <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            Trực Quan Hóa Dữ Liệu Thực Tế
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 mt-4">
            Mô phỏng xử lý cuộc họp tức thì
          </h2>
          <p className="text-sm text-gray-500 max-w-lg mx-auto mt-3">
            Chọn một kịch bản bên dưới, nhấn <span className="font-bold text-gray-900">Xử lý</span> để theo dõi trực tiếp quy trình bóc băng, tóm tắt và tự động gán việc của Amber Note.
          </p>
        </div>

        {/* Preset Tabs Selection */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {DEMO_PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPresetId(p.id)}
              className={`px-5 py-2.5 rounded-full text-xs font-medium border transition-all ${
                selectedPresetId === p.id
                  ? 'bg-black border-black text-white shadow-sm'
                  : 'bg-gray-100/60 border-gray-200 text-gray-600 hover:bg-gray-200/50'
              }`}
            >
              <span className="opacity-50 mr-1.5 font-mono">#{p.category}</span>
              {p.title}
            </button>
          ))}
        </div>

        {/* Interactive Workspace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Col 1: Audio Playback & Live Waves (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-gray-50 border border-gray-100 rounded-3xl p-6 shadow-sm">
            <div className="space-y-4">
              <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-widest block">Amber Player</span>
              <h3 className="text-lg font-medium text-gray-900 leading-tight">
                {activePreset.title}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2.5 py-1 rounded-md bg-white border border-gray-200 font-medium text-gray-600 text-xs">
                  {activePreset.category}
                </span>
                <span className="text-[11px] font-mono text-gray-400">Thời lượng: {activePreset.duration}</span>
              </div>
            </div>

            {/* Simulated Animated Visual Waveform */}
            <div className="my-8 h-28 bg-white rounded-2xl border border-gray-100/60 flex items-center justify-center p-4 relative overflow-hidden shadow-inner">
              <div className="flex items-center gap-[3px] w-full justify-center h-20">
                {[12, 28, 48, 16, 36, 18, 54, 32, 60, 44, 22, 68, 52, 30, 42, 14, 24, 8, 34, 18, 50, 12].map((height, i) => (
                  <motion.div
                    key={i}
                    className="w-[5px] rounded-full"
                    style={{
                      height: `${height}%`,
                      backgroundColor: isPlaying ? '#0A84FF' : '#E5E7EB'
                    }}
                    animate={isPlaying ? {
                      height: [
                        `${height * 0.4}%`,
                        `${height}%`,
                        `${height * 0.3}%`,
                        `${height * 0.8}%`,
                        `${height * 0.4}%`
                      ]
                    } : {}}
                    transition={{
                      duration: 1.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.04
                    }}
                  />
                ))}
              </div>

              {/* Glowing Volume Icon Indicator */}
              {isPlaying && (
                <div className="absolute top-3 right-3 flex items-center gap-1 bg-blue-50 border border-blue-100 text-blue-600 px-2 py-0.5 rounded-full text-[9px] font-mono font-bold">
                  <Volume2 className="w-3 h-3 animate-bounce" />
                  <span>PLAYING</span>
                </div>
              )}
            </div>

            {/* Playback Controls */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-[11px] font-mono text-gray-400">
                <span>{formatTimer()}</span>
                <span>{activePreset.duration}</span>
              </div>

              {/* Progress Slider */}
              <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const clickX = e.clientX - rect.left;
                const newProgress = Math.floor((clickX / rect.width) * 100);
                setProgress(newProgress);
                setActiveSegmentIndex(Math.min(Math.floor((newProgress / 100) * activePreset.transcript.length), activePreset.transcript.length - 1));
                if (newProgress > 40) setShowSummary(true);
                if (newProgress > 75) setShowTasks(true);
              }}>
                <div className="h-full bg-blue-600 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>

              <div className="flex gap-2 items-center justify-center pt-2">
                <button
                  onClick={resetDemo}
                  className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                  title="Reset"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  onClick={handlePlayToggle}
                  className={`flex-1 h-12 rounded-full font-medium text-xs flex items-center justify-center gap-2 shadow-md transition-all ${
                    isPlaying 
                      ? 'bg-gray-900 text-white hover:bg-neutral-800' 
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      Dừng Xử Lý
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      Bắt Đầu Xử Lý AI
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Col 2: Live Bóc Băng Transcript (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-white border border-gray-100 rounded-3xl p-6 shadow-sm min-h-[460px]">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-widest flex items-center gap-1">
                  <FileText className="w-3.5 h-3.5" /> Live Transcript
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-50 border border-blue-100 text-blue-600">
                  99% Accuracy
                </span>
              </div>

              {/* Scrolling Dialog Feed */}
              <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3.5 pr-2 no-scrollbar">
                {activeSegmentIndex === -1 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 py-16">
                    <Volume2 className="w-10 h-10 mb-2 stroke-1 animate-pulse" />
                    <p className="text-xs">Bấm Play để bắt đầu stream văn bản cuộc họp thời gian thực</p>
                  </div>
                ) : (
                  activePreset.transcript.slice(0, activeSegmentIndex + 1).map((seg, idx) => {
                    const isNew = idx === activeSegmentIndex && isPlaying;
                    return (
                      <motion.div
                        key={idx}
                        initial={isNew ? { opacity: 0, y: 15, scale: 0.98 } : { opacity: 1 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={`p-3 rounded-2xl border transition-all ${
                          isNew 
                            ? 'bg-blue-50/50 border-blue-100 shadow-sm' 
                            : 'bg-gray-50/50 border-gray-100/50'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-[10px] font-bold text-gray-800">{seg.speaker}</span>
                          <span className="text-[9px] font-mono text-gray-400">{seg.time}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{seg.text}</p>
                      </motion.div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Footer indicator */}
            {isPlaying && (
              <div className="pt-3 border-t border-gray-50 flex items-center gap-1.5 justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                <span className="text-[9px] font-mono text-blue-600 uppercase font-bold">Bóc băng thời gian thực...</span>
              </div>
            )}
          </div>

          {/* Col 3: AI Summary & Task integration (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col justify-between bg-gray-900 text-white rounded-3xl p-6 shadow-lg min-h-[460px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 rounded-full bg-indigo-500/10 filter blur-[40px] pointer-events-none" />

            <div className="space-y-4 flex-1 flex flex-col">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 z-10">
                <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-widest flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-led animate-spin" /> AI Summary & Task
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-50/10 border border-amber-500/20 text-amber-led">
                  Base AI Active
                </span>
              </div>

              {/* AI outputs (Overview, Key Takeaways, Tasks) */}
              <div className="flex-1 overflow-y-auto max-h-[380px] space-y-4 pr-1 no-scrollbar z-10">
                {!showSummary ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 py-16">
                    <Sparkles className="w-10 h-10 mb-2 stroke-1" />
                    <p className="text-xs">AI sẽ tự động tổng hợp thông tin khi ghi âm đi được 40%</p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-4"
                  >
                    {/* Summary Overview paragraph */}
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] font-mono text-amber-led font-bold uppercase tracking-wider">💡 Biên bản tóm tắt</h4>
                      <p className="text-xs text-gray-300 leading-relaxed bg-white/5 border border-white/5 p-3 rounded-xl shadow-inner">
                        {activePreset.summary.overview}
                      </p>
                    </div>

                    {/* Key takeaways bullet points */}
                    <div className="space-y-1.5">
                      <h4 className="text-[10px] font-mono text-amber-led font-bold uppercase tracking-wider">📌 Ý chính rút ra</h4>
                      <ul className="space-y-1.5">
                        {activePreset.summary.keyPoints.map((point, idx) => (
                          <motion.li
                            initial={{ opacity: 0, x: -5 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            key={idx}
                            className="text-[11px] text-gray-400 flex items-start gap-1.5"
                          >
                            <span className="text-amber-led mt-0.5">•</span>
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Base CRM integration block if present */}
                    {activePreset.crmSync && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-rose-950/40 border border-rose-500/20 p-3 rounded-xl space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1">
                            <TrendingUp className="w-3.5 h-3.5" /> Base CRM Synchronized
                          </span>
                          <span className="text-[8px] uppercase tracking-wider font-mono text-rose-500 bg-rose-500/10 px-1 py-0.5 rounded">
                            Done
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white">{activePreset.crmSync.dealName}</p>
                        <div className="grid grid-cols-2 gap-2 text-[10px]">
                          <div>
                            <span className="text-gray-500 block">Giá trị:</span>
                            <span className="text-rose-300 font-bold">{activePreset.crmSync.value}</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Giai đoạn:</span>
                            <span className="text-gray-300">{activePreset.crmSync.stage}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Action Items/Tasks */}
                    {showTasks && (
                      <div className="space-y-2 pt-2 border-t border-white/5">
                        <h4 className="text-[10px] font-mono text-blue-400 font-bold uppercase tracking-wider">⚡ Tự động giao việc trên Base.vn</h4>
                        <div className="space-y-2">
                          {activePreset.tasks.map((task, idx) => (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.15 }}
                              key={idx}
                              className="bg-white/5 border border-white/5 hover:border-white/10 p-2.5 rounded-xl text-[11px] space-y-1.5 transition-all"
                            >
                              <div className="flex justify-between items-start">
                                <span className="font-medium text-white line-clamp-1">{task.title}</span>
                                <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 rounded ${
                                  task.baseApp === 'Base CRM' 
                                    ? 'bg-rose-500/10 text-rose-400' 
                                    : task.baseApp === 'Base Meeting' 
                                    ? 'bg-blue-500/10 text-blue-400'
                                    : 'bg-emerald-500/10 text-emerald-400'
                                }`}>
                                  {task.baseApp}
                                </span>
                              </div>
                              <div className="flex justify-between items-center text-[9px] text-gray-500">
                                <span className="flex items-center gap-1"><User className="w-2.5 h-2.5" /> {task.assignee}</span>
                                <span className="flex items-center gap-1 text-red-400"><Calendar className="w-2.5 h-2.5" /> {task.deadline}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Bottom active state */}
            {showTasks && (
              <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-gray-500">
                <span>PIPELINE DISPATCHED</span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> ACTIVE</span>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
