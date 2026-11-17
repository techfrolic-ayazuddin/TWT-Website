import type { SVGProps } from "react";
import { cn } from "@/lib/cn";

/**
 * Icon — the 39 icons from the Figma Design System, section 05.
 *
 * Paths are read directly from the Figma `Icon/*` components (read-only), so
 * each one is the designed artwork rather than a lookalike from an icon
 * library. All are 24×24, stroked at 1.75 with round caps and joins, which is
 * what Figma specifies.
 *
 * Colour comes from `currentColor`, so icons inherit the text colour of
 * whatever they sit in — that is how every Figma button pairs its icon colour
 * with its label colour.
 */

export const ICON_PATHS = {
  "arrow-right": `<path d="M5 12 L19 12 M19 12 L13 6 M19 12 L13 18"/>`,
  "arrow-left": `<path d="M19 12 L5 12 M5 12 L11 6 M5 12 L11 18"/>`,
  "arrow-up-right": `<path d="M7 17 L17 7 M17 7 L8.5 7 M17 7 L17 15.5"/>`,
  "chevron-down": `<path d="M6 9 L12 15 L18 9"/>`,
  "chevron-up": `<path d="M6 15 L12 9 L18 15"/>`,
  "chevron-right": `<path d="M9 6 L15 12 L9 18"/>`,
  "chevron-left": `<path d="M15 6 L9 12 L15 18"/>`,
  plus: `<path d="M12 5 L12 19 M5 12 L19 12"/>`,
  minus: `<path d="M5 12 L19 12"/>`,
  check: `<path d="M5 12.5 L9.5 17 L19 7.5"/>`,
  close: `<path d="M6 6 L18 18 M18 6 L6 18"/>`,
  menu: `<path d="M4 7 L20 7 M4 12 L20 12 M10 17 L20 17"/>`,
  search: `<path d="M17.5 11 C17.5 14.59 14.59 17.5 11 17.5 C7.41 17.5 4.5 14.59 4.5 11 C4.5 7.41 7.41 4.5 11 4.5 C14.59 4.5 17.5 7.41 17.5 11 Z"/><path d="M16 16 L20 20"/>`,
  mail: `<path d="M5.5 5 L18.5 5 C19.88 5 21 6.12 21 7.5 L21 16.5 C21 17.88 19.88 19 18.5 19 L5.5 19 C4.12 19 3 17.88 3 16.5 L3 7.5 C3 6.12 4.12 5 5.5 5 Z"/><path d="M3.5 6.5 L12 12.5 L20.5 6.5"/>`,
  phone: `<path d="M6.6 3.5 L9.3 3.5 L10.8 7.5 L8.7 8.9 C9.25 10.36 10.11 11.69 11.21 12.79 C12.31 13.89 13.64 14.75 15.1 15.3 L16.5 13.2 L20.5 14.7 L20.5 17.4 C20.5 17.68 20.44 17.96 20.33 18.21 C20.22 18.47 20.05 18.7 19.85 18.89 C19.64 19.08 19.39 19.22 19.13 19.31 C18.86 19.4 18.58 19.43 18.3 19.4 C14.86 18.85 11.69 17.23 9.23 14.77 C6.77 12.31 5.15 9.14 4.6 5.7 C4.57 5.42 4.6 5.14 4.69 4.87 C4.78 4.61 4.92 4.36 5.11 4.15 C5.3 3.95 5.53 3.78 5.79 3.67 C6.04 3.56 6.32 3.5 6.6 3.5 Z"/>`,
  "map-pin": `<path d="M12 21 C12 21 5 14.9 5 9.6 C5 7.74 5.74 5.96 7.05 4.65 C8.36 3.34 10.14 2.6 12 2.6 C13.86 2.6 15.64 3.34 16.95 4.65 C18.26 5.96 19 7.74 19 9.6 C19 14.9 12 21 12 21 Z"/><path d="M14.5 9.5 C14.5 10.88 13.38 12 12 12 C10.62 12 9.5 10.88 9.5 9.5 C9.5 8.12 10.62 7 12 7 C13.38 7 14.5 8.12 14.5 9.5 Z"/>`,
  globe: `<path d="M21 12 C21 16.97 16.97 21 12 21 C7.03 21 3 16.97 3 12 C3 7.03 7.03 3 12 3 C16.97 3 21 7.03 21 12 Z"/><path d="M3 12 L21 12 M12 3 C14.6 5.6 16 8.7 16 12 C16 15.3 14.6 18.4 12 21 C9.4 18.4 8 15.3 8 12 C8 8.7 9.4 5.6 12 3 Z"/>`,
  calendar: `<path d="M6 5 L18 5 C19.38 5 20.5 6.12 20.5 7.5 L20.5 18 C20.5 19.38 19.38 20.5 18 20.5 L6 20.5 C4.62 20.5 3.5 19.38 3.5 18 L3.5 7.5 C3.5 6.12 4.62 5 6 5 Z"/><path d="M3.5 10 L20.5 10 M8 3 L8 7 M16 3 L16 7"/>`,
  user: `<path d="M16 8 C16 10.21 14.21 12 12 12 C9.79 12 8 10.21 8 8 C8 5.79 9.79 4 12 4 C14.21 4 16 5.79 16 8 Z"/><path d="M4.5 20.5 C4.5 18.51 5.29 16.6 6.7 15.2 C8.1 13.79 10.01 13 12 13 C13.99 13 15.9 13.79 17.3 15.2 C18.71 16.6 19.5 18.51 19.5 20.5"/>`,
  users: `<path d="M12.5 8 C12.5 9.93 10.93 11.5 9 11.5 C7.07 11.5 5.5 9.93 5.5 8 C5.5 6.07 7.07 4.5 9 4.5 C10.93 4.5 12.5 6.07 12.5 8 Z"/><path d="M2.5 20 C2.5 18.28 3.18 16.62 4.4 15.4 C5.62 14.18 7.28 13.5 9 13.5 C10.72 13.5 12.38 14.18 13.6 15.4 C14.82 16.62 15.5 18.28 15.5 20 M16 4.6 C16.76 4.79 17.44 5.22 17.92 5.84 C18.41 6.46 18.67 7.22 18.67 8 C18.67 8.78 18.41 9.54 17.92 10.16 C17.44 10.78 16.76 11.21 16 11.4 M18 13.6 C19.16 14.19 20.11 15.12 20.73 16.26 C21.36 17.4 21.62 18.71 21.5 20"/>`,
  briefcase: `<path d="M5.5 7 L18.5 7 C19.88 7 21 8.12 21 9.5 L21 17.5 C21 18.88 19.88 20 18.5 20 L5.5 20 C4.12 20 3 18.88 3 17.5 L3 9.5 C3 8.12 4.12 7 5.5 7 Z"/><path d="M8.5 7 L8.5 5.5 C8.5 4.97 8.71 4.46 9.09 4.09 C9.46 3.71 9.97 3.5 10.5 3.5 L13.5 3.5 C14.03 3.5 14.54 3.71 14.91 4.09 C15.29 4.46 15.5 4.97 15.5 5.5 L15.5 7 M3 12.5 L21 12.5"/>`,
  building: `<path d="M4 21 L4 5.5 C4 4.97 4.21 4.46 4.59 4.09 C4.96 3.71 5.47 3.5 6 3.5 L13 3.5 C13.53 3.5 14.04 3.71 14.41 4.09 C14.79 4.46 15 4.97 15 5.5 L15 21 M15 9.5 L18 9.5 C18.53 9.5 19.04 9.71 19.41 10.09 C19.79 10.46 20 10.97 20 11.5 L20 21 M2.5 21 L21.5 21 M8 8 L11 8 M8 12 L11 12 M8 16 L11 16"/>`,
  "graduation-cap": `<path d="M21.5 9 L12 4.5 L2.5 9 L12 13.5 L21.5 9 ZM21.5 9 L21.5 14 M6.5 11 L6.5 15.5 C6.5 17.1 9 18.5 12 18.5 C15 18.5 17.5 17.1 17.5 15.5 L17.5 11"/>`,
  chart: `<path d="M4 4 L4 20 L20 20 M8.5 16 L8.5 12 M12.5 16 L12.5 8 M16.5 16 L16.5 10"/>`,
  target: `<path d="M21 12 C21 16.97 16.97 21 12 21 C7.03 21 3 16.97 3 12 C3 7.03 7.03 3 12 3 C16.97 3 21 7.03 21 12 Z"/><path d="M17 12 C17 14.76 14.76 17 12 17 C9.24 17 7 14.76 7 12 C7 9.24 9.24 7 12 7 C14.76 7 17 9.24 17 12 Z"/><path d="M13 12 C13 12.55 12.55 13 12 13 C11.45 13 11 12.55 11 12 C11 11.45 11.45 11 12 11 C12.55 11 13 11.45 13 12 Z"/>`,
  "heart-pulse": `<path d="M3 12 L7 12 L9 7.5 L13 16.5 L15 12 L21 12"/>`,
  factory: `<path d="M2 20.5 L22 20.5 M3 20.5 L3 10 L8.5 13.5 L8.5 10 L14 13.5 L14 5.5 L18 5.5 L18 20.5 L3 20.5 Z"/>`,
  cpu: `<path d="M8 6 L16 6 C17.1 6 18 6.9 18 8 L18 16 C18 17.1 17.1 18 16 18 L8 18 C6.9 18 6 17.1 6 16 L6 8 C6 6.9 6.9 6 8 6 Z"/><path d="M9 2.5 L9 6 M15 2.5 L15 6 M9 18 L9 21.5 M15 18 L15 21.5 M2.5 9 L6 9 M2.5 15 L6 15 M18 9 L21.5 9 M18 15 L21.5 15"/>`,
  landmark: `<path d="M5 9.5 L5 17.5 M9.7 9.5 L9.7 17.5 M14.3 9.5 L14.3 17.5 M19 9.5 L19 17.5 M3 20.5 L21 20.5 M3 9.5 L12 4 L21 9.5 L3 9.5 Z"/>`,
  refresh: `<path d="M20 11 C19.99 9.34 19.47 7.72 18.5 6.37 C17.53 5.02 16.17 4 14.59 3.46 C13.02 2.92 11.32 2.89 9.73 3.36 C8.13 3.83 6.72 4.79 5.7 6.1 L4 8 M4 8 L4 4 M4 8 L8 8 M4 13 C4.01 14.66 4.53 16.28 5.5 17.63 C6.47 18.98 7.83 20 9.41 20.54 C10.98 21.08 12.68 21.11 14.27 20.64 C15.87 20.17 17.28 19.21 18.3 17.9 L20 16 M20 16 L20 20 M20 16 L16 16"/>`,
  quote: `<path d="M10 7.5 C7 8.5 5 10.8 5 14.5 L5 17 L10 17 L10 12 L7.3 12 M19 7.5 C16 8.5 14 10.8 14 14.5 L14 17 L19 17 L19 12 L16.3 12"/>`,
  info: `<path d="M21 12 C21 16.97 16.97 21 12 21 C7.03 21 3 16.97 3 12 C3 7.03 7.03 3 12 3 C16.97 3 21 7.03 21 12 Z"/><path d="M12 11 L12 16.5 M12 7.8 L12 8"/>`,
  alert: `<path d="M21 12 C21 16.97 16.97 21 12 21 C7.03 21 3 16.97 3 12 C3 7.03 7.03 3 12 3 C16.97 3 21 7.03 21 12 Z"/><path d="M12 7.5 L12 13 M12 16.2 L12 16.4"/>`,
  "check-circle": `<path d="M21 12 C21 16.97 16.97 21 12 21 C7.03 21 3 16.97 3 12 C3 7.03 7.03 3 12 3 C16.97 3 21 7.03 21 12 Z"/><path d="M8 12.2 L10.7 14.9 L16 9.6"/>`,
  play: `<path d="M8 5.5 L8 18.5 L18 12 L8 5.5 Z"/>`,
  sparkle: `<path d="M12 3 L13.8 8.2 L19 10 L13.8 11.8 L12 17 L10.2 11.8 L5 10 L10.2 8.2 L12 3 ZM19 16 L19.8 18.2 L22 19 L19.8 19.8 L19 22 L18.2 19.8 L16 19 L18.2 18.2 L19 16 Z"/>`,
  upload: `<path d="M12 15 L12 4 M12 4 L7.5 8.5 M12 4 L16.5 8.5 M4 15 L4 18.5 C4 18.9 4.16 19.28 4.44 19.56 C4.72 19.84 5.1 20 5.5 20 L18.5 20 C18.9 20 19.28 19.84 19.56 19.56 C19.84 19.28 20 18.9 20 18.5 L20 15"/>`,
  file: `<path d="M14 3.5 L7 3.5 C6.47 3.5 5.96 3.71 5.59 4.09 C5.21 4.46 5 4.97 5 5.5 L5 18.5 C5 19.03 5.21 19.54 5.59 19.91 C5.96 20.29 6.47 20.5 7 20.5 L17 20.5 C17.53 20.5 18.04 20.29 18.41 19.91 C18.79 19.54 19 19.03 19 18.5 L19 8.5 L14 3.5 Z"/><path d="M14 3.5 L14 8.5 L19 8.5 M9 13 L15 13 M9 16.5 L13 16.5"/>`,
  instagram: `<rect x="3" y="3" width="18" height="18" rx="5"/><ellipse cx="12" cy="12" rx="4" ry="4"/><ellipse cx="17" cy="7" rx="1.1" ry="1.1"/>`,
} as const;

export type IconName = keyof typeof ICON_PATHS;

export const ICON_NAMES = Object.keys(ICON_PATHS) as IconName[];

export type IconProps = Omit<SVGProps<SVGSVGElement>, "name"> & {
  name: IconName;
  /** Rendered box in px. Figma uses 16 / 20 / 24 / 32 / 48 (`size/icon/*`). */
  size?: number;
  /**
   * Icons are decorative by default and hidden from assistive tech. Pass a
   * label only when the icon is the sole carrier of meaning — and prefer
   * giving the surrounding control a name instead.
   */
  label?: string;
};

export function Icon({ name, size = 20, label, className, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
      focusable="false"
      className={cn("shrink-0", className)}
      // The path set is a compile-time constant read from Figma — no user
      // input ever reaches it.
      dangerouslySetInnerHTML={{ __html: ICON_PATHS[name] }}
      {...props}
    />
  );
}
