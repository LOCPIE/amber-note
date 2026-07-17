import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  ShieldCheck, 
  ChevronRight, 
  Tag, 
  X,
  Layers,
  Send,
  Building,
  Users
} from 'lucide-react';

import Header from './components/Header';
import StorytellingSection from './components/StorytellingSection';
import FlowVisualization from './components/FlowVisualization';
import WhyAmberNote from './components/WhyAmberNote';
import CompareSection from './components/CompareSection';
import DemoPlayground from './components/DemoPlayground';
import SpecsSection from './components/SpecsSection';
import TrustedEnterprises from './components/TrustedEnterprises';
import Footer from './components/Footer';
import { ProductColor } from './types';

// Fetch our beautifully generated images as URLs
const spaceGrayImg = 'https://base.vn/wp-content/uploads/2026/07/base-amber-note-gray.jpeg';
const blossomPinkImg = 'https://base.vn/wp-content/uploads/2026/07/base-amber-note-pink.jpeg';
const heroSpaceGrayImg = 'https://base.vn/wp-content/uploads/2026/07/Base-Amber-Note-Full-Gray.png';
const heroBlossomPinkImg = 'https://base.vn/wp-content/uploads/2026/07/Base-Amber-Note-Full-Pink.png';

export default function App() {
  const [activeColor, setActiveColor] = useState<ProductColor>('space-gray');
  const [preOrderOpen, setPreOrderOpen] = useState(false);
  const [consultationOpen, setConsultationOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pre-order form states
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    quantity: '5',
    color: 'space-gray'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Consultation form states
  const [consultData, setConsultData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    employees: '50-200',
    notes: ''
  });
  const [isConsultSubmitted, setIsConsultSubmitted] = useState(false);

  useEffect(() => {
    // Apple-style premium loading experience
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const handlePreOrderSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    try {
      await fetch('https://n8n.operation.basesystem.dev/webhook/33383510-aa8d-4c7a-8c52-acba9df6d8d8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'pre_order',
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (err) {
      console.error('Webhook submission error:', err);
    }
  };

  const handleConsultSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsConsultSubmitted(true);
    try {
      await fetch('https://n8n.operation.basesystem.dev/webhook/33383510-aa8d-4c7a-8c52-acba9df6d8d8', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType: 'consultation',
          ...consultData,
          timestamp: new Date().toISOString()
        }),
      });
    } catch (err) {
      console.error('Webhook submission error:', err);
    }
  };

  const resetPreOrder = () => {
    setPreOrderOpen(false);
    setIsSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      company: '',
      quantity: '5',
      color: 'space-gray'
    });
  };

  const resetConsultation = () => {
    setConsultationOpen(false);
    setIsConsultSubmitted(false);
    setConsultData({
      name: '',
      phone: '',
      email: '',
      company: '',
      employees: '50-200',
      notes: ''
    });
  };

  const handlePreOrderTrigger = (colorPreference?: ProductColor) => {
    if (colorPreference) {
      setFormData(prev => ({ ...prev, color: colorPreference }));
    }
    setPreOrderOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-black">
      
      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center"
            >
              <div className="relative flex items-center justify-center w-14 h-14 rounded-2xl bg-white text-black mb-4 shadow-xl">
                <span className="font-display font-extrabold text-2xl tracking-tighter">A</span>
                <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-amber-led animate-pulse" />
              </div>
              <span className="font-display font-bold text-lg tracking-widest text-white">AMBER NOTE</span>
              <span className="text-[9px] font-mono tracking-[0.5em] text-gray-500 uppercase mt-1">Transforming meetings to actions</span>
              <div className="w-24 h-[1px] bg-white/10 mt-6 overflow-hidden relative rounded">
                <motion.div 
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                  className="absolute top-0 w-12 h-full bg-amber-led"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Glassmorphic Header */}
      <Header 
        onPreOrderClick={() => handlePreOrderTrigger(activeColor)} 
        onContactClick={() => setConsultationOpen(true)} 
      />

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 min-h-[92vh] flex items-center overflow-hidden bg-gradient-to-b from-gray-50 to-white" id="hero-section">
        {/* Abstract lights background */}
        <div className="absolute top-0 right-0 w-[40%] h-[70%] bg-blue-500/5 rounded-full filter blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-center w-full relative py-12">
          
          {/* Left Text Block */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-left z-10">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs font-semibold text-blue-600"
            >
              <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse text-blue-500" />
              <span>Thiết bị AI Recording đầu tiên tích hợp Base.vn</span>
            </motion.div>

            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl font-display font-medium tracking-tight text-gray-900 leading-none"
              >
                Amber Note
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl sm:text-2xl font-medium tracking-tight text-gray-600 font-display"
              >
                Mọi cuộc trò chuyện đều có giá trị. Đừng để chúng bị lãng quên.
              </motion.p>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-sm sm:text-base text-gray-500 leading-relaxed max-w-xl"
            >
              Amber Note giúp doanh nghiệp ghi nhận mọi cuộc họp, cuộc gọi và trao đổi quan trọng, biến chúng thành dữ liệu nghiệp vụ có cấu trúc và tự động tạo hành động trực tiếp trên hệ sinh thái của Base.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <button
                onClick={() => {
                  const el = document.getElementById('demo-playground');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-gray-100 text-gray-900 text-xs font-semibold hover:bg-gray-200 transition-all gap-1 active:scale-98"
              >
                Trải nghiệm AI
                <ChevronRight className="w-4 h-4" />
              </button>
              
              <button
                onClick={() => handlePreOrderTrigger(activeColor)}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 shadow-lg shadow-blue-500/10 transition-all gap-1.5 active:scale-98"
              >
                Đặt trước ngay
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Enterprise Quick features ticker */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-100"
            >
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">24H PIN LIÊN TỤC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">TỰ ĐỘNG GIAO VIỆC</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-gray-400 shrink-0" />
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider font-bold">AES-256 BẢO MẬT</span>
              </div>
            </motion.div>
          </div>

          {/* Right Product Model Showcase */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex justify-center"
            >
              <div className="relative w-full max-w-[520px] aspect-[4/5] flex flex-col items-center justify-center p-4">
                {/* Colored background glow */}
                <div className={`absolute inset-0 w-80 h-80 sm:w-96 sm:h-96 rounded-full filter blur-[80px] pointer-events-none transition-all duration-700 opacity-25 ${
                  activeColor === 'blossom-pink' ? 'bg-pink-500/35' : 'bg-gray-500/30'
                }`} />

                {/* Product Photo Container with floating motion */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  className="relative w-[300px] sm:w-[440px] h-[360px] sm:h-[480px] flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeColor}
                      src={activeColor === 'blossom-pink' ? heroBlossomPinkImg : heroSpaceGrayImg}
                      alt={`Amber Note ${activeColor === 'blossom-pink' ? 'Blossom Pink' : 'Space Gray'}`}
                      referrerPolicy="no-referrer"
                      initial={{ opacity: 0, scale: 0.92, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.92, y: -10 }}
                      transition={{ duration: 0.4 }}
                      className="max-w-full max-h-full object-contain filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
                    />
                  </AnimatePresence>
                </motion.div>

                {/* Color selector */}
                <div className="bg-gray-100/80 backdrop-blur-md p-1 rounded-full flex gap-1 border border-gray-200 mt-6 z-10">
                  <button
                    onClick={() => setActiveColor('space-gray')}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeColor === 'space-gray' ? 'bg-black text-white shadow-sm' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Space Gray
                  </button>
                  <button
                    onClick={() => setActiveColor('blossom-pink')}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                      activeColor === 'blossom-pink' ? 'bg-white text-gray-900 shadow-sm border border-pink-100' : 'text-gray-500 hover:text-black'
                    }`}
                  >
                    Blossom Pink
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Storytelling Section */}
      <StorytellingSection />

      {/* Interactive AI Playground Simulation */}
      <DemoPlayground />

      {/* Dark event style Flow network visualization */}
      <FlowVisualization />

      {/* Bento Grid Advantanges list */}
      <WhyAmberNote />

      {/* Comparison table */}
      <CompareSection />

      {/* Specification sheet details */}
      <SpecsSection />

      {/* Trusted by Enterprises section with customer quotes and logos */}
      <TrustedEnterprises />

      {/* CTA Bottom Section with generated photos */}
      <section className="py-24 bg-gray-50 overflow-hidden" id="cta-bottom">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline and actions */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 inline-block">
                Khởi tạo tương lai vận hành
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-medium tracking-tight text-gray-900 leading-tight">
                Đừng để cuộc họp kết thúc... mà không có hành động.
              </h2>
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed">
                Amber Note biến mọi lời bàn thảo thành các công việc cụ thể được phân công, gán người thực hiện và giám sát tự động trên Base.vn. Đặt trước ngay hôm nay để nhận ưu đãi lên đến 20% cho doanh nghiệp của bạn.
              </p>
              
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => handlePreOrderTrigger(activeColor)}
                  className="px-6 py-3 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-lg shadow-blue-500/10 transition-all active:scale-98"
                >
                  Đặt trước ngay
                </button>
                <button
                  onClick={() => setConsultationOpen(true)}
                  className="px-6 py-3 rounded-full bg-white border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-all active:scale-98"
                >
                  Liên hệ tư vấn
                </button>
              </div>
            </div>

            {/* Right Column: Dynamic side-by-side product photos */}
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6 relative">
              
              {/* Card 1: Space Gray image */}
              <motion.div
                whileHover={{ y: -8, rotate: -1 }}
                className="bg-white p-3 rounded-3xl border border-gray-100 shadow-lg relative cursor-pointer"
                onClick={() => handlePreOrderTrigger('space-gray')}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
                  <img
                    src={spaceGrayImg}
                    alt="Amber Note Space Gray"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 text-[8px] font-mono font-bold uppercase tracking-wider text-black bg-white px-2 py-0.5 rounded border border-gray-100">
                    Space Gray
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-gray-900">Amber Note Gray</span>
                  <Tag className="w-3.5 h-3.5 text-gray-400" />
                </div>
              </motion.div>

              {/* Card 2: Blossom Pink image */}
              <motion.div
                whileHover={{ y: -8, rotate: 1 }}
                className="bg-white p-3 rounded-3xl border border-gray-100 shadow-lg relative cursor-pointer"
                onClick={() => handlePreOrderTrigger('blossom-pink')}
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 relative">
                  <img
                    src={blossomPinkImg}
                    alt="Amber Note Blossom Pink"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 text-[8px] font-mono font-bold uppercase tracking-wider text-pink-600 bg-white px-2 py-0.5 rounded border border-pink-100">
                    Blossom Pink
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between px-1">
                  <span className="text-xs font-bold text-gray-900">Amber Note Pink</span>
                  <Tag className="w-3.5 h-3.5 text-pink-400" />
                </div>
              </motion.div>

            </div>

          </div>
        </div>
      </section>

      {/* Pre-Order Modal Dialog */}
      <AnimatePresence>
        {preOrderOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Backdrop cover blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetPreOrder}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
            >
              {/* Close Button */}
              <button
                onClick={resetPreOrder}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                /* Form */
                <form onSubmit={handlePreOrderSubmit} className="space-y-4">
                  <div className="text-left space-y-1.5 pb-2 border-b border-gray-100">
                    <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">Pre-order Booking</span>
                    <h3 className="text-xl font-display font-medium text-gray-900">
                      Đặt trước Amber Note
                    </h3>
                    <p className="text-xs text-gray-400">Đăng ký đặt hàng trước để được ưu tiên giao lô hàng đầu tiên với giá tốt nhất.</p>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Phiên bản màu</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color: 'space-gray' }))}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                            formData.color === 'space-gray'
                              ? 'bg-black border-black text-white'
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-3.5 h-3.5 rounded-full bg-[#3A3D40] border border-white/20" />
                          Space Gray
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, color: 'blossom-pink' }))}
                          className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 ${
                            formData.color === 'blossom-pink'
                              ? 'bg-pink-50 border-pink-400 text-pink-700'
                              : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <div className="w-3.5 h-3.5 rounded-full bg-[#E8C5C8] border border-white/20" />
                          Blossom Pink
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Họ và tên</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                          placeholder="Nguyễn Văn A"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Số điện thoại</label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                          placeholder="0912345678"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Email liên hệ</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                        placeholder="ten@congty.com"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Tên doanh nghiệp</label>
                        <input
                          type="text"
                          required
                          value={formData.company}
                          onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                          placeholder="Công ty TNHH Phát Đạt"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Số lượng đặt hàng</label>
                        <select
                          value={formData.quantity}
                          onChange={(e) => setFormData(p => ({ ...p, quantity: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <option value="1">1 thiết bị (Cá nhân)</option>
                          <option value="5">5 thiết bị (Phòng ban nhỏ)</option>
                          <option value="10">10 thiết bị (Nhóm kinh doanh)</option>
                          <option value="30">30 thiết bị (Khối Sales)</option>
                          <option value="50">50+ thiết bị (Toàn doanh nghiệp)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 pt-2"
                  >
                    <Send className="w-4 h-4" />
                    Xác nhận đặt trước
                  </button>
                </form>
              ) : (
                /* Success Receipt Card */
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle className="w-8 h-8 stroke-[2.5px]" />
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900">Đặt trước thành công!</h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                      Cảm ơn <strong>{formData.name}</strong> từ <strong>{formData.company}</strong> đã lựa chọn thiết bị thông minh Amber Note.
                    </p>
                  </div>

                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-2xl text-left text-xs text-gray-600 space-y-1.5 font-mono">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Phiên bản:</span>
                      <span className="font-bold uppercase text-gray-900">{formData.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Số lượng:</span>
                      <span className="font-bold text-gray-900">{formData.quantity} máy</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Đơn giá dự kiến:</span>
                      <span className="font-bold text-gray-900">3,500,000 VND / máy</span>
                    </div>
                    <div className="flex justify-between border-t border-gray-200/60 pt-1.5 mt-1.5 font-bold text-blue-600">
                      <span>Chiết khấu pre-order:</span>
                      <span>-15%</span>
                    </div>
                  </div>

                  <button
                    onClick={resetPreOrder}
                    className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-all"
                  >
                    Đóng cửa sổ
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Consultation Modal Dialog */}
      <AnimatePresence>
        {consultationOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={resetConsultation}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="relative w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-2xl p-6 sm:p-8 overflow-hidden z-10"
            >
              <button
                onClick={resetConsultation}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              {!isConsultSubmitted ? (
                <form onSubmit={handleConsultSubmit} className="space-y-4">
                  <div className="text-left space-y-1.5 pb-2 border-b border-gray-100">
                    <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">Enterprise Consultation</span>
                    <h3 className="text-xl font-display font-medium text-gray-900">
                      Tư vấn giải pháp họp
                    </h3>
                    <p className="text-xs text-gray-400">Yêu cầu khảo sát và tư vấn trực tiếp từ chuyên viên giải pháp tích hợp Base AI.</p>
                  </div>

                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Họ tên người liên hệ</label>
                        <input
                          type="text"
                          required
                          value={consultData.name}
                          onChange={(e) => setConsultData(p => ({ ...p, name: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                          placeholder="Nguyễn Văn B"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Điện thoại</label>
                        <input
                          type="tel"
                          required
                          value={consultData.phone}
                          onChange={(e) => setConsultData(p => ({ ...p, phone: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                          placeholder="0912345678"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Email</label>
                        <input
                          type="email"
                          required
                          value={consultData.email}
                          onChange={(e) => setConsultData(p => ({ ...p, email: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                          placeholder="b@congty.com"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Quy mô nhân sự</label>
                        <select
                          value={consultData.employees}
                          onChange={(e) => setConsultData(p => ({ ...p, employees: e.target.value }))}
                          className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs bg-white outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
                        >
                          <option value="under-50">Dưới 50 người</option>
                          <option value="50-200">Từ 50 - 200 người</option>
                          <option value="200-500">Từ 200 - 500 người</option>
                          <option value="above-500">Trên 500 người (Enterprise)</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Tên công ty</label>
                      <input
                        type="text"
                        required
                        value={consultData.company}
                        onChange={(e) => setConsultData(p => ({ ...p, company: e.target.value }))}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none"
                        placeholder="Tập đoàn Phát Đạt"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-bold font-mono text-gray-400 uppercase block mb-1">Yêu cầu cụ thể</label>
                      <textarea
                        value={consultData.notes}
                        onChange={(e) => setConsultData(p => ({ ...p, notes: e.target.value }))}
                        rows={3}
                        className="w-full px-3.5 py-2 rounded-xl border border-gray-200 text-xs focus:ring-1 focus:ring-blue-600 focus:border-blue-600 outline-none resize-none"
                        placeholder="Nêu vướng mắc hiện tại trong quy trình báo cáo cuộc gọi hoặc lập biên bản họp..."
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-black hover:bg-neutral-800 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 pt-2"
                  >
                    <Building className="w-4 h-4" />
                    Đăng ký tư vấn doanh nghiệp
                  </button>
                </form>
              ) : (
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="space-y-6 text-center py-6"
                >
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
                    <Users className="w-8 h-8 stroke-[2.5px]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xl font-bold text-gray-900">Yêu cầu đã được tiếp nhận!</h4>
                    <p className="text-xs text-gray-500 leading-relaxed max-w-xs mx-auto">
                      Cảm ơn anh/chị <strong>{consultData.name}</strong>. Chuyên viên giải pháp doanh nghiệp từ Base.vn sẽ liên hệ trực tiếp trong vòng 15 phút.
                    </p>
                  </div>

                  <button
                    onClick={resetConsultation}
                    className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-all"
                  >
                    Đóng cửa sổ
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Elegant Footer with Dual Logos */}
      <Footer />

    </div>
  );
}
