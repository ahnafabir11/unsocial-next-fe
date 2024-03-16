import { ReadonlyURLSearchParams } from "next/navigation";

const getCurrentPageFromUrl = (pageParams: string | null) => {
  let currentPage = 1;
  const page = Number(pageParams);
  if (page > 1) return page;
  return currentPage;
};

export default function usePagination(
  searchParams: ReadonlyURLSearchParams,
  baseUrl: string
) {
  const currentPage = getCurrentPageFromUrl(searchParams.get("page"));
  const nextPageUrl = `${baseUrl}?page=${currentPage + 1}`;
  const previousPageUrl = `${baseUrl}?page=${currentPage - 1}`;

  return { currentPage, baseUrl, nextPageUrl, previousPageUrl };
}
