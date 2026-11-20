import React from 'react'
import {
  ShieldCheck,
  LockKeyhole,
  Database,
  Cookie,
  Share2,
  UserCheck,
  Mail,
  ArrowUpRight,
  Eye
} from 'lucide-react'

const sections = [
  {
    id: '01',
    icon: Database,
    title: 'আমরা যেসব তথ্য সংগ্রহ করি',
    content: [
      'খবরনামা ব্যবহারের সময় আপনার অভিজ্ঞতা উন্নত করতে প্রয়োজনীয় কিছু তথ্য সংগ্রহ করা হতে পারে।',
      'আপনি আমাদের সঙ্গে যোগাযোগ করলে আপনার দেওয়া নাম, ইমেইল ঠিকানা, ফোন নম্বর এবং বার্তার তথ্য সংরক্ষিত হতে পারে।',
      'ওয়েবসাইট ব্যবহারের সময় ব্রাউজার, ডিভাইস, IP Address এবং ভিজিট সংক্রান্ত কিছু প্রযুক্তিগত তথ্য স্বয়ংক্রিয়ভাবে সংগ্রহ হতে পারে।'
    ]
  },
  {
    id: '02',
    icon: Eye,
    title: 'তথ্য ব্যবহারের উদ্দেশ্য',
    content: [
      'পাঠকদের জন্য ওয়েবসাইটের ব্যবহারযোগ্যতা ও অভিজ্ঞতা উন্নত করতে।',
      'পাঠকদের প্রশ্ন, মতামত ও অভিযোগের উত্তর দিতে।',
      'ওয়েবসাইটের নিরাপত্তা, কার্যকারিতা এবং প্রযুক্তিগত সমস্যা পর্যবেক্ষণ করতে।',
      'প্রয়োজন অনুযায়ী ওয়েবসাইটের কনটেন্ট ও সেবার মান উন্নত করতে।'
    ]
  },
  {
    id: '03',
    icon: Cookie,
    title: 'কুকিজ (Cookies)',
    content: [
      'খবরনামা ওয়েবসাইটের কিছু কার্যকারিতা উন্নত করতে Cookies বা অনুরূপ প্রযুক্তি ব্যবহার করতে পারে।',
      'Cookies আপনার ব্রাউজারে সংরক্ষিত ছোট তথ্য, যা ওয়েবসাইটের ব্যবহার ও পছন্দ মনে রাখতে সহায়তা করে।',
      'আপনি চাইলে ব্রাউজারের সেটিংস থেকে Cookies নিয়ন্ত্রণ বা বন্ধ করতে পারেন। তবে এতে ওয়েবসাইটের কিছু সুবিধা সীমিত হতে পারে।'
    ]
  },
  {
    id: '04',
    icon: Share2,
    title: 'তথ্য শেয়ার ও প্রকাশ',
    content: [
      'খবরনামা ব্যবহারকারীর ব্যক্তিগত তথ্য বিক্রি বা বাণিজ্যিক উদ্দেশ্যে ভাড়া দেওয়ার নীতি অনুসরণ করে না।',
      'ওয়েবসাইট পরিচালনা, নিরাপত্তা বা প্রযুক্তিগত সেবার জন্য প্রয়োজন হলে অনুমোদিত সেবা প্রদানকারীদের সঙ্গে সীমিত তথ্য শেয়ার করা হতে পারে।',
      'আইনগত বাধ্যবাধকতা বা বৈধ কর্তৃপক্ষের অনুরোধে প্রয়োজনীয় তথ্য প্রকাশ করা হতে পারে।'
    ]
  },
  {
    id: '05',
    icon: LockKeyhole,
    title: 'তথ্যের নিরাপত্তা',
    content: [
      'ব্যবহারকারীর তথ্য সুরক্ষায় যুক্তিসংগত প্রযুক্তিগত ও প্রশাসনিক ব্যবস্থা গ্রহণের চেষ্টা করা হয়।',
      'তবে ইন্টারনেটের মাধ্যমে তথ্য আদান-প্রদানের কোনো পদ্ধতিই শতভাগ নিরাপদ নয়। তাই সম্পূর্ণ নিরাপত্তার নিশ্চয়তা দেওয়া সম্ভব নয়।'
    ]
  },
  {
    id: '06',
    icon: UserCheck,
    title: 'ব্যবহারকারীর অধিকার',
    content: [
      'আপনার ব্যক্তিগত তথ্য সম্পর্কে জানতে বা সংশোধনের অনুরোধ জানাতে আমাদের সঙ্গে যোগাযোগ করতে পারেন।',
      'প্রযোজ্য আইন ও নীতিমালা অনুযায়ী তথ্য মুছে ফেলা বা ব্যবহার সীমিত করার অনুরোধও বিবেচনা করা হতে পারে।'
    ]
  }
]

