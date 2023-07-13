import type { Meta } from "@storybook/react";

import { DownloadButton } from "./DownloadButton";

const Component: Meta<typeof DownloadButton> = {
  component: DownloadButton,
  title: "FileThumbnail/DownloadButton",
};

export default Component;

export const Default = {
  args: {
    onDownload: () => {
      alert("downloading file");
    },
  },
};
