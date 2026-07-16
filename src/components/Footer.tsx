import { Facebook, Linkedin, Globe, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white border-t border-gray-100 py-16" id="main-footer">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Block with logo and quick text */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-100 items-start">
          
          {/* Brand Column (md:col-span-5) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={handleScrollToTop}>
              <img 
                src="https://static-gcdn.basecdn.net/landing/base.vn/image/v2/logo/base.png" 
                alt="Base.vn Logo" 
                className="h-5 sm:h-6 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="text-gray-300 font-light text-lg">|</span>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm sm:text-base tracking-tight text-gray-900 leading-none">Amber Note</span>
                <span className="text-[9px] font-mono tracking-wider text-gray-400 mt-0.5 uppercase leading-none">AI Recording</span>
              </div>
            </div>
            
            <p className="text-xs sm:text-sm text-gray-500 max-w-sm leading-relaxed">
              Thiết bị AI Recording đầu tiên được tích hợp đồng bộ trực tiếp vào hệ sinh thái quản lý doanh nghiệp Base.vn. Record một lần, hành động chạy vĩnh viễn.
            </p>
          </div>

          {/* Quick links Columns */}
          <div className="md:col-span-4 grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider">Hệ sinh thái</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="https://base.vn" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Base.vn Platform</a></li>
                <li><a href="https://base.vn/workflow" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Base Workflow</a></li>
                <li><a href="https://base.vn/crm" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Base CRM</a></li>
                <li><a href="https://base.vn/meeting" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">Base Meeting</a></li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider">Sản phẩm</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="#why-amber-note" className="hover:text-black transition-colors">Tính năng cốt lõi</a></li>
                <li><a href="#specs-section" className="hover:text-black transition-colors">Thông số phần cứng</a></li>
                <li><a href="#compare-section" className="hover:text-black transition-colors">Ma trận so sánh</a></li>
                <li><a href="#demo-playground" className="hover:text-black transition-colors">Thử nghiệm AI</a></li>
              </ul>
            </div>
          </div>

          {/* Legal / Contact Columns */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider">Bản quyền & Phát triển</h4>
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-2 text-xs text-gray-500">
              <div className="flex items-center gap-1.5 font-bold text-gray-900">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Base AI Innovation Lab</span>
              </div>
              <p className="text-[11px] leading-relaxed">Phát triển bởi đội ngũ kỹ sư Base.vn nhằm mang lại trải nghiệm tối ưu văn phòng không giấy tờ.</p>
            </div>
          </div>

        </div>

        {/* Bottom Block with Social and Copy */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-4 text-xs text-gray-500">
          <div className="text-center sm:text-left">
            <span>© {currentYear} Amber Note by Base.vn. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="https://base.vn" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 border border-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-all" title="Website">
              <Globe className="w-4 h-4" />
            </a>
            <a href="https://www.facebook.com/base.vietnam" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 border border-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-all" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/baseinc/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 border border-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-all" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://zalo.me/basevn" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 border border-gray-100 rounded-full text-gray-500 hover:text-black hover:bg-gray-100 transition-all" title="Zalo">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                <path d="M9 9h6l-6 6h6" />
              </svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
