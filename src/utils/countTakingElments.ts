export const getCountTakingElment = (
  itemCount: number,
  take: number
): number => {
  if (!itemCount || !take) return 0;
  return itemCount > take ? itemCount - take : 10 - (take - itemCount);
};
