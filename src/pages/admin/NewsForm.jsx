// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { adminAPI } from '../../services/api';
// import Loading from '../../components/Loading';

// const NewsForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const isEditing = Boolean(id);

//   const [loading, setLoading] = useState(isEditing);
//   const [submitting, setSubmitting] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     content: '',
//     summary: '',
//     category: 'technology',
//     tags: '',
//     image: '',
//     status: 'published',
//     isFeatured: false
//   });

//   const categories = [
//     'politics', 'business', 'technology', 'sports',
//     'entertainment', 'health', 'science', 'world', 'local'
//   ];

//   useEffect(() => {
//     if (isEditing) {
//       const fetchNews = async () => {
//         try {
//           const res = await adminAPI.getNewsById(id);
//           const news = res.data.data;
//           setFormData({
//             title: news.title,
//             content: news.content,
//             summary: news.summary || '',
//             category: news.category,
//             tags: news.tags?.join(', ') || '',
//             image: news.image || '',
//             status: news.status,
//             isFeatured: news.isFeatured
//           });
//         } catch (error) {
//           toast.error('Failed to fetch news article');
//           navigate('/admin/news');
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchNews();
//     }
//   }, [id, isEditing, navigate]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData({
//       ...formData,
//       [name]: type === 'checkbox' ? checked : value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSubmitting(true);

//     try {
//       if (isEditing) {
//         await adminAPI.updateNews(id, formData);
//         toast.success('News updated successfully');
//       } else {
//         await adminAPI.createNews(formData);
//         toast.success('News created successfully');
//       }
//       navigate('/admin/news');
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Failed to save news');
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formDataImage = new FormData();
//     formDataImage.append('image', file);

//     try {
//       const res = await adminAPI.uploadImage(formDataImage);
//       setFormData({ ...formData, image: res.data.data.path });
//       toast.success('Image uploaded successfully');
//     } catch (error) {
//       toast.error('Failed to upload image');
//     }
//   };

//   if (loading) return <Loading />;

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-6">
//         {isEditing ? 'Edit News Article' : 'Create News Article'}
//       </h1>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md">
//         {/* Title */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Title <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//             required
//           />
//         </div>

//         {/* Summary */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Summary
//           </label>
//           <textarea
//             name="summary"
//             value={formData.summary}
//             onChange={handleChange}
//             rows={2}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//             placeholder="Brief summary of the article..."
//           />
//         </div>

//         {/* Content */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Content <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             name="content"
//             value={formData.content}
//             onChange={handleChange}
//             rows={10}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//             required
//             placeholder="Write your article content here... (HTML supported)"
//           />
//         </div>

//         {/* Category & Status */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Category <span className="text-red-500">*</span>
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//             >
//               {categories.map((cat) => (
//                 <option key={cat} value={cat} className="capitalize">
//                   {cat.charAt(0).toUpperCase() + cat.slice(1)}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block text-gray-700 font-medium mb-2">
//               Status
//             </label>
//             <select
//               name="status"
//               value={formData.status}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//             >
//               <option value="draft">Draft</option>
//               <option value="published">Published</option>
//               <option value="archived">Archived</option>
//             </select>
//           </div>
//         </div>

//         {/* Tags */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Tags
//           </label>
//           <input
//             type="text"
//             name="tags"
//             value={formData.tags}
//             onChange={handleChange}
//             className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//             placeholder="Enter tags separated by commas (e.g., tech, ai, innovation)"
//           />
//         </div>

//         {/* Image */}
//         <div className="mb-4">
//           <label className="block text-gray-700 font-medium mb-2">
//             Featured Image
//           </label>
//           <div className="flex gap-4 items-start">
//             <input
//               type="text"
//               name="image"
//               value={formData.image}
//               onChange={handleChange}
//               className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
//               placeholder="Image URL or upload"
//             />
//             <label className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-200">
//               Upload
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="hidden"
//               />
//             </label>
//           </div>
//           {formData.image && (
//             <img
//               src={formData.image}
//               alt="Preview"
//               className="mt-2 max-h-40 rounded-lg"
//             />
//           )}
//         </div>

//         {/* Featured */}
//         <div className="mb-6">
//           <label className="flex items-center gap-2 cursor-pointer">
//             <input
//               type="checkbox"
//               name="isFeatured"
//               checked={formData.isFeatured}
//               onChange={handleChange}
//               className="w-5 h-5 text-primary-600 rounded"
//             />
//             <span className="text-gray-700 font-medium">Mark as Featured</span>
//           </label>
//         </div>

