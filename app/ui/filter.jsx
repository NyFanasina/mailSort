import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import FilterSkeleton from "./skeletons/filter-skeleton";
import { fetchStats } from "../lib/service";

export default function Filter({ activeFilter, setActiveFilter }) {
  const { data, isFetching } = useQuery({
    queryKey: ["stats"],
    queryFn: fetchStats,
  });

  let statsArray = Object.entries(data?.byCategory || {});
  statsArray.unshift(["tous", data?.total]);

  if (isFetching) return <FilterSkeleton />;

  return (
    <div className="flex flex-wrap gap-1.5">
      {statsArray.map(([category, count], key) => (
        <button
          key={key}
          onClick={() => setActiveFilter(category)}
          disabled={activeFilter === category}
          className={clsx(
            "rounded-full px-3.5 py-1.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 border border-gray-200",
            {
              "bg-emerald-600 text-white": activeFilter === category,
              "bg-white text-gray-600 hover:bg-gray-50": activeFilter !== category,
            },
          )}
        >
          {category} ({count})
        </button>
      ))}
    </div>
  );
}
