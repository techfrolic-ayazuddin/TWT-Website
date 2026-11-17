"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useId, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Acknowledgement } from "@/components/ui/form/acknowledgement";
import { Checkbox } from "@/components/ui/form/checkbox";
import { HelperText } from "@/components/ui/form/helper-text";
import { PackageOption } from "@/components/ui/form/package-option";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { TextInput } from "@/components/ui/form/text-input";
import { Textarea } from "@/components/ui/form/textarea";
import { ValidationMessage } from "@/components/ui/form/validation-message";
import { enquiry, enquiryForm } from "@/content/service-capital";
import { cn } from "@/lib/cn";
import { submitCapitalEnquiry } from "@/lib/submit-capital-enquiry";

/**
 * Tribe Capital enquiry — Figma `Form/Tribe Capital Enquiry` (`111:7297`),
 * as instantiated inline in `03 · Tribe Capital enquiry` (`104:5829`).
 *
 * This is a DIFFERENT form from the site-wide consultation popup: it carries a
 * package selector the consultation form does not have. It is not a duplicate
 * of it, and the consultation popup is untouched.
 *
 * Submission is deferred (`lib/submit-capital-enquiry.ts`): a valid form shows
 * an honest "not sent" notice, keeps every input, and never renders Figma's
 * `State=Acknowledgement` (CLAUDE.md §9).
 *
 * The three packages and their timelines are PROVISIONAL (§6.5) — every
 * option repeats "· provisional" and the group carries the caveat, exactly as
 * Figma draws it.
 */

const { fields, errors } = enquiryForm;

/** At least 8 and at most 15 digits (E.164), common separators allowed. */
const validPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 8 && digits.length <= 15;
};

const packageNames = enquiry.packages.map((p) => p.name);

const schema = z.object({
  fullName: z.string().trim().min(1, errors.fullName),
  email: z.string().trim().pipe(z.email(errors.email)),
  phone: z.string().trim().refine(validPhone, errors.phone),
  organisation: z.string().trim().min(1, errors.organisation),
  packageName: z
    .string()
    .refine((value) => packageNames.includes(value), errors.packageChoice),
  // Figma does not mark the message required (its `*` layer is hidden).
  message: z.string().trim().max(fields.message.maxLength, errors.message),
  consent: z.boolean().refine((value) => value, errors.consent),
});

type FormValues = z.infer<typeof schema>;

