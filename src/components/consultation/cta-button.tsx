"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@/components/ui/button";
import type { HomeLink } from "@/content/home";
import { ConsultationTrigger } from "./consultation-trigger";

/**
 * A content-driven call to action.
 *
 * A link whose content carries `opens: "consultation"` renders as a real
 * `<button>` that opens the shared consultation popup (Figma
 * `Form/Consultation`); every other link renders as an anchor and navigates.
 * That keeps the decision in `src/content/` (CLAUDE.md §5) and means there is
 * exactly ONE consultation form on the site — see
 * `consultation-dialog.tsx`.
 */
export function CtaButton({
  link,
  ...props
}: Omit<ButtonProps, "asChild" | "children"> & { link: HomeLink }) {
  if (link.opens === "consultation") {
    return <ConsultationTrigger {...props}>{link.label}</ConsultationTrigger>;
  }

  return (
    <Button asChild {...props}>
      <Link href={link.href}>{link.label}</Link>
    </Button>
  );
}
