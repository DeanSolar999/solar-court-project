import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { RegistrationLink } from '@/components/registration-link';
import type { RegistrationState } from '@/lib/registration-config';

export function RegistrationEntry({ state, actionLabel, children }: { state: RegistrationState; actionLabel: string; children: ReactNode }) {
  return (
    <div className="registration-entry" aria-label="正式登記入口">
      <div className="reading-summary">
        <p>你提供的資料會用於本次抽獎與通知，以及公告 13 個場館的帳號代辦與場地申請。若尚未註冊運動中心帳號，球團可依授權代辦；僅在場館規則允許時，由你與球團指定管理人員共同使用你名義下的帳號。</p>
        <p>授權從你同意當日起至 2027/12/31，你也可以提前申請終止。若日後新增場館或學校，我們會另行說明，取得你明確同意後才使用資料申請。</p>
        <p className="body-note">正式填寫會需要身分證字號及聯絡資料；本頁不收個資，正式表單不收密碼或驗證碼。</p>
      </div>
      {children}
      <div className="final-registration-action">
        {state.status !== 'open' && <p role="status" className="body-note">{state.message}</p>}
        <RegistrationLink state={state} className="marketing-button">{state.status === 'open' ? '開始填寫資料' : actionLabel}<ArrowRight aria-hidden="true" /></RegistrationLink>
        <p className="body-note">將前往 Google 託管表單；本次不會在活動網站輸入資料。</p>
      </div>
    </div>
  );
}
