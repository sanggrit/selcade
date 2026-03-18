/**
 * Selcade Co., Ltd. — 셀케이드 주식회사
 * React + Tailwind CSS single-page site
 *
 * Section order:
 *   Header → Hero → TrustBar → Services → TrackRecord →
 *   Process → FAQ → FinalCTA → Contact → Footer
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
   HELPER
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
          ? 'bg-white/96 backdrop-blur-sm border-b border-slate-100'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-[68px]">

        <a
          href="#hero"
          onClick={(e) => { e.preventDefault(); smoothScroll('#hero') }}
          className="flex flex-col gap-[3px] select-none"
          aria-label="셀케이드 주식회사 홈으로"
        >
          <span className={`text-[13px] font-black tracking-[0.2em] uppercase transition-colors duration-300 ${scrolled ? 'text-[#0F172A]' : 'text-white'}`}>
            SELCADE
          </span>
          <span className={`text-[9px] tracking-[0.18em] font-medium transition-colors duration-300 ${scrolled ? 'text-slate-400' : 'text-white/50'}`}>
            셀케이드 주식회사
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-9" aria-label="주요 메뉴">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              className={`text-[13px] font-medium transition-colors duration-200 ${
                scrolled
                  ? 'text-slate-600 hover:text-[#0F172A]'
                  : 'text-white/75 hover:text-white'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
          className={`hidden lg:block px-5 py-2 text-[13px] font-semibold rounded transition-colors duration-200 ${
            scrolled
              ? 'bg-[#0F172A] text-white hover:bg-slate-800'
              : 'bg-white text-[#0F172A] hover:bg-slate-100'
          }`}
        >
          상담 문의
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="모바일 메뉴 열기"
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px]"
        >
          <span className={`block w-5 h-px transition-all duration-300 origin-center ${scrolled ? 'bg-slate-800' : 'bg-white'} ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
          <span className={`block w-5 h-px transition-all duration-300 ${scrolled ? 'bg-slate-800' : 'bg-white'} ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
          <span className={`block w-5 h-px transition-all duration-300 origin-center ${scrolled ? 'bg-slate-800' : 'bg-white'} ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
        </button>
      </div>

      <div className={`lg:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-slate-100 px-6 py-4 flex flex-col">
          {navLinks.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNav(href) }}
              className="text-slate-700 text-sm font-medium py-3.5 border-b border-slate-50 last:border-0"
            >
              {label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); handleNav('#contact') }}
            className="mt-4 block text-center px-5 py-3 text-sm font-semibold rounded bg-[#0F172A] text-white"
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
      className="relative min-h-screen flex items-center bg-[#0F172A] overflow-hidden"
    >
      {/* Single subtle ambient glow — keeps it from feeling flat */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-blue-900/25 blur-3xl -translate-y-1/3 translate-x-1/3 pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 pt-32 pb-24 lg:pt-44 lg:pb-32">

        <p className="text-blue-400 text-[11px] font-semibold tracking-[0.28em] uppercase mb-8">
          SELCADE Co., Ltd.
        </p>

        <h1 className="text-[2.75rem] lg:text-[5rem] font-black text-white leading-[1.08] tracking-tight mb-8 max-w-4xl">
          제조사의 제품을<br />
          해외 판매로 연결합니다
        </h1>

        <p className="text-slate-400 text-base lg:text-lg leading-[1.85] mb-12 max-w-lg">
          아마존 판매 전략, 콘텐츠 기획, 운영, 교육까지 —<br />
          2016년부터 쌓아온 실행 경험을 바탕으로 함께합니다.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => smoothScroll('#contact')}
            className="px-7 py-3.5 text-sm font-semibold bg-white text-[#0F172A] rounded hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200"
          >
            제조사 상담 문의하기
          </button>
          <button
            onClick={() => smoothScroll('#services')}
            className="px-7 py-3.5 text-sm font-semibold text-white border border-white/35 rounded hover:border-white/70 hover:bg-white/8 transition-all duration-200"
          >
            서비스 보기
          </button>
        </div>

      </div>

      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
        aria-hidden="true"
      >
        <div className="w-px h-10 bg-white animate-pulse" />
        <span className="text-white text-[9px] tracking-[0.3em] uppercase">Scroll</span>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRUST BAR
   4 key credentials, white background, thin dividers.
   ───────────────────────────────────────────────────────────── */
