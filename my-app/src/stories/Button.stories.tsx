import type {Meta, StoryObj} from "@storybook/react";
import {fn} from "@storybook/test";
import {userEvent, within} from "@storybook/test";
import {IndexEntry} from "storybook/internal/types";
import {uuidv4} from "#lib/uuid.mock";

import {Button} from "./Button";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Example/Atoms/Button",
  component: Button,
  render: (args, {loaded: {todo}}) => <Button {...args} todo={todo} />,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
    options: {
      // The `a` and `b` arguments in this function have a type of `import('@storybook/types').IndexEntry`. Remember that the function is executed in a JavaScript environment, so use JSDoc for IntelliSense to introspect it.
      storySort: (a: IndexEntry, b: IndexEntry) =>
        a.id === b.id
          ? 0
          : a.id.localeCompare(b.id, undefined, {numeric: true}),
    },
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: {control: "color"},
    size: {
      control: "select",
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {onClick: fn(), label: "Button"},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
  },
  parameters: {
    backgrounds: {
      values: [{name: "black", value: "#333"}],
    },
  },
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    const test = canvas.getAllByText("test");

    console.log({test});
    await userEvent.click(button);
  },
  loaders: [
    async () => {
      const data = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      ).then(res => res.json());

      return {
        todo: data,
      };
    },
  ],
  tags: ["devos"],
  beforeEach: async () => {
    uuidv4.mockReturnValue("test");
  },
};

export const Secondary: Story = {
  args: {},
  play: async ({canvasElement}) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");

    await userEvent.click(button);
  },
};

export const Large: Story = {
  args: {
    size: "large",
    label: "Button",
  },
};

export const Small: Story = {
  args: {
    size: "small",
    label: "Button",
  },
};

export const Storytest: Story = {
  args: {
    primary: false,
    label: "Button",
  },
};

export const CombinedStory: Story = {
  play: async ({context, canvasElement}) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button");
    await Secondary.play?.(context);
    await Primary.play?.(context);

    await userEvent.click(button);
  },
};
