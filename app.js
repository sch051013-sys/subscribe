// =============================================================
// 구독다이어트 (SubDiet) - app.js
// 단독 실행 가능한 올인원 자바스크립트 파일
// =============================================================

// -------------------------------------------------------------
// 1. 기본 프리셋 데이터 및 추천 알고리즘 정의
// -------------------------------------------------------------

const SUBSCRIPTION_CATEGORIES = [
  { id: 'all', name: '전체', icon: '✨' },
  { id: 'ott', name: 'OTT/영상', icon: '🎬' },
  { id: 'music', name: '음악', icon: '🎵' },
  { id: 'ai', name: 'AI/생산성', icon: '🤖' },
  { id: 'life', name: '쇼핑/라이프', icon: '🛒' },
];

const PRESET_SERVICES = [
  // OTT / 영상
  {
    id: 'netflix',
    name: '넷플릭스',
    category: 'ott',
    price: 13500,
    iconBg: '#E50914',
    iconColor: '#FFFFFF',
    iconText: 'N',
    badge: '스탠다드',
    desc: '오리지널 드라마, 영화, 해외 시리즈',
    defaultHours: 6,
    defaultBillingDay: 22,
    cancelUrl: 'https://www.netflix.com/youraccount'
  },
  {
    id: 'youtube_premium',
    name: '유튜브 프리미엄',
    category: 'ott',
    price: 14900,
    iconBg: '#FF0000',
    iconColor: '#FFFFFF',
    iconText: '▶',
    badge: '음악포함',
    desc: '광고 제거, 백그라운드 재생, 유튜브 뮤직',
    defaultHours: 40,
    defaultBillingDay: 5,
    cancelUrl: 'https://www.youtube.com/paid_memberships'
  },
  {
    id: 'tving',
    name: '티빙 (TVING)',
    category: 'ott',
    price: 9500,
    iconBg: '#FF153C',
    iconColor: '#FFFFFF',
    iconText: 'T',
    badge: 'KBO·tvN',
    desc: 'tvN, JTBC 드라마·예능 & 프로야구',
    defaultHours: 8,
    defaultBillingDay: 14,
    cancelUrl: 'https://www.tving.com/my/subscription'
  },
  {
    id: 'disney_plus',
    name: '디즈니+',
    category: 'ott',
    price: 9900,
    iconBg: '#113CCF',
    iconColor: '#FFFFFF',
    iconText: 'D+',
    badge: '스탠다드',
    desc: '마블, 스타워즈, 디즈니 애니메이션, 무빙',
    defaultHours: 4,
    defaultBillingDay: 28,
    cancelUrl: 'https://www.disneyplus.com/account'
  },
  {
    id: 'wavve',
    name: '웨이브 (Wavve)',
    category: 'ott',
    price: 7900,
    iconBg: '#1B56F5',
    iconColor: '#FFFFFF',
    iconText: 'W',
    badge: '지상파 3사',
    desc: 'KBS, SBS, MBC 본방 직후 다시보기',
    defaultHours: 3,
    defaultBillingDay: 19,
    cancelUrl: 'https://www.wavve.com/my/membership'
  },
  {
    id: 'coupang_play',
    name: '쿠팡플레이',
    category: 'ott',
    price: 7890,
    iconBg: '#00A8FF',
    iconColor: '#FFFFFF',
    iconText: 'CP',
    badge: '와우회원 무료',
    desc: 'SNL 코리아, 국가대표 축구, 해외 축구',
    defaultHours: 12,
    defaultBillingDay: 11,
    cancelUrl: 'https://loyalty.coupang.com'
  },
  {
    id: 'watcha',
    name: '왓챠 (WATCHA)',
    category: 'ott',
    price: 7900,
    iconBg: '#FF0558',
    iconColor: '#FFFFFF',
    iconText: 'W',
    badge: '명작/웹툰',
    desc: '취향 저격 영화, 미드, 웹툰 감상',
    defaultHours: 3,
    defaultBillingDay: 17,
    cancelUrl: 'https://watcha.com/settings'
  },
  {
    id: 'apple_tv',
    name: '애플TV+',
    category: 'ott',
    price: 6500,
    iconBg: '#000000',
    iconColor: '#FFFFFF',
    iconText: 'tv',
    badge: '웰메이드',
    desc: '파칭코, 세브란스, 슬로호시스',
    defaultHours: 2,
    defaultBillingDay: 25,
    cancelUrl: 'https://tv.apple.com'
  },

  // 음악 (Music)
  {
    id: 'melon',
    name: '멜론 (Melon)',
    category: 'music',
    price: 8700,
    iconBg: '#00CD3C',
    iconColor: '#FFFFFF',
    iconText: 'M',
    badge: '국내 1위',
    desc: '국내 최대 음원 및 TOP100 차트',
    defaultHours: 30,
    defaultBillingDay: 10,
    cancelUrl: 'https://www.melon.com'
  },
  {
    id: 'spotify',
    name: '스포티파이',
    category: 'music',
    price: 10900,
    iconBg: '#1ED760',
    iconColor: '#000000',
    iconText: '♬',
    badge: '취향추천',
    desc: '글로벌 플레이리스트 & AI 디제이',
    defaultHours: 25,
    defaultBillingDay: 8,
    cancelUrl: 'https://www.spotify.com/account'
  },
  {
    id: 'youtube_music',
    name: '유튜브 뮤직 (단독)',
    category: 'music',
    price: 11990,
    iconBg: '#FF0000',
    iconColor: '#FFFFFF',
    iconText: '▶M',
    badge: '음원+영상',
    desc: '유튜브 커버곡, 라이브 영상 음원',
    defaultHours: 25,
    defaultBillingDay: 5,
    cancelUrl: 'https://music.youtube.com'
  },
  {
    id: 'genie',
    name: '지니뮤직',
    category: 'music',
    price: 7400,
    iconBg: '#0080FF',
    iconColor: '#FFFFFF',
    iconText: 'G',
    badge: '통신사할인',
    desc: 'KT·LGU+ 멤버십 포인트 결제 혜택',
    defaultHours: 18,
    defaultBillingDay: 15,
    cancelUrl: 'https://www.genie.co.kr'
  },
  {
    id: 'flo',
    name: '플로 (FLO)',
    category: 'music',
    price: 7900,
    iconBg: '#3F3FFF',
    iconColor: '#FFFFFF',
    iconText: 'F',
    badge: 'SKT연계',
    desc: '내 취향 MIX 스트리밍',
    defaultHours: 15,
    defaultBillingDay: 16,
    cancelUrl: 'https://www.music-flo.com'
  },
  {
    id: 'apple_music',
    name: '애플뮤직',
    category: 'music',
    price: 8900,
    iconBg: '#FA243C',
    iconColor: '#FFFFFF',
    iconText: '',
    badge: '무손실음원',
    desc: '돌비 애트모스 공간음향 & 애플 기기 연동',
    defaultHours: 20,
    defaultBillingDay: 20,
    cancelUrl: 'https://music.apple.com'
  },

  // AI & 생산성
  {
    id: 'chatgpt_plus',
    name: 'ChatGPT Plus',
    category: 'ai',
    price: 27000,
    iconBg: '#10A37F',
    iconColor: '#FFFFFF',
    iconText: 'GPT',
    badge: '대세 AI',
    desc: 'GPT-4o, DALL·E 및 심층 분석 기능',
    defaultHours: 15,
    defaultBillingDay: 1,
    cancelUrl: 'https://chatgpt.com/#settings'
  },
  {
    id: 'claude_pro',
    name: 'Claude Pro',
    category: 'ai',
    price: 27000,
    iconBg: '#D97706',
    iconColor: '#FFFFFF',
    iconText: 'C',
    badge: '코딩·글쓰기',
    desc: 'Claude 3.5 Sonnet 및 긴 프로젝트 문맥',
    defaultHours: 12,
    defaultBillingDay: 18,
    cancelUrl: 'https://claude.ai/settings/billing'
  },
  {
    id: 'wrtn_plus',
    name: '뤼튼 (Wrtn) 플러스',
    category: 'ai',
    price: 9900,
    iconBg: '#4F46E5',
    iconColor: '#FFFFFF',
    iconText: 'W',
    badge: '한국형 AI',
    desc: '다양한 최신 LLM 모아보기 & 캐릭터 챗',
    defaultHours: 8,
    defaultBillingDay: 7,
    cancelUrl: 'https://wrtn.ai'
  },
  {
    id: 'notion_plus',
    name: '노션 Plus',
    category: 'ai',
    price: 13000,
    iconBg: '#111827',
    iconColor: '#FFFFFF',
    iconText: 'N',
    badge: '문서·정리',
    desc: '무제한 블록 & 대용량 파일 공유',
    defaultHours: 20,
    defaultBillingDay: 12,
    cancelUrl: 'https://www.notion.so/settings'
  },
  {
    id: 'midjourney',
    name: '미드저니 (Basic)',
    category: 'ai',
    price: 13500,
    iconBg: '#2D3748',
    iconColor: '#FFFFFF',
    iconText: 'MJ',
    badge: '이미지생성',
    desc: '초고화질 AI 일러스트 및 아트워크 제작',
    defaultHours: 4,
    defaultBillingDay: 23,
    cancelUrl: 'https://www.midjourney.com/account'
  },
  {
    id: 'ms365',
    name: '마이크로소프트 365',
    category: 'ai',
    price: 8900,
    iconBg: '#D83B01',
    iconColor: '#FFFFFF',
    iconText: 'O',
    badge: '오피스+1TB',
    desc: 'Word, Excel, PowerPoint & 1TB 원드라이브',
    defaultHours: 12,
    defaultBillingDay: 30,
    cancelUrl: 'https://account.microsoft.com/services'
  },

  // 라이프 & 쇼핑
  {
    id: 'naver_plus',
    name: '네이버플러스 멤버십',
    category: 'life',
    price: 4900,
    iconBg: '#03C75A',
    iconColor: '#FFFFFF',
    iconText: 'N+',
    badge: '최대 5% 적립',
    desc: '네이버쇼핑 추가 적립 + 티빙 무료 혜택',
    defaultHours: 15,
    defaultBillingDay: 24,
    cancelUrl: 'https://nid.naver.com/membership'
  },
  {
    id: 'kurly_pass',
    name: '컬리패스',
    category: 'life',
    price: 4500,
    iconBg: '#5F0080',
    iconColor: '#FFFFFF',
    iconText: 'K',
    badge: '샛별배송 무료',
    desc: '15,000원 이상 무제한 무료배송',
    defaultHours: 6,
    defaultBillingDay: 13,
    cancelUrl: 'https://www.kurly.com/mypage'
  },
  {
    id: 'yogipass',
    name: '요기요 요기패스',
    category: 'life',
    price: 4900,
    iconBg: '#FA0050',
    iconColor: '#FFFFFF',
    iconText: 'Y',
    badge: '배달비 무료',
    desc: '무제한 무료 배달 및 포장 주문 추가 할인',
    defaultHours: 6,
    defaultBillingDay: 9,
    cancelUrl: 'https://www.yogiyo.co.kr'
  },
  {
    id: 'millie',
    name: '밀리의 서재',
    category: 'life',
    price: 9900,
    iconBg: '#FEE500',
    iconColor: '#333333',
    iconText: '밀',
    badge: '전자책 무제한',
    desc: '16만 권 전자책 및 오디오북 무제한 독서',
    defaultHours: 4,
    defaultBillingDay: 26,
    cancelUrl: 'https://www.millie.co.kr'
  },
  {
    id: 'ridiselect',
    name: '리디셀렉트',
    category: 'life',
    price: 4900,
    iconBg: '#1F8CE6',
    iconColor: '#FFFFFF',
    iconText: 'R',
    badge: '베스트셀러',
    desc: '엄선된 베스트셀러 및 프리미엄 아티클',
    defaultHours: 3,
    defaultBillingDay: 2,
    cancelUrl: 'https://select.ridibooks.com'
  }
];

