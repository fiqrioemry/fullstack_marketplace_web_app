/* eslint-disable react/prop-types */
const PaginationLayout = ({ totalPage, currentPage, searchForm }) => {
  if (totalPage <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPage) {
      searchForm.setFieldValue("page", page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* First Page Button */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        First
      </button>

      {/* Previous Page Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPage)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-2 rounded-md transition-all ${
              currentPage === pageNumber
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next Page Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPage}
        className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Next
      </button>

      {/* Last Page Button */}
      <button
        onClick={() => handlePageChange(totalPage)}
        disabled={currentPage === totalPage}
        className="px-3 py-2 bg-gray-200 rounded-md disabled:opacity-50"
      >
        Last
      </button>
    </div>
  );
};

export default PaginationLayout;
