import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiStar,
  FiEye,
  FiSearch,
  FiFilter,
  FiCalendar,
  FiFileText,
  FiChevronLeft,
  FiChevronRight,
  FiArrowUpRight,
  FiRefreshCw
} from 'react-icons/fi'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { adminAPI } from '../../services/api'
import Loading from '../../components/Loading'

const CATEGORIES = [
  { value: 'national', label: 'জাতীয়' },
  { value: 'politics', label: 'রাজনীতি' },
  { value: 'economy', label: 'অর্থনীতি' },
  { value: 'international', label: 'আন্তর্জাতিক' },
  { value: 'country', label: 'সারাদেশ' },
  { value: 'sports', label: 'খেলা' },
  { value: 'religion', label: 'ধর্ম' },
  { value: 'health', label: 'স্বাস্থ্য' },
  { value: 'video', label: 'ভিডিও' },
  { value: 'column', label: 'কলাম' },
  { value: 'feature', label: 'ফিচার' },
  { value: 'opinion', label: 'মতামত' },
  { value: 'literature', label: 'সাহিত্য' },
  { value: 'law', label: 'আইন ও আদালত' },
  { value: 'others', label: 'অন্যান্য' }
]

const STATUS = {
  published: {
    label: 'প্রকাশিত',
    className: 'bg-[#E5EDE6] text-[#34483C]'
  },
  draft: {
    label: 'খসড়া',
    className: 'bg-[#F5EEDC] text-[#92712F]'
  },
  archived: {
    label: 'আর্কাইভ',
    className: 'bg-[#ECEAE6] text-[#77736D]'
  }
}

