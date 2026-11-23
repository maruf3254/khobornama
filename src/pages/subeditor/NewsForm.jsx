import { useEffect, useMemo, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import './NewsForm.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  FiArrowLeft,
  FiLoader,
  FiSave,
  FiImage,
  FiX,
  FiPlus,
  FiEye,
  FiFileText,
  FiCheckCircle,
  FiAlertCircle,
  FiClock,
  FiHash,
  FiEdit3,
  FiBookOpen,
  FiCalendar,
  FiTag,
  FiAlignLeft,
  FiType,
  FiRefreshCw,
  FiExternalLink,
  FiAlertTriangle
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import { subEditorAPI } from '../../services/api'

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

const initialForm = {
  title: '',
  summary: '',
  content: '',
  category: 'national',
  image: '',
  tags: []
}

const BRAND = {
  primary: '#202020',
  background: '#E4E1DC',
  surface: '#F8F7F4',
  accent: '#34483C'
}

const inputClass =
  'w-full rounded-lg border border-[#E6E3DD] bg-white px-4 py-3 text-sm text-[#202020] outline-none transition placeholder:text-[#AAA79F] focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10'

const labelClass = 'mb-2 block text-sm font-semibold text-[#202020]'

const formatDate = date =>
  new Date(date).toLocaleDateString('bn-BD', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

const getPlainText = content => {
  return String(content || '')
    .replace(/<\/(p|div|h[1-6]|li|blockquote)>/gi, ' ')
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim()
}

const getWordCount = content => {
  const text = getPlainText(content)
  return text ? text.split(/\s+/).length : 0
}

const getReadingTime = text => {
  return Math.max(1, Math.ceil(getWordCount(text) / 200))
}

const SectionTitle = ({ icon: Icon, title, description }) => (
  <div className='mb-5 flex items-start gap-3'>
    <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F1EC] text-[#34483C]'>
      <Icon size={19} />
    </div>

    <div>
      <h2 className='font-bold text-[#202020]'>{title}</h2>
      {description && (
        <p className='mt-1 text-xs leading-5 text-[#88867F]'>{description}</p>
      )}
    </div>
  </div>
)

const NewsForm = () => {
  const editorRef = useRef(null)
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(initialForm)

  const [tagInput, setTagInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [fetching, setFetching] = useState(isEdit)

  const [imageError, setImageError] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)

  // Load saved HTML into the editor after an existing article is fetched.
  useEffect(() => {
    if (!fetching && editorRef.current) {
      editorRef.current.innerHTML = DOMPurify.sanitize(form.content || '')
    }
  }, [fetching])

  // Keep the React form state synchronized with the rich-text editor.
  const syncEditorContent = () => {
    if (!editorRef.current) return

    setForm(prev => ({
      ...prev,
      content: editorRef.current.innerHTML
    }))
  }

  // Apply a formatting command while preserving the current text selection.
  const handleEditorCommand = (command, value = null) => {
    if (!editorRef.current) return

    editorRef.current.focus()

    if (command === 'createLink') {
      const enteredUrl = window.prompt('Enter link URL:')
      if (!enteredUrl) return

      let safeUrl
      try {
        safeUrl = new URL(enteredUrl.trim())
      } catch {
        toast.error('Please enter a valid URL.')
        return
      }

      if (!['http:', 'https:'].includes(safeUrl.protocol)) {
        toast.error('Only HTTP and HTTPS links are allowed.')
        return
      }

      document.execCommand('createLink', false, safeUrl.href)
    } else if (command === 'formatBlock') {
      document.execCommand('formatBlock', false, value)
    } else {
      document.execCommand(command, false, value)
    }

    syncEditorContent()
  }

  // Fetch existing article for editing.
  useEffect(() => {
    if (!isEdit) return

    let active = true

    const fetchSingleNews = async () => {
      try {
        const { data } = await subEditorAPI.getNewsById(id)

        const item = data.data || data.news || data

        if (!active) return

        setForm({
          title: item.title || '',
          summary: item.summary || '',
          content: item.content || '',
          category: item.category || 'national',
          image: item.image || '',
          tags: Array.isArray(item.tags) ? item.tags : []
        })
      } catch (error) {
        if (!active) return

        toast.error(error.response?.data?.message || 'Unable to load article')

        navigate('/sub-editor/news')
      } finally {
        if (active) setFetching(false)
      }
    }

    fetchSingleNews()

    return () => {
      active = false
    }
  }, [id, isEdit, navigate])

  // Handle form inputs.
  const handleChange = e => {
    const { name, value } = e.target

    setForm(prev => ({
      ...prev,
      [name]: value
    }))

    if (name === 'image') {
      setImageError(false)
    }
  }

  // Add article tags.
  const addTag = (value = tagInput) => {
    const tag = value.trim().replace(/^#+/, '').replace(/,+$/, '').trim()

    if (!tag) return

    if (form.tags.some(item => item.toLowerCase() === tag.toLowerCase())) {
      toast.error('This tag already exists.')
      return
    }

    if (form.tags.length >= 10) {
      toast.error('You can add a maximum of 10 tags.')
      return
    }

    setForm(prev => ({
      ...prev,
      tags: [...prev.tags, tag]
    }))

    setTagInput('')
  }

  const removeTag = tag => {
    setForm(prev => ({
      ...prev,
      tags: prev.tags.filter(item => item !== tag)
    }))
  }

  const handleTagKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }

    if (e.key === 'Backspace' && !tagInput && form.tags.length) {
      removeTag(form.tags[form.tags.length - 1])
    }
  }

  // Derived editorial statistics.
  const wordCount = useMemo(() => getWordCount(form.content), [form.content])

  const summaryWords = useMemo(() => getWordCount(form.summary), [form.summary])

  const paragraphCount = useMemo(() => {
    if (!form.content.trim()) return 0

    const blocks = form.content.match(/<(p|h[1-6]|blockquote|li)\b/gi)
    return blocks?.length || (getPlainText(form.content) ? 1 : 0)
  }, [form.content])

  const readingTime = useMemo(
    () => getReadingTime(form.content),
    [form.content]
  )

  // Editorial completion checklist.
  const checklist = [
    {
      label: 'News headline',
      done: Boolean(form.title.trim())
    },
    {
      label: 'News summary',
      done: Boolean(form.summary.trim())
    },
    {
      label: 'Article content',
      done: Boolean(form.content.trim())
    },
    {
      label: 'News category',
      done: Boolean(form.category)
    },
    {
      label: 'Featured image',
      done: Boolean(form.image.trim()) && !imageError
    },
    {
      label: 'Article tags',
      done: form.tags.length > 0
    }
  ]

  const completedItems = checklist.filter(item => item.done).length

  const completion = Math.round((completedItems / checklist.length) * 100)

  // Validate image URL.
  const isValidImageUrl = value => {
    if (!value.trim()) return true

    try {
      const url = new URL(value.trim())

      return ['http:', 'https:'].includes(url.protocol)
    } catch {
      return false
    }
  }

  // Submit article.
  const handleSubmit = async e => {
    e.preventDefault()

    if (loading) return

    if (!form.title.trim()) {
      toast.error('Please enter a news headline.')
      return
    }

    if (form.title.trim().length < 10) {
      toast.error('Headline should contain at least 10 characters.')
      return
    }

    if (!form.summary.trim()) {
      toast.error('Please write a news summary.')
      return
    }

    if (!getPlainText(form.content)) {
      toast.error('Please write the complete news article.')
      return
    }

    if (getWordCount(form.content) < 30) {
      toast.error(
        'Please write a more complete news article (at least 30 words).'
      )
      return
    }

    if (!isValidImageUrl(form.image)) {
      toast.error('Please enter a valid image URL.')
      return
    }

    if (form.image.trim() && imageError) {
      toast.error(
        'The featured image could not be loaded. Please check its URL.'
      )
      return
    }

    try {
      setLoading(true)

      const payload = {
        title: form.title.trim(),
        summary: form.summary.trim(),
        content: DOMPurify.sanitize(form.content.trim()),
        category: form.category,
        image: form.image.trim(),
        tags: form.tags
      }

      if (isEdit) {
        await subEditorAPI.updateNews(id, payload)
        toast.success('Article updated successfully.')
      } else {
        await subEditorAPI.createNews(payload)
        toast.success('Article created successfully.')
      }

      navigate('/sub-editor/news')
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Something went wrong. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  // Loading screen.
  if (fetching) {
    return (
      <div className='flex min-h-[65vh] flex-col items-center justify-center bg-[#E4E1DC]'>
        <FiLoader className='animate-spin text-3xl text-[#34483C]' />
        <p className='mt-4 text-sm text-[#77766F]'>
          Loading article information...
        </p>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#E4E1DC] p-4 sm:p-6 lg:p-8'>
      <div className='mx-auto max-w-screen-2xl space-y-7'>
        {/* Header */}
        <header className='flex flex-col justify-between gap-5 border-b border-[#CFCBC3] pb-6 sm:flex-row sm:items-center'>
          <div>
            <Link
              to='/sub-editor/news'
              className='mb-4 inline-flex items-center gap-2 text-sm font-semibold text-[#34483C] hover:underline'
            >
              <FiArrowLeft />
              Back to My Articles
            </Link>

            <div className='flex items-center gap-3'>
              <img
                src='https://i.imgur.com/Xkp2QhW.png'
                alt='Khobornama'
                className='h-12 w-12 object-contain'
              />

              <div>
                <p className='text-xs font-semibold uppercase tracking-[0.2em] text-[#77766F]'>
                  KHOBORNAMA NEWSROOM
                </p>

                <h1 className='mt-1 text-2xl font-bold text-[#202020] sm:text-3xl'>
                  {isEdit ? 'Edit Article' : 'Create New Article'}
                </h1>
              </div>
            </div>

            <p className='mt-3 max-w-2xl text-sm leading-6 text-[#77766F]'>
              Create accurate, informative and engaging journalism. Complete the
              article details before submitting it for editorial review.
            </p>
          </div>

          <div className='flex flex-wrap gap-2'>
            <button
              type='button'
              onClick={() => setPreviewMode(true)}
              className='inline-flex items-center justify-center gap-2 rounded-lg border border-[#D8D4CC] bg-[#F8F7F4] px-4 py-3 text-sm font-semibold text-[#34483C] transition hover:border-[#34483C]'
            >
              <FiEye />
              Preview Article
            </button>

            <button
              type='button'
              onClick={() =>
                window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                })
              }
              className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#34483C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#26392E]'
            >
              <FiSave />
              Go to Save
            </button>
          </div>
        </header>

        {/* Editor Statistics */}
        <section className='grid grid-cols-2 gap-3 lg:grid-cols-4'>
          {[
            {
              label: 'Article Words',
              value: wordCount,
              icon: FiFileText
            },
            {
              label: 'Paragraphs',
              value: paragraphCount,
              icon: FiAlignLeft
            },
            {
              label: 'Reading Time',
              value: `${readingTime} min`,
              icon: FiClock
            },
            {
              label: 'Tags Added',
              value: form.tags.length,
              icon: FiHash
            }
          ].map(item => (
            <div
              key={item.label}
              className='flex items-center gap-3 rounded-xl border border-[#E9E6E0] bg-white p-4'
            >
              <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F0F1EC] text-[#34483C]'>
                <item.icon size={19} />
              </div>

              <div>
                <p className='text-xs text-[#88867F]'>{item.label}</p>
                <p className='mt-1 text-lg font-bold text-[#202020]'>
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        <form onSubmit={handleSubmit}>
          <div className='grid grid-cols-1 items-start gap-6 xl:grid-cols-12'>
            {/* Main Editor */}
            <main className='space-y-6 xl:col-span-8'>
              {/* Headline and Summary */}
              <section className='rounded-xl border border-[#E9E6E0] bg-white p-5 sm:p-7'>
                <SectionTitle
                  icon={FiType}
                  title='Article Headline & Summary'
                  description='Create a clear, informative headline and a concise introduction.'
                />

                {/* Headline */}
                <div className='mb-6'>
                  <div className='mb-2 flex items-center justify-between gap-2'>
                    <label className={labelClass}>
                      News Headline <span className='text-red-500'>*</span>
                    </label>

                    <span
                      className={`text-xs ${
                        form.title.length > 220
                          ? 'text-amber-600'
                          : 'text-[#96938B]'
                      }`}
                    >
                      {form.title.length}/250
                    </span>
                  </div>

                  <input
                    type='text'
                    name='title'
                    value={form.title}
                    onChange={handleChange}
                    placeholder='Write a clear and engaging news headline...'
                    maxLength={250}
                    required
                    className={`${inputClass} py-4 text-base font-semibold sm:text-lg`}
                  />

                  <p className='mt-2 text-xs leading-5 text-[#96938B]'>
                    Tip: Include the most important news information. Avoid
                    exaggerated or misleading headlines.
                  </p>
                </div>

                {/* Summary */}
                <div>
                  <div className='mb-2 flex items-center justify-between gap-2'>
                    <label className={labelClass}>
                      News Summary <span className='text-red-500'>*</span>
                    </label>

                    <span className='text-xs text-[#96938B]'>
                      {summaryWords} words
                    </span>
                  </div>

                  <textarea
                    name='summary'
                    value={form.summary}
                    onChange={handleChange}
                    placeholder='Write a concise introduction explaining what happened, where, when and why it matters...'
                    rows={4}
                    required
                    className={`${inputClass} resize-y leading-7`}
                  />

                  <p className='mt-2 text-xs leading-5 text-[#96938B]'>
                    A good summary helps readers understand the main news before
                    reading the full article.
                  </p>
                </div>
              </section>

              {/* Main Article Content */}
              <section className='overflow-hidden rounded-xl border border-[#E9E6E0] bg-white p-4 sm:p-6 lg:p-7'>
                <div className='flex flex-wrap items-start justify-between gap-3'>
                  <SectionTitle
                    icon={FiEdit3}
                    title='Full News Article'
                    description='Write and format the complete news story.'
                  />

                  <span className='rounded-md bg-[#F0F1EC] px-3 py-1.5 text-xs font-semibold text-[#34483C]'>
                    Rich Text Editor
                  </span>
                </div>

                <div className='mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-[#EEECE7] pb-3'>
                  <div className='flex flex-wrap items-center gap-3 text-xs text-[#88867F]'>
                    <span className='flex items-center gap-1.5'>
                      <FiFileText />
                      {wordCount} words
                    </span>
                    <span className='flex items-center gap-1.5'>
                      <FiClock />
                      {readingTime} min read
                    </span>
                  </div>

                  <button
                    type='button'
                    onClick={() => {
                      if (editorRef.current) editorRef.current.innerHTML = ''
                      setForm(prev => ({ ...prev, content: '' }))
                    }}
                    disabled={!form.content}
                    className='text-xs font-medium text-[#A14B43] hover:underline disabled:opacity-40'
                  >
                    Clear content
                  </button>
                </div>

                {/* Responsive Formatting Toolbar */}
                <div className='rounded-t-xl border border-[#E1E4DC] bg-[#F8F9F6] p-2'>
                  <div className='flex flex-wrap items-center gap-1'>
                    <div className='flex flex-wrap items-center gap-1'>
                      <button
                        type='button'
                        title='Bold'
                        aria-label='Bold'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('bold')}
                        className='news-editor-tool font-black'
                      >
                        B
                      </button>
                      <button
                        type='button'
                        title='Italic'
                        aria-label='Italic'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('italic')}
                        className='news-editor-tool italic'
                      >
                        I
                      </button>
                      <button
                        type='button'
                        title='Underline'
                        aria-label='Underline'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('underline')}
                        className='news-editor-tool underline'
                      >
                        U
                      </button>
                    </div>

                    <span className='mx-1 hidden h-7 w-px bg-[#DCDDD6] sm:block' />

                    <div className='flex flex-wrap items-center gap-1'>
                      <button
                        type='button'
                        title='Heading 2'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('formatBlock', 'h2')}
                        className='news-editor-tool'
                      >
                        H2
                      </button>
                      <button
                        type='button'
                        title='Heading 3'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('formatBlock', 'h3')}
                        className='news-editor-tool'
                      >
                        H3
                      </button>
                      <button
                        type='button'
                        title='Paragraph'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('formatBlock', 'p')}
                        className='news-editor-tool'
                      >
                        P
                      </button>
                    </div>

                    <span className='mx-1 hidden h-7 w-px bg-[#DCDDD6] sm:block' />

                    <div className='flex flex-wrap items-center gap-1'>
                      <button
                        type='button'
                        title='Bullet List'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() =>
                          handleEditorCommand('insertUnorderedList')
                        }
                        className='news-editor-tool'
                      >
                        • List
                      </button>
                      <button
                        type='button'
                        title='Numbered List'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('insertOrderedList')}
                        className='news-editor-tool'
                      >
                        1. List
                      </button>
                    </div>

                    <span className='mx-1 hidden h-7 w-px bg-[#DCDDD6] sm:block' />

                    <div className='flex flex-wrap items-center gap-1'>
                      <button
                        type='button'
                        title='Blockquote'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() =>
                          handleEditorCommand('formatBlock', 'blockquote')
                        }
                        className='news-editor-tool'
                      >
                        ❝ Quote
                      </button>
                      <button
                        type='button'
                        title='Insert Link'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() => handleEditorCommand('createLink')}
                        className='news-editor-tool'
                      >
                        Link
                      </button>
                      <button
                        type='button'
                        title='Horizontal Divider'
                        onMouseDown={e => e.preventDefault()}
                        onClick={() =>
                          handleEditorCommand('insertHorizontalRule')
                        }
                        className='news-editor-tool'
                      >
                        ― Divider
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  ref={editorRef}
                  contentEditable
                  suppressContentEditableWarning
                  role='textbox'
                  aria-label='News article content editor'
                  aria-multiline='true'
                  data-placeholder={
                    'Write your complete news article here...\n\nStart with the most important information.\n\nExplain what happened, who was involved, when and where it happened, and why it matters.\n\nUse headings, paragraphs, lists and quotations to organize your story.'
                  }
                  onInput={syncEditorContent}
                  onBlur={syncEditorContent}
                  onPaste={e => {
                    e.preventDefault()
                    const html = e.clipboardData.getData('text/html')
                    const plain = e.clipboardData.getData('text/plain')
                    const safeContent = html
                      ? DOMPurify.sanitize(html)
                      : plain
                          .replace(
                            /[&<>"']/g,
                            char =>
                              ({
                                '&': '&amp;',
                                '<': '&lt;',
                                '>': '&gt;',
                                '"': '&quot;',
                                "'": '&#39;'
                              }[char])
                          )
                          .replace(/\n/g, '<br>')
                    document.execCommand('insertHTML', false, safeContent)
                    syncEditorContent()
                  }}
                  className='news-rich-editor min-h-[400px] w-full rounded-b-xl border border-t-0 border-[#E1E4DC] bg-white px-4 py-5 text-sm leading-8 text-[#33332F] outline-none transition focus:ring-2 focus:ring-inset focus:ring-[#34483C]/10 sm:min-h-[500px] sm:px-6 sm:py-6 sm:text-base'
                />

                <p className='mt-3 text-xs leading-6 text-[#96938B]'>
                  Select text and use the toolbar to format your article. You
                  can also paste formatted text.
                </p>

                <div className='mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2'>
                  <div className='rounded-lg bg-[#F8F7F4] p-4'>
                    <h4 className='flex items-center gap-2 text-xs font-bold text-[#34483C]'>
                      <FiCheckCircle /> Good Journalism
                    </h4>
                    <p className='mt-2 text-xs leading-6 text-[#77766F]'>
                      Verify facts, maintain neutrality, use reliable
                      information and distinguish facts from opinions.
                    </p>
                  </div>
                  <div className='rounded-lg bg-[#F8F7F4] p-4'>
                    <h4 className='flex items-center gap-2 text-xs font-bold text-[#34483C]'>
                      <FiBookOpen /> Better Readability
                    </h4>
                    <p className='mt-2 text-xs leading-6 text-[#77766F]'>
                      Use short paragraphs, clear language and a logical flow of
                      information.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tags */}
              <section className='rounded-xl border border-[#E9E6E0] bg-white p-5 sm:p-7'>
                <SectionTitle
                  icon={FiTag}
                  title='Article Tags'
                  description='Add relevant keywords to help organize your news.'
                />

                <div className='flex flex-col gap-2 sm:flex-row'>
                  <input
                    type='text'
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    placeholder='Enter keyword, e.g. Bangladesh, Election...'
                    maxLength={40}
                    className={`${inputClass} min-w-0 flex-1`}
                  />

                  <button
                    type='button'
                    onClick={() => addTag()}
                    disabled={!tagInput.trim()}
                    className='inline-flex items-center justify-center gap-2 rounded-lg bg-[#34483C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26392E] disabled:opacity-50'
                  >
                    <FiPlus />
                    Add Tag
                  </button>
                </div>

                <div className='mt-4 flex min-h-12 flex-wrap gap-2'>
                  {form.tags.length > 0 ? (
                    form.tags.map(tag => (
                      <span
                        key={tag}
                        className='inline-flex items-center gap-2 rounded-md border border-[#E3E5DE] bg-[#F0F1EC] px-3 py-2 text-xs font-semibold text-[#34483C]'
                      >
                        #{tag}
                        <button
                          type='button'
                          onClick={() => removeTag(tag)}
                          className='text-[#77766F] transition hover:text-red-600'
                          aria-label={`Remove ${tag}`}
                        >
                          <FiX size={14} />
                        </button>
                      </span>
                    ))
                  ) : (
                    <p className='py-2 text-xs text-[#AAA79F]'>
                      No tags added yet.
                    </p>
                  )}
                </div>

                <p className='mt-3 text-xs text-[#96938B]'>
                  Press Enter or comma to add a tag. Maximum 10 tags.
                </p>
              </section>
            </main>

            {/* Editorial Sidebar */}
            <aside className='space-y-6 xl:col-span-4'>
              {/* Category */}
              <section className='rounded-xl border border-[#E9E6E0] bg-white p-5 sm:p-6'>
                <SectionTitle
                  icon={FiFileText}
                  title='Article Category'
                  description='Select the most relevant news category.'
                />

                <label className={labelClass}>
                  Select Category <span className='text-red-500'>*</span>
                </label>

                <select
                  name='category'
                  value={form.category}
                  onChange={handleChange}
                  className={`${inputClass} capitalize`}
                >
                  {CATEGORIES.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>

                <div className='mt-4 rounded-lg bg-[#F8F7F4] p-3'>
                  <p className='text-xs text-[#88867F]'>Selected Category</p>

                  <p className='mt-1 font-bold text-[#34483C]'>
                    {CATEGORIES.find(item => item.value === form.category)
                      ?.label || 'জাতীয়'}
                  </p>
                </div>
              </section>

              {/* Featured Image */}
              <section className='rounded-xl border border-[#E9E6E0] bg-white p-5 sm:p-6'>
                <SectionTitle
                  icon={FiImage}
                  title='Featured Image'
                  description='Add the main image that represents your news story.'
                />

                <label className={labelClass}>Image URL</label>

                <input
                  type='url'
                  name='image'
                  value={form.image}
                  onChange={handleChange}
                  placeholder='https://example.com/news-image.jpg'
                  className={inputClass}
                />

                <p className='mt-2 text-xs leading-5 text-[#96938B]'>
                  Use a publicly accessible HTTPS image URL. Recommended
                  editorial ratio: 16:9.
                </p>

                {form.image.trim() && !imageError ? (
                  <div className='mt-4 overflow-hidden rounded-lg border border-[#E9E6E0]'>
                    <img
                      src={form.image}
                      alt='Featured news preview'
                      onError={() => setImageError(true)}
                      onLoad={() => setImageError(false)}
                      className='aspect-video w-full bg-[#F0F1EC] object-cover'
                    />

                    <div className='flex items-center justify-between bg-[#F8F7F4] px-3 py-2'>
                      <span className='text-xs font-medium text-[#34483C]'>
                        <FiCheckCircle className='mr-1 inline' />
                        Image preview
                      </span>

                      <button
                        type='button'
                        onClick={() => {
                          setForm(prev => ({
                            ...prev,
                            image: ''
                          }))
                          setImageError(false)
                        }}
                        className='text-xs font-semibold text-[#A14B43] hover:underline'
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : form.image.trim() && imageError ? (
                  <div className='mt-4 rounded-lg border border-red-200 bg-red-50 p-4'>
                    <p className='flex items-center gap-2 text-sm font-semibold text-red-700'>
                      <FiAlertCircle />
                      Image could not be loaded
                    </p>
                    <p className='mt-1 text-xs leading-5 text-red-600'>
                      Check the image URL or use another image.
                    </p>
                  </div>
                ) : (
                  <div className='mt-4 flex aspect-video flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#E3E0D9] bg-[#FAF9F6] text-center'>
                    <FiImage size={30} className='text-[#B2AEA5]' />
                    <p className='mt-3 text-sm font-semibold text-[#77766F]'>
                      No featured image
                    </p>
                    <p className='mt-1 text-xs text-[#AAA79F]'>
                      Add an image URL to preview it here.
                    </p>
                  </div>
                )}
              </section>

              {/* Editorial Checklist */}
              <section className='rounded-xl border border-[#E9E6E0] bg-white p-5 sm:p-6'>
                <SectionTitle
                  icon={FiCheckCircle}
                  title='Editorial Checklist'
                  description='Review the essential elements of your article.'
                />

                <div className='mb-4'>
                  <div className='mb-2 flex items-center justify-between'>
                    <span className='text-xs font-semibold text-[#77766F]'>
                      Article completeness
                    </span>

                    <span className='text-sm font-bold text-[#34483C]'>
                      {completion}%
                    </span>
                  </div>

                  <div className='h-2 overflow-hidden rounded-full bg-[#EAE8E1]'>
                    <div
                      className='h-full rounded-full bg-[#34483C] transition-all duration-300'
                      style={{ width: `${completion}%` }}
                    />
                  </div>
                </div>

                <div className='space-y-3'>
                  {checklist.map(item => (
                    <div key={item.label} className='flex items-center gap-3'>
                      {item.done ? (
                        <FiCheckCircle
                          className='shrink-0 text-[#34483C]'
                          size={17}
                        />
                      ) : (
                        <FiAlertCircle
                          className='shrink-0 text-[#AAA79F]'
                          size={17}
                        />
                      )}

                      <span
                        className={`text-xs ${
                          item.done
                            ? 'font-medium text-[#34483C]'
                            : 'text-[#96938B]'
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Submission Information */}
              <section className='rounded-xl border border-[#DDE4DA] bg-[#EDF1EA] p-5'>
                <h3 className='flex items-center gap-2 font-bold text-[#34483C]'>
                  <FiBookOpen />
                  Editorial Submission
                </h3>

                <p className='mt-3 text-xs leading-6 text-[#626E62]'>
                  Your article will be submitted using the existing article
                  creation system. The publication status is managed by your
                  backend.
                </p>

                <div className='mt-4 flex items-center gap-2 rounded-lg bg-white p-3'>
                  <FiClock className='text-[#94702C]' />

                  <span className='text-xs font-semibold text-[#55554F]'>
                    {isEdit ? 'Update existing article' : 'Save new article'}
                  </span>
                </div>
              </section>

              {/* Save Actions */}
              <section className='sticky top-5 space-y-3 rounded-xl border border-[#E9E6E0] bg-white p-5 shadow-sm'>
                <h3 className='font-bold text-[#202020]'>
                  {isEdit ? 'Update Article' : 'Submit Article'}
                </h3>

                <p className='text-xs leading-5 text-[#88867F]'>
                  Review your headline, summary, content and image before
                  submitting.
                </p>

                <button
                  type='submit'
                  disabled={loading}
                  className='flex w-full items-center justify-center gap-2 rounded-lg bg-[#34483C] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#26392E] disabled:cursor-not-allowed disabled:opacity-60'
                >
                  {loading ? (
                    <>
                      <FiLoader className='animate-spin' />
                      Saving Article...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      {isEdit ? 'Update Article' : 'Save as Draft'}
                    </>
                  )}
                </button>

                <button
                  type='button'
                  onClick={() => setPreviewMode(true)}
                  className='flex w-full items-center justify-center gap-2 rounded-lg border border-[#E6E3DD] bg-[#F8F7F4] px-5 py-3 text-sm font-semibold text-[#34483C] transition hover:border-[#34483C]'
                >
                  <FiEye />
                  Preview Article
                </button>

                <Link
                  to='/sub-editor/news'
                  className='block w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-[#88867F] transition hover:bg-[#F8F7F4] hover:text-[#202020]'
                >
                  Cancel
                </Link>
              </section>
            </aside>
          </div>
        </form>

        {/* Footer */}
        <footer className='flex flex-col items-center justify-between gap-2 border-t border-[#CFCBC3] pt-5 sm:flex-row'>
          <p className='text-xs text-[#88867F]'>
            © {new Date().getFullYear()} Khobornama. Editorial Workspace.
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

      {/* Article Preview Modal */}
      {previewMode && (
        <div
          className='fixed inset-0 z-[100] flex items-center justify-center bg-[#202020]/60 p-3 backdrop-blur-sm sm:p-6'
          onClick={() => setPreviewMode(false)}
        >
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='article-preview-title'
            className='flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-[#F8F7F4] shadow-2xl'
            onClick={e => e.stopPropagation()}
          >
            <div className='flex items-center justify-between border-b border-[#E6E3DD] px-5 py-4'>
              <div>
                <p className='text-xs font-semibold uppercase tracking-widest text-[#34483C]'>
                  KHOBORNAMA
                </p>
                <h2
                  id='article-preview-title'
                  className='mt-1 font-bold text-[#202020]'
                >
                  Article Preview
                </h2>
              </div>

              <button
                type='button'
                onClick={() => setPreviewMode(false)}
                className='rounded-lg p-2 text-[#77766F] hover:bg-[#EAE7E0]'
                aria-label='Close preview'
              >
                <FiX size={21} />
              </button>
            </div>

            <div className='overflow-y-auto p-5 sm:p-8'>
              <article className='mx-auto max-w-3xl'>
                <div className='mb-5 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#34483C]'>
                  <span className='rounded bg-[#E9EEE7] px-3 py-1.5'>
                    {
                      CATEGORIES.find(item => item.value === form.category)
                        ?.label
                    }
                  </span>

                  <span className='text-[#AAA79F]'>
                    {formatDate(new Date())}
                  </span>

                  <span className='text-[#AAA79F]'>
                    {readingTime} মিনিট পড়ুন
                  </span>
                </div>

                <h1 className='text-2xl font-bold leading-relaxed text-[#202020] sm:text-4xl'>
                  {form.title || 'আপনার সংবাদ শিরোনাম এখানে দেখাবে'}
                </h1>

                <p className='mt-5 border-l-4 border-[#34483C] pl-4 text-base leading-8 text-[#66645D]'>
                  {form.summary || 'সংবাদের সংক্ষিপ্ত বিবরণ এখানে দেখাবে।'}
                </p>

                {form.image && !imageError && (
                  <img
                    src={form.image}
                    alt={form.title}
                    className='mt-7 aspect-video w-full rounded-lg object-cover'
                  />
                )}

                <div
                  className='news-rich-editor mt-8 text-sm leading-8 text-[#33332F] sm:text-base'
                  dangerouslySetInnerHTML={{
                    __html: form.content
                      ? DOMPurify.sanitize(form.content)
                      : 'আপনার সম্পূর্ণ সংবাদ এখানে দেখাবে।'
                  }}
                />

                {form.tags.length > 0 && (
                  <div className='mt-8 flex flex-wrap gap-2 border-t border-[#E6E3DD] pt-5'>
                    {form.tags.map(tag => (
                      <span
                        key={tag}
                        className='rounded-md bg-[#EAECE5] px-3 py-2 text-xs font-semibold text-[#34483C]'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </div>

            <div className='flex justify-end border-t border-[#E6E3DD] p-4'>
              <button
                type='button'
                onClick={() => setPreviewMode(false)}
                className='rounded-lg bg-[#34483C] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#26392E]'
              >
                Back to Editor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default NewsForm
