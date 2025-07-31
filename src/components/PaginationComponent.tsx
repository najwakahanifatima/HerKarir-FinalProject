import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "@/components/ui/pagination"

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    maxVisible?: number
}

export default function PaginationComponent({
    currentPage,
    totalPages,
    onPageChange,
    maxVisible = 5
} : PaginationComponentProps) {
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = startPage + maxVisible - 1;

    if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxVisible + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }

    return(
        <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        {/* Previous Button */}
                        <PaginationPrevious
                            onClick={() => onPageChange(Math.max(currentPage-1, 1))}
                            className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>

                    {/* First Page + Dots*/}
                    { startPage > 1 && (
                        <>
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => onPageChange(1)}> 1 </PaginationLink>
                            </PaginationItem>
                            { startPage > 2 && (<span className="px-2"> ... </span>)}
                        </>
                    )}

                    {/* Page Numbers */}
                    {pages.map((page) => (
                        <PaginationItem key={page}>
                            <PaginationLink
                                isActive={currentPage === page}
                                onClick={() => onPageChange(page)}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    ))}

                    {/* Last Page + Dots*/}
                    { endPage < totalPages && (
                        <>
                            { endPage < totalPages - 1 && (<span className="px-2"> ... </span>)}
                            <PaginationItem>
                                <PaginationLink
                                    onClick={() => onPageChange(totalPages)}> {totalPages} </PaginationLink>
                            </PaginationItem>
                        </>
                    )}

                    {/* Next Button */}
                    <PaginationItem>
                        <PaginationNext
                            onClick={() => onPageChange(Math.min(currentPage+1, totalPages))}
                            className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                        />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
    )
}