import { DemoPreset, SpecItem, WhyCard } from './types';

export const DEMO_PRESETS: DemoPreset[] = [
  {
    id: 'meeting-client',
    title: 'Meeting - Trao đổi thông tin & Catchup khách hàng',
    duration: '01:35',
    category: 'Khách hàng',
    transcript: [
      { speaker: 'Minh Thảo (Account Manager)', text: 'Em chào anh Hoàng, tuần vừa rồi bên em đã hoàn tất việc tối ưu hóa luồng vận hành kho bãi cho mình. Không biết anh Hoàng đánh giá thế nào ạ?', time: '0:05' },
      { speaker: 'Anh Hoàng (Đối tác)', text: 'Chào Thảo. Nhìn chung hệ thống chạy khá ổn định, thời gian xử lý đơn hàng giảm được 30% rồi. Tuy nhiên, anh muốn bổ sung thêm báo cáo tự động gửi qua email vào 8h sáng mỗi ngày.', time: '0:22' },
      { speaker: 'Minh Thảo (Account Manager)', text: 'Dạ vâng, yêu cầu này rất thực tế. Em sẽ làm việc với đội kỹ thuật để cập nhật tính năng gửi email báo cáo tự động trước ngày 18/07 nhé anh.', time: '0:50' },
      { speaker: 'Anh Hoàng (Đối tác)', text: 'Ok Thảo, nếu hoàn thành đúng hạn thì đầu tháng tới chúng ta ký tiếp hợp đồng giai đoạn 2 luôn.', time: '1:12' },
      { speaker: 'Minh Thảo (Account Manager)', text: 'Dạ tuyệt vời quá ạ, em đã nắm rõ. Em sẽ lên task ngay cho kỹ thuật.', time: '1:30' }
    ],
    summary: {
      overview: 'Buổi họp catchup tiến độ dự án vận hành kho bãi với đối tác Hoàng. Khách hàng đánh giá tốt hiệu quả giảm 30% thời gian xử lý đơn, đồng thời yêu cầu bổ sung tính năng báo cáo email tự động lúc 8h sáng hàng ngày.',
      keyPoints: [
        'Hệ thống vận hành kho bãi giảm 30% thời gian xử lý đơn hàng, hoạt động ổn định.',
        'Bổ sung tính năng báo cáo gửi email tự động vào 8h sáng hàng ngày trước 18/07.',
        'Dự kiến ký kết hợp đồng giai đoạn 2 vào đầu tháng sau nếu hoàn tất đúng hạn.'
      ]
    },
    tasks: [
      {
        title: 'Phát triển tính năng tự động gửi báo cáo email vào 8h sáng',
        assignee: 'Đức Anh (Kỹ thuật)',
        deadline: '18/07/2026',
        status: 'In Progress',
        baseApp: 'Base Workflow'
      },
      {
        title: 'Soạn thảo tài liệu bàn giao giai đoạn 1 & Phác thảo HĐ Giai đoạn 2',
        assignee: 'Minh Thảo (Account)',
        deadline: '20/07/2026',
        status: 'Pending',
        baseApp: 'Base Workflow'
      },
      {
        title: 'Xác nhận tiến độ vận hành kho bãi giai đoạn 1 với khách hàng',
        assignee: 'Minh Thảo (Account)',
        deadline: '15/07/2026',
        status: 'Completed',
        baseApp: 'Base Meeting'
      }
    ]
  },
  {
    id: 'support-call',
    title: 'Call - Chăm sóc & Tiếp nhận bài toán khách hàng',
    duration: '01:50',
    category: 'Chăm sóc',
    transcript: [
      { speaker: 'Thanh Vân (Chăm sóc khách hàng)', text: 'Dạ alo em chào chị Hằng, em gọi điện từ phòng hỗ trợ kỹ thuật Base.vn. Không biết hệ thống quản lý công việc của bên mình tuần này vận hành có gặp vướng mắc gì không chị?', time: '0:08' },
      { speaker: 'Chị Hằng (Khách hàng)', text: 'Chào Vân, may quá em gọi. Bên chị đang tuyển thêm 50 nhân sự mới trong tháng này nhưng chưa biết cách phân quyền hàng loạt nhanh chóng, làm thủ công thì lâu quá.', time: '0:25' },
      { speaker: 'Thanh Vân (Chăm sóc khách hàng)', text: 'Dạ em hiểu rồi ạ, đây là bài toán tối ưu phân quyền nhân sự. Em sẽ phân tích yêu cầu này và chuyển ngay cho bạn chuyên viên kỹ thuật thiết lập template import hàng loạt cho chị.', time: '0:51' },
      { speaker: 'Chị Hằng (Khách hàng)', text: 'Thế thì tốt quá, nhờ Vân gửi cho chị hướng dẫn sử dụng trước ngày 17/07 nhé.', time: '1:24' },
      { speaker: 'Thanh Vân (Chăm sóc khách hàng)', text: 'Dạ vâng, em sẽ gửi tài liệu hướng dẫn và liên hệ hỗ trợ trực tiếp chị Hằng trước ngày 17/07 ạ.', time: '1:45' }
    ],
    summary: {
      overview: 'Cuộc gọi chăm sóc khách hàng tiếp nhận bài toán phân quyền hàng loạt cho 50 nhân sự mới của chị Hằng. Hệ thống tự động ghi âm và phân tích ngay sau cuộc gọi, chuyển tiếp yêu cầu kỹ thuật xử lý bài toán import phân quyền.',
      keyPoints: [
        'Khách hàng cần phân quyền hàng loạt nhanh chóng cho 50 nhân sự mới.',
        'Chuyển giao bài toán kỹ thuật lập template import phân quyền hàng loạt trước 16/07.',
        'Gửi tài liệu hướng dẫn sử dụng chi tiết cho khách hàng trước 17/07.'
      ]
    },
    tasks: [
      {
        title: 'Thiết lập template import phân quyền nhân sự hàng loạt',
        assignee: 'Hoàng Lâm (Kỹ thuật)',
        deadline: '16/07/2026',
        status: 'In Progress',
        baseApp: 'Base Workflow'
      },
      {
        title: 'Gửi tài liệu hướng dẫn sử dụng phân quyền & Gọi hỗ trợ',
        assignee: 'Thanh Vân (Customer Support)',
        deadline: '17/07/2026',
        status: 'Pending',
        baseApp: 'Base Workflow'
      }
    ]
  },
  {
    id: 'personal-consultation',
    title: 'Tư vấn - Khám sức khỏe, bảo hiểm, sản phẩm cá nhân',
    duration: '02:05',
    category: 'Tư vấn cá nhân',
    transcript: [
      { speaker: 'Bác sĩ Hoài Nam (Chuyên gia tư vấn)', text: 'Chào chị Lan, dựa trên kết quả xét nghiệm tổng quát của chị, các chỉ số huyết áp và đường huyết đều ở mức lý tưởng. Tuy nhiên, chỉ số cholesterol hơi cao một chút.', time: '0:10' },
      { speaker: 'Chị Lan (Khách hàng)', text: 'Dạ bác sĩ, em cũng hay ăn đồ chiên xào và ít tập thể dục. Bác sĩ tư vấn giúp em chế độ ăn uống và gói bảo hiểm sức khỏe phù hợp để phòng ngừa với ạ.', time: '0:32' },
      { speaker: 'Bác sĩ Hoài Nam (Chuyên gia tư vấn)', text: 'Tôi khuyên chị nên giảm 70% chất béo động vật, tăng cường đi bộ tối thiểu 30 phút mỗi ngày. Về gói bảo hiểm sức khỏe, bạn tư vấn viên sẽ gửi cho chị gói bảo hiểm Care Pro bảo lãnh viện phí 100% để chị an tâm.', time: '1:05' },
      { speaker: 'Chị Lan (Khách hàng)', text: 'Dạ em cảm ơn bác sĩ nhiều, em sẽ đợi thông tin gói bảo hiểm sức khỏe từ bạn tư vấn viên.', time: '1:35' },
      { speaker: 'Bác sĩ Hoài Nam (Chuyên gia tư vấn)', text: 'Vâng, nhờ bạn Thư gửi thông tin gói bảo hiểm Care Pro và lộ trình dinh dưỡng cho chị Lan trong chiều nay nhé.', time: '1:55' }
    ],
    summary: {
      overview: 'Buổi tư vấn cá nhân chăm sóc sức khỏe và gói bảo hiểm đi kèm cho chị Lan. Bác sĩ phân tích chỉ số cholesterol và đề xuất lộ trình dinh dưỡng kèm việc gửi báo giá gói bảo hiểm Care Pro bảo lãnh viện phí.',
      keyPoints: [
        'Khách hàng Lan có chỉ số cholesterol hơi cao, cần điều chỉnh chế độ dinh dưỡng giảm 70% chất béo động vật.',
        'Khuyến nghị đi bộ tối thiểu 30 phút mỗi ngày để tăng cường sức khỏe tim mạch.',
        'Gửi báo giá và thông tin chi tiết gói bảo hiểm Care Pro bảo lãnh viện phí 100% trong hôm nay.'
      ]
    },
    tasks: [
      {
        title: 'Thiết lập lộ trình dinh dưỡng & Bài tập vận động giảm cholesterol',
        assignee: 'Bác sĩ Hoài Nam',
        deadline: '16/07/2026',
        status: 'Completed',
        baseApp: 'Base Workflow'
      },
      {
        title: 'Gửi báo giá gói bảo hiểm Care Pro & Hướng dẫn bảo lãnh viện phí',
        assignee: 'Minh Thư (Tư vấn viên)',
        deadline: '15/07/2026',
        status: 'In Progress',
        baseApp: 'Base CRM'
      }
    ],
    crmSync: {
      dealName: 'Gói bảo hiểm sức khỏe Care Pro - Chị Lan',
      stage: 'Tư vấn & Báo giá',
      value: '15,500,000 VND',
      notes: 'Khách hàng tư vấn sức khỏe trực tiếp, quan tâm đến quyền lợi bảo lãnh viện phí 100%.'
    }
  },
  {
    id: 'executive-meeting',
    title: 'Họp với Sếp - Thống nhất kết luận & Tự tạo task',
    duration: '02:20',
    category: 'Nội bộ',
    transcript: [
      { speaker: 'Sếp Minh (CEO)', text: 'Chào cả team. Chiến dịch ra mắt sản phẩm mới vào tháng sau rất quan trọng. Tôi muốn chốt kế hoạch Marketing và chuẩn bị hệ thống hạ tầng server sẵn sàng cho lượng truy cập lớn.', time: '0:12' },
      { speaker: 'Khánh Linh (Marketing Manager)', text: 'Dạ thưa sếp, kế hoạch Marketing tổng thể đã hoàn thiện 90%. Em sẽ gửi bản kế hoạch chi tiết ngân sách trước ngày 17/07 để sếp duyệt ạ.', time: '0:40' },
      { speaker: 'Tuấn Kiệt (IT Director)', text: 'Về phần hạ tầng, em sẽ cho tối ưu và nâng cấp tải server lên gấp 3 lần bình thường, hoàn thành kiểm thử chịu tải (Load test) trước ngày 19/07 ạ.', time: '1:15' },
      { speaker: 'Sếp Minh (CEO)', text: 'Tốt lắm. Linh hoàn thành Marketing Plan gửi tôi duyệt, Kiệt chịu trách nhiệm Load test server. Họp xong hệ thống Amber Note tự bóc tách và giao việc trực tiếp cho hai bạn luôn nhé.', time: '1:48' },
      { speaker: 'Khánh Linh (Marketing Manager)', text: 'Dạ vâng sếp, tụi em sẽ triển khai ngay lập tức.', time: '2:10' }
    ],
    summary: {
      overview: 'Buổi họp thống nhất kế hoạch ra mắt sản phẩm mới của CEO Minh cùng Ban điều hành. Thống nhất các mốc deadline quan trọng về kế hoạch Marketing và nâng cấp, kiểm thử tải hạ tầng máy chủ.',
      keyPoints: [
        'Chiến dịch ra mắt sản phẩm mới là trọng tâm hàng đầu của tháng tới.',
        'Khánh Linh hoàn thiện và gửi duyệt kế hoạch chi tiết ngân sách Marketing trước 17/07.',
        'Tuấn Kiệt hoàn tất nâng cấp và kiểm thử chịu tải (Load test) hạ tầng server trước 19/07.'
      ]
    },
    tasks: [
      {
        title: 'Hoàn thiện và gửi duyệt kế hoạch ngân sách Marketing',
        assignee: 'Khánh Linh (Marketing)',
        deadline: '17/07/2026',
        status: 'In Progress',
        baseApp: 'Base Workflow'
      },
      {
        title: 'Thực hiện nâng cấp tải hạ tầng & Load test server',
        assignee: 'Tuấn Kiệt (IT)',
        deadline: '19/07/2026',
        status: 'In Progress',
        baseApp: 'Base Workflow'
      }
    ]
  }
];

