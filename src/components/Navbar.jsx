import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom'

import {
  FiMenu,
  FiX,
  FiSearch,
  FiUser,
  FiLogOut,
  FiSettings,
  FiChevronDown,
  FiClock,
  FiTrendingUp,
  FiArrowRight
} from 'react-icons/fi'

import { useAuth } from '../context/AuthContext'

const LOGO = 'https://i.imgur.com/Xkp2QhW.png'

const categories = [
  { name: 'জাতীয়', slug: 'national' },
  { name: 'রাজনীতি', slug: 'politics' },
  { name: 'অর্থনীতি', slug: 'economy' },
  { name: 'আন্তর্জাতিক', slug: 'international' },
  { name: 'সারাদেশ', slug: 'country' },
  { name: 'খেলা', slug: 'sports' },
  { name: 'ধর্ম', slug: 'religion' },
  { name: 'স্বাস্থ্য', slug: 'health' },
  { name: 'ভিডিও', slug: 'video' },
  { name: 'কলাম', slug: 'column' },
  { name: 'ফিচার', slug: 'feature' },
  { name: 'মতামত', slug: 'opinion' },
  { name: 'সাহিত্য', slug: 'literature' },
  { name: 'আইন ও আদালত', slug: 'law-court' },
  { name: 'অন্যান্য', slug: 'others' }
]

const mainCategories = categories.slice(0, 8)
const moreCategories = categories.slice(8)

const navLinks = [
  { name: 'প্রচ্ছদ', path: '/' },
  { name: 'সর্বশেষ', path: '/latest' },
  { name: 'জনপ্রিয়', path: '/popular' }
]

const utilityLinks = [
  { name: 'আমাদের সম্পর্কে', path: '/about' },
  { name: 'যোগাযোগ', path: '/contact' },
  { name: 'ক্যারিয়ার', path: '/career' },
  { name: 'বিজ্ঞাপন', path: '/advertisement' }
]

