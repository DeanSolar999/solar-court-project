import { ArrowRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { RegistrationLink } from '@/components/registration-link';
import { ACCOUNT_USE_NOTICE, CONSENT_ITEMS, CONSENT_VERSION, CONTACTS, SUPPLEMENTAL_AUTHORIZATION_NOTICE } from '@/lib/consent';
import type { RegistrationState } from '@/lib/registration-config';

export function RegistrationEntry({ state, actionLabel, children }: { state: RegistrationState; actionLabel: string; children: ReactNode }) {
  return (
    <div className="registration-entry" aria-label="正式登記入口">
      <div className="reading-summary">
        <p><strong>會提供什麼：</strong>本名、身分證字號、手機號碼、Email、LINE ID、暱稱及場館帳號註冊狀態為必填；推薦人選填。本頁不收個資。</p>
        <p><strong>會如何使用：</strong>用於抽獎與聯絡、公告 13 館的帳號代辦與場地申請。僅於營運單位允許時，由本人與球團指定管理人員共同操作本人名義的帳號。</p>
        <p><strong>需要你配合：</strong>驗證、繳費、簽約與切結仍由本人依通知完成。一般授權至 2027/12/31，可提前申請終止；本表單不收密碼或驗證碼。</p>
      </div>
      <p className="body-note">開始填寫前，可先閱讀下方全文。正式表單仍採「填寫 → 閱讀全文 → 確認同意 → 送出」。</p>
      <div className="disclosure-stack">
        <details className="marketing-disclosure">
          <summary>四項同意內容與正式填寫流程</summary>
          <div className="disclosure-body">
            <p>以下是同意預覽，不是在此頁勾選。填好資料後，閱讀完整 10 項個資與授權告知、場館清單及活動辦法，捲動至底部，再自行勾選四項同意；不會預先替你同意。</p>
            <ol className="consent-preview">
              {CONSENT_ITEMS.map((consent, index) => <li key={consent.key}><h4>{index + 1}. {consent.title}</h4><p>{consent.text}</p></li>)}
            </ol>
            <p>捲動至底部只是填寫流程的一部分，不代表已同意；請以 Google 表單回傳的收件回條確認登記成功。</p>
            <p>推薦人暱稱或推薦碼為選填；請勿提供他人的真實姓名、電話或其他個資。</p>
            <a href="#privacy" className="text-link">閱讀完整個資告知</a>
            <p>告知與同意版本：{CONSENT_VERSION}</p>
          </div>
        </details>
        <details className="marketing-disclosure">
          <summary>帳號代辦、預設密碼與共同使用說明</summary>
          <div className="disclosure-body">{ACCOUNT_USE_NOTICE.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a href="#withdrawal" className="text-link">停止代辦或終止共同使用授權</a></div>
        </details>
        <details id="supplemental-notice" className="marketing-disclosure">
          <summary>新增場館，如何另行取得你的同意？</summary>
          <div className="disclosure-body">{SUPPLEMENTAL_AUTHORIZATION_NOTICE.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}<a href={CONTACTS.communityUrl} target="_blank" rel="noreferrer" className="text-link">加入「曜日大家庭」LINE 社群</a></div>
        </details>
      </div>
      {children}
      <div className="final-registration-action">
        {state.status !== 'open' && <p role="status" className="body-note">{state.message}</p>}
        <RegistrationLink state={state} className="marketing-button">{actionLabel}<ArrowRight aria-hidden="true" /></RegistrationLink>
        <p className="body-note">將前往 Google 託管表單；本次不會在活動網站輸入資料。</p>
      </div>
    </div>
  );
}
