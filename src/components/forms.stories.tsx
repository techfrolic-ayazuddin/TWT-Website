import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";
import { useEffect } from "react";
import { CapitalEnquiryForm } from "@/components/capital/capital-enquiry-form";
import { ConsultationForm } from "@/components/consultation/consultation-dialog";
import { CareersApplication as CareersApplicationSection } from "@/components/sections/careers/application-form";
import {
  RegisterButton,
  RegistrationProvider,
} from "@/components/sections/home/registration-dialog";
import { setMockSubmission, type MockOutcome } from "@/lib/submit/mock-submission";

/**
 * Phase 6.0 — every designed state of every TWT form, on demand.
 *
 * **These stories are the only place a success state can be produced.** The
 * four transports in `src/lib/submit-*.ts` all return `not-configured`,
 * because the backend is an open decision (CLAUDE.md §9, §10 #5). The
 * development-only adapter in `lib/submit/mock-submission.ts` simulates an
 * asynchronous result so the Loading, Acknowledgement and failure states can
 * be reviewed and tested.
 *
 * The adapter is compiled out of production — `npm run check:no-mock` proves
 * the identifiers are absent from the built bundles, and a behavioural check
 * confirms `?mock=success` is ignored by `next start`. Nothing here can make
 * the live site show a fake success.
 *
 * Pick an outcome with the `mock` control:
 *   · `not-configured` — what the live site does today (default)
 *   · `failure`        — a network/rejected failure; inputs are preserved
 *   · `success`        — resolves `{ ok: true }`; the acknowledgement renders
 */

type MockArgs = { mock: MockOutcome; delayMs: number };

/** Arms the adapter for the duration of a story. */
function MockHarness({
  mock,
  delayMs,
  children,
}: MockArgs & { children: React.ReactNode }) {
  useEffect(() => {
    setMockSubmission({ outcome: mock, delayMs });
    return () => setMockSubmission(null);
  }, [mock, delayMs]);
  return <>{children}</>;
}

const meta = {
  title: "Forms/Submission states",
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Every designed form state, driven by the development-only mock submission adapter. Production always returns `not-configured`; see `npm run check:no-mock`.",
      },
    },
  },
  argTypes: {
    mock: {
      control: "radio",
      options: ["not-configured", "failure", "success"],
      description: "Outcome the mock adapter resolves with.",
    },
    delayMs: {
      control: { type: "range", min: 0, max: 3000, step: 100 },
      description: "Simulated round-trip, so Loading is observable.",
    },
  },
  args: { mock: "not-configured", delayMs: 700 } satisfies MockArgs,
} satisfies Meta<MockArgs>;

export default meta;
type Story = StoryObj<MockArgs>;

/* ------------------------------------------------------------ helpers */

/** Fills the consultation form with valid values. */
async function fillConsultation(canvas: ReturnType<typeof within>) {
  await userEvent.type(canvas.getByLabelText(/full name/i), "Ada Example");
  await userEvent.type(canvas.getByLabelText(/work email/i), "ada@example.com");
  await userEvent.type(canvas.getByLabelText(/phone number/i), "+1 315 832 0551");
  await userEvent.type(
    canvas.getByLabelText(/company \/ organisation/i),
    "Example Holdings",
  );
  await userEvent.click(canvas.getByRole("combobox"));
  const option = await within(document.body).findAllByRole("option");
  await userEvent.click(option[0]);
  await userEvent.type(
    canvas.getByLabelText(/message/i),
    "We would like to discuss a programme for our leadership team this year.",
  );
  await userEvent.click(canvas.getByRole("checkbox"));
}

/* ------------------------------------------------- Request a consultation */

export const Consultation: Story = {
  name: "Consultation — default",
  render: (args) => (
    <MockHarness {...args}>
      <div className="mx-auto max-w-160">
        <ConsultationForm />
      </div>
    </MockHarness>
  ),
};

export const ConsultationValidationErrors: Story = {
  ...Consultation,
  name: "Consultation — validation errors",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /send request/i }));
    await waitFor(() =>
      expect(canvas.getByText(/please enter your full name/i)).toBeInTheDocument(),
    );
    // Every invalid control is marked for assistive technology.
    await waitFor(() =>
      expect(
        canvasElement.querySelectorAll('[aria-invalid="true"]').length,
      ).toBeGreaterThan(3),
    );
  },
};

export const ConsultationNotConfigured: Story = {
  ...Consultation,
  name: "Consultation — not configured (live behaviour)",
  args: { mock: "not-configured", delayMs: 300 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await fillConsultation(canvas);
    await userEvent.click(canvas.getByRole("button", { name: /send request/i }));
    await waitFor(
      () => expect(canvas.getByText(/not open online yet/i)).toBeInTheDocument(),
      { timeout: 5000 },
    );
    // No success wording, and the visitor's input survives.
    expect(canvas.queryByText(/thank you/i)).not.toBeInTheDocument();
    expect(canvas.getByLabelText(/full name/i)).toHaveValue("Ada Example");
  },
};

export const ConsultationFailure: Story = {
  ...Consultation,
  name: "Consultation — failure (inputs preserved)",
  args: { mock: "failure", delayMs: 300 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await fillConsultation(canvas);
    await userEvent.click(canvas.getByRole("button", { name: /send request/i }));
    await waitFor(
      () => expect(canvas.getByText(/not open online yet/i)).toBeInTheDocument(),
      { timeout: 5000 },
    );
    expect(canvas.queryByText(/thank you/i)).not.toBeInTheDocument();
    expect(canvas.getByLabelText(/work email/i)).toHaveValue("ada@example.com");
  },
};

