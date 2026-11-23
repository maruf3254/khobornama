import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiChevronLeft,
  FiChevronRight,
  FiFileText,
  FiLoader,
  FiRefreshCw,
  FiCalendar,
  FiX,
  FiAlertTriangle,
  FiArrowRight,
  FiExternalLink,
  FiFilter
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import { subEditorAPI } from '../../services/api'

const MyNews = () => {
  const [news, setNews] = useState([])
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState(null)
  const [selectedNews, setSelectedNews] = useState(null)

  const fetchNews = useCallback(async () => {
    try {
      setLoading(true)

      const params = {
        page,
        limit: 10,
        search
      }

      if (status !== 'all') {
        params.status = status
      }

      const { data } = await subEditorAPI.getNews(params)
      const result = data.data || data

      setNews(Array.isArray(result) ? result : result.news || [])

      setTotalPages(data.totalPages || result.totalPages || 1)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Unable to load your news')

      setNews([])
    } finally {
      setLoading(false)
    }
  }, [page, search, status])

  useEffect(() => {
    fetchNews()
  }, [fetchNews])

  const handleDelete = async () => {
    if (!selectedNews) return

    const id = selectedNews._id

    try {
      setDeletingId(id)

      await subEditorAPI.deleteNews(id)

      toast.success('Article deleted successfully.')

      setSelectedNews(null)

      // Avoid leaving the user on an empty final page.
      if (news.length === 1 && page > 1) {
        setPage(previous => previous - 1)
      } else {
        fetchNews()
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete article')
    } finally {
      setDeletingId(null)
    }
  }

  const statusStyle = value => {
    const styles = {
      draft: 'bg-[#F5EFE2] text-[#94702C] border-[#E9DDBF]',
      published: 'bg-[#E8F0E9] text-[#34483C] border-[#D6E5D8]',
      archived: 'bg-[#EEEEEC] text-[#666660] border-[#E3E2DE]',
      pending: 'bg-[#E9EEF5] text-[#496582] border-[#D8E2EF]'
    }

    return styles[value?.toLowerCase()] || styles.draft
  }

  const formatDate = date => {
    if (!date) return 'N/A'

    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleSearch = value => {
    setSearch(value)
    setPage(1)
  }

  const handleStatusChange = value => {
    setStatus(value)
    setPage(1)
  }

  return (
    <div className='min-h-screen bg-[#E4E1DC] p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-screen-2xl space-y-7'>
        {/* Page Header */}
        <header className='flex flex-col justify-between gap-5 border-b border-[#CFCBC3] pb-6 sm:flex-row sm:items-center'>
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

              <h1 className='mt-0.5 text-2xl font-bold tracking-tight text-[#202020] sm:text-3xl'>
                My Articles
              </h1>

              <p className='mt-1 text-sm text-[#77766F]'>
                Manage and organize your editorial contributions.
              </p>
            </div>
          </div>

          <Link
            to='/sub-editor/news/create'
            className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#34483C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26392E]'
          >
            <FiPlus size={18} />
            Create New Article
          </Link>
        </header>

        {/* Main Content */}
        <section className='overflow-hidden rounded-xl border border-[#E9E6E0] bg-white'>
          {/* Section Heading */}
          <div className='flex flex-col justify-between gap-4 border-b border-[#EEECE7] p-5 sm:flex-row sm:items-center sm:p-6'>
            <div>
              <h2 className='text-lg font-bold text-[#202020]'>
                Article Management
              </h2>

              <p className='mt-1 text-sm text-[#88867F]'>
                Search, filter, edit or remove your articles.
              </p>
            </div>

            <button
              onClick={fetchNews}
              disabled={loading}
              className='inline-flex items-center justify-center gap-2 self-start rounded-lg border border-[#E6E3DD] px-4 py-2.5 text-sm font-medium text-[#55554F] transition hover:border-[#34483C] hover:text-[#34483C] disabled:cursor-not-allowed disabled:opacity-50 sm:self-auto'
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {/* Search and Filters */}
          <div className='flex flex-col gap-3 border-b border-[#EEECE7] bg-[#FAF9F6] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6'>
            <div className='relative w-full sm:max-w-md'>
              <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-[#96938B]' />

              <input
                type='search'
                value={search}
                onChange={e => handleSearch(e.target.value)}
                placeholder='Search by article title or keyword...'
                className='w-full rounded-lg border border-[#E6E3DD] bg-white py-3 pl-11 pr-4 text-sm text-[#202020] outline-none transition placeholder:text-[#AAA79F] focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10'
              />
            </div>

            <div className='flex flex-col gap-2 sm:flex-row'>
              <div className='relative'>
                <FiFilter className='pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#88867F]' />

                <select
                  value={status}
                  onChange={e => handleStatusChange(e.target.value)}
                  className='w-full appearance-none rounded-lg border border-[#E6E3DD] bg-white py-3 pl-9 pr-9 text-sm text-[#55554F] outline-none focus:border-[#34483C] sm:w-44'
                >
                  <option value='all'>All Status</option>
                  <option value='draft'>Draft</option>
                  <option value='published'>Published</option>
                  <option value='archived'>Archived</option>
                  <option value='pending'>Pending</option>
                </select>

                <span className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#88867F]'>
                  ▼
                </span>
              </div>
            </div>
          </div>

          {/* Article Table */}
          <div className='overflow-x-auto'>
            <table className='w-full min-w-[850px] text-left'>
              <thead className='bg-[#F8F7F4]'>
                <tr className='border-b border-[#EEECE7]'>
                  <th className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-[#88867F]'>
                    Article Information
                  </th>

                  <th className='px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#88867F]'>
                    Category
                  </th>

                  <th className='px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#88867F]'>
                    Status
                  </th>

                  <th className='px-5 py-4 text-xs font-bold uppercase tracking-wider text-[#88867F]'>
                    Created Date
                  </th>

                  <th className='px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-[#88867F]'>
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className='divide-y divide-[#F0EEE9]'>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={index}>
                      <td colSpan='5' className='px-6 py-5'>
                        <div className='flex animate-pulse items-center gap-4'>
                          <div className='h-12 w-16 rounded-lg bg-[#EEECE7]' />

                          <div className='flex-1 space-y-2'>
                            <div className='h-3 w-1/3 rounded bg-[#EEECE7]' />
                            <div className='h-2 w-1/4 rounded bg-[#F2F0EB]' />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : news.length === 0 ? (
                  <tr>
                    <td colSpan='5' className='px-6 py-20'>
                      <div className='flex flex-col items-center text-center'>
                        <div className='flex h-16 w-16 items-center justify-center rounded-full bg-[#F0F1EC] text-[#34483C]'>
                          <FiFileText size={27} />
                        </div>

                        <h3 className='mt-5 text-base font-bold text-[#202020]'>
                          {search || status !== 'all'
                            ? 'No matching articles found'
                            : 'No articles yet'}
                        </h3>

                        <p className='mt-2 max-w-sm text-sm leading-6 text-[#88867F]'>
                          {search || status !== 'all'
                            ? 'Try changing your search keyword or status filter.'
                            : 'Your articles will appear here. Start writing your first news story.'}
                        </p>

                        {search || status !== 'all' ? (
                          <button
                            onClick={() => {
                              setSearch('')
                              setStatus('all')
                              setPage(1)
                            }}
                            className='mt-5 text-sm font-semibold text-[#34483C] hover:underline'
                          >
                            Clear all filters
                          </button>
                        ) : (
                          <Link
                            to='/sub-editor/news/create'
                            className='mt-5 inline-flex items-center gap-2 rounded-lg bg-[#34483C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26392E]'
                          >
                            <FiPlus />
                            Create First Article
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  news.map(item => (
                    <tr
                      key={item._id}
                      className='group transition-colors hover:bg-[#FAF9F6]'
                    >
                      {/* Article */}
                      <td className='max-w-[360px] px-6 py-4'>
                        <div className='flex items-center gap-3'>
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.title || 'News thumbnail'}
                              loading='lazy'
                              className='h-14 w-20 shrink-0 rounded-md border border-[#EEECE7] object-cover'
                            />
                          ) : (
                            <div className='flex h-14 w-20 shrink-0 items-center justify-center rounded-md bg-[#F0F1EC] text-[#34483C]'>
                              <FiFileText size={22} />
                            </div>
                          )}

                          <div className='min-w-0'>
                            <h3 className='line-clamp-2 text-sm font-semibold leading-5 text-[#202020]'>
                              {item.title}
                            </h3>

                            <p className='mt-1 truncate text-xs text-[#A09D95]'>
                              {item.slug || 'No slug available'}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className='whitespace-nowrap px-5 py-4'>
                        <span className='inline-block rounded-md bg-[#F5F3EE] px-3 py-1.5 text-xs font-medium text-[#66645D]'>
                          {item.category || 'Uncategorized'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className='whitespace-nowrap px-5 py-4'>
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-semibold capitalize ${statusStyle(
                            item.status
                          )}`}
                        >
                          <span className='h-1.5 w-1.5 rounded-full bg-current' />
                          {item.status || 'draft'}
                        </span>
                      </td>

                      {/* Date */}
                      <td className='whitespace-nowrap px-5 py-4'>
                        <div className='flex items-center gap-2 text-sm text-[#77766F]'>
                          <FiCalendar className='text-[#AAA79F]' />
                          {formatDate(item.createdAt)}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className='whitespace-nowrap px-6 py-4'>
                        <div className='flex justify-end gap-2'>
                          <Link
                            to={`/sub-editor/news/edit/${item._id}`}
                            title='Edit Article'
                            aria-label={`Edit ${item.title}`}
                            className='flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E3DD] text-[#34483C] transition hover:border-[#34483C] hover:bg-[#34483C] hover:text-white'
                          >
                            <FiEdit2 size={15} />
                          </Link>

                          <button
                            type='button'
                            onClick={() => setSelectedNews(item)}
                            title='Delete Article'
                            aria-label={`Delete ${item.title}`}
                            className='flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E3DD] text-[#B34A43] transition hover:border-[#B34A43] hover:bg-[#B34A43] hover:text-white'
                          >
                            <FiTrash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && news.length > 0 && (
            <div className='flex flex-col gap-4 border-t border-[#EEECE7] bg-[#FAF9F6] px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6'>
              <p className='text-sm text-[#88867F]'>
                Showing page{' '}
                <span className='font-semibold text-[#202020]'>{page}</span> of{' '}
                <span className='font-semibold text-[#202020]'>
                  {totalPages}
                </span>
              </p>

              <div className='flex items-center gap-2'>
                <button
                  type='button'
                  disabled={page <= 1}
                  onClick={() => setPage(previous => Math.max(1, previous - 1))}
                  className='flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E3DD] bg-white text-[#55554F] transition hover:border-[#34483C] hover:text-[#34483C] disabled:cursor-not-allowed disabled:opacity-40'
                  aria-label='Previous page'
                >
                  <FiChevronLeft />
                </button>

                <span className='min-w-9 text-center text-sm font-semibold text-[#34483C]'>
                  {page}
                </span>

                <button
                  type='button'
                  disabled={page >= totalPages}
                  onClick={() =>
                    setPage(previous => Math.min(totalPages, previous + 1))
                  }
                  className='flex h-9 w-9 items-center justify-center rounded-lg border border-[#E6E3DD] bg-white text-[#55554F] transition hover:border-[#34483C] hover:text-[#34483C] disabled:cursor-not-allowed disabled:opacity-40'
                  aria-label='Next page'
                >
                  <FiChevronRight />
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Bottom Information */}
        <footer className='flex flex-col items-center justify-between gap-2 border-t border-[#CFCBC3] pt-5 sm:flex-row'>
          <p className='text-xs text-[#88867F]'>
            © {new Date().getFullYear()} Khobornama. Editorial Management.
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

      {/* Delete Confirmation Modal */}
      {selectedNews && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-[#202020]/50 p-4 backdrop-blur-[2px]'
          onClick={() => {
            if (!deletingId) setSelectedNews(null)
          }}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='delete-title'
            className='w-full max-w-md rounded-xl border border-[#E9E6E0] bg-[#F8F7F4] p-6 shadow-2xl'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex items-start justify-between'>
              <div className='flex h-12 w-12 items-center justify-center rounded-full bg-[#F8E9E7] text-[#B34A43]'>
                <FiAlertTriangle size={22} />
              </div>

              <button
                type='button'
                disabled={!!deletingId}
                onClick={() => setSelectedNews(null)}
                className='rounded-lg p-2 text-[#88867F] transition hover:bg-[#EAE7E0] hover:text-[#202020] disabled:opacity-40'
                aria-label='Close dialog'
              >
                <FiX size={19} />
              </button>
            </div>

            <h3
              id='delete-title'
              className='mt-5 text-xl font-bold text-[#202020]'
            >
              Delete this article?
            </h3>

            <p className='mt-3 text-sm leading-6 text-[#77766F]'>
              Are you sure you want to delete{' '}
              <span className='font-semibold text-[#202020]'>
                "{selectedNews.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className='mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
              <button
                type='button'
                disabled={!!deletingId}
                onClick={() => setSelectedNews(null)}
                className='rounded-lg border border-[#DDD9D1] bg-white px-5 py-3 text-sm font-semibold text-[#55554F] transition hover:bg-[#F1EFEA] disabled:opacity-50'
              >
                Cancel
              </button>

              <button
                type='button'
                disabled={!!deletingId}
                onClick={handleDelete}
                className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#A9433D] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#913A35] disabled:cursor-not-allowed disabled:opacity-60'
              >
                {deletingId ? (
                  <>
                    <FiLoader className='animate-spin' />
                    Deleting...
                  </>
                ) : (
                  <>
                    <FiTrash2 />
                    Delete Article
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MyNews