const NewsList = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filter, setFilter] = useState({
    status: '',
    category: ''
  })
  const [search, setSearch] = useState('')

  const fetchNews = async () => {
    try {
      setLoading(true)

      const params = {
        page,
        limit: 10,
        ...(filter.status && { status: filter.status }),
        ...(filter.category && { category: filter.category })
      }

      const res = await adminAPI.getNews(params)

      setNews(res.data.data || [])
      setTotalPages(res.data.totalPages || 1)
    } catch (error) {
      console.error('Error fetching news:', error)
      toast.error('সংবাদ লোড করা যায়নি')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNews()
  }, [page, filter])

  const handleFilterChange = (key, value) => {
    setFilter(prev => ({
      ...prev,
      [key]: value
    }))
    setPage(1)
  }

  const handleDelete = async id => {
    if (!window.confirm('আপনি কি নিশ্চিত যে এই সংবাদটি মুছে ফেলতে চান?')) {
      return
    }

    try {
      await adminAPI.deleteNews(id)
      toast.success('সংবাদ সফলভাবে মুছে ফেলা হয়েছে')

      if (news.length === 1 && page > 1) {
        setPage(prev => prev - 1)
      } else {
        fetchNews()
      }
    } catch (error) {
      toast.error('সংবাদ মুছে ফেলা যায়নি')
    }
  }

  const handleToggleFeatured = async id => {
    try {
      await adminAPI.toggleFeatured(id)
      toast.success('Featured status আপডেট হয়েছে')
      fetchNews()
    } catch (error) {
      toast.error('Featured status আপডেট করা যায়নি')
    }
  }

  const filteredNews = news.filter(item =>
    item.title?.toLowerCase().includes(search.toLowerCase())
  )

  const publishedCount = news.filter(item => item.status === 'published').length

  const draftCount = news.filter(item => item.status === 'draft').length

  const featuredCount = news.filter(item => item.isFeatured).length

  const getCategoryLabel = value => {
    return CATEGORIES.find(cat => cat.value === value)?.label || value
  }

  return (
    <div className="min-h-screen bg-[#E4E1DC] text-[#202020] font-['Hind_Siliguri']">
      {/* Page Header */}
      <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8'>
        <div>
          <div className='flex items-center gap-2 text-xs text-[#77736D] mb-2'>
            <span>ড্যাশবোর্ড</span>
            <span>/</span>
            <span>কনটেন্ট ম্যানেজমেন্ট</span>
            <span>/</span>
            <span className='text-[#34483C]'>সংবাদ</span>
          </div>

          <h1 className='text-3xl md:text-4xl font-bold tracking-tight'>
            সংবাদ ব্যবস্থাপনা
          </h1>

          <p className='text-sm text-[#77736D] mt-2'>
            খবরনামার সকল সংবাদ, প্রকাশনা ও ফিচার পরিচালনা করুন।
          </p>
        </div>

        <Link
          to='/admin/news/create'
          className='inline-flex items-center justify-center gap-2 bg-[#34483C] hover:bg-[#26372D] text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors shadow-sm'
        >
          <FiPlus size={18} />
          নতুন সংবাদ লিখুন
        </Link>
      </div>

      {/* Statistics */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-7'>
        <div className='bg-[#F8F7F4] border border-[#D8D4CC] rounded-md p-5'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-sm text-[#77736D]'>মোট সংবাদ</p>
              <h2 className='text-3xl font-bold mt-2'>{news.length}</h2>
              <p className='text-xs text-[#99948B] mt-1'>বর্তমান পৃষ্ঠা</p>
            </div>
            <div className='w-11 h-11 bg-[#EAE8E1] rounded-md flex items-center justify-center text-[#34483C]'>
              <FiFileText size={21} />
            </div>
          </div>
        </div>

        <div className='bg-[#F8F7F4] border border-[#D8D4CC] rounded-md p-5'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-sm text-[#77736D]'>প্রকাশিত সংবাদ</p>
              <h2 className='text-3xl font-bold mt-2'>{publishedCount}</h2>
              <p className='text-xs text-[#99948B] mt-1'>বর্তমান পৃষ্ঠা</p>
            </div>
            <div className='w-11 h-11 bg-[#E5EDE6] rounded-md flex items-center justify-center text-[#34483C]'>
              <FiEye size={21} />
            </div>
          </div>
        </div>

        <div className='bg-[#F8F7F4] border border-[#D8D4CC] rounded-md p-5'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-sm text-[#77736D]'>খসড়া সংবাদ</p>
              <h2 className='text-3xl font-bold mt-2'>{draftCount}</h2>
              <p className='text-xs text-[#99948B] mt-1'>বর্তমান পৃষ্ঠা</p>
            </div>
            <div className='w-11 h-11 bg-[#F5EEDC] rounded-md flex items-center justify-center text-[#92712F]'>
              <FiEdit2 size={21} />
            </div>
          </div>
        </div>

        <div className='bg-[#F8F7F4] border border-[#D8D4CC] rounded-md p-5'>
          <div className='flex justify-between items-start'>
            <div>
              <p className='text-sm text-[#77736D]'>Featured সংবাদ</p>
              <h2 className='text-3xl font-bold mt-2'>{featuredCount}</h2>
              <p className='text-xs text-[#99948B] mt-1'>বর্তমান পৃষ্ঠা</p>
            </div>
            <div className='w-11 h-11 bg-[#F5EEDC] rounded-md flex items-center justify-center text-[#92712F]'>
              <FiStar size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='bg-[#F8F7F4] border border-[#D8D4CC] rounded-md overflow-hidden'>
        {/* Section Heading */}
        <div className='px-5 md:px-6 py-5 border-b border-[#E4E1DC] flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
          <div>
            <h2 className='text-xl font-bold'>সকল সংবাদ</h2>
            <p className='text-xs text-[#8B867E] mt-1'>
              সংবাদ তালিকা ও প্রকাশনা নিয়ন্ত্রণ
            </p>
          </div>

          <button
            onClick={fetchNews}
            disabled={loading}
            className='flex items-center justify-center gap-2 text-sm text-[#34483C] hover:bg-[#EAE8E1] px-4 py-2 rounded-md transition-colors disabled:opacity-50'
          >
            <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            রিফ্রেশ
          </button>
        </div>

        {/* Filters */}
        <div className='p-5 md:p-6 border-b border-[#E4E1DC]'>
          <div className='flex items-center gap-2 text-sm font-semibold mb-4'>
            <FiFilter className='text-[#34483C]' />
            সংবাদ ফিল্টার
          </div>

          <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
            {/* Search */}
            <div className='relative'>
              <FiSearch className='absolute left-3 top-1/2 -translate-y-1/2 text-[#99948B]' />
              <input
                type='text'
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder='সংবাদের শিরোনাম খুঁজুন...'
                className='w-full pl-10 pr-4 py-3 bg-white border border-[#D8D4CC] rounded-md text-sm outline-none focus:border-[#34483C]'
              />
            </div>

            {/* Status */}
            <select
              value={filter.status}
              onChange={e => handleFilterChange('status', e.target.value)}
              className='w-full px-4 py-3 bg-white border border-[#D8D4CC] rounded-md text-sm outline-none focus:border-[#34483C]'
            >
              <option value=''>সকল স্ট্যাটাস</option>
              <option value='draft'>খসড়া</option>
              <option value='published'>প্রকাশিত</option>
              <option value='archived'>আর্কাইভ</option>
            </select>

            {/* Category */}
            <select
              value={filter.category}
              onChange={e => handleFilterChange('category', e.target.value)}
              className='w-full px-4 py-3 bg-white border border-[#D8D4CC] rounded-md text-sm outline-none focus:border-[#34483C]'
            >
              <option value=''>সকল বিভাগ</option>
              {CATEGORIES.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* News Table */}
        {loading ? (
          <div className='py-16'>
            <Loading />
          </div>
        ) : filteredNews.length === 0 ? (
          <div className='py-20 text-center px-5'>
            <div className='w-16 h-16 mx-auto bg-[#EAE8E1] rounded-full flex items-center justify-center text-[#34483C] mb-4'>
              <FiFileText size={26} />
            </div>
            <h3 className='text-lg font-bold'>কোনো সংবাদ পাওয়া যায়নি</h3>
            <p className='text-sm text-[#8B867E] mt-2'>
              সার্চ অথবা ফিল্টার পরিবর্তন করে আবার চেষ্টা করুন।
            </p>
          </div>
        ) : (
          <>
            <div className='overflow-x-auto'>
              <table className='w-full min-w-[850px]'>
                <thead className='bg-[#F0EEE9]'>
                  <tr>
                    <th className='px-6 py-4 text-left text-xs font-bold text-[#77736D]'>
                      সংবাদ
                    </th>
                    <th className='px-5 py-4 text-left text-xs font-bold text-[#77736D]'>
                      বিভাগ
                    </th>
                    <th className='px-5 py-4 text-left text-xs font-bold text-[#77736D]'>
                      স্ট্যাটাস
                    </th>
                    <th className='px-5 py-4 text-left text-xs font-bold text-[#77736D]'>
                      ভিউ
                    </th>
                    <th className='px-5 py-4 text-left text-xs font-bold text-[#77736D]'>
                      প্রকাশের তারিখ
                    </th>
                    <th className='px-6 py-4 text-right text-xs font-bold text-[#77736D]'>
                      অ্যাকশন
                    </th>
                  </tr>
                </thead>

                <tbody className='divide-y divide-[#EAE8E1]'>
                  {filteredNews.map(item => {
                    const status = STATUS[item.status] || STATUS.archived

                    return (
                      <tr
                        key={item._id}
                        className='hover:bg-[#F3F1EC] transition-colors'
                      >
                        {/* News Title */}
                        <td className='px-6 py-4'>
                          <div className='flex items-center gap-3 max-w-[380px]'>
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.title}
                                className='w-16 h-12 object-cover rounded-sm bg-[#E4E1DC] flex-shrink-0'
                              />
                            ) : (
                              <div className='w-16 h-12 bg-[#EAE8E1] rounded-sm flex items-center justify-center text-[#99948B] flex-shrink-0'>
                                <FiFileText size={20} />
                              </div>
                            )}

                            <div className='min-w-0'>
                              <p className='font-semibold text-sm text-[#202020] line-clamp-2 leading-6'>
                                {item.title}
                              </p>

                              {item.isFeatured && (
                                <span className='inline-flex items-center gap-1 text-[11px] text-[#92712F] mt-1'>
                                  <FiStar size={11} fill='currentColor' />
                                  বিশেষ সংবাদ
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Category */}
                        <td className='px-5 py-4'>
                          <span className='text-sm text-[#555149]'>
                            {getCategoryLabel(item.category)}
                          </span>
                        </td>

                        {/* Status */}
                        <td className='px-5 py-4'>
                          <span
                            className={`inline-flex px-3 py-1 rounded-sm text-xs font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>

                        {/* Views */}
                        <td className='px-5 py-4'>
                          <span className='inline-flex items-center gap-2 text-sm text-[#77736D]'>
                            <FiEye size={15} />
                            {item.views || 0}
                          </span>
                        </td>

                        {/* Date */}
                        <td className='px-5 py-4'>
                          <div className='flex items-center gap-2 text-xs text-[#77736D]'>
                            <FiCalendar size={14} />
                            {item.createdAt
                              ? format(new Date(item.createdAt), 'dd MMM yyyy')
                              : '—'}
                          </div>
                        </td>

                        {/* Actions */}
                        <td className='px-6 py-4'>
                          <div className='flex justify-end items-center gap-2'>
                            <button
                              onClick={() => handleToggleFeatured(item._id)}
                              title={
                                item.isFeatured
                                  ? 'বিশেষ সংবাদ থেকে সরান'
                                  : 'বিশেষ সংবাদ করুন'
                              }
                              className={`w-9 h-9 flex items-center justify-center rounded-sm transition-colors ${
                                item.isFeatured
                                  ? 'bg-[#F5EEDC] text-[#92712F]'
                                  : 'bg-[#ECEAE6] text-[#77736D] hover:bg-[#E5E0D5]'
                              }`}
                            >
                              <FiStar
                                size={16}
                                fill={item.isFeatured ? 'currentColor' : 'none'}
                              />
                            </button>

                            <Link
                              to={`/admin/news/${item._id}`}
                              title='সম্পাদনা'
                              className='w-9 h-9 flex items-center justify-center rounded-sm bg-[#E8ECE8] text-[#34483C] hover:bg-[#D9E3DA] transition-colors'
                            >
                              <FiEdit2 size={16} />
                            </Link>

                            <button
                              onClick={() => handleDelete(item._id)}
                              title='মুছে ফেলুন'
                              className='w-9 h-9 flex items-center justify-center rounded-sm bg-[#F0E8E4] text-[#985C4B] hover:bg-[#EADBD5] transition-colors'
                            >
                              <FiTrash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='px-5 md:px-6 py-5 border-t border-[#E4E1DC] flex flex-col sm:flex-row items-center justify-between gap-4'>
              <p className='text-xs text-[#77736D]'>
                পৃষ্ঠা <span className='font-bold text-[#202020]'>{page}</span>{' '}
                / {totalPages}
              </p>

              <div className='flex items-center gap-2'>
                <button
                  onClick={() => setPage(prev => Math.max(1, prev - 1))}
                  disabled={page === 1}
                  className='flex items-center gap-2 px-4 py-2 border border-[#D8D4CC] rounded-sm text-sm text-[#555149] hover:bg-[#ECEAE6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                >
                  <FiChevronLeft />
                  আগের
                </button>

                <span className='px-4 py-2 bg-[#34483C] text-white rounded-sm text-sm font-semibold'>
                  {page}
                </span>

                <button
                  onClick={() =>
                    setPage(prev => Math.min(totalPages, prev + 1))
                  }
                  disabled={page === totalPages}
                  className='flex items-center gap-2 px-4 py-2 border border-[#D8D4CC] rounded-sm text-sm text-[#555149] hover:bg-[#ECEAE6] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                >
                  পরের
                  <FiChevronRight />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Footer Note */}
      <div className='flex flex-col sm:flex-row items-center justify-between gap-2 mt-5 text-xs text-[#8B867E]'>
        <p>খবরনামা — সত্যের সন্ধানে, সংবাদের সাথে।</p>
        <p>Content Management System</p>
      </div>
    </div>
  )
}

export default NewsList
