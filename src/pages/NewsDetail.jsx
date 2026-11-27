// import { useState, useEffect } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import {
//   FiHeart,
//   FiBookmark,
//   FiEye,
//   FiClock,
//   FiShare2,
//   FiArrowLeft,
//   FiArrowUpRight,
//   FiCalendar,
//   FiUser,
//   FiCheck
// } from 'react-icons/fi'
// import { format } from 'date-fns'
// import { toast } from 'react-toastify'
// import { newsAPI } from '../services/api'
// import { useAuth } from '../context/AuthContext'
// import Loading from '../components/Loading'
// import NewsCard from '../components/NewsCard'
// import Comments from '../components/Comments'

// const BRAND = {
//   primary: '#202020',
//   background: '#E4E1DC',
//   surface: '#F8F7F4',
//   accent: '#34483C'
// }

// const NewsDetail = () => {
//   const { slug } = useParams()
//   const { isAuthenticated } = useAuth()

//   const [news, setNews] = useState(null)
//   const [relatedNews, setRelatedNews] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [isLiked, setIsLiked] = useState(false)
//   const [isFavorited, setIsFavorited] = useState(false)
//   const [likesCount, setLikesCount] = useState(0)

//   useEffect(() => {
//     const fetchNews = async () => {
//       try {
//         setLoading(true)

//         const res = await newsAPI.getBySlug(slug)
//         const newsData = res.data.data

//         setNews(newsData)
//         setIsLiked(newsData.isLiked)
//         setIsFavorited(newsData.isFavorited)
//         setLikesCount(newsData.likesCount)

//         const relatedRes = await newsAPI.getRelated(newsData._id)
//         setRelatedNews(relatedRes.data.data || [])
//       } catch (error) {
//         console.error('Error fetching news:', error)
//         toast.error('Failed to load news article')
//         setNews(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchNews()
//   }, [slug])

//   const handleLike = async () => {
//     if (!isAuthenticated) {
//       toast.info('Please login to like articles')
//       return
//     }

//     try {
//       const res = await newsAPI.toggleLike(news._id)

//       setIsLiked(res.data.isLiked)
//       setLikesCount(res.data.likesCount)

//       toast.success(res.data.message)
//     } catch (error) {
//       toast.error('Failed to like article')
//     }
//   }

//   const handleFavorite = async () => {
//     if (!isAuthenticated) {
//       toast.info('Please login to save articles')
//       return
//     }

//     try {
//       const res = await newsAPI.toggleFavorite(news._id)

//       setIsFavorited(res.data.isFavorited)
//       toast.success(res.data.message)
//     } catch (error) {
//       toast.error('Failed to save article')
//     }
//   }

//   const handleShare = async () => {
//     if (navigator.share) {
//       try {
//         await navigator.share({
//           title: news.title,
//           text: news.summary,
//           url: window.location.href
//         })
//       } catch (error) {
//         if (error.name !== 'AbortError') {
//           console.error('Error sharing:', error)
//         }
//       }
//     } else {
//       try {
//         await navigator.clipboard.writeText(window.location.href)
//         toast.success('Link copied to clipboard!')
//       } catch (error) {
//         toast.error('Unable to copy link')
//       }
//     }
//   }

//   if (loading) return <Loading />

//   if (!news) {
//     return (
//       <div className='min-h-[60vh] flex items-center justify-center px-4'>
//         <div className='text-center'>
//           <p className='text-xs font-bold uppercase tracking-[0.25em] text-[#34483C] mb-4'>
//             404 — Article Not Found
//           </p>

//           <h1 className='text-3xl sm:text-4xl font-bold text-[#202020]'>
//             দুঃখিত, সংবাদটি পাওয়া যায়নি।
//           </h1>

//           <p className='text-gray-500 mt-3'>
//             The article you are looking for may have been removed.
//           </p>

//           <Link
//             to='/'
//             className='inline-flex items-center gap-2 mt-7 px-6 py-3 bg-[#34483C] text-white rounded-sm hover:bg-[#202020] transition-colors'
//           >
//             <FiArrowLeft />
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     )
//   }

