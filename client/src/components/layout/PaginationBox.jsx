/* eslint-disable react/prop-types */
import {
  Pagination,
  PaginationItem,
  PaginationContent,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function PaginationBox({ totalPage, currentPage, paginate }) {
  const handlePageChange = (pageNumber) => {
    paginate.setValues({ ...paginate.values, page: pageNumber });
  };

  const isCurrentPage = (pageNumber) => pageNumber === currentPage;

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <Button
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ArrowLeft />
          </Button>
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPage }, (_, index) => {
          const pageNumber = index + 1;
          return (
            <PaginationItem key={pageNumber}>
              <Button
                disabled={isCurrentPage(pageNumber)}
                variant="outline"
                onClick={() => handlePageChange(pageNumber)}
                className={`${
                  isCurrentPage(pageNumber) ? "bg-blue-500 text-white" : ""
                } border hover:bg-blue-500/80 hover:text-white duration-300`}
              >
                {pageNumber}
              </Button>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <Button
            onClick={() =>
              currentPage < totalPage && handlePageChange(currentPage + 1)
            }
            disabled={currentPage === totalPage}
          >
            <ArrowRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
