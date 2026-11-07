/* eslint-disable react/no-multi-comp */
import type React from 'react';
import { forwardRef } from 'react';

import { tv, type VariantProps } from 'tailwind-variants';

const h1Variants = tv({
  base: 'scroll-m-20 tracking-tight',
  variants: {
    variant: {
      hero: 'font-normal text-balance whitespace-pre-line text-white drop-shadow-lg md:text-5xl lg:text-7xl',
      page: 'text-4xl font-bold',
    },
  },
});

const h2Variants = tv({
  base: 'scroll-m-20 tracking-tight first:mt-0',
  variants: {
    variant: {
      section: 'text-center text-3xl font-normal lg:text-5xl',
      card: 'text-center text-3xl font-medium lg:mb-12 lg:text-5xl',
      footer: 'text-xl font-bold',
      footerLarge: 'text-2xl font-bold',
    },
  },
});

const h3Variants = tv({
  base: 'scroll-m-20 tracking-tight',
  variants: {
    variant: {
      card: 'text-2xl font-normal lg:text-3xl',
    },
  },
});

const pVariants = tv({
  base: '',
  variants: {
    variant: {
      default: '',
      price: 'text-3xl font-bold text-muted-foreground',
      body: 'text-center font-houschka leading-relaxed whitespace-pre-line text-light-text lg:text-left lg:text-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const leadVariants = tv({
  base: 'text-xl',
  variants: {
    variant: {
      hero: 'font-houschka font-light text-balance text-white/95 drop-shadow-md md:text-2xl',
    },
  },
});

type H1Props = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof h1Variants>;
type H2Props = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof h2Variants>;
type H3Props = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof h3Variants>;
type PProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof pVariants>;
type LeadProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof leadVariants>;

export const H1 = forwardRef<HTMLHeadingElement, H1Props>(({ className, variant, ...props }, ref) => (
  <h1 ref={ref} className={h1Variants({ variant, className })} {...props} />
));

H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, H2Props>(({ className, variant, ...props }, ref) => (
  <h2 ref={ref} className={h2Variants({ variant, className })} {...props} />
));

H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, H3Props>(({ className, variant, ...props }, ref) => (
  <h3 ref={ref} className={h3Variants({ variant, className })} {...props} />
));

H3.displayName = 'H3';

export const Lead = forwardRef<HTMLParagraphElement, LeadProps>(({ className, variant, ...props }, ref) => (
  <p ref={ref} className={leadVariants({ variant, className })} {...props} />
));

Lead.displayName = 'Lead';

export const P = forwardRef<HTMLParagraphElement, PProps>(({ className, variant, ...props }, ref) => (
  <p ref={ref} className={pVariants({ variant, className })} {...props} />
));

P.displayName = 'P';
