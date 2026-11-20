import React from 'react'
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  ArrowUpRight,
  Send,
  Building2,
  Newspaper
} from 'lucide-react'

const BRAND = {
  primary: '#202020',
  background: '#E4E1DC',
  surface: '#F8F7F4',
  accent: '#34483C'
}

const contactInfo = {
  email: 'contact@khobornama.com',
  phone: '01923-130565',
  whatsapp: '8801923130565',
  address: 'Sarulia, Demra, Dhaka.',
  publisher: 'DNKM'
}

const Contact = () => {
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

        <div className='relative max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-16 sm:pt-24 sm:pb-24'>
          <div className='flex items-center gap-3 mb-8'>
            <span className='w-9 h-[2px] bg-[#A9B9AB]' />
            <span className='text-[#A9B9AB] text-xs font-semibold uppercase tracking-[0.25em]'>
              Contact Khobornama
            </span>
          </div>

          <div className='grid lg:grid-cols-[1fr_auto] gap-12 items-end'>
            <div>
              <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.2] mb-7 text-[#fff]'>
                যোগাযোগ
                <br />
                <span className='text-[#A9B9AB]'>করুন আমাদের সঙ্গে।</span>
              </h1>

              <p className='text-[#D0CEC8] text-base sm:text-lg leading-9 max-w-2xl'>
                খবরনামার সঙ্গে যোগাযোগ করতে চান? আপনার মতামত, পরামর্শ,
                সংবাদসংক্রান্ত তথ্য কিংবা যেকোনো প্রয়োজনে আমাদের সঙ্গে যোগাযোগ
                করুন।
              </p>
            </div>

            {/* WHITE LOGO ON DARK BACKGROUND */}
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

      {/* CONTACT INFORMATION */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
        <div className='grid lg:grid-cols-12 gap-12 lg:gap-20'>
          <div className='lg:col-span-4'>
            <p className='text-[#34483C] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
              Get In Touch
            </p>

            <h2 className='text-3xl sm:text-4xl font-bold leading-tight mb-6'>
              আমাদের সঙ্গে
              <br />
              যোগাযোগের মাধ্যম
            </h2>

            <p className='text-[#69665F] leading-8'>
              আপনার যেকোনো প্রশ্ন, মতামত ও পরামর্শ আমাদের কাছে গুরুত্বপূর্ণ।
              নিচের যোগাযোগের মাধ্যমগুলো ব্যবহার করে আমাদের সঙ্গে যুক্ত হতে
              পারেন।
            </p>

            <div className='mt-10 border-l-2 border-[#34483C] pl-5'>
              <p className='text-[#202020] font-semibold text-lg'>খবরনামা</p>
              <p className='text-[#34483C] text-sm mt-1'>
                Bengali News & Media
              </p>
            </div>
          </div>

          <div className='lg:col-span-8 grid sm:grid-cols-2 gap-4'>
            {/* EMAIL */}
            <a
              href={`mailto:${contactInfo.email}`}
              className='group bg-[#F8F7F4] text-[#202020] p-7 sm:p-9 border border-[#D3CFC7] hover:bg-[#E4E1DC] transition-colors'
            >
              <div className='flex justify-between items-start mb-10'>
                <div className='w-12 h-12 bg-[#34483C] text-white flex items-center justify-center'>
                  <Mail size={23} />
                </div>

                <ArrowUpRight
                  size={21}
                  className='text-[#34483C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'
                />
              </div>

              <p className='text-[#77736C] text-sm mb-2'>ইমেইল ঠিকানা</p>

              <h3 className='text-lg sm:text-xl font-bold break-all'>
                {contactInfo.email}
              </h3>

              <p className='text-[#34483C] text-sm font-semibold mt-5'>
                ইমেইল পাঠান
              </p>
            </a>

            {/* PHONE */}
            <a
              href={`tel:${contactInfo.phone}`}
              className='group bg-[#F8F7F4] text-[#202020] p-7 sm:p-9 border border-[#D3CFC7] hover:bg-[#E4E1DC] transition-colors'
            >
              <div className='flex justify-between items-start mb-10'>
                <div className='w-12 h-12 bg-[#34483C] text-white flex items-center justify-center'>
                  <Phone size={23} />
                </div>

                <ArrowUpRight
                  size={21}
                  className='text-[#34483C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'
                />
              </div>

              <p className='text-[#77736C] text-sm mb-2'>ফোন নম্বর</p>

              <h3 className='text-2xl font-bold'>{contactInfo.phone}</h3>

              <p className='text-[#34483C] text-sm font-semibold mt-5'>
                কল করুন
              </p>
            </a>

            {/* WHATSAPP */}
            <a
              href={`https://wa.me/${contactInfo.whatsapp}`}
              target='_blank'
              rel='noopener noreferrer'
              className='group bg-[#F8F7F4] text-[#202020] p-7 sm:p-9 border border-[#D3CFC7] hover:bg-[#E4E1DC] transition-colors'
            >
              <div className='flex justify-between items-start mb-10'>
                <div className='w-12 h-12 bg-[#34483C] text-white flex items-center justify-center'>
                  <MessageCircle size={23} />
                </div>

                <ArrowUpRight
                  size={21}
                  className='text-[#34483C] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform'
                />
              </div>

              <p className='text-[#77736C] text-sm mb-2'>WhatsApp যোগাযোগ</p>

              <h3 className='text-2xl font-bold'>{contactInfo.phone}</h3>

              <p className='text-[#34483C] text-sm font-semibold mt-5'>
                WhatsApp-এ মেসেজ দিন
              </p>
            </a>

            {/* ADDRESS */}
            <div className='bg-[#F8F7F4] text-[#202020] p-7 sm:p-9 border border-[#D3CFC7]'>
              <div className='flex justify-between items-start mb-10'>
                <div className='w-12 h-12 bg-[#34483C] text-white flex items-center justify-center'>
                  <MapPin size={23} />
                </div>

                <MapPin size={21} className='text-[#34483C]' />
              </div>

              <p className='text-[#77736C] text-sm mb-2'>আমাদের ঠিকানা</p>

              <h3 className='text-xl font-bold leading-8'>
                {contactInfo.address}
              </h3>

              <p className='text-[#77736C] text-sm mt-5'>Bangladesh</p>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLISHER */}
      <section className='border-y border-[#D3CFC7] bg-[#F8F7F4]'>
        <div className='max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16'>
          <div className='grid sm:grid-cols-2 gap-10'>
            <div className='flex items-start gap-5'>
              <div className='w-12 h-12 shrink-0 border border-[#D3CFC7] flex items-center justify-center text-[#34483C]'>
                <Building2 size={23} />
              </div>

              <div>
                <p className='text-[#77736C] text-sm mb-2'>প্রকাশক</p>
                <h3 className='text-2xl font-bold text-[#202020]'>
                  {contactInfo.publisher}
                </h3>
              </div>
            </div>

            <div className='flex items-start gap-5'>
              <div className='w-12 h-12 shrink-0 border border-[#D3CFC7] flex items-center justify-center text-[#34483C]'>
                <Newspaper size={23} />
              </div>

              <div>
                <p className='text-[#77736C] text-sm mb-2'>সংবাদমাধ্যম</p>
                <h3 className='text-2xl font-bold text-[#202020]'>খবরনামা</h3>
                <p className='text-[#77736C] text-sm mt-1'>
                  Khobornama Bengali News & Media
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className='max-w-7xl mx-auto px-5 sm:px-8 py-16 sm:py-24'>
        <div className='bg-[#202020] text-[#F8F7F4] px-7 sm:px-14 py-14 sm:py-16 text-center'>
          <div className='w-14 h-14 bg-[#34483C] flex items-center justify-center mx-auto mb-7'>
            <Send size={24} className='text-white' />
          </div>

          <p className='text-[#A9B9AB] text-xs font-bold uppercase tracking-[0.2em] mb-5'>
            We Are Here To Listen
          </p>

          <h2 className='text-[#F8F7F4] text-3xl sm:text-5xl font-bold mb-6'>
            আপনার মতামত আমাদের জানান।
          </h2>

          <p className='text-[#B8B5AE] max-w-xl mx-auto leading-8 mb-9'>
            খবরনামা সম্পর্কিত যেকোনো বিষয়ে আমাদের ইমেইল করুন। আমরা আপনার
            যোগাযোগকে গুরুত্ব দিই।
          </p>

          <a
            href={`mailto:${contactInfo.email}`}
            className='inline-flex items-center justify-center gap-3 bg-[#34483C] text-white px-8 py-4 font-semibold hover:bg-[#40594A] transition-colors'
          >
            ইমেইল করুন
            <ArrowUpRight size={19} />
          </a>
        </div>
      </section>
    </main>
  )
}

export default Contact
