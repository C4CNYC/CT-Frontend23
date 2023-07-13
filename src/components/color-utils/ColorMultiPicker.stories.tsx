import { useEffect, useState } from "react";

import type { Meta } from "@storybook/react";

import { ColorMultiPicker } from "./ColorMultiPicker";
import { ColorMultiPickerProps } from "./types";

const Component: Meta<typeof ColorMultiPicker> = {
  component: ColorMultiPicker,
  title: "ColorUtils/ColorMultiPicker",
};

export default Component;

const ExampleComponent = ({
  selected,
  onChangeColor,
  ...props
}: ColorMultiPickerProps) => {
  const [customSelectedColors, setCustomSelectedColors] = useState<string[]>([
    "",
  ]);

  useEffect(() => {
    setCustomSelectedColors(selected);
  }, [selected]);

  const onChange = (color: string) => {
    if (customSelectedColors.includes(color)) {
      setCustomSelectedColors((state) =>
        state.filter((item) => item !== color)
      );
    } else {
      setCustomSelectedColors((state) => [color, ...state]);
    }
  };

  return (
    <ColorMultiPicker
      selected={customSelectedColors}
      onChangeColor={onChange}
      {...props}
    />
  );
};

export const Default: Meta<typeof ColorMultiPicker> = {
  render: (args) => <ExampleComponent {...args} />,
  args: {
    colors: ["white", "lightgreen", "red", "darkblue"],
    selected: ["white", "red"],
  },
};
