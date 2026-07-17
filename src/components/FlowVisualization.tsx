import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mic, 
  FileText, 
  Clipboard, 
  TrendingUp, 
  Video, 
  GitBranch, 
  CheckSquare, 
  Cpu,
  Users,
  Briefcase
} from 'lucide-react';

interface NetworkNode {
  id: string;
  label: string;
  icon: any;
  angle: number; // angle in degrees
  color: string;
  delay: number;
}

const NODES: NetworkNode[] = [
  { id: 'meeting', label: 'Meeting', icon: Video, angle: 0, color: '#0A84FF', delay: 0 },
  { id: 'task', label: 'Task', icon: CheckSquare, angle: 36, color: '#64D2FF', delay: 0.2 },
  { id: 'crm', label: 'CRM', icon: TrendingUp, angle: 72, color: '#FF453A', delay: 0.4 },
  { id: 'contact', label: 'Contact', icon: Users, angle: 108, color: '#FFD60A', delay: 0.6 },
  { id: 'summary', label: 'Summary', icon: Clipboard, angle: 144, color: '#BF5AF2', delay: 0.8 },
  { id: 'workflow', label: 'Workflow', icon: GitBranch, angle: 180, color: '#5E5CE6', delay: 1.0 },
  { id: 'ehiring', label: 'EHiring', icon: Briefcase, angle: 216, color: '#30D158', delay: 1.2 },
  { id: 'transcript', label: 'Transcript', icon: FileText, angle: 252, color: '#FF9F0A', delay: 1.4 },
  { id: 'recording', label: 'Recording', icon: Mic, angle: 288, color: '#FF375F', delay: 1.6 },
  { id: 'base-ai', label: 'Base AI', icon: Cpu, angle: 324, color: '#00C7BE', delay: 1.8 }
];

