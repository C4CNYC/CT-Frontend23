import { useState } from "react";

export type BaseFiltersType = {
  page: number;
  take: number;
};
const defaultFilter: BaseFiltersType = {
  page: 1,
  take: 10,
};
export const useFilters = <T>(filters: T) => {
  const [filter, setFilter] = useState<BaseFiltersType & T>({
    ...defaultFilter,
    ...filters,
  });

  return {
    filters: filter,
    resetFilters: () => {
      setFilter({
        ...defaultFilter,
        ...filters,
      });
    },
    setFilter: (name: string, value: string | number) => {
      setFilter({
        ...filter,
        page: 1,
        [name]: value,
      });
    },
  };
};
