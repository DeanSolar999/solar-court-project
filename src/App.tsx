import { useEffect, useState } from 'react';
import {
  ArrowDown,
  ArrowRight,
  BadgeDollarSign,
  Building2,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Database,
  FileCheck2,
  Gift,
  Info,
  LockKeyhole,
  MessageCircle,
  Phone,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserCheck,
  WalletCards,
} from 'lucide-react';

import { RegistrationEntry } from '@/components/registration-form';
import { RegistrationLink } from '@/components/registration-link';
import { AuthorizationContactLinks } from '@/components/authorization-contact-links';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AUTHORIZED_VENUES, CONSENT_VERSION, CONTACTS, CROSS_VENUE_NOTICE_TEXT, FIRST_DRAW_QUALIFICATION_TEXT, PRIVACY_NOTICE_ITEMS, REVOCATION_NOTICE, VENUE_NOTICE_TEXT } from '@/lib/consent';
import { FIRST_DRAW_DATE_TEXT, FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT, getRegistrationState, REGISTRATION_DEADLINE_TEXT } from '@/lib/registration-config';

const prizes = [
  {
    count: '03', name: '高級球袋', note: '三名', tone: 'lime',
    image: 'prizes/bag-illustration-v1.webp', alt: '高級球袋的 AI 生成示意圖，非實際獎品',
  },
  {
    count: '06', name: '運動毛巾', note: '六名', tone: 'paper',
    image: 'prizes/towel-illustration-v1.webp', alt: '運動毛巾的 AI 生成示意圖，非實際獎品',
  },
  {
    count: '10', name: '運動襪', note: '十名', tone: 'paper',
    image: 'prizes/socks-illustration-v1.webp', alt: '運動襪的 AI 生成示意圖，非實際獎品',
  },
  {
    count: '10', name: '曜日球衣', note: '十名', tone: 'paper',
    image: 'prizes/jersey-illustration-v1.webp', alt: '曜日球衣的 AI 生成示意圖，非實際獎品',
  },
];

// Do not present a prior-year operator or system as a verified 2027 appointment.
const centerVenues = AUTHORIZED_VENUES.slice(0, 7).map((name) => ({
  name,
  operator: name === '臺北市民生社區中心' ? '受理單位：依該中心官方公告' : '2027 年營運單位：以官方公告為準',
  system: '申請流程：依中心公告及受理單位規則',
}));

const schoolVenues = AUTHORIZED_VENUES.slice(7).map((name) => ({
  name,
  operator: `受理單位：${name}或校方指定單位`,
  system: '申請流程：依照學校官方公告辦理',
}));

