import { useState, useEffect } from 'react'
import {
  FiSend,
  FiEdit2,
  FiTrash2,
  FiHeart,
  FiCornerDownRight,
  FiMessageCircle,
  FiX,
  FiCheck,
  FiUser
} from 'react-icons/fi'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { newsAPI, commentAPI } from '../services/api'
import { useAuth } from '../context/AuthContext'

const Comments = ({ newsId }) => {
  const { user, isAuthenticated } = useAuth()

  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState('')
  const [replyTo, setReplyTo] = useState(null)
  const [editingComment, setEditingComment] = useState(null)
  const [editContent, setEditContent] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch Comments
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true)

        const res = await newsAPI.getComments(newsId)
        setComments(res.data.data || [])
      } catch (error) {
        console.error('Error fetching comments:', error)
        toast.error('Failed to load comments')
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [newsId])

  // Format Date
  const formatDate = date => {
    if (!date) return ''

    const parsedDate = new Date(date)

    if (Number.isNaN(parsedDate.getTime())) return ''

    return format(parsedDate, 'MMM dd, yyyy')
  }

  // Submit Comment / Reply
  const handleSubmit = async e => {
    e.preventDefault()

    if (!isAuthenticated) {
      toast.info('Please login to comment')
      return
    }

    if (!newComment.trim()) return

    try {
      const res = await newsAPI.addComment(newsId, {
        content: newComment.trim(),
        parentCommentId: replyTo
      })

      const createdComment = res.data.data

      if (replyTo) {
        setComments(prev =>
          prev.map(comment =>
            comment._id === replyTo
              ? {
                  ...comment,
                  replies: [...(comment.replies || []), createdComment]
                }
              : comment
          )
        )
      } else {
        setComments(prev => [{ ...createdComment, replies: [] }, ...prev])
      }

      setNewComment('')
      setReplyTo(null)

      toast.success(
        replyTo ? 'Reply added successfully' : 'Comment added successfully'
      )
    } catch (error) {
      toast.error('Failed to add comment')
    }
  }

  // Update Comment
  const handleUpdate = async commentId => {
    if (!editContent.trim()) {
      toast.info('Comment cannot be empty')
      return
    }

    try {
      const content = editContent.trim()

      await commentAPI.update(commentId, { content })

      setComments(prev =>
        prev.map(comment => {
          if (comment._id === commentId) {
            return {
              ...comment,
              content,
              isEdited: true
            }
          }

          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map(reply =>
                reply._id === commentId
                  ? { ...reply, content, isEdited: true }
                  : reply
              )
            }
          }

          return comment
        })
      )

      setEditingComment(null)
      setEditContent('')

      toast.success('Comment updated successfully')
    } catch (error) {
      toast.error('Failed to update comment')
    }
  }

  // Delete Comment
  const handleDelete = async commentId => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return
    }

    try {
      await commentAPI.delete(commentId)

      setComments(prev =>
        prev
          .filter(comment => comment._id !== commentId)
          .map(comment => ({
            ...comment,
            replies: (comment.replies || []).filter(
              reply => reply._id !== commentId
            )
          }))
      )

      toast.success('Comment deleted successfully')
    } catch (error) {
      toast.error('Failed to delete comment')
    }
  }

  // Like Comment
  const handleLike = async commentId => {
    if (!isAuthenticated) {
      toast.info('Please login to like comments')
      return
    }

    try {
      const res = await commentAPI.toggleLike(commentId)

      setComments(prev =>
        prev.map(comment => {
          if (comment._id === commentId) {
            return {
              ...comment,
              likesCount: res.data.likesCount
            }
          }

          if (comment.replies) {
            return {
              ...comment,
              replies: comment.replies.map(reply =>
                reply._id === commentId
                  ? {
                      ...reply,
                      likesCount: res.data.likesCount
                    }
                  : reply
              )
            }
          }

          return comment
        })
      )
    } catch (error) {
      toast.error('Failed to like comment')
    }
  }

  // Start Editing
  const startEditing = comment => {
    setEditingComment(comment._id)
    setEditContent(comment.content)
    setReplyTo(null)
  }

  // Start Replying
  const startReplying = comment => {
    setReplyTo(comment._id)
    setNewComment('')
    setEditingComment(null)
  }

  // Cancel Reply
  const cancelReply = () => {
    setReplyTo(null)
    setNewComment('')
  }

  // User Avatar
  const Avatar = ({ user, size = 'w-10 h-10' }) => (
    <div
      className={`${size} shrink-0 rounded-full overflow-hidden bg-[#34483C]/10 flex items-center justify-center`}
    >
      {user?.avatar ? (
        <img
          src={user.avatar}
          alt={user?.name || 'User'}
          className='w-full h-full object-cover'
        />
      ) : (
        <FiUser className='text-[#34483C] text-lg' />
      )}
    </div>
  )

  // Individual Comment
  const CommentItem = ({ comment, isReply = false }) => {
    const isOwner = user?._id === comment.user?._id
    const isEditing = editingComment === comment._id
    const isReplying = replyTo === comment._id

    return (
      <div
        className={
          isReply
            ? 'relative mt-5 ml-5 sm:ml-12 pl-4 sm:pl-5 border-l-2 border-[#34483C]/15'
            : 'py-6 border-b border-[#202020]/10'
        }
      >
        <div className='flex items-start gap-3 sm:gap-4'>
          {/* Avatar */}
          <Avatar
            user={comment.user}
            size={isReply ? 'w-9 h-9' : 'w-11 h-11'}
          />

          <div className='flex-1 min-w-0'>
            {/* User Information */}
            <div className='flex flex-wrap items-center gap-x-2 gap-y-1'>
              <span className='text-sm font-bold text-[#202020]'>
                {comment.user?.name || 'Anonymous'}
              </span>

              {!isReply && (
                <span className='text-[10px] font-semibold uppercase tracking-wider text-[#34483C] bg-[#34483C]/10 px-2 py-1'>
                  Reader
                </span>
              )}

              <span className='text-xs text-gray-400'>
                {formatDate(comment.createdAt)}
              </span>

              {comment.isEdited && (
                <span className='text-[11px] text-gray-400 italic'>
                  (edited)
                </span>
              )}
            </div>

            {/* Comment Content */}
            {isEditing ? (
              <div className='mt-3'>
                <textarea
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  rows={3}
                  autoFocus
                  className='w-full bg-white border border-[#34483C]/30 px-4 py-3 text-sm text-[#202020] resize-y outline-none focus:border-[#34483C] transition-colors'
                  placeholder='Edit your comment...'
                />

                <div className='flex flex-wrap gap-2 mt-2'>
                  <button
                    onClick={() => handleUpdate(comment._id)}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-[#34483C] text-white text-xs font-semibold hover:bg-[#202020] transition-colors'
                  >
                    <FiCheck />
                    Save Changes
                  </button>

                  <button
                    onClick={() => {
                      setEditingComment(null)
                      setEditContent('')
                    }}
                    className='inline-flex items-center gap-2 px-4 py-2 bg-white text-gray-600 text-xs font-semibold hover:bg-gray-100 transition-colors'
                  >
                    <FiX />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <p className='mt-2 text-sm sm:text-[15px] leading-7 text-[#333333] whitespace-pre-wrap break-words'>
                {comment.content}
              </p>
            )}

            {/* Comment Actions */}
            {!isEditing && (
              <div className='flex flex-wrap items-center gap-x-5 gap-y-3 mt-3'>
                <button
                  onClick={() => handleLike(comment._id)}
                  className='inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors'
                  aria-label='Like comment'
                >
                  <FiHeart size={14} />
                  {comment.likesCount || 0}
                </button>

                {!isReply && (
                  <button
                    onClick={() =>
                      isReplying ? cancelReply() : startReplying(comment)
                    }
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold transition-colors ${
                      isReplying
                        ? 'text-[#34483C]'
                        : 'text-gray-500 hover:text-[#34483C]'
                    }`}
                  >
                    <FiCornerDownRight size={14} />
                    {isReplying ? 'Cancel Reply' : 'Reply'}
                  </button>
                )}

                {isOwner && (
                  <>
                    <button
                      onClick={() => startEditing(comment)}
                      className='inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-[#34483C] transition-colors'
                    >
                      <FiEdit2 size={13} />
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(comment._id)}
                      className='inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-red-600 transition-colors'
                    >
                      <FiTrash2 size={13} />
                      Delete
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Reply Form */}
        {isReplying && (
          <form onSubmit={handleSubmit} className='mt-5 ml-5 sm:ml-12'>
            <div className='bg-[#F8F7F4] border border-[#202020]/10 p-3 sm:p-4'>
              <p className='text-xs font-semibold text-[#34483C] mb-2'>
                Replying to {comment.user?.name || 'Anonymous'}
              </p>

              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder='Write your reply...'
                rows={3}
                autoFocus
                className='w-full bg-white border border-[#202020]/10 px-3 py-3 text-sm text-[#202020] resize-y outline-none focus:border-[#34483C] transition-colors'
              />

              <div className='flex flex-wrap gap-2 mt-3'>
                <button
                  type='submit'
                  disabled={!newComment.trim()}
                  className='inline-flex items-center gap-2 px-4 py-2.5 bg-[#34483C] text-white text-xs font-semibold hover:bg-[#202020] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                >
                  <FiSend />
                  Post Reply
                </button>

                <button
                  type='button'
                  onClick={cancelReply}
                  className='px-4 py-2.5 bg-white text-gray-600 text-xs font-semibold hover:bg-gray-100 transition-colors'
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Nested Replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div>
            {comment.replies.map(reply => (
              <CommentItem key={reply._id} comment={reply} isReply />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <section className='mt-12 sm:mt-16'>
      {/* Section Heading */}
      <div className='flex items-center justify-between gap-4 border-b border-[#202020]/15 pb-5'>
        <div>
          <div className='flex items-center gap-2 text-[#34483C] mb-2'>
            <FiMessageCircle size={15} />
            <span className='text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]'>
              Community Discussion
            </span>
          </div>

          <h2 className='text-2xl sm:text-3xl font-bold text-[#202020]'>
            পাঠকের মন্তব্য
            <span className='ml-2 text-base font-medium text-gray-400'>
              ({comments.length})
            </span>
          </h2>
        </div>

        <span className='hidden sm:block text-xs text-gray-400'>
          Share your thoughts
        </span>
      </div>

      {/* New Comment Form */}
      {!replyTo && (
        <div className='mt-7 mb-8'>
          <form onSubmit={handleSubmit}>
            <div className='bg-[#F8F7F4] border border-[#202020]/10 p-4 sm:p-5'>
              <div className='flex items-start gap-3'>
                <Avatar user={user} size='w-10 h-10' />

                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-bold text-[#202020] mb-1'>
                    {isAuthenticated
                      ? user?.name || 'Your comment'
                      : 'Join the discussion'}
                  </p>

                  <p className='text-xs text-gray-500'>
                    {isAuthenticated
                      ? 'Share your opinion respectfully.'
                      : 'Login to share your thoughts with us.'}
                  </p>
                </div>
              </div>

              <textarea
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder={
                  isAuthenticated
                    ? 'আপনার মতামত লিখুন...'
                    : 'Please login to write a comment...'
                }
                rows={4}
                disabled={!isAuthenticated}
                className='w-full mt-5 p-4 bg-white border border-[#202020]/10 text-sm text-[#202020] placeholder:text-gray-400 resize-y outline-none focus:border-[#34483C] disabled:opacity-60 disabled:cursor-not-allowed transition-colors'
              />

              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4'>
                <p className='text-[11px] text-gray-400'>
                  Please maintain a respectful conversation.
                </p>

                <button
                  type='submit'
                  disabled={!isAuthenticated || !newComment.trim()}
                  className='inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#34483C] text-white text-sm font-semibold hover:bg-[#202020] disabled:opacity-40 disabled:cursor-not-allowed transition-colors'
                >
                  <FiSend size={15} />
                  Post Comment
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div>
        {loading ? (
          <div className='py-12 text-center'>
            <div className='w-7 h-7 border-2 border-[#34483C]/20 border-t-[#34483C] rounded-full animate-spin mx-auto' />
            <p className='text-sm text-gray-500 mt-4'>Loading comments...</p>
          </div>
        ) : comments.length === 0 ? (
          <div className='py-12 text-center bg-[#F8F7F4]'>
            <FiMessageCircle size={30} className='mx-auto text-[#34483C]/50' />

            <h3 className='text-lg font-bold text-[#202020] mt-4'>
              এখনো কোনো মন্তব্য নেই
            </h3>

            <p className='text-sm text-gray-500 mt-2'>
              প্রথম মন্তব্যটি আপনিই করুন।
            </p>
          </div>
        ) : (
          <div>
            {comments.map(comment => (
              <CommentItem key={comment._id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Comments
