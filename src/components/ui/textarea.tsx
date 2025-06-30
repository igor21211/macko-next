import * as React from "react";

export const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className = "", ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={
          "border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-[80px] " +
          className
        }
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea"; 