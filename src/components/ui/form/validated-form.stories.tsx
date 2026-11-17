import { zodResolver } from "@hookform/resolvers/zod";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Checkbox } from "./checkbox";
import { Select } from "./select";
import { SubmitButton } from "./submit-button";
import { TextInput } from "./text-input";
import { Textarea } from "./textarea";
import { ValidationMessage } from "./validation-message";

/**
 * Wiring demonstration: React Hook Form + Zod driving the Figma states.
 *
 * NOT A REAL FORM. The field list, copy and backend for every TWT form are
 * still unspecified (CLAUDE.md §9, §10 #5). This story exists to show that
 * validation drives the components' `error` props correctly, and that the
 * submit button's Loading state behaves.
 *
 * It deliberately NEVER renders a success state. Per CLAUDE.md §7, an
 * acknowledgement may only appear after a real submission resolves — and
 * nothing here submits anywhere.
 */
const meta = {
  title: "Form/Validation wiring",
  parameters: {
    docs: {
      description: {
        component:
          "Demonstrates React Hook Form + Zod against the Figma form components. No backend, no submission, and no success state — submitting only reports that no transport exists.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name."),
  email: z.email("Enter a valid email address."),
  service: z.string().min(1, "Choose a service to continue."),
  message: z.string().min(10, "Tell us a little more — at least 10 characters."),
  // `z.boolean().refine(...)` rather than `z.literal(true)`: the literal
  // narrows the inferred type to `true`, which `setValue` then rejects for a
  // checkbox that can legitimately be false.
  consent: z.boolean().refine((value) => value, {
    message: "We need your consent before we can reply.",
  }),
});

type Values = z.infer<typeof schema>;

const SERVICES = [
  { value: "training", label: "Training & Capacity Building" },
  { value: "advisory", label: "Advisory & Management Consulting" },
  { value: "global", label: "Global Solutions" },
  { value: "capital", label: "Tribe Capital" },
];

export const ClientSideValidation: Story = {
  render: function ValidatedFormStory() {
    const [blocked, setBlocked] = useState(false);
    const {
      register,
      handleSubmit,
      setValue,
      watch,
      formState: { errors, isSubmitting },
    } = useForm<Values>({
      resolver: zodResolver(schema),
      mode: "onBlur",
    });

    const onValid = async () => {
      // Deliberately does not submit. There is no backend and no email
      // routing yet, so the only honest outcome is to say so.
      setBlocked(true);
    };

    return (
      <form
        noValidate
        onSubmit={handleSubmit(onValid)}
        className="flex max-w-[480px] flex-col gap-6"
      >
        <TextInput
          label="Full name"
          required
          placeholder="Jane Mensah"
          error={errors.fullName?.message}
          {...register("fullName")}
        />

        <TextInput
          label="Email address"
          required
          type="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />

        <Select
          label="Service of interest"
          required
          options={SERVICES}
          placeholder="Choose a service"
          value={watch("service")}
          onValueChange={(value) => setValue("service", value, { shouldValidate: true })}
          error={errors.service?.message}
        />

        <Textarea
          label="How can we help?"
          required
          placeholder="Tell us about your organisation…"
          error={errors.message?.message}
          {...register("message")}
        />

        <Checkbox
          label="I agree to be contacted about this enquiry"
          error={Boolean(errors.consent)}
          checked={watch("consent") ?? false}
          onCheckedChange={(checked) =>
            setValue("consent", checked === true, { shouldValidate: true })
          }
        />
        {errors.consent ? (
          <p role="alert" className="text-desktop-body-small text-text-error">
            {errors.consent.message}
          </p>
        ) : null}

        <SubmitButton loading={isSubmitting}>Send enquiry</SubmitButton>

        {blocked ? (
          <ValidationMessage
            type="info"
            title="Validation passed — nothing was sent"
            message="No form backend is wired up yet (CLAUDE.md §9). A success state will only ever render after a real submission resolves."
          />
        ) : null}
      </form>
    );
  },
};
