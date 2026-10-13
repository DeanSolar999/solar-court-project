export const CONSENT_VERSION = '2027-v16-2026-10-13';

export const CONTACTS = {
  registrationSystemName: '🏸 曜日羽球｜臨打報名系統',
  registrationSystemUrl: 'https://line.me/R/ti/p/@726oezrw',
  managerName: '張博鈞',
  managerPhone: '0933-865-506',
  managerPhoneHref: 'tel:0933865506',
  responsiblePerson: '阿定',
  lineId: 'nplus168',
  communityUrl: 'https://line.me/ti/g2/LVwBKPv1T4ZxIQxsGfqvJe5H9ZtgTna1bDkcHA?utm_source=invitation&utm_medium=link_copy&utm_campaign=default',
} as const;

export const AUTHORIZED_VENUES = [
  '大同運動中心',
  '南港運動中心',
  '大安運動中心',
  '中正運動中心',
  '中山運動中心',
  '萬華運動中心',
  '臺北市民生社區中心',
  '日新國小',
  '蓬萊國小',
  '新興國中',
  '興雅國小',
  '銘傳國小',
  '長春國小',
] as const;

export const PRIVACY_CONSENT_TEXT =
  '我已閱讀《個人資料蒐集、處理及利用告知事項》，同意曜日羽球團於授權日起至 2027 年 12 月 31 日止，為本活動抽獎與通知、帳號代辦及授權範圍內的共同使用、場地申請、獎金發放與必要後續程序，於告知的必要範圍內蒐集、處理及利用我的資料。';

export const SCOPE_CONSENT_TEXT =
  '我同意曜日羽球團為公告所列的全部 13 個場館與學校辦理場地抽籤及申請，並於實際辦理時，將必要資料提供給受理單位或其指定系統。新增場館須另行取得我的同意。';

export const ACCOUNT_CREATION_CONSENT_TEXT =
  '如本人尚未註冊相關運動中心帳號，我同意曜日羽球團使用本次提供的必要資料，以本人名義代為申請。我已知悉，代辦帳號的預設密碼為「1qaz」接上本人身分證字號末四碼。我同意由本人與球團指定管理人員，自同意日起至 2027 年 12 月 31 日止共同使用帳號，僅供已授權場館的抽籤申請及必要後續程序使用；實際辦理仍須遵守各場館規則。';

export const RULES_ACKNOWLEDGEMENT_TEXT =
  '我已年滿 18 歲，已閱讀抽獎、領獎及場地協助獎金辦法；如抽中場地，願意配合球團，在期限內完成場館要求的身分驗證、繳費、簽約、切結及其他必要程序。';

export const CONSENT_ITEMS = [
  { key: 'privacy', title: '個資使用同意', summary: '閱讀完整告知，確認資料用途與授權期限。', text: PRIVACY_CONSENT_TEXT },
  { key: 'scope', title: '場館與學校申請授權', summary: '適用公告的全部 13 個場館；新增場館另行同意。', text: SCOPE_CONSENT_TEXT },
  { key: 'account', title: '帳號代辦與共同使用授權', summary: '閱讀預設密碼與共同使用說明，勾選並送出後授權球團代辦。', text: ACCOUNT_CREATION_CONSENT_TEXT },
  { key: 'rules', title: '年齡及活動規則', summary: '年滿 18 歲，了解活動辦法並配合中籤後程序。', text: RULES_ACKNOWLEDGEMENT_TEXT },
] as const;

export const FIRST_DRAW_QUALIFICATION_TEXT =
  '截至 2026 年 12 月 31 日（含當日，台北時間），完整填寫必填資料、主動勾選四項授權與活動規則，並成功送出表單、取得收件回條，即可取得首波抽獎資格，不需要先抽中場地。每人限一次抽獎資格，最多獲得一項獎品。';

export const VENUE_NOTICE_TEXT =
  '以下清單為 2027 年預定申請的 13 個場館與學校。各運動中心在 2027 年度的實際營運單位，以官方公告為準；參加抽籤前須先註冊指定帳號，帳號註冊及場地申請流程則依各中心公告與營運單位規則辦理。學校場地依各校官方公告辦理。曜日羽球團只會在實際辦理帳號註冊、抽籤申請及必要後續程序時，提供所需資料。';

export const CROSS_VENUE_NOTICE_TEXT =
  '即使同一營運單位經營其他場館，或會員帳號可以跨館使用，也不代表你已授權曜日羽球團申請清單以外的場館。';