export default function Home() {
  const [registrationState, setRegistrationState] = useState(() => getRegistrationState());
  const registrationActionLabel = registrationState.status === 'open' ? '前往正式登記'
    : registrationState.status === 'closed' ? '登記已截止' : '登記準備中';

  useEffect(() => {
    const refresh = () => setRegistrationState(getRegistrationState());
    const timer = window.setInterval(refresh, 30_000);
    window.addEventListener('focus', refresh);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
    };
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/88 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:h-[76px] sm:px-8 lg:px-14">
          <a href="#top" className="group flex items-center gap-3" aria-label="曜日羽球首頁">
            <span className="grid size-9 place-items-center rounded-full bg-ink text-sm font-black text-lime transition-transform group-hover:-rotate-6 sm:size-10">曜</span>
            <span>
              <span className="block text-sm font-black tracking-[0.16em]">曜日羽球</span>
              <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-ink/45 sm:block">SOLAR BADMINTON</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 text-sm font-bold text-ink/60 md:flex">
            <a className="transition-colors hover:text-ink" href="#prizes">抽獎好禮</a>
            <a className="transition-colors hover:text-ink" href="#venues">場館計畫</a>
            <a className="transition-colors hover:text-ink" href="#privacy">資料授權</a>
            <a className="transition-colors hover:text-ink" href="#register">登記資訊</a>
          </nav>

          <RegistrationLink state={registrationState} className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-black text-white shadow-[0_5px_0_#b7e925] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:px-5">
            {registrationActionLabel}<ArrowRight className="size-4" />
          </RegistrationLink>
        </div>
      </header>

      <div className={`border-b px-5 py-3 text-center text-sm font-bold leading-6 ${registrationState.status === 'open' ? 'border-green/20 bg-lime/45 text-ink' : 'border-amber-300 bg-amber-50 text-amber-950'}`}>
        {registrationState.message}。{registrationState.status === 'preparing' ? 'Google 託管表單完成正式開放驗收後，即可由此入口登記。' : '請在 Google 託管表單填寫、閱讀完整告知並確認同意後送出。'}
      </div>

      <section id="top" className="relative isolate border-b border-ink/10">
        <div className="court-grid absolute inset-0 -z-10 opacity-55" />
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.06fr_.94fr] lg:items-center lg:gap-16 lg:px-14 lg:pb-28 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-xs font-black tracking-[0.08em] text-ink shadow-sm">
              <Sparkles className="size-4 text-green" />2027 臺北 LGBTQ+ 羽球場地募集・限年滿 18 歲
            </div>
            <h1 className="font-display text-[clamp(2.6rem,5.2vw,5.6rem)] font-black leading-[1.05] tracking-[-0.065em] text-ink">
              完成填表與授權<span className="mt-2 block text-green">就能先抽獎</span>
            </h1>
            <p className="mt-8 max-w-xl text-base font-medium leading-8 text-ink/66 sm:text-lg">
              曜日羽球團是由 LGBTQ+ 球友組成、為 LGBTQ+ 社群打造的專屬球團。臺北固定羽球場地競爭激烈，大型球團能投入更多人次參與抽籤；你提供的一份資料，就是曜日多一次爭取穩定場地、讓社群繼續安心打球的機會。
            </p>
            <p className="mt-4 max-w-xl text-sm font-bold leading-7 text-green">完整填寫資料、勾選四項授權並成功送出，即可參加首波抽獎，不必先抽中場地。首波抽獎資格截至 {FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT}；{FIRST_DRAW_DATE_TEXT} 抽獎。截止後仍可協助場地登記，但不列入首波抽獎名單。</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <RegistrationLink state={registrationState} className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-green px-7 text-base font-black text-white shadow-[0_7px_0_#0d2b24] transition-all hover:-translate-y-1 hover:shadow-[0_11px_0_#0d2b24] disabled:cursor-not-allowed disabled:opacity-60">
                {registrationActionLabel}<ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </RegistrationLink>
              <a href="#how" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/75 px-6 text-sm font-black text-ink transition-colors hover:bg-white">
                先了解怎麼運作<ArrowDown className="size-4" />
              </a>
            </div>
            <a href="#benefits" className="mt-7 block rounded-[1.4rem] border border-green/20 bg-lime/55 p-4 shadow-[0_12px_30px_rgba(16,42,36,.06)] transition-colors hover:bg-lime/70">
              <p className="text-xs font-black tracking-[0.14em] text-green">2027 球團福利</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-black text-ink"><CheckCircle2 className="size-4 text-green" />季繳優先登記</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-sm font-black text-white"><BadgeDollarSign className="size-4 text-lime" />當年度臨打優惠</span>
              </div>
              <p className="mt-3 text-xs font-bold text-green">查看福利內容與適用條件 →</p>
            </a>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-ink/56">
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-green" />LGBTQ+ 專屬球團</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-green" />資料用途透明</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-green" />場地協助登記至 2027/12/31</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[590px] lg:mx-0 lg:justify-self-end">
            <div className="absolute -left-7 top-10 z-20 hidden rotate-[-8deg] rounded-2xl bg-lime px-5 py-4 font-black text-ink shadow-xl sm:block">
              <span className="block text-3xl leading-none">30</span><span className="text-xs tracking-[0.12em]">份好禮</span>
            </div>
            <div className="hero-ticket relative min-h-[520px] overflow-hidden rounded-[2rem] border border-white/10 bg-ink p-6 text-white shadow-[0_35px_90px_rgba(12,35,29,.24)] sm:min-h-[590px] sm:rounded-[2.75rem] sm:p-9">
              <img src={`${import.meta.env.BASE_URL}hero-badminton.png`} alt="深綠色羽球場上的球拍與飛行中羽球" className="absolute inset-0 h-full w-full object-cover object-[60%_center]" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,32,27,.05),rgba(9,32,27,.25)_45%,rgba(9,32,27,.96))]" />
              <div className="relative flex h-full min-h-[472px] flex-col justify-between sm:min-h-[518px]">
                <div className="flex items-start justify-between">
                  <p className="rounded-full border border-white/20 bg-ink/40 px-3 py-2 text-xs font-black uppercase tracking-[0.2em] text-lime backdrop-blur">Early Draw Pass</p>
                  <span className="grid size-12 place-items-center rounded-full border border-white/20 bg-ink/35 backdrop-blur"><Trophy className="size-6 text-lime" /></span>
                </div>
                <div>
                  <p className="text-sm font-black tracking-[0.12em] text-lime">頭獎 1 名 · MIZUNO 美津濃</p>
                  <p className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[1.05] tracking-[-0.045em]">FORTIUS 11<span className="block text-lime">POWER</span></p>
                  <p className="mt-3 text-base font-bold text-white">日本製頂級球拍，一支</p>
                  <p className="mt-4 max-w-sm text-sm font-bold leading-6 text-white/70">再加碼球袋、毛巾、襪子與曜日球衣，於首波資格截止前完成填表、授權並成功送出，才列入首波抽獎名單。</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-ink/45 p-4 backdrop-blur"><Gift className="mb-3 size-5 text-lime" /><span className="block text-xs font-bold text-white/55">首波抽獎資格</span><strong className="mt-1 block">截止前完成填表與授權</strong></div>
                    <div className="rounded-2xl border border-white/10 bg-ink/45 p-4 backdrop-blur"><CalendarDays className="mb-3 size-5 text-lime" /><span className="block text-xs font-bold text-white/55">授權期限</span><strong className="mt-1 block">至 2027/12/31</strong></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="benefits" className="bg-lime py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1440px] gap-9 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-16 lg:px-14">
          <div>
            <p className="text-xs font-black tracking-[0.18em] text-green">SOLAR BADMINTON BENEFITS</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">提供資料並協助抽籤，<br />也能享有球團福利</h2>
            <p className="mt-5 max-w-lg text-sm font-medium leading-7 text-ink/65 sm:text-base">完成資料提供與授權，並依需要配合場地抽籤程序，即可在 2027 年享有以下曜日羽球團福利。</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-[1.8rem] border border-ink/10 bg-white/80 p-6 shadow-[0_18px_45px_rgba(16,42,36,.08)] backdrop-blur sm:p-7">
              <span className="grid size-11 place-items-center rounded-full bg-ink text-lime"><UserCheck className="size-5" /></span>
              <h3 className="mt-6 text-xl font-black text-ink">季繳優先登記資格</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-ink/60">固定球友的季繳名額開放時，可優先登記；實際場館、時段與名額依當期公告，優先登記不代表保證錄取。</p>
            </article>
            <article className="rounded-[1.8rem] border border-ink/10 bg-ink p-6 text-white shadow-[0_18px_45px_rgba(16,42,36,.16)] sm:p-7">
              <span className="grid size-11 place-items-center rounded-full bg-lime text-ink"><BadgeDollarSign className="size-5" /></span>
              <h3 className="mt-6 text-xl font-black">當年度臨打優惠</h3>
              <p className="mt-3 text-sm font-medium leading-6 text-white/60">2027 年參加曜日羽球團公告的臨打場次，可享當期優惠；優惠金額與適用場次依公告辦理。</p>
            </article>
          </div>
        </div>
      </section>

      <section id="prizes" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div><p className="section-kicker">FIRST ROUND REWARDS</p><h2 className="mt-3 font-display text-4xl font-black tracking-[-0.045em] text-ink sm:text-5xl">先抽一波，共 30 份</h2></div>
            <p className="hidden max-w-sm text-right text-base font-medium leading-7 text-ink/65 md:block">頭獎確定：日本製 MIZUNO FORTIUS 11 POWER。一起爭取場地，也有機會把好拍帶回家。</p>
          </div>
          <section aria-labelledby="draw-rules-heading" className="mb-6 rounded-[1.8rem] border border-green/20 bg-green/5 p-5 sm:p-7">
            <h3 id="draw-rules-heading" className="text-xl font-black text-ink">首波抽獎與領獎辦法</h3>
            <p className="mt-3 text-sm font-medium leading-7 text-ink/70">{FIRST_DRAW_QUALIFICATION_TEXT}</p>
            <dl className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-4"><dt className="text-sm font-bold text-ink/60">首波抽獎資格截止</dt><dd className="mt-2 text-base font-black leading-7 text-green">{FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT}</dd></div>
              <div className="rounded-2xl bg-white p-4"><dt className="text-sm font-bold text-ink/60">首波抽獎日</dt><dd className="mt-2 text-base font-black leading-7 text-green">{FIRST_DRAW_DATE_TEXT}</dd></div>
              <div className="rounded-2xl bg-white p-4"><dt className="text-sm font-bold text-ink/60">場地協助登記截止</dt><dd className="mt-2 text-base font-black leading-7 text-green">{REGISTRATION_DEADLINE_TEXT}</dd></div>
            </dl>
            <ul className="mt-5 list-disc space-y-2 pl-5 text-sm font-medium leading-7 text-ink/70">
              <li>每人一次抽獎資格，最多一獎；以隨機方式抽出得獎者。</li>
              <li>以 Email、LINE 通知得獎者；依得獎通知於 14 日內回覆、30 日內領取，逾期遞補。</li>
              <li>首波資格截止後仍可協助場地登記，但不列入首波抽獎名單；場地協助登記期限不會延長首波抽獎資格。</li>
            </ul>
          </section>
          <article className="mb-5 overflow-hidden rounded-[1.8rem] border border-ink/15 bg-cream lg:grid lg:grid-cols-2">
            <figure className="min-w-0 bg-ink">
              <img src={`${import.meta.env.BASE_URL}mizuno-fortius-11-power.jpg`} alt="MIZUNO FORTIUS 系列官方宣傳圖：左為 11 QUICK，右為本次頭獎 11 POWER" width={1080} height={1080} loading="lazy" className="aspect-square w-full object-contain" />
              <figcaption className="px-5 py-4 text-sm font-medium leading-6 text-white/80 sm:px-7">圖片展示 QUICK 與 POWER 兩款；本次頭獎為 FORTIUS 11 POWER 一支。</figcaption>
            </figure>
            <div className="min-w-0 p-6 sm:p-9 lg:p-10">
              <span className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-black text-lime"><Trophy className="size-4" />頭獎 · 1 名 · 1 支</span>
              <p className="mt-6 text-base font-black tracking-[0.08em] text-green">MIZUNO 美津濃</p>
              <h3 className="mt-2 text-[clamp(2rem,4vw,3.6rem)] font-black leading-[1.05] tracking-[-0.045em] text-ink">FORTIUS 11<span className="block">POWER</span></h3>
              <p className="mt-5 text-base font-medium leading-7 text-ink/70">為後場進攻打造的日本製球拍。頭重搭配硬中管，適合偏好強力殺球的球友。</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {['日本製造', '4U · 約 83 g', '攻擊型'].map((feature) => <span key={feature} className="rounded-full border border-green/20 bg-white px-3 py-2 text-sm font-bold text-green">{feature}</span>)}
              </div>
              <Accordion className="mt-6 border-y border-ink/15">
                <AccordionItem value="racket-specifications" className="border-0">
                  <AccordionTrigger className="text-base font-black text-ink">球拍規格與科技</AccordionTrigger>
                  <AccordionContent>
                    <dl className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 text-base leading-7 text-ink/75">
                      <dt className="font-bold text-ink">貨號</dt><dd>73JTB11209</dd>
                      <dt className="font-bold text-ink">拍身長度</dt><dd>675 mm</dd>
                      <dt className="font-bold text-ink">建議磅數</dt><dd>22–29 lbs</dd>
                      <dt className="font-bold text-ink">拍框材質</dt><dd>高彈性碳纖維（HM Graphite）＋鎢（Tungsten PP）</dd>
                      <dt className="font-bold text-ink">中管材質</dt><dd>M FUSION 碳纖維</dd>
                    </dl>
                    <div className="mt-5 space-y-3 border-t border-ink/10 pt-5 text-base leading-7 text-ink/75">
                      <p><strong className="text-ink">Aero Groove 拍框溝槽：</strong>透過溝槽設計，減少揮拍風阻。</p>
                      <p><strong className="text-ink">Torque Technology（T5）：</strong>強化擊球時的力量傳遞，支援進攻表現。</p>
                    </div>
                    <a href="https://twn.mizuno.com/products/73jtb11209" target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-green underline underline-offset-4">查看美津濃官方商品資訊<ArrowRight className="size-4" /></a>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </article>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-describedby="prize-illustration-note">
            {prizes.map((prize) => (
              <article key={prize.name} className={`prize-card prize-card--${prize.tone} min-w-0 overflow-hidden rounded-[1.6rem] border`}>
                <figure className="bg-cream">
                  <img src={`${import.meta.env.BASE_URL}${prize.image}`} alt={prize.alt} width={1024} height={1024} loading="lazy" decoding="async" className="block aspect-square w-full object-contain" />
                  <figcaption className="border-y border-ink/10 bg-white/90 px-4 py-3 text-center text-xs font-bold leading-5 text-ink/70">AI 生成示意圖／非實際獎品</figcaption>
                </figure>
                <div className="flex flex-1 items-center justify-between gap-3 p-5 sm:p-6">
                  <div className="min-w-0"><h3 className="text-xl font-black text-ink">{prize.name}</h3><p className="mt-1 text-sm font-bold text-ink/65">{prize.note}</p></div>
                  <span className="shrink-0 border-l border-ink/15 pl-4 font-mono text-4xl font-black tracking-[-0.08em] text-ink/75" aria-hidden="true">{prize.count}</span>
                </div>
              </article>
            ))}
          </div>
          <div id="prize-illustration-note" className="mt-5 flex items-start gap-2 rounded-2xl bg-cream px-4 py-4 text-sm font-medium leading-6 text-ink/70"><Info className="mt-1 size-4 shrink-0 text-green" /><div className="space-y-2"><p>球袋、毛巾、襪子與球衣圖片皆為 AI 生成示意圖，非實際獎品；實際款式、顏色、品牌與型號以後續公告為準。</p><p>球拍型號與首波抽獎日期已確認；各獎品價值、付款與扣繳資料仍待定案。「頂級」與「高級」為活動品項名稱。</p></div></div>
        </div>
      </section>

      <section id="how" className="border-y border-ink/10 bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <p className="section-kicker">HOW IT WORKS</p>
              <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">三步驟，<br className="hidden lg:block" />一起守住打球的地方</h2>
              <p className="mt-5 max-w-md text-sm font-medium leading-7 text-ink/55 sm:text-base">臺北市固定羽球場地有限，小型球團很難和大型團體投入的抽籤人數競爭。對曜日這樣的 LGBTQ+ 球團而言，每多一份協助，就是多一次留下來、繼續安心打球的機會。</p>
            </div>
            <div className="grid gap-3">
              {[
                { no: '01', icon: FileCheck2, title: '前往正式表單填寫', text: '至 Google 託管表單填寫本名、身分證字號、手機號碼、Email、LINE ID、暱稱及場館帳號註冊狀態；推薦人暱稱或推薦碼為選填。' },
                { no: '02', icon: Building2, title: '閱讀完整文件，確認同意後送出', text: '填好資料後，閱讀 10 項個資與授權告知、13 個適用場館與活動辦法，捲動至文件底部，再主動勾選四項確認並送出。於首波資格截止前完成並取得收件回條，即可參加抽獎，不必先抽中場地。' },
                { no: '03', icon: UserCheck, title: '場地中籤後，配合登記領獎金', text: '這是後續場地協助，不是首波抽獎資格的前提。抽中場地後，由本人依通知完成驗證、繳費、簽約與切結；完成登記並核對後，再依規則領取場地協助獎金。' },
              ].map((step) => (
                <article key={step.no} className="group grid gap-5 rounded-[1.8rem] border border-ink/10 bg-white p-6 transition-transform hover:-translate-y-1 sm:grid-cols-[70px_1fr_auto] sm:items-center sm:p-7">
                  <span className="font-mono text-4xl font-black text-green/30">{step.no}</span>
                  <div><h3 className="text-xl font-black text-ink">{step.title}</h3><p className="mt-2 max-w-xl text-sm font-medium leading-6 text-ink/55">{step.text}</p></div>
                  <span className="hidden size-12 place-items-center rounded-full bg-lime text-ink sm:grid"><step.icon className="size-5" /></span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 text-white sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-end lg:gap-20">
            <div><p className="text-xs font-black tracking-[0.18em] text-lime">SUCCESS BONUS</p><h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-6xl">成功取得場地，<br />獎金可以累計</h2><p className="mt-5 max-w-lg text-sm font-medium leading-7 text-white/55 sm:text-base">抽中場地並協助完成登記後，即可獲得獎金回饋；同一年度可持續累計，金額無上限。場地登記完成並核對後，於 30 日內匯款。</p></div>
            <div className="grid gap-3 sm:grid-cols-2">
              <article className="rounded-[1.8rem] border border-white/10 bg-white/7 p-6 sm:p-7"><BadgeDollarSign className="size-6 text-lime" /><p className="mt-7 text-sm font-black text-white/55">年租型：每中籤一次</p><p className="mt-2 font-mono text-5xl font-black tracking-[-0.08em] text-lime">NT$2,000</p></article>
              <article className="rounded-[1.8rem] border border-white/10 bg-white/7 p-6 sm:p-7"><WalletCards className="size-6 text-lime" /><p className="mt-7 text-sm font-black text-white/55">季租型：每中籤一面場地</p><p className="mt-2 font-mono text-5xl font-black tracking-[-0.08em] text-lime">NT$500</p></article>
              <article className="rounded-[1.8rem] border border-white/10 bg-white/7 p-6 sm:col-span-2 sm:p-7">
                <div className="flex items-start gap-4"><span className="grid size-11 shrink-0 place-items-center rounded-full bg-lime text-ink"><CheckCircle2 className="size-5" /></span><div><h3 className="font-black">獎金怎麼累計？</h3><p className="mt-2 text-sm font-medium leading-6 text-white/55">年租型每中籤一次計 NT$2,000；季租型每中籤一面場地計 NT$500，並按中籤面數疊加。例如季租型一次中籤 3 面，即可獲得 NT$1,500。同一年度可持續累計，沒有金額上限。</p></div></div>
              </article>
            </div>
          </div>
          <div className="mt-8 grid gap-3 border-t border-white/10 pt-8 text-xs font-bold text-white/45 sm:grid-cols-3">
            <span className="flex items-center gap-2"><Check className="size-4 text-lime" />完成抽籤並取得承租資格</span>
            <span className="flex items-center gap-2"><Check className="size-4 text-lime" />完成驗證、繳費與文件</span>
            <span className="flex items-center gap-2"><Check className="size-4 text-lime" />未逾期辦理、未放棄，且資格仍有效</span>
          </div>
        </div>
      </section>

      <section id="venues" className="bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <div className="max-w-3xl"><p className="section-kicker">VENUE DIRECTORY</p><h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">適用的 13 個場館與學校</h2><p className="mt-5 text-sm font-medium leading-7 text-ink/65 sm:text-base">{VENUE_NOTICE_TEXT}</p></div>

          <div className="mt-6 rounded-2xl border border-green/20 bg-green/5 p-5 text-sm leading-7 text-ink/70">
            <p className="font-black text-green">全部 13 個場館均在本次授權範圍內，清單僅供告知，不提供個別選擇。</p>
            <p className="mt-2">{CROSS_VENUE_NOTICE_TEXT}</p>
            <a href="#supplemental-notice" className="mt-2 inline-block font-bold text-green underline underline-offset-4">了解新增場館的人工補充授權</a>
          </div>

          <div className="mt-10 grid gap-10 xl:grid-cols-2">
            <VenueGroup title="運動／活動中心" count="07" venues={centerVenues} />
            <VenueGroup title="臺北市學校" count="06" venues={schoolVenues} />
          </div>
        </div>
      </section>

      <section id="register" className="border-y border-ink/10 bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-16 lg:px-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="section-kicker">REGISTRATION</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">一起幫曜日，<br />多爭取一面場地</h2>
            <p className="mt-5 max-w-md text-sm font-medium leading-7 text-ink/55 sm:text-base">每一份正確資料，都是小型 LGBTQ+ 球團的一次抽籤機會。限年滿 18 歲者參加；適用場館清單僅作告知，不提供個別選擇。</p>
            <div className="mt-7 space-y-3">
              <div className="mini-trust"><Database className="size-5 text-green" /><div><strong>GitHub 公告與登記入口</strong><span>正式填寫由 Google 託管表單承接</span></div></div>
              <div className="mini-trust"><LockKeyhole className="size-5 text-green" /><div><strong>表單不收密碼與驗證碼</strong><span>本人驗證步驟由本人操作</span></div></div>
              <div className="mini-trust"><Clock3 className="size-5 text-green" /><div><strong>有限期授權</strong><span>至 2027 年 12 月 31 日</span></div></div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-[#fbfaf6] p-5 shadow-[0_28px_80px_rgba(16,42,36,.08)] sm:rounded-[2.5rem] sm:p-8 lg:p-10">
            <RegistrationEntry state={registrationState} />
          </div>
        </div>
      </section>

      <section id="privacy" className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-14">
          <div>
            <span className="grid size-12 place-items-center rounded-full bg-lime text-ink"><ShieldCheck className="size-6" /></span>
            <p className="section-kicker mt-7">PRIVACY NOTICE</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">個人資料蒐集、<br />處理及利用告知事項</h2>
            <p className="mt-5 text-sm font-medium leading-7 text-ink/65">這就是表單所稱的「個資告知事項」。請展開閱讀完整內容，並在正式送出前確認 Google 託管表單顯示相同版本。告知與同意版本：{CONSENT_VERSION}。</p>
            <p className="mt-3 text-sm font-medium leading-7 text-ink/65">你可以查詢、閱覽、取得複製本、補充或更正、請求停止蒐集處理利用，以及請求刪除資料；這些權利不能預先放棄或以約定限制。</p>
            <AuthorizationContactLinks />
          </div>
          <div className="divide-y divide-ink/10 rounded-[1.8rem] border border-ink/10 bg-cream px-5 sm:px-7">
            {PRIVACY_NOTICE_ITEMS.map((item) => (
              <details key={item.id} id={`privacy-${item.id}`} className="scroll-mt-28 py-2">
                <summary className="cursor-pointer py-4 text-base font-black text-ink sm:text-lg">{item.title}</summary>
                <div className="space-y-3 pb-5 text-sm font-medium leading-7 text-ink/70">
                  {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  {'sourceLinks' in item && <div className="border-t border-ink/10 pt-3"><p className="font-bold text-ink">服務商公開政策</p><ul className="mt-2 space-y-2">{item.sourceLinks.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-green underline underline-offset-4">{source.label}</a></li>)}</ul></div>}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section id="withdrawal" className="border-t border-ink/10 bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-14">
          <p className="section-kicker">CONTACT & AUTHORIZATION</p>
          <h2 className="mt-3 text-2xl font-black text-ink sm:text-3xl">想停止代辦或終止共同使用？</h2>
          <div className="mt-5 max-w-3xl space-y-3 text-sm font-medium leading-7 text-ink/70">
            {REVOCATION_NOTICE.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <AuthorizationContactLinks />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-ink pb-24 pt-12 text-white md:pb-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-14">
          <div><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-lime text-sm font-black text-ink">曜</span><strong className="tracking-[0.14em]">曜日羽球</strong></div><p className="mt-5 max-w-lg text-xs font-medium leading-6 text-white/45">{registrationState.message}。本頁僅提供公告與入口，正式填寫由 Google 託管表單承接。提供資料或完成登記，不代表一定取得獎品或場地；2027 年實際受理方式以各單位官方公告為準。</p></div>
          <div className="text-sm">
            <p className="text-xs font-black tracking-[0.16em] text-white/35">資料管理負責人</p>
            <div className="mt-3 flex flex-col gap-2 font-black text-lime">
              <a href={CONTACTS.managerPhoneHref} className="inline-flex items-center gap-2"><Phone className="size-4" />{CONTACTS.managerName}・{CONTACTS.managerPhone}</a>
              <span className="inline-flex items-center gap-2"><MessageCircle className="size-4" />{CONTACTS.responsiblePerson}・LINE ID：{CONTACTS.lineId}</span>
              <a href={CONTACTS.registrationSystemUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 underline underline-offset-4"><MessageCircle className="size-4" />曜日報名系統私訊</a>
              <a href="#withdrawal" className="text-xs font-bold text-white/65 underline underline-offset-4">個資權利與終止授權</a>
            </div>
          </div>
        </div>
      </footer>

      <div className="mobile-sticky-cta fixed inset-x-4 bottom-4 z-40 md:hidden">
        <RegistrationLink state={registrationState} className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-green px-6 font-black text-white shadow-[0_10px_35px_rgba(11,71,56,.28)] disabled:cursor-not-allowed disabled:opacity-75">{registrationActionLabel}<ArrowRight className="size-5" /></RegistrationLink>
      </div>
    </main>
  );
}

function VenueGroup({ title, count, venues }: { title: string; count: string; venues: typeof centerVenues }) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between border-b border-ink/15 pb-4"><h3 className="text-xl font-black text-ink">{title}</h3><span className="font-mono text-sm font-black text-green">{count} VENUES</span></div>
      <div className="divide-y divide-ink/10 rounded-[1.6rem] border border-ink/10 bg-cream px-4 sm:px-5">
        {venues.map((venue) => (
          <article key={venue.name} className="grid gap-3 py-4 sm:grid-cols-[.8fr_1.2fr] sm:items-center sm:gap-4">
            <div className="flex items-center gap-3"><span className="size-2.5 shrink-0 rounded-full bg-green" /><strong className="text-sm text-ink">{venue.name}</strong></div>
            <div><p className="text-xs font-bold leading-6 text-ink/65">{venue.operator}</p><p className="mt-1 text-xs font-medium leading-6 text-ink/55">{venue.system}</p></div>
          </article>
        ))}
      </div>
    </div>
  );
}
