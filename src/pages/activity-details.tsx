import { ArrowRight, BadgeDollarSign, Gift, ShieldCheck, Users } from 'lucide-react';
import { RegistrationEntry } from '@/components/registration-form';
import { AuthorizationContactLinks } from '@/components/authorization-contact-links';
import { MarketingIllustration } from '@/components/campaign-visuals';
import { AUTHORIZED_VENUES, CONSENT_ITEMS, CONSENT_VERSION, CONTACTS, CROSS_VENUE_NOTICE_TEXT, FIRST_DRAW_QUALIFICATION_TEXT, PRIVACY_NOTICE_ITEMS, VENUE_NOTICE_TEXT } from '@/lib/consent';
import { FIRST_DRAW_DATE_TEXT, FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT, REGISTRATION_DEADLINE_TEXT, type RegistrationState } from '@/lib/registration-config';
import type { getMarketingContent } from '@/lib/marketing-content';

export function ActivityDetails({ state: registrationState, marketing }: { state: RegistrationState; marketing: ReturnType<typeof getMarketingContent> }) {
  return <div className="activity-details">
    <div className="page-shell details-intro" id="details-top">
      <a href={import.meta.env.BASE_URL} className="text-link">← 返回活動首頁</a>
      <p className="eyebrow">ACTIVITY & PRIVACY</p><h1>完整活動與資料說明</h1>
      <nav aria-label="說明頁目錄" className="details-nav"><a href="#draw-rules-heading">抽獎與領獎</a><a href="#court-bonus">場地回饋</a><a href="#venues">13 個場館</a><a href="#privacy">資料與授權</a><a href="#withdrawal">聯絡與終止</a></nav>
    </div>
    <section className="marketing-section" id="activity-rules"><div className="page-shell reading-shell">
      <h2>抽獎與領獎</h2>
          <p className="draw-date-strip">首波資格截至 2026/12/31（含當日，台北時間）<span>抽獎日 2027/01/10</span></p>
          <details className="marketing-disclosure draw-rules">
            <summary id="draw-rules-heading">完整抽獎資格與領獎辦法</summary>
            <div className="disclosure-body">
              <p>{FIRST_DRAW_QUALIFICATION_TEXT}</p>
              <dl className="event-dates"><dt>首波抽獎資格截止</dt><dd>{FIRST_DRAW_ELIGIBILITY_DEADLINE_TEXT}</dd><dt>首波抽獎日</dt><dd>{FIRST_DRAW_DATE_TEXT}</dd><dt>場地協助登記截止</dt><dd>{REGISTRATION_DEADLINE_TEXT}</dd></dl>
              <ul><li>每人一次抽獎資格，最多一獎；以隨機方式抽出得獎者。</li><li>以 Email、LINE 通知得獎者；依得獎通知於 14 日內回覆、30 日內領取，逾期遞補。</li><li>資格截止後仍可協助場地登記，但不列入首波抽獎名單；場地協助期限不會延長首波資格。</li></ul>
            </div>
          </details>
          <p id="prize-illustration-note" className="body-note">四項示意圖非實際獎品；實際款式、顏色、品牌與型號以後續公告為準。各獎品價值、付款與扣繳資料仍待定案。「頂級」與「高級」為活動品項名稱。</p>
    </div></section>
    <section className="marketing-section" id="racket-specifications"><div className="page-shell reading-shell">
              <details className="marketing-disclosure">
                <summary>球拍規格與科技</summary>
                <div className="disclosure-body">
                  <dl className="spec-list"><dt>貨號</dt><dd>73JTB11209</dd><dt>拍身長度</dt><dd>675 mm</dd><dt>建議磅數</dt><dd>22–29 lbs</dd><dt>拍框材質</dt><dd>高彈性碳纖維（HM Graphite）＋鎢（Tungsten PP）</dd><dt>中管材質</dt><dd>M FUSION 碳纖維</dd></dl>
                  <p><strong>Aero Groove 拍框溝槽：</strong>透過溝槽設計，減少揮拍風阻。</p><p><strong>Torque Technology（T5）：</strong>強化擊球時的力量傳遞，支援進攻表現。</p>
                  <a href="https://twn.mizuno.com/products/73jtb11209" target="_blank" rel="noopener noreferrer" className="text-link">查看美津濃官方商品資訊</a>
                </div>
              </details>
    </div></section>
      <section id="benefits" className="marketing-section rewards-section">
        <div className="page-shell">
          <div className="section-heading"><p className="eyebrow">THREE WAYS TO GIVE BACK</p><h2>每一份協助，都有不同的回饋</h2><p>抽獎、球團福利與場地獎金，條件各有不同。</p></div>
          <div className="reward-grid">
            <article className="reward-card"><Gift aria-hidden="true" /><p className="card-overline">完成首波資格</p><h3>{marketing.drawLabel}</h3><p>{marketing.drawReward}</p></article>
            <article className="reward-card"><Users aria-hidden="true" /><p className="card-overline">提供資料、授權並配合程序</p><h3>2027 球團福利</h3><p>季繳優先登記、當年度臨打優惠。優先不保證錄取；名額、優惠金額與適用場次依當期公告。</p></article>
            <article className="reward-card reward-card-dark"><BadgeDollarSign aria-hidden="true" /><p className="card-overline">中籤、完成登記並核對</p><h3>場地協助獎金</h3><p>依年租或季租規則累計，當年度無上限。這是後續場地協助，不是首波抽獎資格的前提。</p><a href="#court-bonus" className="text-link">查看獎金怎麼算<ArrowRight aria-hidden="true" /></a></article>
          </div>
        </div>
      </section>
      <section id="how" className="marketing-section purpose-section">
        <div className="page-shell">
          <div className="section-heading"><p className="eyebrow">A COURT TO CALL OURS</p><h2>讓每週見面的地方，<span>多一點確定</span></h2><p>曜日是為 LGBTQ+ 社群打造的羽球團。臺北固定場地不易募集，你願意在清楚範圍內提供協助，就讓我們多一次爭取安心打球空間的機會。</p></div>
          <div className="participation-grid">
            <article className="participation-card"><MarketingIllustration name="registration" alt="戴眼鏡的虛構斯文成年男性用手機閱讀與填寫資料的概念插畫" /><div><p className="card-overline">01 · 先了解，再決定</p><h3>你提供資料與授權</h3><p>先看用途與範圍，願意參與再填寫；閱讀全文、主動同意後，取得成功回條。</p></div></article>
            <article className="participation-card"><MarketingIllustration name="court-support" alt="留鬍鬚的虛構肉壯中年男性與空白日曆、羽球場模型的概念插畫" /><div><p className="card-overline">02 · 一起完成申請</p><h3>球團申請，你配合必要程序</h3><p>球團依授權協助抽籤；本人完成必要驗證，中籤後再配合登記。提供資料不保證中籤。</p></div></article>
          </div>
        </div>
      </section>
      <section id="venues" className="marketing-section venues-section">
        <div className="page-shell venue-bonus-layout">
          <div>
            <div className="section-heading"><p className="eyebrow">OUR COURT PLAN</p><h2>一起爭取的 13 個地方</h2><p>全部場館均在本次授權範圍內，清單僅作告知、不提供個別選擇。新增場館須另行同意。</p></div>
            <ul className="venue-names">{AUTHORIZED_VENUES.map((name) => <li key={name}>{name}</li>)}</ul>
            <details className="marketing-disclosure"><summary>場館營運、申請方式與授權範圍</summary><div className="disclosure-body"><p>{VENUE_NOTICE_TEXT}</p><p>{CROSS_VENUE_NOTICE_TEXT}</p><p>運動／活動中心共 7 處，受理單位與申請流程依各中心公告；其中臺北市民生社區中心依該中心公告。學校共 6 所，由校方或指定單位受理，依照學校官方公告辦理。</p><a href="#supplemental-notice" className="text-link">了解新增場館的人工補充授權</a></div></details>
          </div>
          <div id="court-bonus" className="court-bonus">
            <p className="eyebrow">SUCCESS BONUS</p><h3>中籤並完成登記，<span>協助也有回饋</span></h3>
            <div className="bonus-grid"><article><p>年租型 · 每中籤一次</p><strong>NT$2,000</strong></article><article><p>季租型 · 每中籤一面固定場地</p><strong>NT$500</strong></article></div>
            <p>季租按面數疊加，例如中籤 3 面為 NT$1,500。當年度累計無上限；場地登記完成並核對後，於 30 日內匯款。</p>
            <p className="body-note">場地協助登記至 2027/12/31。須完成場館要求的驗證、繳費與文件，未逾期、未放棄且資格仍有效，才可取得回饋。</p>
          </div>
        </div>
      </section>
      <section id="register" className="marketing-section registration-section">
        <div className="page-shell reading-shell">
          <div className="section-heading"><p className="eyebrow"><ShieldCheck aria-hidden="true" /> BEFORE YOU JOIN</p><h2>資料怎麼用，<span>先說清楚</span></h2><p>這是一份自願協助。了解必要資料與授權範圍後，再決定是否加入。</p></div>
          <RegistrationEntry state={registrationState} actionLabel={marketing.actionLabel}>
            <div className="disclosure-stack">
              <details className="marketing-disclosure" id="privacy-notice"><summary id="privacy">閱讀完整個資與授權說明</summary><div className="disclosure-body">
                <p>告知與同意版本：{CONSENT_VERSION}。以下是表單所稱的「個資告知事項」，全文與 v16 正式表單相同。</p>
                {PRIVACY_NOTICE_ITEMS.map((item) => <div key={item.id} id={'privacy-' + item.id} className="privacy-item"><h3 id={item.id === 'supplemental-authorization' ? 'supplemental-notice' : undefined}>{item.title}</h3>{item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{'sourceLinks' in item && <div><p>服務商公開政策</p><ul>{item.sourceLinks.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noreferrer" className="text-link">{source.label}</a></li>)}</ul></div>}{item.id === 'supplemental-authorization' && <a href={CONTACTS.communityUrl} target="_blank" rel="noreferrer" className="text-link">加入「曜日大家庭」LINE 社群</a>}</div>)}
                <h3 className="consent-document-heading">正式表單的四項同意</h3>
                <ol className="consent-preview">{CONSENT_ITEMS.map((item) => <li key={item.key}><h4>{item.title}</h4><p>{item.text}</p></li>)}</ol>
              </div></details>
            </div>
            <div id="withdrawal" className="withdrawal-contact"><p><strong>想終止授權或有疑問？</strong>可私訊曜日報名系統或阿定，人工核對後回覆處理；既有場館會員或租約不會自動取消。</p><AuthorizationContactLinks /></div>
          </RegistrationEntry>
        </div>
      </section>
  </div>;
}

