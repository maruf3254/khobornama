import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  RefreshCw,
  TrendingUp,
  Newspaper
} from 'lucide-react'

import { newsAPI } from '../services/api'
import NewsCard from '../components/NewsCard'

// Popular Page Skeleton
const PopularSkeleton = () => {
  return (
    <div className='animate-pulse'>
      {/* <div className='mb-8'>
        <div className='h-4 w-32 rounded bg-[#202020]/10 mb-5' />
        <div className='h-9 w-56 rounded bg-[#202020]/10 mb-3' />
        <div className='h-4 w-72 max-w-full rounded bg-[#202020]/10' />
      </div> */}

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className='overflow-hidden border border-[#202020]/5 bg-[#F8F7F4]'
          >
            <div className='aspect-[16/10] bg-[#202020]/10' />

            <div className='p-4 space-y-3'>
              <div className='h-3 w-20 rounded bg-[#202020]/10' />
              <div className='h-5 w-full rounded bg-[#202020]/10' />
              <div className='h-5 w-4/5 rounded bg-[#202020]/10' />
              <div className='h-3 w-full rounded bg-[#202020]/10' />
              <div className='h-3 w-2/3 rounded bg-[#202020]/10' />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Popular = () => {
  const [news, setNews] = useState([])
  const [featuredNews, setFeaturedNews] = useState([])
  const [trendingNews, setTrendingNews] = useState([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [refreshKey, setRefreshKey] = useState(0)

  const LIMIT = 12

  useEffect(() => {
    let isMounted = true

    const fetchPopularNews = async () => {
      setLoading(true)
      setError('')

      try {
        // Same fetching pattern as Home page
        const [featuredRes, latestRes, trendingRes] = await Promise.all([
          newsAPI.getFeatured(3),
          newsAPI.getAll({
            page,
            limit: LIMIT
          }),
          newsAPI.getTrending(5)
        ])

        if (!isMounted) return

        const featured = featuredRes.data.data || []
        const latest = latestRes.data.data || []
        const trending = trendingRes.data.data || []

        setFeaturedNews(featured)
        setNews(latest)
        setTrendingNews(trending)

        setTotalPages(latestRes.data.totalPages || 1)
      } catch (err) {
        console.error('Error fetching popular news:', err)

        if (!isMounted) return

        setError(
          err.response?.data?.message ||
            'জনপ্রিয় সংবাদ লোড করা সম্ভব হয়নি। আবার চেষ্টা করুন।'
        )

        setFeaturedNews([])
        setNews([])
        setTrendingNews([])
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchPopularNews()

    return () => {
      isMounted = false
    }
  }, [page, refreshKey])

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage)
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }

  return (
    <main className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 text-sm text-[#77736d] mb-6'>
          <Link to='/' className='hover:text-[#34483C] transition-colors'>
            প্রচ্ছদ
          </Link>

          <ChevronRight size={15} />

          <span className='text-[#202020] font-medium'>জনপ্রিয় সংবাদ</span>
        </div>

        {/* Page Header */}
        <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-8 md:mb-10'>
          <div>
            <div className='inline-flex items-center gap-2 text-[#34483C] text-sm font-semibold mb-3'>
              <Flame size={17} />
              পাঠকের পছন্দ
            </div>

            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight'>
              জনপ্রিয় সংবাদ
            </h1>

            <p className='text-[#202020]/60 mt-3 text-sm sm:text-base'>
              পাঠকের আগ্রহ ও পাঠসংখ্যায় এগিয়ে থাকা সংবাদগুলো এক জায়গায়।
            </p>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className='inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-[#202020]/15 bg-[#F8F7F4] text-sm font-medium hover:bg-white transition-colors disabled:opacity-50'
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            রিফ্রেশ
          </button>
        </div>

        {/* Section Label */}
        <div className='flex items-center gap-3 border-b border-[#202020]/20 pb-4 mb-7'>
          <div className='w-9 h-9 bg-[#34483C] text-white flex items-center justify-center'>
            <TrendingUp size={19} />
          </div>

          <div>
            <h2 className='font-bold text-lg'>সর্বাধিক জনপ্রিয়</h2>

            <p className='text-xs text-[#202020]/50'>Most Popular Stories</p>
          </div>
        </div>

        {/* Loading */}
        {loading && <PopularSkeleton />}

        {/* Error */}
        {!loading && error && (
          <div className='bg-[#F8F7F4] border border-[#202020]/10 p-8 text-center'>
            <Newspaper size={36} className='mx-auto text-[#99938a] mb-4' />

            <h3 className='text-lg font-bold mb-2'>সংবাদ লোড করা যায়নি</h3>

            <p className='text-sm text-[#202020]/60 mb-5'>{error}</p>

            <button
              onClick={handleRefresh}
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-[#34483C] text-white text-sm font-semibold hover:bg-[#26382e] transition-colors'
            >
              <RefreshCw size={15} />
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && news.length === 0 && (
          <div className='bg-[#F8F7F4] border border-[#202020]/10 py-16 px-5 text-center'>
            <Newspaper size={42} className='mx-auto text-[#aaa49a] mb-4' />

            <h3 className='text-xl font-bold mb-2'>
              কোনো জনপ্রিয় সংবাদ পাওয়া যায়নি
            </h3>

            <p className='text-sm text-[#202020]/60'>
              নতুন সংবাদ প্রকাশিত হলে এখানে দেখা যাবে।
            </p>
          </div>
        )}

        {/* News Grid */}
        {!loading && !error && news.length > 0 && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
              {news.map((item, index) => (
                <div key={item._id} className='relative'>
                  {page === 1 && index < 3 && (
                    <div className='absolute top-3 left-3 z-10 flex items-center gap-1.5 px-2.5 py-1 bg-[#34483C] text-white text-xs font-semibold shadow-sm'>
                      <Flame size={12} />
                      Top {index + 1}
                    </div>
                  )}

                  <NewsCard news={item} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='flex items-center justify-center gap-3 mt-12'>
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className='w-10 h-10 flex items-center justify-center border border-[#202020]/15 bg-[#F8F7F4] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                  aria-label='Previous page'
                >
                  <ChevronLeft size={19} />
                </button>

                <span className='text-sm font-medium text-[#555149]'>
                  পৃষ্ঠা {page} / {totalPages}
                </span>

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === totalPages}
                  className='w-10 h-10 flex items-center justify-center border border-[#202020]/15 bg-[#F8F7F4] hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                  aria-label='Next page'
                >
                  <ChevronRight size={19} />
                </button>
              </div>
            )}
          </>
        )}

        {/* Featured & Trending Data */}
        {!loading && !error && (
          <div className='mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8'>
            {featuredNews.length > 0 && (
              <section>
                <div className='border-b border-[#202020]/20 pb-3 mb-5'>
                  <p className='text-xs uppercase tracking-widest text-[#34483C] mb-1'>
                    Editor's Choice
                  </p>

                  <h2 className='text-2xl font-bold'>প্রধান সংবাদ</h2>
                </div>

                <div className='space-y-5'>
                  {featuredNews.map(item => (
                    <NewsCard key={item._id} news={item} variant='horizontal' />
                  ))}
                </div>
              </section>
            )}

            {trendingNews.length > 0 && (
              <section>
                <div className='border-b border-[#202020]/20 pb-3 mb-5'>
                  <p className='text-xs uppercase tracking-widest text-[#34483C] mb-1'>
                    Most Read
                  </p>

                  <h2 className='text-2xl font-bold'>পাঠকপ্রিয় সংবাদ</h2>
                </div>

                <div className='bg-[#F8F7F4] p-5 divide-y divide-[#202020]/10'>
                  {trendingNews.map((item, index) => (
                    <div
                      key={item._id}
                      className='flex gap-4 py-4 first:pt-0 last:pb-0'
                    >
                      <span className='text-2xl font-bold text-[#34483C]/40'>
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div className='flex-1 min-w-0'>
                        <NewsCard news={item} variant='horizontal' />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Popular
