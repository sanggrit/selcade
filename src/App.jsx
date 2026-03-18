/**
 * Selcade Co., Ltd. — 셀케이드 주식회사
 * Single-page landing site: React + Tailwind CSS
 * Target audience: Korean manufacturers preparing for overseas sales
 *
 * Section order:
 *   Header → Hero → TrustBar → Problem → Role → SuitableCustomers →
 *   Services → Differentiator → TrackRecord → Process → About →
 *   FAQ → FinalCTA → Contact → Footer
 */

import { useState, useEffect, useRef, Component } from 'react'

/* ─────────────────────────────────────────────────────────────
   ERROR BOUNDARY
   ───────────────────────────────────────────────────────────── */
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center' }}>
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#94a3b8', marginBottom: '1rem' }}>SELCADE</p>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>페이지를 불러오는 중 오류가 발생했습니다.</h1>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '1.5rem' }}>잠시 후 다시 시도해 주세요.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.6rem 1.5rem', fontSize: '0.8rem', fontWeight: 600, background: '#2563eb', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              새로고침
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

/* ─────────────────────────────────────────────────────────────
   HELPER: smooth-scroll to a section by id
   Named smoothScroll (not scrollTo) to avoid shadowing window.scrollTo.
   ───────────────────────────────────────────────────────────── */