export const ConsultationSubmitting: Story = {
  ...Consultation,
  name: "Consultation — submitting / loading",
  args: { mock: "success", delayMs: 3000 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await fillConsultation(canvas);
    await userEvent.click(canvas.getByRole("button", { name: /send request/i }));
    const submit = canvas.getByRole("button", { name: /send request/i });
    await waitFor(() => expect(submit).toHaveAttribute("aria-busy", "true"));
    expect(submit).toHaveAttribute("aria-disabled", "true");
  },
};

export const ConsultationAcknowledgement: Story = {
  ...Consultation,
  name: "Consultation — acknowledgement (success only)",
  args: { mock: "success", delayMs: 300 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await fillConsultation(canvas);
    await userEvent.click(canvas.getByRole("button", { name: /send request/i }));
    await waitFor(
      () => expect(canvas.getByText(/we've received your request/i)).toBeInTheDocument(),
      { timeout: 5000 },
    );
    // Figma marks this copy as draft; the badge must ship with it.
    expect(canvas.getByText(/draft wording/i)).toBeInTheDocument();
    // Focus lands on the acknowledgement heading.
    await waitFor(() =>
      expect(document.activeElement?.textContent).toMatch(/we've received your request/i),
    );
  },
};

/* ------------------------------------------------------ Tribe Capital */

export const CapitalEnquiry: Story = {
  name: "Tribe Capital — default",
  render: (args) => (
    <MockHarness {...args}>
      <div className="mx-auto max-w-180">
        <CapitalEnquiryForm />
      </div>
    </MockHarness>
  ),
};

export const CapitalEnquiryValidation: Story = {
  ...CapitalEnquiry,
  name: "Tribe Capital — validation errors",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /send enquiry/i }));
    await waitFor(() =>
      expect(
        canvas.getByText(/please choose the package you are interested in/i),
      ).toBeInTheDocument(),
    );
  },
};

export const CapitalEnquiryAcknowledgement: Story = {
  ...CapitalEnquiry,
  name: "Tribe Capital — acknowledgement (success only)",
  args: { mock: "success", delayMs: 300 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.type(canvas.getByLabelText(/full name/i), "Ada Example");
    await userEvent.type(canvas.getByLabelText(/work email/i), "ada@example.com");
    await userEvent.type(canvas.getByLabelText(/phone number/i), "+1 315 832 0551");
    await userEvent.type(
      canvas.getByLabelText(/company \/ organisation/i),
      "Example Holdings",
    );
    await userEvent.click(canvas.getAllByRole("radio")[0]);
    await userEvent.click(canvas.getByRole("checkbox"));
    await userEvent.click(canvas.getByRole("button", { name: /send enquiry/i }));
    await waitFor(
      () =>
        expect(
          canvas.getByText(/we've received your tribe capital enquiry/i),
        ).toBeInTheDocument(),
      { timeout: 5000 },
    );
    expect(canvas.getByText(/draft wording/i)).toBeInTheDocument();
  },
};

/* ------------------------------------------------- Training registration */

export const Registration: Story = {
  name: "Training registration — popup",
  render: (args) => (
    <MockHarness {...args}>
      <RegistrationProvider>
        <RegisterButton
          programmeId="spring"
          programmeName="Spring Training"
          appearance="button"
        >
          Register
        </RegisterButton>
      </RegistrationProvider>
    </MockHarness>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /register/i }));
    const dialog = await within(document.body).findByRole("dialog");
    await waitFor(() => expect(dialog).toBeInTheDocument());
  },
};

export const RegistrationNotConfigured: Story = {
  ...Registration,
  name: "Training registration — not configured (live behaviour)",
  args: { mock: "not-configured", delayMs: 300 },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: /register/i }));
    const body = within(document.body);
    const dialog = await body.findByRole("dialog");
    const inDialog = within(dialog);
    await userEvent.type(inDialog.getByLabelText(/full name/i), "Ada Example");
    await userEvent.type(inDialog.getByLabelText(/email address/i), "ada@example.com");
    await userEvent.click(inDialog.getByRole("checkbox"));
    await userEvent.click(inDialog.getByRole("button", { name: /^register$/i }));
    await waitFor(() => expect(inDialog.getByText(/not open yet/i)).toBeInTheDocument(), {
      timeout: 5000,
    });
    expect(inDialog.getByLabelText(/full name/i)).toHaveValue("Ada Example");
  },
};

/* --------------------------------------------------- Careers application */

export const CareersApplication: Story = {
  name: "Careers application — default",
  render: (args) => (
    <MockHarness {...args}>
      <CareersApplicationSection side={null} />
    </MockHarness>
  ),
};

export const CareersValidation: Story = {
  ...CareersApplication,
  name: "Careers application — validation errors",
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submit = canvas.getByRole("button", { name: /send application|submit/i });
    await userEvent.click(submit);
    await waitFor(() =>
      expect(
        canvasElement.querySelectorAll('[aria-invalid="true"]').length,
      ).toBeGreaterThan(0),
    );
  },
};
