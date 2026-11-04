'use client';

import React, { useRef, useState } from 'react';

import { Button } from '@/shared/ui/button';

import type ContactDialog from './contact-dialog';

type ContactRequestButtonProps = Pick<
  React.ComponentProps<typeof Button>,
  'children' | 'className' | 'size' | 'variant'
> & {
  payload?: React.ComponentProps<typeof ContactDialog>['payload'];
};

const loadDialog = () => import('./contact-dialog');

const preloadDialog = () => loadDialog().catch(() => undefined);

export default function ContactRequestButton({ children, payload, ...props }: ContactRequestButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [Dialog, setDialog] = useState<typeof ContactDialog | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const openDialog = async () => {
    if (isLoading) {
      return;
    }

    setHasError(false);
    setIsLoading(true);

    try {
      const dialogModule = await loadDialog();

      setDialog(() => dialogModule.default);
      setIsOpen(true);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const closeDialog = () => {
    setIsOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus({ preventScroll: true }));
  };

  return (
    <React.Fragment>
      <Button
        {...props}
        ref={buttonRef}
        type={'button'}
        aria-haspopup={'dialog'}
        aria-busy={isLoading}
        aria-disabled={isLoading}
        onPointerEnter={preloadDialog}
        onPointerDown={preloadDialog}
        onFocus={preloadDialog}
        onClick={openDialog}
      >
        {isLoading ? 'Открываем форму…' : children}
      </Button>
      {hasError && (
        <p role={'alert'} className={'text-sm text-destructive'}>
          {'Не удалось открыть форму. Нажмите ещё раз.'}
        </p>
      )}
      {isOpen && Dialog && <Dialog isOpen={true} onClose={closeDialog} payload={payload} />}
    </React.Fragment>
  );
}
