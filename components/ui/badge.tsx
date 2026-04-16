import * as React from "react";

import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-stone-300 bg-[#f3e7d9] px-2.5 py-0.5 text-xs font-medium text-[#4a3425]",
        className
      )}
      {...props}
    />
  );
}
