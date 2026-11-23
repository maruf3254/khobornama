import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Newspaper, RefreshCw } from 'lucide-react'

import { newsAPI } from '../services/api'
import NewsCard from '../components/NewsCard'
import Loading from '../components/Loading'
import CategorySkeleton from '../components/CategorySkeleton.jsx'
import CategoryAdvertisement from '../components/CategoryAdvertisement'

const categoryNames = {
  national: 'জাতীয়',
  politics: 'রাজনীতি',
  economy: 'অর্থনীতি',
  international: 'আন্তর্জাতিক',
  country: 'সারাদেশ',
  sports: 'খেলা',
  religion: 'ধর্ম',
  health: 'স্বাস্থ্য',
  video: 'ভিডিও',
  opinion: 'মতামত',
  column: 'কলাম',
  feature: 'ফিচার',
  literature: 'সাহিত্য',
  law: 'আইন ও আদালত',
  others: 'অন্যান্য'
}

const Category = () => {
  const { category } = useParams()

  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const categoryTitle = categoryNames[category?.toLowerCase()] || category

  useEffect(() => {
    setPage(1)
  }, [category])

  useEffect(() => {
    let isMounted = true

    const fetchNews = async () => {
      try {
        setLoading(true)
        setError('')

        const res = await newsAPI.getByCategory(category, {
          page,
          limit: 12
        })

        if (!isMounted) return

        setNews(res.data.data || [])
        setTotalPages(res.data.totalPages || 1)
      } catch (err) {
        console.error('Error fetching category news:', err)

        if (isMounted) {
          setNews([])
          setError('সংবাদ লোড করা সম্ভব হয়নি। অনুগ্রহ করে আবার চেষ্টা করুন।')
        }
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    if (category) fetchNews()

    return () => {
      isMounted = false
    }
  }, [category, page])

  const handlePageChange = newPage => {
    if (newPage < 1 || newPage > totalPages) return

    setPage(newPage)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // if (loading) return <Loading />
  if (loading) return <CategorySkeleton />

  return (
    <main
      className='min-h-screen bg-[#E4E1DC] py-8 md:py-12'
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Category Header */}
        <section className='mb-8 md:mb-10'>
          <div className='flex items-center gap-2 text-sm text-[#77736D] mb-4'>
            <span>প্রচ্ছদ</span>
            <ChevronRight size={15} />
            <span className='text-[#34483C] font-medium'>{categoryTitle}</span>
          </div>

          <div className='border-b border-[#202020]/20 pb-6'>
            <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4'>
              <div>
                <div className='flex items-center gap-2 mb-3'>
                  <span className='w-8 h-[2px] bg-[#34483C]' />
                  <span className='text-xs font-semibold tracking-[0.18em] uppercase text-[#34483C]'>
                    Khobornama / Category
                  </span>
                </div>

                <h1 className='text-3xl md:text-5xl font-bold text-[#202020] leading-tight'>
                  {categoryTitle}
                </h1>

                <p className='text-[#77736D] mt-3 text-base md:text-lg'>
                  {categoryTitle} বিভাগের সর্বশেষ সংবাদ ও গুরুত্বপূর্ণ খবর।
                </p>
              </div>

              <div className='flex items-center gap-2 text-sm text-[#77736D]'>
                <Newspaper size={17} />
                <span>সর্বশেষ সংবাদ</span>
              </div>
            </div>
          </div>
        </section>

        {/* Top Category Advertisement */}
        <div className='mb-8'>
          <CategoryAdvertisement placement='homepage-section' device='all' />
        </div>

        {/* News Content */}
        {error ? (
          <div className='bg-[#F8F7F4] border border-[#202020]/10 rounded-xl p-10 text-center'>
            <p className='text-[#77736D] mb-5'>{error}</p>

            <button
              onClick={() => setPage(current => current)}
              className='inline-flex items-center gap-2 px-5 py-2.5 bg-[#202020] text-white rounded-lg hover:bg-[#34483C] transition-colors'
            >
              <RefreshCw size={16} />
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : news.length === 0 ? (
          <div className='bg-[#F8F7F4] border border-[#202020]/10 rounded-xl py-20 px-5 text-center'>
            <div className='w-16 h-16 mx-auto rounded-full bg-[#E4E1DC] flex items-center justify-center mb-5'>
              <Newspaper size={28} className='text-[#34483C]' />
            </div>

            <h2 className='text-2xl font-bold text-[#202020] mb-2'>
              কোনো সংবাদ পাওয়া যায়নি
            </h2>

            <p className='text-[#77736D]'>
              এই বিভাগে এখনো কোনো সংবাদ প্রকাশিত হয়নি।
            </p>
          </div>
        ) : (
          <>
            {/* News Count */}
            <div className='flex items-center justify-between mb-6'>
              <p className='text-sm text-[#77736D]'>
                <span className='font-semibold text-[#202020]'>
                  {categoryTitle}
                </span>{' '}
                বিভাগের সংবাদ
              </p>

              <span className='text-xs text-[#77736D]'>
                পৃষ্ঠা {page} / {totalPages}
              </span>
            </div>

            {/* News Content with Sidebar Advertisement */}
            {/* <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'> */}
              {/* Main News */}
              {/* <div className='lg:col-span-3'>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6'>
                  {news.map(item => (
                    <NewsCard key={item._id} news={item} />
                  ))}
                </div>
              </div> */}

              {/* Sidebar Advertisement */}
              {/* <aside className='hidden lg:block'>
                <div className='sticky top-24'>
                  <CategoryAdvertisement placement='sidebar' device='desktop' />
                </div>
              </aside>
            </div> */}

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
                    className='flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#202020]/20 text-[#202020] hover:bg-[#202020] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#202020]'
                  >
                    <ChevronLeft size={17} />
                    <span>পূর্ববর্তী</span>
                  </button>

                  <div className='flex items-center gap-2'>
                    {Array.from({ length: totalPages }, (_, index) => index + 1)
                      .filter(
                        number =>
                          number === 1 ||
                          number === totalPages ||
                          Math.abs(number - page) <= 1
                      )
                      .map((number, index, arr) => (
                        <span key={number} className='contents'>
                          {index > 0 && number - arr[index - 1] > 1 && (
                            <span className='text-[#77736D] px-1'>...</span>
                          )}

                          <button
                            onClick={() => handlePageChange(number)}
                            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
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
                    className='flex items-center gap-2 px-4 py-2.5 rounded-lg border border-[#202020]/20 text-[#202020] hover:bg-[#202020] hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#202020]'
                  >
                    <span>পরবর্তী</span>
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

export default Category
