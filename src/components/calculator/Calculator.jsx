import { useEffect, useMemo, useRef, useState } from 'react'
import { useCopy } from '../../i18n/index.jsx'
import { PACKAGE_DISCOUNT } from '../../data/pricing.js'
import { estimate } from '../../lib/estimate.js'
import { applyPrices } from '../../lib/packages.js'
import SectionHead from '../SectionHead.jsx'
import CalculatorOptions from './CalculatorOptions.jsx'
import EstimateSummary from './EstimateSummary.jsx'
import FloatingTotal from './FloatingTotal.jsx'

export default function Calculator() {
  const { copy, pricing } = useCopy()
  const t = copy.calculator
  const initialQuantities = useMemo(
    () => Object.fromEntries(pricing.productGroups.flatMap((g) => g.items).map((p) => [p.id, 0])),
    [pricing],
  )

  const [categoryId, setCategoryId] = useState(pricing.contentCategories[0].id)
  const [quantities, setQuantities] = useState(initialQuantities)
  const [retentionId, setRetentionId] = useState('6m')
  const [selectedExtras, setSelectedExtras] = useState(() => new Set())
  const [extraMonths, setExtraMonths] = useState({})
  const [imageTiers, setImageTiers] = useState({})
  const [summaryVisible, setSummaryVisible] = useState(false)
  const [sectionVisible, setSectionVisible] = useState(false)
  const summaryRef = useRef(null)
  const sectionRef = useRef(null)

  // 카테고리 추가금을 상품마다 더한 단가로 계산 · 표시합니다.
  const category = pricing.contentCategories.find((c) => c.id === categoryId)
  // 패키지는 카테고리 단가가 적용된 단품 합계에서 다시 할인합니다.
  const pricedGroups = useMemo(
    () =>
      applyPrices(
        pricing.productGroups,
        PACKAGE_DISCOUNT,
        (item) => category.surchargeByItem?.[item.id] ?? category.surcharge,
      ),
    [pricing, category],
  )

  // 카테고리별로 바뀌는 추가 옵션 금액 (테크: 메타 광고 · 상세페이지 활용 월 50,000원)
  const pricedExtras = useMemo(
    () =>
      pricing.extras.map((extra) => {
        const override = category.extraOverrides?.[extra.id]
        if (!override) return extra
        return {
          ...extra,
          ...override,
          priceLabel: category.extraPriceLabels?.[extra.id] ?? override.priceLabel,
        }
      }),
    [pricing, category],
  )

  const result = estimate({
    quantities,
    retentionId,
    selectedExtras,
    extraMonths,
    imageTiers,
    category,
    pricing: { ...pricing, productGroups: pricedGroups, extras: pricedExtras },
    quoteCopy: copy.quote,
  })

  // 계산기 구간에 있으면서 견적 카드가 화면 밖일 때만 하단 합계 바를 띄웁니다.
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === summaryRef.current) setSummaryVisible(entry.isIntersecting)
        if (entry.target === sectionRef.current) setSectionVisible(entry.isIntersecting)
      }
    })
    observer.observe(summaryRef.current)
    observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const handleQuantityChange = (id, value) => setQuantities((prev) => ({ ...prev, [id]: value }))

  const handleExtraToggle = (id) =>
    setSelectedExtras((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  // 단품 조합이 패키지 구성과 겹치면 패키지로 바꾸도록 안내합니다. (할인이 가장 큰 1개만)
  const packageSuggestion = useMemo(() => {
    const items = pricedGroups.flatMap((g) => g.items)
    let best = null
    for (const pkg of items.filter((p) => p.components)) {
      const count = Math.min(...pkg.components.map((id) => quantities[id] || 0))
      if (count < 1) continue
      const saving = (pkg.listMin - pkg.min) * count
      if (!best || saving > best.saving) best = { pkg, count, saving }
    }
    return best
  }, [pricedGroups, quantities])

  const applyPackageSuggestion = () => {
    if (!packageSuggestion) return
    const { pkg, count } = packageSuggestion
    setQuantities((prev) => {
      const next = { ...prev, [pkg.id]: (prev[pkg.id] || 0) + count }
      for (const id of pkg.components) next[id] = prev[id] - count
      return next
    })
    // 단품에서 고른 이미지 장수(6~10장)는 패키지로 옮겨 갑니다.
    if (pkg.components.some((id) => imageTiers[id] === 'extra')) {
      setImageTiers((prev) => ({ ...prev, [pkg.id]: 'extra' }))
    }
  }

  const reset = () => {
    setCategoryId(pricing.contentCategories[0].id)
    setQuantities(initialQuantities)
    setRetentionId('6m')
    setSelectedExtras(new Set())
    setExtraMonths({})
    setImageTiers({})
  }

  return (
    <section className="section section--calc" id="calculator" ref={sectionRef}>
      <div className="container">
        <SectionHead index={5} eyebrow={t.eyebrow} title={t.title} desc={t.desc} />

        <div className="calc">
          <CalculatorOptions
            categoryId={categoryId}
            onCategoryChange={setCategoryId}
            productGroups={pricedGroups}
            extras={pricedExtras}
            quantities={quantities}
            onQuantityChange={handleQuantityChange}
            retentionId={retentionId}
            onRetentionChange={setRetentionId}
            selectedExtras={selectedExtras}
            onExtraToggle={handleExtraToggle}
            extraMonths={extraMonths}
            onExtraMonthsChange={(id, months) => setExtraMonths((prev) => ({ ...prev, [id]: months }))}
            hasVideo={result.hasVideo}
            hasImages={result.hasImages}
            imageTiers={imageTiers}
            onImageTierChange={(id, tier) => setImageTiers((prev) => ({ ...prev, [id]: tier }))}
          />
          <EstimateSummary
            result={result}
            onReset={reset}
            summaryRef={summaryRef}
            suggestion={packageSuggestion}
            onApplySuggestion={applyPackageSuggestion}
          />
        </div>
      </div>

      {result.hasContent && sectionVisible && !summaryVisible && (
        <FloatingTotal
          result={result}
          onOpen={() => summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
        />
      )}
    </section>
  )
}
