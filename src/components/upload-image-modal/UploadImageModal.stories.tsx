import type { Meta } from "@storybook/react";
import { SnackbarProvider, useSnackbar } from "notistack";

import { UploadImageModal, UploadImageProps } from "./index";

const Component: Meta<typeof UploadImageModal> = {
  component: UploadImageModal,
  title: "UploadImageModal",
};

export default Component;

const ExampleWrapper = ({ children }: any) => {
  return <SnackbarProvider>{children}</SnackbarProvider>;
};

const ExampleComponent = ({ onUpload, ...props }: UploadImageProps) => {
  const { enqueueSnackbar } = useSnackbar();

  const onUploadCustom = async (
    data: File,
    id: string | undefined
  ): Promise<void> => {
    try {
      const file = new FormData();
      file.append("file", data);
      if (!id) {
        return;
      } else {
        // console.log({ id, file });
      }
      enqueueSnackbar("Image updated");
    } catch (error: any) {
      enqueueSnackbar("Image not updated", { variant: "error" });
    }
  };

  return (
    <SnackbarProvider>
      <UploadImageModal onUpload={onUploadCustom} {...props} />
    </SnackbarProvider>
  );
};

export const Default: Meta<typeof UploadImageModal> = {
  render: (args) => (
    <ExampleWrapper>
      <ExampleComponent {...args} />
    </ExampleWrapper>
  ),
  args: {
    id: "21341",
    color: "green",
  },
};
