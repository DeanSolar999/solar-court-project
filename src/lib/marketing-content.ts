import { REGISTRATION_CLOSES_AT, type RegistrationState } from './registration-config.ts';

// Marketing only: collection eligibility is still enforced by the existing registration gate.
export const FIRST_DRAW_CLOSES_AT = Date.parse('2027-01-01T00:00:00+08:00');

export function getMarketingContent(now: number, status: RegistrationState['status']) {
  const phase = status === 'closed' || (Number.isFinite(now) && now >= REGISTRATION_CLOSES_AT)
    ? 'ended'
    : status !== 'open' || !Number.isFinite(now)
      ? 'unavailable'
      : now >= FIRST_DRAW_CLOSES_AT ? 'court-support' : 'first-draw';
  const firstDrawOpen = phase === 'first-draw';
  return {
    phase,
    firstDrawOpen,
    canRegister: phase === 'first-draw' || phase === 'court-support',
    actionLabel: phase === 'ended' ? '登記已截止' : phase === 'unavailable' ? '登記暫停中' : '我要提供資料幫忙抽籤',
    subtitle: firstDrawOpen
      ? '提供資料並完成授權，支持 LGBTQ+ 球友的固定場地申請，也有機會把 MIZUNO 球拍帶回家。'
      : '每一份願意協助的力量，都讓固定場地多一個機會。一起支持 LGBTQ+ 球友，留下安心打球的地方。',
    qualification: firstDrawOpen
      ? '限年滿 18 歲；截至 2026/12/31（含當日，台北時間）完成填表、四項同意並成功送出取得回條，可參加首波抽獎。福利依配合程序與當期公告適用。'
      : phase === 'court-support'
        ? '首波抽獎資格已截止，新登記不列入首波名單。年滿 18 歲仍可協助場地申請至 2027/12/31；福利依配合程序與當期公告適用。'
        : phase === 'ended'
          ? '2027 年場地協助登記已截止。你仍可閱讀活動紀錄、完整告知，或聯絡球團處理既有登記與個資權利。'
          : '目前暫停收件，請稍後再試。你可以先閱讀資料用途與活動辦法，再決定是否參與。',
    drawLabel: firstDrawOpen ? '30 份抽獎好禮' : '首波抽獎紀錄',
    drawReward: firstDrawOpen
      ? '在期限內完成填表、四項同意並取得成功回條，就有首波抽獎資格；不必先抽中場地。'
      : '首波抽獎資格截至 2026/12/31。截止後的新登記不列入首波名單，與後續場地協助分開計算。',
  } as const;
}
