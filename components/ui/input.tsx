import * as React from "react";

import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-10 w-full rounded-md border border-stone-300 bg-[#fffdf9] px-3 py-2 text-sm ring-offset-white placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5e3c23] focus-visible:ring-offset-2",
        className
      )}
      {...props}
    />
  );
}
