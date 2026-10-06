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

import { RegistrationForm } from '@/components/registration-form';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CONSENT_VERSION } from '@/lib/consent';

const prizes = [
  { count: '03', name: '高級球袋', note: '三名', tone: 'lime' },
  { count: '06', name: '運動毛巾', note: '六名', tone: 'paper' },
  { count: '10', name: '運動襪', note: '十名', tone: 'paper' },
  { count: '10', name: '曜日球衣', note: '十名', tone: 'paper' },
];

const centerVenues = [
  { name: '大同運動中心', operator: '舞動陽光股份有限公司', system: '場館會員／季租系統', status: '依 2027 年官方公告辦理' },
  { name: '南港運動中心', operator: '社團法人中國青年救國團', system: '救國團場館系統', status: '依 2027 年官方公告辦理' },
  { name: '大安運動中心', operator: '長佳機電工程股份有限公司', system: '長佳會員／場地系統', status: '依 2027 年官方公告辦理' },
  { name: '中正運動中心', operator: '舞動陽光股份有限公司', system: '舞動陽光場地系統', status: '依 2027 年官方公告辦理' },
  { name: '中山運動中心', operator: '2027 年營運團隊以官方公告為準', system: '目前公告的最優申請人為舞動陽光', status: '營運交接中', alert: true },
  { name: '萬華運動中心', operator: '2027 年營運團隊以官方公告為準', system: '目前公告的最優申請人為舞動陽光', status: '營運交接中', alert: true },
  { name: '臺北市民生社區中心', operator: '臺北市政府民政局', system: '民政局長期租借系統', status: '依當期官方公告辦理' },
];

const schoolVenues = [
  { name: '日新國小', operator: '日新國小總務處', system: '當季單次表單', status: '依照學校官方公告辦理' },
  { name: '蓬萊國小', operator: '蓬萊國小總務處', system: '校方公告受理方式', status: '依照學校官方公告辦理' },
  { name: '新興國中', operator: '臺北市立新興國民中學', system: '年度申請文件／校方受理', status: '依照學校官方公告辦理' },
  { name: '興雅國小', operator: '興雅國小', system: '校方專屬抽籤系統', status: '依照學校官方公告辦理' },
  { name: '銘傳國小', operator: '銘傳國小', system: '當季 Google 表單', status: '依照學校官方公告辦理' },
  { name: '長春國小', operator: '長春國小總務處', system: '臺北市公有場地租用平台', status: '依照學校官方公告辦理' },
];

const privacyItems = [
  {
    title: '蒐集者與聯絡方式',
    content: '蒐集單位為曜日羽球團；資料管理負責人及個資聯絡人為張博鈞，電話 0933-865-506，LINE ID：nplus168。若要行使個資權利、撤回尚未執行的授權或詢問資料處理情形，可透過電話或 LINE 聯絡。',
  },
  {
    title: '蒐集目的、依據與資料類別',
    content: '曜日羽球團依個人資料保護法第 19 條第 1 項第 5 款，以本人同意作為蒐集及處理個人資料的依據。Email 用於活動、抽獎結果及新增抽籤對象通知；LINE ID 用於抽獎結果、場地申請進度及需要即時配合時的聯絡。除上述聯絡用途外，本次資料會在參加抽獎、代為註冊運動中心會員或登記帳號、2027 年固定羽球場地申請與抽籤、身分驗證、取得場地後的必要程序、協助獎金發放、會計稅務及爭議處理所必要的範圍內使用。必填資料為本名、身分證字號、手機號碼、Email、LINE ID、暱稱及帳號註冊狀態；推薦人暱稱或推薦碼為選填，另會保存授權內容、版本與送出時間。新增抽籤對象只會先行通知，不會自動納入本次授權。',
  },
  {
    title: '利用期間、地區與到期處理',
    content: '一般利用期間為授權日起至 2027 年 12 月 31 日。期限屆滿後會停止一般使用並刪除或去識別化；但法律、會計稅務、爭議處理或備份安全確有保存必要時，只會在必要期間及目的內保留。資料主要在臺灣使用，但 Google 與網站主機服務可能透過全球基礎設施處理或備份資料，因此可能涉及境外傳輸。',
  },
  {
    title: '利用對象與方式',
    content: '資料會由曜日羽球團授權人員以網站蒐集、電子儲存與傳輸、電話或通訊聯絡、代為建立運動中心帳號、場地申請、抽獎與獎金處理等方式使用。必要時，會提供給實際申請的場館或學校、正式營運單位、官方登記系統，以及依法必要的付款、會計、稅務或主管機關。必要的系統服務商包括 Google、LINE、網站主機與資料傳輸服務商及其受託處理者；不會一次把完整名單交給所有場館。',
  },
  {
    title: '你的個資權利與行使方式',
    content: '你可以依個人資料保護法請求查詢、閱覽或製給複製本，也可以請求補充、更正、停止蒐集、處理、利用或刪除。請聯絡張博鈞，電話 0933-865-506，LINE ID：nplus168；我們會先核對申請人身分，再依法處理。若法令另有規定或業務執行確有必要，部分請求可能依法受到限制。',
  },
  {
    title: '不提供資料會有什麼影響',
    content: '若未提供必填資料、未滿 18 歲或不同意四項必要授權，就無法參加抽獎及後續場地協助。只有推薦人暱稱或推薦碼為選填，不提供不會影響參加資格；此欄請勿填寫他人的真實姓名、電話或其他個人資料。',
  },
  {
    title: '帳號與使用限制',
    content: '本站不蒐集或保存任何帳號密碼、簡訊驗證碼或一次性驗證碼；也不會將資料用於臺北市政府體育局的一般場地預約網站、本公告清單以外的場館、名單出售或其他廣告用途。',
  },
];