const USAGE_PRESETS = [
  { label: '거의 안 봄', hours: 2, icon: '😴', desc: '월 1~2시간' },
  { label: '가끔 봄', hours: 8, icon: '☕', desc: '월 8시간' },
  { label: '적당히 봄', hours: 20, icon: '🍿', desc: '월 20시간' },
  { label: '매일 봄', hours: 50, icon: '🔥', desc: '월 50시간+' }
];

function createSampleTrials() {
  const today = new Date();
  const format = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;

  const end1 = new Date();
  end1.setDate(today.getDate() + 3);
  const start1 = new Date();
  start1.setDate(today.getDate() - 11);

  const end2 = new Date();
  end2.setDate(today.getDate() + 7);
  const start2 = new Date();
  start2.setDate(today.getDate() - 23);

  return [
    {
      id: 'trial_tving',
      serviceName: '티빙 (TVING)',
      category: 'ott',
      iconBg: '#FF153C',
      iconColor: '#FFFFFF',
      iconText: 'T',
      regularPrice: 9500,
      startDate: format(start1),
      endDate: format(end1),
      notifyBeforeDays: [3, 1],
      cancelUrl: 'https://www.tving.com/my/subscription',
      memo: '프로야구 포스트시즌 시청용 14일 무료체험'
    },
    {
      id: 'trial_millie',
      serviceName: '밀리의 서재',
      category: 'life',
      iconBg: '#FEE500',
      iconColor: '#333333',
      iconText: '밀',
      regularPrice: 9900,
      startDate: format(start2),
      endDate: format(end2),
      notifyBeforeDays: [3, 1],
      cancelUrl: 'https://www.millie.co.kr',
      memo: '첫 달 무료체험 이벤트'
    }
  ];
}

const SMART_RECOMMENDATIONS = [
  {
    id: 'ott_jumper',
    title: 'OTT 한 달씩 갈아타는 [메뚜기 전략] 🦗',
    targetCategory: 'ott',
    condition: (userSubs, unusedCount) => {
      const ottSubs = userSubs.filter(s => s.category === 'ott');
      return ottSubs.length >= 2 && unusedCount >= 1;
    },
    badge: '연 12만원 절약',
    description: '여러 OTT를 매달 동시에 켜두면 돈이 줄줄 샙니다! 보고 싶은 신작이 올라올 때 한 달만 결제하고, 다 보면 티빙이나 웨이브로 갈아타는 메뚜기 구독을 실천해보세요.',
    tip: '💡 팁: 결제 당일 바로 [구독 해지 예약]을 해두면 한 달 뒤 자동 결제 없이 편하게 이용할 수 있어요!'
  },
  {
    id: 'youtube_bundle',
    title: '유튜브 뮤직 중복 지출 해결하기 🎧',
    targetCategory: 'music',
    condition: (userSubs) => {
      const hasMusic = userSubs.some(s => ['melon', 'genie', 'flo', 'spotify'].includes(s.id));
      const hasYt = userSubs.some(s => s.id === 'youtube_premium');
      return hasMusic && hasYt;
    },
    badge: '중복 지출 발견 🚨',
    description: '유튜브 프리미엄(14,900원)에는 이미 [유튜브 뮤직]이 무료로 포함되어 있어요! 별도로 멜론이나 스포티파이를 쓰고 계시다면, 하나로 합쳐서 매달 8,700원~10,900원을 즉시 아낄 수 있습니다.',
    tip: '💡 팁: 기존 음악 앱의 플레이리스트는 무료 툴로 유튜브 뮤직에 1분 만에 옮길 수 있어요.'
  },
  {
    id: 'naver_tving_combo',
    title: '네이버 플러스 멤버십으로 티빙 알뜰 시청 💡',
    targetCategory: 'ott',
    condition: (userSubs) => {
      const hasTving = userSubs.some(s => s.id === 'tving');
      const hasNaver = userSubs.some(s => s.id === 'naver_plus');
      return hasTving && !hasNaver;
    },
    badge: '요금 다이어트',
    description: '티빙을 단독 구독(9,500원) 중이신가요? 네이버플러스 멤버십(월 4,900원)에 가입하면 티빙 방송 무제한 혜택을 무료로 고를 수 있어 매달 4,600원을 절약하면서 네이버쇼핑 적립까지 챙깁니다.',
    tip: '💡 팁: 네이버 멤버십 MY 페이지에서 디지털 콘텐츠 혜택을 [티빙]으로 지정하면 끝!'
  },
  {
    id: 'coupang_wow_free_play',
    title: '가성비 최강: 쿠팡 와우 + 쿠팡플레이 활용 📦',
    targetCategory: 'ott',
    condition: (userSubs) => {
      const ottCount = userSubs.filter(s => s.category === 'ott').length;
      const hasCoupang = userSubs.some(s => s.id === 'coupang_play');
      return ottCount >= 2 && !hasCoupang;
    },
    badge: '가성비 OTT 추천',
    description: '로켓배송을 월 2~3회 이상 쓰신다면 쿠팡 와우 멤버십(7,890원) 하나로 무료배송, 무료반품뿐만 아니라 [쿠팡플레이]까지 무제한 시청할 수 있어요.',
    tip: '💡 팁: SNL 코리아, 해외 축구 생중계, 최신 영화 라인업이 풍부합니다.'
  },
  {
    id: 'disney_family_sharing',
    title: '디즈니+ 몰아보기 후 즉시 해지 권장 🎬',
    targetCategory: 'ott',
    condition: (userSubs) => {
      return userSubs.some(s => s.id === 'disney_plus' && s.hours <= 4);
    },
    badge: '이용량 저조 경고',
    description: '디즈니+ 이용 시간이 한 달에 4시간 이하로 매우 적어요. 마블이나 스타워즈 등 기다리던 신작 시리즈가 전편 완결되었을 때만 딱 1달 가입해 몰아보는 것을 강력 추천합니다.',
    tip: '💡 팁: 평소엔 해지해두고 보고 싶은 시리즈가 나올 때만 가입하세요.'
  },
  {
    id: 'ai_tool_diet',
    title: 'ChatGPT & Claude AI 구독 단일화 🤖',
    targetCategory: 'ai',
    condition: (userSubs) => {
      const hasGpt = userSubs.some(s => s.id === 'chatgpt_plus');
      const hasClaude = userSubs.some(s => s.id === 'claude_pro');
      return hasGpt && hasClaude;
    },
    badge: '월 27,000원 세이브',
    description: 'ChatGPT Plus와 Claude Pro를 둘 다 유료 구독하고 계시네요(월 54,000원 지출!). 둘 중 하나를 무료 버전으로 전환하면 1년에 32만 원이 절약됩니다.',
    tip: '💡 팁: 둘 중 하나는 무료 버전으로도 충분히 일상 활용이 가능해요.'
  }
];

