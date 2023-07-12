import { useState } from "react";

import type { Meta } from "@storybook/react";

import { Typography } from "@mui/material";

import { fData } from "@utils";

import UploadAvatar from "./UploadAvatar";
import { UploadProps } from "./types";

const Component: Meta<typeof UploadAvatar> = {
  component: UploadAvatar,
  title: "Upload/UploadAvatar",
};

export default Component;

const ExampleComponent = ({ onUpload, ...props }: UploadProps) => {
  const [value, setValue] = useState<File>();

  const onUploadCustom = async (data: File[]): Promise<void> => {
    const file = data[0];

    // const newFile = Object.assign(file, {
    //     preview: URL.createObjectURL(file),
    // });
    if (file) {
      setValue(file);
    }
  };

  return <UploadAvatar onDrop={onUploadCustom} file={value} {...props} />;
};

export const Default: Meta<typeof UploadAvatar> = {
  render: (args) => <ExampleComponent {...args} />,
  args: {
    multiple: false,
    accept: { "image/*": [] },
    helperText: (
      <Typography
        variant="caption"
        sx={{
          mt: 2,
          mx: "auto",
          display: "block",
          textAlign: "center",
          color: "text.secondary",
        }}
      >
        Allowed *.jpeg, *.jpg, *.png, *.gif
        <br /> max size of {fData(3145728)}
      </Typography>
    ),
    error: false,
    useFsAccessApi: false,
    autoFocus: false,
    disabled: false,
    noDragEventsBubbling: false,
    noDrag: false,
    noClick: false,
    maxSize: 100000,
    minSize: 0,
    maxFiles: 10,
  },
};
