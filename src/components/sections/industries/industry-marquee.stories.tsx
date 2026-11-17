import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { specialisations } from "@/content/industries";
import { IndustryMarquee } from "./industry-marquee";

/**
 * Figma: `Industry Marquee — Light Variation` (`185:11530`) and
 * `Marquee / Industries` (`180:10249`). Both are built; **neither is chosen**
 * (CLAUDE.md §10, open decision #1). The Industries page uses Light, as drawn
 * in the approved frame.
 *
 * Both slide exactly one of three identical sets (Light 45 s, dark 40 s,
 * linear) and pause while hovered. Turn on "Reduce motion" in your operating
 * system to review `Motion=Reduced`: the track is removed and the complete
 * static row takes its place.
 */
const meta = {
  title: "Pages/Industries/Marquee",
  component: IndustryMarquee,
  parameters: { layout: "fullscreen" },
  args: { items: specialisations.items, summary: specialisations.summary },
} satisfies Meta<typeof IndustryMarquee>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Light: Story = { args: { tone: "light" } };
export const Dark: Story = { args: { tone: "dark" } };
