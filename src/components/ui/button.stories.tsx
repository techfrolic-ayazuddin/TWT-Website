import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./button";

/**
 * Figma: `Button/Primary` 31:96 · `Button/Secondary` 31:199 ·
 * `Button/Outline` 31:302 · `Button/Inverse` 31:405.
 */
const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          "Four variants × three sizes. The Figma `State` axis is not a prop — hover, focus, pressed and disabled are CSS states, so interact with the buttons below to review them.",
      },
    },
  },
  args: { children: "Button" },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "inverse"],
    },
    size: { control: "select", options: ["large", "medium", "small"] },
    leadingIcon: { control: "text" },
    trailingIcon: { control: "text" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const SIZES = ["large", "medium", "small"] as const;

export const Playground: Story = {
  args: { variant: "primary", size: "medium" },
};

/** Figma `Button/Primary` — every size. */
export const Primary: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {SIZES.map((size) => (
        <Button key={size} variant="primary" size={size}>
          Request a consultation
        </Button>
      ))}
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {SIZES.map((size) => (
        <Button key={size} variant="secondary" size={size}>
          Explore services
        </Button>
      ))}
    </div>
  ),
};

export const Outline: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {SIZES.map((size) => (
        <Button key={size} variant="outline" size={size}>
          Read more
        </Button>
      ))}
    </div>
  ),
};

/** Inverse sits on a dark surface — Figma pairs it with `background/inverse`. */
export const Inverse: Story = {
  parameters: { backgrounds: { value: "inverse" } },
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      {SIZES.map((size) => (
        <Button key={size} variant="inverse" size={size}>
          Get in touch
        </Button>
      ))}
    </div>
  ),
};

/** Figma `Show leading icon` / `Show trailing icon` + `Leading/Trailing icon`. */
export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button trailingIcon="arrow-right">Trailing icon</Button>
      <Button leadingIcon="mail" variant="secondary">
        Leading icon
      </Button>
      <Button leadingIcon="calendar" trailingIcon="arrow-up-right" variant="outline">
        Both
      </Button>
      <Button leadingIcon="play" size="small">
        Small
      </Button>
    </div>
  ),
};

/** Disabled is the only Figma state that is a real attribute. */
export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button disabled>Primary</Button>
      <Button variant="secondary" disabled>
        Secondary
      </Button>
      <Button variant="outline" disabled>
        Outline
      </Button>
    </div>
  ),
};

/** All variants × sizes together, for side-by-side comparison with Figma. */
export const Matrix: Story = {
  render: () => (
    <div className="flex flex-col gap-8">
      {(["primary", "secondary", "outline"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-3">
          <p className="text-ui-overline text-text-muted">{variant}</p>
          <div className="flex flex-wrap items-center gap-4">
            {SIZES.map((size) => (
              <Button key={size} variant={variant} size={size} trailingIcon="arrow-right">
                {size}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};
