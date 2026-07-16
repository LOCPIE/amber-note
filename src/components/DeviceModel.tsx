import { useState, useRef, useEffect, MouseEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Cpu, Battery, Mic, Sparkles, Layers, RefreshCw } from 'lucide-react';
import { ProductColor } from '../types';

interface DeviceModelProps {
  color: ProductColor;
  onChangeColor: (color: ProductColor) => void;
  isExploded?: boolean;
}

export default function DeviceModel({ color, onChangeColor, isExploded = false }: DeviceModelProps) {
  const [exploded, setExploded] = useState(isExploded);
  const [showBack, setShowBack] = useState(false);
  const [sliderActive, setSliderActive] = useState(true);
  const [currentTime, setCurrentTime] = useState('20:29');
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt tracking
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth springs for rotation (tilt)
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { damping: 25, stiffness: 150 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { damping: 25, stiffness: 150 });

  // Light flare coordinates tracking
  const glareX = useSpring(useTransform(mouseX, [0, 1], [0, 100]), { damping: 25, stiffness: 150 });
  const glareY = useSpring(useTransform(mouseY, [0, 1], [0, 100]), { damping: 25, stiffness: 150 });
  const backGlareX = useTransform(glareX, (x) => 100 - (x as number));

  // Spring rotation for flipping the card (0 or 180 deg)
  const baseRotateY = useSpring(showBack ? 180 : 0, { damping: 25, stiffness: 120 });

  // Combined rotation incorporating 180-deg flip and hover tilt
  const rotateYCombined = useTransform(
    [baseRotateY, rotateY],
    ([bry, ry]) => (bry as number) + (showBack ? -(ry as number) : (ry as number))
  );

  useEffect(() => {
    setExploded(isExploded);
    if (isExploded) {
      setShowBack(false); // Can't flip in exploded view
    }
  }, [isExploded]);

  // Sync live digital clock to resemble dot-matrix screen
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, '0');
      const mm = String(now.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hh}:${mm}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || exploded) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Color values matching real products
  const isPink = color === 'blossom-pink';
  const primaryGrad = isPink 
    ? 'linear-gradient(135deg, #F9D5D7 0%, #E8B4B8 50%, #CFA0A4 100%)' 
    : 'linear-gradient(135deg, #7A7D81 0%, #4D5053 50%, #2A2C2E 100%)';

  return (
    <div className="w-full flex flex-col items-center justify-center p-4">
      {/* Control panel for Color, Flip, and Exploded view */}
      <div className="flex flex-wrap gap-3 items-center justify-center mb-10 z-10">
        <div className="bg-gray-100/80 backdrop-blur-md p-1 rounded-full flex gap-1 border border-gray-200">
          <button
            onClick={() => onChangeColor('space-gray')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              !isPink ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'
            }`}
          >
            Space Gray
          </button>
          <button
            onClick={() => onChangeColor('blossom-pink')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
              isPink ? 'bg-white text-gray-900 shadow-sm border border-pink-100' : 'text-gray-500 hover:text-black'
            }`}
          >
            Blossom Pink
          </button>
        </div>

        {/* Exploded Stack Toggle Button */}
        <button
          onClick={() => {
            setExploded(!exploded);
            setShowBack(false);
          }}
          className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
            exploded
              ? 'bg-blue-600 border-blue-600 text-white shadow-md'
              : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          {exploded ? 'Gom thiết bị' : 'Exploded View (Phần cứng)'}
        </button>
      </div>

      {/* 3D Canvas Stage */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative w-full max-w-[420px] aspect-[4/5] flex items-center justify-center"
        style={{ perspective: 1200 }}
      >
        {!exploded ? (
          /* Normal 3D Mode supporting Hover Tilt, spec reflections, and flipping */
          <motion.div
            style={{
              rotateX,
              rotateY: rotateYCombined,
              transformStyle: 'preserve-3d',
            }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative w-72 h-[420px] shadow-2xl cursor-grab active:cursor-grabbing"
          >
            {/* FRONT FACE (Backface hidden) */}
            <div 
              className="absolute inset-0 rounded-[36px] p-6 flex flex-col justify-between overflow-hidden border border-white/20 select-none"
              style={{ 
                backfaceVisibility: 'hidden', 
                background: primaryGrad,
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Dynamic Glare effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-radial"
                style={{
                  background: `radial-gradient(circle 220px at ${glareX}% ${glareY}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 80%)`
                }}
              />

              {/* Metal texture overlays */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-repeat bg-[size:8px_8px]" 
                   style={{ backgroundImage: `radial-gradient(circle, #fff 15%, transparent 16%)` }} />

              {/* Inner metallic bezel stroke */}
              <div className="absolute inset-0.5 rounded-[34px] pointer-events-none border border-white/10" />

              {/* Top Row: Dual Microphones and Pill Display, Red Slider PWR Toggle */}
              <div className="flex justify-between items-start mt-2">
                {/* Real Product Capsule Display (OLED Pill) */}
                <div className="w-[174px] h-[46px] rounded-full bg-neutral-950 p-1.5 px-3.5 border border-white/10 flex items-center justify-between relative shadow-inner overflow-hidden">
                  {sliderActive ? (
                    <>
                      {/* Active display clock and status */}
                      <div className="flex flex-col justify-center text-left">
                        <span className="text-xs font-mono font-bold text-white tracking-wider flex items-center gap-1 leading-none shadow-[0_0_8px_rgba(255,255,255,0.8)]">
                          {currentTime}
                        </span>
                        <div className="flex items-center gap-1 mt-1 leading-none">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          <span className="text-[7px] font-mono text-gray-400 font-bold tracking-wider uppercase">REC</span>
                        </div>
                      </div>

                      {/* Screen Lens Sensor */}
                      <div className="w-6 h-6 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center shadow-inner relative shrink-0">
                        <div className="w-3.5 h-3.5 rounded-full bg-neutral-950 flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-blue-500/40" />
                        </div>
                        {/* Shimmer on lens */}
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 rounded-full bg-white/20 filter blur-[0.5px]" />
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Inactive blank screen with only camera lens visible */}
                      <div className="flex-1" />
                      <div className="w-6 h-6 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center relative shrink-0">
                        <div className="w-3.5 h-3.5 rounded-full bg-black flex items-center justify-center" />
                        <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-white/10" />
                      </div>
                    </>
                  )}
                </div>

                {/* Top Right: Physical Indentation with Red Toggle Slider Switch */}
                <div className="flex flex-col items-center">
                  <div 
                    onClick={(e) => { e.stopPropagation(); setSliderActive(!sliderActive); }}
                    className="w-10 h-10 rounded-full bg-neutral-900/30 border border-white/15 shadow-inner flex items-center justify-center cursor-pointer hover:bg-neutral-900/50 transition-colors"
                    title="Bật/Tắt thiết bị"
                  >
                    <div className="w-[18px] h-[26px] rounded-full bg-black/60 shadow-inner relative flex items-center justify-center p-0.5">
                      <motion.div 
                        className="w-[10px] h-[12px] rounded-full bg-gradient-to-b from-red-500 to-red-600 shadow-md border border-red-400/25"
                        animate={{
                          y: sliderActive ? -4 : 4
                        }}
                        transition={{ type: "spring", stiffness: 350, damping: 22 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Dictation Waveform & Breathing Core Indicator */}
              <div className="flex-1 flex flex-col items-center justify-center py-4 space-y-4">
                {sliderActive ? (
                  /* Live soundwave representation */
                  <div className="flex items-end justify-center gap-[4px] h-10 w-full px-2">
                    {[12, 28, 16, 36, 18, 42, 22, 48, 32, 20, 38, 14, 24, 10, 18, 28].map((h, i) => (
                      <motion.div
                        key={i}
                        className="w-1 rounded-t-full bg-amber-led"
                        animate={{ height: [h * 0.3, h, h * 0.2, h * 0.8, h * 0.3] }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.05,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  /* Standby / off screen flat line */
                  <div className="flex items-center justify-center h-10 w-full px-4">
                    <div className="w-full h-[2px] bg-white/10 rounded-full" />
                  </div>
                )}

                {/* Main record button with ambient led glow ring */}
                <div className="relative w-20 h-20 rounded-full flex items-center justify-center p-0.5 bg-black/20 shadow-inner">
                  {sliderActive && (
                    <motion.div
                      className="absolute inset-0.5 rounded-full border-[2.5px] border-amber-led/80"
                      animate={{
                        boxShadow: [
                          '0 0 8px rgba(255, 159, 10, 0.4)',
                          '0 0 22px rgba(255, 159, 10, 0.8)',
                          '0 0 8px rgba(255, 159, 10, 0.4)',
                        ],
                      }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Inner button face */}
                  <div 
                    className="w-[60px] h-[60px] rounded-full flex items-center justify-center text-white relative shadow-lg cursor-pointer"
                    style={{
                      background: isPink 
                        ? 'linear-gradient(135deg, #E6A7AC 0%, #C47A80 100%)' 
                        : 'linear-gradient(135deg, #3A3D40 0%, #1A1C1D 100%)',
                      border: '1px solid rgba(255,255,255,0.08)'
                    }}
                  >
                    <div className="absolute inset-0 rounded-full opacity-10 border border-white" style={{ transform: 'scale(0.8)' }} />
                    <div className="absolute inset-0 rounded-full opacity-10 border border-white" style={{ transform: 'scale(0.5)' }} />
                    
                    {sliderActive ? (
                      <>
                        <div className="w-3 h-3 rounded-full bg-amber-led shadow-[0_0_12px_rgba(255,159,10,1)] animate-ping absolute" />
                        <div className="w-3 h-3 rounded-full bg-amber-led shadow-[0_0_8px_rgba(255,159,10,0.8)] z-10" />
                      </>
                    ) : (
                      <div className="w-3 h-3 rounded-full bg-white/20 z-10" />
                    )}
                  </div>
                </div>
              </div>

              {/* Lower-Middle Section: Brand Logo split badge */}
              <div className="flex flex-col items-center justify-center py-3">
                <div className="flex items-center border border-white/20 rounded-md overflow-hidden text-[9px] font-bold select-none shadow-sm" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <span className="bg-white/20 px-2.5 py-0.5 text-white/90 font-display">AMBER</span>
                  <span className="bg-white/5 px-2.5 py-0.5 text-white/50 font-display font-normal">NOTE</span>
                </div>
                <span className="text-[7px] tracking-[0.4em] font-mono text-white/30 mt-1 uppercase">Enterprise Edition</span>
              </div>

              {/* Bottom Speaker Grille Lines */}
              <div className="flex justify-center gap-[4px] px-6 pb-2">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className={`w-[1px] h-4.5 rounded-full ${isPink ? 'bg-[#b8858a]/45' : 'bg-black/25'}`} />
                ))}
              </div>
            </div>

            {/* REAR FACE (Backface hidden, rotated 180deg) */}
            <div 
              className="absolute inset-0 rounded-[36px] p-6 flex flex-col justify-between overflow-hidden border border-white/20 select-none"
              style={{ 
                backfaceVisibility: 'hidden', 
                background: primaryGrad,
                transform: 'rotateY(180deg)',
                WebkitBackfaceVisibility: 'hidden'
              }}
            >
              {/* Ref glare for back */}
              <motion.div
                className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 bg-radial"
                style={{
                  background: `radial-gradient(circle 220px at ${backGlareX}% ${glareY}%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 80%)`
                }}
              />

              <div className="absolute inset-0.5 rounded-[34px] pointer-events-none border border-white/10" />

              {/* 4 Corner Screws */}
              <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-neutral-800/80 border border-white/5 shadow-inner" />
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-neutral-800/80 border border-white/5 shadow-inner" />
              <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-neutral-800/80 border border-white/5 shadow-inner" />
              <div className="absolute bottom-4 right-4 w-1.5 h-1.5 rounded-full bg-neutral-800/80 border border-white/5 shadow-inner" />

              {/* Top Center: Clip slot casing */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-10 bg-neutral-950 rounded-b-2xl border-x border-b border-white/10 shadow-inner flex items-center justify-center">
                <div className="w-8 h-2 bg-neutral-900 rounded-full border border-neutral-800" />
              </div>

              {/* Center: Base.vn Hexagonal soundwave Logo */}
              <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                <div className={`w-16 h-16 ${isPink ? 'text-[#a26d72]' : 'text-white/80'} flex items-center justify-center`}>
                  <svg viewBox="0 0 100 100" className="w-14 h-14" fill="currentColor">
                    <polygon points="50,5 90,28 90,72 50,95 10,72 10,28" stroke="currentColor" strokeWidth="6" fill="none" className="opacity-40" />
                    <polygon points="50,12 83,31 83,69 50,88 17,69 17,31" stroke="currentColor" strokeWidth="2" fill="none" className="opacity-15" />
                    <rect x="34" y="38" width="6" height="24" rx="3" />
                    <rect x="47" y="26" width="6" height="48" rx="3" />
                    <rect x="60" y="38" width="6" height="24" rx="3" />
                  </svg>
                </div>
                <div className="text-center">
                  <span className={`text-sm font-bold tracking-[0.25em] ${isPink ? 'text-[#a26d72]' : 'text-white/80'}`}>BASE.VN</span>
                  <span className="text-[7px] block font-mono text-white/30 tracking-widest mt-1 uppercase">Official Partner</span>
                </div>
              </div>

              {/* Bottom: 4 Charging Contact Pogo Pins */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-1.5">
                <div className="w-[72px] h-4 bg-neutral-950 rounded-full border border-white/5 shadow-inner flex items-center justify-around px-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-600/90 shadow-[0_1px_3px_rgba(234,179,8,0.3)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-600/90 shadow-[0_1px_3px_rgba(234,179,8,0.3)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-600/90 shadow-[0_1px_3px_rgba(234,179,8,0.3)]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-600/90 shadow-[0_1px_3px_rgba(234,179,8,0.3)]" />
                </div>
              </div>

              {/* Design signature */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center">
                <span className="text-[6px] font-mono tracking-wider text-white/20 uppercase">
                  Designed by Base.vn in Vietnam
                </span>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Exploded hardware view - updated to reflect real mechanical front/back */
          <div className="relative w-full h-[520px] flex flex-col items-center justify-center">
            {/* Exploded connectors */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <div className="absolute top-[40px] left-[15%] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <div className="h-[1px] w-24 bg-blue-400" />
                <div className="text-left">
                  <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1">
                    Vỏ Aluminum CNC
                  </div>
                  <div className="text-[9px] text-gray-500">Màu {color === 'space-gray' ? 'Xám Space' : 'Hồng Blossom'} siêu bền</div>
                </div>
              </div>

              <div className="absolute top-[135px] right-[10%] flex items-center gap-2 flex-row-reverse">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <div className="h-[1px] w-16 bg-blue-400" />
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">OLED Glass Capsule</div>
                  <div className="text-[9px] text-gray-500">Hiển thị đồng hồ pixel & trạng thái bóc băng</div>
                </div>
              </div>

              <div className="absolute top-[230px] left-[10%] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <div className="h-[1px] w-16 bg-blue-400" />
                <div className="text-left">
                  <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1">
                    Vòng Amber LED Ring
                  </div>
                  <div className="text-[9px] text-gray-500">Báo hiệu trạng thái AI xử lý</div>
                </div>
              </div>

              <div className="absolute bottom-[170px] right-[5%] flex items-center gap-2 flex-row-reverse">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <div className="h-[1px] w-24 bg-blue-400" />
                <div className="text-right">
                  <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Chip Amber Neural-1</div>
                  <div className="text-[9px] text-gray-500">Xử lý bóc băng voice offline</div>
                </div>
              </div>

              <div className="absolute bottom-[65px] left-[15%] flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                <div className="h-[1px] w-20 bg-blue-400" />
                <div className="text-left">
                  <div className="text-[10px] font-bold text-gray-900 uppercase tracking-wider">Pin Lithium 24 Giờ</div>
                  <div className="text-[9px] text-gray-500">Dung lượng cao cho 3 ngày họp</div>
                </div>
              </div>
            </div>

            {/* Layer 1: Front Aluminum CNC cover */}
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -160, opacity: 0.95, rotateX: 60, rotateZ: -15 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="absolute w-52 h-[310px] rounded-[24px] shadow-lg flex flex-col justify-between p-4 border border-white/20 overflow-hidden"
              style={{ background: primaryGrad }}
            >
              <div className="flex justify-between items-start mt-1">
                {/* Capsule glass slot */}
                <div className="w-24 h-6 rounded-full bg-black/80 border border-white/10" />
                {/* Switch dial indentation */}
                <div className="w-6 h-6 rounded-full bg-black/50 border border-white/10" />
              </div>
              <div className="text-center text-[7px] text-white/50 tracking-widest font-mono">CNC FRONT CASING</div>
              {/* Action ring dial */}
              <div className="w-10 h-10 rounded-full border border-white/20 mx-auto mb-2 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full border border-white/10" />
              </div>
            </motion.div>

            {/* Layer 2: Capsule OLED Display layer */}
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: -80, opacity: 0.9, rotateX: 60, rotateZ: -15 }}
              transition={{ duration: 0.8, delay: 0.1, type: 'spring' }}
              className="absolute w-40 h-12 rounded-full bg-black p-2 border border-white/30 flex items-center justify-between shadow-xl px-4"
            >
              <div className="flex flex-col text-left">
                <span className="text-[8px] font-mono font-bold text-amber-led tracking-wider">20:29</span>
                <span className="text-[5px] font-mono text-gray-500">OLED ACTIVE</span>
              </div>
              <div className="w-4 h-4 rounded-full bg-neutral-800" />
            </motion.div>

            {/* Layer 3: Dynamic Glow LED Amber Ring */}
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 0, opacity: 0.95, rotateX: 60, rotateZ: -15 }}
              transition={{ duration: 0.8, delay: 0.2, type: 'spring' }}
              className="absolute w-48 h-48 rounded-full border-2 border-amber-led/80 flex items-center justify-center"
              style={{
                boxShadow: '0 0 40px rgba(255, 159, 10, 0.4)',
                background: 'rgba(255, 159, 10, 0.05)',
              }}
            >
              <div className="w-24 h-24 rounded-full border border-amber-led/40 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-amber-led/30 shadow-[0_0_15px_rgba(255,159,10,0.5)]" />
              </div>
            </motion.div>

            {/* Layer 4: Main Logic Board (Neural-1, MEMS mics) */}
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 80, opacity: 0.95, rotateX: 60, rotateZ: -15 }}
              transition={{ duration: 0.8, delay: 0.3, type: 'spring' }}
              className="absolute w-52 h-[310px] rounded-[24px] bg-emerald-950/90 border border-emerald-500/30 p-4 shadow-xl flex flex-col justify-between"
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none rounded-[24px] bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:8px_8px]" />
              
              <div className="flex justify-between px-2">
                <div className="flex flex-col items-center">
                  <Mic className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-[5px] font-mono text-emerald-400">MEMS-L</span>
                </div>
                <div className="flex flex-col items-center">
                  <Mic className="w-3.5 h-3.5 text-yellow-500" />
                  <span className="text-[5px] font-mono text-emerald-400">MEMS-R</span>
                </div>
              </div>

              <div className="my-auto mx-auto flex flex-col items-center justify-center p-3 rounded-lg bg-black/60 border border-emerald-400/40 relative">
                <Cpu className="w-7 h-7 text-emerald-400 animate-pulse" />
                <span className="text-[7px] font-mono text-emerald-300 font-bold mt-1">AMBER NEURAL-1</span>
                <span className="text-[4px] font-mono text-gray-500 uppercase">Dual ANC Core</span>
                <div className="absolute -top-1 left-2 right-2 flex justify-between"><div className="w-0.5 h-1 bg-yellow-600"></div><div className="w-0.5 h-1 bg-yellow-600"></div><div className="w-0.5 h-1 bg-yellow-600"></div></div>
                <div className="absolute -bottom-1 left-2 right-2 flex justify-between"><div className="w-0.5 h-1 bg-yellow-600"></div><div className="w-0.5 h-1 bg-yellow-600"></div><div className="w-0.5 h-1 bg-yellow-600"></div></div>
              </div>

              <div className="text-center text-[7px] text-emerald-400/60 font-mono uppercase tracking-widest">
                System Logic Board (PCB)
              </div>
            </motion.div>

            {/* Layer 5: Battery Layer */}
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 150, opacity: 0.95, rotateX: 60, rotateZ: -15 }}
              transition={{ duration: 0.8, delay: 0.4, type: 'spring' }}
              className="absolute w-44 h-36 rounded-2xl bg-amber-900/60 border border-yellow-500/40 p-3 shadow-lg flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <Battery className="w-6 h-6 text-yellow-400" />
                <span className="text-[8px] font-mono text-yellow-400 font-bold">3.85V Li-Po</span>
              </div>
              <div className="h-10 border-t border-yellow-500/30 flex flex-col justify-center">
                <span className="text-[6px] font-mono text-yellow-400/70">CAPACITY: 1420mAh</span>
                <span className="text-[5px] font-mono text-yellow-400/50">24H CONTINUOUS RECORDING</span>
              </div>
            </motion.div>

            {/* Layer 6: Back Aluminum Plate Case */}
            <motion.div
              initial={{ y: 0, opacity: 0 }}
              animate={{ y: 210, opacity: 0.8, rotateX: 60, rotateZ: -15 }}
              transition={{ duration: 0.8, delay: 0.5, type: 'spring' }}
              className="absolute w-52 h-[310px] rounded-[24px] border border-white/10 shadow-sm flex flex-col justify-between p-4"
              style={{ background: primaryGrad }}
            >
              <div className="flex justify-center mt-1">
                {/* Back charging connector socket representation */}
                <div className="w-12 h-2.5 rounded-full bg-black/60" />
              </div>
              <div className="text-center text-[7px] text-white/40 tracking-wider font-mono mb-1">
                REAR HOUSING • DESIGNED BY BASE.VN
              </div>
            </motion.div>
          </div>
        )}
      </div>

      {/* Mode Switch Description */}
      {exploded && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-[11px] font-mono text-gray-500 mt-2 flex items-center justify-center gap-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-led animate-spin" />
          Rã lắp phần cứng 6 lớp (Exploded View) mô phỏng cấu trúc cơ khí cực kỳ chính xác.
        </motion.p>
      )}
    </div>
  );
}
