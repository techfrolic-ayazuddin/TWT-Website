"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { DecorLayer, Pattern } from "@/components/decor/decor";
import { Checkbox } from "@/components/ui/form/checkbox";
import { FileUpload } from "@/components/ui/form/file-upload";
import { HelperText } from "@/components/ui/form/helper-text";
import { Select } from "@/components/ui/form/select";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { Textarea } from "@/components/ui/form/textarea";
import { TextInput } from "@/components/ui/form/text-input";
import { ValidationMessage } from "@/components/ui/form/validation-message";
import { applicationForm, cvRules } from "@/content/careers";
import { cn } from "@/lib/cn";
import { type } from "@/lib/type";
import { submitApplication } from "@/lib/submit-application";
import { ApplicationReceived, type ApplicationSummary } from "./application-received";

/**
 * 02 · Application — Figma `G · Careers — Desktop` → `02 · Application`
 * (1440 × 1434, `background/subtle`, padding 120/80, gap 48): the
 * `Application form` card (832 wide, padding 48, gap 28, `radius/2xl`,
 * `Elevation/1`) beside the side column (passed in as `side`).
 *
 * States follow `03 · Upload & validation states` (`95:4605`). Submission is
 * deferred (`lib/submit-application.ts`): a valid form shows an honest "not
 * sent" notice and keeps every input. The acknowledgement (`G2`) replaces
 * this section only when the transport reports real success.
 */

const { fields, errors } = applicationForm;

const acceptsFile = (file: File) => {
  if (file.size === 0) return false;
  if (cvRules.maxBytes && file.size > cvRules.maxBytes) return false;
  if (cvRules.accept) {
    const ok = cvRules.accept.split(",").some((rule) => {
      const r = rule.trim().toLowerCase();
      return r.startsWith(".")
        ? file.name.toLowerCase().endsWith(r)
        : file.type.toLowerCase() === r;
    });
    if (!ok) return false;
  }
  return true;
};

/** At least 8 and at most 15 digits (E.164), with common separators allowed. */
const validPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 8 && digits.length <= 15;
};

const schema = z.object({
  fullName: z.string().trim().min(1, errors.fullName),
  email: z.string().trim().pipe(z.email(errors.email)),
  phone: z.string().trim().refine(validPhone, errors.phone),
  region: z.string().min(1, errors.region),
  areaOfInterest: z.string().min(1, errors.areaOfInterest),
  message: z.string().max(fields.message.maxLength),
  cv: z.custom<File | null>().superRefine((file, ctx) => {
    if (!file) ctx.addIssue({ code: "custom", message: errors.cvMissing });
    else if (!acceptsFile(file))
      ctx.addIssue({ code: "custom", message: errors.cvRejected });
  }),
  consent: z.boolean().refine((value) => value, errors.consent),
});

type FormValues = z.infer<typeof schema>;

export function CareersApplication({ side }: { side: ReactNode }) {
  const [status, setStatus] = useState<"idle" | "submitting" | "not-sent">("idle");
  const [received, setReceived] = useState<ApplicationSummary | null>(null);
  const receivedHeading = useRef<HTMLHeadingElement>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    formState: { errors: fieldErrors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      region: "",
      areaOfInterest: "",
      message: "",
      cv: null,
      consent: false,
    },
  });

  // Move focus to the acknowledgement heading once it replaces the form.
  useEffect(() => {
    if (received) receivedHeading.current?.focus();
  }, [received]);

  const onValid = async (values: FormValues) => {
    setStatus("submitting");
    const result = await submitApplication({
      ...values,
      cv: values.cv as File,
      consent: true,
    });
    if (result.ok) {
      setReceived({
        name: values.fullName,
        region: values.region,
        areaOfInterest: values.areaOfInterest,
        cvName: (values.cv as File).name,
      });
    } else {
      // Nothing was sent. Inputs stay exactly as the applicant left them.
      setStatus("not-sent");
    }
  };

  if (received) return <ApplicationReceived ref={receivedHeading} summary={received} />;

  return (
    <section
      id="application"
      aria-labelledby="application-title"
      className="bg-background-subtle relative scroll-mt-[calc(1.5rem_-_var(--section-y))] overflow-hidden"
    >
      <DecorLayer>
        <Pattern name="dot-field-light" x={760} y={700} w={960} h={760} />
      </DecorLayer>

      <div
        className={cn(
          "relative mx-auto flex w-full max-w-(--canvas-desktop) flex-col gap-8 px-(--page-margin) py-(--section-y)",
          "desktop:flex-row desktop:items-start desktop:gap-12",
        )}
      >
        <form
          noValidate
          onSubmit={handleSubmit(onValid, () => setStatus("idle"))}
          className={cn(
            "bg-surface-default border-border-subtle shadow-elevation-1 flex min-w-0 flex-1 flex-col gap-7 rounded-2xl border p-6",
            "tablet:p-12",
          )}
        >
          <div className="flex flex-col gap-2">
            <p className="text-ui-overline text-text-brand">{applicationForm.overline}</p>
            <h2 id="application-title" className={cn(type.h2, "text-text-heading")}>
              {applicationForm.title}
            </h2>
            <p className={cn(type.body, "text-text-muted")}>
              {applicationForm.requiredNote}
            </p>
          </div>

          <div className="tablet:grid-cols-2 grid grid-cols-1 gap-x-6 gap-y-7">
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
            <Controller
              control={control}
              name="region"
              render={({ field }) => (
                <Select
                  label={fields.region.label}
                  placeholder={fields.region.placeholder}
                  options={fields.region.options}
                  required
                  value={field.value || undefined}
                  onValueChange={field.onChange}
                  error={fieldErrors.region?.message}
                  name={field.name}
                />
              )}
            />
          </div>

          <Controller
            control={control}
            name="areaOfInterest"
            render={({ field }) => (
              <Select
                label={fields.areaOfInterest.label}
                placeholder={fields.areaOfInterest.placeholder}
                options={fields.areaOfInterest.options}
                required
                value={field.value || undefined}
                onValueChange={field.onChange}
                error={fieldErrors.areaOfInterest?.message}
                name={field.name}
              />
            )}
          />

          <Textarea
            label={fields.message.label}
            placeholder={fields.message.placeholder}
            maxLength={fields.message.maxLength}
            // Figma draws this field at the control's 152px minimum height.
            rows={2}
            error={fieldErrors.message?.message}
            {...register("message")}
          />

          <Controller
            control={control}
            name="cv"
            render={({ field }) => (
              <FileUpload
                label={fields.cv.label}
                required
                prompt={fields.cv.prompt}
                dropPrompt={fields.cv.dropPrompt}
                formats={fields.cv.formats}
                helperText={fields.cv.helper}
                successText={fields.cv.success}
                errorCaption={fields.cv.errorCaption}
                accept={cvRules.accept}
                file={field.value}
                onFileChange={(file) => {
                  field.onChange(file);
                  // Show the designed Selected / Error state straight away,
                  // rather than waiting for a submit attempt.
                  if (file) void trigger("cv");
                }}
                error={fieldErrors.cv?.message}
                name={field.name}
              />
            )}
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
              title={applicationForm.notSent.title}
              message={applicationForm.notSent.message}
            />
          ) : null}

          <hr className="border-border-subtle" />

          <SubmitButton
            loading={status === "submitting"}
            className="hover:shadow-brand-glow self-start px-8 active:shadow-none"
          >
            {applicationForm.submit}
          </SubmitButton>
        </form>

        {side}
      </div>
    </section>
  );
}