export function CapitalEnquiryForm({ onDone }: { onDone?: () => void } = {}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "not-sent" | "sent">(
    "idle",
  );
  const groupId = useId();
  const ackHeading = useRef<HTMLHeadingElement>(null);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors: fieldErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      organisation: "",
      packageName: "",
      message: "",
      consent: false,
    },
  });

  const onValid = async (values: FormValues) => {
    setStatus("submitting");
    const result = await submitCapitalEnquiry({ ...values, consent: true });
    // The acknowledgement is reachable ONLY through `{ ok: true }` — never
    // optimistically (CLAUDE.md §9). On failure nothing is sent and every
    // input, including the package choice, stays as the visitor left it.
    setStatus(result.ok ? "sent" : "not-sent");
  };

  // Move focus to the acknowledgement heading once it replaces the fields.
  useEffect(() => {
    if (status === "sent") ackHeading.current?.focus();
  }, [status]);

  if (status === "sent") {
    return (
      <div
        className={cn(
          "bg-surface-default border-border-subtle rounded-2xl border",
          "tablet:p-10 desktop:p-12 p-6",
        )}
      >
        <Acknowledgement
          ref={ackHeading}
          overline={enquiryForm.acknowledgement.overline}
          title={enquiryForm.acknowledgement.title}
          message={enquiryForm.acknowledgement.message}
          draftBadge={enquiryForm.acknowledgement.draftBadge}
          actions={
            onDone ? (
              <Button size="medium" onClick={onDone}>
                {enquiryForm.acknowledgement.done}
              </Button>
            ) : null
          }
        />
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid, () => setStatus("idle"))}
      className={cn(
        "bg-surface-default border-border-subtle flex flex-col gap-6 rounded-2xl border",
        "tablet:p-10 desktop:p-12 p-6",
      )}
    >
      {/* Figma `Segment bar` — 48 × 4 in the segment accent. */}
      <span
        aria-hidden="true"
        className="bg-segment-yellow-accent h-1 w-12 rounded-[2px]"
      />

      <div className="flex flex-col gap-2">
        <p className="text-ui-overline text-segment-yellow-text">
          {enquiryForm.overline}
        </p>
        <h3 className="text-desktop-heading-h3 text-text-heading">{enquiryForm.title}</h3>
        <p className="text-desktop-body-small text-text-body">
          {enquiryForm.description}
        </p>
        <p className="text-ui-caption text-text-muted">{enquiryForm.requiredNote}</p>
      </div>

      <div className="tablet:grid-cols-2 grid grid-cols-1 gap-5">
        <TextInput
          label={fields.fullName.label}
          placeholder={fields.fullName.placeholder}
          autoComplete="name"
          required
          error={fieldErrors.fullName?.message}
          {...register("fullName")}
        />
        <TextInput
          type="email"
          label={fields.email.label}
          placeholder={fields.email.placeholder}
          autoComplete="email"
          leadingIcon="mail"
          required
          error={fieldErrors.email?.message}
          {...register("email")}
        />
        <TextInput
          type="tel"
          label={fields.phone.label}
          placeholder={fields.phone.placeholder}
          autoComplete="tel"
          leadingIcon="phone"
          required
          error={fieldErrors.phone?.message}
          {...register("phone")}
        />
        <TextInput
          label={fields.organisation.label}
          placeholder={fields.organisation.placeholder}
          autoComplete="organization"
          required
          error={fieldErrors.organisation?.message}
          {...register("organisation")}
        />
      </div>

      {/* Figma `Field / Package of interest` — a real radio group, so arrow
          keys move between packages and it is announced as one control. */}
      <fieldset className="flex flex-col gap-2.5">
        <legend className="text-ui-label-regular text-text-heading mb-2.5">
          {fields.packageChoice.label}
          <span aria-hidden="true" className="text-text-secondary ml-1">
            *
          </span>
          <span className="sr-only"> (required)</span>
        </legend>

        <div
          className="flex flex-col gap-2"
          aria-describedby={`${groupId}-helper`}
          aria-invalid={fieldErrors.packageName ? true : undefined}
        >
          <Controller
            control={control}
            name="packageName"
            render={({ field }) => (
              <>
                {enquiry.packages.map((pkg) => (
                  <PackageOption
                    key={pkg.name}
                    name={field.name}
                    value={pkg.name}
                    packageName={pkg.name}
                    // Every option repeats that the timeline is provisional.
                    timeline={`${pkg.timeline.replace(/\.$/, "")} · ${
                      fields.packageChoice.provisionalSuffix
                    }`}
                    checked={field.value === pkg.name}
                    onChange={() => field.onChange(pkg.name)}
                    error={Boolean(fieldErrors.packageName)}
                  />
                ))}
              </>
            )}
          />
        </div>

        <p id={`${groupId}-helper`} className="text-ui-caption text-segment-yellow-text">
          {fields.packageChoice.helper}
        </p>
        {fieldErrors.packageName ? (
          <HelperText type="error">{fieldErrors.packageName.message}</HelperText>
        ) : null}
      </fieldset>

      <Textarea
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        maxLength={fields.message.maxLength}
        rows={2}
        error={fieldErrors.message?.message}
        {...register("message")}
      />

      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              label={fields.consent.label}
              description={fields.consent.description}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              error={Boolean(fieldErrors.consent)}
              required
            />
          )}
        />
        {fieldErrors.consent ? (
          <HelperText type="error">{fieldErrors.consent.message}</HelperText>
        ) : null}
      </div>

      {status === "not-sent" ? (
        <ValidationMessage
          type="info"
          title={enquiryForm.notSent.title}
          message={enquiryForm.notSent.message}
        />
      ) : null}

      <div className="tablet:flex-row tablet:items-center tablet:gap-6 flex flex-col items-start gap-4">
        <SubmitButton loading={status === "submitting"} className="px-8">
          {enquiryForm.submit}
        </SubmitButton>
        <p className="text-desktop-body-small text-text-muted flex flex-wrap items-center gap-x-1.5">
          {enquiryForm.emailAlternative.lead}
          <a
            href={`mailto:${enquiryForm.emailAlternative.email}`}
            className={cn(
              "text-ui-label-regular text-text-brand hover:text-text-brand-strong rounded-xs hover:underline",
              "focus-visible:shadow-focus-ring focus-visible:outline-none",
            )}
          >
            {enquiryForm.emailAlternative.email}
          </a>
        </p>
      </div>
    </form>
  );
}
