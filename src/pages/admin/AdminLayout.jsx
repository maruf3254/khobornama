import { useState } from 'react'
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import {
  FiHome,
  FiFileText,
  FiPlusCircle,
  FiArrowLeft,
  FiMenu,
  FiX,
  FiExternalLink,
  FiGrid,
  FiChevronRight,
  FiUser,
  FiUsers
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const LOGO = 'https://i.imgur.com/Xkp2QhW.png'

const AdminLayout = () => {
  const { user, isAuthenticated, logout, loading } = useAuth()

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  // 1. Wait until authentication restoration completes
  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#E4E1DC]'>
        <div className='text-center'>
          <div className='mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-[#34483C]' />
          <p className='mt-4 text-sm font-medium text-[#34483C]'>
            Loading admin workspace...
          </p>
        </div>
      </div>
    )
  }

  // 2. Authentication check
  if (!isAuthenticated || !user) {
    return <Navigate to='/login' replace state={{ from: location }} />
  }

  // 3. Admin role check
  if (user.role !== 'admin') {
    return <Navigate to='/' replace />
  }

  const navItems = [
    {
      to: '/admin',
      icon: FiHome,
      label: 'Dashboard',
      description: 'Overview and analytics',
      end: true
    },
    {
      to: '/admin/news',
      icon: FiFileText,
      label: 'All News',
      description: 'Manage published articles',
      end: true
    },
    {
      to: '/admin/news/create',
      icon: FiPlusCircle,
      label: 'Create News',
      description: 'Write a new article',
      end: true
    },
    {
      to: '/admin/users',
      icon: FiUsers,
      label: 'Users',
      description: 'Manage users and sub editors',
      end: true
    }
  ]

  const currentPage =
    navItems.find(item =>
      item.end
        ? location.pathname === item.to
        : location.pathname === item.to ||
          location.pathname.startsWith(`${item.to}/`)
    )?.label || 'Admin Panel'

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <button
          type='button'
          aria-label='Close navigation'
          onClick={closeSidebar}
          className='fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px] lg:hidden'
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex flex-col
          w-[270px]
          bg-[#202020] text-white
          transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
      >
        {/* Brand */}
        <div className='h-[86px] flex items-center justify-between px-6 border-b border-white/10'>
          <NavLink
            to='/admin'
            onClick={closeSidebar}
            className='flex items-center gap-3'
          >
            <div className='w-11 h-11 bg-[#F8F7F4] rounded-sm flex items-center justify-center p-1.5'>
              <img
                src={LOGO}
                alt='খবরনামা'
                className='w-full h-full object-contain'
              />
            </div>

            <div>
              <h1 className='text-xl font-bold tracking-tight'>খবরনামা</h1>
              <p className='text-[10px] text-white/45 uppercase tracking-[0.22em] mt-0.5'>
                Administration
              </p>
            </div>
          </NavLink>

          <button
            onClick={closeSidebar}
            className='lg:hidden p-2 text-white/60 hover:text-white'
            aria-label='Close menu'
          >
            <FiX size={21} />
          </button>
        </div>

        {/* Admin Profile */}
        <div className='mx-4 mt-6 p-4 bg-white/[0.06] border border-white/10'>
          <div className='flex items-center gap-3'>
            <div className='w-10 h-10 rounded-full bg-[#34483C] flex items-center justify-center shrink-0'>
              <FiUser size={19} />
            </div>

            <div className='min-w-0'>
              <p className='text-sm font-semibold truncate'>
                {user?.name || 'Administrator'}
              </p>
              <p className='text-[11px] text-white/45 mt-1'>Administrator</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className='flex-1 overflow-y-auto px-4 pt-8'>
          <p className='px-3 mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35'>
            Main Menu
          </p>

          <nav className='space-y-1.5'>
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={closeSidebar}
                className={({ isActive }) => `
                  relative flex items-center gap-3
                  px-3 py-3.5
                  transition-all duration-200
                  group
                  ${
                    isActive
                      ? 'bg-[#34483C] text-white'
                      : 'text-white/60 hover:bg-white/[0.06] hover:text-white'
                  }
                `}
              >
                {({ isActive }) => (
                  <>
                    <item.icon
                      size={19}
                      className={
                        isActive
                          ? 'text-white'
                          : 'text-white/50 group-hover:text-white'
                      }
                    />

                    <div className='flex-1 min-w-0'>
                      <p className='text-sm font-semibold'>{item.label}</p>
                      <p
                        className={`text-[10px] mt-0.5 ${
                          isActive ? 'text-white/65' : 'text-white/35'
                        }`}
                      >
                        {item.description}
                      </p>
                    </div>

                    {isActive && <FiChevronRight size={17} />}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Website Link */}
          <div className='mt-10'>
            <p className='px-3 mb-4 text-[10px] font-bold uppercase tracking-[0.22em] text-white/35'>
              Website
            </p>

            <NavLink
              to='/'
              onClick={closeSidebar}
              className='flex items-center gap-3 px-3 py-3 text-sm font-medium text-white/60 hover:text-white hover:bg-white/[0.06] transition-colors'
            >
              <FiArrowLeft size={18} />
              Back to Website
              <FiExternalLink size={13} className='ml-auto' />
            </NavLink>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className='px-6 py-5 border-t border-white/10'>
          <p className='text-xs font-semibold text-white/60'>খবরনামা</p>
          <p className='text-[10px] text-white/30 mt-1'>
            Content Management System
          </p>
        </div>
      </aside>

      {/* Main Area */}
      <div className='lg:ml-[270px] min-h-screen flex flex-col'>
        {/* Top Header */}
        <header className='sticky top-0 z-30 bg-[#F8F7F4]/95 backdrop-blur-md border-b border-[#202020]/10'>
          <div className='h-[76px] px-4 sm:px-6 lg:px-8 flex items-center justify-between'>
            {/* Left */}
            <div className='flex items-center gap-3'>
              <button
                onClick={() => setSidebarOpen(true)}
                className='lg:hidden w-10 h-10 flex items-center justify-center bg-white border border-[#202020]/10 hover:bg-[#E4E1DC] transition-colors'
                aria-label='Open navigation'
              >
                <FiMenu size={21} />
              </button>

              <div>
                <div className='flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] text-gray-400 font-semibold'>
                  <FiGrid size={12} />
                  Administration
                  <FiChevronRight size={12} />
                  <span className='text-[#34483C]'>{currentPage}</span>
                </div>

                <h2 className='text-lg sm:text-xl font-bold mt-1'>
                  {currentPage}
                </h2>
              </div>
            </div>

            {/* Right */}
            <div className='flex items-center gap-3 sm:gap-5'>
              <NavLink
                to='/'
                className='hidden sm:inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-[#34483C] transition-colors'
              >
                <FiExternalLink size={15} />
                View Website
              </NavLink>

              <div className='hidden sm:block w-px h-8 bg-[#202020]/10' />

              <div className='flex items-center gap-2.5'>
                <div className='w-9 h-9 rounded-full bg-[#34483C] text-white flex items-center justify-center'>
                  <FiUser size={16} />
                </div>

                <div className='hidden sm:block'>
                  <p className='text-xs font-bold'>{user?.name || 'Admin'}</p>
                  <p className='text-[10px] text-gray-400'>Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className='flex-1 w-full min-w-0 p-4 sm:p-6 lg:p-8 xl:p-10'>
          <div className='max-w-[1600px] mx-auto'>
            <Outlet />
          </div>
        </main>

        {/* Footer */}
        <footer className='px-4 sm:px-8 py-5 border-t border-[#202020]/10 bg-[#F8F7F4]'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-2 max-w-[1600px] mx-auto'>
            <p className='text-[11px] text-gray-500'>
              © {new Date().getFullYear()} খবরনামা. All rights reserved.
            </p>

            <p className='text-[11px] text-gray-400'>সত্য ও নিরপেক্ষ সংবাদ</p>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default AdminLayout
