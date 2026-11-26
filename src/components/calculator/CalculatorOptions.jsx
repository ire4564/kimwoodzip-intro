import { useCopy } from '../../i18n/index.jsx'
import { isExtraAvailable } from '../../lib/estimate.js'
import ProductStepper from './ProductStepper.jsx'

function Group({ step, title, hint, children }) {
  return (
    <fieldset className="calc-group">
      <legend className="calc-group__title">
        <span className="calc-group__label">
          <span>{step}</span>
          {title}
        </span>
        {hint && <small className="calc-group__hint">{hint}</small>}
      </legend>
      {children}
    </fieldset>
  )
}

// 카테고리 · 상품 · 유지 기간 · 추가 옵션 선택 영역
export default function CalculatorOptions({
  categoryId,
  onCategoryChange,
  productGroups,
  extras: allExtras,
  quantities,
  onQuantityChange,
  retentionId,
  onRetentionChange,
  selectedExtras,
  onExtraToggle,
  extraMonths,
  onExtraMonthsChange,
  hasVideo,
  hasImages,
  imageTiers,
  onImageTierChange,
}) {
  const { copy, pricing } = useCopy()
  const t = copy.calculator
  const { retentionOptions, extraCategories, contentCategories } = pricing
  // 이미지 장수 옵션은 상품 카드 안에서 고르므로 추가 옵션 목록에서는 뺍니다.
  const extras = allExtras.filter((e) => e.type !== 'perImagePost')
  const imageExtra = allExtras.find((e) => e.type === 'perImagePost')

  return (
    <div className="calc__options">
      <Group step={1} title={t.steps.category} hint={t.steps.categoryHint}>
        <div className="segmented segmented--half" role="radiogroup">
          {contentCategories.map((option) => (
            <label
              key={option.id}
              className={`segmented__item${categoryId === option.id ? ' is-active' : ''}`}
            >
              <input
                type="radio"
                name="category"
                value={option.id}
                checked={categoryId === option.id}
                onChange={() => onCategoryChange(option.id)}
              />
              <span className="segmented__label">{option.label}</span>
            </label>
          ))}
        </div>
      </Group>

      <Group step={2} title={t.steps.products} hint={t.steps.productsHint}>
        <div className="calc-product-groups">
          {productGroups.map((group) => (
            <div key={group.id} className="calc-product-group">
              <p className="calc-product-group__title">{group.title}</p>
              <div className="calc-products">
                {group.items.map((product) => (
                  <ProductStepper
                    key={product.id}
                    product={product}
                    value={quantities[product.id]}
                    onChange={(value) => onQuantityChange(product.id, value)}
                    imageExtra={product.hasImages ? imageExtra : null}
                    imageTier={imageTiers[product.id] ?? 'base'}
                    onImageTierChange={(tier) => onImageTierChange(product.id, tier)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Group>

      <Group step={3} title={t.steps.retention}>
        <div className="segmented" role="radiogroup">
          {retentionOptions.map((option) => (
            <label
              key={option.id}
              className={`segmented__item${retentionId === option.id ? ' is-active' : ''}`}
            >
              <input
                type="radio"
                name="retention"
                value={option.id}
                checked={retentionId === option.id}
                onChange={() => onRetentionChange(option.id)}
              />
              <span className="segmented__label">{option.label}</span>
              <span className="segmented__note">{option.note}</span>
            </label>
          ))}
        </div>
      </Group>

      <Group step={4} title={t.steps.extras}>
        {extraCategories.map((category) => (
          <div key={category.id} className="calc-extra-group">
            <p className="calc-product-group__title">{category.title}</p>
            <div className="calc-extras">
              {extras
                .filter((extra) => extra.category === category.id)
                .map((extra) => {
                  // 옵션의 적용 대상(릴스 / 피드 · 스레드)을 고르지 않으면 선택할 수 없습니다.
                  const disabled = !isExtraAvailable(extra, { hasVideo, hasImages })
                  const checked = selectedExtras.has(extra.id) && !disabled
                  return (
                    <label
                      key={extra.id}
                      className={`calc-extra${checked ? ' is-active' : ''}${disabled ? ' is-disabled' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={checked}
                        disabled={disabled}
                        onChange={() => onExtraToggle(extra.id)}
                      />
                      <span className="calc-check" aria-hidden="true" />
                      <span className="calc-extra__name">
                        {extra.name}
                        {disabled && <em>{t.availableWith(extra.appliesTo)}</em>}
                      </span>
                      <span className={`calc-extra__price${extra.type === 'negotiable' ? ' is-muted' : ''}`}>
                        {extra.priceLabel}
                      </span>
                      {extra.type === 'monthly' && checked && (
                        <select
                          className="calc-extra__months"
                          aria-label={t.monthsLabel(extra.name)}
                          value={extraMonths[extra.id] ?? extra.includedMonths}
                          onChange={(e) => onExtraMonthsChange(extra.id, Number(e.target.value))}
                          onClick={(e) => e.stopPropagation()}
                        >
                          {extra.monthOptions.map((m) => (
                            <option key={m} value={m}>
                              {copy.quote.months(m)}
                            </option>
                          ))}
                        </select>
                      )}
                    </label>
                  )
                })}
            </div>
          </div>
        ))}
      </Group>
    </div>
  )
}
