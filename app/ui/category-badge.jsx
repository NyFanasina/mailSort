import { formatDate } from "../lib/utils";

export default function CategoryBadge({ category, receivedAt }) {
  const style = categoryStyles[category];

  return (
    <div className="flex flex-col items-end gap-2.5">
      <span className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${style}`}>{category}</span>
      <span className="text-xs text-gray-400">{formatDate(receivedAt)}</span>
    </div>
  );
}

// Couleurs de badge par catégorie
const categoryStyles = {
  "client-vip": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "reclamation-client": "bg-red-50 text-red-500 border-red-200",
  client: "bg-sky-50 text-sky-700 border-sky-200",
  facture: "bg-amber-50 text-amber-700 border-amber-200",
  newsletter: "bg-violet-50 text-violet-700 border-violet-200",
  spam: " border-gray-200 bg-white text-gray-500",
  interne: "bg-gray-500 text-white border-gray-600",
};
