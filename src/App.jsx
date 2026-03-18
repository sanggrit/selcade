/**
 * Selcade Co., Ltd. — 셀케이드 주식회사
 * React + Tailwind CSS single-page site
 *
 * Section order:
 *   Header → Hero → TrustBar → ProblemRole → Services →
 *   Fit → TrackRecord → Process → FinalCTA → Contact → Footer
 *
 * Color system:
 *   Dark BG:        #0A0A0A / #111318
 *   Light BG:       #F8FAFC / #FFFFFF
 *   Text on dark:   #F5F5F4 (primary) / #94A3B8 (secondary)
 *   Text on light:  #111827 (primary) / #334155 (secondary) / #64748B (muted)
 *   Borders dark:   #27272A
 *   Borders light:  #E2E8F0
 *   Accent amber:   #F59E0B / hover #D97706
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
  static getDerivedStateFromError(error) { return { error } }
  render() {
    if (this.state.error) {
      return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '2rem', textAlign: 'center', background: '#0A0A0A' }}>
          <div>
            <p style={{ fontSize: '0.75rem', letterSpacing: '0.15em', color: '#94a3b8', marginBottom: '1rem' }}>SELCADE</p>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 700, color: '#F5F5F4', marginBottom: '0.5rem' }}>페이지를 불러오는 중 오류가 발생했습니다.</h1>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '1.5rem' }}>잠시 후 다시 시도해 주세요.</p>
            <button
              onClick={() => window.location.reload()}
              style={{ padding: '0.75rem 1.75rem', fontSize: '0.85rem', fontWeight: 700, background: '#F59E0B', color: '#0A0A0A', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
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
   HELPER
   ───────────────────────────────────────────────────────────── */
