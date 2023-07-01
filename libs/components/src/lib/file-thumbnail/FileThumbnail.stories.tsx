import type { Meta } from "@storybook/react";
import { FileThumbnail, FileIconProps } from "./FileThumbnail";
import { useState } from "react";

const Component: Meta<typeof FileThumbnail> = {
  component: FileThumbnail,
  title: "FileThumbnail/FileThumbnail",
};

export default Component;

const ExampleComponent = ({file, ...props}: FileIconProps) => {
    const [value, setValue] = useState<File | string>("")
    
    const onUploadCustom = async (
        data: any,
      ): Promise<void> => {
        const file = data[0];

        const newFile = Object.assign(file, {
            preview: URL.createObjectURL(file),
        });
        if (file) {
            setValue(file)
        }
        console.log(file)
      };

      return (
        <div style={{width: 200}}>
            <input type="file" onChange={async (e) => { await onUploadCustom(e.target.files); }}/>
            <FileThumbnail file={value} {...props} />
        </div>
    )
}

export const Default: Meta<typeof FileThumbnail>  = {
    render: (args) => <ExampleComponent {...args} />,
    args: {
        tooltip: true,
        imageView: true,
    },
};
