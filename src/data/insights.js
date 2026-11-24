// Instagram 인사이트 원본 데이터
// 출처: Instagram 웹 인사이트 (게시물별 인사이트 + 프로페셔널 대시보드 최근 90일), 2026-11-19 확인
// 새 인사이트를 받으면 이 파일의 숫자만 바꾸면 지표 · 근거 문구가 자동으로 다시 계산됩니다.

export const insightsMeta = {
  collectedAt: '2026-11-19',
  reelsLabel: '최근 10개 릴스',
  accountLabel: '계정 전체 · 최근 90일',
}

// 최근 10개 릴스 (1 = 최신, 2026-11-05 ~ 2026-11-18 게시)
// reach: 조회한 계정 수 · views: 조회수 · visits: 프로필 활동 · promo: 홍보(광고 표기) 콘텐츠
// 인스타그램이 '만' 단위로만 보여주는 값(6.8만 등)은 그 값을 그대로 옮겼습니다.
export const recentReels = [
  { no: 1, reach: 66000, views: 77000, likes: 1915, comments: 12, saves: 1319, shares: 1156, visits: 25 },
  { no: 2, reach: 2287, views: 2635, likes: 12, comments: 2, saves: 6, shares: 2, visits: 2, promo: true },
  { no: 3, reach: 158000, views: 186000, likes: 4797, comments: 26, saves: 3034, shares: 2803, visits: 68 },
  { no: 4, reach: 2870, views: 3374, likes: 18, comments: 8, saves: 19, shares: 6, visits: 2 },
  { no: 5, reach: 4291, views: 5558, likes: 43, comments: 58, saves: 80, shares: 36, visits: 4 },
  { no: 6, reach: 70000, views: 102000, likes: 235, comments: 20, saves: 452, shares: 254, visits: 63 },
  { no: 7, reach: 50000, views: 59000, likes: 1147, comments: 584, saves: 1317, shares: 927, visits: 163 },
  { no: 8, reach: 52000, views: 64000, likes: 2326, comments: 573, saves: 1636, shares: 1077, visits: 165 },
  { no: 9, reach: 5077, views: 6251, likes: 28, comments: 42, saves: 39, shares: 26, visits: 8 },
  { no: 10, reach: 16000, views: 21000, likes: 172, comments: 407, saves: 617, shares: 210, visits: 118 },
]

// 계정 전체 (최근 90일)
export const accountInsights = {
  followers: 3387,
  views: 1035000,
  nonFollowerViewShare: 0.953,
  reachedAccounts: 656000,
  interactions: 77000,
  nonFollowerInteractionShare: 0.767,
  profileVisits: 13000,
  linkTaps: 3639,
}

// 홍보(광고 표기) 콘텐츠 7건 (2026-08-09 ~ 2026-11-18 게시, #광고 · #협찬 · 제품 제공 표기)
// 각 콘텐츠 비율의 단순 평균을 사용합니다. (도달이 큰 콘텐츠 1건에 끌려가지 않도록)
// engagementRate = 공유율 + 좋아요율 + 저장률 + 댓글률 (리포스트 제외)
// 브랜드 광고로 별도 집행되어 도달 대부분이 유료 노출인 콘텐츠 3건은 참여율이 왜곡되므로 제외했습니다.
// 공개 페이지 번들에 포함되므로 브랜드명은 넣지 않고 참여율만 기록합니다.
export const promoContents = [
  { engagementRate: 0.0096 },
  { engagementRate: 0.0139 },
  { engagementRate: 0.02 },
  { engagementRate: 0.0168 },
  { engagementRate: 0.0427 },
  { engagementRate: 0.0215 },
  { engagementRate: 0.0455 },
]

// watchSeconds: 앱 인사이트 기준 평균 시청 시간 약 9초 (2026-11-19 계정 주인 확인)
export const promoAverages = {
  views: 1896,
  reach: 1501,
  likeRate: 0.0169,
  saveRate: 0.0029,
  commentRate: 0.0036,
  shareRate: 0.0009,
  watchSeconds: 9,
}
