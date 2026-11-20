import React from 'react'
import {
  FileText,
  ShieldCheck,
  BookOpen,
  Copyright,
  AlertCircle,
  Scale,
  UserCheck,
  Ban,
  Mail,
  ArrowUpRight
} from 'lucide-react'

const termsSections = [
  {
    id: '01',
    icon: UserCheck,
    title: 'ওয়েবসাইট ব্যবহারের শর্ত',
    paragraphs: [
      'খবরনামা (Khobornama) ওয়েবসাইটে প্রবেশ ও ব্যবহার করার মাধ্যমে আপনি এই ব্যবহারের শর্তাবলি মেনে চলতে সম্মত হচ্ছেন।',
      'ওয়েবসাইট ব্যবহারের সময় আপনাকে প্রচলিত আইন, সামাজিক মূল্যবোধ এবং অন্য ব্যবহারকারীর অধিকারকে সম্মান করতে হবে।',
      'কোনো অবৈধ, বিভ্রান্তিকর, ক্ষতিকর বা অননুমোদিত উদ্দেশ্যে এই ওয়েবসাইট ব্যবহার করা যাবে না।'
    ]
  },
  {
    id: '02',
    icon: Copyright,
    title: 'কপিরাইট ও মেধাস্বত্ব',
    paragraphs: [
      'খবরনামায় প্রকাশিত লেখা, সংবাদ, ছবি, গ্রাফিক্স, লোগো, ডিজাইন এবং অন্যান্য উপকরণ সংশ্লিষ্ট কপিরাইট ও মেধাস্বত্ব আইনের আওতাভুক্ত হতে পারে।',
      'খবরনামার নিজস্ব কনটেন্ট পূর্বানুমতি ছাড়া সম্পূর্ণ বা আংশিকভাবে পুনঃপ্রকাশ, বাণিজ্যিক ব্যবহার বা বিতরণ করা যাবে না।',
      'তৃতীয় পক্ষের কনটেন্টের ক্ষেত্রে সংশ্লিষ্ট স্বত্বাধিকারীর অধিকার ও শর্তাবলি প্রযোজ্য হবে।',
      'সংবাদ শেয়ার করার সময় মূল উৎস ও খবরনামার যথাযথ পরিচিতি উল্লেখ করার অনুরোধ করা হচ্ছে।'
    ]
  },
  {
    id: '03',
    icon: BookOpen,
    title: 'সংবাদ ও কনটেন্টের ব্যবহার',
    paragraphs: [
      'খবরনামায় প্রকাশিত সংবাদ, প্রতিবেদন, মতামত, কলাম ও অন্যান্য কনটেন্ট তথ্য প্রদানের উদ্দেশ্যে প্রকাশ করা হয়।',
      'আমরা তথ্যের নির্ভুলতা ও বিশ্বাসযোগ্যতা বজায় রাখার চেষ্টা করি। তবে সব তথ্য সব সময় সম্পূর্ণ, নির্ভুল বা হালনাগাদ থাকার নিশ্চয়তা দেওয়া হয় না।',
      'কোনো গুরুত্বপূর্ণ সিদ্ধান্ত নেওয়ার আগে পাঠকদের প্রয়োজন অনুযায়ী তথ্য যাচাই করার পরামর্শ দেওয়া হচ্ছে।',
      'সংবাদ, মতামত ও বিশ্লেষণের মধ্যে পার্থক্য থাকতে পারে। মতামতধর্মী লেখার বক্তব্য সংশ্লিষ্ট লেখকের নিজস্ব হতে পারে।'
    ]
  },
  {
    id: '04',
    icon: Ban,
    title: 'নিষিদ্ধ কার্যক্রম',
    paragraphs: [
      'ওয়েবসাইটের নিরাপত্তা নষ্ট করার চেষ্টা করা যাবে না।',
      'অনুমতি ছাড়া ওয়েবসাইটের তথ্য, সার্ভার বা সিস্টেমে প্রবেশের চেষ্টা করা যাবে না।',
      'ক্ষতিকর সফটওয়্যার, স্প্যাম, ম্যালওয়্যার বা বিভ্রান্তিকর তথ্য ছড়ানো যাবে না।',
      'ওয়েবসাইটের স্বাভাবিক কার্যক্রম ব্যাহত করে এমন কোনো কার্যক্রম গ্রহণ করা যাবে না।'
    ]
  },
  {
    id: '05',
    icon: AlertCircle,
    title: 'তৃতীয় পক্ষের লিংক ও বিজ্ঞাপন',
    paragraphs: [
      'খবরনামার ওয়েবসাইটে তৃতীয় পক্ষের ওয়েবসাইট, সেবা বা বিজ্ঞাপনের লিংক থাকতে পারে।',
      'এসব বাহ্যিক ওয়েবসাইটের কনটেন্ট, নিরাপত্তা, নীতিমালা বা কার্যক্রমের ওপর খবরনামার সরাসরি নিয়ন্ত্রণ নাও থাকতে পারে।',
      'তৃতীয় পক্ষের ওয়েবসাইট ব্যবহারের আগে তাদের নিজস্ব শর্তাবলি ও গোপনীয়তা নীতিমালা পর্যালোচনা করার পরামর্শ দেওয়া হচ্ছে।'
    ]
  },
  {
    id: '06',
    icon: Scale,
    title: 'দায়বদ্ধতার সীমাবদ্ধতা',
    paragraphs: [
      'ওয়েবসাইটের ব্যবহার বা সাময়িক অপ্রাপ্যতার কারণে সৃষ্ট কোনো প্রত্যক্ষ বা পরোক্ষ ক্ষতির দায় প্রযোজ্য আইন সাপেক্ষে বিবেচিত হবে।',
      'প্রযুক্তিগত সমস্যা, ইন্টারনেট সংযোগ, তৃতীয় পক্ষের সেবা বা অনিয়ন্ত্রিত পরিস্থিতির কারণে ওয়েবসাইট ব্যবহারে বিঘ্ন ঘটতে পারে।',
      'খবরনামা ওয়েবসাইটের কার্যক্রম ও কনটেন্ট প্রয়োজন অনুযায়ী পরিবর্তন, সংশোধন বা সাময়িকভাবে বন্ধ রাখার অধিকার সংরক্ষণ করে।'
    ]
  },
  {
    id: '07',
    icon: ShieldCheck,
    title: 'গোপনীয়তা নীতিমালা',
    paragraphs: [
      'ব্যবহারকারীর তথ্য সংগ্রহ, ব্যবহার ও সুরক্ষার বিষয়গুলো আমাদের Privacy Policy দ্বারা পরিচালিত হবে।',
      'ওয়েবসাইট ব্যবহার করার আগে আমাদের Privacy Policy পর্যালোচনা করার অনুরোধ করা হচ্ছে।'
    ]
  },
  {
    id: '08',
    icon: FileText,
    title: 'শর্তাবলি পরিবর্তন',
    paragraphs: [
      'খবরনামা প্রয়োজন অনুযায়ী যেকোনো সময় এই ব্যবহারের শর্তাবলি সংশোধন বা হালনাগাদ করতে পারে।',
      'পরিবর্তিত শর্তাবলি এই পৃষ্ঠায় প্রকাশিত হওয়ার পর থেকে কার্যকর হবে, যদি অন্য কোনো কার্যকর তারিখ উল্লেখ না করা হয়।',
      'নিয়মিত এই পৃষ্ঠা পর্যালোচনা করার দায়িত্ব ব্যবহারকারীর।'
    ]
  },
  {
    id: '09',
    icon: Scale,
    title: 'প্রযোজ্য আইন',
    paragraphs: [
      'এই শর্তাবলি বাংলাদেশের প্রচলিত আইন ও প্রযোজ্য বিধিবিধান অনুসারে ব্যাখ্যা ও প্রয়োগ করা হবে।',
      'শর্তাবলি সম্পর্কিত কোনো বিরোধ দেখা দিলে তা প্রযোজ্য আইন অনুযায়ী সমাধানের চেষ্টা করা হবে।'
    ]
  }
]

