import { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  Minimize2, 
  RefreshCw, 
  User, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Cpu,
  Zap,
  Tag,
  MessageSquare,
  ChevronRight
} from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['giá', 'bao nhiêu', 'chi phí', 'mua', 'đặt cọc', 'ưu đãi', 'voucher', 'cọc'],
    response: `**Chương trình Đặt Hàng Trước (Pre-order) Amber Note:**\n\n• **Số tiền đặt cọc:** Chỉ **500,000 VNĐ**\n• **Đặc quyền Pre-order:**\n  - Voucher giảm trực tiếp **1,000,000 VNĐ** khi mở bán chính thức.\n  - Tặng kèm **Tai nghe thu âm chuyên dụng** cho cuộc họp phòng Lab.\n  - Tặng **1 năm gói bản quyền Base AI Pro** tích hợp tự động giao việc.\n• **Hai phiên bản màu sắc:** Space Gray (Xám Không Gian) & Blossom Pink (Hồng Anh Đào) nguyên khối Titan.\n\nAnh/Chị có muốn để lại thông tin để nhận ưu đãi cọc ngay hôm nay không ạ?`
  },
  {
    keywords: ['so sánh', 'điện thoại', 'máy ghi âm', 'thường', 'vượt trội', 'khác biệt'],
    response: `**Ma trận so sánh Amber Note vs Điện thoại & Máy ghi âm thường:**\n\n1. **Chất lượng thu âm:** Amber Note tích hợp **4 Micro AI định hướng** & chip **H26 Max** chuyên dụng bóc tách giọng nói tốt hơn hẳn điện thoại.\n2. **AI Transcript & Summary:** Điện thoại chỉ ghi âm âm thanh đơn thuần, trong khi Amber Note tự động gỡ băng, tóm tắt key points & tự động giao việc.\n3. **Mã hóa phần cứng:** Trang bị thuật toán **AES/Rijndael** độc quyền bảo mật dữ liệu.\n4. **Đồng bộ hệ sinh thái:** Kết nối trực tiếp với **Base Wework, Base CRM, Base Meeting & Base Workflow** mà không cần xuất file thủ công.`
  },
  {
    keywords: ['bảo mật', 'mã hóa', 'an toàn', 'cloud', 'aes', 'rijndael', 'dữ liệu'],
    response: `**Tiêu chuẩn Bảo mật Doanh nghiệp của Amber Note:**\n\n• **Mã hóa AES/Rijndael:** File âm thanh được mã hóa trực tiếp bằng phần cứng ngay từ khi thu âm.\n• **Khép kín hoàn toàn:** Vận hành trên hạ tầng cloud bảo mật doanh nghiệp của Base.vn, đảm bảo 100% tri thức cuộc họp không bị rò rỉ.\n• **AI On-Device:** Nhiều tính năng AI bóc tách giọng nói chạy trực tiếp trên chip H26 Max mà không cần đẩy dữ liệu lên máy chủ công cộng.`
  },
  {
    keywords: ['base', 'wework', 'crm', 'meeting', 'tích hợp', 'giao việc', 'workflow'],
    response: `**Khả năng Tích hợp sâu với Hệ sinh thái Base.vn:**\n\n• **Base Wework:** Tự động tạo task, gán đúng người phụ trách & deadline ngay sau cuộc họp.\n• **Base Meeting:** Tự động đẩy biên bản họp & ghi chú đàm phán tức thì.\n• **Base CRM:** Tự đồng bộ thông tin cuộc gọi tư vấn khách hàng, cập nhật giai đoạn Deal & giá trị hợp đồng.\n• **Base Workflow:** Tự khởi tạo quy trình duyệt công việc dựa trên kết luận buổi họp.`
  },
  {
    keywords: ['thông số', 'cấu hình', 'pin', 'micro', 'chip', 'titan', 'kỹ thuật', 'sạc'],
    response: `**Thông số Kỹ thuật Nổi bật của Amber Note:**\n\n• **Hệ thống Micro:** 4 Micro AI định hướng thu âm đa chiều.\n• **Bộ xử lý:** Chip AI H26 Max tăng tốc nhận diện giọng nói.\n• **Thời lượng pin:** **24 giờ** hoạt động liên tục.\n• **Công nghệ sạc:** Sạc từ tính Magnetic Charging 4 chân.\n• **Chất liệu:** Vỏ hợp kim Titan siêu nhẹ, siêu bền.\n• **Trọng lượng & Độ dày:** Thiết kế siêu mỏng bỏ túi tiện lợi.`
  }
];

