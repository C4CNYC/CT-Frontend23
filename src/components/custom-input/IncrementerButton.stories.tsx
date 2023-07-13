import { useEffect, useState } from "react";

import type { Meta } from "@storybook/react";
import { ThemeProvider } from "@theme/index";

import IncrementerButton, { IncrementerButtonProps } from "./IncrementerButton";

const Component: Meta<typeof IncrementerButton> = {
  component: IncrementerButton,
  title: "CustomInput/IncrementerButton",
};

export default Component;

const ExampleComponent = ({
  quantity,
  onIncrease,
  onDecrease,
  ...props
}: IncrementerButtonProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(quantity);
  }, [quantity]);

  return (
    <IncrementerButton
      quantity={count}
      onIncrease={() => {
        setCount((state) => state + 1);
      }}
      onDecrease={() => {
        setCount((state) => state - 1);
      }}
      {...props}
    />
  );
};

export const Default: Meta<typeof IncrementerButton> = {
  render: (args) => (
    <ThemeProvider>
      <ExampleComponent {...args} />
    </ThemeProvider>
  ),
  args: {
    quantity: 0,
    disabledIncrease: false,
    disabledDecrease: false,
  },
};
