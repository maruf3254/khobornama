// import { useState, useEffect } from 'react'
// import { useSearchParams, Link } from 'react-router-dom'
// import { newsAPI } from '../services/api'
// import NewsCard from '../components/NewsCard'
// import Loading from '../components/Loading'

// const Home = () => {
//   const [searchParams] = useSearchParams()

//   const [featuredNews, setFeaturedNews] = useState([])
//   const [latestNews, setLatestNews] = useState([])
//   const [trendingNews, setTrendingNews] = useState([])
//   const [loading, setLoading] = useState(true)

//   const searchQuery = searchParams.get('search')

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true)

//         if (searchQuery) {
//           const res = await newsAPI.getAll({
//             search: searchQuery,
//             limit: 20
//           })

//           setLatestNews(res.data.data || [])
//           setFeaturedNews([])
//           setTrendingNews([])
//         } else {
//           const [featuredRes, latestRes, trendingRes] = await Promise.all([
//             newsAPI.getFeatured(3),
//             newsAPI.getAll({ limit: 9 }),
//             newsAPI.getTrending(5)
//           ])

//           setFeaturedNews(featuredRes.data.data || [])
//           setLatestNews(latestRes.data.data || [])
//           setTrendingNews(trendingRes.data.data || [])
//         }
//       } catch (error) {
//         console.error('Error fetching news:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchNews()
//   }, [searchQuery])

//   if (loading) return <Loading />

//   return (
//     <main className='min-h-screen bg-[#E4E1Dc] text-[#202020]'>
//       <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>
//         {/* Search Results */}
//         {searchQuery ? (
//           <section>
//             <div className='border-b border-[#202020]/15 pb-5 mb-8'>
//               <p className='text-xs font-semibold tracking-[0.2em] uppercase text-[#34483C] mb-2 font-english'>
//                 Search
//               </p>

//               <h1 className='text-2xl sm:text-3xl font-bold'>
//                 অনুসন্ধানের ফলাফল
//               </h1>

//               <p className='text-sm text-[#202020]/60 mt-2'>
//                 "{searchQuery}" এর জন্য পাওয়া সংবাদসমূহ
//               </p>
//             </div>

//             {latestNews.length === 0 ? (
//               <div className='bg-[#F8F7F4] rounded-sm py-20 text-center'>
//                 <p className='text-xl font-semibold mb-2'>
//                   কোনো সংবাদ পাওয়া যায়নি
//                 </p>
//                 <p className='text-sm text-[#202020]/60'>
//                   অন্য কোনো শব্দ দিয়ে আবার অনুসন্ধান করুন।
//                 </p>
//               </div>
//             ) : (
//               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
//                 {latestNews.map(news => (
//                   <NewsCard key={news._id} news={news} />
//                 ))}
//               </div>
//             )}
//           </section>
//         ) : (
//           <>
//             {/* Featured News */}
//             {featuredNews.length > 0 && (
//               <section className='mb-14'>
//                 <div className='flex items-center justify-between border-b border-[#202020]/20 pb-3 mb-6'>
//                   <div>
//                     <p className='text-[11px] font-semibold tracking-[0.2em] text-[#34483C] uppercase font-english mb-1'>
//                       Editor's Choice
//                     </p>
//                     <h2 className='text-2xl sm:text-3xl font-bold'>
//                       প্রধান সংবাদ
//                     </h2>
//                   </div>

//                   <span className='text-xs text-[#202020]/50 font-english'>
//                     FEATURED
//                   </span>
//                 </div>

//                 <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8'>
//                   {/* Main Featured */}
//                   {featuredNews[0] && (
//                     <div className='lg:col-span-3'>
//                       <NewsCard news={featuredNews[0]} variant='featured' />
//                     </div>
//                   )}

//                   {/* Secondary Featured */}
//                   <div className='lg:col-span-2 flex flex-col gap-5'>
//                     {featuredNews.slice(1).map(news => (
//                       <div
//                         key={news._id}
//                         className='border-b border-[#202020]/15 pb-5 last:border-0'
//                       >
//                         <NewsCard news={news} variant='horizontal' />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </section>
//             )}

