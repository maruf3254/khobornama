import React from 'react'
import {
  ArrowUpRight,
  ArrowRight,
  Mail,
  BriefcaseBusiness,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
  Newspaper,
  PenLine,
  Video,
  MapPin,
  Users,
  FileText,
  ClipboardCheck,
  MessageCircle,
  CheckCircle2,
  Target,
  Award
} from 'lucide-react'

const BRAND = {
  primary: '#202020',
  background: '#E4E1DC',
  surface: '#F8F7F4',
  accent: '#34483C'
}

const contact = {
  email: 'contact@khobornama.com'
}

const careerValues = [
  {
    number: '01',
    icon: BriefcaseBusiness,
    title: 'পেশাদার পরিবেশ',
    description: 'সাংবাদিকতা ও গণমাধ্যমের পেশাদার মান বজায় রেখে কাজ করার সুযোগ।'
  },
  {
    number: '02',
    icon: GraduationCap,
    title: 'শেখার সুযোগ',
    description:
      'সংবাদ সংগ্রহ, সম্পাদনা, গবেষণা ও ডিজিটাল মিডিয়া সম্পর্কে অভিজ্ঞতা অর্জনের সুযোগ।'
  },
  {
    number: '03',
    icon: Lightbulb,
    title: 'সৃজনশীলতা',
    description:
      'নতুন ধারণা ও চিন্তাভাবনা প্রকাশের জন্য একটি উপযুক্ত প্ল্যাটফর্ম।'
  },
  {
    number: '04',
    icon: ShieldCheck,
    title: 'দায়িত্বশীল সাংবাদিকতা',
    description:
      'সত্য, নিরপেক্ষতা ও পাঠকের আস্থাকে গুরুত্ব দিয়ে কাজ করার সুযোগ।'
  }
]

const opportunities = [
  {
    number: '01',
    icon: Newspaper,
    title: 'Staff Reporter',
    subtitle: 'স্টাফ রিপোর্টার',
    description:
      'দেশের বিভিন্ন গুরুত্বপূর্ণ ঘটনা, সংবাদ সংগ্রহ এবং মাঠপর্যায়ের প্রতিবেদন তৈরির দায়িত্ব।'
  },
  {
    number: '02',
    icon: MapPin,
    title: 'District Correspondent',
    subtitle: 'জেলা সংবাদদাতা',
    description:
      'নিজ নিজ জেলা ও অঞ্চলের গুরুত্বপূর্ণ সংবাদ সংগ্রহ এবং নিয়মিত সংবাদ পাঠানো।'
  },
  {
    number: '03',
    icon: ClipboardCheck,
    title: 'News Editor',
    subtitle: 'সংবাদ সম্পাদক',
    description:
      'সংবাদ যাচাই, সম্পাদনা, শিরোনাম নির্ধারণ এবং প্রকাশনার মান বজায় রাখা।'
  },
  {
    number: '04',
    icon: PenLine,
    title: 'Content Writer',
    subtitle: 'কনটেন্ট রাইটার',
    description:
      'বিভিন্ন বিষয়ভিত্তিক প্রতিবেদন, ফিচার এবং তথ্যনির্ভর কনটেন্ট তৈরি।'
  },
  {
    number: '05',
    icon: Video,
    title: 'Video Journalist',
    subtitle: 'ভিডিও সাংবাদিক',
    description:
      'ভিডিও সংবাদ সংগ্রহ, ধারণ, সম্পাদনা এবং ডিজিটাল প্ল্যাটফর্মের জন্য কনটেন্ট তৈরি।'
  },
  {
    number: '06',
    icon: Users,
    title: 'Digital Media Executive',
    subtitle: 'ডিজিটাল মিডিয়া এক্সিকিউটিভ',
    description:
      'সামাজিক যোগাযোগমাধ্যমে সংবাদ প্রকাশ, কনটেন্ট পরিকল্পনা এবং অনলাইন উপস্থিতি পরিচালনা।'
  }
]

