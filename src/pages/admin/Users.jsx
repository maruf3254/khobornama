import { useCallback, useEffect, useState } from 'react'
import {
  FiUsers,
  FiUser,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
  FiRefreshCw,
  FiShield,
  FiEdit2,
  FiMail,
  FiX,
  FiCheck,
  FiAlertCircle,
  FiLoader
} from 'react-icons/fi'
import { toast } from 'react-toastify'
import { adminAPI } from '../../services/api'

const ROLE_OPTIONS = [
  { label: 'Regular User', value: 'user' },
  { label: 'Sub Editor', value: 'sub-editor' },
  { label: 'Advertiser', value: 'advertiser' }
]

const FILTER_OPTIONS = [
  { label: 'All Users', value: 'all' },
  { label: 'Regular Users', value: 'user' },
  { label: 'Sub Editors', value: 'sub-editor' },
  { label: 'Advertisers', value: 'advertiser' },
  { label: 'Admins', value: 'admin' }
]

const getRoleStyle = role => {
  switch (role) {
    case 'admin':
      return 'bg-purple-100 text-purple-700'
    case 'sub-editor':
      return 'bg-blue-100 text-blue-700'
    case 'advertiser':
      return 'bg-amber-100 text-amber-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const getRoleLabel = role => {
  switch (role) {
    case 'admin':
      return 'Admin'
    case 'sub-editor':
      return 'Sub Editor'
    case 'advertiser':
      return 'Advertiser'
    default:
      return 'User'
  }
}

const Users = () => {
  const [users, setUsers] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    regularUsers: 0,
    subEditors: 0,
    advertisers: 0
  })

