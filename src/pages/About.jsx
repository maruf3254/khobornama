import React from 'react'
import {
  ArrowUpRight,
  Mail,
  MapPin,
  MessageCircle,
  Building2,
  Newspaper,
  ShieldCheck,
  Target,
  Eye,
  BookOpen,
  ArrowRight
} from 'lucide-react'

const BRAND = {
  primary: '#202020',
  background: '#E4E1DC',
  surface: '#F8F7F4',
  accent: '#34483C'
}

const contact = {
  email: 'contact@khobornama.com',
  phone: '01923-130565',
  whatsapp: '8801923130565',
  address: 'Sarulia, Demra, Dhaka.',
  publisher: 'DNKM'
}

const editorialValues = [
  {
    number: '01',
    icon: ShieldCheck,
    title: 'বিশ্বস্ত সংবাদ',
    description:
      'তথ্যের নির্ভুলতা ও সংবাদ যাচাইয়ের গুরুত্বকে সর্বোচ্চ অগ্রাধিকার দেওয়া।'
  },
  {
    number: '02',
    icon: Target,
    title: 'বস্তুনিষ্ঠতা',
    description:
      'সংবাদ পরিবেশনে দায়িত্বশীলতা, ভারসাম্য এবং নিরপেক্ষ দৃষ্টিভঙ্গি বজায় রাখা।'
  },
  {
    number: '03',
    icon: Eye,
    title: 'স্বচ্ছতা',
    description:
      'পাঠকদের কাছে তথ্য উপস্থাপনে স্বচ্ছতা ও জবাবদিহিতাকে গুরুত্ব দেওয়া।'
  },
  {
    number: '04',
    icon: BookOpen,
    title: 'সচেতন পাঠকসমাজ',
    description:
      'গুরুত্বপূর্ণ সংবাদ ও তথ্যের মাধ্যমে সচেতন সমাজ গঠনে ভূমিকা রাখা।'
  }
]

const categories = [
  'জাতীয়',
  'রাজনীতি',
  'অর্থনীতি',
  'আন্তর্জাতিক',
  'সারাদেশ',
  'খেলা',
  'ধর্ম',
  'স্বাস্থ্য',
  'ভিডিও',
  'কলাম',
  'ফিচার',
  'মতামত',
  'সাহিত্য',
  'আইন ও আদালত'
]

