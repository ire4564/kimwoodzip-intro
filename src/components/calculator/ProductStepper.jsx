import { useCopy } from '../../i18n/index.jsx'

export const MAX_QTY = 10

// 상품 한 칸: 체크(선택/해제)와 수량 조절
// 피드 · 스레드처럼 이미지가 들어가는 상품은 선택하면 이미지 장수(5장까지 / 6~10장)도 고릅니다.
export default function ProductStepper({
  product,
  value: rawValue,
  onChange,
  imageExtra,
  imageTier = 'base',
  onImageTierChange,
}) {
  const { copy, f } = useCopy()
  const t = copy.calculator
  // 상품 목록이 바뀌어 수량이 비어 있어도 0으로 다루도록 (NaN 방지)
  const value = Number.isFinite(rawValue) ? rawValue : 0
  const active = value > 0

  return (
    <div className={`calc-product${active ? ' is-active' : ''}`}>
      <button
        type="button"
        className="calc-product__main"
        aria-pressed={active}
        onClick={() => onChange(active ? 0 : 1)}
      >
        <span className="calc-check" aria-hidden="true" />
        <span className="calc-product__text">
          <span className="calc-product__name">{product.name}</span>
          <span className="calc-product__price">
            {product.listMin > product.min && (
              <>
                <s className="calc-product__list">{f.wonRange(product.listMin, product.listMax)}</s>{' '}
              </>
            )}
            {f.wonRange(product.min, product.max)}
            {product.listMin > product.min && (
              <em className="calc-product__discount">
                {t.packageDiscount(Math.round((1 - product.min / product.listMin) * 100))}
              </em>
            )}
          </span>
        </span>
      </button>
      <div className="stepper" aria-label={t.quantity(product.name)}>
        <button
          type="button"
          onClick={() => onChange(Math.max(0, value - 1))}
          disabled={value === 0}
          aria-label={t.decrease(product.name)}
        >
          −
        </button>
        <output aria-live="polite">{value}</output>
        <button
          type="button"
          onClick={() => onChange(Math.min(MAX_QTY, value + 1))}
          disabled={value === MAX_QTY}
          aria-label={t.increase(product.name)}
        >
          +
        </button>
      </div>
      {imageExtra && active && (
        <div className="calc-product__tiers" role="radiogroup" aria-label={t.imageTier.label(product.name)}>
          {[
            { id: 'base', label: t.imageTier.base, note: t.imageTier.baseNote },
            { id: 'extra', label: t.imageTier.extra, note: `+${f.won(imageExtra.price)}` },
          ].map((tier) => (
            <label key={tier.id} className={`calc-product__tier${imageTier === tier.id ? ' is-active' : ''}`}>
              <input
                type="radio"
                name={`image-tier-${product.id}`}
                checked={imageTier === tier.id}
                onChange={() => onImageTierChange(tier.id)}
              />
              <span>{tier.label}</span>
              <small>{tier.note}</small>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}