const Terms = () => {
  return (
    <main
      className='min-h-screen bg-[#F8F7F4] text-[#202020]'
      style={{
        fontFamily: "'Hind Siliguri', sans-serif"
      }}
    >
      {/* HERO SECTION */}
      <section className='relative overflow-hidden border-b border-[#E5E7E2]'>
        <div className='absolute -top-36 -right-20 w-96 h-96 rounded-full border border-[#34483C]/[0.06]' />
        <div className='absolute top-0 right-20 w-64 h-64 rounded-full border border-[#34483C]/[0.06]' />

        <div className='relative max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
          <div className='flex items-center gap-3 mb-8'>
            <span className='w-9 h-[2px] bg-[#718777]' />
            <span className='text-[#718777] text-xs font-semibold uppercase tracking-[0.25em]'>
              Legal Information
            </span>
          </div>

          <div className='grid lg:grid-cols-[1fr_auto] gap-10 items-end'>
            <div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.2] mb-7 text-[#202020]'>
                ব্যবহারের
                <br />
                <span className='text-[#718777]'>শর্তাবলি।</span>
              </h1>

              <p className='text-[#525A54] text-base sm:text-lg leading-9 max-w-2xl'>
                খবরনামা ব্যবহারের আগে আমাদের ব্যবহারের শর্তাবলি পড়ে নিন। এই
                শর্তাবলিতে ওয়েবসাইট ব্যবহার, কনটেন্ট, মেধাস্বত্ব এবং
                ব্যবহারকারীর দায়িত্ব সম্পর্কে প্রয়োজনীয় তথ্য তুলে ধরা হয়েছে।
              </p>
            </div>

            <div className='bg-[#FFFFFF] border border-[#E5E7E2] p-5 w-fit shadow-sm'>
              <img
                src='https://i.imgur.com/Xkp2QhW.png'
                alt='Khobornama Logo'
                className='w-36 sm:w-44 h-auto object-contain'
              />
            </div>
          </div>

          <div className='mt-14 pt-6 border-t border-[#E5E7E2] flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#525A54]'>
            <span className='flex items-center gap-2'>
              <FileText size={16} className='text-[#718777]' />
              Terms & Conditions
            </span>

            <span className='flex items-center gap-2'>
              <ShieldCheck size={16} className='text-[#718777]' />
              User Guidelines
            </span>

            <span>খবরনামা · Khobornama</span>
          </div>
        </div>
      </section>

      {/* INTRODUCTION */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-14 sm:py-20'>
        <div className='grid lg:grid-cols-12 gap-10 lg:gap-20'>
          <div className='lg:col-span-4'>
            <p className='text-[#718777] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
              Welcome To Khobornama
            </p>

            <h2 className='text-3xl sm:text-4xl font-bold leading-tight text-[#202020]'>
              দায়িত্বশীল
              <br />
              <span className='text-[#718777]'>ব্যবহার ও নীতিমালা</span>
            </h2>
          </div>

          <div className='lg:col-span-8'>
            <p className='text-[#202020] text-xl sm:text-2xl font-semibold leading-[1.8] mb-6'>
              খবরনামা (Khobornama) একটি বাংলা সংবাদ ও গণমাধ্যম প্ল্যাটফর্ম।
              আমাদের ওয়েবসাইট ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলি মেনে চলতে
              সম্মত হচ্ছেন।
            </p>

            <p className='text-[#525A54] text-base sm:text-lg leading-9'>
              এই শর্তাবলি ওয়েবসাইটের সকল ব্যবহারকারী, পাঠক এবং ভিজিটরের জন্য
              প্রযোজ্য। আপনি যদি এই শর্তাবলির কোনো অংশের সঙ্গে একমত না হন, তাহলে
              ওয়েবসাইট ব্যবহার থেকে বিরত থাকতে পারেন।
            </p>
          </div>
        </div>
      </section>

      {/* TERMS CONTENT */}
      <section className='bg-[#F1F2EE] border-y border-[#E5E7E2]'>
        <div className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-20'>
          <div className='mb-12'>
            <p className='text-[#718777] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
              Terms Of Use
            </p>

            <h2 className='text-[#202020] text-3xl sm:text-4xl font-bold'>
              ব্যবহারের বিস্তারিত শর্তাবলি
            </h2>
          </div>

          <div className='border-t border-[#DDE1DA]'>
            {termsSections.map(section => {
              const Icon = section.icon

              return (
                <article
                  key={section.id}
                  className='grid sm:grid-cols-[75px_1fr] gap-5 sm:gap-9 py-9 border-b border-[#DDE1DA]'
                >
                  <div className='flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-4'>
                    <span className='text-[#718777] text-sm font-semibold'>
                      {section.id}
                    </span>

                    <Icon
                      size={25}
                      strokeWidth={1.5}
                      className='text-[#718777]'
                    />
                  </div>

                  <div>
                    <h3 className='text-[#202020] text-xl sm:text-2xl font-bold mb-5'>
                      {section.title}
                    </h3>

                    <ul className='space-y-3'>
                      {section.paragraphs.map((paragraph, index) => (
                        <li
                          key={index}
                          className='flex items-start gap-3 text-[#525A54] text-base sm:text-lg leading-8'
                        >
                          <span className='w-1.5 h-1.5 rounded-full bg-[#718777] shrink-0 mt-3' />

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

      {/* CONTACT SECTION */}
      <section className='px-5 sm:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto bg-[#34483C] px-7 sm:px-14 py-12 sm:py-16'>
          <div className='grid md:grid-cols-[1fr_auto] gap-8 items-center'>
            <div>
              <p className='text-[#D5DED6] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
                Need More Information?
              </p>

              <h2 className='text-white text-3xl sm:text-4xl font-bold mb-5'>
                শর্তাবলি সম্পর্কে জানতে চান?
              </h2>

              <p className='text-[#D5DED6] leading-8 max-w-xl'>
                এই শর্তাবলি সম্পর্কে কোনো প্রশ্ন, মতামত বা পরামর্শ থাকলে আমাদের
                সঙ্গে যোগাযোগ করুন।
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
              <Scale size={46} strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      {/* <footer className='border-t border-[#E5E7E2] px-5 sm:px-8 py-7'>
        <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between gap-3 text-sm text-[#525A54]'>
          <p>© {new Date().getFullYear()} Khobornama. All rights reserved.</p>

          <p>Publisher: DNKM</p>
        </div>
      </footer> */}
    </main>
  )
}

export default Terms
