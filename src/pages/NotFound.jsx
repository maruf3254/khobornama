import { Link, useNavigate } from 'react-router-dom'
import { FiHome, FiArrowLeft, FiAlertCircle } from 'react-icons/fi'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className='min-h-[75vh] bg-[#E4E1DC] flex items-center justify-center px-4 py-16'>
      <div className='max-w-xl w-full text-center'>
        {/* Brand */}
        <Link to='/' className='inline-block mb-10'>
          <img
            src='https://i.imgur.com/Xkp2QhW.png'
            alt='খবরনামা'
            className='h-14 w-auto object-contain mx-auto'
          />
        </Link>

        {/* 404 */}
        <div className='relative'>
          <h1 className='text-[120px] sm:text-[160px] leading-none font-bold tracking-tighter text-[#34483C]'>
            404
          </h1>
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <span className='text-[#F8F7F4]/40 text-7xl font-bold'>404</span>
          </div>
        </div>

        {/* Content */}
        <div className='mt-6'>
          <div className='flex items-center justify-center gap-2 text-[#34483C] mb-4'>
            <FiAlertCircle size={18} />
            <span className='text-sm font-semibold tracking-widest uppercase'>
              Error 404
            </span>
          </div>

          <h2 className='text-2xl sm:text-3xl font-bold text-[#202020]'>
            দুঃখিত! পৃষ্ঠাটি খুঁজে পাওয়া যায়নি
          </h2>

          <p className='text-[#66645F] mt-4 leading-7 max-w-md mx-auto'>
            আপনি যে সংবাদ বা পৃষ্ঠাটি খুঁজছেন সেটি সরানো হয়েছে, পরিবর্তন করা
            হয়েছে অথবা বর্তমানে উপলব্ধ নেই।
          </p>
        </div>

        {/* Divider */}
        <div className='w-16 h-[2px] bg-[#34483C] mx-auto my-8' />

        {/* Actions */}
        <div className='flex flex-col sm:flex-row gap-3 justify-center'>
          <button
            onClick={() => navigate(-1)}
            className='inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#34483C]/30 text-[#34483C] rounded-md font-semibold hover:bg-[#34483C]/5 transition-colors'
          >
            <FiArrowLeft size={18} />
            ফিরে যান
          </button>

          <Link
            to='/'
            className='inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#34483C] text-white rounded-md font-semibold hover:bg-[#26372D] transition-colors'
          >
            <FiHome size={18} />
            হোম পেজে যান
          </Link>
        </div>

        {/* Footer */}
        <p className='text-xs text-[#858078] mt-12 tracking-wide'>
          © {new Date().getFullYear()} খবরনামা | সত্যের সন্ধানে, সংবাদের সাথে
        </p>
      </div>
    </div>
  )
}

export default NotFound
