import { NavLink, Outlet, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  FiGrid,
  FiFileText,
  FiPlusCircle,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
  FiChevronRight,
  FiBookOpen,
  FiCommand
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'

const navigation = [
  {
    name: 'Dashboard',
    path: '/sub-editor',
    icon: FiGrid,
    end: true
  },
  {
    name: 'My News',
    path: '/sub-editor/news',
    icon: FiFileText,
    end: true
  },
  {
    name: 'Create News',
    path: '/sub-editor/news/create',
    icon: FiPlusCircle,
    end: true
  }
]

const SubEditorLayout = () => {
  const { user, isAuthenticated, logout, loading } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)
  const navigate = useNavigate()

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-[#E4E1DC]'>
        <div className='text-center'>
          <div className='mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#34483C]/20 border-t-[#34483C]' />
          <p className='mt-4 text-sm font-medium text-[#34483C]'>
            Loading your workspace...
          </p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || user?.role !== 'sub-editor') {
    return <Navigate to='/login' replace />
  }

  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'S'

  const handleLogout = async () => {
    if (loggingOut) return

    try {
      setLoggingOut(true)
      await logout()
      navigate('/login', { replace: true })
    } finally {
      setLoggingOut(false)
    }
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className='min-h-screen bg-[#E4E1DC] text-[#202020]'>
      {/* ================= MOBILE HEADER ================= */}
      <header className='sticky top-0 z-40 flex h-[68px] items-center justify-between border-b border-[#E9E6E0] bg-[#F8F7F4]/95 px-4 backdrop-blur-md lg:hidden'>
        <button
          type='button'
          onClick={() => setSidebarOpen(true)}
          className='flex h-10 w-10 items-center justify-center rounded-lg text-[#34483C] transition hover:bg-[#EDEDE7]'
          aria-label='Open navigation menu'
        >
          <FiMenu size={22} />
        </button>

        <a
          href='/'
          className='flex items-center gap-2'
          aria-label='Khobornama homepage'
        >
          <img
            src='https://i.imgur.com/Xkp2QhW.png'
            alt='খবরনামা'
            className='h-9 w-9 object-contain'
          />

          <div>
            <h1 className='text-lg font-extrabold leading-none tracking-tight'>
              খবরনামা
            </h1>
            <p className='mt-1 text-[9px] font-semibold uppercase tracking-[0.2em] text-[#34483C]'>
              Editorial Desk
            </p>
          </div>
        </a>

        <div className='flex h-9 w-9 items-center justify-center rounded-full bg-[#34483C] text-sm font-bold text-white'>
          {userInitial}
        </div>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {sidebarOpen && (
        <button
          type='button'
          onClick={closeSidebar}
          className='fixed inset-0 z-40 bg-[#202020]/45 backdrop-blur-[2px] lg:hidden'
          aria-label='Close navigation overlay'
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[280px] flex-col border-r border-[#E9E6E0] bg-[#F8F7F4] transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand */}
        <div className='flex h-[88px] shrink-0 items-center justify-between border-b border-[#EAE7E1] px-6'>
          <a href='/' className='flex items-center gap-3'>
            <img
              src='https://i.imgur.com/Xkp2QhW.png'
              alt='Khobornama Logo'
              className='h-12 w-12 object-contain'
            />

            <div>
              <h1 className='text-[22px] font-extrabold leading-tight tracking-tight text-[#202020]'>
                খবরনামা
              </h1>

              <p className='mt-0.5 text-[10px] font-semibold uppercase tracking-[0.19em] text-[#34483C]'>
                NEWS & EDITORIAL
              </p>
            </div>
          </a>

          <button
            type='button'
            onClick={closeSidebar}
            className='flex h-9 w-9 items-center justify-center rounded-lg text-[#77766F] transition hover:bg-[#EAE8E2] lg:hidden'
            aria-label='Close sidebar'
          >
            <FiX size={20} />
          </button>
        </div>

        {/* User Profile */}
        <div className='mx-4 mt-6 rounded-xl border border-[#EAE7E1] bg-white p-4'>
          <div className='flex items-center gap-3'>
            <div className='relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#34483C] text-lg font-bold text-white'>
              {userInitial}

              <span className='absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#6C9B70]' />
            </div>

            <div className='min-w-0 flex-1'>
              <p className='truncate text-sm font-bold text-[#202020]'>
                {user?.name || 'Sub Editor'}
              </p>

              <p className='mt-1 truncate text-xs text-[#929087]'>
                {user?.email || 'Editorial Account'}
              </p>
            </div>
          </div>

          <div className='mt-4 flex items-center justify-between border-t border-[#F0EEE9] pt-3'>
            <span className='text-[10px] font-semibold uppercase tracking-wider text-[#929087]'>
              Account Role
            </span>

            <span className='rounded-md bg-[#EAF0E9] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#34483C]'>
              Sub Editor
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className='flex-1 overflow-y-auto px-4 py-7'>
          <div className='mb-4 flex items-center justify-between px-3'>
            <p className='text-[10px] font-bold uppercase tracking-[0.17em] text-[#A09D95]'>
              Workspace
            </p>

            <FiCommand className='text-sm text-[#B3B0A8]' />
          </div>

          <nav className='space-y-1.5'>
            {navigation.map(item => {
              const Icon = item.icon

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.end}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3 rounded-lg px-3.5 py-3 transition-all duration-200 ${
                      isActive
                        ? 'bg-[#34483C] text-white shadow-sm'
                        : 'text-[#69685F] hover:bg-[#ECEDE7] hover:text-[#34483C]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={19}
                        className={
                          isActive
                            ? 'text-white'
                            : 'text-[#88877E] transition group-hover:text-[#34483C]'
                        }
                      />

                      <span className='flex-1 text-[13px] font-semibold'>
                        {item.name}
                      </span>

                      {isActive && (
                        <FiChevronRight size={16} className='text-white/80' />
                      )}
                    </>
                  )}
                </NavLink>
              )
            })}
          </nav>

          {/* Quick Links */}
          <div className='mt-9 border-t border-[#EAE7E1] pt-6'>
            <p className='mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.17em] text-[#A09D95]'>
              External Links
            </p>

            <a
              href='/'
              target='_blank'
              rel='noopener noreferrer'
              className='group flex items-center gap-3 rounded-lg px-3.5 py-3 text-[#69685F] transition hover:bg-[#ECEDE7] hover:text-[#34483C]'
            >
              <FiExternalLink size={18} />

              <span className='flex-1 text-[13px] font-semibold'>
                Visit Website
              </span>

              <FiChevronRight className='text-sm opacity-0 transition group-hover:translate-x-1 group-hover:opacity-100' />
            </a>
          </div>

          {/* Editorial Note */}
          <div className='mt-8 rounded-lg bg-[#ECEDE7] p-4'>
            <div className='flex items-center gap-2 text-[#34483C]'>
              <FiBookOpen size={17} />
              <span className='text-xs font-bold'>Editorial Desk</span>
            </div>

            <p className='mt-2 text-[11px] leading-5 text-[#77766F]'>
              Responsible journalism begins with accurate information and
              thoughtful reporting.
            </p>
          </div>
        </div>

        {/* Logout */}
        <div className='shrink-0 border-t border-[#EAE7E1] p-4'>
          <button
            type='button'
            onClick={handleLogout}
            disabled={loggingOut}
            className='flex w-full items-center gap-3 rounded-lg px-4 py-3 text-[#A34A43] transition hover:bg-[#F6EAE7] disabled:cursor-not-allowed disabled:opacity-60'
          >
            <FiLogOut size={18} />

            <span className='text-[13px] font-semibold'>
              {loggingOut ? 'Signing out...' : 'Sign Out'}
            </span>
          </button>

          <p className='mt-3 text-center text-[10px] tracking-wide text-[#AAA79F]'>
            KHOBORNAMA © {new Date().getFullYear()}
          </p>
        </div>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main className='min-h-screen lg:pl-[280px]'>
        {/* Desktop Header */}
        <header className='sticky top-0 z-30 hidden h-[76px] items-center justify-between border-b border-[#E9E6E0] bg-[#F8F7F4]/95 px-8 backdrop-blur-md lg:flex xl:px-10'>
          <div>
            <p className='text-[10px] font-bold uppercase tracking-[0.18em] text-[#99968E]'>
              KHOBORNAMA / EDITORIAL
            </p>

            <h2 className='mt-1 text-sm font-bold text-[#202020]'>
              Editorial Workspace
            </h2>
          </div>

          <div className='flex items-center gap-4'>
            <div className='h-9 w-px bg-[#E5E2DC]' />

            <div className='text-right'>
              <p className='text-sm font-bold text-[#202020]'>
                {user?.name || 'Sub Editor'}
              </p>

              <p className='mt-0.5 text-[11px] font-medium text-[#34483C]'>
                Sub Editor
              </p>
            </div>

            <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#34483C] text-sm font-bold text-white ring-4 ring-[#34483C]/10'>
              {userInitial}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className='min-h-[calc(100vh-76px)]'>
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default SubEditorLayout
