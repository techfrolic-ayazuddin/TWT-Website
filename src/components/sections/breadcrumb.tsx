import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Breadcrumb — the `Home / Page` line at the top of every inner-page hero
 * (`UI/Caption`; `text/muted` on light, `text/inverse-muted` on dark).
 */
export function Breadcrumb({
  items,
  tone = "light",
}: {
  items: { label: string; href?: string }[];
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <nav aria-label="Breadcrumb">
      <ol
        className={cn(
          "text-ui-caption flex items-center gap-2",
          dark ? "text-text-inverse-muted" : "text-text-muted",
        )}
      >
        {items.map((crumb, i) => (
          <li key={crumb.label} className="flex items-center gap-2">
            {i > 0 ? <span aria-hidden="true">/</span> : null}
            {crumb.href ? (
              <Link
                href={crumb.href}
                className={cn(
                  "rounded-xs transition-colors duration-150 focus-visible:outline-none",
                  dark
                    ? "hover:text-text-inverse focus-visible:shadow-focus-ring-on-dark"
                    : "hover:text-text-brand focus-visible:shadow-focus-ring",
                )}
              >
                {crumb.label}
              </Link>
            ) : (
              // Only the last crumb is the current page; a link-less crumb
              // before it (e.g. "Company", a menu group) is plain text.
              <span aria-current={i === items.length - 1 ? "page" : undefined}>
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