//             {/* Latest & Trending */}
//             <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>
//               {/* Latest News */}
//               <section className='lg:col-span-8'>
//                 <div className='flex items-end justify-between border-b border-[#202020]/20 pb-3 mb-6'>
//                   <div>
//                     <p className='text-[11px] font-semibold tracking-[0.2em] text-[#34483C] uppercase font-english mb-1'>
//                       Stay Informed
//                     </p>

//                     <h2 className='text-2xl sm:text-3xl font-bold'>
//                       সর্বশেষ সংবাদ
//                     </h2>
//                   </div>

//                   <span className='text-xs text-[#202020]/50 font-english'>
//                     LATEST NEWS
//                   </span>
//                 </div>

//                 {latestNews.length === 0 ? (
//                   <div className='bg-[#F8F7F4] p-10 text-center'>
//                     কোনো সংবাদ প্রকাশিত হয়নি।
//                   </div>
//                 ) : (
//                   <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8'>
//                     {latestNews.map(news => (
//                       <NewsCard key={news._id} news={news} />
//                     ))}
//                   </div>
//                 )}
//               </section>

//               {/* Trending Sidebar */}
//               <aside className='lg:col-span-4'>
//                 <div className='sticky top-24'>
//                   <div className='border-b border-[#202020]/20 pb-3 mb-5'>
//                     <p className='text-[11px] font-semibold tracking-[0.2em] text-[#34483C] uppercase font-english mb-1'>
//                       Most Read
//                     </p>

//                     <h2 className='text-2xl font-bold'>জনপ্রিয় সংবাদ</h2>
//                   </div>

//                   <div className='bg-[#F8F7F4] p-5 sm:p-6'>
//                     {trendingNews.length === 0 ? (
//                       <p className='text-sm text-[#202020]/60'>
//                         এখনো জনপ্রিয় সংবাদ নেই।
//                       </p>
//                     ) : (
//                       <div className='divide-y divide-[#202020]/10'>
//                         {trendingNews.map((news, index) => (
//                           <div
//                             key={news._id}
//                             className='flex gap-4 py-5 first:pt-0 last:pb-0'
//                           >
//                             <span className='font-english text-3xl font-bold text-[#34483C]/35 leading-none'>
//                               {String(index + 1).padStart(2, '0')}
//                             </span>

//                             <div className='flex-1 min-w-0'>
//                               <NewsCard news={news} variant='horizontal' />
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Editorial Note */}
//                   <div className='mt-6 bg-[#34483C] text-[#F8F7F4] p-6'>
//                     <p className='text-xs tracking-[0.2em] uppercase font-english text-white/60 mb-3'>
//                       Khobornama
//                     </p>

//                     <h3 className='text-xl font-semibold mb-2'>
//                       খবরের গভীরে, সত্যের সন্ধানে।
//                     </h3>

//                     <p className='text-sm text-white/70 leading-relaxed'>
//                       দেশ ও বিশ্বের গুরুত্বপূর্ণ সংবাদ জানতে নিয়মিত চোখ রাখুন
//                       খবরনামায়।
//                     </p>
//                   </div>
//                 </div>
//               </aside>
//             </div>
//           </>
//         )}
//       </div>
//     </main>
//   )
// }

// export default Home




import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { newsAPI } from '../services/api'
import NewsCard from '../components/NewsCard'