export default function Home() {
  const registrationOpen = false;

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
          </nav>

          <a href="#register" className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-sm font-black text-white shadow-[0_5px_0_#b7e925] transition-transform hover:-translate-y-0.5 sm:px-5">
            {registrationOpen ? '立即參加' : '查看表單預覽'}<ArrowRight className="size-4" />
          </a>
        </div>
      </header>

      {!registrationOpen && (
        <div className="border-b border-amber-300 bg-amber-50 px-5 py-3 text-center text-sm font-bold leading-6 text-amber-950">
          目前為內容預覽，尚未正式收件。活動期間、完整抽獎與領獎辦法、獎金發放及稅務方式將於開放前公告。
        </div>
      )}

      <section id="top" className="relative isolate border-b border-ink/10">
        <div className="court-grid absolute inset-0 -z-10 opacity-55" />
        <div className="mx-auto grid max-w-[1440px] gap-12 px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:grid-cols-[1.06fr_.94fr] lg:items-center lg:gap-16 lg:px-14 lg:pb-28 lg:pt-24">
          <div className="max-w-3xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/70 px-3 py-2 text-xs font-black tracking-[0.08em] text-ink shadow-sm">
              <Sparkles className="size-4 text-green" />2027 臺北 LGBTQ+ 羽球場地募集・限年滿 18 歲
            </div>
            <h1 className="font-display text-[clamp(3.5rem,8vw,7.6rem)] font-black leading-[0.84] tracking-[-0.075em] text-ink">
              提供資料<span className="mt-2 block text-green">就可以先抽獎</span>
            </h1>
            <p className="mt-8 max-w-xl text-base font-medium leading-8 text-ink/66 sm:text-lg">
              曜日羽球團是由 LGBTQ+ 球友組成、為 LGBTQ+ 社群打造的專屬球團。臺北固定羽球場地競爭激烈，大型球團能投入更多人次參與抽籤；你提供的一份資料，就是曜日多一次爭取穩定場地、讓社群繼續安心打球的機會。
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#register" className="group inline-flex h-14 items-center justify-center gap-3 rounded-full bg-green px-7 text-base font-black text-white shadow-[0_7px_0_#0d2b24] transition-all hover:-translate-y-1 hover:shadow-[0_11px_0_#0d2b24]">
                {registrationOpen ? '填資料，參加抽獎' : '預覽填寫內容'}<ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#how" className="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-ink/15 bg-white/75 px-6 text-sm font-black text-ink transition-colors hover:bg-white">
                先了解怎麼運作<ArrowDown className="size-4" />
              </a>
            </div>
            <div className="mt-7 rounded-[1.4rem] border border-green/20 bg-lime/55 p-4 shadow-[0_12px_30px_rgba(16,42,36,.06)]">
              <p className="text-xs font-black tracking-[0.14em] text-green">2027 球團福利</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-2 text-sm font-black text-ink"><CheckCircle2 className="size-4 text-green" />季繳優先登記</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-ink px-3 py-2 text-sm font-black text-white"><BadgeDollarSign className="size-4 text-lime" />當年度臨打優惠</span>
              </div>
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm font-bold text-ink/56">
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-green" />LGBTQ+ 專屬球團</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-green" />資料用途透明</span>
              <span className="inline-flex items-center gap-2"><Check className="size-4 text-green" />期限至 2027/12/31</span>
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
                  <p className="mt-4 max-w-sm text-sm font-bold leading-6 text-white/70">再加碼球袋、毛巾、襪子與曜日球衣，完成資料授權就能參加。</p>
                  <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-ink/45 p-4 backdrop-blur"><Gift className="mb-3 size-5 text-lime" /><span className="block text-xs font-bold text-white/55">抽獎資格</span><strong className="mt-1 block">完成資料授權</strong></div>
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
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {prizes.map((prize) => (
              <article key={prize.name} className={`prize-card prize-card--${prize.tone} min-h-44 rounded-[1.6rem] border p-5 sm:min-h-52 sm:p-6`}>
                <span className="font-mono text-4xl font-black tracking-[-0.08em] opacity-35">{prize.count}</span>
                <div className="mt-auto"><h3 className="text-xl font-black">{prize.name}</h3><p className="mt-1 text-sm font-bold opacity-55">{prize.note}</p></div>
              </article>
            ))}
          </div>
          <div className="mt-5 flex items-start gap-2 rounded-2xl bg-cream px-4 py-4 text-sm font-medium leading-6 text-ink/65"><Info className="mt-1 size-4 shrink-0 text-green" /><p>球拍型號已確認；其餘獎品的品牌與型號、各獎品價值及抽獎日期，將於正式開放前公告。「頂級」與「高級」為活動品項名稱。</p></div>
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
                { no: '01', icon: FileCheck2, title: '填寫必要資料', text: '填寫本名、身分證字號、手機號碼、Email、LINE ID 與暱稱；只有推薦人欄位可以不填。' },
                { no: '02', icon: Building2, title: '確認適用範圍', text: '本次授權統一適用公告列出的 13 個場館與學校；清單僅作告知，不提供個別選擇。' },
                { no: '03', icon: UserCheck, title: '配合完成程序', text: '若取得場地，請配合曜日羽球團在期限內完成身分驗證、繳費、簽約、切結及其他必要程序。' },
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
            <div><p className="text-xs font-black tracking-[0.18em] text-lime">SUCCESS BONUS</p><h2 className="mt-4 font-display text-4xl font-black tracking-[-0.05em] sm:text-6xl">成功取得場地，<br />獎金可以累計</h2><p className="mt-5 max-w-lg text-sm font-medium leading-7 text-white/55 sm:text-base">抽中場地並協助完成登記後，即可獲得獎金回饋；同一年度可持續累計，金額無上限。</p></div>
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
          <div className="max-w-3xl"><p className="section-kicker">VENUE DIRECTORY</p><h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">適用的 13 個場館與學校</h2><p className="mt-5 text-sm font-medium leading-7 text-ink/55 sm:text-base">以下清單為 2027 年預定申請的場館與學校。參加運動中心抽籤前，須先註冊該中心指定的會員或登記帳號。經本人同意後，如尚未完成註冊，曜日羽球團將使用本人提供的必要資料代為建立帳號，並提出場地抽籤申請；實際流程以各中心 2027 年官方公告為準。學校場地則依各校官方公告辦理。曜日羽球團只會在帳號註冊、抽籤申請及完成相關程序所必要的範圍內提供資料。</p></div>

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
              <div className="mini-trust"><Database className="size-5 text-green" /><div><strong>目前不收集資料</strong><span>僅供預覽，不儲存或傳送</span></div></div>
              <div className="mini-trust"><LockKeyhole className="size-5 text-green" /><div><strong>不索取既有密碼</strong><span>驗證碼仍由本人操作</span></div></div>
              <div className="mini-trust"><Clock3 className="size-5 text-green" /><div><strong>有限期授權</strong><span>至 2027 年 12 月 31 日</span></div></div>
            </div>
          </div>

          <div className="rounded-[2rem] border border-ink/10 bg-[#fbfaf6] p-5 shadow-[0_28px_80px_rgba(16,42,36,.08)] sm:rounded-[2.5rem] sm:p-8 lg:p-10">
            <RegistrationForm />
          </div>
        </div>
      </section>

      <section id="privacy" className="bg-white py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20 lg:px-14">
          <div>
            <span className="grid size-12 place-items-center rounded-full bg-lime text-ink"><ShieldCheck className="size-6" /></span>
            <p className="section-kicker mt-7">PRIVACY NOTICE</p>
            <h2 className="mt-3 font-display text-4xl font-black tracking-[-0.05em] text-ink sm:text-5xl">你的資料，<br />用途清清楚楚</h2>
            <p className="mt-5 text-sm font-medium leading-7 text-ink/55">重要授權不藏在小字裡。正式送出前，你會再次看到資料用途、利用對象與個資權利。告知版本：{CONSENT_VERSION}。</p>
          </div>
          <Accordion className="rounded-[1.8rem] border border-ink/10 bg-cream px-5 sm:px-7">
            {privacyItems.map((item, index) => (
              <AccordionItem key={item.title} value={`privacy-${index}`} className="border-ink/10 py-2">
                <AccordionTrigger className="py-4 text-base font-black no-underline hover:no-underline sm:text-lg">{item.title}</AccordionTrigger>
                <AccordionContent className="pb-5 pr-7 text-sm font-medium leading-7 text-ink/58">{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-ink pb-24 pt-12 text-white md:pb-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-end md:justify-between lg:px-14">
          <div><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full bg-lime text-sm font-black text-ink">曜</span><strong className="tracking-[0.14em]">曜日羽球</strong></div><p className="mt-5 max-w-lg text-xs font-medium leading-6 text-white/45">目前為內容預覽，尚未正式收件。提供資料或完成登記，不代表一定取得獎品或場地；2027 年實際受理方式以各單位官方公告為準。</p></div>
          <div className="text-sm">
            <p className="text-xs font-black tracking-[0.16em] text-white/35">資料管理負責人</p>
            <div className="mt-3 flex flex-col gap-2 font-black text-lime">
              <a href="tel:0933865506" className="inline-flex items-center gap-2"><Phone className="size-4" />張博鈞・0933-865-506</a>
              <span className="inline-flex items-center gap-2"><MessageCircle className="size-4" />LINE ID：nplus168</span>
            </div>
          </div>
        </div>
      </footer>

      <div className="mobile-sticky-cta fixed inset-x-4 bottom-4 z-40 md:hidden">
        <a href="#register" className="flex h-14 items-center justify-center gap-2 rounded-full bg-green px-6 font-black text-white shadow-[0_10px_35px_rgba(11,71,56,.28)]">{registrationOpen ? '立即填資料抽獎' : '查看表單預覽'}<ArrowRight className="size-5" /></a>
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
          <article key={venue.name} className={`grid gap-2 py-4 sm:grid-cols-[1.05fr_1.15fr_auto] sm:items-center sm:gap-4 ${venue.alert ? 'text-ink/58' : ''}`}>
            <div className="flex items-center gap-3"><span className={`size-2.5 rounded-full ${venue.alert ? 'bg-amber-400' : 'bg-green'}`} /><strong className="text-sm text-ink">{venue.name}</strong></div>
            <div><p className="text-xs font-bold text-ink/55">{venue.operator}</p><p className="mt-1 text-[11px] font-medium text-ink/38">{venue.system}</p></div>
            <span className={`w-fit rounded-full px-2.5 py-1 text-[10px] font-black ${venue.alert ? 'bg-amber-100 text-amber-800' : 'bg-white text-green ring-1 ring-ink/10'}`}>{venue.status}</span>
          </article>
        ))}
      </div>
    </div>
  );
}
