// Skeleton correspondant à la structure exacte de MessageList / MessageItem :
// même conteneur (divide-y, rounded-xl, bg-white), même padding par ligne (py-1 px-3),
// nom + sujet à gauche, badge de catégorie + date à droite.
// Usage :
//   {isLoading ? <MessageListSkeleton count={PAGE_SIZE} /> : <MessageList messages={paginatedMessages} />}

function MessageItemSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="flex justify-between items-baseline w-full py-1 px-3">
        {/* Expéditeur + sujet */}
        <div>
          <div className="h-4 w-32 rounded bg-gray-200" />
          <div className="mt-1.5 h-3.5 w-52 rounded bg-gray-200" />
        </div>

        {/* CategoryBadge : badge + date */}
        <div className="flex flex-col items-end gap-1">
          <div className="h-5 w-24 rounded-full bg-gray-200" />
          <div className="h-3 w-14 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function MessageListSkeleton({ count = 15 }) {
  return (
    <div className="divide-y divide-gray-200 rounded-xl bg-white overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <MessageItemSkeleton key={i} />
      ))}
    </div>
  );
}
