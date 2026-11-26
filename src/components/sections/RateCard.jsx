import { useCopy } from '../../i18n/index.jsx'
import SectionHead from '../SectionHead.jsx'

// 진행 조건 · 안내 (상품 단가와 추가 비용은 광고비 계산기에서 보여줍니다)
export default function RateCard() {
  const { copy } = useCopy()
  const t = copy.rateCard

  return (
    <section className="section section--tinted" id="rates">
      <div className="container">
        <SectionHead index={4} eyebrow={t.eyebrow} title={t.title} desc={t.desc} />

        <div className="rate-split">
          <div className="panel">
            <h3 className="panel__title">{t.termsTitle}</h3>
            <dl className="terms">
              {t.terms.map((term) => (
                <div key={term.label} className="terms__row">
                  <dt>{term.label}</dt>
                  <dd>{term.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="panel">
            <h3 className="panel__title">{t.notesTitle}</h3>
            <ul className="rate-notes">
              {t.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
