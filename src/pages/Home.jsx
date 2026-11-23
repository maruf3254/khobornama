import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  FiArrowRight,
  FiTrendingUp,
  FiClock,
  FiGlobe,
  FiActivity,
  FiLayers,
  FiSearch
} from 'react-icons/fi'

import { newsAPI } from '../services/api'
import NewsCard from '../components/NewsCard'

// ========================================
// Helpers
// ========================================

const getNewsArray = response => {
  const data = response?.data?.data

  if (Array.isArray(data)) return data
  if (Array.isArray(data?.news)) return data.news
  if (Array.isArray(data?.articles)) return data.articles

  return []
}

// ========================================
// Skeleton
// ========================================

const NewsSkeleton = ({ variant = 'default' }) => {
  if (variant === 'horizontal') {
    return (
      <div className='flex gap-4 animate-pulse'>
        <div className='w-28 sm:w-36 aspect-[4/3] shrink-0 bg-[#202020]/10 rounded-sm' />

        <div className='flex-1 space-y-3 py-3'>
          <div className='h-3 w-1/3 bg-[#202020]/10 rounded' />
          <div className='h-4 w-full bg-[#202020]/10 rounded' />
          <div className='h-4 w-4/5 bg-[#202020]/10 rounded' />
          <div className='h-3 w-1/2 bg-[#202020]/10 rounded' />
        </div>
      </div>
    )
  }

  if (variant === 'featured') {
    return (
      <div className='animate-pulse'>
        <div className='h-[300px] sm:h-[400px] bg-[#202020]/10 rounded-sm' />
        <div className='space-y-3 mt-4'>
          <div className='h-4 w-1/4 bg-[#202020]/10 rounded' />
          <div className='h-7 w-full bg-[#202020]/10 rounded' />
          <div className='h-4 w-4/5 bg-[#202020]/10 rounded' />
        </div>
      </div>
    )
  }

  return (
    <div className='bg-[#F8F7F4] border border-[#202020]/5 overflow-hidden animate-pulse'>
      <div className='aspect-[16/10] bg-[#202020]/10' />

      <div className='p-4 space-y-4'>
        <div className='h-4 w-1/3 bg-[#202020]/10 rounded' />
        <div className='h-5 w-full bg-[#202020]/10 rounded' />
        <div className='h-5 w-4/5 bg-[#202020]/10 rounded' />
        <div className='h-3 w-1/2 bg-[#202020]/10 rounded' />
      </div>
    </div>
  )
}

// ========================================
// Section Heading
// ========================================

const SectionHeading = ({
  eyebrow,
  title,
  icon: Icon,
  link,
  linkText = 'সব সংবাদ দেখুন'
}) => (
  <div className='flex items-end justify-between border-b border-[#202020]/20 pb-3 mb-6'>
    <div>
      <p className='flex items-center gap-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.18em] text-[#34483C] uppercase font-english mb-2'>
        {Icon && <Icon size={13} />}
        {eyebrow}
      </p>

      <h2 className='text-xl sm:text-2xl lg:text-3xl font-bold'>{title}</h2>
    </div>

    {link && (
      <Link
        to={link}
        className='flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#34483C] hover:underline shrink-0'
      >
        <span className='hidden sm:inline'>{linkText}</span>
        <FiArrowRight size={16} />
      </Link>
    )}
  </div>
)

// ========================================
// Empty State
// ========================================

const EmptyNews = ({ message = 'এই মুহূর্তে কোনো সংবাদ পাওয়া যায়নি।' }) => (
  <div className='bg-[#F8F7F4] border border-[#202020]/5 py-12 px-5 text-center'>
    <FiSearch size={25} className='mx-auto mb-3 text-[#34483C]/40' />

    <p className='text-sm text-[#202020]/60'>{message}</p>
  </div>
)

// ========================================
// News Section
// ========================================