//   const formattedDate = news.publishedAt
//     ? format(new Date(news.publishedAt), 'MMMM dd, yyyy')
//     : ''

//   return (
//     <main className='bg-[#E4E1DC] min-h-screen text-[#202020]'>
//       {/* Top Editorial Line */}
//       <div className='border-b border-[#202020]/10'>
//         <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
//           <div className='flex items-center justify-between py-3'>
//             <Link
//               to='/'
//               className='inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#34483C] hover:text-[#202020] transition-colors'
//             >
//               <FiArrowLeft />
//               <span>প্রচ্ছদ</span>
//             </Link>

//             <span className='text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gray-500 font-semibold'>
//               Khobornama / Article
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 lg:py-12'>
//         {/* Article Header */}
//         <article className='max-w-5xl mx-auto'>
//           {/* Category */}
//           <div className='flex justify-center mb-6'>
//             <Link
//               to={`/category/${news.category}`}
//               className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#34483C] border-y border-[#34483C]/40 py-2 px-4 hover:bg-[#34483C] hover:text-white transition-colors'
//             >
//               {news.category}
//               <FiArrowUpRight />
//             </Link>
//           </div>

//           {/* Title */}
//           <h1 className='text-center text-[30px] leading-[1.35] sm:text-4xl md:text-5xl lg:text-[58px] lg:leading-[1.25] font-bold tracking-tight max-w-5xl mx-auto'>
//             {news.title}
//           </h1>

//           {/* Summary */}
//           {news.summary && (
//             <p className='max-w-3xl mx-auto text-center text-base sm:text-lg lg:text-xl leading-relaxed text-[#202020]/65 mt-6'>
//               {news.summary}
//             </p>
//           )}

//           {/* Author and Metadata */}
//           <div className='mt-8 pt-6 border-t border-b border-[#202020]/15'>
//             <div className='flex flex-col sm:flex-row items-center justify-between gap-5 py-2'>
//               {/* Author */}
//               <div className='flex items-center gap-3'>
//                 <div className='w-11 h-11 rounded-full overflow-hidden bg-[#34483C]/10 flex items-center justify-center shrink-0'>
//                   {news.author?.avatar ? (
//                     <img
//                       src={news.author.avatar}
//                       alt={news.author?.name || 'Author'}
//                       className='w-full h-full object-cover'
//                     />
//                   ) : (
//                     <FiUser className='text-xl text-[#34483C]' />
//                   )}
//                 </div>

//                 <div>
//                   <p className='text-sm font-bold'>
//                     {news.author?.name || 'খবরনামা ডেস্ক'}
//                   </p>
//                   <p className='text-xs text-gray-500 mt-1'>প্রতিবেদক</p>
//                 </div>
//               </div>

//               {/* Article Information */}
//               <div className='flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs sm:text-sm text-gray-600'>
//                 {formattedDate && (
//                   <span className='flex items-center gap-2'>
//                     <FiCalendar className='text-[#34483C]' />
//                     {formattedDate}
//                   </span>
//                 )}

//                 <span className='flex items-center gap-2'>
//                   <FiClock className='text-[#34483C]' />
//                   প্রকাশিত
//                 </span>

//                 <span className='flex items-center gap-2'>
//                   <FiEye className='text-[#34483C]' />
//                   {news.views || 0} Views
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Featured Image */}
//           {news.image && (
//             <figure className='mt-8 sm:mt-10'>
//               <div className='overflow-hidden bg-[#F8F7F4]'>
//                 <img
//                   src={news.image}
//                   alt={news.title}
//                   className='w-full max-h-[600px] object-cover'
//                 />
//               </div>

//               <figcaption className='text-xs text-gray-500 mt-3 text-right'>
//                 ছবি: খবরনামা
//               </figcaption>
//             </figure>
//           )}

//           {/* Article Actions */}
//           <div className='flex flex-wrap items-center justify-between gap-4 py-5 mt-2 border-b border-[#202020]/15'>
//             <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
//               {/* Like */}
//               <button
//                 onClick={handleLike}
//                 aria-label='Like article'
//                 aria-pressed={isLiked}
//                 className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all ${
//                   isLiked
//                     ? 'bg-[#34483C] text-white'
//                     : 'bg-[#F8F7F4] text-[#202020] hover:bg-[#34483C] hover:text-white'
//                 }`}
//               >
//                 <FiHeart className={isLiked ? 'fill-current' : ''} />
//                 {likesCount}
//               </button>

