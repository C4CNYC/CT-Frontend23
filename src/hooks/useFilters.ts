import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import _ from "lodash";

import { BaseSearchInterface } from "@utils";

export const DEFAULT_TAKE_PER_PAGE = 10;

const defaultFilter: BaseSearchInterface = {
  page: 1,
  take: 5,
};

export enum FilterMode {
  local,
  // pase url query and put it into filters data
  // use only for page prupose
  global,
}
export type SetFilterType = (name: string | string[], value: string | number) => void;

interface IUseFilter<T> {
  filters: BaseSearchInterface & T;
  resetFilters: () => void;
  setFilter: SetFilterType;
}

export const useFilters = <T>(
  filters: T,
  mode: FilterMode = FilterMode.local
): IUseFilter<T> => {
  const router = useRouter();
  const query = router.query;
  const [filter, setFilter] = useState<BaseSearchInterface & T>({
    ...defaultFilter,
    ...filters,
  });

  useEffect(() => {
    if (!query || mode !== FilterMode.global) return;
    setFilter((prev) => ({
      ...filter,
      ..._.pick(query, Object.keys(filter)),
    }));
  }, [query]);

  return {
    filters: filter,
    resetFilters: () => {
      setFilter({
        ...defaultFilter,
        ...filters,
      });
    },
    setFilter: (name: string | string[], value: string | number) => {
      if (Array.isArray(name)) {
        setFilter({
          ...filter,
          page: 1,
          ...name.reduce((acc, cur) => {
            acc[cur] = value;
            return acc;
          }, {} as Record<string, string | number>),
        });
      } else {
        setFilter({
          ...filter,
          page: 1,
          [name]: value,
        });
        if (mode === FilterMode.global) {
          router.push(
            `${router.pathname}?${new URLSearchParams(
              _.omitBy(
                { ...filter, page: 1, [name]: value },
                (v) => !v
              ) as Record<string, string>
            )}`,
            undefined,
            { shallow: true }
          );
        }
      }
    },
  };
};
