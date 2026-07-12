import { useState, useCallback } from 'react';
import { PAGINATION_DEFAULTS } from '@/lib/constants';

interface UsePaginationResult {
  page: number;
  limit: number;
  search: string;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  setSearch: (search: string) => void;
  handlePageChange: (newPage: number) => void;
  handleLimitChange: (newLimit: number) => void;
  resetPagination: () => void;
}

export function usePagination(
  initialPage = PAGINATION_DEFAULTS.PAGE,
  initialLimit = PAGINATION_DEFAULTS.LIMIT
): UsePaginationResult {
  const [page, setPageState] = useState<number>(initialPage);
  const [limit, setLimitState] = useState<number>(initialLimit);
  const [search, setSearchState] = useState<string>('');

  const setPage = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  const setLimit = useCallback((newLimit: number) => {
    setLimitState(newLimit);
    setPageState(1); // Reset page to 1 when changing limit
  }, []);

  const setSearch = useCallback((newSearch: string) => {
    setSearchState(newSearch);
    setPageState(1); // Reset page to 1 on search change
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPageState(newPage);
  }, []);

  const handleLimitChange = useCallback((newLimit: number) => {
    setLimitState(newLimit);
    setPageState(1);
  }, []);

  const resetPagination = useCallback(() => {
    setPageState(initialPage);
    setLimitState(initialLimit);
    setSearchState('');
  }, [initialPage, initialLimit]);

  return {
    page,
    limit,
    search,
    setPage,
    setLimit,
    setSearch,
    handlePageChange,
    handleLimitChange,
    resetPagination,
  };
}
export default usePagination;
