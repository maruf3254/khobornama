
import { Link } from 'react-router-dom';
import {
  FiFacebook,
  FiYoutube,
  FiArrowUpRight,
  FiArrowUp,
} from 'react-icons/fi';

const categories = [
  { name: 'জাতীয়', slug: 'national' },
  { name: 'রাজনীতি', slug: 'politics' },
  { name: 'অর্থনীতি', slug: 'economy' },
  { name: 'আন্তর্জাতিক', slug: 'international' },
  { name: 'সারাদেশ', slug: 'country' },
  { name: 'খেলা', slug: 'sports' },
  { name: 'ধর্ম', slug: 'religion' },
  { name: 'স্বাস্থ্য', slug: 'health' },
];

const importantLinks = [
  { name: 'আমাদের সম্পর্কে', path: '/about' },
  { name: 'যোগাযোগ', path: '/contact' },
  { name: 'ক্যারিয়ার', path: '/career' },
  { name: 'বিজ্ঞাপন', path: '/advertisement' },
  { name: 'গোপনীয়তা নীতি', path: '/privacy' },
  { name: 'ব্যবহারের শর্তাবলি', path: '/terms' },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-[#202020] text-[#E4E1DC] ">

      {/* Main Footer */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Information */}
          <div className="lg:col-span-1">

            <Link to="/" className="inline-flex items-center">
              <img
                src="https://i.imgur.com/Xkp2QhW.png"
                alt="খবরনামা"
                className="h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>

            <p className="mt-5 text-sm leading-7 text-white/60 max-w-xs">
              সত্য ও বস্তুনিষ্ঠ সংবাদ পরিবেশনে আমরা প্রতিশ্রুতিবদ্ধ।
              দেশ-বিদেশের সর্বশেষ খবর ও গুরুত্বপূর্ণ তথ্য জানতে
              থাকুন খবরনামার সঙ্গে।
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-[#34483C] hover:border-[#34483C] hover:text-white transition-all"
              >
                <FiFacebook size={18} />
              </a>

              <a
                href="https://www.youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-white/70 hover:bg-[#34483C] hover:border-[#34483C] hover:text-white transition-all"
              >
                <FiYoutube size={19} />
              </a>

            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-base font-bold text-white mb-6">
              সংবাদ বিভাগ
              <span className="block w-9 h-[2px] bg-[#34483C] mt-3" />
            </h3>

            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-x-3 gap-y-3">

              {categories.map((category) => (
                <li key={category.slug}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-1 inline-flex items-center transition-all"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h3 className="text-base font-bold text-white mb-6">
              গুরুত্বপূর্ণ লিংক
              <span className="block w-9 h-[2px] bg-[#34483C] mt-3" />
            </h3>

            <ul className="space-y-3">

              {importantLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-sm text-white/60 hover:text-white hover:translate-x-1 inline-flex items-center transition-all"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

          {/* Latest & Popular */}
          <div>
            <h3 className="text-base font-bold text-white mb-6">
              খবরনামা
              <span className="block w-9 h-[2px] bg-[#34483C] mt-3" />
            </h3>

            <p className="text-sm leading-7 text-white/60 mb-5">
              সর্বশেষ সংবাদ, আলোচিত খবর ও গুরুত্বপূর্ণ
              প্রতিবেদন পড়তে আমাদের সঙ্গে থাকুন।
            </p>

            <div className="space-y-3">

              <Link
                to="/latest"
                className="flex items-center justify-between gap-3 text-sm text-white/75 hover:text-white group transition"
              >
                সর্বশেষ সংবাদ
                <FiArrowUpRight className="text-[#A9B7AA] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

              <Link
                to="/popular"
                className="flex items-center justify-between gap-3 text-sm text-white/75 hover:text-white group transition"
              >
                জনপ্রিয় সংবাদ
                <FiArrowUpRight className="text-[#A9B7AA] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>

            </div>

          </div>

        </div>

        {/* Bottom Divider */}
        <div className="border-t border-white/10 mt-12 pt-6">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            <p className="text-xs sm:text-sm text-white/45 text-center md:text-left">
              © {currentYear} খবরনামা। সর্বস্বত্ব সংরক্ষিত।
            </p>

            <div className="flex items-center gap-5 text-xs sm:text-sm text-white/45">
              <Link
                to="/privacy"
                className="hover:text-white transition"
              >
                গোপনীয়তা
              </Link>

              <Link
                to="/terms"
                className="hover:text-white transition"
              >
                শর্তাবলি
              </Link>
            </div>

            <button
              onClick={scrollToTop}
              aria-label="উপরে যান"
              className="flex items-center gap-2 text-xs sm:text-sm text-white/60 hover:text-white transition"
            >
              উপরে যান
              <span className="w-8 h-8 rounded-full bg-[#34483C] flex items-center justify-center text-white">
                <FiArrowUp size={16} />
              </span>
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
};

export default Footer;
