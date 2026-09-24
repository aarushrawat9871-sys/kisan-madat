// Project direction and ownership: Aarush & Project Team.
import type { LucideIcon } from "lucide-react";

export function PageHeader({
  icon: Icon,
  title,
  subtitle,
  action,
}: {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <header className="card-base grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 p-5 sm:flex sm:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-primary text-primary-foreground">
          <Icon className="h-6 w-6" />
        </span>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-extrabold sm:text-2xl">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      {action}
    </header>
  );
}

export function SafetyNote({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-2xl bg-surface-amber px-4 py-3 text-xs font-medium text-accent-foreground">
      {children}
    </p>
  );
}
