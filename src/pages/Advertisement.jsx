import React from 'react'
import {
  Megaphone,
  MessageCircle,
  ArrowUpRight,
  Newspaper,
  Target,
  Users,
  BarChart3,
  Mail,
  CheckCircle2
} from 'lucide-react'

const BRAND = {
  primary: '#202020',
  background: '#E4E1DC',
  surface: '#F8F7F4',
  accent: '#34483C',
  muted: '#A9B9AB'
}

const CONTACT = {
  email: 'contact@khobornama.com',
  whatsapp: '8801923130565',
  phone: '01923-130565'
}

const advertisingOptions = [
  {
    icon: Newspaper,
    title: 'ওয়েবসাইট ব্যানার বিজ্ঞাপন',
    description:
      'খবরনামার ওয়েবসাইটের গুরুত্বপূর্ণ স্থানে আপনার প্রতিষ্ঠানের বিজ্ঞাপন প্রদর্শন করুন।'
  },
  {
    icon: Target,
    title: 'স্পন্সরড কনটেন্ট',
    description:
      'আপনার পণ্য, সেবা বা প্রতিষ্ঠানের পরিচিতি পাঠকদের কাছে তুলে ধরুন।'
  },
  {
    icon: Users,
    title: 'ব্র্যান্ড প্রমোশন',
    description: 'আপনার ব্র্যান্ডের পরিচিতি ও অনলাইন উপস্থিতি আরও বিস্তৃত করুন।'
  },
  {
    icon: BarChart3,
    title: 'ক্যাম্পেইন বিজ্ঞাপন',
    description:
      'নির্দিষ্ট প্রচারণা, অফার বা বিশেষ উদ্যোগের জন্য বিজ্ঞাপনের ব্যবস্থা করুন।'
  }
]