//               {/* Save */}
//               <button
//                 onClick={handleFavorite}
//                 aria-label='Save article'
//                 aria-pressed={isFavorited}
//                 className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all ${
//                   isFavorited
//                     ? 'bg-[#34483C] text-white'
//                     : 'bg-[#F8F7F4] text-[#202020] hover:bg-[#34483C] hover:text-white'
//                 }`}
//               >
//                 {isFavorited ? <FiCheck /> : <FiBookmark />}
//                 {isFavorited ? 'Saved' : 'Save'}
//               </button>
//             </div>

//             {/* Share */}
//             <button
//               onClick={handleShare}
//               className='inline-flex items-center gap-2 px-4 py-2.5 bg-[#202020] text-white text-sm font-semibold hover:bg-[#34483C] transition-colors'
//             >
//               <FiShare2 />
//               Share Article
//             </button>
//           </div>

//           {/* Article Content */}
//           <div className='mt-9 sm:mt-12'>
//             <div
//               className='
//                 prose prose-lg max-w-none
//                 prose-headings:text-[#202020]
//                 prose-headings:font-bold
//                 prose-p:text-[#303030]
//                 prose-p:leading-[2]
//                 prose-p:text-base
//                 sm:prose-p:text-lg
//                 prose-a:text-[#34483C]
//                 prose-a:underline
//                 prose-strong:text-[#202020]
//                 prose-blockquote:border-l-[#34483C]
//                 prose-blockquote:text-[#34483C]
//                 prose-img:rounded-sm
//                 prose-li:text-[#303030]
//                 prose-hr:border-[#202020]/15
//               '
//               dangerouslySetInnerHTML={{ __html: news.content }}
//             />
//           </div>

//           {/* Tags */}
//           {news.tags && news.tags.length > 0 && (
//             <div className='mt-12 pt-7 border-t border-[#202020]/15'>
//               <h3 className='text-xs uppercase tracking-[0.2em] font-bold text-[#34483C] mb-4'>
//                 Related Topics
//               </h3>

//               <div className='flex flex-wrap gap-2'>
//                 {news.tags.map((tag, index) => (
//                   <span
//                     key={index}
//                     className='px-4 py-2 bg-[#F8F7F4] text-sm text-gray-600 hover:bg-[#34483C] hover:text-white transition-colors'
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Article Footer */}
//           <div className='mt-10 py-6 border-y border-[#202020]/15 flex flex-col sm:flex-row items-center justify-between gap-4'>
//             <div>
//               <p className='text-lg font-bold'>খবরনামা</p>
//               <p className='text-xs text-gray-500 mt-1'>
//                 সত্য ও নিরপেক্ষ সংবাদ
//               </p>
//             </div>

//             <button
//               onClick={handleShare}
//               className='inline-flex items-center gap-2 text-sm font-semibold text-[#34483C] hover:text-[#202020] transition-colors'
//             >
//               <FiShare2 />
//               Share this story
//             </button>
//           </div>

//           {/* Comments */}
//           <div className='mt-12 sm:mt-16'>
//             <Comments newsId={news._id} />
//           </div>
//         </article>

//         {/* Related News */}
//         {relatedNews.length > 0 && (
//           <section className='mt-16 sm:mt-20 pt-10 border-t border-[#202020]/20'>
//             <div className='flex items-end justify-between gap-4 mb-8'>
//               <div>
//                 <p className='text-xs uppercase tracking-[0.25em] text-[#34483C] font-bold mb-2'>
//                   Keep Reading
//                 </p>

//                 <h2 className='text-2xl sm:text-3xl font-bold'>আরও সংবাদ</h2>
//               </div>

//               <Link
//                 to='/latest'
//                 className='hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#34483C] hover:text-[#202020] transition-colors'
//               >
//                 সব সংবাদ
//                 <FiArrowUpRight />
//               </Link>
//             </div>

