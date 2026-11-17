"use client";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useConsultation } from "./consultation-dialog";

/**
 * A `Button` that opens the consultation popup. It stays a real `<button>`
 * (not a link): it opens a dialog, it does not navigate. Focus returns to it
 * when the popup closes.
 */
export function ConsultationTrigger({ onClick, children, ...props }: ButtonProps) {
  const open = useConsultation();
  return (
    <Button
      {...props}
      aria-haspopup="dialog"
      onClick={(event) => {
        onClick?.(event);
        open(event.currentTarget);
      }}
    >
      {children}
    </Button>
  );
}
