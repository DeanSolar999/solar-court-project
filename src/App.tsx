import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import { RegistrationLink } from '@/components/registration-link';
import { MobileRegistrationCta } from '@/components/mobile-registration-cta';
import { CampaignIcon, MarketingIllustration, OfficialBrand } from '@/components/campaign-visuals';
import { ActivityDetails } from '@/pages/activity-details';
import { CONTACTS } from '@/lib/consent';
import { getRegistrationState, REGISTRATION_CLOSES_AT } from '@/lib/registration-config';
import { FIRST_DRAW_CLOSES_AT, getMarketingContent } from '@/lib/marketing-content';
import { getPageView } from '@/lib/page-view';

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

const detailsHref = (id = 'details-top') => import.meta.env.BASE_URL + '?view=details#' + id;
const headerTagline = '2027 場地募集 · LGBTQ+ 羽球社群';

export default function Home() {
  const [now, setNow] = useState(() => Date.now());
  const [headlineImageFailed, setHeadlineImageFailed] = useState(false);
  const [location, setLocation] = useState(() => ({ search: window.location.search, hash: window.location.hash }));
  const pageView = getPageView(location.search, location.hash);
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

  useEffect(() => {
    const syncLocation = () => setLocation({ search: window.location.search, hash: window.location.hash });
    window.addEventListener('hashchange', syncLocation);
    window.addEventListener('popstate', syncLocation);
    return () => { window.removeEventListener('hashchange', syncLocation); window.removeEventListener('popstate', syncLocation); };
  }, []);

  // Legacy notice links route to the independent document, not hidden homepage content.
  useEffect(() => {
    if (pageView === 'details' && new URLSearchParams(window.location.search).get('view') !== 'details') {
      const url = new URL(window.location.href);
      url.searchParams.set('view', 'details');
      window.history.replaceState(window.history.state, '', url);
    }
    let id: string;
    try { id = decodeURIComponent(location.hash.slice(1)); } catch { return; }
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    let node: HTMLElement | null = target;
    while (node) {
      if (node instanceof HTMLDetailsElement) node.open = true;
      node = node.parentElement;
    }
    const frame = requestAnimationFrame(() => target.scrollIntoView({ block: 'start' }));
    return () => cancelAnimationFrame(frame);
  }, [pageView, location.hash]);

  const homeHref = import.meta.env.BASE_URL;
  return (
    <main className={'marketing-page campaign-page ' + (pageView === 'details' ? 'document-view' : 'home-view')}>
      <a href={pageView === 'details' ? '#details-top' : '#top'} className="skip-link">跳至主要內容</a>
      <header className="site-header"><div className="page-shell header-inner">
        <div className="header-brand-group"><OfficialBrand homeHref={homeHref} /><p className="header-tagline">{headerTagline.split(' · ').map((line, index) => <span key={line}>{index > 0 && <span className="header-tagline-divider"> · </span>}{line}</span>)}</p></div>
        <nav className="desktop-nav" aria-label="主要導覽"><a href={homeHref + '#prizes'}>抽獎好禮</a><a href={homeHref + '#benefits'}>參與回饋</a><a href={detailsHref()}>完整活動說明</a></nav>
        <RegistrationLink state={registrationState} className="header-action">{registrationState.status === 'open' ? '參與計畫' : marketing.actionLabel}<ArrowRight aria-hidden="true" /></RegistrationLink>
      </div></header>

      {pageView === 'details' ? <ActivityDetails state={registrationState} marketing={marketing} /> : <>
      <section id="top" className="marketing-hero">
        <div className="page-shell hero-layout"><div className="hero-copy">
          <h1 className="hero-rainbow-headline" aria-label="讓我們有一個 可以一起打球的地方">
            {headlineImageFailed ? <span className="headline-fallback" aria-hidden="true">讓我們有一個<span>可以一起</span><span>打球的地方</span></span> : <img src={import.meta.env.BASE_URL + 'marketing/hero-rainbow-headline-v1.webp'} width={1200} height={800} alt="" aria-hidden="true" loading="eager" fetchPriority="high" decoding="async" onError={() => setHeadlineImageFailed(true)} />}
          </h1>
          <p className="hero-description">你的一份支持，讓曜日球友多一次相聚的機會。</p>
          <ul className="hero-benefits" aria-label="參與亮點">
            <li><CampaignIcon name="draw" /><strong>{marketing.firstDrawOpen ? '30 份' : '首波抽獎'}</strong><span>{marketing.firstDrawOpen ? '抽獎好禮' : marketing.phase === 'unavailable' ? '查看活動辦法' : '資格已截止'}</span></li>
            <li><CampaignIcon name="priority" /><strong>季繳優先</strong><span>登記資格</span></li><li><CampaignIcon name="discount" /><strong>2027</strong><span>臨打優惠</span></li>
          </ul>
          <div ref={heroActionRef} className="hero-actions" id="hero-action">
            <RegistrationLink state={registrationState} className="marketing-button">{marketing.actionLabel}<ArrowRight aria-hidden="true" /></RegistrationLink>
            <a href={detailsHref('privacy')} className="text-link secondary-action">先看資料怎麼用</a>
          </div>
          <p className="hero-qualification">{marketing.qualification}</p>
        </div><MarketingIllustration name="community" alt="四名虛構成年男性球友在羽球場相聚，包含斯文與肉壯大叔形象的概念插畫" priority className="hero-art" /></div>
      </section>

      <section id="prizes" className="marketing-section prizes-section">
        <div className="page-shell">
          <div className="section-heading icon-heading"><CampaignIcon name="draw" /><div><p className="eyebrow">FIRST ROUND REWARDS</p><h2>{marketing.firstDrawOpen ? '先抽一波，共 30 份好禮' : '首波抽獎好禮'}</h2><p>{marketing.firstDrawOpen ? '不必先抽中場地，完成首波資格就能參加。' : marketing.phase === 'unavailable' ? '目前暫停收件；獎品與參加資格請見完整活動辦法。' : '首波抽獎資格已截止；以下為原公告獎品，新登記不列入首波名單。'}</p></div></div>
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
              <a href={detailsHref('racket-specifications')} className="text-link">查看完整球拍規格</a>
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
          <a href={detailsHref('draw-rules-heading')} className="text-link">查看完整抽獎資格與領獎辦法</a>
        </div>
      </section>

      <section id="benefits" className="marketing-section rewards-section">
        <div className="page-shell">
          <div className="section-heading"><p className="eyebrow">THANK YOU FOR BEING HERE</p><h2>你的支持，也有回饋</h2></div>
          <div className="reward-grid compact-rewards">
            <article className="reward-card"><CampaignIcon name="priority" /><h3>季繳優先登記</h3><p>提供資料、授權並配合程序</p></article>
            <article className="reward-card"><CampaignIcon name="discount" /><h3>當年度臨打優惠</h3><p>2027 球團福利</p></article>
            <article className="reward-card reward-card-dark"><CampaignIcon name="bonus" /><h3>場地協助獎金</h3><p>中籤、完成登記並核對</p><dl className="compact-bonus"><dt>年租型 · 每中籤一次</dt><dd>NT$2,000</dd><dt>季租型 · 每中籤一面固定場地</dt><dd>NT$500</dd></dl></article>
          </div>
          <p className="body-note">季繳優先登記、當年度臨打優惠。優先不保證錄取；名額、優惠金額與適用場次依當期公告。</p>
          <a href={detailsHref('court-bonus')} className="text-link">查看場地獎金與回饋條件</a>
        </div>
      </section>

      <section id="register" ref={entryRef} className="marketing-section invitation-section">
        <div className="page-shell invitation-layout"><CampaignIcon name="community" />
          <div><p className="eyebrow">SEE YOU ON COURT</p><h2>一起，把相聚留在球場上。</h2><p>從你的一份支持開始。</p>
            <div className="invitation-actions"><RegistrationLink state={registrationState} className="marketing-button">{registrationState.status === 'open' ? '開始填寫資料' : marketing.actionLabel}<ArrowRight aria-hidden="true" /></RegistrationLink><a href={detailsHref()} className="text-link">完整活動、資料與授權說明</a></div>
            <p className="body-note">將前往 Google 託管表單；本次不會在活動網站輸入資料。</p>
          </div>
        </div>
      </section>
      </>}

      <footer className="site-footer"><div className="page-shell"><OfficialBrand homeHref={homeHref} footer /><div><p>資料管理負責人：{CONTACTS.managerName}</p><a href={CONTACTS.managerPhoneHref}>{CONTACTS.managerPhone}</a><a href={detailsHref('privacy')}>個資告知</a><a href={detailsHref('withdrawal')}>終止授權</a><a href={homeHref}>返回首頁</a></div></div></footer>
      {pageView === 'home' && <MobileRegistrationCta heroRef={heroActionRef} entryRef={entryRef} label={marketing.actionLabel} enabled={marketing.canRegister} state={registrationState} />}
    </main>
  );
}
