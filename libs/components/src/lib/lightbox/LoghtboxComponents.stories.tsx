import type { Meta } from "@storybook/react";
import { LightboxComponent } from "./LightboxComponent";

const Component: Meta<typeof LightboxComponent> = {
  component: LightboxComponent,
  title: "LightboxComponent/LightboxComponent",
};

export default Component;

export const Default = {
  args: {
    index: 1,
    open: true,
    slides: [
      {
        id: "123",
        name: "Name",
        createdAt: "Wed Jun 28 2023 01:30:11 GMT+0300 (Eastern European Summer Time)",
        messages: [
          "First message",
          "Second message",
        ],
        message: "Message",
        avatar: "avatar",
        messageType: "default",
        cardIds: ["1", "2", "3"]
      },
      {
        id: "1234",
        name: "Name",
        createdAt: "Wed Jun 28 2023 01:30:11 GMT+0300 (Eastern European Summer Time)",
        messages: [
          "First message",
          "Second message",
        ],
        message: "Message",
        avatar: "avatar",
        messageType: "default",
        cardIds: ["1", "2", "3"]
      },
      {
        id: "12345",
        name: "Name",
        createdAt: "Wed Jun 28 2023 01:30:11 GMT+0300 (Eastern European Summer Time)",
        messages: [
          "First message",
          "Second message",
        ],
        message: "Message",
        avatar: "avatar",
        messageType: "default",
        cardIds: ["1", "2", "3"]
      },
    ]
  },
};
