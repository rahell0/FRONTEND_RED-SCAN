
export default function HistoryPagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 px-4 py-4">
      <p className="text-sm text-gray-500">
        Halaman {currentPage} dari {totalPages}
      </p>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="shrink-0 rounded-lg border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Sebelumnya
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`h-8 min-w-8 shrink-0 rounded-lg px-2 text-sm ${
                currentPage === page
                  ? "bg-blue-600 text-white"
                  : "border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="shrink-0 rounded-lg border px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-40"
        >
          Berikutnya
        </button>
      </div>
    </div>
  );
}
