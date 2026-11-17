"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/form/checkbox";
import { HelperText } from "@/components/ui/form/helper-text";
import { TextInput } from "@/components/ui/form/text-input";
import { ValidationMessage } from "@/components/ui/form/validation-message";
import { Icon } from "@/components/ui/icon";
import { Modal } from "@/components/ui/modal";
import { SubmitButton } from "@/components/ui/form/submit-button";
import { programmes, registration, type Programme } from "@/content/home";
import { cn } from "@/lib/cn";
import { submitRegistration } from "@/lib/submit-registration";

/**
 * Training registration overlay — Figma `Modal/Registration` (`95:5568`),
 * instantiated per programme as `102:4219` (Spring), `102:4298` (Summer),
 * `102:4377` (Autumn) and `102:4456` (Winter Forum).
 *
 * Radix Dialog supplies the focus trap, focus restore and `Esc` to close
 * (CLAUDE.md §8).
 *
 * There is no form backend yet (CLAUDE.md §9, open decision #5), so
 * `submitRegistration` resolves `not-configured`: a valid submission is NOT
 * sent, and the form says so plainly while keeping the visitor's input.
 *
 * Phase 6.0 gave this form the transport, the `Loading` state and the
 * failure branch the other three already had. It still has **no
 * acknowledgement**: `Modal/Registration` has only `State=Default` and
 * `State=Validation` in Figma — no success state is designed, so none is
 * invented here. On `{ ok: true }` the dialog simply closes.
 */

type ProgrammeId = Programme["id"];

const RegistrationContext = createContext<((id: ProgrammeId) => void) | null>(null);

const schema = z.object({
  fullName: z.string().trim().min(1, registration.required.fullName),
  email: z
    .string()
    .trim()
    .min(1, registration.required.email)
    .pipe(z.email(registration.fields.email.invalid)),
  organization: z.string().trim(),
  consent: z.boolean().refine((value) => value, registration.required.consent),
});

type FormValues = z.infer<typeof schema>;

function RegistrationForm({
  programme,
  onCancel,
  onSent,
}: {
  programme: string;
  onCancel: () => void;
  onSent: () => void;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "not-sent">("idle");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { fullName: "", email: "", organization: "", consent: false },
  });

  const onValid = async (values: FormValues) => {
    setStatus("submitting");
    const result = await submitRegistration({
      ...values,
      programme,
      consent: true,
    });
    // No acknowledgement is designed for this form, so a success simply
    // closes the dialog. A failure keeps every input and says so.
    if (result.ok) onSent();
    else setStatus("not-sent");
  };

  const { fields } = registration;

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onValid, () => setStatus("idle"))}
      className="flex flex-col gap-5.5"
    >
      <TextInput
        label={fields.fullName.label}
        placeholder={fields.fullName.placeholder}
        autoComplete="name"
        required
        error={errors.fullName?.message}
        {...register("fullName")}
      />
      <TextInput
        type="email"
        label={fields.email.label}
        placeholder={fields.email.placeholder}
        autoComplete="email"
        leadingIcon="mail"
        required
        error={errors.email?.message}
        {...register("email")}
      />
      <TextInput
        label={fields.organization.label}
        placeholder={fields.organization.placeholder}
        autoComplete="organization"
        {...register("organization")}
      />

      <div className="flex flex-col gap-2">
        <Controller
          control={control}
          name="consent"
          render={({ field }) => (
            <Checkbox
              label={fields.consent}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked === true)}
              error={Boolean(errors.consent)}
              required
              aria-describedby={errors.consent ? "registration-consent-error" : undefined}
            />
          )}
        />
        {errors.consent ? (
          <HelperText id="registration-consent-error" type="error">
            {errors.consent.message}
          </HelperText>
        ) : null}
      </div>

      {status === "not-sent" ? (
        <ValidationMessage
          type="info"
          title={registration.notSent.title}
          message={registration.notSent.message}
        />
      ) : null}

      <div className="flex flex-wrap items-center gap-3">
        <SubmitButton loading={status === "submitting"} className="h-12 pr-5 pl-6">
          {registration.submit}
        </SubmitButton>
        <Button
          type="button"
          variant="outline"
          size="medium"
          onClick={onCancel}
          disabled={status === "submitting"}
        >
          {registration.cancel}
        </Button>
      </div>
    </form>
  );
}

