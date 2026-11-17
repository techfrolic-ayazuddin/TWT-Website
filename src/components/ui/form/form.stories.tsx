import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { Checkbox } from "./checkbox";
import { FileUpload } from "./file-upload";
import { HelperText } from "./helper-text";
import { FormLabel } from "./label";
import { PackageOption } from "./package-option";
import { Select } from "./select";
import { SubmitButton } from "./submit-button";
import { TextInput } from "./text-input";
import { Textarea } from "./textarea";
import { ValidationMessage } from "./validation-message";

/**
 * Figma section 08 · Forms & Accordions.
 *
 * Every story is presentation only — nothing here submits, uploads or calls a
 * backend (CLAUDE.md §9, Phase 2 scope). The Loading and Uploading states are
 * rendered from props so they can be reviewed, not because any request is in
 * flight.
 */
const meta = {
  title: "Form/Components",
  parameters: {
    docs: {
      description: {
        component:
          "Form controls from Figma section 08. Interaction states (hover, focus) are CSS — interact with the controls to review them. Error, success and disabled are props because they are semantic.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const Row = ({ children }: { children: React.ReactNode }) => (
  <div className="grid max-w-[400px] gap-6">{children}</div>
);

/** Figma `Form/Label` 87:2131. */
export const Labels: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <FormLabel htmlFor="a">Full name</FormLabel>
      <FormLabel htmlFor="b" required>
        Email address
      </FormLabel>
      <FormLabel htmlFor="c" showOptional>
        Organisation
      </FormLabel>
      <FormLabel htmlFor="d" required disabled>
        Disabled label
      </FormLabel>
    </div>
  ),
};

/** Figma `Form/Helper Text` 87:2150 — three types only. */
export const HelperTexts: Story = {
  render: () => (
    <div className="flex flex-col gap-3">
      <HelperText type="hint">We only use this to reply to you.</HelperText>
      <HelperText type="error">Enter a valid email address.</HelperText>
      <HelperText type="success">That email address looks good.</HelperText>
      <HelperText type="hint" showIcon={false}>
        Without the icon.
      </HelperText>
    </div>
  ),
};

/** Figma `Form/Validation Message` 87:2183 — 4px left border, soft fill. */
export const ValidationMessages: Story = {
  render: () => (
    <div className="flex max-w-[560px] flex-col gap-4">
      <ValidationMessage
        type="error"
        title="We could not send your enquiry"
        message="Check the highlighted fields and try again."
      />
      <ValidationMessage
        type="success"
        title="Enquiry received"
        message="Visual state only — no submission is wired up in this phase."
      />
      <ValidationMessage
        type="warning"
        title="Some details are still provisional"
        message="Tribe Capital packages and timelines await client confirmation."
      />
      <ValidationMessage
        type="info"
        title="Virtual meeting"
        message="All four seasonal programmes run as virtual meetings."
      />
    </div>
  ),
};

/** Figma `Form/Text Input` 87:2305 — all seven states. */
export const TextInputs: Story = {
  render: () => (
    <Row>
      <TextInput label="Full name" placeholder="Jane Mensah" />
      <TextInput
        label="Email address"
        required
        type="email"
        placeholder="you@example.com"
        helperText="We only use this to reply to you."
      />
      <TextInput
        label="With leading icon"
        leadingIcon="mail"
        placeholder="you@example.com"
      />
      <TextInput
        label="Email address"
        required
        defaultValue="not-an-email"
        error="Enter a valid email address."
      />
      <TextInput
        label="Email address"
        defaultValue="jane@example.com"
        success="That email address looks good."
      />
      <TextInput label="Disabled" placeholder="Unavailable" disabled />
    </Row>
  ),
};

/** Figma `Form/Textarea` 87:2431 — 152px minimum height. */
export const Textareas: Story = {
  render: () => (
    <Row>
      <Textarea
        label="How can we help?"
        required
        placeholder="Tell us about your organisation…"
        helperText="A short paragraph is plenty."
      />
      <Textarea label="With an error" error="This field is required." />
      <Textarea label="Disabled" placeholder="Unavailable" disabled />
    </Row>
  ),
};

/** Figma `Form/Dropdown` 88:2580 + `Form/Dropdown Option` 88:2460. */
export const Selects: Story = {
  render: function SelectsStory() {
    const [value, setValue] = useState<string>();
    const options = [
      { value: "training", label: "Training & Capacity Building" },
      { value: "advisory", label: "Advisory & Management Consulting" },
      { value: "global", label: "Global Solutions" },
      { value: "capital", label: "Tribe Capital" },
      { value: "other", label: "Something else", disabled: true },
    ];
    return (
      <Row>
        <Select
          label="Service of interest"
          required
          options={options}
          value={value}
          onValueChange={setValue}
          placeholder="Choose a service"
          helperText="Open with Enter or Space; move with the arrow keys."
        />
        <Select
          label="With an error"
          options={options}
          error="Choose a service to continue."
        />
        <Select label="Disabled" options={options} disabled />
      </Row>
    );
  },
};

/** Figma `Form/Checkbox` 88:2688 — Checked × State. */
export const Checkboxes: Story = {
  render: function CheckboxStory() {
    const [consent, setConsent] = useState<boolean | "indeterminate">(false);
    return (
      <div className="flex max-w-[400px] flex-col gap-5">
        <Checkbox
          label="I agree to be contacted about this enquiry"
          checked={consent}
          onCheckedChange={setConsent}
        />
        <Checkbox label="Checked" defaultChecked />
        <Checkbox label="Indeterminate" checked="indeterminate" />
        <Checkbox
          label="With a description"
          description="Descriptions use Desktop/Body/Small in text/muted."
          defaultChecked
        />
        <Checkbox label="Error state" error />
        <Checkbox label="Disabled" disabled />
        <Checkbox label="Disabled and checked" disabled defaultChecked />
      </div>
    );
  },
};

/** Figma `Form/File Upload` 95:4327 — selection only, never uploads. */
export const FileUploads: Story = {
  render: function FileUploadStory() {
    const [file, setFile] = useState<File | null>(null);
    const sample = new File(["x"], "CV_Name_Surname.pdf", {
      type: "application/pdf",
    });
    return (
      <div className="flex max-w-[520px] flex-col gap-8">
        <FileUpload
          label="CV upload"
          required
          formats="PDF or DOCX · max 5 MB"
          file={file}
          onFileChange={setFile}
          accept=".pdf,.docx"
          helperText="Upload your CV in an accepted format. Drag a file over to see the Drag over state."
          successText="CV ready to submit."
        />
        <FileUpload
          label="Uploading"
          file={sample}
          uploading
          progress={64}
          helperText="Upload your CV in an accepted format."
        />
        <FileUpload
          label="Selected"
          file={sample}
          helperText="Upload your CV in an accepted format."
          successText="CV ready to submit."
        />
        <FileUpload
          label="Error"
          file={sample}
          error="This file couldn’t be accepted. Check the format and size, then try again."
        />
        <FileUpload label="Disabled" formats="PDF or DOCX" disabled />
      </div>
    );
  },
};

/** Figma `Form/Package Option` 111:5945 — a real radio group. */
export const PackageOptions: Story = {
  render: () => (
    <fieldset className="flex max-w-[480px] flex-col gap-3">
      <legend className="text-ui-label-regular text-text-heading mb-2">
        Package of interest
      </legend>
      {/* @placeholder Tribe Capital package names and timelines are
          PROVISIONAL — CLAUDE.md §6.5. Sample values for review only. */}
      <div className="grid grid-cols-2 gap-3">
        <PackageOption
          name="package"
          value="sos"
          packageName="SOS Call"
          timeline="Within one week of KYC"
          defaultChecked
        />
        <PackageOption
          name="package"
          value="watering"
          packageName="Watering Package"
          timeline="Within 90 days"
        />
        <PackageOption
          name="package"
          value="journey"
          packageName="A Journey Through"
          timeline="Continuous, within 12 months"
        />
        <PackageOption
          name="package"
          value="disabled"
          packageName="Unavailable"
          timeline="Disabled state"
          disabled
        />
      </div>
    </fieldset>
  ),
};

/** Figma `Form/Submit Button` 111:5964 — note there is no success state. */
export const SubmitButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <SubmitButton>Send enquiry</SubmitButton>
      <SubmitButton loading>Sending…</SubmitButton>
      <SubmitButton disabled>Send enquiry</SubmitButton>
    </div>
  ),
};
