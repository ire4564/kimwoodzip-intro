// Instagram 인사이트 원본 데이터
// 출처: Instagram 웹 인사이트 (게시물별 인사이트 + 프로페셔널 대시보드 최근 90일), 2026-11-26 확인
// 새 인사이트를 받으면 이 파일의 숫자만 바꾸면 지표 · 근거 문구가 자동으로 다시 계산됩니다.

export const insightsMeta = {
  collectedAt: '2026-11-26',
  reelsLabel: '최근 20개 릴스',
  accountLabel: '계정 전체 · 최근 90일',
}

// 최근 20개 릴스 (1 = 최신, 2026-10-26 ~ 2026-11-26 게시, 약 한 달)
// reach: 조회한 계정 수 · views: 조회수 · visits: 프로필 활동 · promo: 홍보(광고 표기) 콘텐츠
// 광고비를 집행해 도달 대부분이 유료 노출인 릴스(11/18 · 11/19 · 11/23 게시 3건)는 도달이 왜곡되므로 제외했습니다.
// 인스타그램이 '만' 단위로만 보여주는 값(10.6만 등)은 그 값을 그대로 옮겼습니다.
export const recentReels = [
  { no: 1, reach: 106000, views: 127000, likes: 2726, comments: 8, saves: 854, shares: 1527, visits: 6 },
  { no: 2, reach: 13000, views: 16000, likes: 130, comments: 709, saves: 642, shares: 167, visits: 236 },
  { no: 3, reach: 3120, views: 3777, likes: 36, comments: 7, saves: 11, shares: 9, visits: 2, promo: true },
  { no: 4, reach: 3575, views: 4434, likes: 30, comments: 19, saves: 18, shares: 1, visits: 4 },
  { no: 5, reach: 39000, views: 47000, likes: 466, comments: 2004, saves: 1988, shares: 649, visits: 540 },
  { no: 6, reach: 4697, views: 5573, likes: 41, comments: 4, saves: 26, shares: 8, visits: 2 },
  { no: 7, reach: 89000, views: 105000, likes: 2817, comments: 14, saves: 1894, shares: 1901, visits: 33 },
  { no: 8, reach: 181000, views: 215000, likes: 5694, comments: 40, saves: 3849, shares: 3630, visits: 96 },
  { no: 9, reach: 3338, views: 3993, likes: 23, comments: 8, saves: 25, shares: 7, visits: 2 },
  { no: 10, reach: 5021, views: 6516, likes: 49, comments: 62, saves: 90, shares: 40, visits: 5 },
  { no: 11, reach: 74000, views: 110000, likes: 260, comments: 20, saves: 507, shares: 289, visits: 79 },
  { no: 12, reach: 55000, views: 67000, likes: 1277, comments: 775, saves: 1499, shares: 1055, visits: 212 },
  { no: 13, reach: 57000, views: 69000, likes: 2480, comments: 637, saves: 1774, shares: 1205, visits: 185 },
  { no: 14, reach: 5749, views: 6992, likes: 28, comments: 48, saves: 46, shares: 32, visits: 10 },
  { no: 15, reach: 18000, views: 23000, likes: 185, comments: 488, saves: 685, shares: 245, visits: 139 },
  { no: 16, reach: 1978, views: 2314, likes: 22, comments: 0, saves: 4, shares: 0, visits: 0, promo: true },
  { no: 17, reach: 2496, views: 3355, likes: 23, comments: 17, saves: 34, shares: 16, visits: 7 },
  { no: 18, reach: 7126, views: 8775, likes: 38, comments: 42, saves: 58, shares: 18, visits: 8 },
  { no: 19, reach: 2749, views: 3219, likes: 20, comments: 2, saves: 6, shares: 7, visits: 1 },
  { no: 20, reach: 73000, views: 93000, likes: 547, comments: 665, saves: 2763, shares: 750, visits: 277 },
]

// 계정 전체 (최근 90일)
export const accountInsights = {
  followers: 3833,
  views: 1507000,
  nonFollowerViewShare: 0.957,
  reachedAccounts: 923000,
  interactions: 111000,
  nonFollowerInteractionShare: 0.773,
  profileVisits: 17000,
  linkTaps: 3941,
}

// 홍보(광고 표기) 콘텐츠 7건 (2026-08-09 ~ 2026-11-24 게시, #광고 · #협찬 · 제품 제공 표기)
// 각 콘텐츠 비율의 단순 평균을 사용합니다. (도달이 큰 콘텐츠 1건에 끌려가지 않도록)
// engagementRate = 공유율 + 좋아요율 + 저장률 + 댓글률 (리포스트 제외)
// 브랜드 광고로 별도 집행되어 도달 대부분이 유료 노출인 콘텐츠 6건은 참여율이 왜곡되므로 제외했습니다.
// 9/8 게시물 1건은 보관 처리되어 11/19 확인 값을 그대로 사용했습니다.
// 공개 페이지 번들에 포함되므로 브랜드명은 넣지 않고 참여율만 기록합니다.
export const promoContents = [
  { engagementRate: 0.0202 },
  { engagementRate: 0.0131 },
  { engagementRate: 0.0198 },
  { engagementRate: 0.0165 },
  { engagementRate: 0.0427 },
  { engagementRate: 0.0211 },
  { engagementRate: 0.0414 },
]

// watchSeconds: 앱 인사이트 기준 평균 시청 시간 약 9초 (2026-11-19 계정 주인 확인)
export const promoAverages = {
  views: 2104,
  reach: 1659,
  likeRate: 0.0172,
  saveRate: 0.0029,
  commentRate: 0.0037,
  shareRate: 0.0012,
  watchSeconds: 9,
}
