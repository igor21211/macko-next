import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'file:text-textDark placeholder:text-textLight selection:bg-primary dark:bg-input/30 border-input text-body file:text-body file:font-regular flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-none selection:text-white file:inline-flex file:h-7 file:border-0 file:bg-transparent disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'focus-visible:border-accent',
        outline:
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        order:
          'placeholder:font-inter focus-visible:border-accent h-[44px] w-full max-w-[542px] rounded-none border border-1 border-[#E2E7ED] bg-white px-5 py-0 font-sans text-[16px] leading-[1.4] font-normal tracking-normal placeholder:text-[14px] placeholder:leading-none placeholder:font-medium placeholder:tracking-normal placeholder:text-[#718096] md:h-[50px]',
      },
    },
  }
);

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<'input'> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant, className }))}
      {...props}
    />
  );
}

export { Input };