function smoothScroll(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─────────────────────────────────────────────────────────────
   HEADER
   — always over dark sections, dark bg on scroll
   ───────────────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navLinks = [
    { label: '서비스',    href: '#services' },
    { label: '수행 이력', href: '#track-record' },
    { label: '진행 방식', href: '#process' },
    { label: '문의하기',  href: '#contact' },
  ]

  const handleNav = (href) => {
    setMenuOpen(false)
    smoothScroll(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/96 backdrop-blur-md border-b border-[#27272A]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex items-center justify-between h-16 lg:h-[72px]">

        {/* Logo */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); smoothScroll('#hero') }}
          className="flex flex-col gap-[3px] select-none group"
          aria-label="셀케이드 주식회사 홈으로"
        >
          <span className="text-[13px] font-black tracking-[0.22em] uppercase text-[#F5F5F4] group-hover:text-white transition-colors duration-200">
            SELCADE
          </span>
          <span className="text-[8px] tracking-[0.2em] font-medium text-[#94A3B8]">
            셀케이드 주식회사
          </span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10" aria-label="주요 메뉴">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              className="text-[13px] font-medium text-[#94A3B8] hover:text-[#F5F5F4] transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
          className="hidden lg:block px-5 py-2.5 text-[13px] font-bold rounded bg-[#F59E0B] text-[#0A0A0A] hover:bg-[#D97706] transition-colors duration-200"
        >
          상담 문의
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          aria-expanded={menuOpen}
          className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-[5px] -mr-1"
        >
          <span className={`block w-5 h-[1.5px] bg-[#F5F5F4] transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5F5F4] transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-[#F5F5F4] transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[#111318] border-t border-[#27272A] px-5 py-4 flex flex-col gap-1">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              className="text-[#94A3B8] hover:text-[#F5F5F4] text-sm font-medium py-3.5 border-b border-[#27272A] last:border-0 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
            className="mt-4 block text-center px-5 py-3.5 text-sm font-bold rounded bg-[#F59E0B] text-[#0A0A0A]"
          >
            상담 문의
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
      className="relative min-h-screen flex items-center bg-[#0A0A0A] overflow-hidden"
    >
      {/* Ambient glow — restrained */}
      <div
        className="absolute top-[-10%] right-[-5%] w-[60vw] max-w-[800px] h-[60vw] max-h-[800px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-15%] left-[-5%] w-[40vw] max-w-[600px] h-[40vw] max-h-[600px] rounded-full bg-amber-900/10 blur-[100px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-28 sm:pt-32 pb-20 sm:pb-28 lg:pt-44 lg:pb-36">

        {/* Kicker */}
        <div className="flex items-center gap-3 mb-8 lg:mb-10">
          <div className="w-8 h-px bg-[#F59E0B]" aria-hidden="true" />
          <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-[#94A3B8]">
            SELCADE Co., Ltd.
          </p>
        </div>

        {/* Headline */}
        <h1 className="text-[2.6rem] sm:text-[3.75rem] md:text-[5rem] lg:text-[6rem] xl:text-[7rem] font-black text-[#F5F5F4] leading-[1.04] tracking-tight mb-6 sm:mb-8">
          제조사의 제품을<br />
          해외 판매로 연결합니다
        </h1>

        {/* Sub */}
        <p className="text-[#94A3B8] text-[15px] sm:text-base lg:text-[17px] leading-[1.9] mb-10 sm:mb-12 max-w-xl">
          셀케이드는 제조사를 위한 실행형 글로벌 이커머스 파트너입니다.<br className="hidden sm:block" />
          아마존 전략, 콘텐츠, 운영, 교육까지 실제 판매에 맞게 연결합니다.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button
            onClick={() => smoothScroll('#contact')}
            className="px-8 py-4 text-[15px] font-bold bg-[#F59E0B] text-[#0A0A0A] rounded hover:bg-[#D97706] active:scale-[0.98] transition-all duration-200"
          >
            제조사 상담 문의하기
          </button>
          <button
            onClick={() => smoothScroll('#services')}
            className="px-8 py-4 text-[15px] font-semibold text-[#F5F5F4] border border-[#3F3F46] rounded hover:border-[#71717A] hover:bg-white/5 active:scale-[0.98] transition-all duration-200"
          >
            서비스 보기
          </button>
        </div>

      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20 hidden sm:flex"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-[#F5F5F4] animate-pulse" />
        <span className="text-[#F5F5F4] text-[8px] tracking-[0.35em] uppercase">Scroll</span>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRUST BAR
   — dark strip, large stats, no visual break from hero
   ───────────────────────────────────────────────────────────── */
function TrustBar() {
  const stats = [
    { value: '2016',   label: '아마존 글로벌 셀링 시작' },
    { value: 'No.1',   label: '카테고리 베스트셀러' },
    { value: '9+',     label: '강의·컨설팅 기관' },
    { value: '실행',    label: '운영·콘텐츠·교육 연결' },
  ]
  return (
    <div className="bg-[#111318] border-y border-[#27272A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-[#27272A]">
          {stats.map(({ value, label }) => (
            <div key={label} className="py-8 sm:py-10 px-4 sm:px-8 lg:px-10 text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#F5F5F4] mb-1.5 tracking-tight">{value}</div>
              <div className="text-[11px] sm:text-xs font-medium text-[#94A3B8] tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   PROBLEM + ROLE
   — first light section, centered manifesto
   ───────────────────────────────────────────────────────────── */
function ProblemRole() {
  return (
    <section id="problem" className="py-24 sm:py-32 lg:py-44 bg-[#F8FAFC]">
      <div className="max-w-2xl mx-auto px-5 sm:px-8 lg:px-12 text-center">
        <SectionLabel text="The Problem" />
        <h2 className="mt-5 text-[2.25rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-black text-[#111827] leading-[1.08] tracking-tight mb-10 sm:mb-12">
          좋은 제품만으로는<br />해외에서 팔리지 않습니다
        </h2>
        <div className="space-y-5 text-[#334155] text-[15px] sm:text-base lg:text-[17px] leading-[1.9]">
          <p>
            해외 판매는 단순 입점으로 끝나지 않습니다.<br />
            시장, 콘텐츠, 운영, 구조가 함께 맞아야 실제 판매로 이어집니다.
          </p>
          <p>
            셀케이드는 제품 등록에 그치지 않습니다.<br />
            제조사의 제품이 해외 시장에서 팔릴 수 있도록<br className="hidden sm:block" />
            전략부터 실행까지 연결합니다.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FIT
   — dark section, bold checklist
   ───────────────────────────────────────────────────────────── */
function Fit() {
  const items = [
    '해외 판매를 어디서부터 시작해야 할지 모르는 기업',
    '아마존 진출은 고민 중이지만 운영 구조가 막막한 기업',
    '상세페이지와 콘텐츠가 준비되지 않은 제조사',
    '수출 이후 지속적인 판매 체계가 필요한 기업',
    '실무형 파트너와 교육이 함께 필요한 기업',
  ]
  return (
    <section id="fit" className="py-24 sm:py-32 lg:py-40 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <SectionLabel text="Who We Help" dark />
          <h2 className="mt-5 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-black text-[#F5F5F4] leading-tight mb-12 sm:mb-14">
            이런 제조사와<br />잘 맞습니다
          </h2>
          <ul className="space-y-5 sm:space-y-6 mb-14">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-4 sm:gap-5 group">
                <span className="mt-[10px] w-1.5 h-1.5 rounded-full bg-[#F59E0B] flex-shrink-0" aria-hidden="true" />
                <span className="text-[#94A3B8] group-hover:text-[#F5F5F4] text-[15px] sm:text-base leading-relaxed transition-colors duration-200">{item}</span>
              </li>
            ))}
          </ul>
          <div className="border-t border-[#27272A] pt-6">
            <p className="text-[#52525B] text-sm leading-relaxed">
              셀케이드는 제조사의 제품이 해외 시장에서 실제 판매로 이어질 수 있도록 실무 중심으로 지원합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   SERVICES
   — white, 2×2 grid, strong card borders
   ───────────────────────────────────────────────────────────── */
function Services() {
  const services = [
    { title: '시장 검토',   desc: '어떤 제품이 어떤 시장에서 통할지 정리합니다.' },
    { title: '콘텐츠 기획', desc: '해외 고객이 이해하는 상세페이지와 메시지를 만듭니다.' },
    { title: '운영 설계',   desc: '입점 이후 판매가 이어지는 구조를 점검합니다.' },
    { title: '교육 지원',   desc: '대표와 실무자가 직접 이해하고 실행할 수 있게 돕습니다.' },
  ]

  return (
    <section id="services" className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <div className="mb-14 sm:mb-16 lg:mb-20 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 sm:gap-8">
          <div>
            <SectionLabel text="Services" />
            <h2 className="mt-4 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-black text-[#111827] leading-tight">
              등록이 아니라<br />판매까지 설계합니다
            </h2>
          </div>
          <button
            onClick={() => smoothScroll('#contact')}
            className="self-start sm:self-auto flex-shrink-0 px-6 py-3 text-sm font-bold bg-[#F59E0B] text-[#0A0A0A] rounded hover:bg-[#D97706] transition-colors duration-200 flex items-center gap-2 group"
          >
            상담 문의하기
            <span className="group-hover:translate-x-0.5 transition-transform duration-200 inline-block">→</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-[#E2E8F0]">
          {services.map(({ title, desc }) => (
            <article
              key={title}
              className="bg-white p-8 sm:p-10 lg:p-14 hover:bg-[#F8FAFC] transition-colors duration-200"
            >
              <div className="w-8 h-[3px] bg-[#F59E0B] mb-8" />
              <h3 className="text-lg sm:text-xl font-black text-[#111827] mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-[#334155] text-[15px] leading-[1.85]">{desc}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRACK RECORD
   — light section, badges + timeline
   ───────────────────────────────────────────────────────────── */
function TrackRecord() {
  const badges = [
    { label: 'Since 2016',      sub: '글로벌 이커머스 실무' },
    { label: 'Amazon #1',       sub: '제조사 자사제품 베스트셀러' },
    { label: 'B2B Education',   sub: '대학·기관·무역협회 강의' },
    { label: 'Execution-Based', sub: '운영·콘텐츠·교육 연결' },
  ]
  const history = [
    { year: '2016',   text: '아마존 글로벌 셀링 시작' },
    { year: '2019',   text: '대학·무역기관 전자상거래 강의 및 멘토링 수행' },
    { year: '2019 ~', text: '아마존 브랜드 운영대행 수행' },
    { year: '2021 ~', text: 'aT센터 아마존 글로벌 셀링 강의 수행' },
    { year: '2024',   text: '제조사 자사제품 아마존 베스트셀러 랭킹 1위 달성', highlight: true },
  ]

  return (
    <section id="track-record" className="py-24 sm:py-32 lg:py-40 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <div className="mb-12 sm:mb-14 lg:mb-16">
          <SectionLabel text="Results" />
          <h2 className="mt-4 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-black text-[#111827] leading-tight">
            신뢰는<br />결과로 증명합니다
          </h2>
          <p className="mt-5 text-[#334155] text-[15px] max-w-xl leading-[1.85]">
            셀케이드는 2016년부터 글로벌 이커머스 실무를 이어왔습니다.<br />
            그리고 2024년, 판매 경험이 없던 제조사 자사제품을<br className="hidden sm:block" />
            아마존 베스트셀러 랭킹 1위까지 끌어올렸습니다.
          </p>
        </div>

        {/* Badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12 sm:mb-14">
          {badges.map(({ label, sub }) => (
            <div key={label} className="bg-white border border-[#E2E8F0] rounded-lg p-5 sm:p-6 lg:p-7 shadow-sm hover:shadow-md hover:border-[#CBD5E1] transition-all duration-200">
              <div className="text-sm font-black text-[#111827] mb-1.5">{label}</div>
              <div className="text-[11px] font-medium text-[#64748B] leading-snug">{sub}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="divide-y divide-[#E2E8F0]">
          {history.map(({ year, text, highlight }) => (
            <div
              key={text}
              className={`flex gap-6 sm:gap-10 py-5 sm:py-6 ${
                highlight
                  ? 'bg-amber-50 -mx-4 sm:-mx-5 px-4 sm:px-5 border-l-[3px] border-[#F59E0B] rounded-r-sm'
                  : ''
              }`}
            >
              <div className={`flex-shrink-0 text-[11px] font-bold w-14 sm:w-16 pt-0.5 tracking-wide ${highlight ? 'text-[#F59E0B]' : 'text-[#94A3B8]'}`}>
                {year}
              </div>
              <div className={`text-[15px] leading-relaxed ${highlight ? 'text-[#111827] font-bold' : 'text-[#334155]'}`}>
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
   — dark section, amber step numbers
   ───────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { num: '01', title: '상담', desc: '현재 제품과 목표 시장을 확인합니다.' },
    { num: '02', title: '진단', desc: '시장성과 판매 방향을 검토합니다.' },
    { num: '03', title: '제안', desc: '필요한 범위에 맞춰 방향을 제안합니다.' },
    { num: '04', title: '실행', desc: '우선순위에 맞춰 단계적으로 진행합니다.' },
  ]

  return (
    <section id="process" className="py-24 sm:py-32 lg:py-40 bg-[#111318]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <div className="mb-14 sm:mb-16 lg:mb-20">
          <SectionLabel text="Process" dark />
          <h2 className="mt-4 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-black text-[#F5F5F4] leading-tight">
            복잡하게 시작할<br />필요는 없습니다
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-[#27272A]">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="bg-[#111318] p-8 sm:p-9 lg:p-10 hover:bg-[#1A1F2E] transition-colors duration-200">
              <div className="text-[13px] font-black text-[#F59E0B] tracking-[0.2em] mb-7">{num}</div>
              <div className="text-[1.15rem] font-black text-[#F5F5F4] mb-3">{title}</div>
              <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
            </div>
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
    <section className="py-24 sm:py-32 lg:py-44 bg-[#0A0A0A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#F59E0B]" aria-hidden="true" />
            <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.3em] uppercase text-[#94A3B8]">
              Get in Touch
            </p>
          </div>
          <h2 className="text-[2.25rem] sm:text-[3rem] lg:text-[4rem] xl:text-[4.5rem] font-black text-[#F5F5F4] leading-[1.06] tracking-tight mb-6 sm:mb-8">
            해외 판매,<br />
            방향부터 점검해보시기 바랍니다
          </h2>
          <p className="text-[#94A3B8] text-[15px] sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-lg">
            제품의 시장성부터 아마존 진출 방향까지
            제조사 상황에 맞는 현실적인 방향을 함께 정리해드립니다.
          </p>
          <button
            onClick={() => smoothScroll('#contact')}
            className="inline-block px-10 py-5 text-[15px] sm:text-base font-bold bg-[#F59E0B] text-[#0A0A0A] rounded hover:bg-[#D97706] active:scale-[0.98] transition-all duration-200"
          >
            제조사 상담 문의하기
          </button>
        </div>
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

  const fieldRefs   = useRef({})
  const setFieldRef = (name) => (el) => { fieldRefs.current[name] = el }
  const abortRef    = useRef(null)
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
          _subject:       `[셀케이드 제조사 문의] ${form.org.trim()}`,
          _gotcha:        '',
          회사명:          form.org.trim(),
          담당자명:        form.name.trim(),
          연락처:          form.phone.trim(),
          이메일:          form.email.trim(),
          문의종류:        form.inquiryType,
          제품명_카테고리: form.product.trim(),
          진출희망국가:    form.country.trim(),
          문의내용:        form.message.trim(),
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
    <section id="contact" className="py-24 sm:py-32 lg:py-40 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">

        <div className="mb-12 sm:mb-14 lg:mb-16">
          <SectionLabel text="Contact" />
          <h2 className="mt-4 text-[2rem] sm:text-[2.5rem] lg:text-[3.25rem] font-black text-[#111827] leading-tight">
            제조사 맞춤 상담 문의
          </h2>
          <p className="mt-3 text-[#334155] text-[15px] max-w-lg leading-relaxed">
            현재 제품과 목표 시장을 남겨주시면
            상황에 맞는 현실적인 방향으로 검토해드립니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 sm:gap-14 lg:gap-20">

          {/* Left: contact info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <p className="text-[10px] font-bold text-[#64748B] tracking-[0.22em] uppercase mb-5">
                연락처
              </p>
              <div className="space-y-5">
                <ContactItem label="이메일" value="shawn@selcade.com" href="mailto:shawn@selcade.com" />
                <ContactItem label="전화"   value="070-4170-0801"     href="tel:070-4170-0801" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#64748B] tracking-[0.22em] uppercase mb-5">
                문의 분야
              </p>
              <ul className="space-y-3">
                {[
                  '아마존 운영대행',
                  '해외 판매 콘텐츠 기획',
                  '글로벌 이커머스 컨설팅',
                  '브랜드 · 채널 운영대행',
                  '기업 · 기관 실무 교육',
                  '기타 협업 문의',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-[#334155]">
                    <span className="w-px h-3.5 bg-[#CBD5E1] flex-shrink-0" aria-hidden="true" />
                    {item}
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
                className="border border-[#E2E8F0] rounded-xl p-12 sm:p-14 text-center flex flex-col items-center gap-4"
              >
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-full border-2 border-[#F59E0B] flex items-center justify-center"
                >
                  <div className="w-2 h-4 border-r-2 border-b-2 border-[#F59E0B] rotate-45 -mt-0.5" />
                </div>
                <h3 className="text-base font-bold text-[#111827]">문의가 접수되었습니다</h3>
                <p className="text-[#334155] text-sm leading-relaxed">
                  소중한 문의 감사합니다. 빠른 시간 내에 답변드리겠습니다.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs font-bold text-[#F59E0B] hover:underline underline-offset-2"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="제조사 상담 문의 양식"
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="회사명"   name="org"  type="text"  placeholder="회사명 또는 기관명" autoComplete="organization" value={form.org}  onChange={handleChange} error={errors.org}  inputRef={setFieldRef('org')}  required />
                  <FormField label="담당자명" name="name" type="text"  placeholder="홍길동"             autoComplete="name"         value={form.name} onChange={handleChange} error={errors.name} inputRef={setFieldRef('name')} required />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="연락처" name="phone" type="tel"   placeholder="010-0000-0000"      autoComplete="tel"   value={form.phone} onChange={handleChange} error={errors.phone} inputRef={setFieldRef('phone')} required />
                  <FormField label="이메일" name="email" type="email" placeholder="example@company.com" autoComplete="email" value={form.email} onChange={handleChange} onBlur={handleBlur} error={errors.email} inputRef={setFieldRef('email')} required />
                </div>
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
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField label="제품명 / 제품 카테고리" name="product" type="text" placeholder="예: 건강기능식품, 주방용품" autoComplete="off" value={form.product} onChange={handleChange} error={errors.product} inputRef={setFieldRef('product')} />
                  <FormField label="진출 희망 국가"         name="country" type="text" placeholder="예: 미국, 일본, 유럽"       autoComplete="off" value={form.country} onChange={handleChange} error={errors.country} inputRef={setFieldRef('country')} />
                </div>

                {/* 문의 내용 */}
                <div>
                  <label htmlFor="field-message" className="block text-[11px] font-bold text-[#334155] tracking-wide mb-1.5">
                    문의 내용
                    <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>
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
                    className={`w-full px-4 py-3.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition text-[#111827] placeholder:text-[#94A3B8] resize-none ${
                      errors.message
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                        : 'border-[#CBD5E1] focus:border-[#94A3B8] focus:ring-slate-50'
                    }`}
                  />
                  {errors.message && (
                    <p id="field-message-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Server error */}
                <div role="alert" aria-live="assertive" aria-atomic="true" className="empty:hidden">
                  {status === 'error' && serverError && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      <span aria-hidden="true" className="text-red-500 font-bold text-sm mt-px">!</span>
                      <p className="text-xs text-red-700 leading-relaxed">{serverError}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  className="w-full py-[1.1rem] text-[15px] font-bold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#111827] text-white hover:bg-[#1E293B] active:scale-[0.99]"
                >
                  {isSubmitting ? '전송 중...' : '제조사 상담 문의하기'}
                </button>

                <p className="text-[11px] text-[#94A3B8] text-center">
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
    <footer className="bg-[#0A0A0A] py-12 lg:py-16 border-t border-[#27272A]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-2.5">
            <div className="text-[#F5F5F4] font-black text-[13px] tracking-[0.22em] uppercase mb-1">
              SELCADE
            </div>
            <div className="text-[#52525B] text-xs leading-relaxed">
              셀케이드 주식회사 &nbsp;·&nbsp; 사업자등록번호: 427-86-03147 &nbsp;·&nbsp; 대표: 김상걸
            </div>
            <div className="text-[#52525B] text-xs leading-relaxed">
              인천광역시 연수구 센트럴로 313, B611
              &nbsp;·&nbsp; 070-4170-0801
              &nbsp;·&nbsp; shawn@selcade.com
            </div>
          </div>
          <div className="text-[#3F3F46] text-[11px]">
            © {new Date().getFullYear()} Selcade Co., Ltd. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────────────────────────
   UTILITY COMPONENTS
   ───────────────────────────────────────────────────────────── */

/** Amber rule + small-caps label above section headings. */
function SectionLabel({ text, dark = false }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="w-6 h-px bg-[#F59E0B]" aria-hidden="true" />
      <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${dark ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
        {text}
      </span>
    </div>
  )
}

function ContactItem({ label, value, href }) {
  return (
    <div>
      <div className="text-[10px] font-bold text-[#64748B] mb-1 tracking-wide uppercase">{label}</div>
      <a
        href={href}
        className="text-[15px] font-semibold text-[#111827] hover:text-[#F59E0B] transition-colors duration-200"
      >
        {value}
      </a>
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
      <label htmlFor={fieldId} className="block text-[11px] font-bold text-[#334155] tracking-wide mb-1.5">
        {label}
        {required && <><span className="text-red-500 ml-0.5" aria-hidden="true">*</span><span className="sr-only">(필수)</span></>}
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
        className={`w-full px-4 py-3.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition text-[#111827] placeholder:text-[#94A3B8] ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
            : 'border-[#CBD5E1] focus:border-[#94A3B8] focus:ring-slate-50'
        }`}
      />
      {error && <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  )
}

function SelectField({ label, name, value, onChange, error, required, inputRef, options }) {
  const fieldId = `field-${name}`
  const errorId = `field-${name}-error`
  return (
    <div>
      <label htmlFor={fieldId} className="block text-[11px] font-bold text-[#334155] tracking-wide mb-1.5">
        {label}
        {required && <><span className="text-red-500 ml-0.5" aria-hidden="true">*</span><span className="sr-only">(필수)</span></>}
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
        className={`w-full px-4 py-3.5 text-sm border rounded-lg focus:outline-none focus:ring-2 transition bg-white ${
          value === '' ? 'text-[#94A3B8]' : 'text-[#111827]'
        } ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
            : 'border-[#CBD5E1] focus:border-[#94A3B8] focus:ring-slate-50'
        }`}
      >
        {options.map(({ value: v, label: l }) => (
          <option key={v} value={v} disabled={v === ''} className="text-[#111827]">{l}</option>
        ))}
      </select>
      {error && <p id={errorId} role="alert" className="mt-1.5 text-xs text-red-500">{error}</p>}
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
        <ProblemRole />
        <Services />
        <Fit />
        <TrackRecord />
        <Process />
        <FinalCTA />
        <Contact />
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
