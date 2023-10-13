import React, { type FC, useState } from "react";

import { useDebounceCallback } from "@hooks";

import SkeletonViewBlock from "../skeleton-view-box";

interface IBrowserView {
  value: string;
}

const BrowserView: FC<IBrowserView> = ({ value }) => {
  const [staticValue, setStaticValue] =
    useState<string>(value);
  const handleDebouncedCallback = useDebounceCallback(1500);

  handleDebouncedCallback(() => {
    setStaticValue(value);
  });

  if (!value) {
    return (
      <SkeletonViewBlock />
    );
  }

  return (
    <iframe
      style={IFRAME_STYLE}
      src={"data:text/html," + encodeURIComponent(staticValue)}
    />
  );
};

const IFRAME_STYLE = {
  border: 0,
  width: "100%",
  height: "100%",
}

export default BrowserView;
