"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPagination, updateUrlWithQuery } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

interface PaginatorProps extends React.ComponentProps<"nav"> {
  total: number;
  limit: number;
  currentPage: number;
  baseUrl: string;
}

export default function Paginator({
  total,
  limit,
  currentPage,
  baseUrl,
  ...props
}: PaginatorProps) {
  const maxPage = Math.ceil(total / limit);

  const pagination = getPagination(currentPage, maxPage);

  return (
    <div className="overflow-x-auto">
      <Pagination {...props}>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={updateUrlWithQuery(baseUrl, { page: currentPage - 1 })}
              className={cn(
                currentPage === 1 &&
                  "pointer-events-none cursor-not-allowed text-gray-500"
              )}
            />
          </PaginationItem>

          {pagination.map((page, index) => {
            return (
              <Fragment key={index}>
                {typeof page !== "number" ? (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem>
                    <PaginationLink
                      href={updateUrlWithQuery(baseUrl, { page })}
                      isActive={currentPage === page}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )}
              </Fragment>
            );
          })}

          <PaginationItem>
            <PaginationNext
              aria-disabled={maxPage === currentPage}
              href={updateUrlWithQuery(baseUrl, { page: currentPage + 1 })}
              className={cn(
                maxPage === currentPage &&
                  "pointer-events-none cursor-not-allowed text-gray-500"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
