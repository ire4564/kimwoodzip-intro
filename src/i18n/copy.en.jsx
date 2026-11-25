import { insightsMeta } from '../data/insights.js'
import { profile } from '../data/profile.js'
import { itemLabels, terms } from './pricing.en.js'

// 영어 사이트 문구 (한국어 사이트를 그대로 번역)
export function createEnCopy({ i, f, account, pricing }) {
  const [y, m, d] = insightsMeta.collectedAt.split('-')

  return {
    htmlLang: 'en',
    languageName: 'English',
    nav: {
      label: 'Main menu',
      items: [
        { href: '#about', label: 'Audience' },
        { href: '#metrics', label: 'Metrics' },
        { href: '#rates', label: 'Rates' },
        { href: '#calculator', label: 'Calculator' },
        { href: '#process', label: 'Process' },
        { href: '#contact', label: 'Contact' },
      ],
      languageLabel: 'Select language',
    },
    hero: {
      introLines: [
        'A lifestyle account built around wood-toned interiors,',
        'home café moments and newlywed living',
      ],
      // 모바일에서는 줄바꿈 없이 한 문장으로 이어서 보여줍니다.
      introFlowOnMobile: true,
      introSub:
        'Products are introduced naturally inside a real home, which makes this account a strong fit for interior, furniture and household brands',
      photos: [
        {
          file: '01.jpg',
          alt: 'Living room at night with an orange sofa, wooden dining table and bookshelves',
        },
        { file: '02.jpg', alt: 'Orange sofa and dining table in front of a wall lit by a projector' },
        { file: '03.jpg', alt: 'Desk setup with a monitor, plants and wooden accessories' },
        { file: '04.jpg', alt: 'Room corner with a green lounge chair, guitar and wooden shelf' },
        { file: '05.jpg', alt: 'Sunlit wood-toned living room with plants on the balcony' },
      ],
      photoCaption: 'WOOD · HOME CAFÉ · NEWLYWED',
      cardLabel: 'Account overview',
      stats: [
        { label: 'Followers', value: f.num(i.followers), unit: '' },
        { label: 'Non-follower views', value: f.pct(i.nonFollowerViewShare, 0), unit: '' },
        { label: 'Avg. Reels reach', value: f.approx(i.reachMean), unit: '' },
        { label: 'Median Reels reach', value: f.approx(i.reachMedian), unit: '' },
      ],
      meta: ({ days, months }) =>
        `Opened ${account.y}.${account.m}.${account.d} · day ${days} (about ${months} months) · ${profile.posts} posts · 3–5 posts a week`,
      actions: { calculator: 'Calculate a budget', contact: 'Start a campaign' },
      slider: {
        prev: 'Previous photo',
        next: 'Next photo',
        bullet: 'Go to photo {{index}}',
      },
    },
    audience: {
      eyebrow: 'Audience',
      title: 'Who is watching',
      desc: 'Everyday newlywed life in a 5-pyeong living-room library, for people in their 20s–30s curious about married life.',
      targets: [
        {
          title: 'Newlyweds and couples to be',
          desc: 'Couples in their 20s–30s curious how other newlyweds furnish their home and live together',
        },
        {
          title: 'Small living-room library',
          desc: 'People who want to turn a small, TV-free living room into a library or hobby space',
        },
        {
          title: 'First home setup',
          desc: 'People setting up a first home who want realistic guides on furniture, layout and budget',
        },
        {
          title: 'Walnut and wood tones',
          desc: 'People who love walnut tones, solid wood furniture and a wood-café mood',
        },
        {
          title: 'Home café · home bar',
          desc: 'Couples who want a home café by day and a home bar by night',
        },
        {
          title: 'Older apartments',
          desc: 'People who want to refresh an older apartment through layout and styling',
        },
      ],
      info: [
        { label: 'Main categories', value: 'Interior · Living · Newlywed life' },
        { label: 'Main followers', value: 'South Korea · 20s–30s · women' },
        { label: 'Posting frequency', value: '3–5 posts a week (carousels and Reels)' },
      ],
    },
    metrics: {
      eyebrow: 'Performance',
      title: 'Key account metrics',
      desc: `Instagram Insights · collected ${y}.${m}.${d}`,
      summary: (
        <>
          Across the last {i.reelCount} Reels, average reach was about {f.approx(i.reachMean)} accounts and
          median reach about {f.approx(i.reachMedian)}. Over the last 90 days,{' '}
          <strong>{f.pct(i.nonFollowerViewShare, 0)} of all views came from non-followers</strong>, which
          shows the account keeps reaching new potential customers.
        </>
      ),
      reelsLabel: 'Last 10 Reels',
      reelsNote: i.promoCount > 0 ? `includes ${i.promoCount} sponsored post` : '',
      accountLabel: 'Whole account · last 90 days',
      reelCards: [
        {
          label: 'Average reach',
          value: `~${f.approx(i.reachMean)}`,
          unit: '',
          sub: `About ${i.reachMeanMultiple.toFixed(1)}× the follower count`,
          tone: 'strong',
        },
        {
          label: 'Median reach',
          value: `~${f.approx(i.reachMedian)}`,
          unit: '',
          sub: `About ${i.reachMedianMultiple.toFixed(1)}× followers`,
          tone: 'strong',
        },
        {
          label: 'Average views',
          value: f.num(i.viewsMean),
          unit: '',
          sub: `Median ${f.num(i.viewsMedian)} · peak ${f.num(i.viewsMax)}`,
        },
        {
          label: 'Average engagement',
          value: f.pct(i.engagementRate),
          sub: `${f.num(i.interactions)} likes, comments, saves and shares against reach`,
        },
        { label: 'Share rate', value: f.pct(i.shareRate), sub: `Peak ${f.pct(i.shareRateMax)}` },
        { label: 'Save rate', value: f.pct(i.saveRate), sub: `Peak ${f.pct(i.saveRateMax)}` },
      ],
      accountCards: [
        { label: 'Followers', value: f.num(i.followers), unit: '' },
        {
          label: 'Non-follower views',
          value: f.pct(i.nonFollowerViewShare, 0),
          sub: `${f.compact(i.accountViews)} views in total`,
          tone: 'strong',
        },
        {
          label: 'Non-follower engagement',
          value: f.pct(i.nonFollowerInteractionShare, 1),
          sub: `${f.compact(i.accountInteractions)} interactions in total`,
        },
        {
          label: 'Profile visit rate',
          value: f.pct(i.profileVisitRate),
          sub: `${f.num(i.profileVisits)} visits from ${f.compact(i.reachedAccounts)} accounts reached`,
        },
        {
          label: 'Link click rate',
          value: f.pct(i.linkPerVisitRate),
          sub: `${f.num(i.linkTaps)} clicks against profile visits`,
        },
      ],
      promo: {
        eyebrow: 'Sponsored Content',
        title: 'Sponsored posts still draw engagement',
        body: (
          <>
            The last {i.promoContentCount} sponsored posts averaged <strong>{f.pct(i.promoRate)}</strong>{' '}
            engagement, ranging from {f.pct(i.promoRateMin, 1)} to {f.pct(i.promoRateMax, 1)} per post. The
            regular-content average ({f.pct(i.organicSimpleRate)}) includes viral Reels that reached tens of
            thousands of accounts. Among sponsored posts, feed posts showing the product in detail inside a
            real home drew the strongest response.
          </>
        ),
        compare: [
          { label: `${i.promoContentCount} sponsored posts`, value: f.pct(i.promoRate) },
          { label: `${i.organicCount} regular posts`, value: f.pct(i.organicSimpleRate) },
        ],
        stats: [
          { label: 'Avg. views', value: f.num(i.promoAverages.views) },
          { label: 'Avg. accounts reached', value: f.num(i.promoAverages.reach) },
          { label: 'Like rate', value: f.pct(i.promoAverages.likeRate) },
          { label: 'Comment rate', value: f.pct(i.promoAverages.commentRate) },
          { label: 'Save rate', value: f.pct(i.promoAverages.saveRate) },
          { label: 'Share rate', value: f.pct(i.promoAverages.shareRate) },
          { label: 'Avg. watch time', value: `${i.promoAverages.watchSeconds}s` },
        ],
      },
      footnotes: [
        `Reach across the last ${i.reelCount} Reels ranged from ${f.num(i.reachMin)} to ${f.num(i.reachMax)} accounts, so average and median reach do not guarantee the reach of any single post.`,
        `Engagement, save and share rates divide all interactions across the last ${i.reelCount} Reels by total reach.`,
        'Per-post link click data is not available, so the link click rate is measured across the whole account.',
        `Sponsored metrics are a simple average of each of the ${i.promoContentCount} posts, and regular content is averaged the same way across the ${i.organicCount} non-sponsored Reels.`,
        'Sponsored posts that the brand ran as paid ads, where most reach came from paid placement, are excluded because their engagement rate is distorted.',
      ],
    },
    strengths: {
      eyebrow: 'Strengths',
      title: 'What this account does well',
      quote: (
        <>
          Content that reaches new potential customers and keeps drawing engagement even when it is labelled
          as an ad.
          <br />A good fit for interior and household products shown inside a real home.
        </>
      ),
      items: [
        {
          title: 'Reach well beyond the follower count',
          stat: `${i.reelsAboveTwiceFollowers} / ${i.reelCount}`,
          desc: `${i.reelsAboveTwiceFollowers} of the last ${i.reelCount} Reels reached more than twice the follower count.`,
        },
        {
          title: 'Engagement continues on sponsored posts',
          stat: f.pct(i.promoRate),
          desc: `Average engagement across the last ${i.promoContentCount} sponsored posts, up to ${f.pct(i.promoRateMax, 1)} on a single post.`,
        },
        {
          title: 'Saves that signal purchase intent',
          stat: f.pct(i.saveRate),
          desc: `Save rate against reach across the last ${i.reelCount} Reels, reaching ${f.pct(i.saveRateMax, 1)} on informative content.`,
        },
        {
          title: 'Products shown in a real home',
          stat: 'Real Home',
          desc: 'Real usage scenes give products an everyday tone rather than an advertising one.',
        },
      ],
    },
    rateCard: {
      eyebrow: 'Rate Card',
      title: 'Products and rates',
      desc: 'All rates include VAT.',
      groups: pricing.productGroups,
      badge: itemLabels['pkg-feed-reels'].badge,
      termsTitle: 'Terms',
      terms,
      extrasTitle: 'Add-ons and further use',
      appliesLabel: (appliesTo) =>
        appliesTo.length > 1 ? 'Feed · Threads · Reels' : appliesTo[0] === 'video' ? 'Reels' : 'Feed · Threads',
      extraCategories: pricing.extraCategories,
      extrasHead: { request: 'Request', price: 'Additional cost' },
      extras: pricing.extras,
      extrasNote:
        'Meta ads creative use and product page · online store use are free for the first 2 months, then ₩20,000 for each additional month. Percentage options are based on the total rate of the products they apply to.',
    },
    rationale: {
      eyebrow: 'Pricing Basis',
      title: 'How these rates are set',
      text: 'Rates combine average performance, production difficulty, category fit, and the scope of shooting and editing. They are based on the average performance of a single post rather than one viral hit.',
      reasons: [
        `Median reach is about ${i.reachMedianMultiple.toFixed(1)}× the follower count.`,
        `${i.reelsAboveTwiceFollowers} of the last ${i.reelCount} Reels reached more than twice the follower count.`,
        `${f.pct(i.nonFollowerViewShare, 0)} of views over the last 90 days came from non-followers.`,
        `Sponsored posts still average ${f.pct(i.promoRate)} engagement (${f.pct(i.promoRateMin, 1)}–${f.pct(i.promoRateMax, 1)} per post).`,
        'The account topic is a close fit for interior and household brands.',
      ],
    },
    calculator: {
      eyebrow: 'Estimate',
      title: 'Budget calculator',
      desc: 'Pick the products and options you need and the estimated budget appears right away.',
      steps: {
        products: 'Choose products',
        productsHint: 'You can combine products and change the quantity.',
        retention: 'Content retention',
        extras: 'Add-ons',
      },
      availableWith: (appliesTo) =>
        appliesTo.includes('images')
          ? 'Available with feed, Threads or Reels'
          : 'Available with products that include Reels',
      imageTier: {
        label: (name) => `${name} image count`,
        base: 'Up to 5',
        baseNote: 'No extra',
        extra: '6–10',
      },
      monthsLabel: (name) => `${name} period`,
      quantity: (name) => `${name} quantity`,
      decrease: (name) => `Decrease ${name} quantity`,
      increase: (name) => `Increase ${name} quantity`,
      summary: {
        title: 'Estimate',
        reset: 'Reset',
        negotiable: 'To be discussed',
        totalLabel: 'Estimated budget · VAT included',
        negotiableNote: (count) =>
          `${count} item${count > 1 ? 's' : ''} to be discussed ${count > 1 ? 'are' : 'is'} not included in this amount.`,
        rangeNote: 'Range rates are confirmed after discussing the shooting difficulty and scope.',
        mail: 'Send this estimate by email',
        copy: 'Copy estimate (for DM)',
        copied: 'Copied ✓',
        copyFallback: 'Please copy the estimate below.',
        emptyLines: ['Choose a product to see', 'your estimated budget here.'],
        disclaimer:
          'This is a reference estimate. The final quote may change with the scope and schedule of the campaign.',
      },
      bar: { label: 'Estimated budget', open: 'View estimate' },
    },
    process: {
      eyebrow: 'Process',
      title: 'How a campaign runs',
      desc: 'Production usually takes the following time after the product arrives.',
      leadTimes: [
        { label: 'Feed content', value: 'About 5–7 days' },
        { label: 'Reels content', value: 'About 7–10 days' },
      ],
      stepLabel: (index) => `STEP ${index}`,
      steps: [
        {
          title: 'Campaign enquiry',
          desc: 'Share the brand, product, content type you have in mind, preferred upload date and budget.',
        },
        {
          title: 'Campaign details',
          desc: 'We agree on product features, required messages, hashtags, mentions, links, ad disclosure and content direction.',
        },
        {
          title: 'Quote and schedule',
          desc: 'Content type, production scope, rate, revisions, usage rights and the upload date are confirmed.',
        },
        {
          title: 'Product delivery and production',
          desc: 'Filming and editing start once the product arrives. Timing can shift with the product or shooting conditions.',
        },
        {
          title: 'Draft review',
          desc: 'A draft is shared when needed, with one revision included. Full rewrites beyond typos or missing information may cost extra.',
        },
        {
          title: 'Upload and results',
          desc: 'The content goes live on the agreed date, and the post link with the available performance data follows.',
        },
      ],
    },
    contact: {
      eyebrow: 'Contact',
      title: 'Start a campaign',
      desc: 'Please send an Instagram DM or an email including the details below.',
      dm: `Instagram DM @${profile.handle}`,
      checklist: [
        'Brand and contact name',
        'Product name and product link',
        'Content type: feed / Reels / story',
        'Preferred upload date',
        'Campaign details and must-have requests',
        'Budget',
        'Whether the content will be reused',
        'Product and shipping arrangements',
      ],
    },
    quote: {
      heading: `[Campaign estimate · @${profile.handle}]`,
      selected: '■ Selected items',
      negotiableHeading: '■ To be discussed',
      total: (range) => `■ Estimated budget (VAT included): ${range}`,
      negotiableNote: '  * Items to be discussed are not included in this amount.',
      rangeNote: '  * Range rates are confirmed after discussing the shooting difficulty and scope.',
      campaignHeading: '■ Campaign details',
      campaignFields: [
        '- Brand / contact name: ',
        '- Product name / link: ',
        '- Preferred upload date: ',
        '- Campaign details and must-have requests: ',
        '- Product and shipping arrangements: ',
      ],
      retentionLabel: (label) => `Content retention ${label}`,
      months: (n) => `${n} month${n > 1 ? 's' : ''}`,
      imageExtra: (name) => `${name} · 6–10 images`,
      mailSubject: `[Campaign enquiry] @${profile.handle} estimate`,
    },
  }
}