const NewsSkeleton = ({ variant = 'default' }) => {
  if (variant === 'featured') {
    return (
      <div className='animate-pulse'>
        <div className='h-[380px] sm:h-[460px] bg-[#202020]/10 rounded-sm' />
      </div>
    )
  }

  if (variant === 'horizontal') {
    return (
      <div className='flex gap-3 sm:gap-4 animate-pulse'>
        <div className='w-28 sm:w-36 aspect-[4/3] shrink-0 bg-[#202020]/10 rounded-sm' />

        <div className='flex-1 space-y-3 py-2'>
          <div className='h-3 w-1/3 bg-[#202020]/10 rounded' />
          <div className='h-4 w-full bg-[#202020]/10 rounded' />
          <div className='h-4 w-4/5 bg-[#202020]/10 rounded' />
          <div className='h-3 w-1/2 bg-[#202020]/10 rounded' />
        </div>
      </div>
    )
  }

  return (
    <div className='bg-[#F8F7F4] border border-[#202020]/5 overflow-hidden animate-pulse'>
      <div className='aspect-[16/10] bg-[#202020]/10' />

      <div className='p-4 sm:p-5 space-y-4'>
        <div className='h-5 w-full bg-[#202020]/10 rounded' />
        <div className='h-5 w-4/5 bg-[#202020]/10 rounded' />
        <div className='h-3 w-1/2 bg-[#202020]/10 rounded' />

        <div className='border-t border-[#202020]/10 pt-4 flex justify-between'>
          <div className='h-3 w-1/3 bg-[#202020]/10 rounded' />
          <div className='h-3 w-1/4 bg-[#202020]/10 rounded' />
        </div>
      </div>
    </div>
  )
}

