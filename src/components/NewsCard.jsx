import { Link } from 'react-router-dom'
import { FiHeart, FiEye, FiClock, FiArrowUpRight } from 'react-icons/fi'

// ========================================
// Bengali Formatting Helpers
// ========================================

const CATEGORY_LABELS = {
  national: 'জাতীয়',
  politics: 'রাজনীতি',
  economy: 'অর্থনীতি',
  international: 'আন্তর্জাতিক',
  country: 'সারাদেশ',
  sports: 'খেলাধুলা',
  religion: 'ধর্ম',
  health: 'স্বাস্থ্য',
  video: 'ভিডিও',
  column: 'কলাম',
  feature: 'বিশেষ প্রতিবেদন',
  opinion: 'মতামত',
  literature: 'সাহিত্য',
  law: 'আইন ও আদালত',
  others: 'অন্যান্য'
}

const toBanglaNumber = value =>
  String(value).replace(/[0-9]/g, digit => '০১২৩৪৫৬৭৮৯'[Number(digit)])

const formatDate = date => {
  if (!date) return 'সাম্প্রতিক'

  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) return 'সাম্প্রতিক'

  return new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Dhaka'
  }).format(parsedDate)
}

const formatCategory = category => {
  if (!category) return 'অন্যান্য'

  const normalized = String(category).trim().toLowerCase()
  return CATEGORY_LABELS[normalized] || category
}

const formatCount = value => toBanglaNumber(value || 0)

const NewsCard = ({ news, variant = 'default' }) => {
  const image =
    news.image || 'https://placehold.co/800x500/F8F7F4/34483C?text=Khobornama'

  const category = formatCategory(news.category)
  const title = news.title || 'শিরোনাম পাওয়া যায়নি'
  const summary = news.summary || ''

  const metadata = (
    <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#202020]/55'>
      <span className='flex items-center gap-1.5'>
        <FiClock size={13} />
        {formatDate(news.publishedAt)}
      </span>

      <span className='flex items-center gap-1.5'>
        <FiEye size={13} />
        {formatCount(news.views)}
      </span>

      <span className='flex items-center gap-1.5'>
        <FiHeart size={13} />
        {formatCount(news.likesCount)}
      </span>
    </div>
  )

  // Featured Card
  if (variant === 'featured') {
    return (
      <Link to={`/news/${news.slug}`} className='group block'>
        <article className='relative h-[380px] sm:h-[420px] overflow-hidden bg-[#202020] group'>
          <img
            src={image}
            alt={title}
            fetchPriority='high'
            decoding='async'
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          />

          <div className='absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/15' />
          <div className='absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/50 to-transparent' />

          <div className='absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white'>
            <span className='inline-block bg-[#34483C] text-white text-xs px-3 py-1.5 mb-4'>
              {category}
            </span>

            <h2
              className='text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug line-clamp-3 text-white group-hover:text-[#E4E1DC] transition-colors'
              style={{ textShadow: '0 2px 12px rgba(0,0,0,0.75)' }}
            >
              {title}
            </h2>

            {summary && (
              <p
                className='text-sm sm:text-base text-white/85 mt-3 leading-relaxed line-clamp-2 max-w-2xl'
                style={{ textShadow: '0 1px 6px rgba(0,0,0,0.7)' }}
              >
                {summary}
              </p>
            )}

            <div className='mt-5 flex items-center justify-between gap-4'>
              <div className='text-white/75'>{metadata}</div>

              <span className='flex items-center gap-2 text-sm text-white group-hover:text-[#C9D5CA] transition-colors shrink-0'>
                বিস্তারিত
                <FiArrowUpRight size={16} />
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Horizontal Card
  if (variant === 'horizontal') {
    return (
      <Link to={`/news/${news.slug}`} className='group block'>
        <article className='flex gap-3 sm:gap-4'>
          <div className='w-28 sm:w-36 aspect-[4/3] shrink-0 overflow-hidden bg-[#E4E1DC]'>
            <img
              src={image}
              alt={title}
              loading='lazy'
              decoding='async'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
          </div>

          <div className='flex-1 min-w-0 flex flex-col justify-center'>
            <span className='text-xs font-semibold text-[#34483C] mb-1.5'>
              {category}
            </span>

            <h3 className='text-sm sm:text-base font-semibold leading-snug text-[#202020] line-clamp-3 group-hover:text-[#34483C] transition-colors'>
              {title}
            </h3>

            <div className='mt-2'>
              <span className='flex items-center gap-1.5 text-[11px] text-[#202020]/50'>
                <FiClock size={12} />
                {formatDate(news.publishedAt)}
              </span>
            </div>
          </div>
        </article>
      </Link>
    )
  }

  // Default News Card
  return (
    <Link to={`/news/${news.slug}`} className='group block h-full'>
      <article className='bg-[#F8F7F4] h-full overflow-hidden border border-[#202020]/5 hover:border-[#34483C]/30 transition-colors duration-300'>
        <div className='relative aspect-[16/10] overflow-hidden bg-[#E4E1DC]'>
          <img
            src={image}
            alt={title}
            loading='lazy'
            decoding='async'
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          />

          <span className='absolute bottom-3 left-3 bg-[#34483C] text-white text-xs px-3 py-1.5'>
            {category}
          </span>
        </div>

        <div className='p-4 sm:p-5'>
          <h3 className='text-lg sm:text-xl font-bold leading-snug text-[#202020] line-clamp-2 group-hover:text-[#34483C] transition-colors'>
            {title}
          </h3>

          {summary && (
            <p className='text-sm text-[#202020]/60 leading-relaxed mt-3 line-clamp-2'>
              {summary}
            </p>
          )}

          <div className='border-t border-[#202020]/10 mt-5 pt-4'>
            <div className='flex items-center justify-between gap-2'>
              <span className='text-xs text-[#202020]/50 flex items-center gap-1.5'>
                <FiClock size={13} />
                {formatDate(news.publishedAt)}
              </span>

              <div className='flex items-center gap-3 text-xs text-[#202020]/45'>
                <span className='flex items-center gap-1'>
                  <FiEye size={13} />
                  {formatCount(news.views)}
                </span>

                <span className='flex items-center gap-1'>
                  <FiHeart size={13} />
                  {formatCount(news.likesCount)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default NewsCard
