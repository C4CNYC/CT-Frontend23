import type { Meta } from "@storybook/react";
import { SimpleInfiniteList } from "./SimpleInfiniteList";

const Component: Meta<typeof SimpleInfiniteList> = {
  component: SimpleInfiniteList,
  title: "SimpleInfiniteList/SimpleInfiniteList",
};

export default Component;

export const Default = {
  args: {
    onLoadMore: () => {},
    hasNextPage: true,
    loading: false,
    children: <>
        <h1>Simple Infinite List</h1>
    </>
  },
};
