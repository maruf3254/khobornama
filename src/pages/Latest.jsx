import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  Newspaper,
  RefreshCw,
  Clock3
} from 'lucide-react'

import { newsAPI } from '../services/api'
import NewsCard from '../components/NewsCard'

const LatestSkeleton = () => {
  return (
    <div className='animate-pulse'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6'>
        {Array.from({ length: 12 }).map((_, index) => (
          <div
            key={index}
            className='bg-[#F8F7F4] overflow-hidden border border-[#202020]/5'
          >
            <div className='aspect-[16/10] bg-[#202020]/10' />

            <div className='p-4 md:p-5'>
              <div className='flex gap-2 mb-4'>
                <div className='h-3 w-16 bg-[#34483C]/15' />
                <div className='h-3 w-20 bg-[#202020]/10' />
              </div>

              <div className='h-5 w-full bg-[#202020]/10 mb-2' />
              <div className='h-5 w-4/5 bg-[#202020]/10 mb-4' />

              <div className='h-3 w-full bg-[#202020]/10 mb-2' />
              <div className='h-3 w-3/4 bg-[#202020]/10 mb-5' />

              <div className='flex justify-between pt-3 border-t border-[#202020]/10'>
                <div className='h-3 w-20 bg-[#202020]/10' />
                <div className='h-3 w-12 bg-[#202020]/10' />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const Latest = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [refreshKey, setRefreshKey] = useState(0)

  const LIMIT = 12

  useEffect(() => {
    let isMounted = true

    const fetchLatestNews = async () => {
      setLoading(true)
      setError('')

      try {
        // Same API fetching pattern as Home page
        const response = await newsAPI.getAll({
          page,
          limit: LIMIT
        })

        if (!isMounted) return

        const result = response.data

        setNews(result.data || [])
        setTotalPages(result.totalPages || 1)
      } catch (err) {
        console.error('Error fetching latest news:', err)

        if (!isMounted) return

        setNews([])
        setTotalPages(1)

        setError(
          err.response?.data?.message ||
            'সর্বশেষ সংবাদ লোড করা সম্ভব হয়নি। আবার চেষ্টা করুন।'
        )
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchLatestNews()

    return () => {
      isMounted = false
    }
  }, [page, refreshKey])

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) return

    setPage(newPage)

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  const handleRetry = () => {
    setRefreshKey(prev => prev + 1)
  }

  const handleRefresh = () => {
    setPage(1)
    setRefreshKey(prev => prev + 1)
  }

  const paginationPages = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  ).filter(
    number =>
      number === 1 || number === totalPages || Math.abs(number - page) <= 1
  )

  return (
    <main
      className='min-h-screen bg-[#E4E1DC] py-8 md:py-12'
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Breadcrumb */}
        <div className='flex items-center gap-2 text-sm text-[#77736D] mb-5'>
          <Link to='/' className='hover:text-[#34483C] transition-colors'>
            প্রচ্ছদ
          </Link>

          <ChevronRight size={15} />

          <span className='text-[#34483C] font-medium'>সর্বশেষ</span>
        </div>

        {/* Page Header */}
        <section className='border-b border-[#202020]/20 pb-6 mb-8'>
          <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5'>
            <div>
              <div className='flex items-center gap-2 mb-3'>
                <span className='w-8 h-[2px] bg-[#34483C]' />

                {/* <span className='text-xs font-semibold tracking-[0.18em] uppercase text-[#34483C]'>
                  Khobornama / Latest News
                </span> */}
              </div>

              <h1 className='text-3xl md:text-5xl font-bold text-[#202020] leading-tight'>
                সর্বশেষ সংবাদ
              </h1>

              <p className='text-[#77736D] mt-3 text-base md:text-lg'>
                দেশ ও বিশ্বের সর্বশেষ গুরুত্বপূর্ণ খবর এক জায়গায়।
              </p>
            </div>

            <button
              onClick={handleRefresh}
              disabled={loading}
              className='inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F8F7F4] border border-[#202020]/15 text-sm font-medium text-[#34483C] hover:bg-[#34483C] hover:text-white transition-all disabled:opacity-50'
            >
              <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
              রিফ্রেশ
            </button>
          </div>
        </section>

        {/* Latest News Content */}
        {loading ? (
          <LatestSkeleton />
        ) : error ? (
          <div className='bg-[#F8F7F4] border border-[#202020]/10 p-10 text-center'>
            <p className='text-[#77736D] mb-5'>{error}</p>

            <button
              onClick={handleRetry}
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-[#202020] text-white hover:bg-[#34483C] transition-colors'
            >
              <RefreshCw size={16} />
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className='bg-[#F8F7F4] border border-[#202020]/10 py-20 px-5 text-center'>
            <div className='w-16 h-16 mx-auto bg-[#E4E1DC] flex items-center justify-center mb-5'>
              <Newspaper size={28} className='text-[#34483C]' />
            </div>

            <h2 className='text-2xl font-bold text-[#202020] mb-2'>
              কোনো সংবাদ পাওয়া যায়নি
            </h2>

            <p className='text-[#77736D]'>
              নতুন সংবাদ প্রকাশিত হলে এখানে দেখতে পাবেন।
            </p>
          </div>
        ) : (
          <>
            {/* News Information */}
            <div className='flex items-center justify-between mb-6'>
              <div className='flex items-center gap-2 text-sm text-[#77736D]'>
                <Clock3 size={16} />
                <span>সর্বশেষ প্রকাশিত সংবাদ</span>
              </div>

              <span className='text-xs text-[#77736D]'>
                পৃষ্ঠা {page} / {totalPages}
              </span>
            </div>

            {/* News Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6'>
              {news.map(item => (
                <NewsCard key={item._id} news={item} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='mt-12 pt-7 border-t border-[#202020]/15'>
                <div className='flex flex-wrap items-center justify-center gap-3'>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className='flex items-center gap-2 px-4 py-2.5 border border-[#202020]/20 text-[#202020] hover:bg-[#202020] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                  >
                    <ChevronLeft size={17} />
                    পূর্ববর্তী
                  </button>

                  <div className='flex items-center gap-2'>
                    {paginationPages.map((number, index) => (
                      <span key={number} className='contents'>
                        {index > 0 &&
                          number - paginationPages[index - 1] > 1 && (
                            <span className='text-[#77736D] px-1'>...</span>
                          )}

                        <button
                          onClick={() => handlePageChange(number)}
                          className={`w-10 h-10 text-sm font-semibold transition-all ${
                            page === number
                              ? 'bg-[#34483C] text-white'
                              : 'bg-[#F8F7F4] text-[#202020] border border-[#202020]/15 hover:bg-[#202020] hover:text-white'
                          }`}
                        >
                          {number}
                        </button>
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className='flex items-center gap-2 px-4 py-2.5 border border-[#202020]/20 text-[#202020] hover:bg-[#202020] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed'
                  >
                    পরবর্তী
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  )
}

export default Latest
