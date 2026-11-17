import { Link } from 'react-router-dom'
import { FiHeart, FiEye, FiClock, FiArrowUpRight } from 'react-icons/fi'
import { format, isValid } from 'date-fns'

const NewsCard = ({ news, variant = 'default' }) => {
  const formatDate = date => {
    if (!date) return 'সাম্প্রতিক'
    const parsedDate = new Date(date)
    return isValid(parsedDate)
      ? format(parsedDate, 'dd MMM, yyyy')
      : 'সাম্প্রতিক'
  }

  const image =
    news.image || 'https://placehold.co/800x500/F8F7F4/34483C?text=Khobornama'

  const category = news.category || 'অন্যান্য'

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
        {news.views || 0}
      </span>

      <span className='flex items-center gap-1.5'>
        <FiHeart size={13} />
        {news.likesCount || 0}
      </span>
    </div>
  )

  // Featured Card
  if (variant === 'featured') {
    return (
      <Link to={`/news/${news.slug}`} className='group block'>
        <article className='relative h-[380px] sm:h-[460px] overflow-hidden bg-[#202020]'>
          <img
            src={image}
            alt={title}
            loading='lazy'
            className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105'
          />

          <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent' />

          <div className='absolute bottom-0 left-0 right-0 p-5 sm:p-8 text-white'>
            <span className='inline-block bg-[#34483C] text-white text-xs px-3 py-1.5 mb-4 capitalize'>
              {category}
            </span>

            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold leading-snug line-clamp-3 group-hover:text-[#E4E1DC] transition-colors'>
              {title}
            </h2>

            {summary && (
              <p className='text-sm sm:text-base text-white/75 mt-3 leading-relaxed line-clamp-2 max-w-2xl'>
                {summary}
              </p>
            )}

            <div className='mt-5 flex items-center justify-between gap-4'>
              <div className='text-white/65'>{metadata}</div>

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
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
            />
          </div>

          <div className='flex-1 min-w-0 flex flex-col justify-center'>
            <span className='text-xs font-semibold text-[#34483C] mb-1.5 capitalize'>
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
        {/* Image */}
        <div className='relative aspect-[16/10] overflow-hidden bg-[#E4E1DC]'>
          <img
            src={image}
            alt={title}
            loading='lazy'
            className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
          />

          <span className='absolute bottom-3 left-3 bg-[#34483C] text-white text-xs px-3 py-1.5 capitalize'>
            {category}
          </span>
        </div>

        {/* Content */}
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
                  {news.views || 0}
                </span>

                <span className='flex items-center gap-1'>
                  <FiHeart size={13} />
                  {news.likesCount || 0}
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
