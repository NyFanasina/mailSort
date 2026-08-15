"use client";

import { fetchMessages } from "@/app/lib/service";
import Filter from "@/app/ui/filter";
import MessageList from "@/app/ui/message-list";
import Pagination from "@/app/ui/pagination";
import MessagesPageSkeleton from "@/app/ui/skeletons/message-skeleton";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const PAGE_SIZE = 15;

export default function Page() {
  const [page, setPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("tous");

  const { data, isFetching, error } = useQuery({
    queryKey: ["messages", activeFilter],
    queryFn: () => fetchMessages(activeFilter),
  });

  // Messages de la page actuelle
  const startIndex = (page - 1) * PAGE_SIZE;
  const paginatedMessages = data?.messages.slice(startIndex, startIndex + PAGE_SIZE);

  function handleFilterChange(category) {
    setActiveFilter(category);
    setPage(1);
  }

  return (
    <div className="min-h-screen bg-gray-100 p-5 *:mb-3">
      <h1 className="text-2xl font-semibold text-gray-800">Messages</h1>

      <Filter activeFilter={activeFilter} setActiveFilter={handleFilterChange} />
      {isFetching ? (
        <MessagesPageSkeleton />
      ) : (
        <>
          <MessageList messages={paginatedMessages} />
          <Pagination
            totalItems={data?.messages.length}
            pageSize={PAGE_SIZE}
            currentPage={page}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