const DEFAULT_RESPONSE = `Cảm ơn Anh/Chị đã quan tâm đến **Amber Note**! 

Amber Note là thiết bị ghi âm AI chuyên dụng dành cho doanh nghiệp, tự động bóc tách cuộc họp thành hành động & task trên Base.vn.

Anh/Chị có thể hỏi em về:
1. 💰 **Chính sách Pre-order & Giá ưu đãi**
2. ⚡ **Tích hợp Base Wework & Base CRM**
3. 🔒 **Bảo mật mã hóa AES-256 phần cứng**
4. 🎙️ **Thông số 4 Micro AI & Chip H26 Max**

Anh/Chị cần hỗ trợ thông tin nào cụ thể ạ?`;

export default function AiChatBox({ 
  onOpenPreOrder, 
  onOpenConsultation 
}: { 
  onOpenPreOrder: () => void; 
  onOpenConsultation: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: 'Xin chào! Em là **Trợ lý Amber AI**. Em có thể giúp Anh/Chị giải đáp thông tin về thiết bị ghi âm AI Amber Note và các chính sách ưu đãi đặt cọc ngay hôm nay ạ! 👋',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickActions: [
        { label: '💰 Ưu đãi Pre-order', action: 'Ưu đãi đặt cọc Pre-order' },
        { label: '⚡ So sánh tính năng', action: 'So sánh Amber Note với máy ghi âm thường' },
        { label: '🔒 Bảo mật AES-256', action: 'Bảo mật dữ liệu doanh nghiệp' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Simulate AI response thinking and matching logic
    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      let matchedResponse = KNOWLEDGE_BASE.find(item =>
        item.keywords.some(kw => lowerQuery.includes(kw))
      )?.response;

      if (!matchedResponse) {
        matchedResponse = DEFAULT_RESPONSE;
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: matchedResponse,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: lowerQuery.includes('giá') || lowerQuery.includes('ưu đãi') || lowerQuery.includes('cọc')
          ? [{ label: '📝 Đặt cọc 500k ngay', action: 'PRE_ORDER_TRIGGER' }, { label: '📞 Nhận tư vấn giải pháp', action: 'CONSULT_TRIGGER' }]
          : [{ label: '💰 Xem giá Pre-order', action: 'Ưu đãi Pre-order' }, { label: '⚡ Tích hợp Base.vn', action: 'Tích hợp Base.vn' }]
      };

      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickAction = (action: string) => {
    if (action === 'PRE_ORDER_TRIGGER') {
      onOpenPreOrder();
      return;
    }
    if (action === 'CONSULT_TRIGGER') {
      onOpenConsultation();
      return;
    }
    handleSend(action);
  };

  // Helper to format basic markdown (bold text and line breaks)
  const formatText = (content: string) => {
    const parts = content.split('\n');
    return parts.map((line, idx) => {
      // Bold handling
      const formattedLine = line.split(/(\*\*.*?\*\*)/g).map((chunk, index) => {
        if (chunk.startsWith('**') && chunk.endsWith('**')) {
          return <strong key={index} className="font-semibold text-gray-900 dark:text-white">{chunk.slice(2, -2)}</strong>;
        }
        return chunk;
      });

      return (
        <span key={idx} className="block min-h-[1.25em]">
          {formattedLine}
        </span>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Floating Chat Trigger Button */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            {hasUnread && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 z-10">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 border-2 border-white"></span>
              </span>
            )}
            
            <button
              onClick={() => setIsOpen(true)}
              className="group flex items-center gap-3 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white p-3.5 pr-5 rounded-full shadow-2xl shadow-blue-600/40 hover:shadow-blue-600/60 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              aria-label="Mở Trợ lý AI Amber Note"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-white/20 backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div className="text-left">
                <p className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                  Trợ lý Amber AI
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                </p>
                <p className="text-[10px] text-blue-100/90 font-medium">Hỏi đáp & Tư vấn 24/7</p>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {/* Chat Box Popup */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[85vh] bg-white rounded-3xl shadow-2xl shadow-gray-900/20 border border-gray-100 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-gray-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-blue-600/30 border border-blue-400/30 text-blue-300 backdrop-blur-sm">
                  <Bot className="w-5 h-5" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-gray-900"></span>
                </div>
                <div>
                  <h3 className="text-sm font-bold flex items-center gap-1.5">
                    Amber AI Assistant
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </h3>
                  <p className="text-[11px] text-blue-200/80">Chuyên viên tư vấn sản phẩm Amber Note</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  title="Thu nhỏ"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-blue-50/80 px-4 py-2 border-b border-blue-100/60 flex items-center justify-between text-xs text-blue-900">
              <span className="flex items-center gap-1.5 font-medium">
                <Tag className="w-3.5 h-3.5 text-blue-600" />
                Cọc 500k nhận Voucher 1Tr
              </span>
              <button
                onClick={onOpenPreOrder}
                className="font-bold text-blue-700 hover:text-blue-800 flex items-center gap-0.5 underline cursor-pointer"
              >
                Đặt ngay
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Messages Scroll Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[88%]">
                    {msg.sender === 'ai' && (
                      <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs shrink-0 mb-1 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md shadow-blue-500/10'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                      }`}
                    >
                      {formatText(msg.text)}
                    </div>
                  </div>

                  <span className="text-[10px] text-gray-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Quick action buttons attached to AI message */}
                  {msg.quickActions && msg.quickActions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleQuickAction(qa.action)}
                          className="text-[11px] font-semibold bg-white text-blue-700 hover:bg-blue-600 hover:text-white border border-blue-200 px-3 py-1.5 rounded-full shadow-xs transition-all active:scale-95 cursor-pointer flex items-center gap-1"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-none shadow-xs flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Starter Chips */}
            <div className="px-3 py-2 bg-white border-t border-gray-100 flex gap-1.5 overflow-x-auto scrollbar-none text-nowrap">
              <button
                onClick={() => handleSend('Amber Note giá bao nhiêu?')}
                className="text-[10px] font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer shrink-0"
              >
                💡 Giá Pre-order
              </button>
              <button
                onClick={() => handleSend('So sánh với máy ghi âm thường')}
                className="text-[10px] font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer shrink-0"
              >
                🎙️ So sánh tính năng
              </button>
              <button
                onClick={() => handleSend('Bảo mật dữ liệu như thế nào?')}
                className="text-[10px] font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer shrink-0"
              >
                🔒 Bảo mật AES-256
              </button>
              <button
                onClick={() => handleSend('Tích hợp Base Wework như thế nào?')}
                className="text-[10px] font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 px-2.5 py-1 rounded-full transition-colors cursor-pointer shrink-0"
              >
                ⚡ Tích hợp Base.vn
              </button>
            </div>

            {/* Input Form */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSend();
              }}
              className="p-3 bg-white border-t border-gray-100 flex items-center gap-2"
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Nhập câu hỏi về Amber Note..."
                className="flex-1 text-xs px-3.5 py-2.5 rounded-xl bg-gray-100 border border-transparent focus:border-blue-500 focus:bg-white focus:outline-none transition-all placeholder:text-gray-400 text-gray-900"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2.5 rounded-xl bg-blue-600 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-blue-700 transition-all active:scale-95 cursor-pointer shrink-0 shadow-sm shadow-blue-500/20"
                aria-label="Gửi tin nhắn"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
