import { AlertCircle, ArrowRight, CalendarDays, ExternalLink, FileCheck2, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RegistrationLink } from '@/components/registration-link';
import { AuthorizationContactLinks } from '@/components/authorization-contact-links';
import { ACCOUNT_USE_NOTICE, CONSENT_ITEMS, CONSENT_VERSION, CONTACTS, FIRST_DRAW_QUALIFICATION_TEXT, SUPPLEMENTAL_AUTHORIZATION_NOTICE } from '@/lib/consent';
import { FIRST_DRAW_DATE_TEXT, FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT, REGISTRATION_DEADLINE_TEXT, type RegistrationState } from '@/lib/registration-config';

const requiredFields = ['本名', '身分證字號', '手機號碼', 'Email', 'LINE ID', '暱稱', '場館帳號註冊狀態'];

export function RegistrationEntry({ state }: { state: RegistrationState }) {
  return (
    <div className="space-y-7" aria-label="正式登記入口">
      <Alert className="rounded-2xl border-amber-300 bg-amber-50 p-4 text-amber-950">
        <AlertCircle />
        <AlertTitle className="font-black">{state.message}</AlertTitle>
        <AlertDescription className="leading-6 text-amber-900/75">
          {state.status === 'preparing'
            ? '首波日期與部分活動規則已確認；獎品價值、付款與扣繳資料、資料利用地區仍待補齊。完整辦法公告並完成表單驗收後才開放，開始日期另行公告，目前請勿提供個人資料。'
            : state.status === 'closed'
              ? '登記入口已關閉。如需查詢既有登記或行使個資權利，請聯絡資料管理負責人。'
              : '請在 Google 託管表單完成填寫與同意，並確認收到收件回條。'}
        </AlertDescription>
      </Alert>

      <section aria-labelledby="registration-details-heading">
        <p className="form-step">REGISTRATION DETAILS</p>
        <h3 id="registration-details-heading" className="mt-2 text-2xl font-black text-ink">Google 託管表單登記入口</h3>
        <p className="mt-3 text-sm font-medium leading-7 text-ink/60">這個 GitHub 頁面只提供活動公告與登記入口，不提供個資輸入欄位。正式登記會在獨立的 Google 託管表單填寫，由曜日羽球團透過 Google 服務處理並儲存於非公開名單。</p>
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-green/15 bg-green/5 p-4">
          <CalendarDays className="mt-0.5 size-5 shrink-0 text-green" />
          <div className="text-sm leading-6"><strong className="block text-ink">場地協助登記至 {REGISTRATION_DEADLINE_TEXT}</strong><p className="mt-1 font-medium text-ink/60">開始日以完整辦法公告、表單驗收及正式上線為準。{state.status === 'preparing' ? '目前尚未開放。' : state.status === 'closed' ? '登記期間已結束。' : ''}</p></div>
        </div>
        <p className="mt-3 text-sm font-medium leading-7 text-ink/65">首波抽獎資格截至 {FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT}，抽獎日為 {FIRST_DRAW_DATE_TEXT}。資格截止後仍可協助場地登記，但不列入首波抽獎名單。<a href="#draw-rules-heading" className="ml-1 font-bold text-green underline underline-offset-4">查看抽獎與領獎辦法</a></p>
        <p className="mt-3 text-sm font-medium leading-7 text-ink/65">{FIRST_DRAW_QUALIFICATION_TEXT}</p>
      </section>

      <section aria-labelledby="registration-fields-heading" className="border-t border-ink/10 pt-6">
        <h4 id="registration-fields-heading" className="flex items-center gap-2 text-base font-black"><FileCheck2 className="size-5 text-green" />正式表單需要的資料</h4>
        <p className="mt-3 text-sm font-medium leading-6 text-ink/60">以下 7 項為必填，請於正式開放後在 Google 託管表單填寫：</p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {requiredFields.map((field, index) => (
            <li key={field} className="flex items-center gap-2.5 rounded-xl bg-white px-3 py-3 text-sm font-bold text-ink/75"><span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime/70 font-mono text-[10px] text-ink" aria-hidden="true">{index + 1}</span>{field}</li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-medium leading-6 text-ink/60">推薦人暱稱或推薦碼為選填；請勿提供他人的真實姓名、電話或其他個資。</p>
      </section>

      <section aria-labelledby="registration-consents-heading" className="border-t border-ink/10 pt-6">
        <h4 id="registration-consents-heading" className="flex items-center gap-2 text-base font-black"><ShieldCheck className="size-5 text-green" />在正式表單確認四項同意</h4>
        <p className="mt-3 text-sm font-medium leading-7 text-ink/65">以下是同意內容預覽，不是在此頁勾選。正式開放後，請在 Google 託管表單閱讀並主動勾選；不會預先替你同意。</p>
        <ol className="mt-4 space-y-3 text-sm text-ink/70">
          {CONSENT_ITEMS.map((consent, index) => (
            <li key={consent.key} className="rounded-xl border border-ink/10 bg-white p-4">
              <details>
                <summary className="cursor-pointer font-black text-ink">{index + 1}. {consent.title}<span className="mt-2 block text-sm font-medium leading-6 text-ink/65">{consent.summary}</span></summary>
                <p className="mt-3 border-t border-ink/10 pt-3 text-sm font-medium leading-7">{consent.text}</p>
              </details>
            </li>
          ))}
        </ol>
        <a href="#privacy" className="mt-4 inline-block text-sm font-black text-green underline underline-offset-4">閱讀完整《個人資料蒐集、處理及利用告知事項》</a>
        <p className="mt-4 text-sm font-medium leading-6 text-ink/60">限年滿 18 歲者參加。本次授權適用公告的全部 13 個場館與學校，清單僅作告知，不提供個別選擇。<a href="#venues" className="ml-1 font-bold text-green underline underline-offset-4">查看適用清單</a></p>
        <p className="mt-2 text-xs font-medium leading-6 text-ink/45">目前告知與同意版本：{CONSENT_VERSION}。正式送出前，請在 Google 託管表單閱讀完整告知與活動辦法。</p>
        <details className="mt-4 rounded-xl border border-green/20 bg-green/5 p-4">
          <summary className="cursor-pointer text-sm font-black text-green">帳號代辦與共同使用說明</summary>
          <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-ink/70">
            {ACCOUNT_USE_NOTICE.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <a href="#withdrawal" className="inline-block font-bold text-green underline underline-offset-4">如何停止代辦或終止共同使用授權</a>
          </div>
        </details>
      </section>

      <div className="rounded-[1.4rem] bg-ink p-5 text-white">
        <p className="font-black">{state.message}</p>
        <RegistrationLink state={state} className="mt-4 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-center text-sm font-black text-ink transition-colors hover:bg-lime/90 disabled:cursor-not-allowed disabled:opacity-55">
          {state.status === 'open' ? <><ExternalLink className="size-4" />前往 Google 託管表單</> : state.status === 'closed' ? '登記期間已結束' : '尚未開放收件'}
        </RegistrationLink>
        <p className="mt-3 text-xs font-medium leading-6 text-white/60">填寫與送出都在 Google 託管表單完成；請以表單回傳的收件回條確認結果。</p>
      </div>

      <p className="flex items-start gap-2 text-xs font-medium leading-6 text-ink/65"><LockKeyhole className="mt-1 size-4 shrink-0 text-green" />本表單不收集帳號密碼、簡訊驗證碼或一次性驗證碼。</p>
      <div id="supplemental-notice" className="scroll-mt-28 rounded-2xl border border-green/15 bg-green/5 p-4 sm:p-5">
        <p className="flex items-center gap-2 text-sm font-black text-ink"><Mail className="size-4 text-green" />新增場館，另行取得你的同意</p>
        <div className="mt-3 space-y-3 text-sm font-medium leading-7 text-ink/70">
          {SUPPLEMENTAL_AUTHORIZATION_NOTICE.slice(0, 2).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <details>
            <summary className="cursor-pointer font-bold text-green">人工補充授權如何辦理？</summary>
            <p className="mt-2">{SUPPLEMENTAL_AUTHORIZATION_NOTICE[2]}</p>
          </details>
        </div>
        <AuthorizationContactLinks />
        <a href={CONTACTS.communityUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-black text-green underline underline-offset-4">加入「曜日大家庭」LINE 社群<ArrowRight className="size-4" /></a>
      </div>
    </div>
  );
}
