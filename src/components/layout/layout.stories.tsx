import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MobileNav } from "./mobile-nav";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

/**
 * Figma: `Header/Desktop` → `Layout=Grouped Dropdown` (109:5770) and
 * `Footer/Desktop` → `Layout=Original` (44:176) — the client-approved
 * variants. The alternates (Original header, Modern footer) are not built.
 *
 * The dropdowns are real Radix NavigationMenu triggers: hover, click, or tab
 * to one and press Enter. The two "open" stories mount with a panel already
 * open so the panel geometry can be compared with Figma directly.
 */
const meta = {
  title: "Layout/Global",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Newsletters is deliberately absent from the header and, since 2026-11-13, from the footer Company column too, where Training Programs replaced it (both client decisions). Below 1280px the horizontal navigation becomes a drawer.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Stage = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-[560px]">{children}</div>
);

/** Header at desktop width. Five items: Company · Services · Industries · Contact · CTA. */
export const HeaderDesktop: Story = {
  render: () => (
    <Stage>
      <SiteHeader />
    </Stage>
  ),
};

/**
 * Company dropdown open — Figma `Panel · Company` (296 × 236, radius/xl,
 * Elevation/3). About Us · Why TWT · Careers · Training Programs.
 */
export const HeaderCompanyDropdown: Story = {
  render: () => (
    <Stage>
      <SiteHeader defaultOpenMenu="Company" />
    </Stage>
  ),
};

/**
 * Services dropdown open — Figma `Panel · Services` (640 × 292, radius/2xl,
 * Elevation/3). Four services with their approved Figma descriptions, plus
 * the "View all services" link.
 */
export const HeaderServicesDropdown: Story = {
  render: () => (
    <Stage>
      <SiteHeader defaultOpenMenu="Services" />
    </Stage>
  ),
};

/**
 * Mobile navigation — the drawer that replaces the horizontal nav below
 * 1280px. Rendered here in a phone-width frame; press the menu button to
 * open it. Radix Dialog traps focus, closes on Escape and locks scroll.
 */
export const MobileNavigation: Story = {
  render: () => (
    <div className="border-border-default mx-auto w-[375px] border">
      <div className="bg-background-page flex items-center justify-end p-4">
        <MobileNav />
      </div>
      <p className="text-desktop-body-small text-text-muted p-4">
        Press the menu button. Company and Services expand in place; the CTA is pinned to
        the bottom of the drawer.
      </p>
    </div>
  ),
};

/**
 * Footer — Figma `Layout=Original`: brand column, Services, Company (which
 * keeps Newsletters), Contact, the offices row, legal links and the 4px
 * brand band. Asia and Africa numbers render as plain text because their
 * international form is unconfirmed (CLAUDE.md §6.3).
 */
export const FooterOriginal: Story = {
  render: () => <SiteFooter />,
};
