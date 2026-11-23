import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiFileText,
  FiEdit3,
  FiCheckCircle,
  FiClock,
  FiPlus,
  FiArrowRight,
  FiLoader,
  FiTrendingUp,
  FiExternalLink,
  FiCalendar,
  FiBookOpen,
  FiPenTool,
  FiActivity
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import { subEditorAPI } from '../../services/api'

const BRAND = {
  primary: '#202020',
  background: '#E4E1DC',
  surface: '#F8F7F4',
  accent: '#34483C'
}

const formatDate = date => {
  if (!date) return 'N/A'

  return new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  })
}

const getStatusStyle = status => {
  const styles = {
    published: 'bg-[#E8F0E9] text-[#34483C]',
    draft: 'bg-[#F5EFE2] text-[#94702C]',
    pending: 'bg-[#E9EEF5] text-[#496582]',
    archived: 'bg-[#EEEEEC] text-[#666660]'
  }

  return styles[status?.toLowerCase()] || styles.draft
}

const StatCard = ({ title, value, icon: Icon, description }) => (
  <div className='group rounded-xl border border-[#E9E6E0] bg-white p-5 transition duration-300 hover:border-[#34483C]/30 hover:shadow-md'>
    <div className='flex items-start justify-between'>
      <div>
        <p className='text-sm font-medium text-[#77766F]'>{title}</p>

        <h3 className='mt-3 text-3xl font-bold tracking-tight text-[#202020]'>
          {value}
        </h3>

        <p className='mt-2 text-xs text-[#96948C]'>{description}</p>
      </div>

      <div className='flex h-11 w-11 items-center justify-center rounded-lg bg-[#F0F1EC] text-[#34483C] transition group-hover:bg-[#34483C] group-hover:text-white'>
        <Icon size={20} />
      </div>
    </div>
  </div>
)

const SectionHeading = ({ title, subtitle, action }) => (
  <div className='mb-5 flex flex-wrap items-end justify-between gap-3'>
    <div>
      <h2 className='text-lg font-bold tracking-tight text-[#202020]'>
        {title}
      </h2>
      <p className='mt-1 text-sm text-[#88867F]'>{subtitle}</p>
    </div>

    {action}
  </div>
)

