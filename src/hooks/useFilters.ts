import { useState } from "react";

type FiltersType = {
  [key: string]: string | number;
};
const defaultFilter: FiltersType = {
  page: 1,
  take: 10,
};
export const useFilters = (filters: FiltersType = {}) => {
  const [filter, setFilter] = useState<FiltersType>({
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
    setFilter: (name: string, value: string) => {
      setFilter({
        ...filter,
        [name]: value,
      });
    },
  };
};
