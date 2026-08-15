const WIDTHS = ["w-16", "w-28", "w-24", "w-32", "w-20", "w-28"];

export default function FilterSkeleton({ count = WIDTHS.length }) {
  return (
    <div className="flex flex-wrap gap-1.5 animate-pulse">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={`h-8 ${WIDTHS[i % WIDTHS.length]} rounded-full bg-gray-200`} />
      ))}
    </div>
  );
}
