const detailHashes = new Set(['privacy', 'privacy-notice', 'withdrawal', 'supplemental-notice', 'venues', 'court-bonus', 'draw-rules-heading', 'how', 'racket-specifications', 'activity-rules', 'details-top']);

export function getPageView(search: string, hash: string): 'home' | 'details' {
  if (new URLSearchParams(search).get('view') === 'details') return 'details';
  let id: string;
  try { id = decodeURIComponent(hash.replace(/^#/, '')); } catch { return 'home'; }
  return detailHashes.has(id) || id.startsWith('privacy-') ? 'details' : 'home';
}
