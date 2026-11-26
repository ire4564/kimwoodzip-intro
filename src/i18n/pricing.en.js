// 광고 상품 · 옵션의 영어 문구와 달러 단가
// 영어 페이지는 해외 브랜드용 고정 달러 단가를 씁니다. (원화 단가 대비 약 10~15% 높게, $5 단위)
// 원화 단가를 바꿔도 달러는 자동으로 바뀌지 않으니 이 표도 함께 고쳐 주세요.
export const usd = {
  items: { reels: 80, 'feed-image': 40, thread: 40, story: 10 },
  retention: { '6m': 0, '1y': 25 },
  extras: {
    extraImages: { price: 25 },
    metaAds: { pricePerMonth: 20 },
    detailPage: { pricePerMonth: 20 },
    profileLink: {
      periodOptions: [
        { id: 'week', label: '1 week', price: 15 },
        { id: 'month', label: '1 month', price: 40 },
      ],
    },
  },
  // 테크(AI): 릴스 $200 · 피드 · 스레드 $120 · 스토리 $40 · 2차 활용 월 $40
  categories: {
    living: { surcharge: 0 },
    tech: {
      surcharge: 80,
      surchargeByItem: { reels: 120, 'feed-image': 80, thread: 80, story: 30 },
      extraOverrides: { metaAds: { pricePerMonth: 40 }, detailPage: { pricePerMonth: 40 } },
    },
  },
  packageRound: 5,
}
export const groupLabels = {
  reels: {
    title: 'Reels',
    summary: '15–30s vertical video · filming · editing · basic captions · upload · 1 revision included',
    leadTime: 'About 7–10 days after receiving the product',
  },
  feed: {
    title: 'Feed · Threads',
    summary: 'Product caption · brand tag · 1 revision included · up to 5 images included',
    leadTime: 'About 5–7 days after receiving the product',
  },
  package: {
    title: 'Packages',
    summary: 'The same product produced in multiple formats',
    leadTime: 'About 5–10 days depending on the format',
  },
  story: {
    title: 'Story',
    summary: '1–3 frames · live for 24 hours · mention or link included',
    leadTime: 'Schedule to be agreed',
  },
}

export const itemLabels = {
  reels: { name: 'Reels', desc: '' },
  'feed-image': { name: 'Instagram feed', desc: '5 photos standard · up to 10' },
  thread: { name: 'Threads post', desc: '5 photos standard · up to 10' },
  'pkg-feed-reels': { name: 'Feed + Reels package', desc: '1 Reels + 1 feed post', badge: 'Popular' },
  'pkg-reels-thread': { name: 'Reels + Threads package', desc: '1 Reels + 1 Threads post' },
  'pkg-reels-story': { name: 'Reels + Story package', desc: '1 Reels + 1 story' },
  story: { name: 'Story', desc: '' },
}

export const contentCategoryLabels = {
  living: { label: 'Living' },
  tech: {
    label: 'Tech (AI)',
    extraPriceLabels: {
      metaAds: '2 months free · then $40/month',
      detailPage: '2 months free · then $40/month',
    },
  },
}

export const retentionLabels = {
  '6m': { label: '6 months', note: 'No extra cost' },
  '1y': { label: '1 year', note: '+$25' },
  over: { label: 'Over 1 year', note: 'To be discussed' },
}

export const categoryLabels = {
  secondary: { title: 'Further use' },
  production: { title: 'Production' },
}

export const extraLabels = {
  metaAds: { name: 'Meta ads creative use', priceLabel: '2 months free · then $20/month' },
  detailPage: { name: 'Product page · online store use', priceLabel: '2 months free · then $20/month' },
  exclusivity: { name: 'Competitor exclusivity', priceLabel: 'To be discussed' },
  cleanVideo: { name: 'Clean version (no captions)', priceLabel: '30% of the base rate' },
  repost: { name: 'Repost on the brand account', priceLabel: '20% of the base rate' },
  profileLink: { name: 'Pinned link at the top of the profile', priceLabel: '$15 per week · $40 per month' },
  rush: { name: 'Rush production (delivery within 1 week)', priceLabel: '20% of the base rate' },
  extraRevision: { name: 'Revisions beyond 2', priceLabel: 'Per revision · to be discussed' },
  extraImages: { name: 'Extra images for feed · Threads (6–10)', priceLabel: '$25 per post' },
}

export const terms = [
  { label: 'VAT', value: 'All rates include VAT' },
  { label: 'Currency', value: 'Quoted in USD for international campaigns' },
  {
    label: 'Scope',
    value: 'Production and upload on @kimwood.zip · any further use is discussed separately',
  },
  { label: 'Revisions', value: '1 revision included' },
  {
    label: 'Content retention',
    value: '6 months at no extra cost · 1 year +$25 · over 1 year to be discussed',
  },
  {
    label: 'Upload schedule',
    value:
      'Uploaded on the agreed date after about 5–7 days (feed · Threads) or 7–10 days (Reels) of production',
  },
  { label: 'Product · shipping · shooting costs', value: 'Agreed per campaign' },
]