export const WHY_CARDS: WhyCard[] = [
  {
    title: 'Native với Base.vn',
    description: 'Sinh ra để hoạt động bên trong hệ sinh thái Base. Không cần tải lên. Không cần nhập liệu lại.',
    iconName: 'Cpu'
  },
  {
    title: 'AI tự hiểu cuộc họp',
    description: 'Tự động nhận diện danh tính người phát biểu (Speaker Diarization), bóc tách công việc cần làm, xác định rõ deadline và người chịu trách nhiệm.',
    iconName: 'Sparkles'
  },
  {
    title: 'Giao việc tự động',
    description: 'Dưới sự phê duyệt của bạn, AI tự động tạo task trên Base Workflow, gán đúng người, đặt deadline chính xác theo đúng thảo luận trong phòng họp.',
    iconName: 'ClipboardCheck'
  },
  {
    title: 'CRM Integration',
    description: 'Cuộc gọi bán hàng hoặc buổi tư vấn trực tiếp được tự động đồng bộ hóa, cập nhật tiến trình và giá trị Deal trên hệ thống Base CRM.',
    iconName: 'Layers'
  },
  {
    title: 'Meeting Notes Tức Thì',
    description: 'Gửi thẳng biên bản cuộc họp chi tiết kèm tóm tắt hành động lên Base Meeting ngay khi cuộc thảo luận vừa kết thúc.',
    iconName: 'FileText'
  },
  {
    title: 'Enterprise Security',
    description: 'Mã hóa dữ liệu AES-256 từ đầu đến cuối. Đảm bảo toàn bộ tri thức doanh nghiệp nằm hoàn toàn trong phân vùng đám mây an toàn riêng tư.',
    iconName: 'ShieldCheck'
  }
];