// -------------------------------------------------------------
// 2. 앱 전역 상태 관리
// -------------------------------------------------------------

const state = {
  activeTab: 'diet', // 'diet' | 'calendar' | 'trials'
  currentScreen: 'intro', // 'intro', 'select', 'usage', 'result', 'calendar', 'trials'
  currentCategory: 'all',
  selectedServices: new Map(), // serviceId -> itemData
  customServices: [],
  calendarDate: new Date(),
  selectedCalendarDay: null,
  trials: createSampleTrials(),
};

// -------------------------------------------------------------
// 3. 화면 & 하단 탭 전환 네비게이션
// -------------------------------------------------------------

function navigateTo(screenName) {
  state.currentScreen = screenName;
  state.activeTab = 'diet';
  updateBottomNavUI();

  const screens = {
    intro: document.getElementById('screen-intro'),
    select: document.getElementById('screen-select'),
    usage: document.getElementById('screen-usage'),
    result: document.getElementById('screen-result'),
    calendar: document.getElementById('screen-calendar'),
    trials: document.getElementById('screen-trials'),
  };

  Object.keys(screens).forEach(key => {
    const el = screens[key];
    if (el) {
      if (key === screenName) {
        el.classList.remove('hidden');
        setTimeout(() => el.classList.add('active'), 10);
      } else {
        el.classList.remove('active');
        el.classList.add('hidden');
      }
    }
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  const activeScreenEl = screens[screenName];
  if (activeScreenEl) {
    const scrollBody = activeScreenEl.querySelector('.screen-scroll-body');
    if (scrollBody) scrollBody.scrollTop = 0;
  }

  if (screenName === 'select') {
    renderCategoryTabs();
    renderServiceCards();
    updateSelectBottomBar();
  } else if (screenName === 'usage') {
    renderUsageCards();
  } else if (screenName === 'result') {
    renderResultReport();
    triggerCelebration();
  } else if (screenName === 'calendar') {
    renderCalendar();
  } else if (screenName === 'trials') {
    renderTrials();
  }
}

function switchTab(tabName) {
  state.activeTab = tabName;
  updateBottomNavUI();

  if (tabName === 'diet') {
    const target = state.currentScreen === 'calendar' || state.currentScreen === 'trials'
      ? (state.selectedServices.size > 0 ? 'result' : 'intro')
      : state.currentScreen;
    navigateTo(target);
  } else if (tabName === 'calendar') {
    navigateTo('calendar');
  } else if (tabName === 'trials') {
    navigateTo('trials');
  }
}

function updateBottomNavUI() {
  const btnDiet = document.getElementById('tab-btn-diet');
  const btnCal = document.getElementById('tab-btn-calendar');
  const btnTrials = document.getElementById('tab-btn-trials');
  const trialBadge = document.getElementById('nav-trial-badge');

  const setBtnActive = (btn, isActive) => {
    if (!btn) return;
    const label = btn.querySelector('span:last-child');
    if (isActive) {
      btn.className = 'flex flex-col items-center gap-1 text-blue-600 transition-all cursor-pointer';
      if (label) label.className = 'text-[11px] font-extrabold text-blue-600';
    } else {
      btn.className = 'flex flex-col items-center gap-1 text-slate-400 hover:text-slate-700 transition-all cursor-pointer';
      if (label) label.className = 'text-[11px] font-bold text-slate-400';
    }
  };

  setBtnActive(btnDiet, state.activeTab === 'diet');
  setBtnActive(btnCal, state.activeTab === 'calendar');
  setBtnActive(btnTrials, state.activeTab === 'trials');

  if (trialBadge) {
    const hasUrgent = state.trials.some(t => {
      const diff = Math.ceil((new Date(t.endDate) - new Date()) / (1000 * 60 * 60 * 24));
      return diff <= 3;
    });
    trialBadge.classList.toggle('hidden', !hasUrgent);
  }
}

// -------------------------------------------------------------
// 4. 구독 서비스 선택 (Step 1)
// -------------------------------------------------------------

function renderCategoryTabs() {
  const container = document.getElementById('category-tabs-container');
  if (!container) return;

  container.innerHTML = SUBSCRIPTION_CATEGORIES.map(cat => {
    const isSelected = state.currentCategory === cat.id;
    return `
      <button 
        type="button"
        onclick="handleCategoryChange('${cat.id}')"
        class="whitespace-nowrap px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
          isSelected 
            ? 'bg-blue-600 text-white shadow-sm shadow-blue-200 ring-2 ring-blue-600/30' 
            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
        }"
      >
        <span>${cat.icon}</span>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');
}

function handleCategoryChange(catId) {
  state.currentCategory = catId;
  renderCategoryTabs();
  renderServiceCards();
}

function getAllAvailableServices() {
  return [...PRESET_SERVICES, ...state.customServices];
}

function renderServiceCards() {
  const container = document.getElementById('services-grid');
  if (!container) return;

  const allServices = getAllAvailableServices();
  const filtered = state.currentCategory === 'all' 
    ? allServices 
    : allServices.filter(s => s.category === state.currentCategory);

  container.innerHTML = filtered.map(svc => {
    const isSelected = state.selectedServices.has(svc.id);
    const selectedItem = state.selectedServices.get(svc.id);
    const displayPrice = selectedItem ? selectedItem.price : svc.price;
    const billingDay = selectedItem ? selectedItem.billingDay : (svc.defaultBillingDay || 15);

    return `
      <div 
        onclick="toggleServiceSelect('${svc.id}')"
        class="relative bg-white rounded-2xl p-3.5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between select-none shadow-xs ${
          isSelected 
            ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500/20' 
            : 'border-slate-100 hover:border-slate-300 hover:shadow-sm'
        }"
      >
        <div class="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center transition-all ${
          isSelected ? 'bg-blue-600 text-white shadow-xs' : 'border border-slate-200 bg-white text-transparent'
        }">
          <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>

        <div>
          <div class="flex items-center gap-2 mb-2">
            <div 
              class="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shadow-xs"
              style="background-color: ${svc.iconBg}; color: ${svc.iconColor};"
            >
              ${svc.iconText}
            </div>
            <div>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 border border-blue-100 block">
                매달 ${billingDay}일
              </span>
            </div>
          </div>

          <h3 class="font-extrabold text-slate-800 text-sm leading-tight mb-1">${svc.name}</h3>
          <p class="text-[11px] text-slate-400 line-clamp-1 mb-2.5">${svc.desc || ''}</p>
        </div>

        <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
          <span class="text-[11px] text-slate-400">월</span>
          <span class="text-xs font-black ${isSelected ? 'text-blue-600' : 'text-slate-800'}">
            ${displayPrice.toLocaleString()}원
          </span>
        </div>
      </div>
    `;
  }).join('');
}

function toggleServiceSelect(svcId) {
  const allServices = getAllAvailableServices();
  const svc = allServices.find(s => s.id === svcId);
  if (!svc) return;

  if (state.selectedServices.has(svcId)) {
    state.selectedServices.delete(svcId);
  } else {
    state.selectedServices.set(svcId, {
      ...svc,
      hours: svc.defaultHours || 8,
      billingDay: svc.defaultBillingDay || 15,
    });
  }

  renderServiceCards();
  updateSelectBottomBar();
}

function updateSelectBottomBar() {
  const count = state.selectedServices.size;
  let totalPrice = 0;
  state.selectedServices.forEach(item => {
    totalPrice += item.price;
  });

  const countBadge = document.getElementById('selected-count-badge');
  const priceDisplay = document.getElementById('selected-total-price');
  const nextBtn = document.getElementById('btn-go-usage');

  if (countBadge) countBadge.textContent = `${count}개 선택`;
  if (priceDisplay) priceDisplay.textContent = `${totalPrice.toLocaleString()}원`;

  if (nextBtn) {
    if (count > 0) {
      nextBtn.disabled = false;
      nextBtn.classList.remove('opacity-40', 'cursor-not-allowed', 'bg-slate-200');
      nextBtn.classList.add('bg-blue-600', 'hover:bg-blue-700', 'shadow-md', 'shadow-blue-200');
    } else {
      nextBtn.disabled = true;
      nextBtn.classList.add('opacity-40', 'cursor-not-allowed', 'bg-slate-200');
      nextBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700', 'shadow-md', 'shadow-blue-200');
    }
  }
}

// -------------------------------------------------------------
// 5. 사용량 입력 (Step 2)
// -------------------------------------------------------------

function renderUsageCards() {
  const container = document.getElementById('usage-cards-container');
  if (!container) return;

  if (state.selectedServices.size === 0) {
    container.innerHTML = `
      <div class="text-center py-16 text-slate-400">
        선택된 구독 서비스가 없습니다. 이전 단계에서 선택해주세요.
      </div>
    `;
    return;
  }

  const list = Array.from(state.selectedServices.values());
  container.innerHTML = list.map(item => {
    const currentHours = item.hours;
    const effectiveHours = Math.max(currentHours, 0.5);
    const costPerHour = Math.round(item.price / effectiveHours);

    let statusText = '🟢 적정 이용 중';
    let statusColor = 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (currentHours <= 2 || costPerHour >= 3800) {
      statusText = '🔴 해지 추천 (돈 낭비)';
      statusColor = 'text-rose-600 bg-rose-50 border-rose-100';
    } else if (costPerHour <= 700) {
      statusText = '💎 뽕 뽑는 중!';
      statusColor = 'text-blue-600 bg-blue-50 border-blue-100';
    } else if (costPerHour > 1800) {
      statusText = '🟡 가성비 주의';
      statusColor = 'text-amber-600 bg-amber-50 border-amber-100';
    }

    return `
      <div class="bg-white rounded-3xl p-4 sm:p-5 border border-slate-100 shadow-sm transition-all hover:shadow-md mb-4" id="usage-card-${item.id}">
        
        <div class="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
          <div class="flex items-center gap-2.5">
            <div 
              class="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shadow-xs"
              style="background-color: ${item.iconBg}; color: ${item.iconColor};"
            >
              ${item.iconText}
            </div>
            <div>
              <h4 class="font-bold text-slate-900 text-sm">${item.name}</h4>
              <p class="text-xs text-slate-400">월 ${item.price.toLocaleString()}원 • 매달 ${item.billingDay}일 결제</p>
            </div>
          </div>
          <div class="text-right">
            <span class="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-extrabold text-xs border border-blue-100">
              월 <span id="hours-display-${item.id}">${currentHours}</span>시간
            </span>
          </div>
        </div>

        <div class="mb-3.5">
          <label class="block text-[11px] font-bold text-slate-500 mb-1.5">한 달에 얼마나 이용하시나요?</label>
          <div class="grid grid-cols-4 gap-1.5">
            ${USAGE_PRESETS.map(preset => {
              const isMatch = Math.abs(currentHours - preset.hours) < 3;
              return `
                <button 
                  type="button"
                  onclick="setServiceUsagePreset('${item.id}', ${preset.hours})"
                  class="flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center transition-all ${
                    isMatch 
                      ? 'bg-blue-600 text-white font-extrabold shadow-sm' 
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100'
                  }"
                >
                  <span class="text-sm mb-0.5">${preset.icon}</span>
                  <span class="text-[10px] leading-tight">${preset.label}</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="mb-2.5">
          <input 
            type="range" 
            min="0" 
            max="80" 
            step="1" 
            value="${currentHours}" 
            oninput="handleSliderUsageChange('${item.id}', this.value)"
            class="w-full accent-blue-600"
          />
          <div class="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>거의 0시간</span>
            <span>주 2~3회 (20h)</span>
            <span>월 60시간+</span>
          </div>
        </div>

        <div id="cost-feedback-${item.id}" class="rounded-xl p-2.5 text-xs flex items-center justify-between border ${statusColor}">
          <span class="text-[11px] font-bold">1시간당 비용: <strong class="underline">${costPerHour.toLocaleString()}원</strong></span>
          <span class="font-black text-[11px]">${statusText}</span>
        </div>

      </div>
    `;
  }).join('');
}

function setServiceUsagePreset(svcId, hours) {
  const item = state.selectedServices.get(svcId);
  if (!item) return;

  item.hours = hours;
  state.selectedServices.set(svcId, item);
  renderUsageCards();
}

function handleSliderUsageChange(svcId, hours) {
  const val = parseInt(hours, 10);
  const item = state.selectedServices.get(svcId);
  if (!item) return;

  item.hours = val;
  state.selectedServices.set(svcId, item);

  const displayEl = document.getElementById(`hours-display-${svcId}`);
  if (displayEl) displayEl.textContent = val;

  const effectiveHours = Math.max(val, 0.5);
  const costPerHour = Math.round(item.price / effectiveHours);
  const feedbackEl = document.getElementById(`cost-feedback-${svcId}`);

  if (feedbackEl) {
    let statusText = '🟢 적정 이용 중';
    let statusClass = 'text-emerald-600 bg-emerald-50 border-emerald-100';
    if (val <= 2 || costPerHour >= 3800) {
      statusText = '🔴 해지 추천 (돈 낭비)';
      statusClass = 'text-rose-600 bg-rose-50 border-rose-100';
    } else if (costPerHour <= 700) {
      statusText = '💎 뽕 뽑는 중!';
      statusClass = 'text-blue-600 bg-blue-50 border-blue-100';
    } else if (costPerHour > 1800) {
      statusText = '🟡 가성비 주의';
      statusClass = 'text-amber-600 bg-amber-50 border-amber-100';
    }

    feedbackEl.className = `rounded-xl p-2.5 text-xs flex items-center justify-between border ${statusClass}`;
    feedbackEl.innerHTML = `
      <span class="text-[11px] font-bold">1시간당 비용: <strong class="underline">${costPerHour.toLocaleString()}원</strong></span>
      <span class="font-black text-[11px]">${statusText}</span>
    `;
  }
}

// -------------------------------------------------------------
// 6. 결과 분석 및 리포트 (Result Screen)
// -------------------------------------------------------------

function calculateDiagnostics() {
  const items = Array.from(state.selectedServices.values());
  const totalMonthlyCost = items.reduce((sum, it) => sum + it.price, 0);
  const totalAnnualCost = totalMonthlyCost * 12;
  const totalMonthlyHours = items.reduce((sum, it) => sum + it.hours, 0);

  const analyzedItems = items.map(it => {
    const effectiveHours = Math.max(it.hours, 0.5);
    const costPerHour = Math.round(it.price / effectiveHours);

    let tier = 'GOOD';
    let tierLabel = '본전 뽑는 중';
    let tierColor = 'text-emerald-600 bg-emerald-50 border-emerald-200';
    let icon = '🟢';
    let isCancelCandidate = false;

    if (it.hours <= 2 || costPerHour >= 3800) {
      tier = 'CANCEL';
      tierLabel = '해지 강력 추천';
      tierColor = 'text-rose-600 bg-rose-50 border-rose-200';
      icon = '🔴';
      isCancelCandidate = true;
    } else if (costPerHour <= 700) {
      tier = 'BEST';
      tierLabel = '극강의 갓성비';
      tierColor = 'text-blue-600 bg-blue-50 border-blue-200';
      icon = '💎';
    } else if (costPerHour > 1800) {
      tier = 'FAIR';
      tierLabel = '가성비 주의';
      tierColor = 'text-amber-600 bg-amber-50 border-amber-200';
      icon = '🟡';
      if (it.hours <= 3) isCancelCandidate = true;
    }

    return {
      ...it,
      costPerHour,
      tier,
      tierLabel,
      tierColor,
      icon,
      isCancelCandidate
    };
  });

  const cancelList = analyzedItems
    .filter(it => it.isCancelCandidate)
    .sort((a, b) => b.costPerHour - a.costPerHour);

  const monthlySavings = cancelList.reduce((sum, it) => sum + it.price, 0);
  const annualSavings = monthlySavings * 12;
  const rankingList = [...analyzedItems].sort((a, b) => a.costPerHour - b.costPerHour);

  const matchedRecommendations = SMART_RECOMMENDATIONS.filter(rec => {
    try {
      return rec.condition(analyzedItems, cancelList.length);
    } catch (e) {
      return false;
    }
  });

  let diagnosisGrade = '구독 다이어트 필요';
  let diagnosisComment = '새어나가는 구독료를 다이어트하면 1년에 큰 돈을 아낄 수 있어요!';
  let diagnosisBadge = '🚨 다이어트 시급';

  if (cancelList.length === 0) {
    diagnosisGrade = '알뜰 구독 마스터 🏆';
    diagnosisComment = '선택하신 모든 서비스를 알차게 뽕 뽑으며 이용하고 계시네요!';
    diagnosisBadge = '✨ 갓벽한 구독생활';
  } else if (annualSavings >= 200000) {
    diagnosisGrade = '구독료 누수 경보 🚨';
    diagnosisComment = `잘 안 쓰는 구독만 정리해도 1년에 ${Math.round(annualSavings / 10000)}만 원이 지갑으로 돌아와요!`;
    diagnosisBadge = '💸 연 ' + Math.round(annualSavings / 10000) + '만원 절약 가능';
  }

  return {
    items: analyzedItems,
    rankingList,
    cancelList,
    totalMonthlyCost,
    totalAnnualCost,
    totalMonthlyHours,
    monthlySavings,
    annualSavings,
    matchedRecommendations,
    diagnosisGrade,
    diagnosisComment,
    diagnosisBadge,
  };
}

function renderResultReport() {
  const data = calculateDiagnostics();

  const gradeEl = document.getElementById('res-diagnosis-grade');
  const commentEl = document.getElementById('res-diagnosis-comment');
  const badgeEl = document.getElementById('res-diagnosis-badge');
  if (gradeEl) gradeEl.textContent = data.diagnosisGrade;
  if (commentEl) commentEl.textContent = data.diagnosisComment;
  if (badgeEl) badgeEl.textContent = data.diagnosisBadge;

  const totalMonthEl = document.getElementById('res-total-monthly');
  const totalAnnualEl = document.getElementById('res-total-annual');
  if (totalMonthEl) totalMonthEl.textContent = `${data.totalMonthlyCost.toLocaleString()}원`;
  if (totalAnnualEl) totalAnnualEl.textContent = `${data.totalAnnualCost.toLocaleString()}원`;

  renderCancelSection(data);
  renderEfficiencyList(data);
  renderSmartRecommendations(data);
  updateReceiptModal(data);
}

function renderCancelSection(data) {
  const container = document.getElementById('cancel-recommendations-container');
  if (!container) return;

  if (data.cancelList.length === 0) {
    container.innerHTML = `
      <div class="bg-emerald-50 border border-emerald-200 rounded-3xl p-5 text-center">
        <div class="text-3xl mb-2">🎉</div>
        <h4 class="font-extrabold text-emerald-800 text-base mb-1">해지할 서비스가 없어요!</h4>
        <p class="text-xs text-emerald-600">구독 중인 모든 서비스를 가성비 있게 알뜰하게 잘 쓰고 계십니다.</p>
      </div>
    `;
    return;
  }

  const chickenCount = Math.max(1, Math.floor(data.annualSavings / 22000));

  container.innerHTML = `
    <div class="bg-rose-50/70 border border-rose-200/80 rounded-3xl p-5 shadow-sm">
      <div class="flex items-center justify-between mb-3">
        <div class="flex items-center gap-2">
          <span class="text-xl">✂️</span>
          <h4 class="font-extrabold text-rose-900 text-base">당장 해지 추천 프로그램</h4>
        </div>
        <span class="text-[11px] font-black text-rose-600 bg-rose-100/90 px-2.5 py-1 rounded-full">
          ${data.cancelList.length}개 발견
        </span>
      </div>

      <p class="text-xs text-rose-700 mb-4 leading-relaxed">
        이용 시간에 비해 구독료가 너무 비싼 서비스예요. 지금 해지하면 
        <strong>1년에 ${data.annualSavings.toLocaleString()}원</strong>(치킨 약 ${chickenCount}마리 값 🍗)을 아낄 수 있어요!
      </p>

      <div class="space-y-2.5 mb-4">
        ${data.cancelList.map(item => `
          <div class="bg-white rounded-2xl p-3.5 border border-rose-100 flex items-center justify-between shadow-xs">
            <div class="flex items-center gap-3">
              <div 
                class="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs shrink-0 shadow-xs"
                style="background-color: ${item.iconBg}; color: ${item.iconColor};"
              >
                ${item.iconText}
              </div>
              <div>
                <div class="flex items-center gap-1.5 flex-wrap">
                  <h5 class="font-bold text-slate-800 text-sm">${item.name}</h5>
                  <span class="text-[10px] text-rose-600 font-bold bg-rose-50 px-1.5 py-0.5 rounded">
                    월 ${item.hours}시간 이용
                  </span>
                </div>
                <div class="text-[11px] text-slate-400 mt-0.5">
                  1시간 이용에 <strong class="text-rose-600 font-extrabold">${item.costPerHour.toLocaleString()}원</strong> 지출 중
                </div>
              </div>
            </div>

            <div class="text-right flex flex-col items-end shrink-0 pl-2">
              <span class="text-xs font-black text-slate-800">월 ${item.price.toLocaleString()}원</span>
              <a 
                href="${item.cancelUrl || '#'}" 
                target="_blank" 
                rel="noopener noreferrer"
                class="mt-1 text-[11px] font-bold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 px-2 py-0.5 rounded-lg transition-colors flex items-center gap-0.5"
              >
                해지 방법 ↗
              </a>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="bg-white/90 rounded-2xl p-3.5 border border-rose-200/50 flex items-center justify-between text-xs font-bold text-rose-900">
        <span>해지 시 1년 절약 효과</span>
        <span class="text-sm font-black text-rose-600">+${data.annualSavings.toLocaleString()}원/년</span>
      </div>
    </div>
  `;
}

function renderEfficiencyList(data) {
  const container = document.getElementById('efficiency-list-container');
  if (!container) return;

  container.innerHTML = `
    <div class="space-y-3">
      ${data.rankingList.map((item, idx) => {
        const barWidth = Math.min(100, Math.max(12, (item.hours / 50) * 100));

        return `
          <div class="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-100 shadow-xs transition-all hover:shadow-sm">
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <span class="text-xs font-black text-slate-400 w-4 text-center">#${idx + 1}</span>
                <div 
                  class="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-[10px]"
                  style="background-color: ${item.iconBg}; color: ${item.iconColor};"
                >
                  ${item.iconText}
                </div>
                <span class="font-bold text-slate-800 text-sm">${item.name}</span>
              </div>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.tierColor}">
                ${item.icon} ${item.tierLabel}
              </span>
            </div>

            <div class="bg-slate-50 rounded-xl p-2.5 flex items-center justify-between text-xs text-slate-600 mb-2">
              <div>
                <span class="text-slate-400">월 이용량:</span> 
                <strong class="text-slate-800 font-extrabold">${item.hours}시간</strong>
              </div>
              <div>
                <span class="text-slate-400">1시간당 비용:</span> 
                <strong class="font-black ${item.isCancelCandidate ? 'text-rose-600' : 'text-blue-600'}">
                  ${item.costPerHour.toLocaleString()}원
                </strong>
              </div>
            </div>

            <div>
              <div class="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>월 구독료: ${item.price.toLocaleString()}원 • ${item.billingDay}일 결제</span>
                <span>활용도 게이지</span>
              </div>
              <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  class="h-full rounded-full transition-all duration-500 ${
                    item.isCancelCandidate ? 'bg-rose-400' : 'bg-blue-500'
                  }"
                  style="width: ${barWidth}%"
                ></div>
              </div>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function renderSmartRecommendations(data) {
  const container = document.getElementById('smart-recommendations-container');
  if (!container) return;

  const recs = data.matchedRecommendations;

  if (recs.length === 0) {
    container.innerHTML = `
      <div class="bg-blue-50 border border-blue-200 rounded-3xl p-5 text-center">
        <div class="text-2xl mb-1">💡</div>
        <h4 class="font-bold text-blue-900 text-sm mb-1">현재 맞춤형 구독 최적화 완료</h4>
        <p class="text-xs text-blue-700">현재 구독 구성이 아주 균형 잡혀 있습니다!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = `
    <div class="space-y-3">
      ${recs.map(rec => `
        <div class="bg-white rounded-3xl p-4 sm:p-5 border border-blue-100 shadow-xs relative overflow-hidden">
          <div class="flex items-center justify-between mb-2">
            <span class="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              ${rec.badge}
            </span>
          </div>
          <h5 class="font-bold text-slate-900 text-sm mb-1.5 leading-snug">${rec.title}</h5>
          <p class="text-xs text-slate-600 leading-relaxed mb-2.5">${rec.description}</p>
          ${rec.tip ? `
            <div class="bg-blue-50/60 rounded-xl p-2.5 text-[11px] text-blue-800 font-medium">
              ${rec.tip}
            </div>
          ` : ''}
        </div>
      `).join('')}
    </div>
  `;
}

// -------------------------------------------------------------
// 7. 📅 구독 결제 달력 로직 (Calendar Screen)
// -------------------------------------------------------------

function changeCalendarMonth(delta) {
  if (delta === 0) {
    state.calendarDate = new Date();
  } else {
    state.calendarDate = new Date(state.calendarDate.getFullYear(), state.calendarDate.getMonth() + delta, 1);
  }
  state.selectedCalendarDay = null;
  renderCalendar();
}

function renderCalendar() {
  const curDate = state.calendarDate;
  const year = curDate.getFullYear();
  const month = curDate.getMonth();
  const today = new Date();

  const monthLabel = document.getElementById('cal-current-month-label');
  const monthBadge = document.getElementById('cal-month-badge');
  if (monthLabel) monthLabel.textContent = `${year}년 ${month + 1}월`;
  if (monthBadge) monthBadge.textContent = `${month + 1}월`;

  let totalMonthlyCost = 0;
  state.selectedServices.forEach(s => totalMonthlyCost += s.price);
  
  const totalAmountEl = document.getElementById('cal-total-monthly-amount');
  const countBadgeEl = document.getElementById('cal-subs-count-badge');
  if (totalAmountEl) totalAmountEl.textContent = `${totalMonthlyCost.toLocaleString()}원`;
  if (countBadgeEl) countBadgeEl.textContent = `구독 ${state.selectedServices.size}건`;

  renderNextPaymentBanner();

  const grid = document.getElementById('calendar-grid');
  if (!grid) return;

  const firstDayIndex = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();
  const prevLastDate = new Date(year, month, 0).getDate();

  const activeSubs = Array.from(state.selectedServices.values());
  let cellsHtml = '';

  for (let x = firstDayIndex; x > 0; x--) {
    const dayNum = prevLastDate - x + 1;
    cellsHtml += `
      <div class="calendar-day-cell other-month">
        <span class="day-number text-[11px] font-bold text-slate-400">${dayNum}</span>
      </div>
    `;
  }

  for (let d = 1; d <= lastDate; d++) {
    const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === d;
    const isSelected = state.selectedCalendarDay === d;

    const subsOnDay = activeSubs.filter(s => s.billingDay === d);
    const dayTotalCost = subsOnDay.reduce((sum, s) => sum + s.price, 0);

    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const trialsEnding = state.trials.filter(t => t.endDate === dateStr);

    cellsHtml += `
      <div 
        onclick="selectCalendarDay(${d})"
        class="calendar-day-cell ${isToday ? 'is-today' : ''} ${isSelected ? 'is-selected' : ''}"
      >
        <span class="day-number text-[11px] font-bold ${isToday ? '' : 'text-slate-700'}">${d}</span>

        <div class="w-full flex flex-col items-center justify-center mt-0.5 gap-0.5">
          ${subsOnDay.length > 0 ? `
            <div class="flex items-center gap-0.5">
              ${subsOnDay.slice(0, 3).map(s => `
                <span class="w-1.5 h-1.5 rounded-full" style="background-color: ${s.iconBg};"></span>
              `).join('')}
            </div>
            <span class="text-[9px] font-black text-blue-600 scale-90 leading-none">
              ${Math.round(dayTotalCost / 1000)}k
            </span>
          ` : ''}

          ${trialsEnding.length > 0 ? `
            <span class="text-[8px] font-black bg-rose-500 text-white px-1 py-0.2 rounded-full leading-tight pulse-danger">
              무료종료
            </span>
          ` : ''}
        </div>
      </div>
    `;
  }

  const totalRendered = firstDayIndex + lastDate;
  const nextDays = totalRendered <= 35 ? (35 - totalRendered) : (42 - totalRendered);
  for (let n = 1; n <= nextDays; n++) {
    cellsHtml += `
      <div class="calendar-day-cell other-month">
        <span class="day-number text-[11px] font-bold text-slate-400">${n}</span>
      </div>
    `;
  }

  grid.innerHTML = cellsHtml;
  renderPaymentTimeline();
}

function selectCalendarDay(day) {
  if (state.selectedCalendarDay === day) {
    state.selectedCalendarDay = null;
  } else {
    state.selectedCalendarDay = day;
  }
  renderCalendar();
}

function renderNextPaymentBanner() {
  const banner = document.getElementById('cal-next-payment-banner');
  if (!banner) return;

  const today = new Date();
  const curDay = today.getDate();
  const activeSubs = Array.from(state.selectedServices.values());

  if (activeSubs.length === 0) {
    banner.innerHTML = `
      <span class="text-blue-100">등록된 정기 구독이 없습니다.</span>
      <button onclick="navigateTo('select')" class="text-[11px] font-bold underline">구독 추가</button>
    `;
    return;
  }

  let upcoming = [];
  activeSubs.forEach(s => {
    let diffDays = s.billingDay - curDay;
    if (diffDays < 0) {
      const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, s.billingDay);
      diffDays = Math.ceil((nextMonth - today) / (1000 * 60 * 60 * 24));
    }
    upcoming.push({ ...s, diffDays });
  });

  upcoming.sort((a, b) => a.diffDays - b.diffDays);
  const nextSub = upcoming[0];
  let dDayText = nextSub.diffDays === 0 ? 'D-Day 오늘 결제!' : `D-${nextSub.diffDays}`;

  banner.innerHTML = `
    <div class="flex items-center gap-2">
      <span class="px-2 py-0.5 rounded-full bg-rose-500 text-white font-black text-[10px] animate-pulse">
        ${dDayText}
      </span>
      <span class="font-extrabold text-white text-xs">${nextSub.name}</span>
      <span class="text-blue-100 text-[11px]">(${nextSub.price.toLocaleString()}원)</span>
    </div>
    <span class="text-blue-200 text-[11px]">${nextSub.billingDay}일 결제 예정</span>
  `;
}

function renderPaymentTimeline() {
  const container = document.getElementById('cal-timeline-list');
  const titleEl = document.getElementById('cal-timeline-title');
  if (!container) return;

  const activeSubs = Array.from(state.selectedServices.values());
  const today = new Date();
  const curDay = today.getDate();

  if (state.selectedCalendarDay !== null) {
    const day = state.selectedCalendarDay;
    if (titleEl) titleEl.textContent = `${state.calendarDate.getMonth() + 1}월 ${day}일 결제 일정`;

    const filtered = activeSubs.filter(s => s.billingDay === day);
    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="text-center py-6 text-xs text-slate-400 bg-slate-50 rounded-2xl">
          ${day}일에는 예정된 결제가 없습니다.
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(s => `
      <div class="bg-slate-50 rounded-2xl p-3 flex items-center justify-between border border-slate-100">
        <div class="flex items-center gap-2.5">
          <div 
            class="w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white"
            style="background-color: ${s.iconBg};"
          >
            ${s.iconText}
          </div>
          <div>
            <h5 class="font-bold text-slate-800 text-xs">${s.name}</h5>
            <span class="text-[11px] text-slate-400">매달 ${s.billingDay}일 결제</span>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xs font-black text-slate-900">${s.price.toLocaleString()}원</span>
          <span class="block text-[10px] text-blue-600 font-bold">결제 예정</span>
        </div>
      </div>
    `).join('');
    return;
  }

  if (titleEl) titleEl.textContent = '다가오는 결제 타임라인';

  if (activeSubs.length === 0) {
    container.innerHTML = `
      <div class="text-center py-8 text-xs text-slate-400 bg-slate-50 rounded-2xl">
        선택된 구독 서비스가 없습니다. [구독진단] 탭에서 서비스를 선택해주세요!
      </div>
    `;
    return;
  }

  const listWithDDay = activeSubs.map(s => {
    let diffDays = s.billingDay - curDay;
    let nextMonth = false;
    if (diffDays < 0) {
      const nextDate = new Date(today.getFullYear(), today.getMonth() + 1, s.billingDay);
      diffDays = Math.ceil((nextDate - today) / (1000 * 60 * 60 * 24));
      nextMonth = true;
    }
    return { ...s, diffDays, nextMonth };
  }).sort((a, b) => a.diffDays - b.diffDays);

  container.innerHTML = listWithDDay.map(s => {
    let dDayBadge = `D-${s.diffDays}`;
    let badgeClass = 'bg-blue-50 text-blue-600 border border-blue-100';
    if (s.diffDays === 0) {
      dDayBadge = 'D-Day 오늘';
      badgeClass = 'bg-rose-500 text-white font-black';
    } else if (s.diffDays <= 3) {
      badgeClass = 'bg-rose-50 text-rose-600 border border-rose-100 font-black';
    }

    return `
      <div class="bg-slate-50/70 hover:bg-slate-100/70 rounded-2xl p-3 flex items-center justify-between border border-slate-100 transition-colors">
        <div class="flex items-center gap-2.5">
          <div 
            class="w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white shadow-xs"
            style="background-color: ${s.iconBg};"
          >
            ${s.iconText}
          </div>
          <div>
            <div class="flex items-center gap-1.5">
              <h5 class="font-bold text-slate-800 text-xs">${s.name}</h5>
              <span class="text-[10px] px-1.5 py-0.5 rounded-md ${badgeClass}">
                ${dDayBadge}
              </span>
            </div>
            <p class="text-[11px] text-slate-400 mt-0.5">매달 ${s.billingDay}일 결제</p>
          </div>
        </div>

        <div class="text-right">
          <span class="text-xs font-black text-slate-900">${s.price.toLocaleString()}원</span>
          <button 
            onclick="openChangeBillingDayModal()"
            class="block text-[10px] text-slate-400 hover:text-blue-600 underline mt-0.5 cursor-pointer ml-auto"
          >
            결제일 수정
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function openChangeBillingDayModal() {
  const modal = document.getElementById('modal-billing-day');
  const container = document.getElementById('billing-days-edit-list');
  if (!modal || !container) return;

  const activeSubs = Array.from(state.selectedServices.values());
  if (activeSubs.length === 0) {
    container.innerHTML = `<div class="text-center py-6 text-xs text-slate-400">선택된 구독 서비스가 없습니다.</div>`;
  } else {
    container.innerHTML = activeSubs.map(s => `
      <div class="bg-slate-50 rounded-2xl p-3 flex items-center justify-between border border-slate-100">
        <div class="flex items-center gap-2">
          <div 
            class="w-7 h-7 rounded-lg flex items-center justify-center font-black text-[10px] text-white"
            style="background-color: ${s.iconBg};"
          >
            ${s.iconText}
          </div>
          <span class="text-xs font-bold text-slate-800">${s.name}</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="text-[11px] text-slate-400">매달</span>
          <input 
            type="number" 
            min="1" 
            max="31" 
            value="${s.billingDay}" 
            onchange="updateServiceBillingDay('${s.id}', this.value)"
            class="w-14 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-center text-blue-600 focus:outline-none focus:border-blue-600"
          />
          <span class="text-[11px] text-slate-400">일</span>
        </div>
      </div>
    `).join('');
  }

  modal.classList.remove('hidden');
}

function updateServiceBillingDay(svcId, dayStr) {
  const day = parseInt(dayStr, 10);
  if (isNaN(day) || day < 1 || day > 31) return;

  const item = state.selectedServices.get(svcId);
  if (item) {
    item.billingDay = day;
    state.selectedServices.set(svcId, item);
  }
}

function closeChangeBillingDayModal() {
  const modal = document.getElementById('modal-billing-day');
  if (modal) modal.classList.add('hidden');
  renderCalendar();
  showToast('결제일이 성공적으로 업데이트되었습니다! 📅');
}

// -------------------------------------------------------------
// 8. 🎁 무료체험 트래커 로직 (Free Trials Screen)
// -------------------------------------------------------------

function renderTrials() {
  const container = document.getElementById('trials-cards-container');
  const countBadge = document.getElementById('trials-count-badge');
  if (!container) return;

  if (countBadge) countBadge.textContent = `${state.trials.length}개 체험 중`;

  if (state.trials.length === 0) {
    container.innerHTML = `
      <div class="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-xs">
        <div class="text-4xl mb-2">🎁</div>
        <h4 class="font-extrabold text-slate-800 text-sm mb-1">등록된 무료체험이 없습니다.</h4>
        <p class="text-xs text-slate-400 mb-4">현재 이용 중인 무료 체험 서비스를 등록하고 자동결제를 방지하세요!</p>
        <button 
          onclick="openAddTrialModal()"
          class="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-extrabold shadow-sm"
        >
          + 무료체험 등록하기
        </button>
      </div>
    `;
    return;
  }

  const today = new Date();

  container.innerHTML = state.trials.map(trial => {
    const startDate = new Date(trial.startDate);
    const endDate = new Date(trial.endDate);
    
    const diffTime = endDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const totalDuration = Math.max(1, (endDate - startDate) / (1000 * 60 * 60 * 24));
    const elapsed = Math.max(0, (today - startDate) / (1000 * 60 * 60 * 24));
    const progressPercent = Math.min(100, Math.max(5, (elapsed / totalDuration) * 100));

    let dDayText = `D-${diffDays}`;
    let dDayBadgeClass = 'bg-rose-50 text-rose-600 border border-rose-100';
    let isUrgent = diffDays <= 3;

    if (diffDays < 0) {
      dDayText = '체험 종료됨';
      dDayBadgeClass = 'bg-slate-200 text-slate-600';
    } else if (diffDays === 0) {
      dDayText = '🚨 오늘 종료!';
      dDayBadgeClass = 'bg-rose-500 text-white font-black pulse-danger';
    } else if (diffDays <= 3) {
      dDayText = `🚨 종료 ${diffDays}일 전!`;
      dDayBadgeClass = 'bg-rose-100 text-rose-700 font-black border border-rose-200 pulse-danger';
    }

    return `
      <div class="bg-white rounded-3xl p-4 sm:p-5 border ${isUrgent ? 'border-rose-200 ring-2 ring-rose-500/10' : 'border-slate-100'} shadow-sm">
        
        <div class="flex items-start justify-between mb-3">
          <div class="flex items-center gap-2.5">
            <div 
              class="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-xs shadow-xs text-white"
              style="background-color: ${trial.iconBg}; color: ${trial.iconColor};"
            >
              ${trial.iconText}
            </div>
            <div>
              <div class="flex items-center gap-1.5 flex-wrap">
                <h4 class="font-extrabold text-slate-900 text-sm">${trial.serviceName}</h4>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${dDayBadgeClass}">
                  ${dDayText}
                </span>
              </div>
              <p class="text-[11px] text-slate-400 mt-0.5">
                체험 종료 시 <strong class="text-slate-700">${trial.regularPrice.toLocaleString()}원</strong> 자동결제
              </p>
            </div>
          </div>

          <button 
            onclick="removeTrial('${trial.id}')"
            class="text-slate-300 hover:text-rose-500 text-sm p-1 cursor-pointer transition-colors"
            title="체험 삭제"
          >
            ✕
          </button>
        </div>

        <div class="bg-slate-50 rounded-2xl p-3 mb-3 border border-slate-100">
          <div class="flex justify-between items-center text-[11px] font-bold text-slate-600 mb-1.5">
            <span>시작: ${trial.startDate}</span>
            <span class="text-rose-600 font-extrabold">종료: ${trial.endDate}</span>
          </div>
          <div class="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div 
              class="h-full rounded-full transition-all duration-500 ${isUrgent ? 'bg-rose-500' : 'bg-blue-500'}"
              style="width: ${progressPercent}%"
            ></div>
          </div>
        </div>

        ${trial.memo ? `
          <div class="text-[11px] text-slate-500 bg-slate-50 px-2.5 py-1.5 rounded-xl mb-3 flex items-center gap-1.5">
            <span>📝</span>
            <span>${trial.memo}</span>
          </div>
        ` : ''}

        <div class="flex items-center gap-2 pt-2 border-t border-slate-100">
          <button 
            onclick="triggerTrialNotificationTest('${trial.serviceName}', ${diffDays})"
            class="flex-1 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
          >
            <span>🔔</span>
            <span>알림 미리보기</span>
          </button>
          <a 
            href="${trial.cancelUrl || '#'}" 
            target="_blank" 
            rel="noopener noreferrer"
            class="flex-1 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 font-extrabold text-xs flex items-center justify-center gap-1 transition-colors"
          >
            <span>해지 예약 ↗</span>
          </a>
        </div>

      </div>
    `;
  }).join('');
}

function openAddTrialModal() {
  const modal = document.getElementById('modal-add-trial');
  if (!modal) return;

  const today = new Date();
  const format = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  
  const startInput = document.getElementById('trial-start-date');
  const endInput = document.getElementById('trial-end-date');
  if (startInput) startInput.value = format(today);

  const endDef = new Date();
  endDef.setDate(today.getDate() + 14);
  if (endInput) endInput.value = format(endDef);

  modal.classList.remove('hidden');
}

function closeAddTrialModal() {
  const modal = document.getElementById('modal-add-trial');
  if (modal) modal.classList.add('hidden');
}

function setQuickTrialDays(days) {
  const today = new Date();
  const format = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  
  const startInput = document.getElementById('trial-start-date');
  const endInput = document.getElementById('trial-end-date');
  
  if (startInput) startInput.value = format(today);
  
  const targetEnd = new Date();
  targetEnd.setDate(today.getDate() + days);
  if (endInput) endInput.value = format(targetEnd);
}

function handleCreateTrialSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('trial-name')?.value?.trim();
  const price = parseInt(document.getElementById('trial-price')?.value, 10);
  const startDate = document.getElementById('trial-start-date')?.value;
  const endDate = document.getElementById('trial-end-date')?.value;
  const memo = document.getElementById('trial-memo')?.value?.trim();

  if (!name || isNaN(price) || !startDate || !endDate) {
    alert('모든 필수 정보를 입력해주세요.');
    return;
  }

  const newTrial = {
    id: `trial_${Date.now()}`,
    serviceName: name,
    category: 'ott',
    iconBg: '#4F46E5',
    iconColor: '#FFFFFF',
    iconText: name.substring(0, 2),
    regularPrice: price,
    startDate: startDate,
    endDate: endDate,
    notifyBeforeDays: [3, 1],
    cancelUrl: '#',
    memo: memo || '무료체험'
  };

  state.trials.unshift(newTrial);
  closeAddTrialModal();
  renderTrials();
  updateBottomNavUI();
  showToast(`'${name}' 무료체험이 등록되었습니다! 종료 전 알림이 설정됩니다.`);
}

function removeTrial(id) {
  if (!confirm('이 무료체험 항목을 삭제하시겠습니까?')) return;
  state.trials = state.trials.filter(t => t.id !== id);
  renderTrials();
  updateBottomNavUI();
  showToast('무료체험 항목이 삭제되었습니다.');
}

function handleRequestNotificationPermission() {
  if (!('Notification' in window)) {
    showToast('현재 브라우저는 알림 기능을 지원하지 않습니다.');
    return;
  }

  Notification.requestPermission().then(permission => {
    const btnText = document.getElementById('notification-btn-text');
    if (permission === 'granted') {
      if (btnText) btnText.textContent = '✅ 브라우저 알림 켜짐';
      showToast('브라우저 알림이 켜졌습니다! 종료 전 알림을 보내드려요.');
      new Notification('구독다이어트 무료체험 알리미 🎁', {
        body: '무료체험 종료 알림이 성공적으로 설정되었습니다!',
        icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
      });
    } else {
      showToast('알림 권한이 거부되었습니다. 브라우저 설정에서 허용해주세요.');
    }
  });
}

function triggerTrialNotificationTest(serviceName, diffDays) {
  const msg = diffDays <= 0 
    ? `[구독다이어트] 🚨 오늘 '${serviceName}' 무료체험이 종료됩니다! 지금 해지하지 않으면 자동 결제됩니다.` 
    : `[구독다이어트] ⚠️ '${serviceName}' 무료체험 종료까지 ${diffDays}일 남았습니다. 계속 이용할지 확인하세요!`;

  showToast(msg);

  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification('무료체험 종료 알림 🚨', {
      body: msg,
      icon: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'
    });
  }
}

// -------------------------------------------------------------
// 9. 모달 및 추가 기능 (커스텀 구독, 영수증, 공유)
// -------------------------------------------------------------

function openAddCustomModal() {
  const modal = document.getElementById('modal-custom-sub');
  if (modal) modal.classList.remove('hidden');
}

function closeAddCustomModal() {
  const modal = document.getElementById('modal-custom-sub');
  if (modal) modal.classList.add('hidden');
  const nameInput = document.getElementById('custom-name');
  const priceInput = document.getElementById('custom-price');
  if (nameInput) nameInput.value = '';
  if (priceInput) priceInput.value = '';
}

function handleAddCustomSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('custom-name')?.value?.trim();
  const price = parseInt(document.getElementById('custom-price')?.value, 10);
  const category = document.getElementById('custom-category')?.value || 'life';
  const billingDay = parseInt(document.getElementById('custom-billing-day')?.value, 10) || 15;

  if (!name || isNaN(price) || price < 0) {
    alert('올바른 서비스 이름과 월 구독료를 입력해주세요.');
    return;
  }

  const customId = `custom_${Date.now()}`;
  const newSub = {
    id: customId,
    name: name,
    category: category,
    price: price,
    iconBg: '#475569',
    iconColor: '#FFFFFF',
    iconText: name.substring(0, 2),
    badge: '직접 추가',
    desc: '사용자 정의 구독 서비스',
    defaultHours: 6,
    billingDay: billingDay,
    cancelUrl: '#'
  };

  state.customServices.push(newSub);
  state.selectedServices.set(customId, {
    ...newSub,
    hours: newSub.defaultHours
  });

  closeAddCustomModal();
  renderCategoryTabs();
  renderServiceCards();
  updateSelectBottomBar();
  showToast(`'${name}' 서비스가 추가되었습니다! (매달 ${billingDay}일 결제)`);
}

function openReceiptModal() {
  const modal = document.getElementById('modal-receipt');
  if (modal) modal.classList.remove('hidden');
}

function closeReceiptModal() {
  const modal = document.getElementById('modal-receipt');
  if (modal) modal.classList.add('hidden');
}

function updateReceiptModal(data) {
  const dateEl = document.getElementById('receipt-date');
  const itemsContainer = document.getElementById('receipt-items-list');
  const totalEl = document.getElementById('receipt-total-cost');
  const savingsEl = document.getElementById('receipt-savings-cost');

  const now = new Date();
  if (dateEl) {
    dateEl.textContent = `${now.getFullYear()}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
  }

  if (itemsContainer) {
    itemsContainer.innerHTML = data.items.map(it => `
      <div class="flex justify-between items-center text-xs text-slate-700 py-1.5 border-b border-dashed border-slate-200">
        <div class="flex items-center gap-1.5">
          <span class="font-bold text-slate-800">${it.name}</span>
          <span class="text-[10px] text-slate-400">(${it.billingDay}일 결제)</span>
        </div>
        <span class="font-extrabold">${it.price.toLocaleString()}원</span>
      </div>
    `).join('');
  }

  if (totalEl) totalEl.textContent = `${data.totalMonthlyCost.toLocaleString()}원`;
  if (savingsEl) savingsEl.textContent = `-${data.monthlySavings.toLocaleString()}원`;
}

function handleShareResult() {
  const data = calculateDiagnostics();
  const cancelNames = data.cancelList.map(s => s.name).join(', ') || '없음';
  const text = `[구독다이어트 진단 리포트]\n\n💳 총 월 구독료: ${data.totalMonthlyCost.toLocaleString()}원 (연 ${data.totalAnnualCost.toLocaleString()}원)\n📊 진단 결과: ${data.diagnosisGrade}\n✂️ 해지 추천: ${cancelNames}\n💰 절약 가능 금액: 연간 ${data.annualSavings.toLocaleString()}원\n\n내 구독료 & 결제 달력 진단하기 👇\n${window.location.href}`;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast('진단 결과가 클립보드에 복사되었습니다! 🎉');
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast('진단 결과가 클립보드에 복사되었습니다! 🎉');
}

function showToast(msg) {
  let toast = document.getElementById('app-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'app-toast';
    toast.className = 'fixed bottom-20 left-1/2 -translate-x-1/2 bg-slate-900/95 backdrop-blur text-white text-xs font-bold px-4 py-2.5 rounded-full shadow-2xl z-50 transition-all duration-300 pointer-events-none opacity-0 max-w-[340px] text-center';
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.classList.remove('opacity-0');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0');
  }, 2500);
}

function triggerCelebration() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

// -------------------------------------------------------------
// 10. 앱 초기화 (DOM Ready)
// -------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const defaultInit = ['youtube_premium', 'netflix', 'melon'];
  defaultInit.forEach(id => {
    const s = PRESET_SERVICES.find(p => p.id === id);
    if (s) {
      const initialHours = id === 'netflix' ? 2 : (s.defaultHours || 15);
      state.selectedServices.set(s.id, {
        ...s,
        hours: initialHours,
        billingDay: s.defaultBillingDay || 15
      });
    }
  });

  navigateTo('intro');
  updateBottomNavUI();
});
