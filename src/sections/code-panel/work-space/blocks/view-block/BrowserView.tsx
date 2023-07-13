import React, { useState } from "react";

import { useDebounceCallback } from "@hooks";

import SkeletonViewBlock from "./SkeletonViewBlock";

interface IBrowserView {
  value: string;
}

const BrowserView = ({ value }: IBrowserView): React.ReactElement => {
  const [staticValue, setStaticValue] =
    useState<React.ComponentProps<any>>(value);
  const handleDebouncedCallback = useDebounceCallback(1500);

  handleDebouncedCallback(() => {
    setStaticValue(value);
  });

  if (!value) {
    return (
      <>
        <SkeletonViewBlock />
      </>
    );
  }

  return (
    <iframe
      style={{
        border: 0,
        width: "100%",
        height: "100%",
      }}
      src={"data:text/html," + encodeURIComponent(staticValue)}
    />
  );
};

export default BrowserView;
