const Loading = () => {
  return (
    <div
      className='min-h-[50vh] flex flex-col items-center justify-center bg-[#E4E1DC] px-4'
      role='status'
      aria-label='সংবাদ লোড হচ্ছে'
    >
      {/* Brand Logo */}
      <div className='mb-6'>
        <img
          src='https://i.imgur.com/Xkp2QhW.png'
          alt='খবরনামা'
          className='w-20 h-20 object-contain'
        />
      </div>

      {/* Spinner */}
      <div className='relative w-9 h-9'>
        <div className='absolute inset-0 rounded-full border-[3px] border-[#34483C]/15' />

        <div className='absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#34483C] animate-spin' />
      </div>

      {/* Loading Text */}
      <p className='mt-5 text-sm font-medium text-[#202020]/70'>
        সংবাদ লোড হচ্ছে...
      </p>

      <span className='mt-1 text-[10px] tracking-[0.25em] uppercase text-[#202020]/35 font-english'>
        Khobornama
      </span>
    </div>
  )
}

export default Loading