const requirements = [
  {
    number: '01',
    icon: PenLine,
    title: 'বাংলা ভাষায় দক্ষতা',
    description: 'বাংলা ভাষায় সুন্দরভাবে লেখা ও যোগাযোগ করার দক্ষতা।'
  },
  {
    number: '02',
    icon: Newspaper,
    title: 'সংবাদ বিষয়ে আগ্রহ',
    description: 'সংবাদ, সাংবাদিকতা ও সমসাময়িক ঘটনাবলি সম্পর্কে আগ্রহ।'
  },
  {
    number: '03',
    icon: ShieldCheck,
    title: 'দায়িত্বশীল মানসিকতা',
    description: 'তথ্য যাচাই, সততা এবং পেশাদার আচরণ বজায় রাখার মানসিকতা।'
  },
  {
    number: '04',
    icon: Users,
    title: 'দলগত দক্ষতা',
    description: 'সমন্বয়ের মাধ্যমে কাজ করা এবং নতুন কিছু শেখার আগ্রহ।'
  }
]

const applicationSteps = [
  {
    number: '01',
    icon: Mail,
    title: 'আবেদন পাঠান',
    description: 'আপনার CV এবং সংক্ষিপ্ত পরিচিতি আমাদের ইমেইলে পাঠান।'
  },
  {
    number: '02',
    icon: FileText,
    title: 'আবেদন পর্যালোচনা',
    description: 'আমাদের সংশ্লিষ্ট টিম আপনার আবেদন ও যোগ্যতা পর্যালোচনা করবে।'
  },
  {
    number: '03',
    icon: MessageCircle,
    title: 'সাক্ষাৎকার ও আলোচনা',
    description:
      'যোগ্য প্রার্থীদের সঙ্গে পরবর্তী আলোচনা বা সাক্ষাৎকারের জন্য যোগাযোগ করা হবে।'
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'পরবর্তী ধাপ',
    description: 'নির্বাচিত প্রার্থীদের দায়িত্ব ও কাজের বিস্তারিত জানানো হবে।'
  }
]