function TrustBar() {
  const stats = [
    { value: '2016',    label: '아마존 글로벌 셀링 시작' },
    { value: 'Amazon',  label: '카테고리 베스트셀러 1위' },
    { value: '9+',      label: '강의·컨설팅 수행 기관' },
    { value: '실행',     label: '운영·콘텐츠·교육 연결' },
  ]
  return (
    <div className="bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-slate-100">
          {stats.map(({ value, label }) => (
            <div key={label} className="py-8 px-6 lg:px-10 text-center">
              <div className="text-xl lg:text-2xl font-black text-[#0F172A] mb-1 tracking-tight">{value}</div>
              <div className="text-[11px] lg:text-xs text-slate-500 tracking-wide">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   SERVICES
   4 cards in a 2×2 grid. Blue top-rule accent, no decorative numbers.
   Gap-px trick creates clean 1px grid lines between cells.
   ───────────────────────────────────────────────────────────── */
function Services() {
  const services = [
    {
      title: '시장성 분석 및 진출 전략',
      desc:  '어떤 제품이 어떤 시장에서 가능성이 있는지 검토하고 진출 방향과 채널 우선순위를 정리합니다.',
    },
    {
      title: '상세페이지 및 콘텐츠 기획',
      desc:  '해외 고객이 제품의 가치를 명확히 이해할 수 있도록 페이지 구조, 이미지 방향, 메시지를 설계합니다.',
    },
    {
      title: '아마존 운영 구조 구축',
      desc:  '입점 이후 판매가 지속될 수 있도록 운영 흐름, 채널 구조, 실행 방식을 함께 점검합니다.',
    },
    {
      title: '실무 교육 및 강의',
      desc:  '대표와 담당자가 해외 판매를 직접 이해하고 실행할 수 있도록 현장 기반의 교육을 제공합니다.',
    },
  ]

  return (
    <section id="services" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16 lg:mb-20 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <SectionLabel text="Services" />
            <h2 className="mt-4 text-[1.9rem] lg:text-[2.75rem] font-black text-[#0F172A] leading-tight">
              해외 판매를 위한 핵심 서비스
            </h2>
          </div>
          <button
            onClick={() => smoothScroll('#contact')}
            className="self-start lg:self-auto text-sm font-semibold text-[#2563EB] hover:underline underline-offset-4 transition-all flex items-center gap-1.5 group"
          >
            상담 문의하기
            <span className="group-hover:translate-x-1 transition-transform duration-200 inline-block">→</span>
          </button>
        </div>

        {/* gap-px on a slate bg creates 1px grid lines between cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100">
          {services.map(({ title, desc }) => (
            <article
              key={title}
              className="bg-white p-10 lg:p-12 hover:bg-slate-50 transition-colors duration-200 group"
            >
              <div className="w-7 h-[2px] bg-[#2563EB] mb-7" />
              <h3 className="text-[15px] lg:text-base font-bold text-[#0F172A] mb-3 leading-snug">
                {title}
              </h3>
              <p className="text-[#475569] text-sm leading-[1.85]">{desc}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   TRACK RECORD
   4 summary badges + clean timeline list.
   ───────────────────────────────────────────────────────────── */
function TrackRecord() {
  const badges = [
    { label: 'Since 2016',      sub: '글로벌 이커머스 실무' },
    { label: 'Amazon #1',       sub: '제조사 자사제품 운영 성과' },
    { label: 'B2B Experience',  sub: '대학·기관·무역 유관기관' },
    { label: 'Execution-Based', sub: '운영·콘텐츠·마케팅·교육' },
  ]

  const history = [
    { year: '2016',   text: '아마존 글로벌 셀링 시작' },
    { year: '2019',   text: '동국대 · 신라대 · 충북대 · 숭실대 GTEP 전자상거래 강의 및 멘토링' },
    { year: '2019',   text: 'KITA 글로벌 이커머스 스쿨 강의 및 멘토링' },
    { year: '2019',   text: '경북 청년무역사관학교 아마존 강의' },
    { year: '2019',   text: '부산무역협회 · 충북무역협회 글로벌 셀링 강의 및 컨설팅' },
    { year: '2019 ~', text: '아마존 브랜드 운영대행 수행' },
    { year: '2021 ~', text: 'aT센터 아마존 글로벌 셀링 강의 수행' },
    { year: '2023 ~', text: '식음료 브랜드 운영 총괄' },
    { year: '2024 ~', text: '네이버 · 쿠팡 · 자사몰 운영대행 수행' },
    { year: '2024',   text: '국내외 판매 경험이 없던 제조사 자사제품 아마존 카테고리 베스트셀러 1위 달성', highlight: true },
  ]

  return (
    <section id="track-record" className="py-28 lg:py-36 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Track Record" />
          <h2 className="mt-4 text-[1.9rem] lg:text-[2.75rem] font-black text-[#0F172A] leading-tight">
            신뢰는 수행 이력에서 만들어집니다
          </h2>
        </div>

        {/* Summary badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-14">
          {badges.map(({ label, sub }) => (
            <div key={label} className="bg-white border border-slate-200 rounded-lg p-5 lg:p-6">
              <div className="text-[13px] font-bold text-[#0F172A] mb-1">{label}</div>
              <div className="text-[11px] text-slate-500 leading-snug">{sub}</div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="divide-y divide-slate-200">
          {history.map(({ year, text, highlight }) => (
            <div
              key={text}
              className={`flex gap-8 py-4 lg:py-5 ${highlight ? 'bg-blue-50 -mx-4 px-4 rounded' : ''}`}
            >
              <div className={`flex-shrink-0 text-[11px] font-semibold w-14 pt-0.5 tracking-wide ${highlight ? 'text-[#2563EB]' : 'text-slate-400'}`}>
                {year}
              </div>
              <div className={`text-sm leading-relaxed ${highlight ? 'text-[#0F172A] font-semibold' : 'text-[#475569]'}`}>
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
   4 steps, clean numbered layout.
   ───────────────────────────────────────────────────────────── */
function Process() {
  const steps = [
    { num: '01', title: '상담', desc: '현재 제품, 목표 시장, 고민 지점을 확인합니다.' },
    { num: '02', title: '진단', desc: '시장성과 판매 구조를 실무 기준으로 검토합니다.' },
    { num: '03', title: '제안', desc: '필요한 범위에 맞춰 운영, 콘텐츠, 교육 방향을 제안합니다.' },
    { num: '04', title: '실행', desc: '우선순위에 맞춰 단계적으로 진행합니다.' },
  ]

  return (
    <section id="process" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-16 lg:mb-20">
          <SectionLabel text="Process" />
          <h2 className="mt-4 text-[1.9rem] lg:text-[2.75rem] font-black text-[#0F172A] leading-tight">
            복잡하게 시작할 필요는 없습니다
          </h2>
          <p className="mt-3 text-[#475569] text-[15px] max-w-lg leading-relaxed">
            처음부터 큰 범위로 시작하지 않아도 됩니다.
            현재 상황에 맞는 현실적인 출발점을 함께 정리합니다.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="bg-white p-8 lg:p-10">
              <div className="text-[11px] font-bold text-slate-400 tracking-[0.2em] mb-6">{num}</div>
              <div className="text-base font-black text-[#0F172A] mb-3">{title}</div>
              <p className="text-[#475569] text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────────────────────
   FAQ
   Native <details>/<summary> — zero JS state.
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
      a: '가능합니다. 전체 운영이 아니더라도 필요한 영역 중심으로 진행할 수 있습니다.',
    },
    {
      q: '교육만 별도로 요청할 수 있나요?',
      a: '가능합니다. 기업, 기관, 실무 담당자 대상 강의와 교육도 별도로 진행합니다.',
    },
  ]

  return (
    <section id="faq" className="py-28 lg:py-36 bg-[#F8FAFC]">
      <div className="max-w-3xl mx-auto px-6 lg:px-12">

        <div className="mb-12">
          <SectionLabel text="FAQ" />
          <h2 className="mt-4 text-[1.9rem] lg:text-[2.75rem] font-black text-[#0F172A] leading-tight">
            자주 묻는 질문
          </h2>
        </div>

        <div className="divide-y divide-slate-200 border-y border-slate-200">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group">
              <summary className="flex items-center justify-between py-5 cursor-pointer list-none select-none gap-6">
                <span className="text-[15px] font-semibold text-[#0F172A] leading-snug">{q}</span>
                <span
                  className="flex-shrink-0 text-slate-400 text-lg font-light group-open:rotate-45 transition-transform duration-200 leading-none"
                  aria-hidden="true"
                >
                  +
                </span>
              </summary>
              <div className="pb-5">
                <p className="text-[#475569] text-sm leading-relaxed">{a}</p>
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
    <section className="py-24 lg:py-32 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="max-w-2xl">
          <p className="text-blue-400 text-[11px] font-semibold tracking-[0.28em] uppercase mb-6">
            Get in Touch
          </p>
          <h2 className="text-[1.9rem] lg:text-[2.75rem] font-black text-white leading-tight mb-6">
            해외 판매를 검토 중이라면,<br />
            실행 가능한 방향부터<br />
            점검해보시기 바랍니다
          </h2>
          <p className="text-slate-400 text-[15px] leading-relaxed mb-10 max-w-md">
            제품의 시장성, 아마존 진출 방향, 콘텐츠 구성, 운영 구조까지
            제조사 상황에 맞는 현실적인 방향을 함께 정리해드립니다.
          </p>
          <button
            onClick={() => smoothScroll('#contact')}
            className="px-8 py-4 text-sm font-semibold bg-white text-[#0F172A] rounded hover:bg-slate-100 active:bg-slate-200 transition-colors duration-200"
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

  const fieldRefs  = useRef({})
  const setFieldRef = (name) => (el) => { fieldRefs.current[name] = el }
  const abortRef   = useRef(null)
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
          _subject:        `[셀케이드 제조사 문의] ${form.org.trim()}`,
          _gotcha:         '',
          회사명:           form.org.trim(),
          담당자명:         form.name.trim(),
          연락처:           form.phone.trim(),
          이메일:           form.email.trim(),
          문의종류:         form.inquiryType,
          제품명_카테고리:   form.product.trim(),
          진출희망국가:      form.country.trim(),
          문의내용:         form.message.trim(),
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
    <section id="contact" className="py-28 lg:py-36 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-14 lg:mb-16">
          <SectionLabel text="Contact" />
          <h2 className="mt-4 text-[1.9rem] lg:text-[2.75rem] font-black text-[#0F172A] leading-tight">
            제조사 맞춤 상담 문의
          </h2>
          <p className="mt-3 text-[#475569] text-[15px] max-w-lg leading-relaxed">
            현재 제품과 목표 시장을 남겨주시면
            상황에 맞는 현실적인 방향으로 검토해드립니다.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">

          {/* Left: contact info */}
          <div className="lg:col-span-2 flex flex-col gap-10">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase mb-5">
                연락처
              </p>
              <div className="space-y-4">
                <ContactItem label="이메일" value="shawn@selcade.com" href="mailto:shawn@selcade.com" />
                <ContactItem label="전화"   value="070-4170-0801"     href="tel:070-4170-0801" />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 tracking-[0.2em] uppercase mb-5">
                문의 분야
              </p>
              <ul className="space-y-2.5">
                {[
                  '아마존 운영대행',
                  '해외 판매 콘텐츠 기획',
                  '글로벌 이커머스 컨설팅',
                  '브랜드 · 채널 운영대행',
                  '기업 · 기관 실무 교육',
                  '기타 협업 문의',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-[#475569]">
                    <span className="w-px h-3 bg-slate-300 flex-shrink-0" aria-hidden="true" />
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
                className="border border-slate-200 rounded-xl p-14 text-center flex flex-col items-center gap-4"
              >
                <div
                  aria-hidden="true"
                  className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center"
                >
                  <div className="w-2 h-4 border-r-2 border-b-2 border-[#2563EB] rotate-45 -mt-0.5" />
                </div>
                <h3 className="text-base font-bold text-[#0F172A]">문의가 접수되었습니다</h3>
                <p className="text-[#475569] text-sm leading-relaxed">
                  소중한 문의 감사합니다. 빠른 시간 내에 답변드리겠습니다.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-2 text-xs text-[#2563EB] hover:underline underline-offset-2"
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
                  <label htmlFor="field-message" className="block text-[11px] font-semibold text-[#475569] tracking-wide mb-1.5">
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
                    className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition text-[#0F172A] placeholder:text-slate-300 resize-none ${
                      errors.message
                        ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
                        : 'border-slate-200 focus:border-slate-400 focus:ring-slate-100'
                    }`}
                  />
                  {errors.message && (
                    <p id="field-message-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Server error */}
                <div role="alert" aria-live="assertive" aria-atomic="true" className="empty:hidden">
                  {status === 'error' && serverError && (
                    <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-lg px-4 py-3">
                      <span aria-hidden="true" className="text-red-400 font-bold text-sm mt-px">!</span>
                      <p className="text-xs text-red-600 leading-relaxed">{serverError}</p>
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-disabled={isSubmitting}
                  className="w-full py-4 text-sm font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-[#0F172A] text-white hover:bg-slate-800 active:bg-slate-700"
                >
                  {isSubmitting ? '전송 중...' : '제조사 상담 문의하기'}
                </button>

                <p className="text-[11px] text-slate-400 text-center">
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
    <footer className="bg-[#0F172A] py-12 lg:py-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="flex flex-col gap-2.5">
            <div className="text-white font-black text-[13px] tracking-[0.2em] uppercase mb-1">
              SELCADE
            </div>
            <div className="text-slate-500 text-xs leading-relaxed">
              셀케이드 주식회사 &nbsp;·&nbsp; 사업자등록번호: 427-86-03147 &nbsp;·&nbsp; 대표: 김상걸
            </div>
            <div className="text-slate-500 text-xs leading-relaxed">
              인천광역시 연수구 센트럴로 313, B611
              &nbsp;·&nbsp; 070-4170-0801
              &nbsp;·&nbsp; shawn@selcade.com
            </div>
          </div>
          <div className="text-slate-600 text-[11px]">
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

/** Thin rule + small-caps label above section headings. */
function SectionLabel({ text }) {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="w-5 h-px bg-[#2563EB]" aria-hidden="true" />
      <span className="text-[11px] font-semibold text-[#2563EB] tracking-[0.22em] uppercase">
        {text}
      </span>
    </div>
  )
}

function ContactItem({ label, value, href }) {
  return (
    <div>
      <div className="text-[10px] text-slate-400 mb-0.5 tracking-wide">{label}</div>
      <a
        href={href}
        className="text-sm font-medium text-[#0F172A] hover:text-[#2563EB] transition-colors duration-200"
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
      <label htmlFor={fieldId} className="block text-[11px] font-semibold text-[#475569] tracking-wide mb-1.5">
        {label}
        {required && <><span className="text-red-400 ml-0.5" aria-hidden="true">*</span><span className="sr-only">(필수)</span></>}
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
        className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition text-[#0F172A] placeholder:text-slate-300 ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
            : 'border-slate-200 focus:border-slate-400 focus:ring-slate-100'
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
      <label htmlFor={fieldId} className="block text-[11px] font-semibold text-[#475569] tracking-wide mb-1.5">
        {label}
        {required && <><span className="text-red-400 ml-0.5" aria-hidden="true">*</span><span className="sr-only">(필수)</span></>}
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
        className={`w-full px-4 py-3 text-sm border rounded-lg focus:outline-none focus:ring-2 transition bg-white ${
          value === '' ? 'text-slate-400' : 'text-[#0F172A]'
        } ${
          error
            ? 'border-red-300 focus:border-red-400 focus:ring-red-50'
            : 'border-slate-200 focus:border-slate-400 focus:ring-slate-100'
        }`}
      >
        {options.map(({ value: v, label: l }) => (
          <option key={v} value={v} disabled={v === ''} className="text-[#0F172A]">{l}</option>
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
        <Services />
        <TrackRecord />
        <Process />
        <FAQ />
        <FinalCTA />
        <Contact />
        <Footer />
      </div>
    </ErrorBoundary>
  )
}
