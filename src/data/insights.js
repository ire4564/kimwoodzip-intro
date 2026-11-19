// Instagram 인사이트 원본 데이터
// 출처: Instagram 웹 인사이트 (게시물별 인사이트 + 프로페셔널 대시보드 최근 90일), 2026-11-17 확인
// 새 인사이트를 받으면 이 파일의 숫자만 바꾸면 지표 · 근거 문구가 자동으로 다시 계산됩니다.

export const insightsMeta = {
  collectedAt: '2026-11-17',
  reelsLabel: '최근 10개 릴스',
  accountLabel: '계정 전체 · 최근 90일',
}

// 최근 10개 릴스 (1 = 최신, 2026-10-29 ~ 2026-11-15 게시)
// reach: 조회한 계정 수 · views: 조회수 · visits: 프로필 활동 · promo: 홍보(광고 표기) 콘텐츠
// 인스타그램이 '만' 단위로만 보여주는 값(6.8만 등)은 그 값을 그대로 옮겼습니다.
export const recentReels = [
  { no: 1, reach: 2733, views: 3185, likes: 17, comments: 8, saves: 18, shares: 6, visits: 1 },
  { no: 2, reach: 4149, views: 5295, likes: 41, comments: 50, saves: 73, shares: 32, visits: 3 },
  { no: 3, reach: 68000, views: 100000, likes: 225, comments: 20, saves: 440, shares: 240, visits: 62 },
  { no: 4, reach: 50000, views: 59000, likes: 1137, comments: 582, saves: 1306, shares: 917, visits: 160 },
  { no: 5, reach: 52000, views: 63000, likes: 2278, comments: 553, saves: 1596, shares: 1046, visits: 162 },
  { no: 6, reach: 4970, views: 6072, likes: 28, comments: 42, saves: 36, shares: 23, visits: 8 },
  { no: 7, reach: 15000, views: 20000, likes: 164, comments: 378, saves: 574, shares: 196, visits: 111 },
  { no: 8, reach: 1835, views: 2147, likes: 22, comments: 0, saves: 4, shares: 0, visits: 0, promo: true },
  { no: 9, reach: 2338, views: 3141, likes: 22, comments: 17, saves: 33, shares: 15, visits: 7 },
  { no: 10, reach: 6921, views: 8509, likes: 36, comments: 41, saves: 58, shares: 18, visits: 7 },
]

// 계정 전체 (최근 90일)
export const accountInsights = {
  followers: 2495,
  views: 1020000,
  nonFollowerViewShare: 0.954,
  reachedAccounts: 645000,
  interactions: 67000,
  nonFollowerInteractionShare: 0.763,
  profileVisits: 12000,
  linkTaps: 3580,
}

// 홍보(광고 표기) 콘텐츠 6건 (2026-08-09 ~ 2026-11-02 게시, #광고 · #협찬 · 제품 제공 표기)
// 각 콘텐츠 비율의 단순 평균을 사용합니다. (도달이 큰 콘텐츠 1건에 끌려가지 않도록)
// engagementRate = 공유율 + 좋아요율 + 저장률 + 댓글률 (리포스트 제외)
// 브랜드 광고로 별도 집행되어 도달 대부분이 유료 노출인 콘텐츠 3건은 참여율이 왜곡되므로 제외했습니다.
// 공개 페이지 번들에 포함되므로 브랜드명은 넣지 않고 참여율만 기록합니다.
export const promoContents = [
  { engagementRate: 0.0203 },
  { engagementRate: 0.0142 },
  { engagementRate: 0.0168 },
  { engagementRate: 0.0217 },
  { engagementRate: 0.0435 },
  { engagementRate: 0.0457 },
]

// watchSeconds: 웹 인사이트에서는 시청 시간이 제공되지 않아 이전 집계(2026-09-14) 값을 유지합니다.
export const promoAverages = {
  views: 1749,
  reach: 1353,
  likeRate: 0.0191,
  saveRate: 0.003,
  commentRate: 0.0041,
  shareRate: 0.0009,
  watchSeconds: 6.28,
}
