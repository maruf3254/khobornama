import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  FiArrowLeft,
  FiSave,
  FiSend,
  FiEye,
  FiEdit3,
  FiImage,
  FiUploadCloud,
  FiBold,
  FiItalic,
  FiUnderline,
  FiLink,
  FiList,
  FiAlignLeft,
  FiAlignCenter,
  FiAlignRight,
  FiMinus,
  FiType,
  FiX,
  FiCheck,
  FiStar,
  FiFileText,
  FiTag,
  FiGlobe,
  FiArchive,
  FiClock,
  FiHash,
  FiRefreshCw,
  FiRotateCcw,
  FiRotateCw,
  FiStopCircle
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import DOMPurify from 'dompurify'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

import { adminAPI } from '../../services/api'
import Loading from '../../components/Loading'

const CATEGORIES = [
  { value: 'national', label: 'National', bn: 'জাতীয়' },
  { value: 'politics', label: 'Politics', bn: 'রাজনীতি' },
  { value: 'economy', label: 'Economy', bn: 'অর্থনীতি' },
  { value: 'international', label: 'International', bn: 'আন্তর্জাতিক' },
  { value: 'country', label: 'Countrywide', bn: 'সারাদেশ' },
  { value: 'sports', label: 'Sports', bn: 'খেলা' },
  { value: 'religion', label: 'Religion', bn: 'ধর্ম' },
  { value: 'health', label: 'Health', bn: 'স্বাস্থ্য' },
  { value: 'video', label: 'Video', bn: 'ভিডিও' },
  { value: 'column', label: 'Column', bn: 'কলাম' },
  { value: 'feature', label: 'Feature', bn: 'ফিচার' },
  { value: 'opinion', label: 'Opinion', bn: 'মতামত' },
  { value: 'literature', label: 'Literature', bn: 'সাহিত্য' },
  { value: 'law', label: 'Law & Court', bn: 'আইন ও আদালত' },
  { value: 'others', label: 'Others', bn: 'অন্যান্য' }
]

const STATUSES = [
  {
    value: 'draft',
    label: 'Draft',
    description: 'Save without publishing',
    icon: FiEdit3
  },
  {
    value: 'published',
    label: 'Published',
    description: 'Visible to readers',
    icon: FiGlobe
  },
  {
    value: 'archived',
    label: 'Archived',
    description: 'Remove from active publishing',
    icon: FiArchive
  }
]

const initialFormData = {
  title: '',
  content: '',
  summary: '',
  category: 'national',
  tags: [],
  image: '',
  status: 'published',
  isFeatured: false
}

const getPlainText = html => {
  if (!html) return ''

  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim()
}

const NewsForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)

  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [formData, setFormData] = useState(initialFormData)
  const [tagInput, setTagInput] = useState('')

  // Add Tag
  const addTag = (value = tagInput) => {
    const newTag = value.trim().replace(/^#+/, '').replace(/,+$/, '').trim()

    if (!newTag) return

    if (formData.tags.some(tag => tag.toLowerCase() === newTag.toLowerCase())) {
      toast.error('This tag already exists')
      return
    }

    if (formData.tags.length >= 10) {
      toast.error('Maximum 10 tags allowed')
      return
    }

    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, newTag]
    }))

    setTagInput('')
  }

  // Remove Tag
  const removeTag = tagToRemove => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }))
  }

  // Tag Keyboard Handler
  const handleTagKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }

    if (e.key === 'Backspace' && !tagInput && formData.tags.length > 0) {
      removeTag(formData.tags[formData.tags.length - 1])
    }
  }

  // TipTap Rich Text Editor
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
        HTMLAttributes: {
          target: '_blank',
          rel: 'noopener noreferrer'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      })
    ],
    content: '',
    editorProps: {
      attributes: {
        class:
          'tiptap min-h-[450px] px-4 sm:px-6 py-5 outline-none text-sm sm:text-base leading-8 text-[#202020]'
      }
    },
    onUpdate: ({ editor }) => {
      setFormData(prev => ({
        ...prev,
        content: editor.getHTML()
      }))
    }
  })

  // Fetch Existing Article
  useEffect(() => {
    if (!isEditing) return

    const fetchNews = async () => {
      try {
        const res = await adminAPI.getNewsById(id)
        const news = res.data.data

        setFormData({
          title: news.title || '',
          content: news.content || '',
          summary: news.summary || '',
          category: news.category || 'national',
          tags: Array.isArray(news.tags) ? news.tags : [],
          image: news.image || '',
          status: news.status || 'draft',
          isFeatured: Boolean(news.isFeatured)
        })
      } catch (error) {
        console.error('Failed to fetch article:', error)
        toast.error('Failed to load news article')
        navigate('/admin/news')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [id, isEditing, navigate])

  // Set Fetched Content Inside TipTap Editor
  useEffect(() => {
    if (!editor || loading || !isEditing) return

    const safeContent = DOMPurify.sanitize(formData.content || '')

    editor.commands.setContent(safeContent, {
      emitUpdate: false
    })
  }, [editor, loading, isEditing, id])

  // Form Change Handler
  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Word Count and Character Count
  const plainContent = getPlainText(formData.content)

  const wordCount = plainContent
    ? plainContent.split(/\s+/).filter(Boolean).length
    : 0

  const characterCount = plainContent.length
  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Insert or Update Hyperlink
  const addEditorLink = () => {
    if (!editor) return

    const previousUrl = editor.getAttributes('link').href || ''
    const url = window.prompt('Enter the URL:', previousUrl)

    if (url === null) return

    if (!url.trim()) {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    let validUrl

    try {
      validUrl = new URL(url.trim())

      if (!['http:', 'https:'].includes(validUrl.protocol)) {
        toast.error('Only HTTP and HTTPS links are allowed')
        return
      }
    } catch {
      toast.error('Please enter a valid URL')
      return
    }

    editor
      .chain()
      .focus()
      .extendMarkRange('link')
      .setLink({ href: validUrl.href })
      .run()
  }

  // Clear Editor
  const clearEditor = () => {
    if (!editor || !formData.content.trim()) return

    if (window.confirm('Are you sure you want to clear the article content?')) {
      editor.commands.clearContent()
    }
  }

  // Image Upload
  const handleImageUpload = async e => {
    const file = e.target.files?.[0]

    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image')
      e.target.value = ''
      return
    }

    try {
      setUploading(true)

      const formDataImage = new FormData()
      formDataImage.append('image', file)

      const res = await adminAPI.uploadImage(formDataImage)

      setFormData(prev => ({
        ...prev,
        image: res.data.data.path
      }))

      toast.success('Featured image uploaded successfully')
    } catch (error) {
      console.error('Image upload error:', error)
      toast.error(error.response?.data?.message || 'Failed to upload image')
    } finally {
      setUploading(false)
      e.target.value = ''
    }
  }

  // Save Article
  const saveArticle = async statusOverride => {
    if (submitting) return

    if (!formData.title.trim()) {
      toast.error('Please enter an article headline')
      return
    }

    const contentToSave = editor ? editor.getHTML() : formData.content

    if (!getPlainText(contentToSave)) {
      toast.error('Please write the article content')
      return
    }

    const safeContent = DOMPurify.sanitize(contentToSave)

    const payload = {
      ...formData,
      title: formData.title.trim(),
      summary: formData.summary.trim(),
      content: safeContent,
      tags: formData.tags,
      status: statusOverride || formData.status
    }

    try {
      setSubmitting(true)

      if (isEditing) {
        await adminAPI.updateNews(id, payload)

        toast.success(
          statusOverride === 'draft'
            ? 'Article saved as draft'
            : 'News updated successfully'
        )
      } else {
        await adminAPI.createNews(payload)

        toast.success(
          statusOverride === 'draft'
            ? 'Article saved as draft'
            : 'News created successfully'
        )
      }

      navigate('/admin/news')
    } catch (error) {
      console.error('Save article error:', error)

      toast.error(error.response?.data?.message || 'Failed to save news')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = e => {
    e.preventDefault()
    saveArticle()
  }

  if (loading) return <Loading />

  return (
    <div className='min-h-screen bg-[#E4E1DC]'>
      <style>{`
        .tiptap {
          min-height: 450px;
          outline: none;
          color: #202020;
          line-height: 1.9;
          font-size: 16px;
          overflow-wrap: break-word;
        }

        .tiptap:focus {
          outline: none;
        }

        .tiptap p {
          margin: 0 0 1.25rem;
        }

        .tiptap h1 {
          font-size: 2rem;
          line-height: 1.3;
          font-weight: 800;
          margin: 2rem 0 1rem;
        }

        .tiptap h2 {
          font-size: 1.65rem;
          line-height: 1.4;
          font-weight: 750;
          margin: 1.8rem 0 0.9rem;
        }

        .tiptap h3 {
          font-size: 1.3rem;
          line-height: 1.5;
          font-weight: 700;
          margin: 1.5rem 0 0.75rem;
        }

        .tiptap strong {
          font-weight: 800;
        }

        .tiptap em {
          font-style: italic;
        }

        .tiptap u {
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .tiptap s {
          text-decoration: line-through;
        }

        .tiptap a {
          color: #34483C;
          text-decoration: underline;
          cursor: pointer;
        }

        .tiptap ul,
        .tiptap ol {
          padding-left: 2rem;
          margin: 1rem 0 1.5rem;
        }

        .tiptap ul {
          list-style-type: disc;
        }

        .tiptap ol {
          list-style-type: decimal;
        }

        .tiptap li {
          padding-left: 0.25rem;
          margin: 0.4rem 0;
        }

        .tiptap blockquote {
          border-left: 4px solid #34483C;
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: #F1F0EC;
          color: #555;
          font-style: italic;
        }

        .tiptap hr {
          border: none;
          border-top: 1px solid #20202030;
          margin: 2rem 0;
        }

        .tiptap p.is-editor-empty:first-child::before {
          color: #b5b5b5;
          content: 'Write your article here...';
          float: left;
          height: 0;
          pointer-events: none;
        }

        @media (max-width: 640px) {
          .tiptap {
            min-height: 400px;
            font-size: 15px;
            line-height: 1.85;
          }

          .tiptap h1 {
            font-size: 1.7rem;
          }

          .tiptap h2 {
            font-size: 1.45rem;
          }

          .tiptap h3 {
            font-size: 1.2rem;
          }
        }

        .article-preview-content {
          overflow-wrap: break-word;
          line-height: 1.9;
        }

        .article-preview-content p {
          margin-bottom: 1.25rem;
        }

        .article-preview-content h1,
        .article-preview-content h2,
        .article-preview-content h3 {
          color: #202020;
          font-weight: 700;
          line-height: 1.4;
          margin: 1.5rem 0 1rem;
        }

        .article-preview-content h1 {
          font-size: 2rem;
        }

        .article-preview-content h2 {
          font-size: 1.65rem;
        }

        .article-preview-content h3 {
          font-size: 1.3rem;
        }

        .article-preview-content ul {
          list-style: disc;
          padding-left: 2rem;
          margin: 1rem 0;
        }

        .article-preview-content ol {
          list-style: decimal;
          padding-left: 2rem;
          margin: 1rem 0;
        }

        .article-preview-content blockquote {
          border-left: 4px solid #34483C;
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          background: #F1F0EC;
          font-style: italic;
        }

        .article-preview-content a {
          color: #34483C;
          text-decoration: underline;
        }

        .article-preview-content img {
          max-width: 100%;
          height: auto;
        }

        .article-preview-content hr {
          border: 0;
          border-top: 1px solid #ddd;
          margin: 2rem 0;
        }
      `}</style>

      {/* Page Header */}
      <div className='bg-[#202020] text-white'>
        <div className='max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
          <button
            type='button'
            onClick={() => navigate('/admin/news')}
            className='inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-5'
          >
            <FiArrowLeft />
            Back to News Management
          </button>

          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-5'>
            <div>
              <div className='flex items-center gap-2 text-[#B8C6BA] text-xs uppercase tracking-[0.2em] font-bold mb-3'>
                <FiFileText />
                Editorial Workspace
              </div>

              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold'>
                {isEditing ? 'Edit Article' : 'Create New Article'}
              </h1>

              <p className='text-sm text-white/50 mt-2'>
                Prepare, edit and publish your news story.
              </p>
            </div>

            <div className='flex items-center gap-2 text-xs text-white/60'>
              <span
                className={`w-2 h-2 rounded-full ${
                  formData.status === 'published'
                    ? 'bg-green-400'
                    : formData.status === 'draft'
                    ? 'bg-yellow-400'
                    : 'bg-gray-400'
                }`}
              />

              {formData.status.charAt(0).toUpperCase() +
                formData.status.slice(1)}
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className='max-w-screen-2xl mx-auto  sm:px-6 lg:px-8 py-7'>
          <div className='grid grid-cols-1 xl:grid-cols-3 gap-6'>
            {/* Main Editor */}
            <div className='xl:col-span-2 space-y-6'>
              {/* Headline and Summary */}
              <section className='bg-[#F8F7F4] border border-[#202020]/10'>
                <div className='px-2 sm:px-7 py-5 border-b border-[#202020]/10 flex items-center gap-3'>
                  <div className='w-9 h-9 flex items-center justify-center bg-[#34483C]/10 text-[#34483C]'>
                    <FiType size={18} />
                  </div>

                  <div>
                    <h2 className='font-bold text-[#202020]'>
                      Article Information
                    </h2>
                    <p className='text-xs text-gray-500 mt-0.5'>
                      Your headline and article introduction
                    </p>
                  </div>
                </div>

                <div className='p-2 sm:p-7 space-y-6'>
                  {/* Title */}
                  <div>
                    <div className='flex justify-between items-center mb-2'>
                      <label className='text-sm font-bold text-[#202020]'>
                        Headline <span className='text-red-600'>*</span>
                      </label>

                      <span className='text-xs text-gray-400'>
                        {formData.title.length} characters
                      </span>
                    </div>

                    <input
                      type='text'
                      name='title'
                      value={formData.title}
                      onChange={handleChange}
                      required
                      placeholder='Write a compelling news headline...'
                      className='w-full px-4 py-4 bg-white border border-[#202020]/15 text-lg sm:text-xl font-bold text-[#202020] placeholder:text-gray-300 placeholder:font-normal outline-none focus:border-[#34483C] transition-colors'
                    />

                    <p className='text-xs text-gray-400 mt-2'>
                      Write a clear, accurate and engaging headline.
                    </p>
                  </div>

                  {/* Summary */}
                  <div>
                    <div className='flex justify-between items-center mb-2'>
                      <label className='text-sm font-bold text-[#202020]'>
                        Article Summary
                      </label>

                      <span className='text-xs text-gray-400'>
                        {formData.summary.length} characters
                      </span>
                    </div>

                    <textarea
                      name='summary'
                      value={formData.summary}
                      onChange={handleChange}
                      rows={3}
                      placeholder='Write a short introduction that tells readers what this story is about...'
                      className='w-full px-4 py-3 bg-white border border-[#202020]/15 text-sm leading-7 text-[#202020] placeholder:text-gray-400 resize-y outline-none focus:border-[#34483C] transition-colors'
                    />

                    <p className='text-xs text-gray-400 mt-2'>
                      A concise summary for news cards and article previews.
                    </p>
                  </div>
                </div>
              </section>

              {/* Article Editor */}
              <section className='bg-[#F8F7F4] border border-[#202020]/10'>
                <div className='px-5 sm:px-7 py-5 border-b border-[#202020]/10 flex flex-wrap justify-between items-center gap-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 flex items-center justify-center bg-[#34483C]/10 text-[#34483C]'>
                      <FiEdit3 size={18} />
                    </div>

                    <div>
                      <h2 className='font-bold text-[#202020]'>
                        Article Content
                      </h2>
                      <p className='text-xs text-gray-500 mt-0.5'>
                        Write and format your news story
                      </p>
                    </div>
                  </div>

                  <div className='flex items-center gap-2'>
                    <button
                      type='button'
                      onClick={() => setPreviewMode(false)}
                      className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors ${
                        !previewMode
                          ? 'bg-[#34483C] text-white'
                          : 'bg-white text-gray-500'
                      }`}
                    >
                      <FiEdit3 />
                      Editor
                    </button>

                    <button
                      type='button'
                      onClick={() => setPreviewMode(true)}
                      className={`inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold transition-colors ${
                        previewMode
                          ? 'bg-[#34483C] text-white'
                          : 'bg-white text-gray-500'
                      }`}
                    >
                      <FiEye />
                      Preview
                    </button>
                  </div>
                </div>

                {!previewMode ? (
                  <>
                    {/* Formatting Toolbar */}
                    <div className='p-3 sm:px-5 border-b border-[#202020]/10 bg-[#F1F0EC]'>
                      <div className='flex flex-wrap items-center gap-1'>
                        <ToolbarButton
                          icon={FiBold}
                          label='Bold'
                          active={editor?.isActive('bold')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().toggleBold().run()
                          }
                        />

                        <ToolbarButton
                          icon={FiItalic}
                          label='Italic'
                          active={editor?.isActive('italic')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().toggleItalic().run()
                          }
                        />

                        <ToolbarButton
                          icon={FiUnderline}
                          label='Underline'
                          active={editor?.isActive('underline')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().toggleUnderline().run()
                          }
                        />

                        <ToolbarButton
                          icon={FiStopCircle}
                          label='Strike'
                          active={editor?.isActive('strike')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().toggleStrike().run()
                          }
                        />

                        <ToolbarDivider />

                        <ToolbarButton
                          label='H1'
                          active={editor?.isActive('heading', { level: 1 })}
                          disabled={!editor}
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 1 })
                              .run()
                          }
                        />

                        <ToolbarButton
                          label='H2'
                          active={editor?.isActive('heading', { level: 2 })}
                          disabled={!editor}
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 2 })
                              .run()
                          }
                        />

                        <ToolbarButton
                          label='H3'
                          active={editor?.isActive('heading', { level: 3 })}
                          disabled={!editor}
                          onClick={() =>
                            editor
                              ?.chain()
                              .focus()
                              .toggleHeading({ level: 3 })
                              .run()
                          }
                        />

                        <ToolbarButton
                          icon={FiType}
                          label='Paragraph'
                          active={editor?.isActive('paragraph')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().setParagraph().run()
                          }
                        />

                        <ToolbarDivider />

                        <ToolbarButton
                          icon={FiList}
                          label='Bullet'
                          labelTitle='Bullet List'
                          active={editor?.isActive('bulletList')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().toggleBulletList().run()
                          }
                        />

                        <ToolbarButton
                          label='1.'
                          labelTitle='Numbered List'
                          active={editor?.isActive('orderedList')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().toggleOrderedList().run()
                          }
                        />

                        <ToolbarButton
                          label='Quote'
                          labelTitle='Blockquote'
                          active={editor?.isActive('blockquote')}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().toggleBlockquote().run()
                          }
                        />

                        <ToolbarDivider />

                        <ToolbarButton
                          icon={FiAlignLeft}
                          labelTitle='Align Left'
                          active={editor?.isActive({ textAlign: 'left' })}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().setTextAlign('left').run()
                          }
                        />

                        <ToolbarButton
                          icon={FiAlignCenter}
                          labelTitle='Align Center'
                          active={editor?.isActive({ textAlign: 'center' })}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().setTextAlign('center').run()
                          }
                        />

                        <ToolbarButton
                          icon={FiAlignRight}
                          labelTitle='Align Right'
                          active={editor?.isActive({ textAlign: 'right' })}
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().setTextAlign('right').run()
                          }
                        />

                        <ToolbarDivider />

                        <ToolbarButton
                          icon={FiLink}
                          label='Link'
                          labelTitle='Insert Link'
                          active={editor?.isActive('link')}
                          disabled={!editor}
                          onClick={addEditorLink}
                        />

                        <ToolbarButton
                          label='Unlink'
                          labelTitle='Remove Link'
                          disabled={!editor || !editor.isActive('link')}
                          onClick={() =>
                            editor?.chain().focus().unsetLink().run()
                          }
                        />

                        <ToolbarButton
                          icon={FiMinus}
                          label='Divider'
                          labelTitle='Horizontal Divider'
                          disabled={!editor}
                          onClick={() =>
                            editor?.chain().focus().setHorizontalRule().run()
                          }
                        />

                        <ToolbarDivider />

                        <ToolbarButton
                          icon={FiRotateCcw}
                          labelTitle='Undo'
                          disabled={!editor || !editor.can().undo()}
                          onClick={() => editor?.chain().focus().undo().run()}
                        />

                        <ToolbarButton
                          icon={FiRotateCw}
                          labelTitle='Redo'
                          disabled={!editor || !editor.can().redo()}
                          onClick={() => editor?.chain().focus().redo().run()}
                        />

                        <div className='ml-auto'>
                          <ToolbarButton
                            icon={FiRefreshCw}
                            label='Clear'
                            labelTitle='Clear Article Content'
                            disabled={!editor}
                            onClick={clearEditor}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Rich Text Editor */}
                    <div className='p-1 sm:p-7'>
                      <div className='bg-white border border-[#202020]/10 focus-within:border-[#34483C] transition-colors'>
                        <EditorContent editor={editor} />
                      </div>

                      <div className='flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-gray-500'>
                        <span>
                          Rich text editor · HTML formatting supported
                        </span>

                        <span>
                          {characterCount} characters · {wordCount} words
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  /* Live Preview */
                  <div className='p-5 sm:p-8'>
                    <div className='max-w-3xl mx-auto'>
                      {formData.image && (
                        <img
                          src={formData.image}
                          alt={formData.title}
                          className='w-full max-h-[400px] object-cover mb-8'
                        />
                      )}

                      <div className='text-xs uppercase tracking-[0.2em] text-[#34483C] font-bold mb-4'>
                        {formData.category}
                      </div>

                      <h1 className='text-3xl sm:text-4xl font-bold leading-tight text-[#202020]'>
                        {formData.title || 'Your article headline'}
                      </h1>

                      {formData.summary && (
                        <p className='text-lg leading-8 text-gray-500 mt-5 border-l-2 border-[#34483C] pl-5'>
                          {formData.summary}
                        </p>
                      )}

                      <div className='border-t border-[#202020]/10 mt-7 pt-7'>
                        {formData.content ? (
                          <div
                            className='article-preview-content text-base sm:text-lg text-[#202020]'
                            dangerouslySetInnerHTML={{
                              __html: DOMPurify.sanitize(formData.content)
                            }}
                          />
                        ) : (
                          <p className='text-gray-400 text-sm'>
                            Your article content will appear here.
                          </p>
                        )}
                      </div>

                      {formData.tags.length > 0 && (
                        <div className='flex flex-wrap gap-2 mt-7 pt-5 border-t border-[#202020]/10'>
                          {formData.tags.map((tag, index) => (
                            <span
                              key={`${tag}-${index}`}
                              className='inline-flex items-center gap-1 px-3 py-1.5 bg-[#34483C]/10 text-[#34483C] text-xs font-medium'
                            >
                              <FiHash size={11} />
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </section>

              {/* Article Statistics */}
              <section className='bg-[#F8F7F4] border border-[#202020]/10 p-5 sm:p-7'>
                <div className='flex items-center gap-3 mb-5'>
                  <div className='w-9 h-9 flex items-center justify-center bg-[#34483C]/10 text-[#34483C]'>
                    <FiFileText />
                  </div>

                  <div>
                    <h2 className='font-bold text-[#202020]'>
                      Writing Statistics
                    </h2>
                    <p className='text-xs text-gray-500'>Content overview</p>
                  </div>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
                  <StatCard label='Words' value={wordCount} />
                  <StatCard label='Characters' value={characterCount} />
                  <StatCard label='Reading Time' value={`${readingTime} min`} />
                  <StatCard label='Tags' value={formData.tags.length} />
                </div>
              </section>
            </div>

            {/* Publishing Sidebar */}
            <aside className='space-y-6'>
              {/* Publishing Controls */}
              <section className='bg-[#F8F7F4] border border-[#202020]/10'>
                <div className='px-5 py-5 border-b border-[#202020]/10'>
                  <h2 className='font-bold text-[#202020]'>Publishing</h2>
                  <p className='text-xs text-gray-500 mt-1'>
                    Manage article publication settings
                  </p>
                </div>

                <div className='p-5 space-y-5'>
                  {/* Status */}
                  <div>
                    <label className='block text-sm font-bold text-[#202020] mb-3'>
                      Publication Status
                    </label>

                    <div className='space-y-2'>
                      {STATUSES.map(status => {
                        const Icon = status.icon
                        const active = formData.status === status.value

                        return (
                          <button
                            key={status.value}
                            type='button'
                            onClick={() =>
                              setFormData(prev => ({
                                ...prev,
                                status: status.value
                              }))
                            }
                            className={`w-full flex items-center gap-3 p-3 border text-left transition-colors ${
                              active
                                ? 'border-[#34483C] bg-[#34483C]/5'
                                : 'border-[#202020]/10 bg-white hover:border-[#34483C]/40'
                            }`}
                          >
                            <div
                              className={`w-9 h-9 flex items-center justify-center ${
                                active
                                  ? 'bg-[#34483C] text-white'
                                  : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              <Icon />
                            </div>

                            <div className='flex-1'>
                              <p className='text-sm font-bold text-[#202020]'>
                                {status.label}
                              </p>
                              <p className='text-[11px] text-gray-500 mt-0.5'>
                                {status.description}
                              </p>
                            </div>

                            {active && <FiCheck className='text-[#34483C]' />}
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  <div className='border-t border-[#202020]/10' />

                  {/* Category */}
                  <div>
                    <label className='block text-sm font-bold text-[#202020] mb-2'>
                      News Category *
                    </label>

                    <select
                      name='category'
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-white border border-[#202020]/15 text-sm text-[#202020] outline-none focus:border-[#34483C]'
                    >
                      {CATEGORIES.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label} — {category.bn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Featured */}
                  <div className='border border-[#202020]/10 p-4 bg-white'>
                    <label className='flex items-start gap-3 cursor-pointer'>
                      <input
                        type='checkbox'
                        name='isFeatured'
                        checked={formData.isFeatured}
                        onChange={handleChange}
                        className='w-5 h-5 mt-0.5 accent-[#34483C]'
                      />

                      <div className='flex-1'>
                        <div className='flex items-center gap-2 text-sm font-bold text-[#202020]'>
                          <FiStar className='text-[#34483C]' />
                          Featured Article
                        </div>

                        <p className='text-xs text-gray-500 mt-1 leading-5'>
                          Highlight this story in the featured news section.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>
              </section>

              {/* Featured Image */}
              <section className='bg-[#F8F7F4] border border-[#202020]/10'>
                <div className='px-5 py-5 border-b border-[#202020]/10'>
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 flex items-center justify-center bg-[#34483C]/10 text-[#34483C]'>
                      <FiImage />
                    </div>

                    <div>
                      <h2 className='font-bold text-[#202020]'>
                        Featured Image
                      </h2>
                      <p className='text-xs text-gray-500 mt-0.5'>
                        Article cover photograph
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-5'>
                  {formData.image ? (
                    <div className='relative group'>
                      <img
                        src={formData.image}
                        alt='Featured preview'
                        className='w-full aspect-video object-cover bg-gray-100'
                      />

                      <button
                        type='button'
                        onClick={() =>
                          setFormData(prev => ({
                            ...prev,
                            image: ''
                          }))
                        }
                        className='absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-[#202020]/80 text-white hover:bg-red-600 transition-colors'
                        aria-label='Remove featured image'
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <button
                      type='button'
                      onClick={() => fileInputRef.current?.click()}
                      className='w-full aspect-video flex flex-col items-center justify-center border-2 border-dashed border-[#202020]/15 bg-white hover:border-[#34483C] transition-colors'
                    >
                      <FiUploadCloud className='text-3xl text-[#34483C]' />

                      <span className='text-sm font-semibold text-[#202020] mt-3'>
                        Upload Cover Image
                      </span>

                      <span className='text-xs text-gray-400 mt-1'>
                        Select an image from your device
                      </span>
                    </button>
                  )}

                  <input
                    ref={fileInputRef}
                    type='file'
                    accept='image/*'
                    onChange={handleImageUpload}
                    className='hidden'
                  />

                  <button
                    type='button'
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                    className='w-full mt-3 flex items-center justify-center gap-2 py-3 bg-[#34483C] text-white text-sm font-semibold hover:bg-[#202020] disabled:opacity-50 transition-colors'
                  >
                    {uploading ? (
                      <>
                        <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FiUploadCloud />
                        {formData.image ? 'Change Image' : 'Upload Image'}
                      </>
                    )}
                  </button>

                  <div className='mt-4'>
                    <label className='block text-xs font-bold text-gray-600 mb-2'>
                      OR USE IMAGE URL
                    </label>

                    <input
                      type='text'
                      name='image'
                      value={formData.image}
                      onChange={handleChange}
                      placeholder='https://example.com/image.jpg'
                      className='w-full px-3 py-3 bg-white border border-[#202020]/15 text-xs outline-none focus:border-[#34483C]'
                    />
                  </div>

                  <p className='text-[11px] text-gray-400 mt-3 leading-5'>
                    Use a clear, high-quality image that represents the story.
                  </p>
                </div>
              </section>

              {/* Tags */}
              <section className='bg-[#F8F7F4] border border-[#202020]/10'>
                <div className='px-5 py-5 border-b border-[#202020]/10'>
                  <div className='flex items-center gap-3'>
                    <div className='w-9 h-9 flex items-center justify-center bg-[#34483C]/10 text-[#34483C]'>
                      <FiTag />
                    </div>

                    <div>
                      <h2 className='font-bold text-[#202020]'>Article Tags</h2>
                      <p className='text-xs text-gray-500 mt-0.5'>
                        Help readers discover this story
                      </p>
                    </div>
                  </div>
                </div>

                <div className='p-5'>
                  <div className='flex items-center justify-between mb-2'>
                    <label className='block text-xs font-bold text-gray-600'>
                      TAGS
                    </label>

                    <span className='text-xs text-gray-400'>
                      {formData.tags.length}/10
                    </span>
                  </div>

                  {/* Tag Chips */}
                  {formData.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {formData.tags.map((tag, index) => (
                        <span
                          key={`${tag}-${index}`}
                          className='inline-flex items-center gap-2 px-3 py-2 bg-[#34483C]/10 text-[#34483C] text-xs font-medium'
                        >
                          <FiHash size={11} />
                          {tag}

                          <button
                            type='button'
                            onClick={() => removeTag(tag)}
                            className='text-[#34483C]/60 hover:text-red-600 transition-colors'
                            aria-label={`Remove ${tag}`}
                          >
                            <FiX size={13} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tag Input */}
                  <input
                    type='text'
                    value={tagInput}
                    onChange={e => setTagInput(e.target.value)}
                    onKeyDown={handleTagKeyDown}
                    onBlur={() => {
                      if (tagInput.trim()) addTag()
                    }}
                    disabled={formData.tags.length >= 10}
                    placeholder={
                      formData.tags.length >= 10
                        ? 'Maximum 10 tags reached'
                        : 'Type a tag and press Enter...'
                    }
                    className='w-full px-3 py-3 bg-white border border-[#202020]/15 text-sm outline-none focus:border-[#34483C] disabled:bg-gray-100 disabled:cursor-not-allowed'
                  />

                  <p className='text-[11px] text-gray-400 mt-2 leading-5'>
                    Press Enter or comma to add a tag. You can add up to 10
                    tags.
                  </p>
                </div>
              </section>

              {/* Reading Info */}
              <section className='bg-[#202020] text-white p-5'>
                <div className='flex items-center gap-2 text-[#B8C6BA] text-xs uppercase tracking-[0.15em] font-bold'>
                  <FiClock />
                  Reading Information
                </div>

                <div className='grid grid-cols-2 gap-4 mt-5'>
                  <div>
                    <p className='text-2xl font-bold'>{wordCount}</p>
                    <p className='text-xs text-white/50 mt-1'>Total words</p>
                  </div>

                  <div>
                    <p className='text-2xl font-bold'>{readingTime} min</p>
                    <p className='text-xs text-white/50 mt-1'>Reading time</p>
                  </div>
                </div>
              </section>
            </aside>
          </div>

          {/* Bottom Publishing Actions */}
          <div className='mt-7 bg-[#F8F7F4] border border-[#202020]/10 p-4 sm:p-6'>
            <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-5'>
              <div>
                <h3 className='font-bold text-[#202020]'>
                  {isEditing
                    ? 'Ready to update your article?'
                    : 'Ready to publish your story?'}
                </h3>

                <p className='text-xs text-gray-500 mt-1'>
                  Review your article before saving your changes.
                </p>
              </div>

              <div className='flex flex-col sm:flex-row gap-3'>
                <button
                  type='button'
                  onClick={() => navigate('/admin/news')}
                  disabled={submitting}
                  className='inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#202020]/15 text-[#202020] text-sm font-semibold hover:bg-gray-100 disabled:opacity-50 transition-colors'
                >
                  <FiX />
                  Cancel
                </button>

                <button
                  type='button'
                  onClick={() => saveArticle('draft')}
                  disabled={submitting || uploading}
                  className='inline-flex items-center justify-center gap-2 px-5 py-3 bg-white border border-[#34483C] text-[#34483C] text-sm font-semibold hover:bg-[#34483C]/5 disabled:opacity-50 transition-colors'
                >
                  <FiSave />
                  Save as Draft
                </button>

                <button
                  type='submit'
                  disabled={submitting || uploading}
                  className='inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#34483C] text-white text-sm font-bold hover:bg-[#202020] disabled:opacity-50 transition-colors'
                >
                  {submitting ? (
                    <>
                      <span className='w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSend />
                      {isEditing ? 'Update Article' : 'Publish Article'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

// Reusable Toolbar Button
const ToolbarButton = ({
  icon: Icon,
  label,
  labelTitle,
  onClick,
  active = false,
  disabled = false
}) => (
  <button
    type='button'
    title={labelTitle || label}
    aria-label={labelTitle || label}
    aria-pressed={active}
    disabled={disabled}
    onMouseDown={e => e.preventDefault()}
    onClick={onClick}
    className={`
      min-w-9 h-9 px-2 flex items-center justify-center gap-1.5
      text-xs font-bold transition-colors
      ${
        active
          ? 'bg-[#34483C] text-white'
          : 'bg-transparent text-gray-600 hover:bg-[#34483C] hover:text-white'
      }
      disabled:opacity-30 disabled:cursor-not-allowed
    `}
  >
    {Icon && <Icon size={15} />}
    {label && label}
  </button>
)

// Toolbar Divider
const ToolbarDivider = () => <div className='w-px h-6 bg-[#202020]/15 mx-1' />

// Statistics Card
const StatCard = ({ label, value }) => (
  <div className='bg-white border border-[#202020]/10 p-4'>
    <p className='text-xl sm:text-2xl font-bold text-[#34483C]'>{value}</p>
    <p className='text-xs text-gray-500 mt-1'>{label}</p>
  </div>
)

export default NewsForm