export default function FlowVisualization() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pulseKey, setPulseKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 bg-black text-white overflow-hidden relative" id="flow-section">
      
      {/* Cinematic Starfield & Ambient Lighting backdrops */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(10,132,255,0.08)_0%,rgba(0,0,0,0)_70%)] pointer-events-none" />
      
      {/* Background Star Dots */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16 sm:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-led font-mono font-bold uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            Vũ Trụ Đồng Bộ Dữ Liệu
          </motion.div>
          <h2 className="text-4xl sm:text-6xl font-display font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500">
            Hệ sinh thái thông minh
          </h2>
          <p className="text-sm sm:text-base text-gray-400 max-w-xl mx-auto mt-4">
            Từ cốt lõi Amber Note, các dòng dữ liệu được phân tích bằng AI và chuyển giao tức thì đến mọi ứng dụng cốt lõi của doanh nghiệp.
          </p>
        </div>

        {/* Dynamic Orbital Network Graphics */}
        <div className="relative w-full max-w-[800px] aspect-square mx-auto flex items-center justify-center mt-6">
          
          {/* Glowing Concentric Orbital Ring Lines */}
          <div className="absolute w-[80%] h-[80%] rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute w-[60%] h-[60%] rounded-full border border-white/5 pointer-events-none animate-[spin_100s_linear_infinite]" />
          <div className="absolute w-[40%] h-[40%] rounded-full border border-white/5 pointer-events-none" />

          {/* Glowing Laser beams radiating from center to nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <radialGradient id="beam-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FF9F0A" stopOpacity="1" />
                <stop offset="100%" stopColor="#0A84FF" stopOpacity="0" />
              </radialGradient>
            </defs>
            {NODES.map((node) => {
              // Convert polar angle to X/Y relative coordinates (center is 50%, 50%)
              const rad = (node.angle * Math.PI) / 180;
              const radius = 38; // Radius percent from center
              const x2 = 50 + radius * Math.cos(rad);
              const y2 = 50 + radius * Math.sin(rad);
              
              const isHovered = hoveredNode === node.id;
              
              return (
                <g key={node.id}>
                  {/* Static thin connection wire line */}
                  <line
                    x1="50%"
                    y1="50%"
                    x2={`${x2}%`}
                    y2={`${y2}%`}
                    stroke={isHovered ? node.color : 'rgba(255, 255, 255, 0.08)'}
                    strokeWidth={isHovered ? 2 : 1}
                    className="transition-all duration-300"
                  />
                  
                  {/* Laser light pulse animating along the wire */}
                  <motion.circle
                    r={isHovered ? 4 : 2}
                    fill={node.color}
                    initial={{ cx: '50%', cy: '50%' }}
                    animate={{
                      cx: ['50%', `${x2}%`],
                      cy: ['50%', `${y2}%`],
                      opacity: [0, 1, 1, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      delay: node.delay,
                      ease: 'easeInOut'
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Central Pulsating Node: Amber Note Hardware Card */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute z-20 w-32 sm:w-40 aspect-[4/5] bg-neutral-900 border-2 border-amber-led/60 rounded-2xl flex flex-col justify-between p-3 cursor-pointer shadow-3xl shadow-amber-500/20"
            style={{
              boxShadow: '0 0 45px rgba(255, 159, 10, 0.15)',
            }}
          >
            <div className="flex justify-between items-center">
              <span className="text-[6px] font-mono text-amber-led tracking-widest font-bold">CORE DEVICE</span>
              <div className="w-2 h-2 rounded-full bg-amber-led animate-ping" />
            </div>

            {/* Glowing Amber Circle inside device */}
            <div className="w-12 h-12 rounded-full border border-amber-led/30 mx-auto flex items-center justify-center relative">
              <motion.div
                className="w-8 h-8 rounded-full bg-amber-led"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.8, 1, 0.8],
                  boxShadow: [
                    '0 0 10px rgba(255,159,10,0.5)',
                    '0 0 25px rgba(255,159,10,0.9)',
                    '0 0 10px rgba(255,159,10,0.5)'
                  ]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            <div className="text-center">
              <p className="text-[9px] font-display font-medium text-white/90 tracking-[0.2em]">AMBER NOTE</p>
              <p className="text-[6px] font-mono text-white/40 mt-0.5 uppercase tracking-wider">AI Recording Core</p>
            </div>
          </motion.div>

          {/* Concentric expanding shockwaves representing AI broadcasts */}
          {[1, 2, 3].map((idx) => (
            <motion.div
              key={idx}
              className="absolute w-44 h-44 rounded-full border border-amber-led/20 pointer-events-none"
              animate={{
                scale: [1, 4],
                opacity: [0.6, 0]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: idx * 2,
                ease: 'easeOut'
              }}
            />
          ))}

          {/* Surrounding Nodes aligned on orbital path */}
          {NODES.map((node) => {
            const rad = (node.angle * Math.PI) / 180;
            const radius = 38; // Match percent radius
            const left = 50 + radius * Math.cos(rad);
            const top = 50 + radius * Math.sin(rad);
            
            const IconComponent = node.icon;
            const isHovered = hoveredNode === node.id;

            return (
              <div
                key={node.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
                style={{
                  left: `${left}%`,
                  top: `${top}%`
                }}
              >
                <motion.div
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  whileHover={{ scale: 1.15, y: -4 }}
                  className="w-10 sm:w-14 h-10 sm:h-14 rounded-2xl bg-neutral-900 border flex items-center justify-center cursor-pointer transition-colors relative"
                  style={{
                    borderColor: isHovered ? node.color : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isHovered ? `0 0 20px ${node.color}50` : 'none'
                  }}
                >
                  {/* Dynamic background light aura */}
                  {isHovered && (
                    <div 
                      className="absolute inset-0 rounded-2xl opacity-20 filter blur-[10px]" 
                      style={{ backgroundColor: node.color }}
                    />
                  )}
                  <IconComponent className="w-5 sm:w-6 h-5 sm:h-6 transition-colors" style={{ color: isHovered ? node.color : '#A1A1AA' }} />
                </motion.div>
                
                {/* Text Label */}
                <span 
                  className={`text-[9px] sm:text-xs font-medium tracking-wide mt-2 text-center transition-colors px-1.5 py-0.5 rounded ${
                    isHovered ? 'text-white font-bold bg-white/5 border border-white/5' : 'text-gray-400'
                  }`}
                >
                  {node.label}
                </span>
              </div>
            );
          })}

        </div>



      </div>
    </section>
  );
}
