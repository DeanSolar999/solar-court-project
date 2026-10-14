import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeDollarSign, Gift, HeartHandshake, ShieldCheck, Trophy, Users } from 'lucide-react';
import { RegistrationEntry } from '@/components/registration-form';
import { MobileRegistrationCta } from '@/components/mobile-registration-cta';
import { AuthorizationContactLinks } from '@/components/authorization-contact-links';
import { AUTHORIZED_VENUES, CONSENT_VERSION, CONTACTS, CROSS_VENUE_NOTICE_TEXT, FIRST_DRAW_QUALIFICATION_TEXT, PRIVACY_NOTICE_ITEMS, REVOCATION_NOTICE, VENUE_NOTICE_TEXT } from '@/lib/consent';
import { FIRST_DRAW_DATE_TEXT, FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT, getRegistrationState, REGISTRATION_CLOSES_AT, REGISTRATION_DEADLINE_TEXT } from '@/lib/registration-config';
import { FIRST_DRAW_CLOSES_AT, getMarketingContent } from '@/lib/marketing-content';

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

export default function Home() {
  const [now, setNow] = useState(() => Date.now());
  const registrationState = getRegistrationState(undefined, now);
  const marketing = getMarketingContent(now, registrationState.status);
  const heroActionRef = useRef<HTMLDivElement>(null);
  const entryRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const refresh = () => setNow(Date.now());
    const nextBoundary = [FIRST_DRAW_CLOSES_AT, REGISTRATION_CLOSES_AT].find((boundary) => boundary > now);
    const delay = Math.max(1, Math.min(30_000, nextBoundary ? nextBoundary - now : 30_000));
    const timer = window.setTimeout(refresh, delay);
    window.addEventListener('focus', refresh);
    return () => { window.clearTimeout(timer); window.removeEventListener('focus', refresh); };
  }, [now]);

  // Preserve existing shared hashes, including targets inside the complete notice.
  useEffect(() => {
    const revealHash = () => {
      let id: string;
      try { id = decodeURIComponent(window.location.hash.slice(1)); } catch { return; }
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      let node: HTMLElement | null = target;
      while (node) {
        if (node instanceof HTMLDetailsElement) node.open = true;
        node = node.parentElement;
      }
      requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    };
    revealHash();
    window.addEventListener('hashchange', revealHash);
    return () => window.removeEventListener('hashchange', revealHash);
  }, []);

  return (
    <main className="marketing-page">
      <a href="#top" className="skip-link">跳至主要內容</a>
      <header className="site-header">
        <div className="page-shell header-inner">
          <a href="#top" className="brand" aria-label="曜日羽球首頁"><span className="brand-mark">曜</span><span><strong>曜日羽球</strong><small>SOLAR BADMINTON</small></span></a>
          <nav className="desktop-nav" aria-label="主要導覽"><a href="#prizes">抽獎好禮</a><a href="#benefits">參與回饋</a><a href="#venues">場館計畫</a></nav>
          <a href="#register" className="header-action">參與計畫<ArrowRight aria-hidden="true" /></a>
        </div>
      </header>

      <section id="top" className="marketing-hero">
        <div className="page-shell hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">2027 場地募集 · LGBTQ+ 羽球社群</p>
            <h1>一起幫曜日，<span>多爭取一面球場</span></h1>
            <p className="hero-description">{marketing.subtitle}</p>
            <ul className="hero-benefits" aria-label="參與亮點">
              <li><Gift aria-hidden="true" /><strong>{marketing.firstDrawOpen ? '30 份' : '首波抽獎'}</strong><span>{marketing.firstDrawOpen ? '抽獎好禮' : marketing.phase === 'unavailable' ? '查看活動辦法' : '資格已截止'}</span></li>
              <li><Users aria-hidden="true" /><strong>季繳優先</strong><span>登記資格</span></li>
              <li><HeartHandshake aria-hidden="true" /><strong>2027</strong><span>臨打優惠</span></li>
            </ul>
            <div ref={heroActionRef} className="hero-actions" id="hero-action">
              <a href="#register" className="marketing-button">{marketing.canRegister ? marketing.actionLabel : '查看登記與活動資訊'}<ArrowRight aria-hidden="true" /></a>
              <a href="#privacy" className="text-link secondary-action">先看資料怎麼用</a>
            </div>
            <p className="hero-qualification">{marketing.qualification}</p>
          </div>
          <MarketingIllustration name="community" alt="四名虛構成年球友在羽球場互相擊掌的概念插畫" priority className="hero-art" />
        </div>
      </section>

      <section id="prizes" className="marketing-section prizes-section">
        <div className="page-shell">
          <div className="section-heading"><p className="eyebrow">FIRST ROUND REWARDS</p><h2>{marketing.firstDrawOpen ? '先抽一波，共 30 份好禮' : '首波抽獎好禮'}</h2><p>{marketing.firstDrawOpen ? '不必先抽中場地，完成首波資格就能參加。' : marketing.phase === 'unavailable' ? '目前暫停收件；獎品與參加資格請見完整活動辦法。' : '首波抽獎資格已截止；以下為原公告獎品，新登記不列入首波名單。'}</p></div>
          <article className="grand-prize">
            <figure>
              <img src={import.meta.env.BASE_URL + 'mizuno-fortius-11-power.jpg'} alt="MIZUNO FORTIUS 系列官方宣傳圖：左為 11 QUICK，右為本次頭獎 11 POWER" width={1080} height={1080} loading="lazy" decoding="async" />
              <figcaption>圖片展示 QUICK 與 POWER 兩款；本次頭獎為 FORTIUS 11 POWER 一支。</figcaption>
            </figure>
            <div className="grand-prize-copy">
              <p className="prize-tag"><Trophy aria-hidden="true" />頭獎 · 1 名 · 1 支</p>
              <p className="eyebrow">MIZUNO 美津濃</p>
              <h3>FORTIUS 11 <span>POWER</span></h3>
              <p>日本製頂級球拍。頭重、硬中管設定，為後場進攻而生。</p>
              <div className="feature-tags"><span>日本製造</span><span>4U · 約 83 g</span><span>攻擊型</span></div>
              <details className="marketing-disclosure">
                <summary>球拍規格與科技</summary>
                <div className="disclosure-body">
                  <dl className="spec-list"><dt>貨號</dt><dd>73JTB11209</dd><dt>拍身長度</dt><dd>675 mm</dd><dt>建議磅數</dt><dd>22–29 lbs</dd><dt>拍框材質</dt><dd>高彈性碳纖維（HM Graphite）＋鎢（Tungsten PP）</dd><dt>中管材質</dt><dd>M FUSION 碳纖維</dd></dl>
                  <p><strong>Aero Groove 拍框溝槽：</strong>透過溝槽設計，減少揮拍風阻。</p><p><strong>Torque Technology（T5）：</strong>強化擊球時的力量傳遞，支援進攻表現。</p>
                  <a href="https://twn.mizuno.com/products/73jtb11209" target="_blank" rel="noopener noreferrer" className="text-link">查看美津濃官方商品資訊</a>
                </div>
              </details>
            </div>
          </article>
          <div className="prize-grid" aria-describedby="prize-illustration-note">
            {prizes.map((prize) => (
              <article key={prize.name} className="prize-card">
                <figure>
                  <img src={import.meta.env.BASE_URL + prize.image} alt={prize.alt} width={1024} height={1024} loading="lazy" decoding="async" className="prize-image" />
                  <figcaption>AI 生成示意圖／非實際獎品</figcaption>
                </figure>
                <div className="prize-card-copy"><h3>{prize.name}</h3><p>{prize.note}<span aria-hidden="true">{prize.count}</span></p></div>
              </article>
            ))}
          </div>
          <p id="prize-illustration-note" className="body-note">四項示意圖非實際獎品；實際款式、顏色、品牌與型號以後續公告為準。各獎品價值、付款與扣繳資料仍待定案。「頂級」與「高級」為活動品項名稱。</p>
          <p className="draw-date-strip">首波資格截至 2026/12/31（含當日，台北時間）<span>抽獎日 2027/01/10</span></p>
          <details className="marketing-disclosure draw-rules">
            <summary id="draw-rules-heading">完整抽獎資格與領獎辦法</summary>
            <div className="disclosure-body">
              <p>{FIRST_DRAW_QUALIFICATION_TEXT}</p>
              <dl className="event-dates"><dt>首波抽獎資格截止</dt><dd>{FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT}</dd><dt>首波抽獎日</dt><dd>{FIRST_DRAW_DATE_TEXT}</dd><dt>場地協助登記截止</dt><dd>{REGISTRATION_DEADLINE_TEXT}</dd></dl>
              <ul><li>每人一次抽獎資格，最多一獎；以隨機方式抽出得獎者。</li><li>以 Email、LINE 通知得獎者；依得獎通知於 14 日內回覆、30 日內領取，逾期遞補。</li><li>資格截止後仍可協助場地登記，但不列入首波抽獎名單；場地協助期限不會延長首波資格。</li></ul>
            </div>
          </details>
        </div>
      </section>

      <section id="benefits" className="marketing-section rewards-section">
        <div className="page-shell">
          <div className="section-heading"><p className="eyebrow">THREE WAYS TO GIVE BACK</p><h2>每一份協助，都有不同的回饋</h2><p>抽獎、球團福利與場地獎金，條件各有不同。</p></div>
          <div className="reward-grid">
            <article className="reward-card"><Gift aria-hidden="true" /><p className="card-overline">完成首波資格</p><h3>{marketing.drawLabel}</h3><p>{marketing.drawReward}</p></article>
            <article className="reward-card"><Users aria-hidden="true" /><p className="card-overline">提供資料、授權並配合程序</p><h3>2027 球團福利</h3><p>季繳優先登記、當年度臨打優惠。優先不保證錄取；名額、優惠金額與適用場次依當期公告。</p></article>
            <article className="reward-card reward-card-dark"><BadgeDollarSign aria-hidden="true" /><p className="card-overline">中籤、完成登記並核對</p><h3>場地協助獎金</h3><p>依年租或季租規則累計，當年度無上限。這是後續場地協助，不是首波抽獎資格的前提。</p><a href="#court-bonus" className="text-link">查看獎金怎麼算<ArrowRight aria-hidden="true" /></a></article>
          </div>
        </div>
      </section>

      <section id="how" className="marketing-section purpose-section">
        <div className="page-shell">
          <div className="section-heading"><p className="eyebrow">A COURT TO CALL OURS</p><h2>讓每週見面的地方，<span>多一點確定</span></h2><p>曜日是為 LGBTQ+ 社群打造的羽球團。臺北固定場地不易募集，你願意在清楚範圍內提供協助，就讓我們多一次爭取安心打球空間的機會。</p></div>
          <div className="participation-grid">
            <article className="participation-card"><MarketingIllustration name="registration" alt="虛構成年人用手機閱讀與填寫資料的概念插畫" /><div><p className="card-overline">01 · 先了解，再決定</p><h3>你提供資料與授權</h3><p>先看用途與範圍，願意參與再填寫；閱讀全文、主動同意後，取得成功回條。</p></div></article>
            <article className="participation-card"><MarketingIllustration name="court-support" alt="虛構成年人與空白日曆、羽球場模型的概念插畫" /><div><p className="card-overline">02 · 一起完成申請</p><h3>球團申請，你配合必要程序</h3><p>球團依授權協助抽籤；本人完成必要驗證，中籤後再配合登記。提供資料不保證中籤。</p></div></article>
          </div>
        </div>
      </section>

      <section id="venues" className="marketing-section venues-section">
        <div className="page-shell venue-bonus-layout">
          <div>
            <div className="section-heading"><p className="eyebrow">OUR COURT PLAN</p><h2>一起爭取的 13 個地方</h2><p>全部場館均在本次授權範圍內，清單僅作告知、不提供個別選擇。新增場館須另行同意。</p></div>
            <ul className="venue-names">{AUTHORIZED_VENUES.map((name) => <li key={name}>{name}</li>)}</ul>
            <details className="marketing-disclosure"><summary>場館營運、申請方式與授權範圍</summary><div className="disclosure-body"><p>{VENUE_NOTICE_TEXT}</p><p>{CROSS_VENUE_NOTICE_TEXT}</p><p>運動／活動中心共 7 處，受理單位與申請流程依各中心公告；其中臺北市民生社區中心依該中心公告。學校共 6 所，由校方或指定單位受理，依照學校官方公告辦理。</p><a href="#supplemental-notice" className="text-link">了解新增場館的人工補充授權</a></div></details>
          </div>
          <div id="court-bonus" className="court-bonus">
            <p className="eyebrow">SUCCESS BONUS</p><h3>中籤並完成登記，<span>協助也有回饋</span></h3>
            <div className="bonus-grid"><article><p>年租型 · 每中籤一次</p><strong>NT$2,000</strong></article><article><p>季租型 · 每中籤一面固定場地</p><strong>NT$500</strong></article></div>
            <p>季租按面數疊加，例如中籤 3 面為 NT$1,500。當年度累計無上限；場地登記完成並核對後，於 30 日內匯款。</p>
            <p className="body-note">場地協助登記至 2027/12/31。須完成場館要求的驗證、繳費與文件，未逾期、未放棄且資格仍有效，才可取得回饋。</p>
          </div>
        </div>
      </section>

      <section id="register" ref={entryRef} className="marketing-section registration-section">
        <div className="page-shell reading-shell">
          <div id="privacy" className="section-heading"><p className="eyebrow"><ShieldCheck aria-hidden="true" /> BEFORE YOU JOIN</p><h2>資料怎麼用，<span>先說清楚</span></h2><p>這是一份自願協助。了解必要資料與授權範圍後，再決定是否加入。</p></div>
          <RegistrationEntry state={registrationState} actionLabel={marketing.actionLabel}>
            <div className="disclosure-stack">
              <details className="marketing-disclosure" id="privacy-notice"><summary>閱讀完整個資告知事項（10 項）</summary><div className="disclosure-body">
                <p>告知與同意版本：{CONSENT_VERSION}。以下是表單所稱的「個資告知事項」，全文與 v16 正式表單相同。</p>
                {PRIVACY_NOTICE_ITEMS.map((item) => <div key={item.id} id={'privacy-' + item.id} className="privacy-item"><h3>{item.title}</h3>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{'sourceLinks' in item && <div><p>服務商公開政策</p><ul>{item.sourceLinks.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-link">{source.label}</a></li>)}</ul></div>}</div>)}
              </div></details>
              <details id="withdrawal" className="marketing-disclosure"><summary>如何行使個資權利或終止授權？</summary><div className="disclosure-body"><p>可查詢、閱覽、取得複製本、補充或更正、請求停止蒐集處理利用，以及請求刪除；這些權利不能預先放棄或以約定限制。</p>{REVOCATION_NOTICE.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></details>
            </div>
            <div className="withdrawal-contact"><p><strong>想終止授權或有疑問？</strong>可私訊曜日報名系統或阿定，人工核對後回覆處理；既有場館會員或租約不會自動取消。</p><AuthorizationContactLinks /></div>
          </RegistrationEntry>
        </div>
      </section>

      <footer className="site-footer"><div className="page-shell"><a href="#top" className="brand"><span className="brand-mark">曜</span><span><strong>曜日羽球</strong><small>SOLAR BADMINTON</small></span></a><div><p>資料管理負責人：{CONTACTS.managerName}</p><a href={CONTACTS.managerPhoneHref}>{CONTACTS.managerPhone}</a><a href="#privacy">個資告知</a><a href="#withdrawal">終止授權</a></div></div></footer>
      <MobileRegistrationCta heroRef={heroActionRef} entryRef={entryRef} label={marketing.actionLabel} enabled={marketing.canRegister} />
    </main>
  );
}

function MarketingIllustration({ name, alt, priority = false, className = '' }: { name: 'community' | 'registration' | 'court-support'; alt: string; priority?: boolean; className?: string }) {
  return <figure className={'marketing-illustration ' + className}><img src={import.meta.env.BASE_URL + 'marketing/' + name + '-illustration-v1.webp'} alt={alt} width={1024} height={1024} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} /><figcaption>AI 概念插畫，非實際球友或場地</figcaption></figure>;
}