export function RegistrationProvider({
  children,
  details,
}: {
  children: ReactNode;
  /**
   * Per-page "Selected programme" details line, by programme id. The
   * homepage overlays (`102:4219`…) show sample logistics; the Training
   * Programs overlays (`249:10847`…) show "Dates and times to be announced".
   * Defaults to each programme’s `overlayDetails` from `home.ts`.
   */
  details?: Partial<Record<ProgrammeId, string>>;
}) {
  const [selected, setSelected] = useState<ProgrammeId | null>(null);
  const [open, setOpen] = useState(false);

  // The overlay has no Radix `Dialog.Trigger` (four buttons open one dialog),
  // so Radix has nothing to return focus to. Remember the opener ourselves.
  const openerRef = useRef<HTMLElement | null>(null);

  const openFor = useCallback((id: ProgrammeId) => {
    openerRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(id);
    setOpen(true);
  }, []);

  const programme = useMemo(
    () => programmes.find((item) => item.id === selected) ?? null,
    [selected],
  );

  return (
    <RegistrationContext.Provider value={openFor}>
      {children}

      <Modal
        open={open}
        onOpenChange={setOpen}
        overline={registration.overline}
        title={registration.title}
        closeLabel={registration.close}
        returnFocusTo={openerRef}
      >
        <div className="flex flex-col gap-5.5">
          {programme ? (
            <div className="bg-primary-soft flex flex-col gap-1 rounded-lg px-5 py-4">
              <p className="text-ui-overline text-text-brand">
                {registration.selectedLabel}
              </p>
              <p className="text-ui-label-large text-text-heading">
                {programme.name} — {programme.topic}
              </p>
              <p className="text-ui-caption text-text-warning">
                {details?.[programme.id] ?? programme.overlayDetails}
              </p>
            </div>
          ) : null}

          {/* Keyed by programme so each overlay opens with a fresh form. */}
          <RegistrationForm
            key={selected ?? "none"}
            programme={programme ? programme.name : ""}
            onCancel={() => setOpen(false)}
            onSent={() => setOpen(false)}
          />
        </div>
      </Modal>
    </RegistrationContext.Provider>
  );
}

/**
 * Opens the registration overlay for one programme. Figma draws two
 * treatments: the primary Large button on the featured programme and a text
 * link with an 18px arrow on the smaller cards.
 */
export function RegisterButton({
  programmeId,
  programmeName,
  appearance,
  tone = "primary",
  showArrow = true,
  children,
}: {
  programmeId: ProgrammeId;
  /** Read out after the label so four identical buttons are distinguishable. */
  programmeName: string;
  appearance: "button" | "link";
  /** `button` only: `inverse` for dark surfaces (Figma `Button/Inverse`). */
  tone?: "primary" | "inverse";
  /** `button` only: Figma `Show trailing icon`. The Training Programs CTAs have none. */
  showArrow?: boolean;
  children: ReactNode;
}) {
  const openFor = useContext(RegistrationContext);
  if (!openFor) throw new Error("RegisterButton must be inside RegistrationProvider");

  const label = (
    <>
      {children}
      <span className="sr-only"> — {programmeName}</span>
    </>
  );

  if (appearance === "button") {
    return (
      <Button
        size="large"
        variant={tone}
        trailingIcon={showArrow ? "arrow-right" : undefined}
        aria-haspopup="dialog"
        onClick={() => openFor(programmeId)}
      >
        {label}
      </Button>
    );
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => openFor(programmeId)}
      className={cn(
        "text-ui-label-large text-text-brand hover:text-text-brand-strong -mx-1 -my-0.5 inline-flex items-center gap-2 self-start rounded-[6px] px-1 py-0.5",
        "focus-visible:shadow-focus-ring transition-colors duration-150 focus-visible:outline-none",
      )}
    >
      {label}
      <Icon name="arrow-right" size={18} />
    </button>
  );
}