//   console.log(stats)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [error, setError] = useState('')

  const [editingUser, setEditingUser] = useState(null)
  const [selectedRole, setSelectedRole] = useState('')

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true)
      setError('')

      const params = {
        page,
        limit,
        search: search.trim()
      }

      if (roleFilter !== 'all') {
        params.role = roleFilter
      }

      const response = await adminAPI.getUsers(params)
      const result = response.data

      setUsers(result.data || [])
      setTotalPages(result.totalPages || 1)

      setStats({
        total: result.total ?? result.count ?? 0,
        regularUsers: result.regularUsers ?? 0,
        subEditors: result.subEditors ?? 0,
        advertisers: result.advertisers ?? 0
      })
    } catch (err) {
      console.error('Fetch users error:', err)

      setError(
        err.response?.data?.message || 'Unable to load users. Please try again.'
      )

      setUsers([])
      toast.error('Failed to load users')
    } finally {
      setLoading(false)
    }
  }, [page, limit, search, roleFilter])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const handleSearch = value => {
    setSearch(value)
    setPage(1)
  }

  const handleFilterChange = value => {
    setRoleFilter(value)
    setPage(1)
  }

  const openRoleModal = user => {
    if (user.role === 'admin') {
      toast.error('Admin role cannot be changed.')
      return
    }

    setEditingUser(user)
    setSelectedRole(user.role)
  }

  const closeRoleModal = () => {
    if (updatingId) return

    setEditingUser(null)
    setSelectedRole('')
  }

  const handleRoleUpdate = async () => {
    if (!editingUser || !selectedRole) return

    if (editingUser.role === selectedRole) {
      closeRoleModal()
      return
    }

    try {
      setUpdatingId(editingUser._id)

      await adminAPI.updateUserRole(editingUser._id, selectedRole)

      toast.success('User role updated successfully!')

      setEditingUser(null)
      setSelectedRole('')

      await fetchUsers()
    } catch (err) {
      console.error('Update role error:', err)

      toast.error(err.response?.data?.message || 'Failed to update user role.')
    } finally {
      setUpdatingId(null)
    }
  }

  const getUserName = user => {
    return user.name || user.fullName || 'Unknown User'
  }

  const getInitial = user => {
    return getUserName(user).charAt(0).toUpperCase()
  }

  const statCards = [
    {
      title: 'Total Users',
      value: stats.total,
      icon: FiUsers,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-700'
    },
    {
      title: 'Regular Users',
      value: stats.regularUsers,
      icon: FiUser,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-700'
    },
    {
      title: 'Sub Editors',
      value: stats.subEditors,
      icon: FiEdit2,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-700'
    },
    {
      title: 'Advertisers',
      value: stats.advertisers,
      icon: FiShield,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-700'
    }
  ]

  return (
    <div className='min-h-screen space-y-6 bg-[#F8F7F4] p-4 sm:p-6 lg:p-8'>
      {/* Page Header */}
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <p className='mb-1 text-sm font-medium text-[#34483C]'>
            Administration
          </p>

          <h1 className='text-2xl font-bold tracking-tight text-[#202020] sm:text-3xl'>
            User Management
          </h1>

          <p className='mt-2 text-sm text-gray-500'>
            Manage users, sub editors and advertisers.
          </p>
        </div>

        <button
          onClick={fetchUsers}
          disabled={loading}
          className='inline-flex items-center justify-center gap-2 rounded-xl bg-[#34483C] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26382E] disabled:opacity-60'
        >
          <FiRefreshCw className={loading ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      {/* Statistics */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
        {statCards.map(stat => {
          const Icon = stat.icon

          return (
            <div
              key={stat.title}
              className='rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-500'>
                    {stat.title}
                  </p>

                  <h3 className='mt-3 text-3xl font-bold text-[#202020]'>
                    {stat.value.toLocaleString()}
                  </h3>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.iconBg}`}
                >
                  <Icon className={`text-xl ${stat.iconColor}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Users Section */}
      <div className='overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm'>
        {/* Search and Filter */}
        <div className='flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between'>
          <div>
            <h2 className='text-lg font-bold text-[#202020]'>All Users</h2>

            <p className='mt-1 text-sm text-gray-500'>
              View and manage registered accounts.
            </p>
          </div>

          <div className='flex flex-col gap-3 sm:flex-row'>
            {/* Search */}
            <div className='relative'>
              <FiSearch className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

              <input
                type='text'
                value={search}
                onChange={e => handleSearch(e.target.value)}
                placeholder='Search name or email...'
                className='w-full rounded-xl border border-gray-200 bg-[#F8F7F4] py-3 pl-11 pr-4 text-sm outline-none transition focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10 sm:w-64'
              />
            </div>

            {/* Role Filter */}
            <div className='relative'>
              <FiFilter className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400' />

              <select
                value={roleFilter}
                onChange={e => handleFilterChange(e.target.value)}
                className='w-full appearance-none rounded-xl border border-gray-200 bg-[#F8F7F4] py-3 pl-11 pr-9 text-sm outline-none transition focus:border-[#34483C] sm:w-48'
              >
                {FILTER_OPTIONS.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className='m-5 flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between'>
            <div className='flex items-center gap-2 text-sm text-red-700'>
              <FiAlertCircle className='shrink-0 text-lg' />
              {error}
            </div>

            <button
              onClick={fetchUsers}
              className='text-sm font-semibold text-red-700 hover:underline'
            >
              Try Again
            </button>
          </div>
        )}

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full min-w-[750px] text-left'>
            <thead className='bg-[#F8F7F4]'>
              <tr>
                <th className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500'>
                  User
                </th>

                <th className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500'>
                  Email Address
                </th>

                <th className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500'>
                  Role
                </th>

                <th className='px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500'>
                  Joined
                </th>

                <th className='px-6 py-4 text-right text-xs font-bold uppercase tracking-wider text-gray-500'>
                  Action
                </th>
              </tr>
            </thead>

            <tbody className='divide-y divide-gray-100'>
              {loading ? (
                <tr>
                  <td colSpan='5' className='px-6 py-16 text-center'>
                    <div className='flex flex-col items-center justify-center gap-3'>
                      <FiLoader className='animate-spin text-3xl text-[#34483C]' />

                      <p className='text-sm text-gray-500'>Loading users...</p>
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan='5' className='px-6 py-16 text-center'>
                    <div className='flex flex-col items-center'>
                      <div className='mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100'>
                        <FiUsers className='text-2xl text-gray-400' />
                      </div>

                      <h3 className='font-semibold text-gray-700'>
                        No users found
                      </h3>

                      <p className='mt-1 text-sm text-gray-400'>
                        Try changing your search or filter.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map(user => (
                  <tr key={user._id} className='transition hover:bg-[#FAFAF8]'>
                    {/* User */}
                    <td className='whitespace-nowrap px-6 py-4'>
                      <div className='flex items-center gap-3'>
                        <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#34483C] text-sm font-bold text-white'>
                          {getInitial(user)}
                        </div>

                        <div>
                          <p className='font-semibold text-[#202020]'>
                            {getUserName(user)}
                          </p>

                          <p className='mt-1 text-xs text-gray-400'>
                            ID: {user._id?.slice(-8)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}
                    <td className='whitespace-nowrap px-6 py-4'>
                      <div className='flex items-center gap-2 text-sm text-gray-600'>
                        <FiMail className='text-gray-400' />
                        {user.email}
                      </div>
                    </td>

                    {/* Role */}
                    <td className='whitespace-nowrap px-6 py-4'>
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${getRoleStyle(
                          user.role
                        )}`}
                      >
                        {getRoleLabel(user.role)}
                      </span>
                    </td>

                    {/* Date */}
                    <td className='whitespace-nowrap px-6 py-4 text-sm text-gray-500'>
                      {user.createdAt
                        ? new Date(user.createdAt).toLocaleDateString('en-GB', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric'
                          })
                        : 'N/A'}
                    </td>

                    {/* Action */}
                    <td className='whitespace-nowrap px-6 py-4 text-right'>
                      {user.role === 'admin' ? (
                        <span className='text-xs font-medium text-gray-400'>
                          Protected
                        </span>
                      ) : (
                        <button
                          onClick={() => openRoleModal(user)}
                          className='inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-[#34483C] transition hover:border-[#34483C] hover:bg-[#34483C] hover:text-white'
                        >
                          <FiEdit2 />
                          Change Role
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && users.length > 0 && (
          <div className='flex flex-col gap-4 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between'>
            <p className='text-sm text-gray-500'>
              Page <span className='font-semibold text-[#202020]'>{page}</span>{' '}
              of{' '}
              <span className='font-semibold text-[#202020]'>{totalPages}</span>
            </p>

            <div className='flex items-center gap-2'>
              <button
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page <= 1}
                className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <FiChevronLeft />
              </button>

              <span className='px-3 text-sm font-medium text-gray-600'>
                {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={page >= totalPages}
                className='flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40'
              >
                <FiChevronRight />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Role Update Modal */}
      {editingUser && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'
          onClick={closeRoleModal}
        >
          <div
            className='w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl'
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className='mb-6 flex items-center justify-between'>
              <div>
                <h3 className='text-xl font-bold text-[#202020]'>
                  Change User Role
                </h3>

                <p className='mt-1 text-sm text-gray-500'>
                  Update account permissions.
                </p>
              </div>

              <button
                onClick={closeRoleModal}
                disabled={!!updatingId}
                className='flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200'
              >
                <FiX />
              </button>
            </div>

            {/* Selected User */}
            <div className='mb-6 flex items-center gap-3 rounded-xl bg-[#F8F7F4] p-4'>
              <div className='flex h-11 w-11 items-center justify-center rounded-full bg-[#34483C] font-bold text-white'>
                {getInitial(editingUser)}
              </div>

              <div className='min-w-0'>
                <p className='truncate font-semibold text-[#202020]'>
                  {getUserName(editingUser)}
                </p>

                <p className='truncate text-xs text-gray-500'>
                  {editingUser.email}
                </p>
              </div>
            </div>

            {/* Current Role */}
            <div className='mb-4'>
              <label className='mb-2 block text-sm font-semibold text-gray-700'>
                Current Role
              </label>

              <div className='rounded-xl border border-gray-200 bg-gray-50 px-4 py-3'>
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getRoleStyle(
                    editingUser.role
                  )}`}
                >
                  {getRoleLabel(editingUser.role)}
                </span>
              </div>
            </div>

            {/* New Role */}
            <div className='mb-6'>
              <label className='mb-2 block text-sm font-semibold text-gray-700'>
                Select New Role
              </label>

              <select
                value={selectedRole}
                onChange={e => setSelectedRole(e.target.value)}
                className='w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#34483C] focus:ring-2 focus:ring-[#34483C]/10'
              >
                {ROLE_OPTIONS.map(role => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>

              <p className='mt-2 text-xs leading-relaxed text-gray-400'>
                Changing the role will update this account's permissions.
              </p>
            </div>

            {/* Modal Actions */}
            <div className='flex gap-3'>
              <button
                onClick={closeRoleModal}
                disabled={!!updatingId}
                className='flex-1 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50'
              >
                Cancel
              </button>

              <button
                onClick={handleRoleUpdate}
                disabled={
                  !!updatingId ||
                  selectedRole === editingUser.role ||
                  !selectedRole
                }
                className='flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#34483C] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#26382E] disabled:cursor-not-allowed disabled:opacity-50'
              >
                {updatingId ? (
                  <>
                    <FiLoader className='animate-spin' />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiCheck />
                    Update Role
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

export default Users
