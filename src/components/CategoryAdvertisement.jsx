import { useEffect, useState } from 'react'
import { advertisementAPI } from '../services/api'

const CategoryAdvertisement = ({ placement, device = 'all' }) => {
  const [ads, setAds] = useState([])

  useEffect(() => {
    let active = true

    const fetchAds = async () => {
      try {
        const res = await advertisementAPI.getPublic({
          placement,
          device
        })

        if (active) {
          setAds(res.data.data || [])
        }
      } catch (error) {
        console.error('Advertisement loading error:', error)
      }
    }

    fetchAds()

    return () => {
      active = false
    }
  }, [placement, device])

  const handleClick = async ad => {
    try {
      await advertisementAPI.recordClick(ad._id)
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer')
    } catch (error) {
      console.error('Advertisement click error:', error)
      window.open(ad.targetUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleImpression = async id => {
    try {
      await advertisementAPI.recordImpression(id)
    } catch (error) {
      console.error('Advertisement impression error:', error)
    }
  }

  if (!ads.length) return null

  return (
    <div className='space-y-4'>
      {ads.map(ad => (
        <div
          key={ad._id}
          className='relative overflow-hidden rounded-xl bg-[#F8F7F4] border border-[#202020]/10'
        >
          <span className='absolute top-3 left-3 z-10 bg-black/60 text-white text-[10px] px-2 py-1 rounded'>
            বিজ্ঞাপন
          </span>

          <img
            src={ad.image}
            alt={ad.title}
            loading='lazy'
            onLoad={() => handleImpression(ad._id)}
            className='w-full h-auto object-cover'
          />

          <div className='p-4'>
            <h3 className='font-bold text-[#202020] text-lg'>
              {ad.title}
            </h3>

            {ad.description && (
              <p className='text-sm text-[#77736D] mt-1'>
                {ad.description}
              </p>
            )}

            <button
              onClick={() => handleClick(ad)}
              className='mt-3 text-sm font-semibold text-[#34483C] hover:underline'
            >
              বিস্তারিত দেখুন →
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CategoryAdvertisement