const Privacy = () => {
  return (
    <main
      className='min-h-screen bg-[#E4E1DC] text-[#202020]'
      style={{
        fontFamily: "'Hind Siliguri', sans-serif"
      }}
    >
      {/* HERO SECTION */}
      <section className='relative overflow-hidden border-b border-[#202020]/10 bg-[#F8F7F4]'>
        <div className='absolute -top-36 -right-20 w-96 h-96 rounded-full border border-[#34483C]/[0.06]' />
        <div className='absolute top-0 right-20 w-64 h-64 rounded-full border border-[#34483C]/[0.06]' />

        <div className='relative max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
          <div className='flex items-center gap-3 mb-8'>
            <span className='w-9 h-[2px] bg-[#34483C]' />

            <span className='text-[#34483C] text-xs font-semibold uppercase tracking-[0.25em]'>
              Legal & Privacy
            </span>
          </div>

          <div className='grid lg:grid-cols-[1fr_auto] gap-10 items-end'>
            <div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.2] mb-7 text-[#202020]'>
                গোপনীয়তা
                <br />
                <span className='text-[#34483C]'>নীতিমালা।</span>
              </h1>

              <p className='text-[#52524D] text-base sm:text-lg leading-9 max-w-2xl'>
                আপনার ব্যক্তিগত তথ্য ও গোপনীয়তা আমাদের কাছে গুরুত্বপূর্ণ।
                খবরনামা কীভাবে তথ্য সংগ্রহ, ব্যবহার এবং সুরক্ষা করে, সে সম্পর্কে
                বিস্তারিত জানতে আমাদের গোপনীয়তা নীতিমালা পড়ুন।
              </p>
            </div>

            <div className='bg-[#FFFFFF] border border-[#E4E1DC] p-5 w-fit shadow-sm'>
              <img
                src='https://i.imgur.com/Xkp2QhW.png'
                alt='Khobornama Logo'
                className='w-36 sm:w-44 h-auto object-contain'
              />
            </div>
          </div>

          <div className='mt-14 pt-6 border-t border-[#202020]/10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#52524D]'>
            <span className='flex items-center gap-2'>
              <ShieldCheck size={16} className='text-[#34483C]' />
              Privacy Protection
            </span>

            <span className='flex items-center gap-2'>
              <LockKeyhole size={16} className='text-[#34483C]' />
              Data Security
            </span>

            <span>খবরনামা · Khobornama</span>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20'>
        <div className='grid lg:grid-cols-12 gap-10 lg:gap-20'>
          <div className='lg:col-span-4'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
              Your Privacy Matters
            </p>

            <h2 className='text-3xl sm:text-4xl font-bold leading-tight text-[#202020]'>
              আপনার তথ্য,
              <br />
              <span className='text-[#34483C]'>আপনার গোপনীয়তা</span>
            </h2>
          </div>

          <div className='lg:col-span-8'>
            <p className='text-[#202020] text-xl sm:text-2xl font-semibold leading-[1.8] mb-6'>
              খবরনামা (Khobornama)-তে আপনাকে স্বাগতম। আমাদের ওয়েবসাইট ব্যবহার
              করার মাধ্যমে আপনি এই গোপনীয়তা নীতিমালার বিষয়বস্তু সম্পর্কে অবগত
              হচ্ছেন।
            </p>

            <p className='text-[#52524D] text-base sm:text-lg leading-9'>
              এই নীতিমালায় ব্যাখ্যা করা হয়েছে, আমাদের ওয়েবসাইট ব্যবহার করার সময়
              কী ধরনের তথ্য সংগ্রহ করা হতে পারে, কেন সেই তথ্য ব্যবহার করা হয় এবং
              কীভাবে তা সুরক্ষিত রাখার চেষ্টা করা হয়। আমরা ব্যবহারকারীদের
              গোপনীয়তাকে গুরুত্ব দেওয়ার প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>
        </div>
      </section>

      {/* POLICY SECTIONS */}
      <section className='bg-[#F8F7F4] border-y border-[#202020]/10'>
        <div className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20'>
          <div className='mb-12'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
              Privacy Policy Details
            </p>

            <h2 className='text-[#202020] text-3xl sm:text-4xl font-bold'>
              আমাদের গোপনীয়তা নীতিমালা
            </h2>
          </div>

          <div className='border-t border-[#E4E1DC]'>
            {sections.map(section => {
              const Icon = section.icon

              return (
                <article
                  key={section.id}
                  className='grid sm:grid-cols-[75px_1fr] gap-5 sm:gap-9 py-9 border-b border-[#E4E1DC]'
                >
                  <div className='flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4'>
                    <span className='text-[#34483C] text-sm font-semibold'>
                      {section.id}
                    </span>

                    <Icon
                      size={25}
                      strokeWidth={1.5}
                      className='text-[#34483C]'
                    />
                  </div>

                  <div>
                    <h3 className='text-[#202020] text-xl sm:text-2xl font-bold mb-5'>
                      {section.title}
                    </h3>

                    <ul className='space-y-3'>
                      {section.content.map((paragraph, index) => (
                        <li
                          key={index}
                          className='flex items-start gap-3 text-[#52524D] text-base sm:text-lg leading-8'
                        >
                          <span className='w-1.5 h-1.5 rounded-full bg-[#34483C] shrink-0 mt-3' />

                          <span>{paragraph}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      {/* THIRD PARTY & POLICY UPDATES */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20'>
        <div className='grid md:grid-cols-2 gap-10'>
          <div className='bg-[#F8F7F4] border border-[#202020]/10 p-7 sm:p-9'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
              External Websites
            </p>

            <h2 className='text-[#202020] text-2xl sm:text-3xl font-bold mb-5'>
              তৃতীয় পক্ষের ওয়েবসাইট
            </h2>

            <p className='text-[#52524D] leading-9'>
              খবরনামার ওয়েবসাইটে অন্য ওয়েবসাইটের লিংক থাকতে পারে। এসব বাহ্যিক
              ওয়েবসাইটের নিজস্ব গোপনীয়তা নীতিমালা রয়েছে। তাদের তথ্য সংগ্রহ বা
              ব্যবহারের কার্যক্রমের জন্য খবরনামা দায়ী নয়।
            </p>
          </div>

          <div className='bg-[#F8F7F4] border border-[#202020]/10 p-7 sm:p-9'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
              Policy Updates
            </p>

            <h2 className='text-[#202020] text-2xl sm:text-3xl font-bold mb-5'>
              নীতিমালার পরিবর্তন
            </h2>

            <p className='text-[#52524D] leading-9'>
              প্রয়োজন অনুযায়ী এই গোপনীয়তা নীতিমালা হালনাগাদ বা পরিবর্তন করা হতে
              পারে। পরিবর্তিত নীতিমালা এই পৃষ্ঠায় প্রকাশ করা হবে। তাই সময় সময় এই
              পৃষ্ঠা পর্যালোচনা করার অনুরোধ রইল।
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className='px-5 sm:px-8 pb-16 sm:pb-24'>
        <div className='max-w-7xl mx-auto bg-[#34483C] px-7 sm:px-14 py-12 sm:py-16'>
          <div className='grid md:grid-cols-[1fr_auto] gap-8 items-center'>
            <div>
              <p className='text-[#D5DED6] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
                Have Questions?
              </p>

              <h2 className='text-white text-3xl sm:text-4xl font-bold mb-4'>
                গোপনীয়তা নিয়ে কোনো প্রশ্ন আছে?
              </h2>

              <p className='text-[#D5DED6] leading-8 max-w-xl'>
                আমাদের গোপনীয়তা নীতিমালা সম্পর্কে কোনো প্রশ্ন বা মতামত থাকলে
                ইমেইলের মাধ্যমে যোগাযোগ করুন।
              </p>

              <a
                href='mailto:contact@khobornama.com'
                className='inline-flex items-center gap-3 bg-[#F8F7F4] text-[#202020] px-6 py-4 mt-8 font-bold hover:bg-[#E4E1DC] transition-colors'
              >
                <Mail size={18} />
                contact@khobornama.com
                <ArrowUpRight size={17} />
              </a>
            </div>

            <div className='hidden md:flex w-24 h-24 border border-white/20 items-center justify-center text-white'>
              <ShieldCheck size={48} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className='bg-[#202020] px-5 sm:px-8 py-7'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-3 text-sm text-[#E4E1DC]'>
          <p>© {new Date().getFullYear()} Khobornama. All rights reserved.</p>

          <p>Publisher: DNKM</p>
        </div>
      </footer> */}
    </main>
  )
}

export default Privacy
