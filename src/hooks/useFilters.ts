import { useState } from "react";
import { BaseSearchInterface } from "src/utils/baseRequest.intergace";

const defaultFilter: BaseSearchInterface = {
  page: 1,
  take: 10,
};
export const useFilters = <T>(filters: T) => {
  const [filter, setFilter] = useState<BaseSearchInterface & T>({
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
