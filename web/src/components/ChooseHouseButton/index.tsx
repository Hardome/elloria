'use client';

import {type VariantProps} from 'class-variance-authority';

import {Button, buttonVariants} from '@/components/ui/button';
import useScrollToSection from '@/hooks/useScrollToSection';

export default function ChooseHouseButton(
  props: React.ComponentProps<'button'> & VariantProps<typeof buttonVariants>
) {
  const scrollToProjects = useScrollToSection();
  const {className, onClick, ...rest} = props;

  return (
    <Button
      {...rest}
      onClick={
        (evt) => {
          scrollToProjects('projects');
          onClick?.(evt);
        }
      }
      className={`uppercase ${className}`}
    >
      {'Подобрать дом'}
    </Button>
  );
}