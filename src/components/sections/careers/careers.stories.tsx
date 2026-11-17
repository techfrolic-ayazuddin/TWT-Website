import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ApplicationReceived } from "./application-received";

/**
 * Figma: `G2 · Careers — Application received (state)` (`95:4887`).
 *
 * On the site this replaces the application form only after the transport
 * reports a real successful submission (CLAUDE.md §9). There is no backend
 * yet, so it cannot appear there — this story is where the client reviews
 * it. The summary values below are review data, standing in for what an
 * applicant would have submitted.
 */
const meta = {
  title: "Pages/Careers/Application received",
  component: ApplicationReceived,
  parameters: { layout: "fullscreen" },
  args: {
    summary: {
      name: "Name Surname",
      region: "African Region",
      areaOfInterest: "Training & Capacity Building",
      cvName: "CV_Name_Surname.pdf",
    },
  },
} satisfies Meta<typeof ApplicationReceived>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
