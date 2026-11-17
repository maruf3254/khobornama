import { useState } from 'react'
import { toast } from 'react-toastify'
import {
  FiUser,
  FiMail,
  FiLock,
  FiSave,
  FiCamera,
  FiShield,
  FiCheckCircle
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../services/api'
import { Navigate } from 'react-router-dom'

const Profile = () => {
  const { user, isAuthenticated, updateUser } = useAuth()

  const [activeTab, setActiveTab] = useState('profile')
  const [loading, setLoading] = useState(false)

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    avatar: user?.avatar || ''
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  const handleProfileUpdate = async e => {
    e.preventDefault()

    setLoading(true)

    try {
      const res = await authAPI.updateProfile(profileData)

      updateUser(res.data.data)

      toast.success('Profile updated successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async e => {
    e.preventDefault()

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      toast.error('New password must be different from current password')
      return
    }

    setLoading(true)

    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })

      toast.success('Password changed successfully')

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const roleLabel = {
    user: 'Reader',
    advertiser: 'Advertiser',
    admin: 'Administrator'
  }

  return (
    <div className='min-h-screen bg-[#E4E1DC] py-10 px-4'>
      <div className='max-w-5xl mx-auto'>
        {/* Page Heading */}
        <div className='mb-8'>
          <p className='text-sm font-semibold tracking-[0.2em] uppercase text-[#34483C] mb-2'>
            Account Settings
          </p>

          <h1 className='text-3xl sm:text-4xl font-bold text-[#202020]'>
            My Profile
          </h1>

          <p className='text-[#77746E] mt-2'>
            Manage your personal information and account security.
          </p>
        </div>

        {/* Profile Header Card */}
        <div className='bg-[#F8F7F4] rounded-2xl border border-[#D8D5CF] shadow-sm p-6 sm:p-8 mb-7'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-5'>
            {/* Avatar */}
            <div className='relative w-24 h-24 shrink-0'>
              <div className='w-24 h-24 rounded-full overflow-hidden bg-[#E4E1DC] border-4 border-white shadow-md flex items-center justify-center'>
                {profileData.avatar ? (
                  <img
                    src={profileData.avatar}
                    alt={profileData.name}
                    className='w-full h-full object-cover'
                    onError={e => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />
                ) : (
                  <FiUser size={40} className='text-[#34483C]' />
                )}
              </div>

              <div className='absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#34483C] border-2 border-[#F8F7F4] flex items-center justify-center'>
                <FiCamera className='text-white' size={14} />
              </div>
            </div>

            {/* User Information */}
            <div className='flex-1'>
              <h2 className='text-2xl font-bold text-[#202020]'>
                {user?.name}
              </h2>

              <p className='text-sm text-[#77746E] mt-1 flex items-center gap-2'>
                <FiMail size={14} />
                {user?.email}
              </p>

              <div className='flex flex-wrap items-center gap-2 mt-3'>
                <span className='inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#34483C]/10 text-[#34483C] text-xs font-semibold'>
                  <FiShield size={13} />
                  {roleLabel[user?.role] || user?.role}
                </span>

                <span className='inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-medium'>
                  <FiCheckCircle size={13} />
                  Active Account
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Layout */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-7'>
          {/* Sidebar */}
          <div className='md:col-span-1'>
            <div className='bg-[#F8F7F4] rounded-2xl border border-[#D8D5CF] p-3 shadow-sm'>
              <p className='px-3 pt-3 pb-4 text-xs font-bold uppercase tracking-wider text-[#99958D]'>
                Settings
              </p>

              <button
                type='button'
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === 'profile'
                    ? 'bg-[#34483C] text-white shadow-sm'
                    : 'text-[#66645F] hover:bg-[#E4E1DC]'
                }`}
              >
                <FiUser size={18} />
                Profile Settings
              </button>

              <button
                type='button'
                onClick={() => setActiveTab('password')}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all mt-2 ${
                  activeTab === 'password'
                    ? 'bg-[#34483C] text-white shadow-sm'
                    : 'text-[#66645F] hover:bg-[#E4E1DC]'
                }`}
              >
                <FiLock size={18} />
                Change Password
              </button>
            </div>

            {/* Account Info */}
            <div className='mt-5 bg-[#34483C] rounded-2xl p-5 text-white'>
              <FiShield size={24} className='mb-4 text-[#D8C7A0]' />

              <h3 className='font-semibold mb-2'>Account Security</h3>

              <p className='text-xs leading-relaxed text-white/70'>
                Keep your account secure by using a strong password and updating
                it regularly.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className='md:col-span-3'>
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <form
                onSubmit={handleProfileUpdate}
                className='bg-[#F8F7F4] p-6 sm:p-8 rounded-2xl border border-[#D8D5CF] shadow-sm'
              >
                <div className='mb-7 pb-5 border-b border-[#E4E1DC]'>
                  <h2 className='text-xl font-bold text-[#202020]'>
                    Personal Information
                  </h2>

                  <p className='text-sm text-[#77746E] mt-1'>
                    Update your profile details.
                  </p>
                </div>

                <div className='space-y-6'>
                  {/* Full Name */}
                  <div>
                    <label className='block text-sm font-semibold text-[#202020] mb-2'>
                      <FiUser className='inline mr-2 text-[#34483C]' />
                      Full Name
                    </label>

                    <input
                      type='text'
                      value={profileData.name}
                      onChange={e =>
                        setProfileData({
                          ...profileData,
                          name: e.target.value
                        })
                      }
                      placeholder='Enter your full name'
                      className='w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition'
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className='block text-sm font-semibold text-[#202020] mb-2'>
                      <FiMail className='inline mr-2 text-[#34483C]' />
                      Email Address
                    </label>

                    <input
                      type='email'
                      value={user?.email || ''}
                      className='w-full px-4 py-3 bg-[#EAE8E2] border border-[#D8D5CF] rounded-lg text-[#77746E] cursor-not-allowed'
                      disabled
                    />

                    <p className='text-xs text-[#99958D] mt-2'>
                      Email address cannot be changed.
                    </p>
                  </div>

                  {/* Avatar URL */}
                  <div>
                    <label className='block text-sm font-semibold text-[#202020] mb-2'>
                      <FiCamera className='inline mr-2 text-[#34483C]' />
                      Profile Image URL
                    </label>

                    <input
                      type='url'
                      value={profileData.avatar}
                      onChange={e =>
                        setProfileData({
                          ...profileData,
                          avatar: e.target.value
                        })
                      }
                      placeholder='https://example.com/avatar.jpg'
                      className='w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition'
                    />

                    <p className='text-xs text-[#99958D] mt-2'>
                      Provide a publicly accessible image URL.
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                <div className='mt-8 pt-6 border-t border-[#E4E1DC]'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full sm:w-auto px-8 py-3 bg-[#34483C] text-white rounded-lg font-semibold hover:bg-[#293B31] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  >
                    <FiSave size={17} />
                    {loading ? 'Saving Changes...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            )}

            {/* Password Tab */}
            {activeTab === 'password' && (
              <form
                onSubmit={handlePasswordChange}
                className='bg-[#F8F7F4] p-6 sm:p-8 rounded-2xl border border-[#D8D5CF] shadow-sm'
              >
                <div className='mb-7 pb-5 border-b border-[#E4E1DC]'>
                  <h2 className='text-xl font-bold text-[#202020]'>
                    Change Password
                  </h2>

                  <p className='text-sm text-[#77746E] mt-1'>
                    Update your password to keep your account secure.
                  </p>
                </div>

                <div className='space-y-6'>
                  {/* Current Password */}
                  <div>
                    <label className='block text-sm font-semibold text-[#202020] mb-2'>
                      Current Password
                    </label>

                    <input
                      type='password'
                      value={passwordData.currentPassword}
                      onChange={e =>
                        setPasswordData({
                          ...passwordData,
                          currentPassword: e.target.value
                        })
                      }
                      placeholder='Enter current password'
                      autoComplete='current-password'
                      className='w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition'
                      required
                    />
                  </div>

                  {/* New Password */}
                  <div>
                    <label className='block text-sm font-semibold text-[#202020] mb-2'>
                      New Password
                    </label>

                    <input
                      type='password'
                      value={passwordData.newPassword}
                      onChange={e =>
                        setPasswordData({
                          ...passwordData,
                          newPassword: e.target.value
                        })
                      }
                      placeholder='Minimum 6 characters'
                      autoComplete='new-password'
                      className='w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition'
                      required
                      minLength={6}
                    />
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className='block text-sm font-semibold text-[#202020] mb-2'>
                      Confirm New Password
                    </label>

                    <input
                      type='password'
                      value={passwordData.confirmPassword}
                      onChange={e =>
                        setPasswordData({
                          ...passwordData,
                          confirmPassword: e.target.value
                        })
                      }
                      placeholder='Re-enter new password'
                      autoComplete='new-password'
                      className='w-full px-4 py-3 bg-white border border-[#D8D5CF] rounded-lg text-[#202020] placeholder:text-[#A5A29B] focus:outline-none focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 transition'
                      required
                      minLength={6}
                    />
                  </div>
                </div>

                {/* Security Notice */}
                <div className='mt-6 p-4 rounded-xl bg-[#34483C]/[0.07] border border-[#34483C]/15'>
                  <div className='flex gap-3'>
                    <FiShield className='text-[#34483C] shrink-0 mt-0.5' />

                    <p className='text-xs text-[#555D55] leading-relaxed'>
                      Use a strong password containing a combination of letters,
                      numbers and special characters.
                    </p>
                  </div>
                </div>

                {/* Change Password Button */}
                <div className='mt-8 pt-6 border-t border-[#E4E1DC]'>
                  <button
                    type='submit'
                    disabled={loading}
                    className='w-full sm:w-auto px-8 py-3 bg-[#34483C] text-white rounded-lg font-semibold hover:bg-[#293B31] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                  >
                    <FiLock size={17} />
                    {loading ? 'Updating Password...' : 'Update Password'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className='text-center text-xs text-[#77746E] mt-10'>
          © {new Date().getFullYear()} খবরনামা. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Profile
