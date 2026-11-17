import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  FiFileText,
  FiEye,
  FiHeart,
  FiTrendingUp,
  FiPlus,
  FiArrowUpRight,
  FiArrowRight,
  FiBarChart2,
  FiCalendar,
  FiRefreshCw
} from 'react-icons/fi'
import { adminAPI } from '../../services/api'
import Loading from '../../components/Loading'

const AdminDashboard = () => {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchStats = async () => {
    try {
      setLoading(true)
      const res = await adminAPI.getStats()
      setStats(res.data.data)
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStats()
  }, [])

  if (loading) return <Loading />

  const statCards = [
    {
      title: 'Total News',
      value: stats?.totalNews || 0,
      icon: FiFileText,
      description: 'All submitted articles'
    },
    {
      title: 'Published',
      value: stats?.publishedNews || 0,
      icon: FiTrendingUp,
      description: 'Live on the website'
    },
    {
      title: 'Total Views',
      value: stats?.engagement?.totalViews || 0,
      icon: FiEye,
      description: 'Article readership'
    },
    {
      title: 'Total Likes',
      value: stats?.engagement?.totalLikes || 0,
      icon: FiHeart,
      description: 'Reader engagement'
    }
  ]

  const categoryData = stats?.newsByCategory || []
  const recentNews = stats?.recentNews || []

  const totalCategoryNews = categoryData.reduce(
    (total, category) => total + category.count,
    0
  )

  const categoryColors = [
    '#34483C',
    '#64796A',
    '#9AA99C',
    '#B8A98B',
    '#8C8175',
    '#A6A39B'
  ]

  const getCategoryWidth = count => {
    if (!totalCategoryNews) return 0
    return (count / totalCategoryNews) * 100
  }

  return (
    <div className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
      {/* Dashboard Header */}
      <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8'>
        <div>
          <div className='flex items-center gap-2 text-[#34483C] mb-2'>
            <span className='w-7 h-[2px] bg-[#34483C]' />
            <span className='text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]'>
              Khobornama Administration
            </span>
          </div>

          <h1 className='text-3xl sm:text-4xl font-bold tracking-tight'>
            Dashboard
          </h1>

          <p className='text-sm text-gray-500 mt-2'>
            Overview of your news platform and audience engagement.
          </p>
        </div>

        <div className='flex items-center gap-3'>
          <button
            onClick={fetchStats}
            className='inline-flex items-center justify-center gap-2 px-4 py-3 bg-[#F8F7F4] border border-[#202020]/10 text-[#34483C] text-sm font-semibold hover:bg-white transition-colors'
          >
            <FiRefreshCw size={15} />
            Refresh
          </button>

          <Link
            to='/admin/news/create'
            className='inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#34483C] text-white text-sm font-semibold hover:bg-[#202020] transition-colors'
          >
            <FiPlus size={17} />
            Create News
          </Link>
        </div>
      </div>

      {/* Overview Label */}
      <div className='flex items-center gap-3 mb-5'>
        <h2 className='text-xs font-bold uppercase tracking-[0.2em] text-gray-500'>
          Platform Overview
        </h2>
        <div className='flex-1 h-px bg-[#202020]/10' />
      </div>

      {/* Statistics Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-10'>
        {statCards.map((stat, index) => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className='group bg-[#F8F7F4] p-5 sm:p-6 border border-[#202020]/5 hover:border-[#34483C]/30 transition-all duration-300'
            >
              <div className='flex items-start justify-between'>
                <div>
                  <p className='text-xs font-semibold uppercase tracking-wider text-gray-500'>
                    {stat.title}
                  </p>

                  <h3 className='text-3xl sm:text-4xl font-bold tracking-tight mt-4 tabular-nums'>
                    {stat.value.toLocaleString()}
                  </h3>
                </div>

                <div className='w-11 h-11 flex items-center justify-center bg-[#34483C]/10 text-[#34483C] group-hover:bg-[#34483C] group-hover:text-white transition-colors'>
                  <Icon size={21} />
                </div>
              </div>

              <div className='mt-5 pt-4 border-t border-[#202020]/10'>
                <p className='text-xs text-gray-500'>{stat.description}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className='grid grid-cols-1 xl:grid-cols-5 gap-5 lg:gap-6'>
        {/* News by Category */}
        <section className='xl:col-span-2 bg-[#F8F7F4] border border-[#202020]/5 p-5 sm:p-7'>
          <div className='flex items-start justify-between gap-3 mb-7'>
            <div>
              <div className='flex items-center gap-2 text-[#34483C] mb-2'>
                <FiBarChart2 size={15} />
                <span className='text-[10px] font-bold uppercase tracking-[0.2em]'>
                  Content Distribution
                </span>
              </div>

              <h2 className='text-xl font-bold'>News by Category</h2>
            </div>

            <span className='text-xs text-gray-500 bg-[#E4E1DC] px-3 py-2'>
              {totalCategoryNews} Articles
            </span>
          </div>

          {categoryData.length > 0 ? (
            <>
              {/* Category Distribution Bar */}
              <div className='flex h-3 overflow-hidden bg-[#E4E1DC] mb-7'>
                {categoryData.map((cat, index) => (
                  <div
                    key={cat._id}
                    style={{
                      width: `${getCategoryWidth(cat.count)}%`,
                      backgroundColor:
                        categoryColors[index % categoryColors.length]
                    }}
                    title={`${cat._id}: ${cat.count}`}
                  />
                ))}
              </div>

              {/* Category List */}
              <div className='space-y-5'>
                {categoryData.map((cat, index) => (
                  <div key={cat._id}>
                    <div className='flex items-center justify-between gap-3 mb-2'>
                      <div className='flex items-center gap-2 min-w-0'>
                        <span
                          className='w-2.5 h-2.5 shrink-0'
                          style={{
                            backgroundColor:
                              categoryColors[index % categoryColors.length]
                          }}
                        />

                        <span className='text-sm font-medium text-[#333] capitalize truncate'>
                          {cat._id}
                        </span>
                      </div>

                      <div className='flex items-center gap-3 shrink-0'>
                        <span className='text-xs text-gray-400'>
                          {getCategoryWidth(cat.count).toFixed(1)}%
                        </span>

                        <span className='text-sm font-bold tabular-nums w-7 text-right'>
                          {cat.count}
                        </span>
                      </div>
                    </div>

                    <div className='w-full h-1.5 bg-[#E4E1DC] overflow-hidden'>
                      <div
                        className='h-full transition-all duration-500'
                        style={{
                          width: `${getCategoryWidth(cat.count)}%`,
                          backgroundColor:
                            categoryColors[index % categoryColors.length]
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className='py-12 text-center'>
              <FiBarChart2 className='mx-auto text-3xl text-gray-300' />
              <p className='text-sm text-gray-500 mt-3'>
                No category data available.
              </p>
            </div>
          )}
        </section>

        {/* Recent News */}
        <section className='xl:col-span-3 bg-[#F8F7F4] border border-[#202020]/5 p-5 sm:p-7'>
          <div className='flex items-center justify-between gap-3 mb-7'>
            <div>
              <div className='flex items-center gap-2 text-[#34483C] mb-2'>
                <FiFileText size={15} />
                <span className='text-[10px] font-bold uppercase tracking-[0.2em]'>
                  Content Management
                </span>
              </div>

              <h2 className='text-xl font-bold'>Recent News</h2>
            </div>

            <Link
              to='/admin/news'
              className='inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#34483C] hover:text-[#202020] transition-colors'
            >
              View All
              <FiArrowUpRight />
            </Link>
          </div>

          {recentNews.length > 0 ? (
            <div className='divide-y divide-[#202020]/10'>
              {recentNews.map(news => (
                <Link
                  key={news._id}
                  to={`/admin/news/${news._id}`}
                  className='group flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0'
                >
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm sm:text-base font-semibold text-[#202020] truncate group-hover:text-[#34483C] transition-colors'>
                      {news.title}
                    </p>

                    <div className='flex flex-wrap items-center gap-3 mt-2'>
                      <span
                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 ${
                          news.status === 'published'
                            ? 'bg-[#34483C]/10 text-[#34483C]'
                            : news.status === 'archived'
                            ? 'bg-gray-200 text-gray-600'
                            : 'bg-[#B8A98B]/20 text-[#806A45]'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            news.status === 'published'
                              ? 'bg-[#34483C]'
                              : news.status === 'archived'
                              ? 'bg-gray-500'
                              : 'bg-[#B8A98B]'
                          }`}
                        />
                        {news.status}
                      </span>

                      <span className='inline-flex items-center gap-1 text-xs text-gray-500'>
                        <FiEye size={12} />
                        {news.views || 0}
                      </span>

                      <span className='inline-flex items-center gap-1 text-xs text-gray-500'>
                        <FiHeart size={12} />
                        {news.likesCount || 0}
                      </span>
                    </div>
                  </div>

                  <div className='w-9 h-9 shrink-0 flex items-center justify-center border border-[#202020]/10 text-gray-400 group-hover:bg-[#34483C] group-hover:text-white group-hover:border-[#34483C] transition-colors'>
                    <FiArrowRight size={16} />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className='py-12 text-center'>
              <FiFileText className='mx-auto text-3xl text-gray-300' />
              <p className='text-sm text-gray-500 mt-3'>
                No recent news available.
              </p>
              <Link
                to='/admin/news/create'
                className='inline-flex items-center gap-2 mt-4 text-sm font-semibold text-[#34483C]'
              >
                Create your first article
                <FiArrowUpRight />
              </Link>
            </div>
          )}
        </section>
      </div>

      {/* Bottom Information */}
      <div className='mt-8 border-t border-[#202020]/15 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='flex items-center gap-2 text-xs text-gray-500'>
          <FiCalendar size={13} />
          <span>Khobornama Admin Dashboard</span>
        </div>

        <p className='text-xs text-gray-400'>সত্য ও নিরপেক্ষ সংবাদ</p>
      </div>
    </div>
  )
}

export default AdminDashboard