export const SUPPLEMENTAL_AUTHORIZATION_NOTICE = [
  '新增場館或學校時，我們會以 Email 提供詳細說明及補充授權文件或連結，並於「曜日大家庭」LINE 社群公告；管理人員也會透過曜日報名系統，以私訊提供文件，請本人確認是否同意。',
  '只有在本人另行明確同意後，才會使用資料申請新增場館。未回覆或不同意者，不會納入新增範圍，也不影響原已取得的參加資格。',
  '補充授權採人工辦理。文件會說明新增場館、營運單位、用途、資料類別、利用方式與期間，以及同意與否的影響；管理人員核對回覆者與原報名資料後，留存本人回覆、回覆時間及文件版本。',
] as const;

export const ACCOUNT_USE_NOTICE = [
  '本人閱讀本次完整告知、主動勾選「帳號代辦與共同使用授權」並成功送出表單後，即授權曜日羽球團依本次告知內容代辦及共同使用帳號，不再另以私訊取得第二次帳號授權。',
  '如尚未註冊指定運動中心帳號，曜日羽球團將使用本次提供的必要資料，以本人名義代為申請。僅於該營運單位規則允許時，由本人與球團指定管理人員共同操作帳號，用於已授權場館的抽籤申請及必要後續程序。',
  '代辦帳號的預設密碼為「1qaz」接上本人身分證字號末四碼。此預設密碼規則僅適用於本次代辦的新帳號；球團不會擅自修改或重設本人既有帳號的密碼。',
  '授權期間自同意日起至 2027 年 12 月 31 日止；本人也可以提前申請終止授權。帳號的會員權益與使用限制，依營運單位規定辦理。',
  '本表單不收集帳號密碼、簡訊驗證碼或一次性驗證碼；需要本人驗證的步驟，由本人操作。',
  '身分驗證、繳費、簽約及切結由本人依通知配合完成；本次授權不包含球團代簽契約或代作金錢承諾。',
] as const;

export const REVOCATION_NOTICE = [
  '如欲停止後續代辦或終止帳號共同使用授權，請私訊「曜日報名系統」，或聯絡球團負責人阿定（LINE ID：nplus168）。',
  '管理人員完成必要的身分與申請範圍核對後，會停止尚未執行的代辦及後續使用，留存處理紀錄並回覆本人。',
  '已提出的申請、已成立的租借關係或場館會員帳號，仍須依受理單位程序另行辦理，不會因終止球團授權而自動取消。',
] as const;

export const PRIVACY_RIGHTS = [
  '查詢或請求閱覽。',
  '請求製給複製本。',
  '請求補充或更正。',
  '請求停止蒐集、處理或利用。',
  '請求刪除。',
] as const;

