import { useEffect, useState, type RefObject } from 'react';
import { ArrowRight } from 'lucide-react';
import { RegistrationLink } from '@/components/registration-link';
import type { RegistrationState } from '@/lib/registration-config';

export function MobileRegistrationCta({ heroRef, entryRef, label, enabled, state }: {
  heroRef: RefObject<HTMLDivElement | null>;
  entryRef: RefObject<HTMLElement | null>;
  label: string;
  enabled: boolean;
  state: RegistrationState;
}) {
  const [heroPassed, setHeroPassed] = useState(false);
  const [entryVisible, setEntryVisible] = useState(false);
  const [focusObstructed, setFocusObstructed] = useState(false);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const hero = heroRef.current;
    const entry = entryRef.current;
    const heroObserver = new IntersectionObserver(([item]) => {
      setHeroPassed(!item.isIntersecting && item.boundingClientRect.bottom <= 72);
    }, { rootMargin: '-72px 0px 0px', threshold: 0 });
    const entryObserver = new IntersectionObserver(([item]) => setEntryVisible(item.isIntersecting), { threshold: 0 });
    if (hero) heroObserver.observe(hero);
    if (entry) entryObserver.observe(entry);

    const checkFocus = () => {
      const viewport = window.visualViewport;
      const height = viewport?.height ?? window.innerHeight;
      const active = document.activeElement;
      const keyboardOpen = height < window.innerHeight * 0.78;
      const editing = active instanceof HTMLElement && active.matches('input, textarea, select, [contenteditable="true"]');
      const focusAtBottom = active instanceof HTMLElement && active !== document.body
        && !active.closest('.mobile-sticky-cta') && active.getBoundingClientRect().bottom > height - 104;
      setFocusObstructed(keyboardOpen || editing || focusAtBottom);
    };
    document.addEventListener('focusin', checkFocus);
    document.addEventListener('focusout', checkFocus);
    window.addEventListener('scroll', checkFocus, { passive: true });
    window.visualViewport?.addEventListener('resize', checkFocus);
    checkFocus();
    return () => {
      heroObserver.disconnect();
      entryObserver.disconnect();
      document.removeEventListener('focusin', checkFocus);
      document.removeEventListener('focusout', checkFocus);
      window.removeEventListener('scroll', checkFocus);
      window.visualViewport?.removeEventListener('resize', checkFocus);
    };
  }, [heroRef, entryRef]);

  if (!enabled || !heroPassed || entryVisible || focusObstructed) return null;
  return <div className="mobile-sticky-cta"><RegistrationLink state={state} className="marketing-button">{label}<ArrowRight aria-hidden="true" /></RegistrationLink></div>;
}
