import { useState } from 'react';

type FetchFunction<T> = (params: { page: number; pageSize: number }) => Promise<{ items: T[]; totalCount: number }>;

export function usePagination<T>(
  fetchFn: FetchFunction<T>,
  initialItems: T[],
  initialTotalCount: number,
  pageSize = 4
) {
  const [items, setItems] = useState<T[]>(initialItems);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [loading, setLoading] = useState(false);

  const isEnd = items.length >= totalCount;

  const loadMore = async () => {
    if (loading || isEnd) return;
    setLoading(true);
    const res = await fetchFn({ page: page + 1, pageSize });
    setLoading(false);
    if (res) {
      setItems((prev) => [...prev, ...res.items]);
      setPage(page + 1);
      setTotalCount(res.totalCount);
    }
  };

  return { items, loading, isEnd, loadMore };
}
