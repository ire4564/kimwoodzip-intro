import { createContext, useContext, useMemo } from 'react'
import {
  contentCategories as koContentCategories,
  extraCategories as koCategories,
  extras as koExtras,
  PACKAGE_DISCOUNT,
  productGroups as koGroups,
  retentionOptions as koRetention,
} from '../data/pricing.js'
import { applyPrices } from '../lib/packages.js'
import { insights } from '../lib/insights.js'
import { profile } from '../data/profile.js'
import { createFormat } from './format.js'
import { createKoCopy } from './copy.ko.jsx'
import { createEnCopy } from './copy.en.jsx'
import {
  categoryLabels,
  contentCategoryLabels,
  extraLabels,
  groupLabels,
  itemLabels,
  retentionLabels,
  usd,
} from './pricing.en.js'

export const LANGUAGES = [
  { code: 'ko', name: '한국어', short: 'KR', path: '' },
  { code: 'en', name: 'English', short: 'EN', path: 'en/' },
]

// 한국어는 src/data/pricing.js의 원화, 영어는 pricing.en.js의 고정 달러 단가와 문구를 끼워 넣습니다.
function localizePricing(lang) {
  if (lang !== 'en') {
    return {
      productGroups: koGroups,
      retentionOptions: koRetention,
      extras: koExtras,
      extraCategories: koCategories,
      contentCategories: koContentCategories,
    }
  }
  return {
    productGroups: applyPrices(
      koGroups.map((group) => ({
        ...group,
        ...groupLabels[group.id],
        items: group.items.map((item) => {
          const price = usd.items[item.id]
          return { ...item, ...itemLabels[item.id], ...(price != null && { min: price, max: price }) }
        }),
      })),
      PACKAGE_DISCOUNT,
      () => 0,
      usd.packageRound,
    ),
    retentionOptions: koRetention.map((option) => ({
      ...option,
      ...retentionLabels[option.id],
      ...(option.id in usd.retention && { fee: usd.retention[option.id] }),
    })),
    extras: koExtras.map((extra) => ({ ...extra, ...usd.extras[extra.id], ...extraLabels[extra.id] })),
    extraCategories: koCategories.map((c) => ({ ...c, ...categoryLabels[c.id] })),
    contentCategories: koContentCategories.map((c) => ({
      ...c,
      ...usd.categories[c.id],
      extraOverrides: Object.fromEntries(
        Object.entries(usd.categories[c.id]?.extraOverrides ?? {}).map(([id, o]) => [
          id,
          { ...c.extraOverrides?.[id], ...o },
        ]),
      ),
      ...contentCategoryLabels[c.id],
    })),
    packageRound: usd.packageRound,
  }
}

// 배포 경로(.../kimwoodzip-intro/en/)에서 현재 언어를 읽습니다.
export function detectLanguage(pathname = window.location.pathname) {
  return pathname.replace(/\/+$/, '').endsWith('/en') ? 'en' : 'ko'
}

export function languageHref(code) {
  const base = import.meta.env.BASE_URL
  const target = LANGUAGES.find((l) => l.code === code)
  return `${base}${target?.path ?? ''}`
}

const LanguageContext = createContext(null)

export function LanguageProvider({ lang, children }) {
  const value = useMemo(() => {
    const f = createFormat(lang)
    const pricing = localizePricing(lang)
    const [y, m, d] = profile.openedAt.split('-')
    const args = { i: insights, f, account: { y, m, d }, pricing }
    const copy = lang === 'en' ? createEnCopy(args) : createKoCopy(args)
    return { lang, f, pricing, copy }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const value = useContext(LanguageContext)
  if (!value) throw new Error('LanguageProvider 안에서만 사용할 수 있습니다.')
  return value
}

// 자주 쓰는 형태: const { copy, f } = useCopy()
export const useCopy = useLanguage
