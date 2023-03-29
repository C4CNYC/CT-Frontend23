import _ from "lodash";
import { useRouter } from "next/router";
import { useLayoutEffect, useState } from "react";
import { BaseSearchInterface } from "src/utils/baseRequest.intergace";

export const DEFAULT_TAKE_PER_PAGE = 10;

const defaultFilter: BaseSearchInterface = {
  page: 1,
  take: DEFAULT_TAKE_PER_PAGE,
};

export enum FilterMode {
  local,
  // pase url query and put it into filters data
  // use only for page prupose
  global,
}
export type SetFilterType = (name: string, value: string | number) => void;

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

  useLayoutEffect(() => {
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
    setFilter: (name: string, value: string | number) => {
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
    },
  };
};
