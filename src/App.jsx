/**
 * Selcade Co., Ltd. — 셀케이드 주식회사
 * Single-page landing site: React + Tailwind CSS
 *
 * Section order:
 *   Header → Hero → Why Selcade → About → Business →
 *   Experience/Proof → Strengths → Mid CTA → Contact → Footer
 *
 * To edit visible copy, search for the Korean text you want to change
 * and replace it in place. A full text-replacement guide is at the bottom of this file.
 */

import { useState, useEffect } from 'react'

/* ─────────────────────────────────────────────────────────────
   HELPER: smooth-scroll to a section by id
   ───────────────────────────────────────────────────────────── */
function scrollTo(id) {
  document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
}

/* ─────────────────────────────────────────────────────────────
   HEADER
   Sticky, transparent on hero / opaque white when scrolled.
   Mobile hamburger with animated bars.
   ───────────────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Edit nav link labels here ──
  const navLinks = [
    { label: '셀케이드 소개', href: '#about' },
    { label: '사업영역',     href: '#business' },
    { label: '운영 경험',   href: '#experience' },
    { label: '강점',        href: '#strengths' },
    { label: '문의하기',    href: '#contact' },
  ]

  const handleNav = (href) => {
    setMenuOpen(false)
    scrollTo(href)
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

        {/* ── Logo wordmark ── */}
        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); scrollTo('#hero') }}
          className="flex flex-col gap-0.5 select-none"
          aria-label="셀케이드 주식회사 홈으로"
        >
          {/* SELCADE — edit font weight / tracking below */}
          <span
            className={`text-base font-black tracking-logo transition-colors duration-300 ${
              scrolled ? 'text-slate-900' : 'text-white'
            }`}
          >
            SELCADE
          </span>
          {/* Korean sub-name — edit "셀케이드 주식회사" to change */}
          <span
            className={`text-[10px] tracking-widest font-medium transition-colors duration-300 ${
              scrolled ? 'text-slate-400' : 'text-white/55'
            }`}
          >
            셀케이드 주식회사
          </span>
        </a>

        {/* ── Desktop navigation ── */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="주요 메뉴">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              className={`text-sm font-medium transition-colors duration-200 hover:opacity-60 ${
                scrolled ? 'text-slate-600' : 'text-white/80'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* ── Desktop CTA button ── Edit "협업 문의" to change */}
        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
          className="hidden lg:block px-5 py-2 text-sm font-semibold rounded bg-blue-700 text-white hover:bg-blue-800 transition-colors duration-200"
        >
          협업 문의
        </a>

        {/* ── Mobile hamburger button ── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="모바일 메뉴 열기"
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        >
          {/* Bar 1 */}
          <span
            className={`block w-5 h-0.5 transition-all duration-300 origin-center ${
              scrolled ? 'bg-slate-800' : 'bg-white'
            } ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}
          />
          {/* Bar 2 */}
          <span
            className={`block w-5 h-0.5 transition-all duration-300 ${
              scrolled ? 'bg-slate-800' : 'bg-white'
            } ${menuOpen ? 'opacity-0 scale-x-0' : ''}`}
          />
          {/* Bar 3 */}
          <span
            className={`block w-5 h-0.5 transition-all duration-300 origin-center ${
              scrolled ? 'bg-slate-800' : 'bg-white'
            } ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}
          />
        </button>
      </div>

      {/* ── Mobile slide-down menu ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
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
          {/* Mobile CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
            className="mt-4 block text-center px-5 py-3 text-sm font-semibold rounded bg-blue-700 text-white"
          >
            협업 문의
          </a>
        </div>
      </div>
    </header>
  )
}

/* ─────────────────────────────────────────────────────────────
   HERO SECTION
   Full-viewport, dark navy. Establishes identity immediately.
   ───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden"
    >
      {/* ── CSS-only background decoration (no images needed) ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />
        {/* Soft ambient glow — top right */}
        <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-blue-800/20 blur-3xl" />
        {/* Soft ambient glow — bottom left */}
        <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full bg-slate-700/40 blur-3xl" />
        {/* Thin vertical accent line */}
        <div className="absolute top-1/2 right-16 lg:right-24 w-px h-40 bg-white/8 -translate-y-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-36 pb-28 lg:pt-48 lg:pb-36">
        <div className="max-w-3xl">

          {/* ── Section eyebrow label ── */}
          <div className="inline-flex items-center gap-3 mb-8" aria-hidden="true">
            <div className="w-8 h-px bg-blue-500" />
            {/* Edit "SELCADE Co., Ltd." to change the eyebrow */}
            <span className="text-blue-400 text-xs font-semibold tracking-[0.2em] uppercase">
              SELCADE Co., Ltd.
            </span>
          </div>

          {/* ── Main headline — Edit the Korean headline here ── */}
          <h1 className="text-[2.6rem] lg:text-[3.8rem] font-black text-white leading-[1.15] tracking-tight mb-7">
            브랜드 운영부터<br />
            판매 실행까지,<br />
            <span className="text-blue-400">실무로 연결합니다</span>
          </h1>

          {/* ── Subheadline — Edit the supporting copy here ── */}
          <p className="text-base lg:text-lg text-slate-300 leading-[1.85] mb-10 max-w-lg">
            운영·디자인·물류·마케팅·유통·이커머스를<br className="hidden sm:block" />
            하나의 실행 흐름으로 연결하는 비즈니스 파트너.<br />
            이론이 아닌, 실제 운영 경험을 바탕으로 함께합니다.
          </p>

          {/* ── CTA buttons ── Edit button labels below ── */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Primary CTA */}
            <button
              onClick={() => scrollTo('#business')}
              className="px-7 py-3.5 text-sm font-semibold bg-blue-700 text-white rounded hover:bg-blue-800 active:bg-blue-900 transition-colors duration-200 text-center"
            >
              사업영역 보기
            </button>
            {/* Secondary CTA */}
            <button
              onClick={() => scrollTo('#contact')}
              className="px-7 py-3.5 text-sm font-semibold bg-transparent text-white border border-white/30 rounded hover:border-white/70 hover:bg-white/6 transition-all duration-200 text-center"
            >
              협업 문의
            </button>
          </div>
        </div>

        {/* ── Since 2016 badge ── */}
        <div className="mt-20 lg:mt-24 flex items-center gap-6">
          <div className="h-px flex-1 max-w-[80px] bg-slate-700" />
          <span className="text-slate-500 text-xs tracking-widest uppercase">
            Amazon Selling Since 2016
          </span>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
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
   WHY SELCADE
   Four differentiators that reduce first-visit doubt.
   ───────────────────────────────────────────────────────────── */
function WhySelcade() {

  // ── Edit each card: num, title, desc ──
  const items = [
    {
      num: '01',
      title: '단순 컨설팅이 아닙니다',
      desc:
        '전략 제안에서 끝나는 컨설팅이 아닙니다. 셀케이드는 실제 브랜드를 기획하고, 상품을 팔고, 채널을 운영하며 쌓은 실무 경험으로 함께합니다.',
    },
    {
      num: '02',
      title: '아마존에만 국한되지 않습니다',
      desc:
        '2016년부터 쌓아온 아마존 판매 경험을 기반으로, 국내외 유통, 식음료 사업 운영, 브랜드 기획까지 비즈니스 전반을 이해합니다.',
    },
    {
      num: '03',
      title: '분절된 서비스가 아닙니다',
      desc:
        '운영·디자인·물류·마케팅을 개별 기능으로 제공하는 것이 아니라, 실제 판매 흐름 안에서 유기적으로 연결하여 실행합니다.',
    },
    {
      num: '04',
      title: '경험에서 나오는 교육입니다',
      desc:
        '강의와 교육 또한 현장 운영 경험에서 출발합니다. 이론 중심의 아카데미가 아닌, 실무에서 검증된 내용으로 기업과 기관을 교육합니다.',
    },
  ]

  return (
    <section id="why" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Why Selcade" />
          {/* ── Edit section title here ── */}
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            셀케이드가 다른 이유
          </h2>
          {/* ── Edit section sub-copy here ── */}
          <p className="mt-3 text-slate-500 text-base lg:text-[17px] leading-relaxed max-w-xl">
            셀케이드는 단순한 대행사나 컨설팅 업체와 다릅니다.<br />
            실제 사업을 운영하고, 판매하고, 실행해온 경험이 기반입니다.
          </p>
        </div>

        {/* 2 × 2 card grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {items.map(({ num, title, desc }) => (
            <article
              key={num}
              className="bg-white rounded-xl p-8 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200"
            >
              {/* Large number badge */}
              <div className="text-blue-100 font-black text-5xl leading-none mb-5 select-none">
                {num}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-3">{title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>

        {/* Inline CTA after this section */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group"
          >
            {/* Edit link text here */}
            셀케이드와 협업 논의하기
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   ABOUT
   Left: company narrative. Right: 4 key highlights.
   ───────────────────────────────────────────────────────────── */
function About() {

  // ── Edit the 4 highlight cards on the right ──
  const highlights = [
    {
      label: '아마존 판매 운영 시작',
      value: '2016년~',
      desc: '글로벌 이커머스 현장 운영 경험',
    },
    {
      label: '식음료 비즈니스 운영',
      value: 'Atrax F&B',
      desc: '제품 기획·유통·판매 전반 경험',
    },
    {
      label: '자사 브랜드 기획·운영',
      value: 'Pooretty',
      desc: '브랜드 아이덴티티·채널 판매 실행',
    },
    {
      label: '아마존 카테고리',
      value: '베스트셀러 1위',
      desc: 'DOWMI 브랜드 (동현정밀) 운영 성과',
    },
  ]

  return (
    <section id="about" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left: narrative text ── */}
          <div>
            <SectionLabel text="About" />
            {/* ── Edit company name heading ── */}
            <h2 className="mt-4 text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-7">
              셀케이드 주식회사
            </h2>
            {/* ── Edit body paragraphs below ── */}
            <div className="space-y-5 text-slate-600 text-[15px] leading-[1.9]">
              <p>
                셀케이드는 브랜드 운영, 상품 판매, 유통 관리, 마케팅 실행, 이커머스 채널 운영을
                직접 수행해온 실행 중심의 비즈니스 회사입니다.
              </p>
              <p>
                2016년부터 아마존 판매를 시작으로 글로벌 이커머스 현장 경험을 쌓아왔습니다.
                식음료 비즈니스(Atrax F&B) 운영, 자사 브랜드(Pooretty) 기획 및 판매,
                동현정밀의 DOWMI 브랜드 운영을 통한 아마존 카테고리 베스트셀러 1위 달성 등
                다양한 분야에서 실제 시장 성과를 만들어왔습니다.
              </p>
              <p>
                셀케이드는 운영·디자인·물류·마케팅·유통·판매를 분절된 기능이 아닌
                하나의 실행 흐름으로 이해합니다. 이 경험을 바탕으로 기업 및 기관을 위한
                실무 강의와 교육도 함께 제공합니다.
              </p>
            </div>
          </div>

          {/* ── Right: 4 highlight cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map(({ label, value, desc }) => (
              <div
                key={label}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100"
              >
                <div className="text-xs text-slate-400 font-medium mb-1.5 tracking-wide">
                  {label}
                </div>
                <div className="text-xl font-black text-slate-900 mb-1 leading-tight">
                  {value}
                </div>
                <div className="text-xs text-slate-500 leading-snug">{desc}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   BUSINESS AREAS
   8 cards in a responsive 4-column grid (desktop).
   ───────────────────────────────────────────────────────────── */
function Business() {

  // ── Edit each business area card ──
  const areas = [
    {
      num: '01',
      title: '글로벌 이커머스 운영',
      desc: '아마존을 비롯한 글로벌 이커머스 채널의 판매 운영 및 계정 관리를 지원합니다.',
    },
    {
      num: '02',
      title: 'Amazon 판매 운영 지원',
      desc: '2016년부터 쌓아온 아마존 실전 경험을 바탕으로 판매 전략, 운영, 최적화를 지원합니다.',
    },
    {
      num: '03',
      title: '국내외 유통 및 수출 실무',
      desc: '국내외 유통 채널 발굴, 수출 실무 지원, 물류 연계까지 유통 흐름을 함께 구성합니다.',
    },
    {
      num: '04',
      title: '브랜드 운영 및 마케팅 실행',
      desc: '브랜드 전략 수립부터 실제 마케팅 실행, 채널 관리까지 운영 전반을 지원합니다.',
    },
    {
      num: '05',
      title: '식음료 비즈니스 운영',
      desc: '식음료 제품의 기획, 유통, 판매 및 사업 운영 전반에 걸친 실질적인 경험을 보유합니다.',
    },
    {
      num: '06',
      title: '자사 브랜드 기획 및 판매',
      desc: '자사 브랜드를 직접 기획하고 운영하며 쌓은 경험으로 브랜드 판매 실행을 지원합니다.',
    },
    {
      num: '07',
      title: '운영·디자인·물류·마케팅 연계',
      desc: '각 기능을 개별적으로 제공하는 것이 아니라, 실제 판매 흐름 안에서 유기적으로 연결합니다.',
    },
    {
      num: '08',
      title: '기업·기관 강의 및 실무 교육',
      desc: '이커머스·글로벌 판매·브랜드 운영에 관한 현장 경험 기반의 기업 및 기관 실무 교육.',
    },
  ]

  return (
    <section id="business" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Business" />
          {/* ── Edit section title ── */}
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            사업영역
          </h2>
          {/* ── Edit section sub-copy ── */}
          <p className="mt-3 text-slate-500 text-base lg:text-[17px] leading-relaxed max-w-xl">
            셀케이드는 아마존에서 시작해 브랜드, 유통, 교육까지<br />
            다양한 분야에서 실무 경험을 보유하고 있습니다.
          </p>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {areas.map(({ num, title, desc }) => (
            <article
              key={num}
              className="bg-white rounded-xl p-6 border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
            >
              {/* Number badge */}
              <div className="text-blue-100 font-black text-3xl leading-none mb-4 select-none group-hover:text-blue-200 transition-colors duration-200">
                {num}
              </div>
              <h3 className="text-[14px] font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </article>
          ))}
        </div>

        {/* CTA after business section */}
        <div className="mt-14 flex justify-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="px-7 py-3.5 text-sm font-semibold bg-blue-700 text-white rounded hover:bg-blue-800 transition-colors duration-200"
          >
            {/* Edit CTA button label here */}
            사업 협업 문의하기
          </button>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   EXPERIENCE / PROOF
   Dark section — gives weight to operating credentials.
   DOWMI card is highlighted differently to draw calm attention.
   ───────────────────────────────────────────────────────────── */
function Experience() {

  // ── Edit each proof block ──
  const proofs = [
    {
      tag: '글로벌 이커머스',
      title: '아마존 · 글로벌 이커머스\n운영 경험',
      body:
        '2016년부터 현재까지 아마존을 비롯한 글로벌 이커머스 채널에서 직접 상품을 판매하고 계정을 운영해온 현장 중심의 실무 경험을 보유하고 있습니다. 단순한 이론이나 대행 업무가 아닌, 직접 운영자로서 쌓아온 경험입니다.',
      highlight: false,
    },
    {
      tag: 'F&B 운영',
      title: 'Atrax F&B\n식음료 비즈니스 운영',
      body:
        '식음료 브랜드 Atrax F&B를 직접 운영하며 제품 기획, 유통 채널 구성, 실제 판매 및 사업 운영 전반을 경험했습니다. 식음료 비즈니스의 실질적인 운영 구조와 흐름을 이해합니다.',
      highlight: false,
    },
    {
      tag: '브랜드 운영',
      title: 'Pooretty\n자사 브랜드 기획 및 운영',
      body:
        '자사 브랜드 Pooretty를 직접 기획하고 운영하면서 브랜드 아이덴티티 구성, 상품 판매, 마케팅 실행, 채널 관리까지 브랜드 운영의 전 과정을 직접 수행했습니다.',
      highlight: false,
    },
    {
      tag: '판매 성과',
      // ── Edit DOWMI proof text here — keep the tone calm and factual ──
      title: 'DOWMI\n아마존 카테고리 베스트셀러 1위',
      body:
        '동현정밀(Donghyun Precision)의 DOWMI 브랜드 운영을 통해 아마존 해당 카테고리에서 베스트셀러 1위를 달성했습니다. 이 결과는 실제 판매 운영 역량과 채널 이해를 바탕으로 이룬 현장 성과입니다.',
      highlight: true,   // ← set true to apply the blue-tinted highlight style
    },
  ]

  return (
    <section id="experience" className="py-24 lg:py-32 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Experience" dark />
          {/* ── Edit section title ── */}
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-white leading-tight">
            운영 경험 및 실적
          </h2>
          {/* ── Edit section sub-copy ── */}
          <p className="mt-3 text-slate-400 text-base lg:text-[17px] leading-relaxed max-w-xl">
            셀케이드의 역량은 실제 사업 운영을 통해 쌓인 것입니다.<br />
            직접 운영하고, 판매하고, 실행해온 현장 경험입니다.
          </p>
        </div>

        {/* 2 × 2 proof cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {proofs.map(({ tag, title, body, highlight }) => (
            <article
              key={tag}
              className={`rounded-xl p-8 border transition-all duration-200 ${
                highlight
                  ? 'bg-blue-900/35 border-blue-700/45 hover:border-blue-600/60'
                  : 'bg-slate-800/55 border-slate-700/50 hover:border-slate-600/60'
              }`}
            >
              {/* Tag badge */}
              <div
                className={`inline-block text-xs font-semibold px-2.5 py-1 rounded mb-5 ${
                  highlight
                    ? 'bg-blue-500/20 text-blue-300'
                    : 'bg-slate-700/60 text-slate-400'
                }`}
              >
                {tag}
              </div>
              <h3 className="text-base font-bold text-white leading-snug mb-4 whitespace-pre-line">
                {title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">{body}</p>
            </article>
          ))}
        </div>

        {/* Inline CTA after proof section */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors group"
          >
            {/* Edit text here */}
            운영 파트너십 문의하기
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </button>
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   STRENGTHS
   4 grounded strength statements with number circles.
   ───────────────────────────────────────────────────────────── */
function Strengths() {

  // ── Edit each strength ──
  const strengths = [
    {
      num: '01',
      title: '운영 경험 기반의 실무적 접근',
      desc:
        '전략이나 이론이 아닌, 직접 운영하고 판매하며 쌓은 경험을 바탕으로 파트너와 함께합니다. 실행 가능한 방향을 제시합니다.',
    },
    {
      num: '02',
      title: '판매와 유통을 함께 보는 시각',
      desc:
        '브랜드와 채널, 상품과 유통을 동시에 이해하는 실행 역량을 보유합니다. 시장에서 실질적인 성과를 만들어갑니다.',
    },
    {
      num: '03',
      title: '운영·디자인·물류·마케팅의 연결 이해',
      desc:
        '각 기능을 분리하지 않고, 실제 판매 흐름 안에서 유기적으로 연결하는 구조적 시각을 갖고 있습니다.',
    },
    {
      num: '04',
      title: '현장에서 검증된 교육 역량',
      desc:
        '직접 운영하고 판매한 경험을 기반으로 기업 및 기관에 실무 중심의 강의와 교육을 제공합니다.',
    },
  ]

  return (
    <section id="strengths" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Strengths" />
          {/* ── Edit section title ── */}
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            셀케이드의 강점
          </h2>
          {/* ── Edit section sub-copy ── */}
          <p className="mt-3 text-slate-500 text-base lg:text-[17px] leading-relaxed max-w-xl">
            축적된 현장 경험에서 비롯된 실질적인 역량입니다.
          </p>
        </div>

        {/* 2 × 2 strength grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12">
          {strengths.map(({ num, title, desc }) => (
            <div key={num} className="flex gap-5">
              {/* Number circle */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mt-0.5">
                <span className="text-blue-700 text-[11px] font-black">{num}</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 mb-2 leading-snug">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   MID-PAGE CTA
   Strong but professional invitation before the contact section.
   ───────────────────────────────────────────────────────────── */
function MidCTA() {
  return (
    <section className="py-20 lg:py-24 bg-blue-700">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
        {/* ── Edit headline ── */}
        <h2 className="text-2xl lg:text-3xl font-black text-white mb-4 leading-tight">
          셀케이드와 함께 이야기해 보세요
        </h2>
        {/* ── Edit sub-copy ── */}
        <p className="text-blue-100 text-base lg:text-lg max-w-lg mx-auto mb-8 leading-[1.85]">
          브랜드 운영, 글로벌 판매, 유통 실행, 또는 실무 교육까지<br />
          어떤 주제든 편하게 문의해 주세요.
        </p>
        {/* ── Edit button label ── */}
        <button
          onClick={() => scrollTo('#contact')}
          className="inline-block px-8 py-3.5 text-sm font-semibold bg-white text-blue-700 rounded hover:bg-blue-50 active:bg-blue-100 transition-colors duration-200"
        >
          문의하기
        </button>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
   Left: contact info + inquiry types.
   Right: simple inquiry form (frontend only — wire up backend later).
   ───────────────────────────────────────────────────────────── */
// Formspree endpoint — replace the ID if the form is ever recreated
const FORMSPREE_URL = 'https://formspree.io/f/mnjglage'

function Contact() {
  const EMPTY = { org: '', name: '', email: '', subject: '', message: '' }
  const [form, setForm]         = useState(EMPTY)
  const [errors, setErrors]     = useState({})
  const [status, setStatus]     = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [serverError, setServerError] = useState('')

  // ── Field-level validation rules ──
  const validate = (fields) => {
    const e = {}
    if (!fields.org.trim())     e.org     = '소속을 입력해 주세요.'
    if (!fields.name.trim())    e.name    = '성함을 입력해 주세요.'
    if (!fields.email.trim()) {
      e.email = '이메일 주소를 입력해 주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      e.email = '올바른 이메일 주소 형식으로 입력해 주세요.'
    }
    if (!fields.subject.trim())  e.subject = '제목을 입력해 주세요.'
    if (!fields.message.trim())  e.message = '문의 내용을 입력해 주세요.'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    // Clear that field's error as the user corrects it
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('submitting')
    setServerError('')

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          소속:      form.org,
          성함:      form.name,
          이메일주소: form.email,
          제목:      form.subject,
          문의내용:   form.message,
        }),
      })

      if (res.ok) {
        setStatus('success')
        setForm(EMPTY)
        setErrors({})
      } else {
        // Formspree returns { errors: [...] } on 4xx
        const data = await res.json().catch(() => ({}))
        const msg = data?.errors?.map((err) => err.message).join(' ') || ''
        setServerError(msg || '알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.')
        setStatus('error')
      }
    } catch {
      setServerError('네트워크 오류가 발생했습니다. 인터넷 연결을 확인하고 다시 시도해 주세요.')
      setStatus('error')
    }
  }

  // ── Edit the inquiry category list ──
  const inquiryTypes = [
    '글로벌 이커머스 운영',
    'Amazon 판매 지원',
    '국내외 유통 및 수출',
    '브랜드 운영 및 마케팅',
    '실무 강의 및 기업 교육',
    '기타 협업 문의',
  ]

  const isSubmitting = status === 'submitting'

  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* Section header */}
        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Contact" />
          <h2 className="mt-4 text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
            문의하기
          </h2>
          <p className="mt-3 text-slate-500 text-base lg:text-[17px] leading-relaxed">
            협업, 컨설팅, 교육 등 다양한 형태의 문의를 환영합니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">

          {/* ── Left: contact info ── */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
                연락처
              </h3>
              <div className="space-y-4">
                {/* ── Edit email address here ── */}
                <ContactItem
                  label="이메일"
                  value="contact@selcade.com"
                  href="mailto:contact@selcade.com"
                  note="※ 실제 이메일 주소로 교체해 주세요"
                />
                {/* ── Edit phone number here ── */}
                <ContactItem
                  label="전화"
                  value="010-0000-0000"
                  href="tel:010-0000-0000"
                  note="※ 실제 전화번호로 교체해 주세요"
                />
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
                문의 분야
              </h3>
              <ul className="space-y-2">
                {inquiryTypes.map((item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    <span className="text-slate-500 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Right: form / success / error ── */}
          <div className="lg:col-span-3">

            {/* ── Success state ── */}
            {status === 'success' ? (
              <div className="bg-white rounded-xl p-12 border border-slate-100 text-center flex flex-col items-center gap-4">
                {/* Checkmark icon (CSS-only) */}
                <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                  <div className="w-2.5 h-5 border-r-2 border-b-2 border-blue-600 rotate-45 -mt-1" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">
                  문의가 접수되었습니다
                </h3>
                <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                  소중한 문의 감사합니다.<br />
                  빠른 시간 내에 답변드리겠습니다.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs text-blue-600 hover:text-blue-800 transition-colors underline underline-offset-2"
                >
                  새 문의 작성하기
                </button>
              </div>
            ) : (
              /* ── Form ── */
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-white rounded-xl p-8 lg:p-10 border border-slate-100 space-y-5"
              >
                {/* 소속 + 성함 row */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <FormField
                    label="소속"
                    name="org"
                    type="text"
                    placeholder="회사명 또는 기관명"
                    value={form.org}
                    onChange={handleChange}
                    error={errors.org}
                    required
                  />
                  <FormField
                    label="성함"
                    name="name"
                    type="text"
                    placeholder="홍길동"
                    value={form.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                </div>

                {/* 이메일주소 */}
                <FormField
                  label="이메일주소"
                  name="email"
                  type="email"
                  placeholder="example@company.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                  required
                />

                {/* 제목 */}
                <FormField
                  label="제목"
                  name="subject"
                  type="text"
                  placeholder="문의 제목을 입력해 주세요."
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                  required
                />

                {/* 문의 내용 */}
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                    문의 내용 <span className="text-red-400 ml-0.5">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="문의하실 내용을 자유롭게 작성해 주세요."
                    className={`w-full px-4 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 transition text-slate-800 placeholder:text-slate-300 resize-none ${
                      errors.message
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                        : 'border-slate-200 focus:border-blue-400 focus:ring-blue-50'
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Server-level error banner */}
                {status === 'error' && serverError && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                    <div className="w-4 h-4 flex-shrink-0 mt-0.5 rounded-full border border-red-400 flex items-center justify-center">
                      <span className="text-red-500 text-[10px] font-black leading-none">!</span>
                    </div>
                    <p className="text-xs text-red-600 leading-relaxed">{serverError}</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 text-sm font-semibold rounded transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900"
                >
                  {isSubmitting ? '전송 중...' : '문의 보내기'}
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
    <footer className="bg-slate-900 py-12 lg:py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

          {/* Left: company info */}
          <div className="flex flex-col gap-2">
            {/* ── Edit wordmark ── */}
            <div className="text-white font-black text-base tracking-logo mb-0.5">
              SELCADE
            </div>
            {/* ── Edit company name line ── */}
            <div className="text-slate-400 text-sm font-medium">
              셀케이드 주식회사 | SELCADE Co., Ltd.
            </div>
            {/* ── Edit company registration details below ── */}
            <div className="text-slate-600 text-xs leading-relaxed mt-1">
              사업자등록번호: 000-00-00000 &nbsp;·&nbsp; 대표: 홍길동
              <br />
              주소: [회사 주소 입력 예정] &nbsp;·&nbsp; 이메일: contact@selcade.com
            </div>
          </div>

          {/* Right: copyright */}
          {/* ── Copyright year is automatically updated via new Date() ── */}
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

/**
 * SectionLabel — the small uppercase label + bar shown above each section title.
 * @param {string} text  — English label text (e.g. "About", "Business")
 * @param {boolean} dark — use light colors for dark-background sections
 */
function SectionLabel({ text, dark = false }) {
  return (
    <div className="inline-flex items-center gap-3" aria-hidden="true">
      <div className={`w-6 h-px ${dark ? 'bg-blue-400' : 'bg-blue-600'}`} />
      <span
        className={`text-xs font-semibold tracking-[0.18em] uppercase ${
          dark ? 'text-blue-400' : 'text-blue-600'
        }`}
      >
        {text}
      </span>
    </div>
  )
}

/**
 * ContactItem — a single row of contact info.
 */
function ContactItem({ label, value, href, note }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 flex-shrink-0 mt-0.5 rounded bg-slate-200 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
      </div>
      <div>
        <div className="text-xs text-slate-400 mb-0.5">{label}</div>
        <a
          href={href}
          className="text-slate-700 text-sm font-medium hover:text-blue-700 transition-colors duration-200"
        >
          {value}
        </a>
        {note && <div className="text-[11px] text-slate-400 mt-0.5">{note}</div>}
      </div>
    </div>
  )
}

/**
 * FormField — reusable labeled text input with inline error display.
 */
function FormField({ label, name, type, placeholder, value, onChange, error, required }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
        {label}
        {required && <span className="text-red-400 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        aria-invalid={!!error}
        className={`w-full px-4 py-2.5 text-sm border rounded focus:outline-none focus:ring-2 transition text-slate-800 placeholder:text-slate-300 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
            : 'border-slate-200 focus:border-blue-400 focus:ring-blue-50'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   ROOT APP
   ───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <div className="font-sans antialiased">
      <Header />
      <Hero />
      <WhySelcade />
      <About />
      <Business />
      <Experience />
      <Strengths />
      <MidCTA />
      <Contact />
      <Footer />
    </div>
  )
}

/*
 ═══════════════════════════════════════════════════════════════
   TEXT REPLACEMENT GUIDE
   How to edit this file without breaking the design.
 ═══════════════════════════════════════════════════════════════

 ── COMPANY NAME ─────────────────────────────────────────────
   "SELCADE"          → change all instances to your English brand name
   "셀케이드 주식회사"  → change all instances to your Korean company name

 ── HEADER ───────────────────────────────────────────────────
   navLinks array     → edit label: '...' for each nav item
   "협업 문의"         → header and hero CTA button label

 ── HERO ─────────────────────────────────────────────────────
   <h1> text         → main headline (3 lines)
   <p> after h1      → sub-copy paragraph
   "사업영역 보기"    → first CTA button
   "협업 문의"        → second CTA button
   "Amazon Selling Since 2016"  → bottom badge text

 ── WHY SELCADE ──────────────────────────────────────────────
   items array        → edit num, title, desc for each of the 4 cards
   "셀케이드가 다른 이유"  → section heading

 ── ABOUT ────────────────────────────────────────────────────
   3 <p> blocks       → body paragraphs inside the left column
   highlights array   → edit label, value, desc for the 4 info cards

 ── BUSINESS ─────────────────────────────────────────────────
   areas array        → edit num, title, desc for each of the 8 cards

 ── EXPERIENCE ───────────────────────────────────────────────
   proofs array       → edit tag, title, body for each of the 4 proof cards
   highlight: true    → only the DOWMI card — keep it true

 ── STRENGTHS ────────────────────────────────────────────────
   strengths array    → edit num, title, desc for each of the 4 items

 ── MID CTA ──────────────────────────────────────────────────
   <h2> and <p>       → edit the headline and supporting copy
   "문의하기"          → CTA button label

 ── CONTACT ──────────────────────────────────────────────────
   "contact@selcade.com"  → replace with real email (2 places)
   "010-0000-0000"        → replace with real phone number (2 places)
   inquiryTypes array     → edit the list of inquiry categories
   note="※ ..."           → delete these placeholder notes when real info is in place
   Footer company details → line that starts with "사업자등록번호:"

 ── FOOTER ───────────────────────────────────────────────────
   "대표: 홍길동"     → replace with real representative name
   "[회사 주소 입력 예정]"  → replace with real address
   © line             → year auto-updates via new Date().getFullYear()

 ═══════════════════════════════════════════════════════════════
*/