const NewsSection = ({
  title,
  eyebrow,
  icon,
  news,
  loading,
  category,
  columns = 'grid-cols-1 sm:grid-cols-2',
  limit = 4
}) => {
  const items = news.slice(0, limit)

  return (
    <section className='mb-14'>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        icon={icon}
        link={category ? `/category/${category}` : undefined}
      />

      {loading ? (
        <div className={`grid ${columns} gap-6`}>
          {Array.from({ length: limit }).map((_, index) => (
            <NewsSkeleton key={index} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <EmptyNews />
      ) : (
        <div className={`grid ${columns} gap-6`}>
          {items.map(item => (
            <NewsCard key={item._id} news={item} />
          ))}
        </div>
      )}
    </section>
  )
}

// ========================================
// Category Configuration
// ========================================

const CATEGORY_SECTIONS = [
  {
    category: 'politics',
    title: 'রাজনীতি',
    eyebrow: 'POLITICS',
    icon: FiActivity
  },
  {
    category: 'economy',
    title: 'অর্থনীতি ও ব্যবসা',
    eyebrow: 'BUSINESS & ECONOMY',
    icon: FiTrendingUp
  },
  {
    category: 'international',
    title: 'আন্তর্জাতিক',
    eyebrow: 'INTERNATIONAL',
    icon: FiGlobe
  },
  {
    category: 'sports',
    title: 'খেলাধুলা',
    eyebrow: 'SPORTS',
    icon: FiActivity
  },
  {
    category: 'health',
    title: 'স্বাস্থ্য',
    eyebrow: 'HEALTH',
    icon: FiActivity
  },
  {
    category: 'feature',
    title: 'বিশেষ প্রতিবেদন',
    eyebrow: 'SPECIAL REPORT',
    icon: FiLayers
  }
]

// ========================================
// Home Component
// ========================================

const Home = () => {
  const [searchParams] = useSearchParams()

  const [featuredNews, setFeaturedNews] = useState([])
  const [latestNews, setLatestNews] = useState([])
  const [trendingNews, setTrendingNews] = useState([])
  const [categoryNews, setCategoryNews] = useState({})

  const [loading, setLoading] = useState(true)
  const [categoryLoading, setCategoryLoading] = useState(true)

  const searchQuery = searchParams.get('search')?.trim() || ''

  // ======================================
  // Fetch Home News
  // ======================================

  useEffect(() => {
    let active = true

    const fetchNews = async () => {
      setLoading(true)

      try {
        if (searchQuery) {
          const response = await newsAPI.getAll({
            search: searchQuery,
            limit: 20
          })

          if (!active) return

          setLatestNews(getNewsArray(response))
          setFeaturedNews([])
          setTrendingNews([])
          setCategoryNews({})
          return
        }

        const results = await Promise.allSettled([
          newsAPI.getFeatured(4),
          newsAPI.getAll({ limit: 8 }),
          newsAPI.getTrending(5)
        ])

        if (!active) return

        setFeaturedNews(
          results[0].status === 'fulfilled'
            ? getNewsArray(results[0].value)
            : []
        )

        setLatestNews(
          results[1].status === 'fulfilled'
            ? getNewsArray(results[1].value)
            : []
        )

        setTrendingNews(
          results[2].status === 'fulfilled'
            ? getNewsArray(results[2].value)
            : []
        )
      } catch (error) {
        console.error('Home news error:', error)
      } finally {
        if (active) setLoading(false)
      }
    }

    fetchNews()

    return () => {
      active = false
    }
  }, [searchQuery])

  // ======================================
  // Fetch Category News
  // ======================================

  useEffect(() => {
    let active = true

    const fetchCategories = async () => {
      if (searchQuery) {
        setCategoryLoading(false)
        return
      }

      setCategoryLoading(true)

      const results = await Promise.all(
        CATEGORY_SECTIONS.map(async section => {
          try {
            const response = await newsAPI.getByCategory(section.category, {
              limit: 4
            })

            return {
              category: section.category,
              news: getNewsArray(response)
            }
          } catch (error) {
            console.error(`Failed to load ${section.category}:`, error)

            return {
              category: section.category,
              news: []
            }
          }
        })
      )

      if (!active) return

      const updatedCategories = {}

      results.forEach(result => {
        updatedCategories[result.category] = result.news
      })

      setCategoryNews(updatedCategories)
      setCategoryLoading(false)
    }

    fetchCategories()

    return () => {
      active = false
    }
  }, [searchQuery])

  // ======================================
  // Search Results
  // ======================================

  if (searchQuery) {
    return (
      <main className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <SectionHeading
            eyebrow='SEARCH RESULTS'
            title='অনুসন্ধানের ফলাফল'
            icon={FiSearch}
          />

          <p className='text-sm text-[#202020]/60 mb-8'>
            "{searchQuery}" এর জন্য পাওয়া সংবাদসমূহ
          </p>

          {loading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {Array.from({ length: 6 }).map((_, index) => (
                <NewsSkeleton key={index} />
              ))}
            </div>
          ) : latestNews.length === 0 ? (
            <EmptyNews message='কোনো সংবাদ পাওয়া যায়নি। অন্য শব্দ দিয়ে আবার অনুসন্ধান করুন।' />
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
              {latestNews.map(news => (
                <NewsCard key={news._id} news={news} />
              ))}
            </div>
          )}
        </div>
      </main>
    )
  }

  // ======================================
  // Main Home Page
  // ======================================

  return (
    <main className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        {/* Featured News */}
        <section className='mb-16'>
          <SectionHeading
            eyebrow="EDITOR'S CHOICE"
            title='প্রধান সংবাদ'
            icon={FiLayers}
          />

          {loading ? (
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-7'>
              <div className='lg:col-span-3'>
                <NewsSkeleton variant='featured' />
              </div>

              <div className='lg:col-span-2 space-y-6'>
                {[1, 2, 3].map(item => (
                  <NewsSkeleton key={item} variant='horizontal' />
                ))}
              </div>
            </div>
          ) : featuredNews.length === 0 ? (
            <EmptyNews message='কোনো প্রধান সংবাদ পাওয়া যায়নি।' />
          ) : (
            <div className='grid grid-cols-1 lg:grid-cols-5 gap-7'>
              {/* Main Featured */}
              <div className='lg:col-span-3'>
                <NewsCard news={featuredNews[0]} variant='featured' />
              </div>

              {/* Secondary Featured */}
              <div className='lg:col-span-2 flex flex-col gap-5'>
                {featuredNews.slice(1).map(news => (
                  <div
                    key={news._id}
                    className='border-b border-[#202020]/15 pb-5 last:border-0'
                  >
                    <NewsCard news={news} variant='horizontal' />
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Latest and Trending */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16'>
          {/* Latest */}
          <section className='lg:col-span-8'>
            <SectionHeading
              eyebrow='LATEST UPDATES'
              title='সর্বশেষ সংবাদ'
              icon={FiClock}
            />

            {loading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {Array.from({ length: 6 }).map((_, index) => (
                  <NewsSkeleton key={index} />
                ))}
              </div>
            ) : latestNews.length === 0 ? (
              <EmptyNews />
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                {latestNews.map(news => (
                  <NewsCard key={news._id} news={news} />
                ))}
              </div>
            )}
          </section>

          {/* Trending */}
          <aside className='lg:col-span-4'>
            <div className='sticky top-24'>
              <SectionHeading
                eyebrow='MOST READ'
                title='জনপ্রিয় সংবাদ'
                icon={FiTrendingUp}
              />

              <div className='bg-[#F8F7F4] border border-[#202020]/5 p-5 sm:p-6'>
                {loading ? (
                  <div className='space-y-6'>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <NewsSkeleton key={index} variant='horizontal' />
                    ))}
                  </div>
                ) : trendingNews.length === 0 ? (
                  <EmptyNews message='জনপ্রিয় সংবাদ পাওয়া যায়নি।' />
                ) : (
                  <div className='divide-y divide-[#202020]/10'>
                    {trendingNews.map((news, index) => (
                      <div
                        key={news._id}
                        className='flex gap-4 py-5 first:pt-0 last:pb-0'
                      >
                        <span className='font-english text-3xl font-bold text-[#34483C]/35 leading-none'>
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <div className='flex-1 min-w-0'>
                          <NewsCard news={news} variant='horizontal' />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Editorial Box */}
              <div className='mt-7 bg-[#34483C] text-white p-7'>
                <p className='text-[10px] tracking-[0.2em] uppercase font-english text-white/55 mb-4'>
                  KHOBORNAMA EDITORIAL
                </p>

                <h3 className='text-xl sm:text-2xl font-bold leading-snug mb-3 text-[#fff]'>
                  খবরের গভীরে, সত্যের সন্ধানে।
                </h3>

                <p className='text-sm text-white/70 leading-relaxed'>
                  দেশ ও বিশ্বের গুরুত্বপূর্ণ সংবাদ জানতে নিয়মিত চোখ রাখুন
                  খবরনামায়।
                </p>
              </div>
            </div>
          </aside>
        </div>

        {/* Category News Sections */}
        {CATEGORY_SECTIONS.map(section => (
          <NewsSection
            key={section.category}
            title={section.title}
            eyebrow={section.eyebrow}
            icon={section.icon}
            category={section.category}
            news={categoryNews[section.category] || []}
            loading={categoryLoading}
            limit={4}
          />
        ))}

        {/* More News Categories */}
        <section className='mb-14'>
          <div className='bg-[#34483C] text-white p-7 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
            <div>
              <p className='text-[10px] tracking-[0.2em] uppercase font-english text-white/55 mb-3'>
                EXPLORE MORE
              </p>

              <h2 className='text-2xl sm:text-3xl font-bold mb-2 text-[#fff]'>
                আরও সংবাদ পড়ুন
              </h2>

              <p className='text-sm text-white/65'>
                আপনার পছন্দের বিভাগ থেকে সর্বশেষ সংবাদ জেনে নিন।
              </p>
            </div>

            <Link
              to='/category/national'
              className='inline-flex items-center justify-center gap-3 px-6 py-3 bg-[#F8F7F4] text-[#34483C] text-sm font-bold hover:bg-white transition-colors'
            >
              সব সংবাদ দেখুন
              <FiArrowRight size={17} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Home
