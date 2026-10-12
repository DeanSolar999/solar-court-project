import type { ReactNode } from 'react';
import { getRegistrationState, type RegistrationState } from '@/lib/registration-config';

export function RegistrationLink({ state, className, children }: {
  state: RegistrationState;
  className?: string;
  children: ReactNode;
}) {
  if (state.status !== 'open' || !state.formUrl) {
    return <button type="button" disabled className={className} aria-label={state.message}>{children}</button>;
  }

  return (
    <a
      href={state.formUrl}
      className={className}
      rel="noreferrer"
      onClick={(event) => {
        // Recheck if a page was left open past the deadline.
        const current = getRegistrationState();
        if (current.status !== 'open' || current.formUrl !== state.formUrl) event.preventDefault();
      }}
    >{children}</a>
  );
}
