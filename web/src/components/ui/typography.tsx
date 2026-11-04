/* eslint-disable react/no-multi-comp */
import React, {forwardRef} from 'react';
import {cva, type VariantProps} from 'class-variance-authority';

import {cn} from '@/lib/utils';

const h1Variants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      hero: 'md:text-5xl lg:text-7xl text-white drop-shadow-lg ' +
        'text-balance font-normal whitespace-pre-line',
      page: 'text-4xl font-bold'
    }
  }
});

const h2Variants = cva('scroll-m-20 tracking-tight first:mt-0', {
  variants: {
    variant: {
      section: 'text-3xl lg:text-5xl text-center font-normal',
      card: 'text-3xl lg:text-5xl text-center lg:mb-12 font-medium'
    }
  }
});

const h3Variants = cva('scroll-m-20 tracking-tight', {
  variants: {
    variant: {
      footer: 'text-xl font-bold',
      footerLarge: 'text-2xl font-bold',
      card: 'text-2xl lg:text-3xl font-normal'
    }
  }
});

const pVariants = cva('', {
  variants: {
    variant: {
      default: '',
      price: 'text-3xl font-bold text-muted-foreground',
      body: 'lg:text-xl leading-relaxed text-light-text whitespace-pre-line ' +
        'font-houschka text-center lg:text-left'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

const leadVariants = cva('text-xl', {
  variants: {
    variant: {
      hero: 'md:text-2xl text-white/95 drop-shadow-md ' +
        'text-balance font-light font-houschka'
    }
  }
});

type H1Props = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof h1Variants>;
type H2Props = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof h2Variants>;
type H3Props = React.HTMLAttributes<HTMLHeadingElement> & VariantProps<typeof h3Variants>;
type PProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof pVariants>;
type LeadProps = React.HTMLAttributes<HTMLParagraphElement> & VariantProps<typeof leadVariants>;

export const H1 = forwardRef<HTMLHeadingElement, H1Props>(
  ({className, variant, ...props}, ref) => (
    <h1
      ref={ref}
      className={cn(h1Variants({variant}), className)}
      {...props}
    />
  )
);
H1.displayName = 'H1';

export const H2 = forwardRef<HTMLHeadingElement, H2Props>(
  ({className, variant, ...props}, ref) => (
    <h2
      ref={ref}
      className={cn(h2Variants({variant}), className)}
      {...props}
    />
  )
);
H2.displayName = 'H2';

export const H3 = forwardRef<HTMLHeadingElement, H3Props>(
  ({className, variant, ...props}, ref) => (
    <h3
      ref={ref}
      className={cn(h3Variants({variant}), className)}
      {...props}
    />
  )
);
H3.displayName = 'H3';

export const Lead = forwardRef<HTMLParagraphElement, LeadProps>(
  ({className, variant, ...props}, ref) => (
    <p
      ref={ref}
      className={cn(leadVariants({variant}), className)}
      {...props}
    />
  )
);
Lead.displayName = 'Lead';

export const P = forwardRef<HTMLParagraphElement, PProps>(
  ({className, variant, ...props}, ref) => (
    <p
      ref={ref}
      className={cn(pVariants({variant}), className)}
      {...props}
    />
  )
);
P.displayName = 'P';
