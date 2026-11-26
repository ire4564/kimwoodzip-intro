// 패키지 가격 계산
// 패키지는 components(구성 단품 id)만 갖고, 가격은 구성 단품 단가 합계에서 할인율만큼 뺀 값으로 정합니다.
// addFor(item): 단품마다 더할 금액 (카테고리 추가금)
// roundTo: 패키지 가격 반올림 단위 (원화 1원 · 달러 $5)
export function applyPrices(groups, discount, addFor = () => 0, roundTo = 1) {
  const singles = {}
  const pricedSingles = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      if (item.components) return item
      const add = addFor(item)
      const priced = { ...item, min: item.min + add, max: item.max + add }
      singles[item.id] = priced
      return priced
    }),
  }))
  return pricedSingles.map((group) => ({
    ...group,
    items: group.items.map((item) => {
      if (!item.components) return item
      const listMin = item.components.reduce((sum, id) => sum + singles[id].min, 0)
      const listMax = item.components.reduce((sum, id) => sum + singles[id].max, 0)
      return {
        ...item,
        listMin,
        listMax,
        min: Math.round((listMin * (1 - discount)) / roundTo) * roundTo,
        max: Math.round((listMax * (1 - discount)) / roundTo) * roundTo,
      }
    }),
  }))
}
