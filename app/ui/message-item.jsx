import { useMutation, useQueryClient } from "@tanstack/react-query";
import { VALID_CATEGORIES } from "../lib/store";
import CategoryBadge from "./category-badge";
import clsx from "clsx";
import { MutateCategory } from "../lib/service";

export default function MessageItem({ message, selectedId, setSelectedId }) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: MutateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
  });

  function handleReclassify(id, newCategory) {
    mutate({ id, category: newCategory });
  }

  return (
    <div
      onClick={() => setSelectedId(message.id === selectedId ? null : message.id)}
      className={clsx("hover:bg-gray-50", {
        "bg-gray-50  border-gray-300 ": selectedId === message.id,
      })}
    >
      <div className="flex justify-between items-baseline w-full py-1 px-3">
        <div className="">
          <p
            className={clsx({
              "text-gray-600": message.read,
              "font-semibold": !message.read,
            })}
          >
            {message.from.name}
          </p>
          <p
            className={clsx("text-sm", {
              "text-gray-500": message.read,
              "font-medium text-gray-800": !message.read,
            })}
          >
            {message.subject}
          </p>
        </div>

        <CategoryBadge category={message.category} receivedAt={message.receivedAt} />
      </div>

      {selectedId === message.id && (
        <div className="mx-5 mb-2 p-5 py-1 text-sm text-gray-700 whitespace-pre-line border border-gray-300 rounded">
          {message.body}
          <div className="flex justify-between">
            <p className="mt-3 text-xs text-gray-400">{message.from.email}</p>
            <p>
              <select
                defaultValue={message.category}
                onChange={(e) => handleReclassify(message.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
                className="rounded-lg border border-gray-200 bg-white px-2 py-1 text-xs text-gray-600
                             focus:outline-none focus:ring-2 focus:ring-emerald-600 cursor-pointer"
              >
                {VALID_CATEGORIES.map((category, key) => (
                  <option key={key} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
