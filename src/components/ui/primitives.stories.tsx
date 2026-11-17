import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "./badge";
import { Icon, ICON_NAMES } from "./icon";
import { IconButton } from "./icon-button";
import { TextLink } from "./text-link";

/**
 * The remaining core primitives from Figma section 05, plus `Badge`.
 * Grouped so they can be compared against the Figma board in one pass.
 */
const meta = {
  title: "UI/Primitives",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/** Figma `Icon Button` 32:66 — 48×48, four styles. */
export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-4">
        <IconButton icon="arrow-right" label="Next" variant="primary" />
        <IconButton icon="arrow-left" label="Previous" variant="secondary" />
        <IconButton icon="plus" label="Add" variant="outline" />
        <IconButton icon="close" label="Close" variant="primary" disabled />
      </div>
      <div className="bg-background-inverse flex flex-wrap items-center gap-4 rounded-lg p-6">
        <IconButton icon="arrow-right" label="Next" variant="inverse" />
        <IconButton icon="menu" label="Menu" variant="inverse" />
        <IconButton icon="search" label="Search" variant="inverse" disabled />
      </div>
    </div>
  ),
};

/** Figma `Badge` — seven tones, no interaction states. */
export const Badges: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone="brand">Brand</Badge>
        <Badge tone="magenta">Magenta</Badge>
        <Badge tone="orange">Orange</Badge>
        <Badge tone="yellow">Yellow</Badge>
        <Badge tone="neutral">Neutral</Badge>
        <Badge tone="placeholder">Placeholder</Badge>
      </div>
      <div className="bg-background-inverse flex flex-wrap items-center gap-3 rounded-lg p-6">
        <Badge tone="inverse">Inverse</Badge>
      </div>
    </div>
  ),
};

/** Figma `Text Link` 32:102 — colour carries the state; no underline by design. */
export const TextLinks: Story = {
  render: () => (
    <div className="flex flex-col items-start gap-4">
      <TextLink href="#">Standalone link</TextLink>
      <TextLink href="#" icon="arrow-up-right">
        With trailing icon
      </TextLink>
      <TextLink href="#" underlineOnHover>
        Inline link (underlines on hover)
      </TextLink>
      <TextLink disabled>Disabled</TextLink>
    </div>
  ),
};

/** All 39 icons, read from the Figma `Icon/*` components. */
export const Icons: Story = {
  render: () => (
    <ul className="tablet:grid-cols-5 desktop:grid-cols-8 grid grid-cols-3 gap-4">
      {ICON_NAMES.map((name) => (
        <li
          key={name}
          className="border-border-subtle text-icon-default flex flex-col items-center gap-2 rounded-md border p-3"
        >
          <Icon name={name} size={24} />
          <span className="text-ui-caption text-text-muted text-center break-all">
            {name}
          </span>
        </li>
      ))}
    </ul>
  ),
};

/** Figma icon sizes come from `size/icon/*`: 16 / 20 / 24 / 32 / 48. */
export const IconSizes: Story = {
  render: () => (
    <div className="text-icon-brand flex items-end gap-5">
      {[16, 20, 24, 32, 48].map((size) => (
        <div key={size} className="flex flex-col items-center gap-2">
          <Icon name="sparkle" size={size} />
          <span className="text-ui-caption text-text-muted">{size}px</span>
        </div>
      ))}
    </div>
  ),
};