function smoothScroll(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─────────────────────────────────────────────────────────────
   HEADER
   ───────────────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: '서비스',        href: '#services' },
    { label: '수행 이력',     href: '#track-record' },
    { label: '진행 방식',     href: '#process' },
    { label: '셀케이드 소개', href: '#about' },
    { label: '문의하기',      href: '#contact' },
  ]

  const handleNav = (href) => {
    setMenuOpen(false)
    smoothScroll(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-[70px]">

        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); smoothScroll('#hero') }}
          className="flex flex-col gap-0.5 select-none"
          aria-label="셀케이드 주식회사 홈으로"
        >
          <span className={`text-base font-black tracking-logo transition-colors duration-300 ${scrolled ? 'text-slate-900' : 'text-white'}`}>
            SELCADE
          </span>
          <span className={`text-[10px] tracking-widest font-medium transition-colors duration-300 ${scrolled ? 'text-slate-400' : 'text-white/55'}`}>
            셀케이드 주식회사
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="주요 메뉴">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              className={`text-sm font-medium transition-colors duration-200 hover:opacity-70 ${
                scrolled ? 'text-slate-700' : 'text-white/85'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
          className="hidden lg:block px-5 py-2 text-sm font-semibold rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
        >
          제조사 상담 문의
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="모바일 메뉴 열기"
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        >
          <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${scrolled ? 'bg-slate-800' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 ${scrolled ? 'bg-slate-800' : 'bg-white'} ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-0.5 transition-all duration-300 origin-center ${scrolled ? 'bg-slate-800' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-slate-100 px-6 py-5 flex flex-col gap-0.5">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              className="text-slate-700 text-sm font-medium py-3 border-b border-slate-50 last:border-0 hover:text-blue-700 transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
            className="mt-4 block text-center px-5 py-3 text-sm font-semibold rounded bg-blue-600 text-white"
          >
            제조사 상담 문의
          </a>
        </div>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO
   ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-[#0F172A] overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-blue-800/20 blur-3xl" />
        <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full bg-slate-700/40 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-28 lg:pt-48 lg:pb-36">
        <div className="max-w-3xl">

          <div className="inline-flex items-center gap-3 mb-8" aria-hidden="true">
            <div className="w-8 h-px bg-blue-500" />
            <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
              SELCADE Co., Ltd.
            </span>
          </div>

          <h1 className="text-[2.4rem] lg:text-[3.5rem] font-black text-white leading-[1.15] tracking-tight mb-7">
            제조사의 제품을<br />
            해외 판매로 연결하는<br />
            <span className="text-[#60A5FA]">실행형 글로벌 이커머스 파트너</span>
          </h1>

          <p className="text-base lg:text-lg text-slate-300 leading-[1.85] mb-10 max-w-xl">
            셀케이드는 자사 상품의 해외 진출을 준비하는 제조사를 위해<br className="hidden sm:block" />
            아마존 판매 전략, 콘텐츠 기획, 운영, 교육까지<br className="hidden sm:block" />
            실행 중심의 서비스를 제공합니다.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mb-12">
            <button
              onClick={() => smoothScroll('#contact')}
              className="px-7 py-3.5 text-sm font-semibold bg-[#2563EB] text-white rounded hover:bg-blue-500 active:bg-blue-700 transition-colors duration-200 text-center"
            >
              제조사 상담 문의하기
            </button>
            <button
              onClick={() => smoothScroll('#services')}
              className="px-7 py-3.5 text-sm font-semibold bg-transparent text-white border border-white/50 rounded hover:border-white hover:bg-white/10 transition-all duration-200 text-center"
            >
              서비스 보기
            </button>
          </div>

          {/* Trust points */}
          <div className="border-t border-slate-800 pt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              '2016년 아마존 글로벌 셀링 시작',
              '2024년 제조사 자사제품 아마존 베스트셀러 1위 달성',
              '아마존 운영대행 · 브랜드 운영 · 채널 운영대행 수행',
              '대학 · 무역 유관기관 · aT센터 강의 및 컨설팅 수행',
            ].map((point) => (
              <div key={point} className="flex items-start gap-2.5">
                <div className="w-1 h-1 rounded-full bg-[#60A5FA] flex-shrink-0 mt-[7px]" />
                <span className="text-slate-400 text-sm leading-snug">{point}</span>
              </div>
            ))}
          </div>

        </div>
      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-white animate-pulse" />
        <span className="text-white text-[9px] tracking-[0.25em] uppercase">Scroll</span>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRUST BAR
   ───────────────────────────────────────────────────────────── */
function TrustBar() {
  const proofs = [
    { label: 'Since 2016',       detail: '글로벌 이커머스 실무' },
    { label: 'Amazon #1',        detail: '제조사 자사제품 베스트셀러' },
    { label: 'B2B 강의·컨설팅',  detail: '대학·기관·무역협회 수행' },
    { label: '실행 중심',        detail: '운영·콘텐츠·교육 연결' },
  ]
  return (
    <div className="bg-[#0F172A] border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-800">
          {proofs.map(({ label, detail }) => (
            <div key={label} className="py-5 px-6 text-center">
              <div className="text-white text-sm font-bold leading-tight">{label}</div>
              <div className="text-slate-400 text-xs mt-0.5">{detail}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PROBLEM RECOGNITION
   ───────────────────────────────────────────────────────────── */
function Problem() {
  return (
    <section id="problem" className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-4xl mx-auto px-6 lg:px-10">
        <SectionLabel text="Problem" />
        <h2 className="mt-4 text-2xl lg:text-3xl font-black text-[#0F172A] leading-tight mb-8 max-w-2xl">
          좋은 제품이 있어도,<br />
          판매 체계가 없으면 해외에서는 팔리지 않습니다
        </h2>
        <div className="space-y-5 text-[#475569] text-[15px] lg:text-base leading-[1.9]">
          <p>
            많은 제조사는 우수한 제품과 생산 역량을 갖추고 있어도
            해외 판매를 실제로 시작하는 단계에서 막히곤 합니다.
          </p>
          <p>
            시장 적합성 검토, 판매 채널 선정, 상세페이지와 콘텐츠 구성,
            운영 구조, 물류 흐름까지 정리되지 않으면
            좋은 제품도 해외 시장에서 성과로 이어지기 어렵습니다.
          </p>
          <p className="font-semibold text-[#0F172A]">
            해외 판매의 핵심은 단순 입점이 아니라<br />
            어떤 제품을, 어떤 방식으로, 어떤 구조로 팔 것인가에 있습니다.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SELCADE'S ROLE
   ───────────────────────────────────────────────────────────── */
function Role() {
  return (
    <section id="role" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <SectionLabel text="Our Role" />
            <h2 className="mt-4 text-2xl lg:text-3xl font-black text-[#0F172A] leading-tight mb-6">
              셀케이드는 제품을 등록하는 데서<br />그치지 않습니다
            </h2>
            <div className="space-y-4 text-[#475569] text-[15px] leading-[1.9]">
              <p>
                해외 판매는 단순 입점만으로 성과가 나지 않습니다.
                제품이 어떤 방식으로 시장에 소개되어야 하는지,
                어떤 구조로 운영되어야 하는지,
                무엇을 먼저 준비해야 하는지까지 함께 설계해야 합니다.
              </p>
              <p>
                셀케이드는 제조사의 제품이 해외 시장에서
                판매 가능한 형태로 안착할 수 있도록
                전략부터 실행까지 연결합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { num: '①', label: '시장성 검토',   desc: '제품과 시장의 적합성 분석' },
              { num: '②', label: '콘텐츠 설계',   desc: '판매로 연결되는 상세페이지 구성' },
              { num: '③', label: '운영 구조화',   desc: '지속 판매가 가능한 운영 체계 수립' },
              { num: '④', label: '실행 지원',     desc: '전략에서 실행까지 단계별 연결' },
            ].map(({ num, label, desc }) => (
              <div key={label} className="bg-[#F8FAFC] rounded-xl p-6 border border-slate-200">
                <div className="text-[#2563EB] text-lg font-black mb-2">{num}</div>
                <div className="text-sm font-bold text-[#0F172A] mb-1">{label}</div>
                <div className="text-xs text-[#475569] leading-snug">{desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SUITABLE CUSTOMERS
   ───────────────────────────────────────────────────────────── */
function SuitableCustomers() {
  const items = [
    '자사 제품은 있지만 해외 판매를 어디서부터 시작해야 할지 명확하지 않은 제조사',
    '아마존 진출을 검토 중이지만 제품 등록 이후 운영 구조까지 감이 잡히지 않는 기업',
    '해외 판매용 상세페이지, 이미지, 메시지 구성이 준비되지 않은 제조사',
    '수출은 가능하지만 지속적인 판매 체계까지 연결되지 못한 기업',
    '제품과 시장을 함께 이해하는 실행형 파트너가 필요한 기업',
    '내부 담당자의 실무 역량 강화와 교육이 함께 필요한 기업',
  ]

  return (
    <section id="suitable" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-12 lg:mb-14">
          <SectionLabel text="Who We Help" dark />
          <h2 className="mt-4 text-2xl lg:text-3xl font-black text-white leading-tight max-w-2xl">
            이런 상황이라면,<br />
            지금 필요한 것은 실행 가능한 해외 판매 전략입니다
          </h2>
          <p className="mt-3 text-slate-400 text-[15px] max-w-xl leading-relaxed">
            제품 경쟁력만으로 해외 판매가 시작되지는 않습니다.
            시장 적합성, 채널 전략, 콘텐츠, 운영 방식이 정리되지 않으면
            좋은 제품도 해외에서 성과로 이어지기 어렵습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
          {items.map((item) => (
            <div
              key={item}
              className="flex items-start gap-3 bg-slate-800/50 border border-slate-700/50 rounded-lg px-5 py-4"
            >
              <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-[#60A5FA]" />
              </div>
              <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
            </div>
          ))}
        </div>

        <div className="bg-blue-900/30 border border-blue-700/40 rounded-xl px-7 py-5">
          <p className="text-blue-200 text-sm lg:text-[15px] leading-relaxed">
            셀케이드는 제조사의 제품이 해외 시장에서 실제 판매 가능한 형태로 정리될 수 있도록
            실무 중심으로 지원합니다.
          </p>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SERVICES
   ───────────────────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      num: '01',
      title: '시장성과 진출 방향 정리',
      desc: '어떤 제품이 어떤 시장에서 가능성이 있는지 검토하고, 진출 우선순위와 판매 방향을 정리합니다.',
    },
    {
      num: '02',
      title: '판매되는 상세페이지와 콘텐츠 기획',
      desc: '해외 고객이 제품의 장점을 명확하게 이해할 수 있도록 상세페이지 구조, 이미지 방향, 메시지를 설계합니다.',
    },
    {
      num: '03',
      title: '운영 가능한 판매 구조 구축',
      desc: '입점 이후 실제 판매가 이어질 수 있도록 운영 흐름, 채널 구조, 실행 방식을 함께 점검합니다.',
    },
    {
      num: '04',
      title: '내부 역량 강화를 위한 교육 지원',
      desc: '대표와 실무 담당자가 해외 판매를 이해하고 실행할 수 있도록 실무형 교육과 강의를 제공합니다.',
    },
  ]

  return (
    <section id="services" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Services" />
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-[#0F172A] leading-tight">
            해외 판매를 위해 필요한<br />핵심 영역만 정리합니다
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {services.map(({ num, title, desc }) => (
            <article
              key={num}
              className="bg-[#F8FAFC] rounded-xl p-8 border border-slate-200 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="text-blue-200 font-black text-5xl leading-none mb-5 select-none">{num}</div>
              <h3 className="text-base font-bold text-[#0F172A] mb-3 leading-snug">{title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={() => smoothScroll('#contact')}
            className="px-8 py-3.5 text-sm font-semibold bg-[#2563EB] text-white rounded hover:bg-blue-700 transition-colors duration-200"
          >
            제조사 상담 문의하기
          </button>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   DIFFERENTIATOR
   ───────────────────────────────────────────────────────────── */
function Differentiator() {
  const points = [
    {
      num: '01',
      title: '전략이 아니라, 실행합니다',
      desc: '제안서로 끝나지 않습니다. 아마존 판매, 브랜드 운영, 유통 실행을 직접 수행하며 만든 결과로 증명합니다.',
    },
    {
      num: '02',
      title: '입점 이후까지 봅니다',
      desc: '채널 등록에서 끝나지 않습니다. 판매가 실제로 이어지는 구조를 함께 설계하고 실행합니다.',
    },
    {
      num: '03',
      title: '제조사 특성을 이해합니다',
      desc: '생산 역량은 있지만 판매 구조가 없는 제조사의 상황을 이해하고, 현실적인 출발점에서 시작합니다.',
    },
    {
      num: '04',
      title: '교육도 현장에서 나옵니다',
      desc: '직접 운영하고 판매한 경험을 기반으로 기업·기관에 실무 중심의 이커머스·브랜드·유통 교육을 제공합니다.',
    },
  ]

  return (
    <section id="differentiator" className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-16 items-start">

          <div>
            <SectionLabel text="Why Selcade" />
            <h2 className="mt-4 text-2xl lg:text-3xl font-black text-[#0F172A] leading-tight mb-6">
              제조사에게 필요한 것은<br />이론보다 실행 경험입니다
            </h2>
            <div className="space-y-4 text-[#475569] text-[15px] leading-[1.9]">
              <p>
                셀케이드는 2016년부터 글로벌 이커머스 실무를 이어오며
                판매, 운영, 콘텐츠, 교육, 컨설팅을 함께 수행해왔습니다.
              </p>
              <p>
                특히 2024년에는 국내외 판매 경험이 전혀 없던 제조사 자사제품을
                아마존 베스트셀러 랭킹 1위까지 끌어올린 운영 성과를 만들었습니다.
              </p>
              <p className="font-semibold text-[#0F172A]">
                이 경험은 단순한 조언이 아니라
                실행 가능한 방향을 제시하는 기반이 됩니다.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {points.map(({ num, title, desc }) => (
              <div key={num} className="flex gap-4 bg-white rounded-xl p-6 border border-slate-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-0.5">
                  <span className="text-[#2563EB] text-[10px] font-black">{num}</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] mb-1.5">{title}</h3>
                  <p className="text-[#475569] text-xs leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRACK RECORD
   ───────────────────────────────────────────────────────────── */
function TrackRecord() {
  const history = [
    { year: '2016',  text: '아마존 글로벌 셀링 시작' },
    { year: '2019',  text: '동국대학교 · 신라대학교 · 충북대학교 · 숭실대학교 GTEP 전자상거래 강의 수행' },
    { year: '2019',  text: '신라대학교 · 충북대학교 GTEP 전자상거래 멘토링 수행' },
    { year: '2019',  text: 'KITA 글로벌 이커머스 스쿨 강의 및 멘토링 수행' },
    { year: '2019',  text: '경북 청년무역사관학교 아마존 강의 수행' },
    { year: '2019',  text: '부산무역협회 글로벌 셀링 교육 아마존 강의 수행' },
    { year: '2019',  text: '충북무역협회 글로벌 셀링 지원사업 컨설팅 수행' },
    { year: '2019~', text: '아마존 브랜드 운영대행 수행' },
    { year: '2021~', text: 'aT센터 아마존 글로벌 셀링 강의 수행' },
    { year: '2023~', text: '식음료 브랜드 운영 총괄' },
    { year: '2024~', text: '네이버 · 쿠팡 · 자사몰 운영대행 수행' },
    { year: '2024',  text: '국내외 판매 경험이 전혀 없던 제조사 자사제품 아마존 베스트셀러 1위 달성', highlight: true },
  ]

  const badges = [
    { label: 'Since 2016',        sub: '글로벌 이커머스 실무' },
    { label: 'Amazon #1',         sub: '제조사 자사제품 운영 성과' },
    { label: 'B2B Experience',    sub: '대학·기관·무역 유관기관 강의' },
    { label: 'Execution-Based',   sub: '운영·콘텐츠·마케팅·교육 연결' },
  ]

  return (
    <section id="track-record" className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-12 lg:mb-14">
          <SectionLabel text="Track Record" dark />
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-white leading-tight">
            신뢰는 수행 이력에서 만들어집니다
          </h2>
          <p className="mt-3 text-slate-400 text-[15px] max-w-xl leading-relaxed">
            셀케이드의 역량은 실제 사업 운영을 통해 쌓인 것입니다.
          </p>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {badges.map(({ label, sub }) => (
            <div key={label} className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-5 text-center">
              <div className="text-white font-bold text-sm mb-1">{label}</div>
              <div className="text-slate-400 text-xs">{sub}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="space-y-2.5">
          {history.map(({ year, text, highlight }) => (
            <div
              key={text}
              className={`flex gap-5 rounded-lg px-5 py-4 border ${
                highlight
                  ? 'bg-blue-900/40 border-blue-600/50'
                  : 'bg-slate-800/40 border-slate-700/40'
              }`}
            >
              <div className={`flex-shrink-0 text-xs font-bold w-12 mt-0.5 ${highlight ? 'text-[#60A5FA]' : 'text-slate-500'}`}>
                {year}
              </div>
              <div className={`text-sm leading-relaxed ${highlight ? 'text-blue-200 font-semibold' : 'text-slate-300'}`}>
                {text}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   PROCESS
   ───────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { num: '01', title: '상담', desc: '현재 제품, 목표 시장, 고민 지점을 확인합니다.' },
    { num: '02', title: '진단', desc: '시장성과 판매 구조를 실무 기준으로 검토합니다.' },
    { num: '03', title: '제안', desc: '필요한 범위에 맞춰 컨설팅, 운영, 콘텐츠, 교육 방향을 제안합니다.' },
    { num: '04', title: '실행', desc: '우선순위에 맞춰 단계적으로 진행합니다.' },
  ]

  return (
    <section id="process" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Process" />
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-[#0F172A] leading-tight">
            복잡하게 시작할 필요는 없습니다
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 mb-10">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="bg-[#F8FAFC] rounded-xl p-7 border border-slate-200">
              <div className="w-10 h-10 rounded-full bg-[#2563EB] flex items-center justify-center mb-5">
                <span className="text-white text-xs font-black">{num}</span>
              </div>
              <h3 className="text-base font-bold text-[#0F172A] mb-2">{title}</h3>
              <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl px-7 py-5 max-w-2xl">
          <p className="text-[#475569] text-sm lg:text-[15px] leading-relaxed">
            처음부터 큰 범위로 시작하지 않아도 됩니다.<br />
            현재 상황에 맞는 방식으로 현실적인 출발점을 함께 정리합니다.
          </p>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
   ───────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          <div>
            <SectionLabel text="About" />
            <h2 className="mt-4 text-3xl lg:text-4xl font-black text-[#0F172A] leading-tight mb-7">
              셀케이드는 제조사의 제품이<br />해외에서 실제로 팔리도록 돕습니다
            </h2>
            <div className="space-y-5 text-[#475569] text-[15px] leading-[1.9]">
              <p>
                셀케이드는 2016년 아마존 글로벌 셀링을 시작으로
                브랜드 운영, 판매대행, 콘텐츠 기획, 마케팅, 교육, 컨설팅을 수행해왔습니다.
              </p>
              <p>
                해외 판매는 단순한 입점이 아니라
                제품, 콘텐츠, 운영, 시장 이해가 함께 맞물려야 가능한 일입니다.
              </p>
              <p>
                셀케이드는 제조사의 제품이 해외 시장에서
                실제 판매 성과로 이어질 수 있도록 실행 중심의 역할을 수행합니다.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: '글로벌 이커머스 시작', value: '2016년~',    desc: 'Amazon 직접 판매 운영' },
              { label: 'aT센터 강의',         value: '2021년~',    desc: '글로벌 셀링 강의 수행' },
              { label: '제조사 운영 성과',     value: '아마존 1위', desc: '2024년 베스트셀러 달성' },
              { label: '교육 및 컨설팅',       value: '대학·기관',  desc: '무역협회·KITA·aT센터' },
            ].map(({ label, value, desc }) => (
              <div key={label} className="bg-white rounded-xl p-6 border border-slate-200">
                <div className="text-xs text-slate-400 font-medium mb-1.5 tracking-wide">{label}</div>
                <div className="text-xl font-black text-[#0F172A] mb-1 leading-tight">{value}</div>
                <div className="text-xs text-[#475569] leading-snug">{desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ
   Uses native <details>/<summary> — no JS state needed.
   ───────────────────────────────────────────────────────────── */
function FAQ() {
  const faqs = [
    {
      q: '해외 판매가 처음이어도 가능한가요?',
      a: '가능합니다. 현재 상황에 맞춰 준비 범위와 우선순위를 함께 정리합니다.',
    },
    {
      q: '아마존 외 채널도 함께 볼 수 있나요?',
      a: '가능합니다. 아마존 중심으로 접근하되 네이버, 쿠팡, 자사몰 운영 경험을 바탕으로 전체 구조를 함께 봅니다.',
    },
    {
      q: '상세페이지나 콘텐츠 기획만 별도로 의뢰할 수 있나요?',
      a: '가능합니다. 전체 운영뿐 아니라 필요한 영역 중심으로도 진행할 수 있습니다.',
    },
    {
      q: '교육만 별도로 요청할 수 있나요?',
      a: '가능합니다. 기업, 기관, 실무 담당자 대상 강의와 교육도 진행합니다.',
    },
  ]

  return (
    <section id="faq" className="py-24 lg:py-32 bg-white">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="mb-12">
          <SectionLabel text="FAQ" />
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-[#0F172A] leading-tight">
            자주 묻는 질문
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group bg-[#F8FAFC] border border-slate-200 rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-6 py-5 cursor-pointer list-none select-none">
                <span className="text-sm font-semibold text-[#0F172A] leading-snug pr-4">{q}</span>
                <span className="flex-shrink-0 w-6 h-6 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 text-base font-light group-open:rotate-45 transition-transform duration-200">
                  +
                </span>
              </summary>
              <div className="px-6 pb-5">
                <p className="text-[#475569] text-sm leading-relaxed border-t border-slate-200 pt-4">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FINAL CTA
   ───────────────────────────────────────────────────────────── */
function FinalCTA() {
  return (
    <section className="py-20 lg:py-24 bg-[#2563EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        <h2 className="text-2xl lg:text-3xl font-black text-white mb-5 leading-tight max-w-2xl mx-auto">
          해외 판매를 검토 중이라면,<br />실행 가능한 방향부터 점검해보시기 바랍니다
        </h2>
        <p className="text-blue-100 text-base lg:text-lg max-w-xl mx-auto mb-8 leading-[1.85]">
          제품의 시장성, 아마존 진출 방향, 콘텐츠 구성, 운영 구조까지<br />
          제조사 상황에 맞는 현실적인 방향을 함께 정리해드립니다.
        </p>
        <button
          onClick={() => smoothScroll('#contact')}
          className="inline-block px-8 py-4 text-sm font-semibold bg-white text-[#2563EB] rounded hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200"
        >
          제조사 상담 문의하기
        </button>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
   ───────────────────────────────────────────────────────────── */
const FORMSPREE_URL = 'https://formspree.io/f/mnjglage'

const EMPTY_FORM = {
  org: '', name: '', phone: '', email: '',
  inquiryType: '', product: '', country: '', message: '',
}

const FIELD_ORDER = ['org', 'name', 'phone', 'email', 'inquiryType', 'product', 'country', 'message']

function validateForm(fields) {
  const e = {}
  if (!fields.org.trim())
    e.org = '회사명을 입력해 주세요.'
  if (!fields.name.trim())
    e.name = '담당자명을 입력해 주세요.'
  else if (fields.name.trim().length < 2)
    e.name = '담당자명은 2자 이상 입력해 주세요.'
  if (!fields.phone.trim())
    e.phone = '연락처를 입력해 주세요.'
  if (!fields.email.trim())
    e.email = '이메일 주소를 입력해 주세요.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim()))
    e.email = '올바른 이메일 주소 형식으로 입력해 주세요.'
  if (!fields.message.trim())
    e.message = '문의 내용을 입력해 주세요.'
  else if (fields.message.trim().length < 10)
    e.message = '문의 내용은 10자 이상 입력해 주세요.'
  return e
}

function Contact() {
  const [form, setForm]               = useState(EMPTY_FORM)
  const [errors, setErrors]           = useState({})
  const [status, setStatus]           = useState('idle')
  const [serverError, setServerError] = useState('')

  const fieldRefs = useRef({})
  const setFieldRef = (name) => (el) => { fieldRefs.current[name] = el }

  const abortRef = useRef(null)
  useEffect(() => () => abortRef.current?.abort(), [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
    if (status === 'error') setStatus('idle')
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    if (name === 'email' && value.trim() && !errors.email) {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        setErrors((prev) => ({ ...prev, email: '올바른 이메일 주소 형식으로 입력해 주세요.' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      const firstKey = FIELD_ORDER.find((k) => validationErrors[k])
      if (firstKey) fieldRefs.current[firstKey]?.focus()
      return
    }
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    setStatus('submitting')
    setServerError('')
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        signal: abortRef.current.signal,
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[셀케이드 제조사 문의] ${form.org.trim()}`,
          _gotcha:  '',
          회사명:           form.org.trim(),
          담당자명:          form.name.trim(),
          연락처:            form.phone.trim(),
          이메일:            form.email.trim(),
          문의종류:          form.inquiryType,
          제품명_카테고리:    form.product.trim(),
          진출희망국가:       form.country.trim(),
          문의내용:          form.message.trim(),
        }),
      })
      if (res.ok) {
        setStatus('success')
        setForm(EMPTY_FORM)
        setErrors({})
      } else {
        const data = await res.json().catch(() => ({}))
        const msg  = data?.errors?.map((err) => err.message).join(' ') || ''
        setServerError(msg || '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
        setStatus('error')
      }
    } catch (err) {
      if (err.name === 'AbortError') return
      setServerError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.')
      setStatus('error')
    }
  }

  const isSubmitting = status === 'submitting'

  return (
    <section id="contact" className="py-24 lg:py-32 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Contact" />
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-[#0F172A] leading-tight">
            제조사 맞춤 상담 문의
          </h2>
          <p className="mt-3 text-[#475569] text-base lg:text-[17px] leading-relaxed">
            현재 제품과 목표 시장을 남겨주시면<br />
            상황에 맞는 현실적인 방향으로 검토해드립니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* Left: contact info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">연락처</h3>
              <div className="space-y-4">
                <ContactItem label="이메일" value="shawn@selcade.com" href="mailto:shawn@selcade.com" />
                <ContactItem label="전화"   value="070-4170-0801"     href="tel:070-4170-0801" />
              </div>
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">문의 분야</h3>
              <ul className="space-y-2">
                {[
                  '아마존 운영대행',
                  '브랜드 · 채널 운영대행',
                  '해외 판매 콘텐츠 기획',
                  '글로벌 이커머스 컨설팅',
                  '기업 · 기관 실무 교육',
                  '기타 협업 문의',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="text-[#475569] text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: form */}
          <div className="lg:col-span-3">
            {status === 'success' ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-white rounded-xl p-12 border border-slate-200 text-center flex flex-col items-center gap-4"
              >
                <div aria-hidden="true" className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <div className="w-2.5 h-5 border-r-2 border-b-2 border-blue-600 rotate-45 -mt-1" />
                </div>
                <h3 className="text-lg font-bold text-[#0F172A]">문의가 접수되었습니다</h3>
                <p className="text-[#475569] text-sm max-w-xs leading-relaxed">
                  소중한 문의 감사합니다.<br />빠른 시간 내에 답변드리겠습니다.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-2"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="제조사 상담 문의 양식"
                className="bg-white rounded-xl p-8 lg:p-10 border border-slate-200 space-y-5"
              >
                {/* 회사명 + 담당자명 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="회사명" name="org" type="text"
                    placeholder="회사명 또는 기관명" autoComplete="organization"
                    value={form.org} onChange={handleChange}
                    error={errors.org} inputRef={setFieldRef('org')} required
                  />
                  <FormField
                    label="담당자명" name="name" type="text"
                    placeholder="홍길동" autoComplete="name"
                    value={form.name} onChange={handleChange}
                    error={errors.name} inputRef={setFieldRef('name')} required
                  />
                </div>

                {/* 연락처 + 이메일 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="연락처" name="phone" type="tel"
                    placeholder="010-0000-0000" autoComplete="tel"
                    value={form.phone} onChange={handleChange}
                    error={errors.phone} inputRef={setFieldRef('phone')} required
                  />
                  <FormField
                    label="이메일" name="email" type="email"
                    placeholder="example@company.com" autoComplete="email"
                    value={form.email} onChange={handleChange} onBlur={handleBlur}
                    error={errors.email} inputRef={setFieldRef('email')} required
                  />
                </div>

                {/* 문의 종류 */}
                <SelectField
                  label="문의 종류" name="inquiryType"
                  value={form.inquiryType} onChange={handleChange}
                  error={errors.inquiryType} inputRef={setFieldRef('inquiryType')}
                  options={[
                    { value: '',        label: '선택해 주세요' },
                    { value: '운영대행', label: '운영대행' },
                    { value: '교육',    label: '교육' },
                    { value: '컨설팅',  label: '컨설팅' },
                    { value: '기타',    label: '기타' },
                  ]}
                />

                {/* 제품명 + 진출 희망 국가 */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="제품명 / 제품 카테고리" name="product" type="text"
                    placeholder="예: 건강기능식품, 주방용품" autoComplete="off"
                    value={form.product} onChange={handleChange}
                    error={errors.product} inputRef={setFieldRef('product')}
                  />
                  <FormField
                    label="진출 희망 국가" name="country" type="text"
                    placeholder="예: 미국, 일본, 유럽" autoComplete="off"
                    value={form.country} onChange={handleChange}
                    error={errors.country} inputRef={setFieldRef('country')}
                  />
                </div>

                {/* 문의 내용 */}
                <div>
                  <label htmlFor="field-message" className="block text-xs font-semibold text-[#475569] mb-1.5">
                    문의 내용
                    <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>
                    <span className="sr-only">(필수)</span>
                  </label>
                  <textarea
                    id="field-message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    ref={setFieldRef('message')}
                    rows={5}
                    required
                    aria-required="true"
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? 'field-message-error' : undefined}
                    placeholder="현재 제품, 목표 시장, 고민 지점을 자유롭게 작성해 주세요."
                    className={`w-full px-4 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 transition text-[#0F172A] placeholder:text-slate-300 resize-none ${
                      errors.message
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                        : 'border-slate-200 focus:border-blue-400 focus:ring-blue-50'
                    }`}
                  />
                  {errors.message && (
                    <p id="field-message-error" role="alert" className="mt-1 text-xs text-red-500">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Server-level error banner */}
                <div role="alert" aria-live="assertive" aria-atomic="true" className="empty:hidden">
                  {status === 'error' && serverError && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                      <div aria-hidden="true" className="w-4 h-4 flex-shrink-0 mt-0.5 rounded-full border border-red-400 flex items-center justify-center">
                        <span className="text-red-500 text-[10px] font-black leading-none">!</span>
                      </div>
                      <p className="text-xs text-red-600 leading-relaxed">{serverError}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  className="w-full py-3.5 text-sm font-semibold rounded transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-[#2563EB] text-white hover:bg-blue-700 active:bg-blue-800"
                >
                  {isSubmitting ? '전송 중...' : '제조사 상담 문의하기'}
                </button>

                <p className="text-xs text-slate-400 text-center">
                  입력하신 정보는 문의 응대 목적으로만 사용됩니다.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
   ───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="bg-[#0F172A] py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <div className="text-white font-black text-base tracking-logo mb-0.5">SELCADE</div>
            <div className="text-slate-400 text-sm font-medium">셀케이드 주식회사 | SELCADE Co., Ltd.</div>
            <div className="text-slate-600 text-xs leading-relaxed mt-1">
              사업자등록번호: 427-86-03147 &nbsp;·&nbsp; 대표: 김상걸
              <br />
              인천광역시 연수구 센트럴로 313, B611 &nbsp;·&nbsp; 070-4170-0801 &nbsp;·&nbsp; shawn@selcade.com
            </div>
          </div>
          <div className="text-slate-600 text-xs">
            © {new Date().getFullYear()} Selcade Co., Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────
   SHARED / UTILITY COMPONENTS
   ───────────────────────────────────────────────────────────── */

function SectionLabel({ text, dark = false }) {
  return (
    <div className="inline-flex items-center gap-3" aria-hidden="true">
      <div className={`w-6 h-px ${dark ? 'bg-[#60A5FA]' : 'bg-[#2563EB]'}`} />
      <span className={`text-xs font-semibold tracking-[0.18em] uppercase ${dark ? 'text-[#60A5FA]' : 'text-[#2563EB]'}`}>
        {text}
      </span>
    </div>
  )
}

function ContactItem({ label, value, href, note }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded bg-slate-200 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
      </div>
      <div>
        <div className="text-xs text-slate-400 mb-0.5">{label}</div>
        <a href={href} className="text-[#0F172A] text-sm font-medium hover:text-[#2563EB] transition-colors duration-200">
          {value}
        </a>
        {note && <div className="text-[11px] text-slate-400 mt-0.5">{note}</div>}
      </div>
    </div>
  )
}

function FormField({
  label, name, type, placeholder,
  value, onChange, onBlur,
  error, required, autoComplete, inputRef,
}) {
  const fieldId = `field-${name}`
  const errorId = `field-${name}-error`
  return (
    <div>
      <label htmlFor={fieldId} className="block text-xs font-semibold text-[#475569] mb-1.5">
        {label}
        {required && (
          <>
            <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>
            <span className="sr-only">(필수)</span>
          </>
        )}
      </label>
      <input
        id={fieldId}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        ref={inputRef}
        className={`w-full px-4 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 transition text-[#0F172A] placeholder:text-slate-300 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
            : 'border-slate-200 focus:border-blue-400 focus:ring-blue-50'
        }`}
      />
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

function SelectField({ label, name, value, onChange, error, required, inputRef, options }) {
  const fieldId = `field-${name}`
  const errorId = `field-${name}-error`
  return (
    <div>
      <label htmlFor={fieldId} className="block text-xs font-semibold text-[#475569] mb-1.5">
        {label}
        {required && (
          <>
            <span className="text-red-400 ml-0.5" aria-hidden="true">*</span>
            <span className="sr-only">(필수)</span>
          </>
        )}
      </label>
      <select
        id={fieldId}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        ref={inputRef}
        className={`w-full px-4 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 transition bg-white ${
          value === '' ? 'text-slate-400' : 'text-[#0F172A]'
        } ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
            : 'border-slate-200 focus:border-blue-400 focus:ring-blue-50'
        }`}
      >
        {options.map(({ value: v, label: l }) => (
          <option key={v} value={v} disabled={v === ''} className="text-[#0F172A]">{l}</option>
        ))}
      </select>
      {error && (
        <p id={errorId} role="alert" className="mt-1 text-xs text-red-500">{error}</p>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROOT APP
   ───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <ErrorBoundary>
      <div className="font-sans antialiased">
        <Header />
        <Hero />
        <TrustBar />
        <Problem />
        <Role />
        <SuitableCustomers />
        <Services />
        <Differentiator />
        <TrackRecord />
        <Process />
        <About />
        <FAQ />
        <FinalCTA />
        <Contact />
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
