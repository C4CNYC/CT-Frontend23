import type { Meta } from "@storybook/react";

import { ColorPreview } from "./ColorPreview";

const Component: Meta<typeof ColorPreview> = {
  component: ColorPreview,
  title: "ColorUtils/ColorPreview",
};

export default Component;

export const Default = {
  args: {
    colors: [
      "white",
      "lightgreen",
      "red",
      "darkblue",
      "white",
      "lightgreen",
      "red",
      "darkblue",
    ],
    limit: 4,
    useFlexGap: false,
  },
};