//             <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7'>
//               {relatedNews.slice(0, 6).map(item => (
//                 <NewsCard key={item._id} news={item} variant='default' />
//               ))}
//             </div>

//             <Link
//               to='/latest'
//               className='sm:hidden flex items-center justify-center gap-2 mt-7 py-3 border border-[#34483C]/30 text-[#34483C] font-semibold text-sm'
//             >
//               সব সংবাদ দেখুন
//               <FiArrowUpRight />
//             </Link>
//           </section>
//         )}
//       </div>
//     </main>
//   )
// }

// export default NewsDetail

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import {
  FiHeart,
  FiBookmark,
  FiEye,
  FiClock,
  FiShare2,
  FiArrowLeft,
  FiArrowUpRight,
  FiCalendar,
  FiUser,
  FiCheck
} from 'react-icons/fi'

import { toast } from 'react-toastify'

import { newsAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'
import NewsCard from '../components/NewsCard'

// ========================================
// বাংলা ক্যাটাগরি
// ========================================

const categoryLabels = {
  national: 'জাতীয়',
  politics: 'রাজনীতি',
  economy: 'অর্থনীতি',
  international: 'আন্তর্জাতিক',
  country: 'সারাদেশ',
  sports: 'খেলা',
  religion: 'ধর্ম',
  health: 'স্বাস্থ্য',
  video: 'ভিডিও',
  column: 'কলাম',
  feature: 'ফিচার',
  opinion: 'মতামত',
  literature: 'সাহিত্য',
  'law-court': 'আইন ও আদালত',
  others: 'অন্যান্য'
}

const getCategoryName = category => {
  return categoryLabels[category] || category || 'অন্যান্য'
}

// ========================================
// বাংলা তারিখ
// ========================================

const formatBanglaDate = date => {
  if (!date) return ''

  return new Intl.DateTimeFormat('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))
}

// ========================================
// ARTICLE SKELETON
// ========================================

const ArticleSkeleton = () => {
  return (
    <main className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
      <div className='border-b border-[#202020]/10'>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between py-4'>
            <div className='h-4 w-20 bg-[#202020]/10 rounded-sm animate-pulse' />
            <div className='h-3 w-32 bg-[#202020]/10 rounded-sm animate-pulse' />
          </div>
        </div>
      </div>

      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 lg:py-12'>
        <article className='max-w-5xl mx-auto'>
          {/* ক্যাটাগরি */}
          <div className='flex justify-center mb-6'>
            <div className='h-7 w-28 bg-[#34483C]/15 rounded-sm animate-pulse' />
          </div>

          {/* শিরোনাম */}
          <div className='max-w-5xl mx-auto space-y-3'>
            <div className='h-9 sm:h-12 lg:h-14 bg-[#202020]/10 rounded-sm w-full animate-pulse' />
            <div className='h-9 sm:h-12 lg:h-14 bg-[#202020]/10 rounded-sm w-[90%] mx-auto animate-pulse' />
            <div className='h-9 sm:h-12 lg:h-14 bg-[#202020]/10 rounded-sm w-[65%] mx-auto animate-pulse' />
          </div>

          {/* সংক্ষিপ্ত বিবরণ */}
          <div className='max-w-3xl mx-auto mt-7 space-y-3'>
            <div className='h-4 bg-[#202020]/10 rounded-sm w-full animate-pulse' />
            <div className='h-4 bg-[#202020]/10 rounded-sm w-[85%] mx-auto animate-pulse' />
          </div>

          {/* লেখক ও তথ্য */}
          <div className='mt-8 pt-6 border-t border-b border-[#202020]/15'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-5 py-2'>
              <div className='flex items-center gap-3'>
                <div className='w-11 h-11 rounded-full bg-[#34483C]/15 animate-pulse shrink-0' />

                <div className='space-y-2'>
                  <div className='h-3.5 w-28 bg-[#202020]/10 rounded-sm animate-pulse' />
                  <div className='h-3 w-20 bg-[#202020]/10 rounded-sm animate-pulse' />
                </div>
              </div>

              <div className='flex flex-wrap items-center justify-center gap-4'>
                <div className='h-4 w-24 bg-[#202020]/10 rounded-sm animate-pulse' />
                <div className='h-4 w-20 bg-[#202020]/10 rounded-sm animate-pulse' />
                <div className='h-4 w-16 bg-[#202020]/10 rounded-sm animate-pulse' />
              </div>
            </div>
          </div>

          {/* প্রধান ছবি */}
          <div className='mt-8 sm:mt-10'>
            <div className='w-full aspect-[16/9] max-h-[600px] bg-[#202020]/10 rounded-sm animate-pulse' />
            <div className='h-3 w-24 bg-[#202020]/10 rounded-sm mt-3 ml-auto animate-pulse' />
          </div>

          {/* সংবাদ কার্যক্রম */}
          <div className='flex flex-wrap items-center justify-between gap-4 py-5 mt-2 border-b border-[#202020]/15'>
            <div className='flex gap-3'>
              <div className='h-10 w-20 bg-[#202020]/10 rounded-sm animate-pulse' />
              <div className='h-10 w-24 bg-[#202020]/10 rounded-sm animate-pulse' />
            </div>

            <div className='h-10 w-24 bg-[#202020]/15 rounded-sm animate-pulse' />
          </div>

          {/* সংবাদ বিবরণ */}
          <div className='mt-9 sm:mt-12 space-y-5'>
            <div className='h-5 bg-[#202020]/10 rounded-sm w-full animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-[95%] animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-[88%] animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-full animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-[92%] animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-[75%] animate-pulse' />
            <div className='h-48 sm:h-64 bg-[#202020]/10 rounded-sm my-8 animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-full animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-[90%] animate-pulse' />
            <div className='h-5 bg-[#202020]/10 rounded-sm w-[82%] animate-pulse' />
          </div>

          {/* বিষয়সমূহ */}
          <div className='mt-12 pt-7 border-t border-[#202020]/15'>
            <div className='h-4 w-32 bg-[#202020]/10 rounded-sm mb-5 animate-pulse' />

            <div className='flex gap-2'>
              <div className='h-9 w-20 bg-[#202020]/10 rounded-sm animate-pulse' />
              <div className='h-9 w-24 bg-[#202020]/10 rounded-sm animate-pulse' />
              <div className='h-9 w-16 bg-[#202020]/10 rounded-sm animate-pulse' />
            </div>
          </div>

          {/* শেষ অংশ */}
          <div className='mt-10 py-6 border-y border-[#202020]/15 flex justify-between items-center'>
            <div className='space-y-2'>
              <div className='h-5 w-24 bg-[#202020]/10 rounded-sm animate-pulse' />
              <div className='h-3 w-32 bg-[#202020]/10 rounded-sm animate-pulse' />
            </div>

            <div className='h-4 w-28 bg-[#202020]/10 rounded-sm animate-pulse' />
          </div>
        </article>

        {/* আরও সংবাদের Skeleton */}
        <section className='mt-16 sm:mt-20 pt-10 border-t border-[#202020]/20'>
          <div className='mb-8 space-y-3'>
            <div className='h-3 w-24 bg-[#34483C]/15 rounded-sm animate-pulse' />
            <div className='h-8 w-40 bg-[#202020]/10 rounded-sm animate-pulse' />
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7'>
            {[1, 2, 3].map(item => (
              <div key={item} className='bg-[#F8F7F4] p-3'>
                <div className='aspect-[16/9] bg-[#202020]/10 rounded-sm animate-pulse' />

                <div className='mt-4 space-y-3'>
                  <div className='h-3 w-24 bg-[#202020]/10 rounded-sm animate-pulse' />
                  <div className='h-5 w-full bg-[#202020]/10 rounded-sm animate-pulse' />
                  <div className='h-5 w-[75%] bg-[#202020]/10 rounded-sm animate-pulse' />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

// ========================================
// NEWS DETAIL PAGE
// ========================================

const NewsDetail = () => {
  const { slug } = useParams()
  const { isAuthenticated } = useAuth()

  const [news, setNews] = useState(null)
  const [relatedNews, setRelatedNews] = useState([])
  const [loading, setLoading] = useState(true)

  const [isLiked, setIsLiked] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)
  const [likesCount, setLikesCount] = useState(0)

  // সংবাদ সংগ্রহ
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true)
        setNews(null)
        setRelatedNews([])

        const res = await newsAPI.getBySlug(slug)
        const newsData = res.data.data

        setNews(newsData)
        setIsLiked(newsData.isLiked)
        setIsFavorited(newsData.isFavorited)
        setLikesCount(newsData.likesCount || 0)

        const relatedRes = await newsAPI.getRelated(newsData._id)
        setRelatedNews(relatedRes.data.data || [])
      } catch (error) {
        console.error('সংবাদ সংগ্রহে সমস্যা:', error)
        toast.error('সংবাদটি লোড করা যায়নি। আবার চেষ্টা করুন।')
        setNews(null)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [slug])

  // সংবাদে লাইক
  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.info('লাইক দিতে প্রথমে লগইন করুন।')
      return
    }

    try {
      const res = await newsAPI.toggleLike(news._id)

      setIsLiked(res.data.isLiked)
      setLikesCount(res.data.likesCount)

      toast.success(res.data.message || 'আপনার প্রতিক্রিয়া গ্রহণ করা হয়েছে।')
    } catch (error) {
      toast.error('লাইক দেওয়া সম্ভব হয়নি। আবার চেষ্টা করুন।')
    }
  }

  // সংবাদ সংরক্ষণ
  const handleFavorite = async () => {
    if (!isAuthenticated) {
      toast.info('সংবাদ সংরক্ষণ করতে প্রথমে লগইন করুন।')
      return
    }

    try {
      const res = await newsAPI.toggleFavorite(news._id)

      setIsFavorited(res.data.isFavorited)

      toast.success(
        res.data.isFavorited
          ? 'সংবাদটি সংরক্ষণ করা হয়েছে।'
          : 'সংরক্ষিত সংবাদ থেকে সরানো হয়েছে।'
      )
    } catch (error) {
      toast.error('সংবাদ সংরক্ষণ করা যায়নি।')
    }
  }

  // সংবাদ শেয়ার
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: news.title,
          text: news.summary,
          url: window.location.href
        })
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('শেয়ার করতে সমস্যা:', error)
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('সংবাদের লিংক কপি করা হয়েছে।')
      } catch (error) {
        toast.error('লিংক কপি করা যায়নি।')
      }
    }
  }

  // লোডিং অবস্থা
  if (loading) return <ArticleSkeleton />

  // সংবাদ পাওয়া না গেলে
  if (!news) {
    return (
      <div className='min-h-[60vh] flex items-center justify-center px-4'>
        <div className='text-center'>
          <p className='text-xs font-bold tracking-[0.25em] text-[#34483C] mb-4'>
            ৪০৪ — সংবাদ পাওয়া যায়নি
          </p>

          <h1 className='text-3xl sm:text-4xl font-bold text-[#202020]'>
            দুঃখিত, সংবাদটি পাওয়া যায়নি।
          </h1>

          <p className='text-gray-500 mt-3'>
            আপনি যে সংবাদটি খুঁজছেন, সেটি সরিয়ে ফেলা হয়ে থাকতে পারে।
          </p>

          <Link
            to='/'
            className='inline-flex items-center gap-2 mt-7 px-6 py-3 bg-[#34483C] text-white rounded-sm hover:bg-[#202020] transition-colors'
          >
            <FiArrowLeft />
            প্রচ্ছদে ফিরে যান
          </Link>
        </div>
      </div>
    )
  }

  const formattedDate = formatBanglaDate(news.publishedAt)

  return (
    <main className='bg-[#E4E1DC] min-h-screen text-[#202020]'>
      {/* উপরের অংশ */}
      <div className='border-b border-[#202020]/10'>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between py-3'>
            <Link
              to='/'
              className='inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#34483C] hover:text-[#202020] transition-colors'
            >
              <FiArrowLeft />
              <span>প্রচ্ছদ</span>
            </Link>

            <span className='text-[10px] sm:text-xs tracking-[0.1em] text-[#34483C] font-semibold'>
              খবরনামা / সংবাদ
            </span>
          </div>
        </div>
      </div>

      <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10 lg:py-12'>
        <article className='max-w-5xl mx-auto'>
          {/* ক্যাটাগরি */}
          <div className='flex justify-center mb-6'>
            <Link
              to={`/category/${news.category}`}
              className='inline-flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-[#34483C] border-y border-[#34483C]/40 py-2 px-4 hover:bg-[#34483C] hover:text-white transition-colors'
            >
              {getCategoryName(news.category)}
              <FiArrowUpRight />
            </Link>
          </div>

          {/* শিরোনাম */}
          <h1 className='text-center text-[30px] leading-[1.35] sm:text-4xl md:text-5xl lg:text-[58px] lg:leading-[1.25] font-bold tracking-tight max-w-5xl mx-auto'>
            {news.title}
          </h1>

          {/* সংক্ষিপ্ত বিবরণ */}
          {news.summary && (
            <p className='max-w-3xl mx-auto text-center text-base sm:text-lg lg:text-xl leading-relaxed text-[#202020]/65 mt-6'>
              {news.summary}
            </p>
          )}

          {/* লেখক ও সংবাদ তথ্য */}
          <div className='mt-8 pt-6 border-t border-b border-[#202020]/15'>
            <div className='flex flex-col sm:flex-row items-center justify-between gap-5 py-2'>
              {/* লেখক */}
              <div className='flex items-center gap-3'>
                <div className='w-11 h-11 rounded-full overflow-hidden bg-[#34483C]/10 flex items-center justify-center shrink-0'>
                  {news.author?.avatar ? (
                    <img
                      src={news.author.avatar}
                      alt={news.author?.name || 'লেখক'}
                      className='w-full h-full object-cover'
                    />
                  ) : (
                    <FiUser className='text-xl text-[#34483C]' />
                  )}
                </div>

                <div>
                  <p className='text-sm font-bold'>
                    {news.author?.name || 'খবরনামা ডেস্ক'}
                  </p>

                  <p className='text-xs text-gray-500 mt-1'>প্রতিবেদক</p>
                </div>
              </div>

              {/* সংবাদ প্রকাশের তথ্য */}
              <div className='flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-xs sm:text-sm text-gray-600'>
                {formattedDate && (
                  <span className='flex items-center gap-2'>
                    <FiCalendar className='text-[#34483C]' />
                    {formattedDate}
                  </span>
                )}

                <span className='flex items-center gap-2'>
                  <FiClock className='text-[#34483C]' />
                  প্রকাশিত
                </span>

                <span className='flex items-center gap-2'>
                  <FiEye className='text-[#34483C]' />
                  {news.views?.toLocaleString('bn-BD') || '০'} বার পঠিত
                </span>
              </div>
            </div>
          </div>

          {/* প্রধান ছবি */}
          {news.image && (
            <figure className='mt-8 sm:mt-10'>
              <div className='overflow-hidden bg-[#F8F7F4]'>
                <img
                  src={news.image}
                  alt={news.title}
                  className='w-full max-h-[600px] object-cover'
                />
              </div>

              <figcaption className='text-xs text-gray-500 mt-3 text-right'>
                ছবি: খবরনামা
              </figcaption>
            </figure>
          )}

          {/* লাইক, সংরক্ষণ ও শেয়ার */}
          {/* <div className='flex flex-wrap items-center justify-between gap-4 py-5 mt-2 border-b border-[#202020]/15'>
            <div className='flex flex-wrap items-center gap-2 sm:gap-3'> */}
          {/* লাইক */}
          {/* <button
                onClick={handleLike}
                aria-label='লাইক দিন'
                aria-pressed={isLiked}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                  isLiked
                    ? 'bg-[#34483C] text-white'
                    : 'bg-[#F8F7F4] text-[#202020] hover:bg-[#34483C] hover:text-white'
                }`}
              >
                <FiHeart className={isLiked ? 'fill-current' : ''} />
                {likesCount}
              </button> */}

          {/* সংরক্ষণ */}
          {/* <button
                onClick={handleFavorite}
                aria-label='সংবাদ সংরক্ষণ করুন'
                aria-pressed={isFavorited}
                className={`inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all ${
                  isFavorited
                    ? 'bg-[#34483C] text-white'
                    : 'bg-[#F8F7F4] text-[#202020] hover:bg-[#34483C] hover:text-white'
                }`}
              >
                {isFavorited ? <FiCheck /> : <FiBookmark />}
                {isFavorited ? 'সংরক্ষিত' : 'সংরক্ষণ'}
              </button>
            </div> */}

          {/* শেয়ার */}
          {/* <button
              onClick={handleShare}
              className='inline-flex items-center gap-2 px-4 py-2.5 bg-[#202020] text-white text-sm font-semibold hover:bg-[#34483C] transition-colors'
            >
              <FiShare2 />
              শেয়ার করুন
            </button>
          </div> */}

          {/* সংবাদ বিবরণ */}
          <div className='mt-9 sm:mt-12'>
            <div
              className='
                prose prose-lg max-w-none
                prose-headings:text-[#202020]
                prose-headings:font-bold
                prose-p:text-[#303030]
                prose-p:leading-[2]
                prose-p:text-base
                sm:prose-p:text-lg
                prose-a:text-[#34483C]
                prose-a:underline
                prose-strong:text-[#202020]
                prose-blockquote:border-l-[#34483C]
                prose-blockquote:text-[#34483C]
                prose-img:rounded-sm
                prose-li:text-[#303030]
                prose-hr:border-[#202020]/15
              '
              dangerouslySetInnerHTML={{ __html: news.content }}
            />
          </div>

          {/* বিষয়সমূহ */}
          {news.tags && news.tags.length > 0 && (
            <div className='mt-12 pt-7 border-t border-[#202020]/15'>
              <h3 className='text-xs tracking-[0.15em] font-bold text-[#34483C] mb-4'>
                সম্পর্কিত বিষয়
              </h3>

              <div className='flex flex-wrap gap-2'>
                {news.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-4 py-2 bg-[#F8F7F4] text-sm text-gray-600 hover:bg-[#34483C] hover:text-white transition-colors'
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* সংবাদ সমাপ্তি */}
          <div className='mt-10 py-6 border-y border-[#202020]/15 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div>
              <p className='text-lg font-bold'>খবরনামা</p>

              <p className='text-xs text-gray-500 mt-1'>
                সত্য ও নিরপেক্ষ সংবাদ
              </p>
            </div>

            <button
              onClick={handleShare}
              className='inline-flex items-center gap-2 text-sm font-semibold text-[#34483C] hover:text-[#202020] transition-colors'
            >
              <FiShare2 />
              সংবাদটি শেয়ার করুন
            </button>
          </div>

          {/* মন্তব্য বিভাগ সম্পূর্ণ বাদ */}
        </article>

        {/* সম্পর্কিত সংবাদ */}
        {relatedNews.length > 0 && (
          <section className='mt-16 sm:mt-20 pt-10 border-t border-[#202020]/20'>
            <div className='flex items-end justify-between gap-4 mb-8'>
              <div>
                <p className='text-xs tracking-[0.2em] text-[#34483C] font-bold mb-2'>
                  আরও পড়ুন
                </p>

                <h2 className='text-2xl sm:text-3xl font-bold'>আরও সংবাদ</h2>
              </div>

              <Link
                to='/latest'
                className='hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-[#34483C] hover:text-[#202020] transition-colors'
              >
                সব সংবাদ
                <FiArrowUpRight />
              </Link>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-7'>
              {relatedNews.slice(0, 6).map(item => (
                <NewsCard key={item._id} news={item} variant='default' />
              ))}
            </div>

            <Link
              to='/latest'
              className='sm:hidden flex items-center justify-center gap-2 mt-7 py-3 border border-[#34483C]/30 text-[#34483C] font-semibold text-sm'
            >
              সব সংবাদ দেখুন
              <FiArrowUpRight />
            </Link>
          </section>
        )}
      </div>
    </main>
  )
}

export default NewsDetail
