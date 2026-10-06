import { useState } from 'react';
import { AlertCircle, CheckCircle2, Database, ExternalLink, LockKeyhole, Mail } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  ACCOUNT_CREATION_CONSENT_TEXT,
  AUTHORIZED_VENUES,
  CONSENT_VERSION,
  PRIVACY_CONSENT_TEXT,
  RULES_ACKNOWLEDGEMENT_TEXT,
  SCOPE_CONSENT_TEXT,
} from '@/lib/consent';
import {
  type RegistrationErrors,
  type RegistrationFields,
  validateRegistrationFields,
} from '@/lib/registration-validation';

const initialValues: RegistrationFields = {
  fullName: '',
  nationalId: '',
  phone: '',
  email: '',
  lineId: '',
  nickname: '',
  referrer: '',
  accountStatus: '',
};

function fieldClass(error?: string) {
  return `h-12 bg-white px-4 ${error ? 'border-red-400 focus-visible:ring-red-300' : ''}`;
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return <p id={id} className="text-xs font-bold leading-5 text-red-600">{message}</p>;
}

export function RegistrationForm() {
  const [values, setValues] = useState<RegistrationFields>(initialValues);
  const [errors, setErrors] = useState<RegistrationErrors>({});
  const [consents, setConsents] = useState({ privacy: false, scope: false, accountCreation: false, rules: false });
  const [status, setStatus] = useState<'idle' | 'preview' | 'error'>('idle');
  const [message, setMessage] = useState('');

  function updateValue(key: keyof RegistrationFields, value: string) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validatePreview() {
    setMessage('');

    const fieldErrors = validateRegistrationFields(values);
    setErrors(fieldErrors);
    if (Object.keys(fieldErrors).length > 0) {
      setStatus('error');
      setMessage('請檢查紅字標示的欄位。這是本頁格式檢查，資料不會儲存或送出。');
      return;
    }
    if (!consents.privacy || !consents.scope || !consents.accountCreation || !consents.rules) {
      setStatus('error');
      setMessage('正式開放時需閱讀並勾選四項必要同意。目前僅供預覽，不會成立登記或送出資料。');
      return;
    }

    setStatus('preview');
    setMessage('填寫格式檢查完成。目前尚未正式收件，資料未儲存、未送出，也未成立登記。');
  }

  return (
    // This preview has no native form, so Enter, submit(), and requestSubmit()
    // cannot initiate a browser submission. Inputs exist only in React memory.
    <div
      role="form"
      aria-label="報名表單預覽（不收件）"
      className="space-y-8"
      onKeyDownCapture={(event) => {
        if (event.key === 'Enter' && event.target instanceof HTMLInputElement && !['checkbox', 'radio'].includes(event.target.type)) {
          event.preventDefault();
          validatePreview();
        }
      }}
    >
        <Alert className="rounded-2xl border-amber-300 bg-amber-50 p-4 text-amber-950">
          <AlertCircle />
          <AlertTitle className="font-black">目前為內容預覽，尚未正式收件</AlertTitle>
          <AlertDescription className="leading-6 text-amber-900/75">本站僅供內容與填寫流程預覽，不儲存或傳送填寫資料，請勿輸入真實個資。募集期間、抽獎日期與辦法、領獎期限、其餘獎品的品牌與型號、各獎品價值、獎金發放及稅務方式，會在正式開放前公告。</AlertDescription>
        </Alert>
      <section aria-labelledby="identity-heading">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="form-step">STEP 01</p>
            <h3 id="identity-heading" className="mt-1 text-xl font-black">基本資料與聯絡方式</h3>
          </div>
          <span className="rounded-full bg-lime/40 px-3 py-1.5 text-xs font-black text-ink">＊為必填</span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">本名＊</Label>
            <Input id="fullName" autoComplete="name" value={values.fullName} onChange={(event) => updateValue('fullName', event.target.value)} placeholder="請填寫身分證件上的本名" className={fieldClass(errors.fullName)} maxLength={50} aria-invalid={Boolean(errors.fullName)} aria-describedby={errors.fullName ? 'fullName-error' : undefined} required />
            <FieldError id="fullName-error" message={errors.fullName} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nationalId">身分證字號＊</Label>
            <Input id="nationalId" autoComplete="off" value={values.nationalId} onChange={(event) => updateValue('nationalId', event.target.value)} placeholder="1 個英文字母＋9 位數字" className={`${fieldClass(errors.nationalId)} uppercase`} maxLength={10} aria-invalid={Boolean(errors.nationalId)} aria-describedby={errors.nationalId ? 'nationalId-error' : undefined} required />
            <FieldError id="nationalId-error" message={errors.nationalId} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">聯絡電話＊</Label>
            <Input id="phone" type="tel" inputMode="tel" autoComplete="tel" value={values.phone} onChange={(event) => updateValue('phone', event.target.value)} placeholder="09xx-xxx-xxx" className={fieldClass(errors.phone)} maxLength={14} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? 'phone-error' : undefined} required />
            <FieldError id="phone-error" message={errors.phone} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email＊</Label>
            <Input id="email" type="email" inputMode="email" autoComplete="email" value={values.email} onChange={(event) => updateValue('email', event.target.value)} placeholder="name@example.com" className={fieldClass(errors.email)} maxLength={254} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} required />
            <FieldError id="email-error" message={errors.email} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lineId">LINE ID＊</Label>
            <Input id="lineId" autoComplete="off" value={values.lineId} onChange={(event) => updateValue('lineId', event.target.value)} placeholder="用於聯絡抽獎與申請結果" className={fieldClass(errors.lineId)} maxLength={20} aria-invalid={Boolean(errors.lineId)} aria-describedby={errors.lineId ? 'lineId-error' : undefined} required />
            <FieldError id="lineId-error" message={errors.lineId} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nickname">暱稱＊</Label>
            <Input id="nickname" value={values.nickname} onChange={(event) => updateValue('nickname', event.target.value)} placeholder="球友認得你的稱呼" className={fieldClass(errors.nickname)} maxLength={30} aria-invalid={Boolean(errors.nickname)} aria-describedby={errors.nickname ? 'nickname-error' : undefined} required />
            <FieldError id="nickname-error" message={errors.nickname} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="referrer">推薦人暱稱或推薦碼（選填）</Label>
            <Input id="referrer" value={values.referrer} onChange={(event) => updateValue('referrer', event.target.value)} placeholder="請勿填他人真實姓名或聯絡資料" className={fieldClass(errors.referrer)} maxLength={30} aria-invalid={Boolean(errors.referrer)} aria-describedby={errors.referrer ? 'referrer-error' : undefined} />
            <FieldError id="referrer-error" message={errors.referrer} />
          </div>
        </div>
      </section>

      <div className="border-t border-ink/10" />

      <section aria-labelledby="venue-heading">
        <div className="mb-5">
          <p className="form-step">STEP 02</p>
          <h3 id="venue-heading" className="mt-1 text-xl font-black">適用場館與學校告知</h3>
          <p className="mt-2 text-sm font-medium leading-6 text-ink/55">下面 13 個場館與學校都包含在本次授權範圍內，無法個別排除。只有實際提出申請時，才會把必要資料提供給該單位。</p>
        </div>

        <div className="rounded-[1.4rem] border border-green/15 bg-green/5 p-4 sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <strong className="text-sm text-green">全部 13 個場館與學校均納入授權範圍</strong>
            <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-black text-green ring-1 ring-green/15">僅供告知・非選項</span>
          </div>
          <ul className="grid gap-x-5 gap-y-2 sm:grid-cols-2" aria-label="本次授權適用的全部場館與學校">
            {AUTHORIZED_VENUES.map((venue, index) => (
              <li key={venue} className="flex items-center gap-2.5 text-sm font-bold text-ink/70">
                <span className="grid size-5 shrink-0 place-items-center rounded-full bg-lime/70 font-mono text-[10px] font-black text-ink" aria-hidden="true">{index + 1}</span>
                {venue}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-green/10 pt-3 text-xs font-medium leading-5 text-ink/50">中山、萬華運動中心依新營運團隊正式公告辦理；學校場地依照各校官方公告辦理。</p>
        </div>

        <div className="mt-4 grid gap-4 rounded-[1.4rem] border border-green/15 bg-white p-4 sm:grid-cols-[1fr_auto] sm:items-center sm:p-5">
          <div className="flex items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime/60 text-green"><Mail className="size-5" /></span>
            <div>
              <strong className="text-sm text-ink">新增抽籤對象通知</strong>
              <p className="mt-1 text-sm font-medium leading-6 text-ink/60">若後續有新增可申請抽籤的場館或學校，我們會以 Email 通知，並在「曜日大家庭」LINE 社群公告。</p>
              <p className="mt-1 text-xs font-medium leading-5 text-ink/45">新增對象不會自動納入本次授權；如需使用你的資料提出申請，會另行說明並取得同意。</p>
            </div>
          </div>
          <a href="https://line.me/ti/g2/LVwBKPv1T4ZxIQxsGfqvJe5H9ZtgTna1bDkcHA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-green px-5 text-sm font-black text-white transition-colors hover:bg-green/90">
            加入 LINE 社群<ExternalLink className="size-4" />
          </a>
        </div>

        <div className="mt-6 space-y-3">
          <Label>您是否曾註冊下列場館使用的會員或登記帳號？＊</Label>
          <RadioGroup value={values.accountStatus} onValueChange={(value) => updateValue('accountStatus', String(value))} className="grid gap-2 sm:grid-cols-3">
            {[
              ['yes', '有，至少一個'],
              ['no', '都沒有'],
              ['unsure', '不確定'],
            ].map(([value, label]) => (
              <label key={value} className={`radio-option ${values.accountStatus === value ? 'radio-option--checked' : ''}`}>
                <RadioGroupItem value={value} aria-label={label} />
                <span className="font-bold">{label}</span>
              </label>
            ))}
          </RadioGroup>
          <FieldError id="accountStatus-error" message={errors.accountStatus} />
          <p className="flex items-start gap-2 text-xs font-medium leading-5 text-ink/50"><LockKeyhole className="mt-0.5 size-3.5 shrink-0" />本站不蒐集或保存密碼、簡訊驗證碼或一次性驗證碼。</p>
        </div>
      </section>

      <div className="border-t border-ink/10" />

      <section aria-labelledby="consent-heading">
        <div className="mb-5">
          <p className="form-step">STEP 03</p>
          <h3 id="consent-heading" className="mt-1 text-xl font-black">確認授權與活動規則＊</h3>
        </div>

        <div className="space-y-3">
          <label className={`consent-option ${consents.privacy ? 'consent-option--checked' : ''}`}>
            <Checkbox checked={consents.privacy} onCheckedChange={(next) => setConsents((current) => ({ ...current, privacy: next === true }))} aria-label="同意個資蒐集" />
            <span><strong className="block text-sm text-ink">個資使用同意</strong><span className="mt-1 block">{PRIVACY_CONSENT_TEXT}</span></span>
          </label>
          <label className={`consent-option ${consents.scope ? 'consent-option--checked' : ''}`}>
            <Checkbox checked={consents.scope} onCheckedChange={(next) => setConsents((current) => ({ ...current, scope: next === true }))} aria-label="同意全部公告場館授權範圍" />
            <span><strong className="block text-sm text-ink">場館與學校申請授權</strong><span className="mt-1 block">{SCOPE_CONSENT_TEXT}</span></span>
          </label>
          <label className={`consent-option ${consents.accountCreation ? 'consent-option--checked' : ''}`}>
            <Checkbox checked={consents.accountCreation} onCheckedChange={(next) => setConsents((current) => ({ ...current, accountCreation: next === true }))} aria-label="同意代為註冊運動中心帳號" />
            <span><strong className="block text-sm text-ink">帳號代辦授權</strong><span className="mt-1 block">{ACCOUNT_CREATION_CONSENT_TEXT}</span></span>
          </label>
          <label className={`consent-option ${consents.rules ? 'consent-option--checked' : ''}`}>
            <Checkbox checked={consents.rules} onCheckedChange={(next) => setConsents((current) => ({ ...current, rules: next === true }))} aria-label="同意活動規則" />
            <span><strong className="block text-sm text-ink">年齡及活動規則</strong><span className="mt-1 block">{RULES_ACKNOWLEDGEMENT_TEXT}</span></span>
          </label>
        </div>
        <p className="mt-3 text-xs font-medium text-ink/45">告知與同意版本：{CONSENT_VERSION}</p>
      </section>

      {status === 'error' && (
        <Alert variant="destructive" className="rounded-2xl border-red-200 bg-red-50 p-4">
          <AlertCircle />
          <AlertTitle className="font-black">尚未送出</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </Alert>
      )}
      {status === 'preview' && (
        <Alert className="rounded-2xl border-green/20 bg-green/5 p-4 text-green">
          <CheckCircle2 />
          <AlertTitle className="font-black">格式檢查完成，未送出</AlertTitle>
          <AlertDescription className="text-green/75">{message}</AlertDescription>
        </Alert>
      )}

      <Button type="button" variant="outline" onClick={validatePreview} className="h-12 w-full rounded-full font-black">
        檢查填寫格式（不送出）
      </Button>

      <div className="rounded-[1.4rem] bg-ink p-4 text-white sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-lime text-ink"><Database className="size-5" /></span>
          <div>
            <p className="font-black">內容預覽，不收集或儲存資料</p>
            <p className="mt-1 text-xs font-medium leading-5 text-white/55">填寫內容僅存在目前頁面；重新整理後清除，不會傳送至 Google Sheet 或其他服務。</p>
          </div>
        </div>
        <Button type="button" disabled className="mt-4 h-12 w-full rounded-full bg-lime px-7 font-black text-ink hover:bg-lime/90 sm:mt-0 sm:w-auto">
          尚未開放收件
        </Button>
      </div>
    </div>
  );
}