const Career = () => {
  const applicationLink =
    'mailto:contact@khobornama.com?subject=Career%20Application%20-%20Khobornama'

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
                    Career at Khobornama
                  </span>
                </div>

                <h1 className='text-[#F8F7F4] text-5xl sm:text-6xl lg:text-[76px] font-bold leading-[1.2] mb-7'>
                  সত্যের সন্ধানে,
                  <br />
                  <span className='text-[#A9B9AB]'>সম্ভাবনার পথে।</span>
                </h1>

                <p className='text-[#D2D0CA] text-base sm:text-lg leading-9 max-w-2xl'>
                  খবরনামা বিশ্বাস করে, দায়িত্বশীল সাংবাদিকতা ও সৃজনশীল মানুষের
                  হাত ধরেই গড়ে ওঠে একটি শক্তিশালী সংবাদমাধ্যম। সত্য,
                  বস্তুনিষ্ঠতা ও পেশাদারিত্বের সঙ্গে কাজ করতে আগ্রহী ব্যক্তিদের
                  আমাদের সঙ্গে যুক্ত হওয়ার আমন্ত্রণ জানাই।
                </p>

                <div className='flex flex-wrap gap-3 mt-9'>
                  <a
                    href='#opportunities'
                    className='inline-flex items-center gap-3 bg-[#F8F7F4] text-[#202020] px-6 py-3.5 font-semibold hover:bg-[#E4E1DC] transition-colors'
                  >
                    কাজের ক্ষেত্র দেখুন
                    <ArrowRight size={17} />
                  </a>

                  <a
                    href={applicationLink}
                    className='inline-flex items-center gap-3 border border-[#F8F7F4]/30 text-[#F8F7F4] px-6 py-3.5 font-semibold hover:bg-[#F8F7F4]/10 transition-colors'
                  >
                    যোগাযোগ করুন
                    <ArrowUpRight size={17} />
                  </a>
                </div>
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
                ['০১', 'সততা'],
                ['০২', 'পেশাদারিত্ব'],
                ['০৩', 'সৃজনশীলতা'],
                ['০৪', 'দায়িত্বশীলতা']
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

      {/* WHY JOIN US */}
      <section className='px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12'>
            <div>
              <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
                Why Join Khobornama
              </p>

              <h2 className='text-4xl sm:text-5xl font-bold leading-tight'>
                কেন খবরনামায়
                <br />
                <span className='text-[#34483C]'>কাজ করবেন?</span>
              </h2>

              <div className='w-16 h-[3px] bg-[#34483C] mt-8' />
            </div>

            <p className='text-[#77736C] max-w-sm leading-8'>
              একটি দায়িত্বশীল সংবাদমাধ্যমের সঙ্গে কাজ করার মাধ্যমে নিজের দক্ষতা
              ও সম্ভাবনাকে এগিয়ে নেওয়ার সুযোগ।
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#D3CFC7]'>
            {careerValues.map(item => {
              const Icon = item.icon

              return (
                <div
                  key={item.number}
                  className='p-7 sm:p-8 border-r border-b border-[#D3CFC7] hover:bg-[#F8F7F4] transition-colors duration-200'
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

      {/* CAREER OPPORTUNITIES */}
      <section
        id='opportunities'
        className='bg-[#F8F7F4] border-y border-[#D3CFC7] px-4 sm:px-6 lg:px-8 py-16 sm:py-24'
      >
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12'>
            <div>
              <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
                Career Opportunities
              </p>

              <h2 className='text-3xl sm:text-5xl font-bold'>
                আমাদের সম্ভাব্য
                <br />
                <span className='text-[#34483C]'>কর্মক্ষেত্র</span>
              </h2>
            </div>

            <p className='text-[#77736C] max-w-sm leading-7'>
              সংবাদ ও ডিজিটাল মিডিয়ার বিভিন্ন ক্ষেত্রে আগ্রহী ব্যক্তিদের জন্য
              সম্ভাব্য কাজের ক্ষেত্র।
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-[#D9D5CD]'>
            {opportunities.map(item => {
              const Icon = item.icon

              return (
                <div
                  key={item.number}
                  className='p-7 sm:p-8 border-r border-b border-[#D9D5CD] hover:bg-[#E4E1DC] transition-colors duration-200 group'
                >
                  <div className='flex items-center justify-between mb-8'>
                    <span className='text-sm font-semibold text-[#34483C]'>
                      {item.number}
                    </span>

                    <Icon
                      size={27}
                      strokeWidth={1.5}
                      className='text-[#34483C]'
                    />
                  </div>

                  <p className='text-[#77736C] text-sm font-medium tracking-wide mb-2'>
                    {item.title}
                  </p>

                  <h3 className='text-2xl font-bold mb-4'>{item.subtitle}</h3>

                  <p className='text-[#69665F] leading-8 mb-7 min-h-20'>
                    {item.description}
                  </p>

                  <a
                    href={applicationLink}
                    className='inline-flex items-center gap-2 text-[#34483C] font-semibold text-sm group-hover:gap-3 transition-all'
                  >
                    আগ্রহ প্রকাশ করুন
                    <ArrowUpRight size={17} />
                  </a>
                </div>
              )
            })}
          </div>

          <p className='text-sm text-[#77736C] mt-6 leading-7'>
            বিঃদ্রঃ এগুলো খবরনামার সম্ভাব্য কর্মক্ষেত্র। বর্তমানে এসব পদে নিয়োগ
            চলছে বলে ঘোষণা করা হচ্ছে না।
          </p>
        </div>
      </section>

      {/* CANDIDATE REQUIREMENTS */}
      <section className='px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='grid lg:grid-cols-12 gap-10 lg:gap-20'>
            <div className='lg:col-span-4'>
              <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
                Who We Are Looking For
              </p>

              <h2 className='text-4xl sm:text-5xl font-bold leading-tight'>
                আমরা কেমন মানুষ
                <br />
                <span className='text-[#34483C]'>খুঁজছি?</span>
              </h2>

              <div className='w-16 h-[3px] bg-[#34483C] mt-8' />
            </div>

            <div className='lg:col-span-8 grid sm:grid-cols-2 gap-4'>
              {requirements.map(item => {
                const Icon = item.icon

                return (
                  <div
                    key={item.number}
                    className='bg-[#F8F7F4] border border-[#D3CFC7] p-7 sm:p-8 hover:border-[#34483C] transition-colors'
                  >
                    <div className='flex justify-between items-center mb-7'>
                      <span className='text-sm font-semibold text-[#34483C]'>
                        {item.number}
                      </span>

                      <Icon
                        size={25}
                        strokeWidth={1.5}
                        className='text-[#34483C]'
                      />
                    </div>

                    <h3 className='text-xl sm:text-2xl font-bold mb-3'>
                      {item.title}
                    </h3>

                    <p className='text-[#69665F] leading-8'>
                      {item.description}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* APPLICATION PROCESS */}
      <section className='bg-[#F8F7F4] border-y border-[#D3CFC7] px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto'>
          <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-12'>
            <div>
              <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-4'>
                Application Process
              </p>

              <h2 className='text-3xl sm:text-5xl font-bold'>
                আবেদন প্রক্রিয়া
              </h2>
            </div>

            <p className='text-[#77736C] max-w-sm leading-7'>
              খবরনামার সঙ্গে যুক্ত হওয়ার প্রক্রিয়াটি সহজ ও স্বচ্ছ রাখার চেষ্টা
              করা হয়।
            </p>
          </div>

          <div className='grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#D9D5CD]'>
            {applicationSteps.map(item => {
              const Icon = item.icon

              return (
                <div
                  key={item.number}
                  className='p-7 sm:p-8 border-r border-b border-[#D9D5CD]'
                >
                  <div className='flex items-center justify-between mb-10'>
                    <span className='text-3xl font-bold text-[#34483C]'>
                      {item.number}
                    </span>

                    <Icon
                      size={26}
                      strokeWidth={1.5}
                      className='text-[#34483C]'
                    />
                  </div>

                  <h3 className='text-xl font-bold mb-4'>{item.title}</h3>

                  <p className='text-[#69665F] leading-8'>{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* APPLICATION CTA */}
      <section className='px-4 sm:px-6 lg:px-8 py-16 sm:py-24'>
        <div className='max-w-7xl mx-auto bg-[#34483C] text-[#F8F7F4] px-7 sm:px-14 py-14 sm:py-20 text-center'>
          <p className='text-[#C3D0C5] text-xs uppercase tracking-[0.25em] font-semibold mb-6'>
            Join Our Team
          </p>

          <h2 className='text-[#F8F7F4] text-3xl sm:text-5xl font-bold mb-6 leading-tight'>
            আপনার সম্ভাবনাকে প্রকাশ করুন।
          </h2>

          <p className='text-[#D5DED6] max-w-2xl mx-auto leading-8 mb-9'>
            আপনি যদি সংবাদমাধ্যমে কাজ করতে আগ্রহী হন এবং সত্য ও দায়িত্বশীল
            সাংবাদিকতায় বিশ্বাস করেন, তাহলে আপনার CV আমাদের কাছে পাঠাতে পারেন।
          </p>

          <div className='flex flex-col items-center gap-5'>
            <p className='text-[#D5DED6] text-sm'>আপনার CV পাঠানোর ইমেইল</p>

            <a
              href={`mailto:${contact.email}`}
              className='text-lg sm:text-xl font-semibold text-[#F8F7F4] hover:text-[#C3D0C5] transition-colors break-all'
            >
              {contact.email}
            </a>

            <a
              href={applicationLink}
              className='inline-flex items-center gap-3 bg-[#F8F7F4] text-[#202020] px-7 py-4 font-bold hover:bg-[#E4E1DC] transition-colors'
            >
              ইমেইলে CV পাঠান
              <ArrowUpRight size={18} />
            </a>
          </div>

          <div className='border-t border-[#F8F7F4]/20 mt-12 pt-7'>
            <p className='text-[#C3D0C5] text-sm leading-8 max-w-3xl mx-auto'>
              বিঃদ্রঃ বর্তমানে নির্দিষ্ট কোনো পদে নিয়োগ চলছে— এমন ঘোষণা নয়।
              আগ্রহী প্রার্থীরা ভবিষ্যৎ সুযোগের জন্য তাঁদের CV পাঠাতে পারেন।
              নিয়োগসংক্রান্ত সিদ্ধান্ত ও যোগাযোগ কর্তৃপক্ষের পর্যালোচনার
              ভিত্তিতে হবে।
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Career
