import { cn } from "@/lib/utils"; // If you have a utility for class merging

export function Card({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("rounded-xl bg-white dark:bg-[#272727] shadow p-4", className)}>{children}</div>;
}

export function CardHeader({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("mb-2", className)}>{children}</div>;
}

export function CardTitle({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <h2 className={cn("text-lg font-semibold", className)}>{children}</h2>;
}

export function CardContent({ className, children }: React.PropsWithChildren<{ className?: string }>) {
  return <div className={cn("", className)}>{children}</div>;
}
