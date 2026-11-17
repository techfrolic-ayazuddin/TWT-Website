"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Acknowledgement } from "@/components/ui/form/acknowledgement";
import { Checkbox } from "@/components/ui/form/checkbox";
import { HelperText } from "@/components/ui/form/helper-text";
import { Select } from "@/components/ui/form/select";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { TextInput } from "@/components/ui/form/text-input";
import { Textarea } from "@/components/ui/form/textarea";
import { ValidationMessage } from "@/components/ui/form/validation-message";
import { Modal } from "@/components/ui/modal";
import { consultation } from "@/content/consultation";
import { cn } from "@/lib/cn";
import { submitConsultation } from "@/lib/submit-consultation";

/**
 * Request a consultation — Figma `Form/Consultation` (`111:6601`), 640 wide,
 * in `Overlay · Request a consultation` (`111:7317`).
 *
 * One dialog for the whole site, opened by `ConsultationTrigger`s. Built on
 * the shared `Modal` shell: the page behind is scroll-locked, the header stays
 * put and the form scrolls inside the dialog.
 *
 * Submission is deferred (`lib/submit-consultation.ts`): a valid form shows an
 * honest "not sent" notice, keeps every input, and never renders Figma's
 * `State=Acknowledgement` (CLAUDE.md §9).
 */

const { fields, errors } = consultation;

/** At least 8 and at most 15 digits (E.164), common separators allowed. */
const validPhone = (value: string) => {
  const digits = value.replace(/\D/g, "");
  return /^\+?[\d\s().-]+$/.test(value) && digits.length >= 8 && digits.length <= 15;
};

const schema = z.object({
  fullName: z.string().trim().min(1, errors.fullName),
  email: z.string().trim().pipe(z.email(errors.email)),
  phone: z.string().trim().refine(validPhone, errors.phone),
  organisation: z.string().trim().min(1, errors.organisation),
  area: z.string().min(1, errors.area),
  message: z
    .string()
    .trim()
    .min(fields.message.minLength, errors.message)
    .max(fields.message.maxLength, errors.message),
  consent: z.boolean().refine((value) => value, errors.consent),
});

type FormValues = z.infer<typeof schema>;

/**
 * The consultation form itself. Used twice, from one definition: inside the
 * popup (`ConsultationProvider`) and inline on the Contact page
 * (Figma `02 · Enquiry` renders the same `Form/Consultation` component).
 */
export function ConsultationForm({ onDone }: { onDone?: () => void } = {}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "not-sent" | "sent">(
    "idle",
  );
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
      area: "",
      message: "",
      consent: false,
    },
  });

  const onValid = async (values: FormValues) => {
    setStatus("submitting");
    const result = await submitConsultation({ ...values, consent: true });
    // The acknowledgement is reachable ONLY through `{ ok: true }` — never
    // optimistically (CLAUDE.md §9). On failure nothing is sent and the
    // visitor's input stays exactly as they left it.
    setStatus(result.ok ? "sent" : "not-sent");
  };

  // Move focus to the acknowledgement heading once it replaces the fields.
  useEffect(() => {
    if (status === "sent") ackHeading.current?.focus();
  }, [status]);

  if (status === "sent") {
    return (
      <Acknowledgement
        ref={ackHeading}
        overline={consultation.acknowledgement.overline}
        title={consultation.acknowledgement.title}
        message={consultation.acknowledgement.message}
        draftBadge={consultation.acknowledgement.draftBadge}
        actions={
          onDone ? (
            <Button size="medium" onClick={onDone}>
              {consultation.acknowledgement.done}
            </Button>
          ) : null
        }
      />
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid, () => setStatus("idle"))}
      className="flex flex-col gap-5"
    >
      <div className="tablet:grid-cols-2 grid grid-cols-1 gap-x-5 gap-y-5">
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

      <Controller
        control={control}
        name="area"
        render={({ field }) => (
          <Select
            label={fields.area.label}
            placeholder={fields.area.placeholder}
            options={fields.area.options}
            required
            value={field.value || undefined}
            onValueChange={field.onChange}
            error={fieldErrors.area?.message}
            name={field.name}
          />
        )}
      />

      <Textarea
        label={fields.message.label}
        placeholder={fields.message.placeholder}
        maxLength={fields.message.maxLength}
        // Figma draws the field at the control's 152px minimum height.
        rows={2}
        required
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
          title={consultation.notSent.title}
          message={consultation.notSent.message}
        />
      ) : null}

      <div className="tablet:flex-row tablet:items-center tablet:gap-6 flex flex-col items-start gap-4">
        <SubmitButton loading={status === "submitting"} className="px-8">
          {consultation.submit}
        </SubmitButton>
        <p className="text-desktop-body-small text-text-muted flex flex-wrap items-center gap-x-1.5">
          {consultation.emailAlternative.lead}
          <a
            href={`mailto:${consultation.emailAlternative.email}`}
            className={cn(
              "text-ui-label-regular text-text-brand hover:text-text-brand-strong rounded-xs hover:underline",
              "focus-visible:shadow-focus-ring focus-visible:outline-none",
            )}
          >
            {consultation.emailAlternative.email}
          </a>
        </p>
      </div>
    </form>
  );
}

/** `returnTo`: the element to focus on close (defaults to the active element). */
type OpenConsultation = (returnTo?: HTMLElement | null) => void;

const ConsultationContext = createContext<OpenConsultation | null>(null);

/** Opens the consultation popup from anywhere inside `ConsultationProvider`. */
export function useConsultation() {
  const open = useContext(ConsultationContext);
  if (!open) throw new Error("useConsultation must be used inside ConsultationProvider");
  return open;
}

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  // The popup has no Radix `Dialog.Trigger` (several buttons open one dialog),
  // so remember the opener and return focus to it on close.
  const openerRef = useRef<HTMLElement | null>(null);

  const openDialog = useCallback<OpenConsultation>((returnTo) => {
    openerRef.current =
      returnTo ??
      (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    setOpen(true);
  }, []);

  return (
    <ConsultationContext.Provider value={openDialog}>
      {children}
      <Modal
        open={open}
        onOpenChange={setOpen}
        size="lg"
        overline={consultation.overline}
        title={consultation.title}
        note={consultation.requiredNote}
        closeLabel={consultation.close}
        returnFocusTo={openerRef}
      >
        {/* Mounted only while open, so every opening starts with a fresh form. */}
        {open ? <ConsultationForm onDone={() => setOpen(false)} /> : null}
      </Modal>
    </ConsultationContext.Provider>
  );
}