//         {/* Actions */}
//         <div className="flex gap-4">
//           <button
//             type="submit"
//             disabled={submitting}
//             className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
//           >
//             {submitting ? 'Saving...' : isEditing ? 'Update Article' : 'Create Article'}
//           </button>
//           <button
//             type="button"
//             onClick={() => navigate('/admin/news')}
//             className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
//           >
//             Cancel
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default NewsForm;

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
  FiRefreshCw
} from 'react-icons/fi'
import { toast } from 'react-toastify'
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
  category: 'technology',
  tags: '',
  image: '',
  status: 'published',
  isFeatured: false
}

const NewsForm = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const editorRef = useRef(null)
  const fileInputRef = useRef(null)

  const isEditing = Boolean(id)

  const [loading, setLoading] = useState(isEditing)
  const [submitting, setSubmitting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewMode, setPreviewMode] = useState(false)
  const [formData, setFormData] = useState(initialFormData)

  // Fetch existing article
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
          category: news.category || 'technology',
          tags: news.tags?.join(', ') || '',
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

  // Form change handler
  const handleChange = e => {
    const { name, value, type, checked } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Word count
  const wordCount = formData.content
    .replace(/<[^>]*>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  const characterCount = formData.content.replace(/<[^>]*>/g, '').length

  const readingTime = Math.max(1, Math.ceil(wordCount / 200))

  // Insert formatting into editor
  const insertFormatting = (
    before,
    after = '',
    placeholder = 'Your text here'
  ) => {
    const editor = editorRef.current

    if (!editor) return

    const start = editor.selectionStart
    const end = editor.selectionEnd

    const selectedText = formData.content.substring(start, end)
    const text = selectedText || placeholder

    const insertion = `${before}${text}${after}`

    const updatedContent =
      formData.content.substring(0, start) +
      insertion +
      formData.content.substring(end)

    setFormData(prev => ({
      ...prev,
      content: updatedContent
    }))

    requestAnimationFrame(() => {
      editor.focus()

      const cursorPosition = start + insertion.length

      editor.setSelectionRange(cursorPosition, cursorPosition)
    })
  }

  // Insert HTML elements
  const insertHeading = level => {
    insertFormatting(`<h${level}>`, `</h${level}>\n`, 'Your heading')
  }

  const insertParagraph = () => {
    insertFormatting('<p>', '</p>\n', 'Write your paragraph here.')
  }

  const insertQuote = () => {
    insertFormatting(
      '<blockquote>',
      '</blockquote>\n',
      'Enter an important quotation here.'
    )
  }

  const insertList = (ordered = false) => {
    const editor = editorRef.current
    if (!editor) return

    const start = editor.selectionStart
    const end = editor.selectionEnd

    const selectedText = formData.content.substring(start, end)
    const lines = (selectedText || 'List item').split('\n')

    const tag = ordered ? 'ol' : 'ul'

    const listHTML = `<${tag}>\n${lines
      .map(line => `  <li>${line || 'List item'}</li>`)
      .join('\n')}\n</${tag}>\n`

    const updatedContent =
      formData.content.substring(0, start) +
      listHTML +
      formData.content.substring(end)

    setFormData(prev => ({
      ...prev,
      content: updatedContent
    }))

    requestAnimationFrame(() => {
      editor.focus()

      const cursorPosition = start + listHTML.length
      editor.setSelectionRange(cursorPosition, cursorPosition)
    })
  }

  const insertLink = () => {
    const url = window.prompt('Enter the URL:')

    if (!url) return

    const editor = editorRef.current
    if (!editor) return

    const start = editor.selectionStart
    const end = editor.selectionEnd

    const selectedText = formData.content.substring(start, end)
    const linkText = selectedText || 'Link text'

    insertFormatting(
      `<a href="${url}" target="_blank" rel="noopener noreferrer">`,
      '</a>',
      linkText
    )
  }

  const clearEditor = () => {
    if (!formData.content.trim()) return

    if (window.confirm('Are you sure you want to clear the article content?')) {
      setFormData(prev => ({
        ...prev,
        content: ''
      }))
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

    if (!formData.content.trim()) {
      toast.error('Please write the article content')
      return
    }

    const payload = {
      ...formData,
      title: formData.title.trim(),
      summary: formData.summary.trim(),
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
                          onClick={() =>
                            insertFormatting('<strong>', '</strong>')
                          }
                        />

                        <ToolbarButton
                          icon={FiItalic}
                          label='Italic'
                          onClick={() => insertFormatting('<em>', '</em>')}
                        />

                        <ToolbarButton
                          icon={FiUnderline}
                          label='Underline'
                          onClick={() => insertFormatting('<u>', '</u>')}
                        />

                        <ToolbarDivider />

                        <ToolbarButton
                          label='H2'
                          onClick={() => insertHeading(2)}
                        />

                        <ToolbarButton
                          label='H3'
                          onClick={() => insertHeading(3)}
                        />

                        <ToolbarButton
                          icon={FiAlignLeft}
                          label='Paragraph'
                          onClick={insertParagraph}
                        />

                        <ToolbarDivider />

                        <ToolbarButton
                          icon={FiList}
                          label='Bullet list'
                          onClick={() => insertList(false)}
                        />

                        <ToolbarButton
                          label='1.'
                          labelTitle='Numbered list'
                          onClick={() => insertList(true)}
                        />

                        <ToolbarButton label='Quote' onClick={insertQuote} />

                        <ToolbarDivider />

                        <ToolbarButton
                          icon={FiLink}
                          label='Link'
                          onClick={insertLink}
                        />

                        <ToolbarButton
                          icon={FiMinus}
                          label='Divider'
                          onClick={() => insertFormatting('<hr />\n', '', '')}
                        />

                        <div className='ml-auto'>
                          <ToolbarButton
                            icon={FiRefreshCw}
                            label='Clear'
                            onClick={clearEditor}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Textarea */}
                    <div className='p-1 sm:p-7'>
                      <textarea
                        ref={editorRef}
                        name='content'
                        value={formData.content}
                        onChange={handleChange}
                        required
                        rows={20}
                        placeholder={`Write your article here...

Start with a strong opening paragraph.

Use headings to organize your story.

You can use the formatting toolbar to insert HTML elements.`}
                        className='w-full min-h-[450px] px-4 sm:px-6 py-5 bg-white border border-[#202020]/10 text-sm sm:text-base leading-8 text-[#202020] placeholder:text-gray-300 font-mono resize-y outline-none focus:border-[#34483C] transition-colors'
                      />

                      <div className='flex flex-wrap items-center justify-between gap-3 mt-4 text-xs text-gray-500'>
                        <span>HTML formatting supported</span>
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
                            className='prose prose-lg max-w-none prose-headings:text-[#202020] prose-a:text-[#34483C] prose-blockquote:border-l-[#34483C] prose-p:leading-8'
                            dangerouslySetInnerHTML={{
                              __html: formData.content
                            }}
                          />
                        ) : (
                          <p className='text-gray-400 text-sm'>
                            Your article content will appear here.
                          </p>
                        )}
                      </div>
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

                  <StatCard
                    label='Tags'
                    value={
                      formData.tags
                        ? formData.tags.split(',').filter(tag => tag.trim())
                            .length
                        : 0
                    }
                  />
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
                  <label className='block text-xs font-bold text-gray-600 mb-2'>
                    TAGS
                  </label>

                  <textarea
                    name='tags'
                    value={formData.tags}
                    onChange={handleChange}
                    rows={3}
                    placeholder='technology, innovation, Bangladesh...'
                    className='w-full px-3 py-3 bg-white border border-[#202020]/15 text-sm outline-none focus:border-[#34483C] resize-y'
                  />

                  <p className='text-[11px] text-gray-400 mt-2'>
                    Separate multiple tags with commas.
                  </p>

                  {formData.tags.trim() && (
                    <div className='flex flex-wrap gap-2 mt-4'>
                      {formData.tags
                        .split(',')
                        .filter(tag => tag.trim())
                        .map((tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className='inline-flex items-center gap-1 px-2.5 py-1.5 bg-[#34483C]/10 text-[#34483C] text-xs font-medium'
                          >
                            <FiHash size={11} />
                            {tag.trim()}
                          </span>
                        ))}
                    </div>
                  )}
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
const ToolbarButton = ({ icon: Icon, label, labelTitle, onClick }) => (
  <button
    type='button'
    title={labelTitle || label}
    onClick={onClick}
    className='min-w-9 h-9 px-2 flex items-center justify-center gap-1.5 bg-transparent text-gray-600 hover:bg-[#34483C] hover:text-white transition-colors text-xs font-bold'
  >
    {Icon && <Icon size={15} />}
    {label && label}
  </button>
)

const ToolbarDivider = () => <div className='w-px h-6 bg-[#202020]/15 mx-1' />

// Reusable Statistics Card
const StatCard = ({ label, value }) => (
  <div className='bg-white border border-[#202020]/10 p-4'>
    <p className='text-xl sm:text-2xl font-bold text-[#34483C]'>{value}</p>
    <p className='text-xs text-gray-500 mt-1'>{label}</p>
  </div>
)

export default NewsForm
