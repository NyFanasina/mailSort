// Pagination fonctionnelle et réutilisable.
// Props :
//   totalItems   : nombre total d'éléments (ex: 97)
//   pageSize     : éléments par page (défaut: 10)
//   currentPage  : page active
//   onPageChange : callback appelé avec le nouveau numéro de page

// Génère la liste des pages avec des "..." si besoin. Ex : [1, 2, 3, "...", 9, 10]
function getPageNumbers(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  if (current <= 4) return [1, 2, 3, 4, 5, "...", total];
  if (current >= total - 3) return [1, "...", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "...", current - 1, current, current + 1, "...", total];
}

export default function Pagination({ totalItems, pageSize = 15, currentPage, onPageChange }) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const pages = getPageNumbers(currentPage, totalPages);

  const start = (currentPage - 1) * pageSize + 1;
  const end = Math.min(currentPage * pageSize, totalItems);

  function goTo(page) {
    if (page >= 1 && page <= totalPages && page !== currentPage) onPageChange(page);
  }

  return (
    <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3">
      {/* Mobile : Précédent / Suivant */}
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => goTo(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600
                     hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Précédent
        </button>
        <button
          onClick={() => goTo(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600
                     hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Suivant
        </button>
      </div>

      {/* Desktop */}
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <p className="text-sm text-gray-500">
          <span className="font-medium text-gray-700">{start}</span> à{" "}
          <span className="font-medium text-gray-700">{end}</span> sur{" "}
          <span className="font-medium text-gray-700">{totalItems}</span> résultats
        </p>

        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-lg shadow-sm">
          <button
            onClick={() => goTo(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded-l-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500
                       hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus:z-10"
            aria-label="Page précédente"
          >
            ‹
          </button>

          {pages.map((page, i) =>
            page === "..." ? (
              <span key={`dots-${i}`} className="border border-gray-200 bg-white px-4 py-2 text-sm text-gray-400">
                …
              </span>
            ) : (
              <button
                key={page}
                onClick={() => goTo(page)}
                aria-current={page === currentPage ? "page" : undefined}
                className={
                  page === currentPage
                    ? "z-10 border border-emerald-700 bg-emerald-700 px-4 py-2 text-sm font-semibold text-white"
                    : "border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 focus:z-10"
                }
              >
                {page}
              </button>
            ),
          )}

          <button
            onClick={() => goTo(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded-r-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-500
                       hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed focus:z-10"
            aria-label="Page suivante"
          >
            ›
          </button>
        </nav>
      </div>
    </div>
  );
}
