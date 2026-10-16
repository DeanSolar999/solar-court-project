import { useState, type RefObject } from 'react';
import { RegistrationLink } from '@/components/registration-link';
import type { RegistrationState } from '@/lib/registration-config';
import type { getMarketingContent } from '@/lib/marketing-content';

export function WarmCampaignHero({ state, marketing, heroActionRef, detailsHref }: {
  state: RegistrationState;
  marketing: ReturnType<typeof getMarketingContent>;
  heroActionRef: RefObject<HTMLDivElement | null>;
  detailsHref: string;
}) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <><div className={'warm-scene' + (imageFailed ? ' warm-scene-fallback' : '')}>
      <div className="warm-introduction">
        <h1>讓我們有一個 可以一起打球的地方</h1>
        <p>你的一份支持，讓曜日球友多一次相聚的機會。</p>
      </div>
      {!imageFailed && <picture className="warm-picture" aria-hidden="true">
        <source media="(min-width: 1024px)" srcSet={import.meta.env.BASE_URL + 'marketing/warm-home-desktop-v1.webp'} width={1536} height={1024} />
        <img src={import.meta.env.BASE_URL + 'marketing/warm-home-mobile-v1.webp'} width={941} height={1672} alt="" loading="eager" fetchPriority="high" decoding="async" onError={() => setImageFailed(true)} />
      </picture>}
      <a href="#prizes" className={'warm-hotspot warm-prizes' + (!marketing.firstDrawOpen ? ' warm-state-covered' : '')}>
        <span className="warm-link-label"><strong>{marketing.firstDrawOpen ? '30 份' : '首波抽獎'}</strong><span>{marketing.firstDrawOpen ? '抽獎好禮' : marketing.phase === 'unavailable' ? '查看活動辦法' : '資格已截止'}</span></span>
      </a>
      <a href="#priority-benefit" className="warm-hotspot warm-priority"><span className="warm-link-label"><strong>季繳優先</strong><span>登記資格</span></span></a>
      <a href="#discount-benefit" className="warm-hotspot warm-discount"><span className="warm-link-label"><strong>2027</strong><span>臨打優惠</span></span></a>
      <div ref={heroActionRef} className="warm-registration" id="hero-action">
        <RegistrationLink state={state} className="warm-registration-link"><span className="warm-link-label">{state.status === 'open' ? '開始登記' : marketing.actionLabel}</span></RegistrationLink>
      </div>
    </div><div className="warm-details-row"><a href={detailsHref} className="text-link warm-details">閱讀活動說明</a></div></>
  );
}
