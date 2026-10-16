export function OfficialBrand({ homeHref, footer = false }: { homeHref: string; footer?: boolean }) {
  return <a href={homeHref} className={'official-brand' + (footer ? ' official-brand-footer' : '')} aria-label="曜日羽球活動首頁"><img src={import.meta.env.BASE_URL + 'brand/solar-badminton-logo.svg'} width={657} height={683} alt="Solar Badminton 曜日羽球團官方 LOGO" /></a>;
}

export function CampaignIcon({ name }: { name: 'draw' | 'priority' | 'discount' | 'bonus' | 'community' }) {
  return <img className="campaign-icon" src={import.meta.env.BASE_URL + 'icons/' + name + '-warm-v1.webp'} width={640} height={640} alt="" aria-hidden="true" loading="lazy" decoding="async" />;
}

export function MarketingIllustration({ name, alt, priority = false, className = '' }: { name: 'community' | 'registration' | 'court-support'; alt: string; priority?: boolean; className?: string }) {
  return <figure className={'marketing-illustration ' + className}><img src={import.meta.env.BASE_URL + 'marketing/' + name + '-illustration-warm-v1.webp'} alt={alt} width={1024} height={1024} loading={priority ? 'eager' : 'lazy'} decoding="async" fetchPriority={priority ? 'high' : 'auto'} /><figcaption>AI 概念插畫，非實際球友或場地</figcaption></figure>;
}
