'use client';

import { useEffect } from 'react';

import { MENU_ITEMS } from '@/shared/config';
import useScrollToSection from '@/shared/lib/navigation';
import { Button } from '@/shared/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/shared/ui/dialog';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const scrollToSection = useScrollToSection();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const desktop = window.matchMedia('(min-width: 1024px)');

    const closeOnDesktop = () => {
      if (desktop.matches) {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    desktop.addEventListener('change', closeOnDesktop);

    closeOnDesktop();

    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener('change', closeOnDesktop);
    };
  }, [isOpen, onClose]);

  const handleItemClick = (id: string) => {
    onClose();
    requestAnimationFrame(() => scrollToSection(id));
  };

  return (
    <Dialog modal={false} open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        id={'mobile-menu-panel'}
        onInteractOutside={(evt) => evt.preventDefault()}
        onCloseAutoFocus={(evt) => {
          evt.preventDefault();
          document.getElementById('mobile-menu-toggle')?.focus();
        }}
        className={[
          'mobile-menu-panel top-18 bottom-0 left-0 z-40 flex h-[calc(100dvh-4.5rem)]',
          'w-full max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-y-auto',
          'rounded-none border-0 bg-card/95 p-0 pt-2 backdrop-blur-md sm:max-w-none',
          'lg:hidden',
        ].join(' ')}
      >
        <DialogTitle className={'sr-only'}>{'Мобильное меню'}</DialogTitle>
        <DialogDescription className={'sr-only'}>{'Выберите раздел сайта или закройте меню.'}</DialogDescription>
        <nav
          aria-label={'Мобильная навигация'}
          className={'container mx-auto flex flex-col items-start gap-6 px-4 py-8'}
        >
          {MENU_ITEMS.map((item) => (
            <Button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              variant={'ghost'}
              className={'text-xl font-medium text-white'}
            >
              {item.label}
            </Button>
          ))}
          <Button
            size={'lg'}
            className={'mt-4 w-full rounded-full uppercase'}
            onClick={() => handleItemClick('projects')}
          >
            {'Подобрать дом'}
          </Button>
        </nav>
      </DialogContent>
    </Dialog>
  );
}