const SubEditorDashboard = () => {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const { data } = await subEditorAPI.getDashboard()
        setDashboard(data.data || data)
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    fetchDashboard()
  }, [])

  const stats = [
    {
      title: 'Total Articles',
      value: dashboard?.totalNews ?? 0,
      icon: FiFileText,
      description: 'Your total contributions'
    },
    {
      title: 'Draft Articles',
      value: dashboard?.draftNews ?? 0,
      icon: FiEdit3,
      description: 'Articles saved as drafts'
    },
    {
      title: 'Published Articles',
      value: dashboard?.publishedNews ?? 0,
      icon: FiCheckCircle,
      description: 'Successfully published'
    },
    {
      title: 'Archived Articles',
      value: dashboard?.archivedNews ?? 0,
      icon: FiClock,
      description: 'Articles in archive'
    }
  ]

  if (loading) {
    return (
      <div className='flex min-h-[65vh] flex-col items-center justify-center bg-[#E4E1DC]'>
        <FiLoader className='animate-spin text-3xl text-[#34483C]' />
        <p className='mt-4 text-sm text-[#77766F]'>
          Preparing your editorial workspace...
        </p>
      </div>
    )
  }

  const recentNews = dashboard?.recentNews || []

  return (
    <div className='min-h-screen bg-[#E4E1DC] p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-screen-2xl space-y-7'>
        {/* Page Header */}
        <header className='flex flex-col justify-between gap-4 border-b border-[#CFCBC3] pb-5 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-3'>
            <img
              src='https://i.imgur.com/Xkp2QhW.png'
              alt='Khobornama'
              className='h-12 w-12 object-contain'
            />

            <div>
              <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#77766F]'>
                KHOBORNAMA
              </p>
              <h1 className='text-xl font-bold text-[#202020]'>
                Editorial Dashboard
              </h1>
            </div>
          </div>

          <div className='flex items-center gap-2 text-sm text-[#77766F]'>
            <FiCalendar />
            {new Date().toLocaleDateString('en-GB', {
              weekday: 'long',
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}
          </div>
        </header>

        {/* Welcome Section */}
        <section className='relative overflow-hidden rounded-xl bg-[#34483C] p-6 text-white sm:p-9'>
          <div className='relative z-10 flex flex-col justify-between gap-7 lg:flex-row lg:items-center'>
            <div className='max-w-2xl'>
              <div className='mb-4 inline-flex items-center gap-2 border border-white/20 px-3 py-1.5 text-xs font-medium tracking-wide text-white/80'>
                <FiActivity />
                SUB EDITOR WORKSPACE
              </div>

              <h2 className='text-2xl font-bold leading-tight sm:text-3xl text-[#fff]'>
                Welcome back, {dashboard?.user?.name || 'Editor'}!
              </h2>

              <p className='mt-3 max-w-xl text-sm leading-7 text-white/75'>
                Every story matters. Create meaningful journalism, manage your
                articles, and contribute to trustworthy news coverage with
                Khobornama.
              </p>
            </div>

            <Link
              to='/sub-editor/news/create'
              className='inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-[#F8F7F4] px-6 py-3.5 text-sm font-bold text-[#34483C] transition hover:bg-white'
            >
              <FiPlus size={18} />
              Write New Article
            </Link>
          </div>

          <div className='pointer-events-none absolute -bottom-24 -right-12 h-64 w-64 rounded-full border border-white/10' />
          <div className='pointer-events-none absolute -bottom-16 -right-4 h-44 w-44 rounded-full border border-white/10' />
        </section>

        {/* Statistics */}
        <section>
          <SectionHeading
            title='Your Overview'
            subtitle='A summary of your editorial contributions.'
          />

          <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
            {stats.map(stat => (
              <StatCard key={stat.title} {...stat} />
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <SectionHeading
            title='Quick Access'
            subtitle='Get started with your editorial tasks.'
          />

          <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
            <Link
              to='/sub-editor/news/create'
              className='group flex items-center justify-between rounded-xl border border-[#E9E6E0] bg-white p-5 transition hover:border-[#34483C]/40 hover:shadow-md sm:p-6'
            >
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F0F1EC] text-[#34483C]'>
                  <FiPenTool size={21} />
                </div>

                <div>
                  <h3 className='font-bold text-[#202020]'>
                    Create New Article
                  </h3>
                  <p className='mt-1 text-sm text-[#88867F]'>
                    Write, edit and save a new news story.
                  </p>
                </div>
              </div>

              <FiArrowRight className='text-xl text-[#AAA79F] transition group-hover:translate-x-1 group-hover:text-[#34483C]' />
            </Link>

            <Link
              to='/sub-editor/news'
              className='group flex items-center justify-between rounded-xl border border-[#E9E6E0] bg-white p-5 transition hover:border-[#34483C]/40 hover:shadow-md sm:p-6'
            >
              <div className='flex items-center gap-4'>
                <div className='flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F0F1EC] text-[#34483C]'>
                  <FiBookOpen size={21} />
                </div>

                <div>
                  <h3 className='font-bold text-[#202020]'>
                    Manage My Articles
                  </h3>
                  <p className='mt-1 text-sm text-[#88867F]'>
                    View and manage all your submitted news.
                  </p>
                </div>
              </div>

              <FiArrowRight className='text-xl text-[#AAA79F] transition group-hover:translate-x-1 group-hover:text-[#34483C]' />
            </Link>
          </div>
        </section>

        {/* Recent Articles */}
        <section className='overflow-hidden rounded-xl border border-[#E9E6E0] bg-white'>
          <div className='p-5 sm:p-6'>
            <SectionHeading
              title='Recent Articles'
              subtitle='Your latest editorial contributions.'
              action={
                <Link
                  to='/sub-editor/news'
                  className='inline-flex items-center gap-2 text-sm font-semibold text-[#34483C] hover:underline'
                >
                  View All <FiArrowRight />
                </Link>
              }
            />

            {recentNews.length > 0 ? (
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[550px] text-left'>
                  <thead>
                    <tr className='border-y border-[#EEECE7] text-xs uppercase tracking-wider text-[#88867F]'>
                      <th className='py-4 pr-4 font-semibold'>Article</th>
                      <th className='px-4 py-4 font-semibold'>Category</th>
                      <th className='px-4 py-4 font-semibold'>Date</th>
                      <th className='py-4 pl-4 text-right font-semibold'>
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className='divide-y divide-[#F0EEE9]'>
                    {recentNews.map(news => (
                      <tr
                        key={news._id}
                        className='group transition hover:bg-[#FAF9F6]'
                      >
                        <td className='max-w-[280px] py-4 pr-4'>
                          <p className='truncate text-sm font-semibold text-[#202020]'>
                            {news.title}
                          </p>
                          <p className='mt-1 text-xs text-[#A09D95]'>
                            Article contribution
                          </p>
                        </td>

                        <td className='px-4 py-4 text-sm text-[#66645D]'>
                          {news.category || 'Uncategorized'}
                        </td>

                        <td className='whitespace-nowrap px-4 py-4 text-sm text-[#77766F]'>
                          {formatDate(news.createdAt)}
                        </td>

                        <td className='py-4 pl-4 text-right'>
                          <span
                            className={`inline-flex rounded-md px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                              news.status
                            )}`}
                          >
                            {news.status || 'draft'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center py-14 text-center'>
                <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F1EC] text-[#34483C]'>
                  <FiFileText size={27} />
                </div>

                <h3 className='mt-5 font-bold text-[#202020]'>
                  No Articles Yet
                </h3>

                <p className='mt-2 max-w-sm text-sm leading-6 text-[#88867F]'>
                  Your latest articles will appear here. Start contributing by
                  writing your first news story.
                </p>

                <Link
                  to='/sub-editor/news/create'
                  className='mt-5 inline-flex items-center gap-2 rounded-lg bg-[#34483C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26392E]'
                >
                  <FiPlus />
                  Create Your First Article
                </Link>
              </div>
            )}
          </div>

          <div className='flex items-center justify-between border-t border-[#EEECE7] bg-[#FAF9F6] px-5 py-3.5 sm:px-6'>
            <p className='text-xs text-[#96938B]'>
              Khobornama Editorial Workspace
            </p>

            <span className='flex items-center gap-1.5 text-xs font-medium text-[#34483C]'>
              <FiTrendingUp />
              Editorial Activity
            </span>
          </div>
        </section>

        {/* Footer */}
        <footer className='flex flex-col items-center justify-between gap-2 border-t border-[#CFCBC3] pt-5 text-center sm:flex-row sm:text-left'>
          <p className='text-xs text-[#77766F]'>
            © {new Date().getFullYear()} Khobornama. All rights reserved.
          </p>

          <a
            href='/'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-xs font-semibold text-[#34483C] hover:underline'
          >
            Visit Website
            <FiExternalLink />
          </a>
        </footer>
      </div>
    </div>
  )
}

export default SubEditorDashboard