const formatDate = () =>
  new Intl.DateTimeFormat('bn-BD', {
    timeZone: 'Asia/Dhaka',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date())

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [moreOpen, setMoreOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  console.log(isAdmin)

  const moreRef = useRef(null)
  const userRef = useRef(null)
  const searchRef = useRef(null)
  const searchBtnRef = useRef(null)

  const today = useMemo(formatDate, [])

  const closeAll = useCallback(() => {
    setIsOpen(false)
    setSearchOpen(false)
    setMoreOpen(false)
    setUserMenuOpen(false)
  }, [])

  // Outside click and Escape
  useEffect(() => {
    const handleOutside = event => {
      const target = event.target

      if (!moreRef.current?.contains(target)) {
        setMoreOpen(false)
      }

      if (!userRef.current?.contains(target)) {
        setUserMenuOpen(false)
      }

      if (
        !searchRef.current?.contains(target) &&
        !searchBtnRef.current?.contains(target)
      ) {
        setSearchOpen(false)
      }
    }

    const handleEscape = event => {
      if (event.key === 'Escape') closeAll()
    }

    document.addEventListener('pointerdown', handleOutside)
    document.addEventListener('keydown', handleEscape)

    return () => {
      document.removeEventListener('pointerdown', handleOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [closeAll])

  // Close menus after navigation
  useEffect(() => {
    closeAll()
  }, [location.pathname, location.search, closeAll])

  // Lock background scrolling on mobile menu
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  // Sticky navigation shadow
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, {
      passive: true
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSearch = e => {
    e.preventDefault()

    const query = searchQuery.trim()

    if (!query) return

    navigate(`/?search=${encodeURIComponent(query)}`)
    setSearchQuery('')
    closeAll()
  }

  const handleLogout = () => {
    logout()
    closeAll()
    navigate('/')
  }

  const toggleMenu = () => {
    setIsOpen(prev => !prev)
    setSearchOpen(false)
  }

  const toggleSearch = () => {
    setSearchOpen(prev => !prev)
    setIsOpen(false)
  }

  const isMoreActive = moreCategories.some(
    category => location.pathname === `/category/${category.slug}`
  )

  const primaryLinkClass = ({ isActive }) =>
    `relative flex items-center h-full py-4 text-sm whitespace-nowrap transition-colors duration-200 ${
      isActive
        ? 'text-[#34483C] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#34483C]'
        : 'text-[#202020]/75 font-medium hover:text-[#34483C]'
    }`

  const categoryLinkClass = ({ isActive }) =>
    `relative flex items-center h-full py-4 text-[13px] whitespace-nowrap transition-colors duration-200 ${
      isActive
        ? 'text-[#34483C] font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[3px] after:bg-[#34483C]'
        : 'text-[#202020]/70 hover:text-[#34483C]'
    }`

  return (
    <>
      {/* ================= TOP INFORMATION BAR ================= */}

      <div className='hidden md:block bg-[#202020] text-[#E4E1DC]'>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='h-9 flex items-center justify-between text-[11px]'>
            <div className='flex items-center gap-2 text-[#E4E1DC]/75'>
              <FiClock size={13} className='text-[#A9B7AA]' />
              <span>{today}</span>
            </div>

            <div className='flex items-center gap-6'>
              {utilityLinks.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className='hover:text-white transition-colors'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MAIN MASTHEAD ================= */}

      <div className='hidden md:block bg-[#E4E1DC]'>
        <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='min-h-[112px] flex items-center justify-between gap-8'>
            {/* Logo */}
            <Link
              to='/'
              aria-label='খবরনামা হোম'
              className='flex items-center shrink-0 group'
            >
              <img
                src={LOGO}
                alt='খবরনামা'
                className='h-[78px] w-auto object-contain transition-opacity group-hover:opacity-80'
              />
            </Link>

            {/* Desktop Search */}
            <form
              onSubmit={handleSearch}
              role='search'
              className='flex-1 max-w-[440px]'
            >
              <div className='relative group'>
                <FiSearch
                  size={19}
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-[#34483C]'
                />

                <input
                  type='search'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder='আপনার পছন্দের সংবাদ খুঁজুন...'
                  aria-label='সংবাদ খুঁজুন'
                  className='w-full h-12 pl-12 pr-16 rounded-sm bg-[#F8F7F4] border border-[#202020]/10 text-sm text-[#202020] placeholder:text-[#202020]/40 outline-none focus:border-[#34483C] transition-colors'
                />

                <button
                  type='submit'
                  aria-label='অনুসন্ধান'
                  className='absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-11 flex items-center justify-center bg-[#34483C] text-white hover:bg-[#26382D] transition-colors'
                >
                  <FiArrowRight size={18} />
                </button>
              </div>
            </form>

            {/* Authentication */}
            <div className='flex items-center shrink-0'>
              {isAuthenticated ? (
                <div className='relative' ref={userRef}>
                  <button
                    onClick={() => setUserMenuOpen(prev => !prev)}
                    aria-expanded={userMenuOpen}
                    aria-haspopup='menu'
                    className='flex items-center gap-3 py-2 px-3 hover:bg-[#F8F7F4] transition-colors'
                  >
                    <div className='w-10 h-10 flex items-center justify-center bg-[#34483C] text-white rounded-full'>
                      <FiUser size={18} />
                    </div>

                    <div className='text-left'>
                      <p className='text-sm font-semibold text-[#202020] max-w-[120px] truncate'>
                        {user?.name || 'ব্যবহারকারী'}
                      </p>
                      <p className='text-[11px] text-[#202020]/50'>
                        আমার অ্যাকাউন্ট
                      </p>
                    </div>

                    <FiChevronDown
                      className={`text-[#34483C] transition-transform ${
                        userMenuOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {userMenuOpen && (
                    <div
                      role='menu'
                      className='absolute right-0 top-full mt-2 w-64 bg-[#F8F7F4] border border-[#202020]/10 shadow-xl z-[70]'
                    >
                      <div className='px-5 py-4 border-b border-[#202020]/10'>
                        <p className='text-sm font-bold truncate'>
                          {user?.name || 'ব্যবহারকারী'}
                        </p>
                        <p className='text-xs text-[#202020]/50 mt-1 truncate'>
                          {user?.email || ''}
                        </p>
                      </div>

                      {user?.role === 'advertiser' && (
                        <Link
                          to='/advertiser/dashboard'
                          className='flex items-center gap-3 px-5 py-3'
                        >
                          <FiSettings />
                          Advertiser Dashboard
                        </Link>
                      )}

                      {isAdmin && (
                        <Link
                          to='/admin'
                          className='flex items-center gap-3 px-5 py-3 text-sm hover:bg-[#E4E1DC] transition-colors'
                        >
                          <FiSettings />
                          অ্যাডমিন প্যানেল
                        </Link>
                      )}

                      <Link
                        to='/profile'
                        role='menuitem'
                        className='flex items-center gap-3 px-5 py-3 text-sm hover:bg-[#E4E1DC] transition-colors'
                      >
                        <FiUser />
                        আমার প্রোফাইল
                      </Link>

                      <button
                        onClick={handleLogout}
                        role='menuitem'
                        className='flex items-center gap-3 px-5 py-3 w-full text-sm text-red-600 border-t border-[#202020]/10 hover:bg-red-50 transition-colors'
                      >
                        <FiLogOut />
                        লগআউট
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className='flex items-center gap-5'>
                  <Link
                    to='/login'
                    className='text-sm font-semibold text-[#202020] hover:text-[#34483C] transition-colors'
                  >
                    লগইন
                  </Link>

                  <Link
                    to='/register'
                    className='px-6 py-3 bg-[#34483C] text-white text-sm font-semibold hover:bg-[#26382D] transition-colors'
                  >
                    নিবন্ধন করুন
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ================= STICKY NAVIGATION ================= */}

      <header
        className={`sticky top-0 z-50 bg-[#F8F7F4] transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_4px_16px_rgba(32,32,32,0.09)]' : ''
        }`}
      >
        {/* MOBILE HEADER */}

        <div className='md:hidden border-b border-[#202020]/10'>
          <div className='max-w-screen-xl mx-auto px-4'>
            <div className='h-[62px] flex items-center justify-between'>
              <Link
                to='/'
                aria-label='খবরনামা হোম'
                className='flex items-center'
              >
                <img
                  src={LOGO}
                  alt='খবরনামা'
                  className='h-12 w-auto object-contain'
                />
              </Link>

              <div className='flex items-center gap-1'>
                <button
                  ref={searchBtnRef}
                  onClick={toggleSearch}
                  aria-label='সংবাদ খুঁজুন'
                  aria-expanded={searchOpen}
                  className={`w-10 h-10 flex items-center justify-center transition-colors ${
                    searchOpen
                      ? 'bg-[#34483C] text-white'
                      : 'text-[#202020] hover:bg-[#E4E1DC]'
                  }`}
                >
                  <FiSearch size={21} />
                </button>

                <button
                  onClick={toggleMenu}
                  aria-label={isOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
                  aria-expanded={isOpen}
                  aria-controls='mobile-navigation'
                  className={`w-10 h-10 flex items-center justify-center transition-colors ${
                    isOpen
                      ? 'bg-[#34483C] text-white'
                      : 'bg-[#E4E1DC] text-[#202020]'
                  }`}
                >
                  {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE SEARCH */}

        {searchOpen && (
          <div
            ref={searchRef}
            className='md:hidden bg-[#F8F7F4] px-4 py-4 border-b border-[#202020]/10'
          >
            <form onSubmit={handleSearch} role='search'>
              <div className='relative'>
                <FiSearch
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-[#34483C]'
                  size={18}
                />

                <input
                  autoFocus
                  type='search'
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder='আপনার পছন্দের সংবাদ খুঁজুন...'
                  aria-label='সংবাদ খুঁজুন'
                  className='w-full h-12 pl-11 pr-4 bg-[#E4E1DC]/50 border border-[#202020]/10 text-sm outline-none focus:border-[#34483C] transition-colors'
                />
              </div>
            </form>
          </div>
        )}

        {/* DESKTOP NAVIGATION */}

        <nav
          aria-label='প্রধান মেনু'
          className='hidden md:block bg-[#F8F7F4] border-b border-[#202020]/10'
        >
          <div className='max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center gap-6 h-[52px]'>
              {/* Compact Logo on Scroll */}

              <Link
                to='/'
                aria-label='খবরনামা হোম'
                aria-hidden={!scrolled}
                tabIndex={scrolled ? 0 : -1}
                className={`shrink-0 overflow-hidden transition-all duration-300 ${
                  scrolled
                    ? 'w-[105px] opacity-100'
                    : 'w-0 opacity-0 pointer-events-none'
                }`}
              >
                <img
                  src={LOGO}
                  alt='খবরনামা'
                  className='h-9 w-auto object-contain'
                />
              </Link>

              {/* Primary Navigation */}

              <div className='flex items-center gap-6 shrink-0 h-full'>
                {navLinks.map(item => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={primaryLinkClass}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>

              {/* Categories */}

              <div className='flex-1 min-w-0 h-full flex items-center gap-5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                {mainCategories.map(category => (
                  <NavLink
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className={categoryLinkClass}
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>

              {/* More Categories */}

              <div className='relative shrink-0 h-full' ref={moreRef}>
                <button
                  onClick={() => setMoreOpen(prev => !prev)}
                  aria-expanded={moreOpen}
                  aria-haspopup='true'
                  className={`flex items-center gap-1.5 h-full text-sm transition-colors ${
                    isMoreActive || moreOpen
                      ? 'text-[#34483C] font-bold'
                      : 'text-[#202020]/75 hover:text-[#34483C]'
                  }`}
                >
                  আরও
                  <FiChevronDown
                    size={15}
                    className={`transition-transform ${
                      moreOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {moreOpen && (
                  <div className='absolute right-0 top-full w-56 bg-[#F8F7F4] border border-[#202020]/10 shadow-xl z-[60] py-2'>
                    <p className='px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#34483C] font-semibold'>
                      অন্যান্য বিভাগ
                    </p>

                    {moreCategories.map(category => (
                      <NavLink
                        key={category.slug}
                        to={`/category/${category.slug}`}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-sm transition-colors ${
                            isActive
                              ? 'bg-[#E4E1DC] text-[#34483C] font-bold'
                              : 'text-[#202020] hover:bg-[#E4E1DC] hover:text-[#34483C]'
                          }`
                        }
                      >
                        {category.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* MOBILE NAVIGATION */}

        {isOpen && (
          <div
            id='mobile-navigation'
            className='md:hidden absolute top-full left-0 w-full bg-[#F8F7F4] border-t border-[#202020]/10 shadow-xl max-h-[calc(100dvh-62px)] overflow-y-auto overscroll-contain'
          >
            {/* Date */}

            <div className='px-5 py-3 bg-[#202020] text-[#E4E1DC]/80 text-xs flex items-center gap-2'>
              <FiClock className='text-[#A9B7AA]' />
              {today}
            </div>

            {/* Main Links */}

            <div className='grid grid-cols-3 border-b border-[#202020]/10'>
              {navLinks.map((item, index) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-center gap-1.5 py-4 text-sm font-semibold border-r last:border-r-0 border-[#202020]/10 transition-colors ${
                      isActive
                        ? 'bg-[#34483C] text-white'
                        : 'text-[#202020] hover:bg-[#E4E1DC]'
                    }`
                  }
                >
                  {index === 2 && <FiTrendingUp size={15} />}
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* Categories */}

            <div className='p-5'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-sm font-bold text-[#34483C]'>
                  সংবাদ বিভাগ
                </h3>

                <span className='text-[10px] font-english tracking-wider text-[#202020]/40'>
                  ALL CATEGORIES
                </span>
              </div>

              <div className='grid grid-cols-2 gap-x-5'>
                {categories.map(category => (
                  <NavLink
                    key={category.slug}
                    to={`/category/${category.slug}`}
                    className={({ isActive }) =>
                      `py-3 text-sm border-b border-[#202020]/10 transition-colors ${
                        isActive
                          ? 'text-[#34483C] font-bold'
                          : 'text-[#202020] hover:text-[#34483C]'
                      }`
                    }
                  >
                    {category.name}
                  </NavLink>
                ))}
              </div>
            </div>

            {/* Authentication */}

            <div className='px-5 py-5 border-t border-[#202020]/10'>
              {isAuthenticated ? (
                <>
                  <div className='flex items-center gap-3 mb-5'>
                    <div className='w-11 h-11 rounded-full bg-[#34483C] text-white flex items-center justify-center'>
                      <FiUser size={19} />
                    </div>

                    <div className='min-w-0'>
                      <p className='text-sm font-bold text-[#202020] truncate'>
                        {user?.name || 'ব্যবহারকারী'}
                      </p>
                      <p className='text-xs text-[#202020]/50 truncate mt-1'>
                        {user?.email || ''}
                      </p>
                    </div>
                  </div>

                  {isAdmin && (
                    <Link
                      to='/admin'
                      className='flex items-center gap-3 py-3 text-sm text-[#34483C]'
                    >
                      <FiSettings />
                      অ্যাডমিন প্যানেল
                    </Link>
                  )}

                  <Link
                    to='/profile'
                    className='flex items-center gap-3 py-3 text-sm text-[#202020]'
                  >
                    <FiUser />
                    আমার প্রোফাইল
                  </Link>

                  <button
                    onClick={handleLogout}
                    className='flex items-center gap-3 py-3 text-sm text-red-600 w-full'
                  >
                    <FiLogOut />
                    লগআউট
                  </button>
                </>
              ) : (
                <div className='grid grid-cols-2 gap-3'>
                  <Link
                    to='/login'
                    className='flex items-center justify-center border border-[#34483C] text-[#34483C] py-3 text-sm font-semibold hover:bg-[#E4E1DC] transition-colors'
                  >
                    লগইন
                  </Link>

                  <Link
                    to='/register'
                    className='flex items-center justify-center bg-[#34483C] text-white py-3 text-sm font-semibold hover:bg-[#26382D] transition-colors'
                  >
                    নিবন্ধন করুন
                  </Link>
                </div>
              )}
            </div>

            {/* Utility Links */}

            <div className='px-5 py-5 bg-[#E4E1DC]/60 border-t border-[#202020]/10'>
              <div className='flex flex-wrap gap-x-5 gap-y-3'>
                {utilityLinks.map(item => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className='text-xs text-[#202020]/65 hover:text-[#34483C] transition-colors'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <p className='text-[10px] font-english tracking-[0.2em] text-[#202020]/35 mt-5'>
                KHOBORNAMA
              </p>
            </div>
          </div>
        )}
      </header>
    </>
  )
}

export default Navbar