export const SPEC_ITEMS: SpecItem[] = [
  {
    iconName: 'Mic',
    label: 'AI Recording System',
    value: 'Dual High-Fidelity Mic',
    desc: 'Mảng micro kép độ nhạy cao, thu âm khoảng cách xa lên đến 8 mét rõ nét.'
  },
  {
    iconName: 'Activity',
    label: 'Noise Reduction',
    value: 'Dual-Core ANC Engine',
    desc: 'Chủ động triệt tiêu tiếng ồn môi trường văn phòng, tạp âm bàn phím.'
  },
  {
    iconName: 'Battery',
    label: 'Battery Life',
    value: '24 Hours Continuous',
    desc: 'Thời lượng pin hoạt động liên tục vượt trội, sạc nhanh USB-C tiện lợi.'
  },
  {
    iconName: 'Shield',
    label: 'Enterprise Ready',
    value: 'AES-256 Cloud Encryption',
    desc: 'Mã hóa dữ liệu từ phần cứng lên đám mây, an toàn tuyệt đối.'
  },
  {
    iconName: 'Cpu',
    label: 'AI Processor',
    value: 'Amber Neural-1 Chip',
    desc: 'Xử lý giọng nói, nén file chất lượng cao và chuyển đổi offline thông minh.'
  },
  {
    iconName: 'Zap',
    label: 'Instant Sync',
    value: 'Base Sync Protocol',
    desc: 'Kết nối Wi-Fi 6 tốc độ cao, đồng bộ dữ liệu chỉ mất 3 giây ngay sau khi tắt ghi âm.'
  }
];

export const COMPARE_DATA = [
  { feature: 'Ghi âm chất lượng cao', normal: true, amber: true },
  { feature: 'Chuyển lời nói thành văn bản', normal: false, amber: true },
  { feature: 'Tự động tóm tắt cuộc họp', normal: false, amber: true },
  { feature: 'CRM Sync (Tự cập nhật cơ hội bán hàng)', normal: false, amber: true },
  { feature: 'Meeting Sync (Đồng bộ lịch & biên bản)', normal: false, amber: true },
  { feature: 'Auto Task (Tự bóc tách & giao việc)', normal: false, amber: true },
  { feature: 'Base Workflow integration (Tích hợp luồng công việc)', normal: false, amber: true },
  { feature: 'Corporate Knowledge (Kho lưu trữ tri thức)', normal: false, amber: true }
];
