import { DEFAULT_TAKE_PER_PAGE } from "@hooks/useFilters";

export const getCountTakingElment = (
  itemCount: number,
  take: number
): number => {
  if (!itemCount || !take) return 0;
  return itemCount > take
    ? itemCount - take
    : DEFAULT_TAKE_PER_PAGE - (take - itemCount);
};