const Home = () => {
  const [searchParams] = useSearchParams()

  const [featuredNews, setFeaturedNews] = useState([])
  const [latestNews, setLatestNews] = useState([])
  const [trendingNews, setTrendingNews] = useState([])
  const [loading, setLoading] = useState(true)

  const searchQuery = searchParams.get('search')

  useEffect(() => {
    let isMounted = true

    const fetchNews = async () => {
      setLoading(true)

      try {
        if (searchQuery) {
          const res = await newsAPI.getAll({
            search: searchQuery,
            limit: 20
          })

          if (!isMounted) return

          setLatestNews(res.data.data || [])
          setFeaturedNews([])
          setTrendingNews([])
        } else {
          const [featuredRes, latestRes, trendingRes] =
            await Promise.all([
              newsAPI.getFeatured(3),
              newsAPI.getAll({ limit: 9 }),
              newsAPI.getTrending(5)
            ])

          if (!isMounted) return

          setFeaturedNews(featuredRes.data.data || [])
          setLatestNews(latestRes.data.data || [])
          setTrendingNews(trendingRes.data.data || [])
        }
      } catch (error) {
        console.error('Error fetching news:', error)

        if (isMounted) {
          setFeaturedNews([])
          setLatestNews([])
          setTrendingNews([])
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    fetchNews()

    return () => {
      isMounted = false
    }
  }, [searchQuery])

  return (
    <main className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12'>

        {/* Search Results */}
        {searchQuery ? (
          <section>
            <div className='border-b border-[#202020]/15 pb-5 mb-8'>
              <p className='text-xs font-semibold tracking-[0.2em] uppercase text-[#34483C] mb-2 font-english'>
                Search
              </p>

              <h1 className='text-2xl sm:text-3xl font-bold'>
                অনুসন্ধানের ফলাফল
              </h1>

              <p className='text-sm text-[#202020]/60 mt-2'>
                "{searchQuery}" এর জন্য পাওয়া সংবাদসমূহ
              </p>
            </div>

            {loading ? (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {[1, 2, 3, 4, 5, 6].map(item => (
                  <NewsSkeleton key={item} />
                ))}
              </div>
            ) : latestNews.length === 0 ? (
              <div className='bg-[#F8F7F4] rounded-sm py-20 text-center'>
                <p className='text-xl font-semibold mb-2'>
                  কোনো সংবাদ পাওয়া যায়নি
                </p>

                <p className='text-sm text-[#202020]/60'>
                  অন্য কোনো শব্দ দিয়ে আবার অনুসন্ধান করুন।
                </p>
              </div>
            ) : (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {latestNews.map(news => (
                  <NewsCard key={news._id} news={news} />
                ))}
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Featured News */}
            <section className='mb-14'>
              <div className='flex items-center justify-between border-b border-[#202020]/20 pb-3 mb-6'>
                <div>
                  <p className='text-[11px] font-semibold tracking-[0.2em] text-[#34483C] uppercase font-english mb-1'>
                    Editor's Choice
                  </p>

                  <h2 className='text-2xl sm:text-3xl font-bold'>
                    প্রধান সংবাদ
                  </h2>
                </div>

                <span className='text-xs text-[#202020]/50 font-english'>
                  FEATURED
                </span>
              </div>

              {loading ? (
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8'>
                  <div className='lg:col-span-3'>
                    <NewsSkeleton variant='featured' />
                  </div>

                  <div className='lg:col-span-2 flex flex-col gap-5'>
                    {[1, 2].map(item => (
                      <NewsSkeleton
                        key={item}
                        variant='horizontal'
                      />
                    ))}
                  </div>
                </div>
              ) : featuredNews.length > 0 ? (
                <div className='grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8'>
                  {featuredNews[0] && (
                    <div className='lg:col-span-3'>
                      <NewsCard
                        news={featuredNews[0]}
                        variant='featured'
                      />
                    </div>
                  )}

                  <div className='lg:col-span-2 flex flex-col gap-5'>
                    {featuredNews.slice(1).map(news => (
                      <div
                        key={news._id}
                        className='border-b border-[#202020]/15 pb-5 last:border-0'
                      >
                        <NewsCard
                          news={news}
                          variant='horizontal'
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='bg-[#F8F7F4] p-8 text-center'>
                  কোনো প্রধান সংবাদ পাওয়া যায়নি।
                </div>
              )}
            </section>

            {/* Latest & Trending */}
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-10'>

              {/* Latest News */}
              <section className='lg:col-span-8'>
                <div className='flex items-end justify-between border-b border-[#202020]/20 pb-3 mb-6'>
                  <div>
                    <p className='text-[11px] font-semibold tracking-[0.2em] text-[#34483C] uppercase font-english mb-1'>
                      Stay Informed
                    </p>

                    <h2 className='text-2xl sm:text-3xl font-bold'>
                      সর্বশেষ সংবাদ
                    </h2>
                  </div>

                  <span className='text-xs text-[#202020]/50 font-english'>
                    LATEST NEWS
                  </span>
                </div>

                {loading ? (
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8'>
                    {[1, 2, 3, 4, 5, 6].map(item => (
                      <NewsSkeleton key={item} />
                    ))}
                  </div>
                ) : latestNews.length === 0 ? (
                  <div className='bg-[#F8F7F4] p-10 text-center'>
                    কোনো সংবাদ প্রকাশিত হয়নি।
                  </div>
                ) : (
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8'>
                    {latestNews.map(news => (
                      <NewsCard
                        key={news._id}
                        news={news}
                      />
                    ))}
                  </div>
                )}
              </section>

              {/* Trending Sidebar */}
              <aside className='lg:col-span-4'>
                <div className='sticky top-24'>

                  <div className='border-b border-[#202020]/20 pb-3 mb-5'>
                    <p className='text-[11px] font-semibold tracking-[0.2em] text-[#34483C] uppercase font-english mb-1'>
                      Most Read
                    </p>

                    <h2 className='text-2xl font-bold'>
                      জনপ্রিয় সংবাদ
                    </h2>
                  </div>

                  <div className='bg-[#F8F7F4] p-5 sm:p-6'>
                    {loading ? (
                      <div className='space-y-6'>
                        {[1, 2, 3, 4, 5].map(item => (
                          <NewsSkeleton
                            key={item}
                            variant='horizontal'
                          />
                        ))}
                      </div>
                    ) : trendingNews.length === 0 ? (
                      <p className='text-sm text-[#202020]/60'>
                        এখনো জনপ্রিয় সংবাদ নেই।
                      </p>
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
                              <NewsCard
                                news={news}
                                variant='horizontal'
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Editorial Note */}
                  <div className='mt-6 bg-[#34483C] text-[#F8F7F4] p-6'>
                    <p className='text-xs tracking-[0.2em] uppercase font-english text-white/60 mb-3'>
                      Khobornama
                    </p>

                    <h3 className='text-xl font-semibold mb-2'>
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
          </>
        )}
      </div>
    </main>
  )
}

export default Home
