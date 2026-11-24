// 광고 상품 · 조건 · 추가 비용
// 모든 금액은 부가세 포함 기준입니다.
// min과 max를 다르게 두면 범위 단가로 표시되고, 계산기도 범위로 계산합니다.

export const productGroups = [
  {
    id: 'reels',
    title: '릴스',
    summary: '15~30초 세로형 영상 · 촬영 · 편집 · 기본 자막 · 업로드 · 수정 1회 포함',
    leadTime: '제품 수령 후 약 7~10일',
    items: [
      {
        id: 'reels',
        name: '릴스',
        min: 100000,
        max: 100000,
        hasVideo: true,
      },
    ],
  },
  {
    id: 'feed',
    title: '피드 · 스레드',
    summary: '제품 설명 캡션 · 브랜드 태그 · 수정 1회 포함 · 이미지 5장까지 기본 포함',
    leadTime: '제품 수령 후 약 5~7일',
    items: [
      {
        id: 'feed-image',
        name: '인스타 피드',
        min: 50000,
        max: 50000,
        desc: '기본 5장 · 최대 10장',
        hasImages: true,
      },
      {
        id: 'thread',
        name: '스레드',
        min: 50000,
        max: 50000,
        desc: '기본 5장 · 최대 10장',
        hasImages: true,
      },
    ],
  },
  {
    id: 'package',
    title: '패키지',
    summary: '동일 제품을 여러 형식으로 함께 제작',
    leadTime: '구성에 따라 약 5~10일',
    items: [
      {
        id: 'pkg-feed-reels',
        name: '피드 + 릴스 패키지',
        min: 150000,
        max: 150000,
        desc: '릴스 1건 + 피드 1건',
        hasVideo: true,
        hasImages: true,
        featured: true,
      },
      {
        id: 'pkg-reels-story',
        name: '릴스 + 스토리 패키지',
        min: 110000,
        max: 110000,
        desc: '릴스 1건 + 스토리 1건',
        hasVideo: true,
      },
    ],
  },
  {
    id: 'story',
    title: '스토리',
    summary: '1~3장 · 24시간 노출 · 멘션 또는 링크 포함',
    leadTime: '일정 협의',
    items: [
      {
        id: 'story',
        name: '스토리',
        min: 10000,
        max: 10000,
      },
    ],
  },
]

export const products = productGroups.flatMap((group) => group.items)

export const retentionOptions = [
  { id: '6m', label: '6개월', fee: 0, note: '추가 비용 없음' },
  { id: '1y', label: '1년', fee: 30000, note: '+30,000원' },
  { id: 'over', label: '1년 이상', fee: null, note: '별도 협의' },
]

// 추가 옵션 분류 (단가표 · 계산기에서 이 순서로 묶어 보여줍니다)
export const extraCategories = [
  { id: 'secondary', title: '2차 활용 옵션' },
  { id: 'production', title: '제작 옵션' },
]

// appliesTo: 이 옵션을 쓸 수 있는 상품 종류
// - 'video': 릴스(릴스 포함 패키지) · 'images': 피드 · 스레드(피드 포함 패키지)
//   스토리만 선택했을 때는 어떤 옵션도 적용되지 않습니다.
// type
// - percent: 적용 가능한 상품 단가 합계의 min~max 비율
// - fixed: 고정 금액
// - monthly: includedMonths까지 무료, 이후 1개월마다 pricePerMonth 추가 (계산기에서 개월 수 선택)
// - negotiable: 금액 없이 별도 협의
// - perImagePost: 계산기에서는 체크박스 대신 피드 · 스레드 상품 카드 안에서 장수(5장까지 / 6~10장)로 고릅니다.
//   6~10장을 고른 상품 수량만큼 price가 더해집니다.
const ALL = ['video', 'images']

export const extras = [
  // 2차 활용 옵션
  {
    id: 'metaAds',
    category: 'secondary',
    name: '메타 광고 소재 활용',
    type: 'monthly',
    includedMonths: 1,
    pricePerMonth: 20000,
    monthOptions: [1, 2, 3, 6],
    appliesTo: ['video'],
    priceLabel: '1개월 무료 · 이후 월 20,000원',
  },
  {
    id: 'detailPage',
    category: 'secondary',
    name: '상세페이지 · 자사몰 활용',
    type: 'monthly',
    includedMonths: 1,
    pricePerMonth: 20000,
    monthOptions: [1, 2, 3, 6],
    appliesTo: ALL,
    priceLabel: '1개월 무료 · 이후 월 20,000원',
  },
  {
    id: 'exclusivity',
    category: 'secondary',
    name: '경쟁사 광고 제한',
    type: 'negotiable',
    appliesTo: ALL,
    priceLabel: '별도 협의',
  },
  {
    id: 'cleanVideo',
    category: 'secondary',
    name: '클린본 제공',
    type: 'percent',
    min: 0.3,
    max: 0.3,
    appliesTo: ALL,
    priceLabel: '기본 단가의 30%',
  },
  {
    id: 'repost',
    category: 'secondary',
    name: '브랜드 공식 계정 재게시',
    type: 'percent',
    min: 0.2,
    max: 0.2,
    appliesTo: ALL,
    priceLabel: '기본 단가의 20%',
  },
  // 제작 옵션
  {
    id: 'rush',
    category: 'production',
    name: '급행 제작 (제작 기간 1주일 이하 요청 시)',
    type: 'percent',
    min: 0.2,
    max: 0.2,
    appliesTo: ALL,
    priceLabel: '기본 단가의 20%',
  },
  {
    id: 'extraRevision',
    category: 'production',
    name: '수정 2회 초과',
    type: 'negotiable',
    appliesTo: ALL,
    priceLabel: '회당 추가 비용 · 협의',
  },
  {
    id: 'extraImages',
    category: 'production',
    name: '피드 · 스레드 이미지 추가 (6~10장)',
    type: 'perImagePost',
    price: 30000,
    appliesTo: ['images'],
    priceLabel: '콘텐츠 1건당 30,000원',
  },
]

export const terms = [
  { label: '부가세', value: '모든 단가 부가세 포함' },
  { label: '제작 범위', value: '콘텐츠 제작 및 @kimwood.zip 계정 업로드 · 2차 활용은 별도 논의' },
  { label: '수정 횟수', value: '기본 1회 포함' },
  { label: '콘텐츠 유지 기간', value: '6개월 추가 비용 없음 · 1년 +30,000원 · 1년 이상 협의' },
  { label: '업로드 일정', value: '제품 수령 후 피드 · 스레드 약 5~7일, 릴스 약 7~10일 제작 후 협의 일정에 업로드' },
  { label: '제품 제공 · 배송 · 촬영 비용', value: '캠페인별 협의' },
]