export const PRIVACY_POLICY_SOURCES = [
  { label: 'Google 隱私權政策：資料移轉', url: 'https://policies.google.com/privacy?hl=zh-TW' },
  { label: 'LINE 營運者隱私權政策：跨境移轉', url: 'https://www.lycorp.co.jp/en/company/privacypolicy/' },
  { label: 'GitHub 隱私權聲明：國際資料移轉', url: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' },
] as const;

export const PRIVACY_NOTICE_ITEMS = [
  {
    id: 'collection-platform',
    title: '登記頁面與資料儲存',
    paragraphs: ['GitHub Pages 活動網站只提供活動公告與登記入口，不提供個資輸入欄位。報名資料由獨立的 Google 託管表單承接填寫與送出；曜日羽球團透過 Google 服務處理資料，並儲存於非公開 Google Sheet，供授權管理人員依告知目的使用。填寫後，請閱讀完整告知文件並捲動至底部，再主動確認四項同意後送出；捲動到文件底部不等於同意，也不能證明已理解內容。'],
  },
  {
    id: 'collector',
    title: '蒐集者與聯絡方式',
    paragraphs: ['蒐集單位為曜日羽球團（Solar Badminton）；資料管理負責人及個資聯絡人為張博鈞，電話 0933-865-506，LINE ID：nplus168。欲行使個資權利、終止後續代辦或詢問資料處理情形，可透過電話、LINE 或曜日報名系統私訊聯絡。'],
  },
  {
    id: 'purpose-and-data',
    title: '蒐集目的、依據與資料類別',
    paragraphs: [
      '曜日羽球團依個人資料保護法第 19 條第 1 項第 5 款，以本人同意作為蒐集及處理個人資料的依據。Email 用於活動、抽獎結果及新增抽籤對象通知；LINE ID 用於抽獎結果、場地申請進度及需要即時配合時的聯絡。',
      '除上述聯絡用途外，資料會在本活動抽獎、運動中心帳號代辦及授權範圍內的共同使用、2027 年固定羽球場地申請與抽籤、身分驗證、取得場地後的必要程序、協助獎金發放、必要會計稅務及爭議處理範圍內使用。',
      '必填資料為本名、身分證字號、手機號碼、Email、LINE ID、暱稱及帳號註冊狀態；推薦人暱稱或推薦碼為選填。另會保存授權內容、版本與送出時間；人工補充授權會留存本人回覆及確認紀錄。新增場館不會自動納入本次授權。',
    ],
  },
  {
    id: 'period-and-region',
    title: '利用期間、地區與到期處理',
    paragraphs: [
      '一般利用期間為授權日起至 2027 年 12 月 31 日。期限屆滿後停止一般使用並刪除或去識別化；法律、會計稅務或爭議處理確有保存必要時，僅在必要期間及目的內保留，不再用於新的場地申請。備份資料依適用刪除流程處理，不再供日常使用。',
      '活動申請、管理人員作業與聯絡主要在臺灣。報名資料存放於 Google Sheet，並由 Google Apps Script 處理；Google 隱私權政策說明其伺服器遍布全球，可能在臺灣以外處理資料，本活動未指定單一資料儲存國家。LINE 聯絡及人工補充授權所涉及資料，可能依 LINE 營運者政策移轉至日本、美國、韓國、加拿大、菲律賓、澳洲、越南、泰國、臺灣、印尼、新加坡、瑞士、英國及歐洲經濟區。GitHub Pages 僅提供活動頁，不接收表單欄位；瀏覽活動頁產生的連線紀錄可能由 GitHub 在美國及其他營運所在地處理。上述為服務商公開政策所揭露的處理範圍，不表示每筆資料均傳輸至所有地區。',
    ],
    sourceLinks: PRIVACY_POLICY_SOURCES,
  },
  {
    id: 'recipients-and-methods',
    title: '利用對象與方式',
    paragraphs: [
      '資料由曜日羽球團指定管理人員，以 Google 託管表單蒐集、電子儲存與傳輸、電話或通訊聯絡、帳號代辦及授權範圍內共同使用、場地申請、抽獎及獎金處理等方式使用。必要時，僅向實際申請的場館或學校、正式營運單位、指定登記系統，以及依法必要的付款、會計、稅務或主管機關提供所需資料，不會一次將完整名單交給所有場館。',
      '必要的系統服務商包括 Google、LINE、網站主機（GitHub Pages）與資料傳輸服務商及其受託處理者。GitHub 活動頁不接收報名欄位資料；各服務僅於實際提供功能所需範圍處理資料。',
      CROSS_VENUE_NOTICE_TEXT,
    ],
  },
  {
    id: 'privacy-rights',
    title: '你的個資權利與行使方式',
    paragraphs: [
      '依個人資料保護法第 3 條，你可以行使以下權利，且不得預先拋棄或以約定限制：',
      ...PRIVACY_RIGHTS,
      '請透過曜日報名系統私訊，或聯絡張博鈞（電話 0933-865-506、LINE ID：nplus168）。管理人員會以必要方式核對申請人身分，依法處理並回覆；若有依法保留部分資料的必要，會說明原因、範圍與處理結果。',
    ],
  },
  {
    id: 'optional-provision',
    title: '不提供資料會有什麼影響',
    paragraphs: ['你可以自由選擇是否提供資料及同意授權。若未提供必填資料、未滿 18 歲或未同意四項必要確認，就無法完成本次報名、取得首波抽獎資格或參加後續場地協助。推薦人暱稱或推薦碼為選填，不提供不影響參加資格；此欄請勿填寫他人的真實姓名、電話或其他個資。不同意新增場館，不影響原已取得的參加資格。'],
  },
  {
    id: 'account-use',
    title: '帳號代辦與共同使用說明',
    paragraphs: [...ACCOUNT_USE_NOTICE, '資料不會用於臺北市政府體育局的一般場地預約網站、未另行取得授權的新增場館、名單出售或其他廣告用途。'],
  },
  {
    id: 'supplemental-authorization',
    title: '新增場館的人工補充授權',
    paragraphs: [...SUPPLEMENTAL_AUTHORIZATION_NOTICE],
  },
  {
    id: 'revocation',
    title: '停止代辦與終止共同使用授權',
    paragraphs: [...REVOCATION_NOTICE],
  },
] as const;
