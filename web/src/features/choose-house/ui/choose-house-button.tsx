'use client';

import type { VariantProps } from 'tailwind-variants';

import useScrollToSection from '@/shared/lib/navigation';
import { Button, type buttonVariants } from '@/shared/ui/button';

export default function ChooseHouseButton(props: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>) {
  const scrollToProjects = useScrollToSection();
  const { className, onClick, ...rest } = props;

  return (
    <Button
      {...rest}
      onClick={(evt) => {
        scrollToProjects('projects');
        onClick?.(evt);
      }}
      className={`uppercase ${className}`}
    >
      {'Подобрать дом'}
    </Button>
  );
}