const Advertisement = () => {
  const whatsappLink = `https://wa.me/${
    CONTACT.whatsapp
  }?text=${encodeURIComponent(
    'আসসালামু আলাইকুম, আমি খবরনামায় বিজ্ঞাপন দিতে আগ্রহী। বিজ্ঞাপনের বিস্তারিত তথ্য ও মূল্য জানতে চাই।'
  )}`

  return (
    <main
      className='min-h-screen text-[#202020]'
      style={{
        backgroundColor: BRAND.background,
        fontFamily: "'Hind Siliguri', sans-serif"
      }}
    >
      {/* HERO */}
      <section className='relative overflow-hidden bg-[#202020] text-[#F8F7F4]'>
        <div className='absolute -top-32 -right-20 w-96 h-96 rounded-full border border-white/[0.06]' />
        <div className='absolute -top-20 -right-5 w-64 h-64 rounded-full border border-white/[0.06]' />

        <div className='relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28'>
          <div className='flex items-center gap-3 mb-8'>
            <span className='w-9 h-[2px] bg-[#A9B9AB]' />
            <span className='text-[#A9B9AB] text-xs font-semibold uppercase tracking-[0.25em]'>
              Advertise With Khobornama
            </span>
          </div>

          <div className='grid lg:grid-cols-[1fr_auto] gap-12 items-end'>
            <div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.2] mb-7 text-[#fff]'>
                আপনার ব্র্যান্ড
                <br />
                <span className='text-[#A9B9AB]'>পৌঁছে দিন পাঠকের কাছে।</span>
              </h1>

              <p className='text-[#D0CEC8] text-base sm:text-lg leading-9 max-w-2xl'>
                খবরনামার সঙ্গে বিজ্ঞাপন দিয়ে আপনার প্রতিষ্ঠান, পণ্য ও সেবার
                পরিচিতি ছড়িয়ে দিন। আপনার ব্র্যান্ডের প্রচারণায় আমরা হতে পারি
                একটি কার্যকর ডিজিটাল মাধ্যম।
              </p>

              <div className='flex flex-wrap gap-4 mt-9'>
                <a
                  href={whatsappLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-3 bg-[#34483C] text-white px-7 py-4 font-semibold hover:bg-[#40594A] transition-colors'
                >
                  <MessageCircle size={20} />
                  বিজ্ঞাপনের জন্য মেসেজ দিন
                  <ArrowUpRight size={18} />
                </a>

                <a
                  href={`mailto:${CONTACT.email}?subject=${encodeURIComponent(
                    'Advertisement Inquiry - Khobornama'
                  )}`}
                  className='inline-flex items-center gap-3 border border-white/30 text-white px-7 py-4 font-semibold hover:bg-white/10 transition-colors'
                >
                  ইমেইল করুন
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </div>

            <div className='bg-[#F8F7F4] p-5 w-fit'>
              <img
                src='https://i.imgur.com/Xkp2QhW.png'
                alt='Khobornama Logo'
                className='w-36 sm:w-44 h-auto object-contain'
              />
            </div>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
        <div className='grid lg:grid-cols-12 gap-12 lg:gap-20 items-start'>
          <div className='lg:col-span-5'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
              Why Khobornama
            </p>

            <h2 className='text-3xl sm:text-4xl font-bold leading-tight mb-6'>
              বিজ্ঞাপনের জন্য
              <br />
              খবরনামা কেন?
            </h2>

            <p className='text-[#69665F] leading-8'>
              একটি সংবাদমাধ্যম হিসেবে খবরনামা পাঠকদের কাছে তথ্য ও সংবাদ পৌঁছে
              দেওয়ার পাশাপাশি বিভিন্ন প্রতিষ্ঠান ও ব্র্যান্ডের প্রচারণার সুযোগ
              তৈরি করতে আগ্রহী।
            </p>
          </div>

          <div className='lg:col-span-7 bg-[#F8F7F4] border border-[#D3CFC7] p-8 sm:p-12'>
            <div className='flex items-start gap-5 mb-8'>
              <div className='w-12 h-12 shrink-0 bg-[#34483C] text-white flex items-center justify-center'>
                <Megaphone size={23} />
              </div>
              <div>
                <h3 className='text-xl sm:text-2xl font-bold mb-3'>
                  আপনার প্রচারণা, আমাদের প্ল্যাটফর্ম
                </h3>
                <p className='text-[#69665F] leading-8'>
                  ছোট ব্যবসা থেকে শুরু করে বড় প্রতিষ্ঠান—বিভিন্ন ধরনের বিজ্ঞাপন
                  ও প্রচারণার বিষয়ে আমাদের সঙ্গে আলোচনা করতে পারেন। আপনার
                  প্রয়োজন অনুযায়ী বিজ্ঞাপনের ধরন ও সম্ভাব্য পরিকল্পনা নিয়ে
                  আমাদের টিমের সঙ্গে যোগাযোগ করুন।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVERTISING OPTIONS */}
      <section className='bg-[#F8F7F4] border-y border-[#D3CFC7]'>
        <div className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
          <div className='max-w-2xl mb-12'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
              Advertising Opportunities
            </p>
            <h2 className='text-3xl sm:text-4xl font-bold mb-5'>
              বিজ্ঞাপনের বিভিন্ন সুযোগ
            </h2>
            <p className='text-[#69665F] leading-8'>
              আপনার প্রচারণার লক্ষ্য অনুযায়ী নিচের বিজ্ঞাপন সেবাগুলো নিয়ে আমাদের
              সঙ্গে আলোচনা করতে পারেন।
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {advertisingOptions.map((item, index) => {
              const Icon = item.icon

              return (
                <div
                  key={index}
                  className='bg-white border border-[#D3CFC7] p-7 sm:p-8 hover:border-[#34483C] transition-colors'
                >
                  <div className='w-12 h-12 bg-[#34483C] text-white flex items-center justify-center mb-8'>
                    <Icon size={23} />
                  </div>

                  <h3 className='text-xl font-bold mb-4'>{item.title}</h3>

                  <p className='text-[#69665F] leading-8 text-sm'>
                    {item.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* HOW TO ADVERTISE */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
        <div className='grid lg:grid-cols-2 gap-14 items-center'>
          <div>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
              Get Started
            </p>

            <h2 className='text-3xl sm:text-4xl font-bold mb-6'>
              কীভাবে বিজ্ঞাপন দেবেন?
            </h2>

            <p className='text-[#69665F] leading-8 mb-8'>
              খবরনামায় বিজ্ঞাপন দিতে আগ্রহী হলে আমাদের WhatsApp নম্বরে একটি
              মেসেজ পাঠান। আমাদের টিম আপনার সঙ্গে যোগাযোগ করে পরবর্তী প্রক্রিয়া
              জানাবে।
            </p>

            <div className='space-y-5'>
              {[
                'WhatsApp-এ আমাদের মেসেজ দিন।',
                'আপনার প্রতিষ্ঠান ও বিজ্ঞাপনের ধরন জানান।',
                'বিজ্ঞাপনের মূল্য ও প্রচারণার বিস্তারিত আলোচনা করুন।',
                'সম্মতি অনুযায়ী বিজ্ঞাপন প্রকাশের ব্যবস্থা করুন।'
              ].map((step, index) => (
                <div key={index} className='flex items-start gap-4'>
                  <div className='w-8 h-8 shrink-0 bg-[#34483C] text-white flex items-center justify-center text-sm font-bold'>
                    {index + 1}
                  </div>
                  <p className='text-[#45423D] leading-8'>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className='bg-[#F8F7F4] border border-[#D3CFC7] p-8 sm:p-12'>
            <div className='w-14 h-14 bg-[#34483C] text-white flex items-center justify-center mb-8'>
              <MessageCircle size={26} />
            </div>

            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
              Direct Contact
            </p>

            <h3 className='text-3xl font-bold mb-5'>বিজ্ঞাপন দিতে আগ্রহী?</h3>

            <p className='text-[#69665F] leading-8 mb-8'>
              বিজ্ঞাপনের মূল্য, নিয়মাবলি ও প্রকাশের সময় সম্পর্কে জানতে সরাসরি
              আমাদের WhatsApp-এ মেসেজ দিন।
            </p>

            <a
              href={whatsappLink}
              target='_blank'
              rel='noopener noreferrer'
              className='w-full inline-flex items-center justify-center gap-3 bg-[#34483C] text-white px-7 py-4 font-semibold hover:bg-[#40594A] transition-colors'
            >
              <MessageCircle size={20} />
              WhatsApp-এ মেসেজ দিন
              <ArrowUpRight size={19} />
            </a>

            <p className='text-[#77736C] text-sm text-center mt-5'>
              WhatsApp: {CONTACT.phone}
            </p>
          </div>
        </div>
      </section>

      {/* TERMS NOTE */}
      <section className='bg-[#F8F7F4] border-t border-[#D3CFC7]'>
        <div className='max-w-7xl mx-auto px-5 sm:px-8 py-10'>
          <div className='flex items-start gap-4'>
            <CheckCircle2 className='text-[#34483C] shrink-0 mt-1' size={22} />
            <p className='text-[#69665F] leading-8 text-sm'>
              সকল বিজ্ঞাপন প্রকাশের আগে খবরনামার সম্পাদকীয় নীতিমালা, প্রযোজ্য
              আইন এবং বিজ্ঞাপন প্রকাশসংক্রান্ত শর্তাবলি বিবেচনা করা হবে।
              বিজ্ঞাপন প্রকাশের নিশ্চয়তা আলোচনার ভিত্তিতে নির্ধারিত হবে।
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
        <div className='bg-[#202020] text-[#F8F7F4] px-7 sm:px-14 py-14 sm:py-16 text-center'>
          <div className='w-14 h-14 bg-[#34483C] flex items-center justify-center mx-auto mb-7'>
            <Megaphone size={25} />
          </div>

          <p className='text-[#A9B9AB] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
            Advertise With Us
          </p>

          <h2 className='text-3xl sm:text-5xl font-bold mb-6 text-[#fff]'>
            আপনার ব্র্যান্ডের প্রচারণা শুরু হোক।
          </h2>

          <p className='text-[#B8B5AE] max-w-xl mx-auto leading-8 mb-9'>
            খবরনামায় বিজ্ঞাপন দিতে আজই আমাদের সঙ্গে যোগাযোগ করুন। আপনার প্রয়োজন
            ও পরিকল্পনা আমাদের জানান।
          </p>

          <a
            href={whatsappLink}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center justify-center gap-3 bg-[#34483C] text-white px-8 py-4 font-semibold hover:bg-[#40594A] transition-colors'
          >
            <MessageCircle size={20} />
            WhatsApp-এ মেসেজ দিন
            <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
    </main>
  )
}

export default Advertisement
