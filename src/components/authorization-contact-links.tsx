import { MessageCircle } from 'lucide-react';
import { CONTACTS } from '@/lib/consent';

export function AuthorizationContactLinks() {
  return (
    <div className="mt-4 flex flex-col items-start gap-3 text-sm">
      <a href={CONTACTS.registrationSystemUrl} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-green/20 bg-white px-3 py-2 font-black text-green underline underline-offset-4">
        <MessageCircle className="size-4 shrink-0" />{CONTACTS.registrationSystemName}
      </a>
      <p className="font-bold text-ink/70">球團負責人 {CONTACTS.responsiblePerson}：LINE ID <span className="select-all font-mono text-green">{CONTACTS.lineId}</span></p>
    </div>
  );
}
