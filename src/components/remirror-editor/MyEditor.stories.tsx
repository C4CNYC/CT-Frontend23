import type { Meta } from "@storybook/react";

import { MyEditor } from "./MyEditor";

const Component: Meta<typeof MyEditor> = {
  component: MyEditor,
  title: "MyEditor",
};

export default Component;

export const Default = {
  args: {
    editable: true,
    multimediaValue: "Multimedia value",
  },
};
