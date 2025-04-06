import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  currentPage: number;
  totalPages: number;
  fetchCars: (currentPage: number) => void;
};

export const PaginationItens = ({
  currentPage,
  totalPages,
  fetchCars,
}: Props) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      fetchCars(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      fetchCars(currentPage - 1);
    }
  };

  return (
    <Pagination className="my-3">
      <PaginationContent>
        <PaginationItem>
          <button
            className="cursor-pointer disabled:opacity-0 disabled:cursor-default"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink className="bg-gray-300">{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <button
            className="cursor-pointer disabled:opacity-0 disabled:cursor-default"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
