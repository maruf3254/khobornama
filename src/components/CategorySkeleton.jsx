
const CategorySkeleton = () => {
  return (
    <div
      className="min-h-screen bg-[#E4E1DC] py-8 md:py-12 animate-pulse"
      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-3 mb-5">
          <div className="h-3 w-12 rounded bg-[#202020]/10" />
          <div className="h-3 w-3 rounded bg-[#202020]/10" />
          <div className="h-3 w-20 rounded bg-[#202020]/10" />
        </div>

        {/* Category Header Skeleton */}
        <div className="border-b border-[#202020]/15 pb-6 mb-8">
          <div className="h-3 w-32 rounded bg-[#34483C]/20 mb-4" />
          <div className="h-10 md:h-12 w-40 md:w-56 rounded bg-[#202020]/10 mb-4" />
          <div className="h-4 w-64 max-w-full rounded bg-[#202020]/10" />
        </div>

        {/* News Count Skeleton */}
        <div className="flex justify-between items-center mb-6">
          <div className="h-4 w-28 rounded bg-[#202020]/10" />
          <div className="h-3 w-20 rounded bg-[#202020]/10" />
        </div>

        {/* News Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#F8F7F4] rounded-xl overflow-hidden border border-[#202020]/5"
            >
              {/* Image */}
              <div className="aspect-[16/10] bg-[#202020]/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_1.8s_infinite]" />
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-16 rounded bg-[#34483C]/15" />
                  <div className="h-3 w-20 rounded bg-[#202020]/10" />
                </div>

                <div className="h-5 w-full rounded bg-[#202020]/10 mb-2" />
                <div className="h-5 w-4/5 rounded bg-[#202020]/10 mb-4" />

                <div className="h-3 w-full rounded bg-[#202020]/10 mb-2" />
                <div className="h-3 w-3/4 rounded bg-[#202020]/10 mb-5" />

                <div className="flex items-center justify-between pt-3 border-t border-[#202020]/10">
                  <div className="h-3 w-20 rounded bg-[#202020]/10" />
                  <div className="h-3 w-12 rounded bg-[#202020]/10" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Skeleton */}
        <div className="flex justify-center items-center gap-3 mt-12">
          <div className="h-10 w-24 rounded-lg bg-[#202020]/10" />
          <div className="h-10 w-10 rounded-lg bg-[#34483C]/15" />
          <div className="h-10 w-10 rounded-lg bg-[#202020]/10" />
          <div className="h-10 w-10 rounded-lg bg-[#202020]/10" />
          <div className="h-10 w-24 rounded-lg bg-[#202020]/10" />
        </div>

      </div>
    </div>
  );
};

export default CategorySkeleton;
