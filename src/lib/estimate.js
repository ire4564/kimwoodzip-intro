import { profile } from '../data/profile.js'

// 선택 상태와 (언어에 맞게 번역된) 상품 정보를 받아 예상 광고비를 계산합니다.
// 추가 옵션은 appliesTo에 맞는 상품을 골랐을 때만 적용되고,
// 비율 옵션(클린본 · 재게시 · 급행)은 그 상품들의 단가 합계에만 적용됩니다.
export function estimate({
  quantities,
  retentionId,
  selectedExtras,
  extraMonths = {},
  imageTiers = {},
  category,
  pricing,
  quoteCopy,
}) {
  const products = pricing.productGroups.flatMap((group) => group.items)

  const productLines = products
    .filter((p) => quantities[p.id] > 0)
    .map((p) => {
      const qty = quantities[p.id]
      return { id: p.id, label: `${p.name} × ${qty}`, min: p.min * qty, max: p.max * qty }
    })

  const base = {
    min: productLines.reduce((total, line) => total + line.min, 0),
    max: productLines.reduce((total, line) => total + line.max, 0),
  }
  const hasContent = base.max > 0
  const hasVideo = products.some((p) => p.hasVideo && quantities[p.id] > 0)
  const hasImages = products.some((p) => p.hasImages && quantities[p.id] > 0)
  // 상품이 옵션의 적용 대상인지 (릴스 → 'video', 피드 · 스레드 → 'images')
  const fits = (p, appliesTo) =>
    (p.hasVideo && appliesTo.includes('video')) || (p.hasImages && appliesTo.includes('images'))
  const eligibleBase = (appliesTo) =>
    productLines.reduce(
      (acc, line) => {
        const p = products.find((x) => x.id === line.id)
        return fits(p, appliesTo) ? { min: acc.min + line.min, max: acc.max + line.max } : acc
      },
      { min: 0, max: 0 },
    )
  const hasRangePrice = products.some((p) => quantities[p.id] > 0 && p.min !== p.max)

  const extraLines = []
  const negotiable = []

  const retention = pricing.retentionOptions.find((r) => r.id === retentionId)
  if (hasContent && retention) {
    const label = quoteCopy.retentionLabel(retention.label)
    if (retention.fee === null) negotiable.push(label)
    else if (retention.fee > 0) {
      extraLines.push({ id: 'retention', label, min: retention.fee, max: retention.fee })
    }
  }

  // 이미지 장수 추가금: 상품 카드에서 6~10장을 고른 피드 · 스레드(피드 포함 패키지)의 수량만큼
  const imageExtra = pricing.extras.find((e) => e.type === 'perImagePost')
  if (imageExtra) {
    for (const p of products) {
      const qty = quantities[p.id] || 0
      if (!p.hasImages || qty === 0 || imageTiers[p.id] !== 'extra') continue
      extraLines.push({
        id: `${imageExtra.id}-${p.id}`,
        label: `${quoteCopy.imageExtra(p.name)} × ${qty}`,
        min: imageExtra.price * qty,
        max: imageExtra.price * qty,
      })
    }
  }

  for (const extra of pricing.extras) {
    if (extra.type === 'perImagePost') continue
    if (!selectedExtras.has(extra.id) || !hasContent) continue
    if (!isExtraAvailable(extra, { hasVideo, hasImages })) continue
    if (extra.type === 'negotiable') {
      negotiable.push(extra.name)
    } else if (extra.type === 'fixed') {
      extraLines.push({ id: extra.id, label: extra.name, min: extra.price, max: extra.price })
    } else if (extra.type === 'monthly') {
      const months = extraMonths[extra.id] ?? extra.includedMonths
      const fee = Math.max(0, months - extra.includedMonths) * extra.pricePerMonth
      extraLines.push({
        id: extra.id,
        label: `${extra.name} (${quoteCopy.months(months)})`,
        min: fee,
        max: fee,
      })
    } else if (extra.type === 'percent') {
      const target = eligibleBase(extra.appliesTo)
      extraLines.push({
        id: extra.id,
        label: `${extra.name} (${extra.min === extra.max ? extra.min * 100 : `${extra.min * 100}~${extra.max * 100}`}%)`,
        min: target.min * extra.min,
        max: target.max * extra.max,
      })
    }
  }

  const lines = [...productLines, ...extraLines]
  return {
    category,
    hasContent,
    hasVideo,
    hasImages,
    hasRangePrice,
    base,
    productLines,
    extraLines,
    negotiable,
    min: lines.reduce((sum, l) => sum + l.min, 0),
    max: lines.reduce((sum, l) => sum + l.max, 0),
  }
}

// 지금 고른 상품으로 이 옵션을 쓸 수 있는지
export function isExtraAvailable(extra, { hasVideo, hasImages }) {
  const appliesTo = extra.appliesTo ?? ['video', 'images']
  return (hasVideo && appliesTo.includes('video')) || (hasImages && appliesTo.includes('images'))
}

// DM·메일로 보낼 견적 내용
export function buildQuoteText(result, quoteCopy, f) {
  const rows = [
    quoteCopy.heading,
    '',
    ...(result.category ? [quoteCopy.category(result.category.label), ''] : []),
    quoteCopy.selected,
    ...result.productLines.map((l) => `- ${l.label}: ${f.wonRange(l.min, l.max)}`),
    ...result.extraLines.map((l) => `- ${l.label}: ${f.wonRange(l.min, l.max)}`),
  ]
  if (result.negotiable.length) {
    rows.push('', quoteCopy.negotiableHeading, ...result.negotiable.map((n) => `- ${n}`))
  }
  rows.push(
    '',
    quoteCopy.total(f.wonRange(result.min, result.max)),
    result.negotiable.length ? quoteCopy.negotiableNote : '',
    result.hasRangePrice ? quoteCopy.rangeNote : '',
    '',
    quoteCopy.campaignHeading,
    ...quoteCopy.campaignFields,
  )
  return rows.filter((row, i, arr) => row !== '' || arr[i - 1] !== '').join('\n')
}

// 견적 내용을 담아 메일 앱을 여는 링크
export function buildMailHref(quoteText, subject) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(quoteText)}`
}
