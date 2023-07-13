import { useState } from "react";

import type { Meta } from "@storybook/react";

import { voidFunction } from "@utils";

import {
  SimpleInfiniteList,
  SimpleInfiniteListProps,
} from "./SimpleInfiniteList";

const Component: Meta<typeof SimpleInfiniteList> = {
  component: SimpleInfiniteList,
  title: "SimpleInfiniteList",
};

export default Component;

const ExampleComponent = (props: SimpleInfiniteListProps) => {
  const [moreContent, setMoreContent] = useState(0);

  const uploadMoreContent = () => {
    setTimeout(() => {
      setMoreContent((state) => state + 1);
    }, 500);
  };

  return (
    <SimpleInfiniteList {...props} onLoadMore={uploadMoreContent}>
      <h1>Simple Infinite List start</h1>
      {Array(moreContent)
        .fill("")
        .map((item, i) => (
          <p key={i + item}>More content uploaded</p>
        ))}
      <h1>Simple Infinite List end</h1>
    </SimpleInfiniteList>
  );
};

export const Default: Meta<typeof SimpleInfiniteList> = {
  render: (args) => <ExampleComponent {...args} />,
  args: {
    onLoadMore: voidFunction,
    hasNextPage: true,
    loading: false,
  },
};