const About = () => {
  return (
    <main
      className='min-h-screen text-[#202020]'
      style={{
        backgroundColor: BRAND.background,
        fontFamily: "'Hind Siliguri', sans-serif"
      }}
    >
      {/* HERO SECTION */}
      <section className='px-4 sm:px-6 lg:px-8 pt-5'>
        <div className='max-w-7xl mx-auto'>
          <div className='bg-[#202020] relative overflow-hidden'>
            <div className='absolute top-0 right-0 w-72 h-72 border border-[#F8F7F4]/10 rounded-full translate-x-1/3 -translate-y-1/3' />
            <div className='absolute bottom-0 right-32 w-52 h-52 border border-[#F8F7F4]/10 rounded-full translate-y-1/2' />

            <div className='relative z-10 grid lg:grid-cols-[1.4fr_0.6fr] gap-12 items-end px-6 sm:px-12 lg:px-16 py-14 sm:py-20 lg:py-24'>
              <div>
                <div className='flex items-center gap-3 mb-8'>
                  <span className='w-8 h-[1px] bg-[#A9B9AB]' />
                  <span className='text-[#A9B9AB] uppercase tracking-[0.25em] text-xs font-semibold'>
                    About Khobornama
                  </span>
                </div>

                <h1 className='text-[#F8F7F4] text-5xl sm:text-6xl lg:text-[76px] font-bold leading-[1.2] mb-7'>
                  খবরের গভীরে,
                  <br />
                  <span className='text-[#A9B9AB]'>সত্যের সন্ধানে।</span>
                </h1>

                <p className='text-[#D2D0CA] text-base sm:text-lg leading-9 max-w-2xl'>
                  খবরনামা একটি বাংলা সংবাদ ও গণমাধ্যম প্ল্যাটফর্ম। সময়োপযোগী
                  সংবাদ, গুরুত্বপূর্ণ তথ্য এবং সমসাময়িক ঘটনাপ্রবাহ পাঠকের কাছে
                  পৌঁছে দেওয়ার প্রত্যয়ে আমাদের পথচলা।
                </p>
              </div>

              <div className='lg:border-l lg:border-[#F8F7F4]/20 lg:pl-10'>
                <img
                  src='https://i.imgur.com/Xkp2QhW.png'
                  alt='Khobornama Logo'
                  className='w-36 sm:w-44 h-auto object-contain mb-8 [filter:brightness(0)_invert(1)]'
                />

                <p className='text-[#A9B9AB] text-xs uppercase tracking-[0.2em] mb-3'>
                  Our Identity
                </p>

                <h2 className='text-[#F8F7F4] text-3xl font-bold mb-2'>
                  খবরনামা
                </h2>

                <p className='text-[#B8B5AE] text-sm tracking-widest'>
                  KHOBORNAMA
                </p>
              </div>
            </div>

            <div className='relative z-10 border-t border-[#F8F7F4]/15 grid grid-cols-2 sm:grid-cols-4'>
              {[
                ['০১', 'বিশ্বস্ততা'],
                ['০২', 'নিরপেক্ষতা'],
                ['০৩', 'দায়িত্বশীলতা'],
                ['০৪', 'স্বচ্ছতা']
              ].map(([number, title]) => (
                <div
                  key={number}
                  className='px-5 sm:px-10 py-5 border-r border-[#F8F7F4]/10 last:border-r-0'
                >
                  <p className='text-[#A9B9AB] text-xs mb-1'>{number}</p>
                  <p className='text-[#F8F7F4] font-semibold'>{title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT INTRODUCTION */}
      <section className='px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto grid lg:grid-cols-12 gap-10 lg:gap-20'>
          <div className='lg:col-span-4'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
              Who We Are
            </p>

            <h2 className='text-4xl sm:text-5xl font-bold leading-tight'>
              আমাদের
              <br />
              <span className='text-[#34483C]'>পরিচয় ও উদ্দেশ্য</span>
            </h2>

            <div className='w-16 h-[3px] bg-[#34483C] mt-8' />
          </div>

          <div className='lg:col-span-8'>
            <p className='text-xl sm:text-2xl leading-[1.9] font-semibold mb-7'>
              খবরনামা (Khobornama) — একটি আধুনিক বাংলা সংবাদমাধ্যম, যেখানে
              দেশ-বিদেশের গুরুত্বপূর্ণ ঘটনাপ্রবাহ পাঠকের সামনে তুলে ধরাই আমাদের
              মূল উদ্দেশ্য।
            </p>

            <div className='space-y-5 text-[#55534E] text-base sm:text-lg leading-9'>
              <p>
                জাতীয়, রাজনীতি, অর্থনীতি, আন্তর্জাতিক, সারাদেশ, খেলাধুলা, ধর্ম,
                স্বাস্থ্য, সাহিত্য ও সমসাময়িক নানা বিষয়ে সংবাদ প্রকাশের মাধ্যমে
                একটি তথ্যসমৃদ্ধ পাঠকসমাজ গড়ে তুলতে কাজ করে খবরনামা।
              </p>

              <p>
                আমরা বিশ্বাস করি, সঠিক তথ্য ও দায়িত্বশীল সংবাদ পরিবেশন একটি
                সচেতন সমাজের অন্যতম ভিত্তি। তাই সংবাদ পরিবেশনে নির্ভুলতা,
                স্বচ্ছতা এবং পেশাদারিত্বকে গুরুত্ব দেওয়ার প্রত্যয় নিয়ে খবরনামার
                যাত্রা।
              </p>

              <p>
                পাঠকের আস্থা অর্জন এবং সংবাদকে সহজে সবার কাছে পৌঁছে দেওয়াই
                আমাদের নিরন্তর প্রচেষ্টা।
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL VALUES */}
      <section className='bg-[#F8F7F4] border-y border-[#D3CFC7] px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12'>
            <div>
              <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
                Our Principles
              </p>

              <h2 className='text-3xl sm:text-5xl font-bold'>
                আমাদের নীতিমালা ও অঙ্গীকার
              </h2>
            </div>

            <p className='text-[#77736C] max-w-sm leading-7'>
              পাঠকের আস্থা ও সাংবাদিকতার দায়িত্বশীলতা আমাদের প্রতিটি কাজের
              অনুপ্রেরণা।
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#D9D5CD]'>
            {editorialValues.map(item => {
              const Icon = item.icon

              return (
                <div
                  key={item.number}
                  className='p-7 sm:p-8 border-r border-b border-[#D9D5CD] hover:bg-[#E4E1DC] transition-colors duration-200'
                >
                  <div className='flex justify-between items-center mb-10'>
                    <span className='text-sm font-semibold text-[#34483C]'>
                      {item.number}
                    </span>

                    <Icon
                      size={27}
                      strokeWidth={1.5}
                      className='text-[#34483C]'
                    />
                  </div>

                  <h3 className='text-2xl font-bold mb-4'>{item.title}</h3>

                  <p className='text-[#69665F] leading-8'>{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* NEWS COVERAGE */}
      <section className='px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-2 gap-12 items-start'>
            <div>
              <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
                What We Cover
              </p>

              <h2 className='text-3xl sm:text-5xl font-bold leading-tight mb-6'>
                দেশ ও বিশ্বের
                <br />
                <span className='text-[#34483C]'>নানা প্রান্তের খবর</span>
              </h2>

              <p className='text-[#69665F] leading-8 text-lg max-w-lg'>
                গুরুত্বপূর্ণ সংবাদ, বিশ্লেষণ, মতামত এবং নানা বিষয়ভিত্তিক
                প্রতিবেদন নিয়ে খবরনামার সংবাদ আয়োজন।
              </p>
            </div>

            <div className='bg-[#F8F7F4] border border-[#D3CFC7] p-7 sm:p-10'>
              <div className='flex items-center gap-3 mb-7'>
                <Newspaper className='text-[#34483C]' size={25} />
                <h3 className='text-xl font-bold'>আমাদের সংবাদ বিভাগ</h3>
              </div>

              <div className='flex flex-wrap gap-2'>
                {categories.map((category, index) => (
                  <span
                    key={category}
                    className={`px-4 py-2.5 text-sm font-medium border ${
                      index === 0
                        ? 'bg-[#34483C] text-[#F8F7F4] border-[#34483C]'
                        : 'bg-[#F8F7F4] text-[#202020] border-[#D3CFC7]'
                    }`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLISHER SECTION */}
      <section className='bg-[#202020] text-[#F8F7F4] px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-12 gap-12'>
            <div className='lg:col-span-5'>
              <p className='text-[#A9B9AB] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
                Publication Information
              </p>

              <h2 className='text-[#F8F7F4] text-4xl sm:text-5xl font-bold mb-7'>
                প্রকাশক ও
                <br />
                <span className='text-[#A9B9AB]'>যোগাযোগ</span>
              </h2>

              <p className='text-[#B8B5AE] leading-8 max-w-md'>
                খবরনামা সম্পর্কিত যেকোনো তথ্য, মতামত, পরামর্শ কিংবা যোগাযোগের
                জন্য আমাদের সঙ্গে যোগাযোগ করুন।
              </p>
            </div>

            <div className='lg:col-span-7 grid sm:grid-cols-2 gap-4'>
              <div className='bg-[#F8F7F4] text-[#202020] p-7 sm:p-8'>
                <Building2 size={27} className='text-[#34483C] mb-7' />

                <p className='text-[#77736C] text-sm mb-2'>প্রকাশক</p>

                <h3 className='text-2xl font-bold'>{contact.publisher}</h3>

                <p className='text-[#77736C] text-sm mt-3'>
                  Publisher of Khobornama
                </p>
              </div>

              <div className='bg-[#F8F7F4] text-[#202020] p-7 sm:p-8'>
                <MapPin size={27} className='text-[#34483C] mb-7' />

                <p className='text-[#77736C] text-sm mb-2'>কার্যালয়ের ঠিকানা</p>

                <h3 className='text-xl font-bold leading-8'>
                  {contact.address}
                </h3>
              </div>

              <div className='bg-[#F8F7F4] text-[#202020] p-7 sm:p-8'>
                <Mail size={27} className='text-[#34483C] mb-7' />

                <p className='text-[#77736C] text-sm mb-2'>ইমেইল</p>

                <a
                  href={`mailto:${contact.email}`}
                  className='text-base sm:text-lg font-semibold break-all hover:text-[#34483C] transition-colors'
                >
                  {contact.email}
                </a>

                <a
                  href={`mailto:${contact.email}`}
                  className='flex items-center gap-2 text-[#34483C] text-sm mt-5 font-semibold'
                >
                  ইমেইল পাঠান <ArrowUpRight size={16} />
                </a>
              </div>

              <div className='bg-[#F8F7F4] text-[#202020] p-7 sm:p-8'>
                <MessageCircle size={27} className='text-[#34483C] mb-7' />

                <p className='text-[#77736C] text-sm mb-2'>ফোন ও WhatsApp</p>

                <a
                  href={`tel:${contact.phone}`}
                  className='text-xl font-bold hover:text-[#34483C] transition-colors'
                >
                  {contact.phone}
                </a>

                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-2 text-[#34483C] text-sm mt-5 font-semibold'
                >
                  WhatsApp-এ যোগাযোগ করুন
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className='px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto bg-[#34483C] text-[#F8F7F4] px-7 sm:px-14 py-14 sm:py-20 text-center'>
          <p className='text-[#C3D0C5] text-xs uppercase tracking-[0.25em] font-semibold mb-6'>
            Khobornama · Bengali News & Media
          </p>

          <h2 className='text-[#F8F7F4] text-3xl sm:text-5xl font-bold mb-6 leading-tight'>
            সত্য ও তথ্যের সঙ্গে থাকুন।
          </h2>

          <p className='text-[#D5DED6] max-w-xl mx-auto leading-8 mb-9'>
            প্রতিদিনের গুরুত্বপূর্ণ সংবাদ ও সমসাময়িক ঘটনাপ্রবাহ জানতে খবরনামার
            সঙ্গে যুক্ত থাকুন।
          </p>

          <a
            href={`mailto:${contact.email}`}
            className='inline-flex items-center gap-3 bg-[#F8F7F4] text-[#202020] px-7 py-4 font-bold hover:bg-[#E4E1DC] transition-colors'
          >
            আমাদের সঙ্গে যোগাযোগ করুন
            <ArrowRight size={18} />
          </a>
        </div>
      </section>
    </main>
  )
}

export default About
