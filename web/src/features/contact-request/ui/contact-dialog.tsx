'use client';

import { useId } from 'react';

import { X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/shared/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';

import { useContactForm } from './use-contact-form';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactDialog = ({ isOpen, onClose }: ContactDialogProps) => {
  const formId = useId();
  const {
    name,
    nameError,
    handleNameChange,
    phone,
    hasConsent,
    setHasConsent,
    isLoading,
    submitState,
    handleClose,
    handleSubmit,
    handlePhoneChange,
  } = useContactForm(onClose);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className={'max-h-[calc(100dvh-2rem)] overflow-y-auto p-4 sm:p-6'}>
        <DialogHeader>
          <div className={'flex items-center justify-between gap-2'}>
            <DialogTitle className={'min-w-0 text-2xl font-medium sm:text-3xl'}>
              {submitState === 'success' ? 'Заявка отправлена' : 'Оставьте номер телефона'}
            </DialogTitle>
            <DialogClose asChild={true}>
              <Button
                type={'button'}
                variant={'ghost'}
                size={'icon-sm'}
                className={'shrink-0'}
                aria-label={'Закрыть форму'}
              >
                <X size={18} />
              </Button>
            </DialogClose>
          </div>
          <DialogDescription className={'text-base text-muted-foreground'}>
            {submitState === 'success'
              ? 'Спасибо! Мы свяжемся с вами в ближайшее время.'
              : 'Мы свяжемся с вами в ближайшее время'}
          </DialogDescription>
        </DialogHeader>
        {submitState === 'success' ? (
          <Button type={'button'} onClick={handleClose} className={'w-full rounded-full'}>
            {'Закрыть'}
          </Button>
        ) : (
          <form onSubmit={handleSubmit} className={'flex flex-col gap-4'}>
            <label htmlFor={`${formId}-name`} className={'sr-only'}>
              {'Имя'}
            </label>
            <Input
              id={`${formId}-name`}
              type={'text'}
              value={name}
              required={true}
              maxLength={255}
              aria-invalid={nameError !== null}
              aria-describedby={nameError ? `${formId}-name-error` : undefined}
              disabled={isLoading}
              className={'rounded-lg'}
              onChange={handleNameChange}
              placeholder={'Имя'}
              title={'Укажите своё имя'}
            />
            {nameError && (
              <p id={`${formId}-name-error`} role={'alert'} className={'text-sm text-destructive'}>
                {nameError}
              </p>
            )}
            <label htmlFor={`${formId}-phone`} className={'sr-only'}>
              {'Телефон'}
            </label>
            <Input
              id={`${formId}-phone`}
              type={'tel'}
              value={phone}
              required={true}
              pattern={'\\+7 \\([0-9]{3}\\) [0-9]{3}-[0-9]{2}-[0-9]{2}'}
              inputMode={'tel'}
              autoComplete={'tel'}
              disabled={isLoading}
              className={'rounded-lg'}
              onChange={handlePhoneChange}
              placeholder={'+7 (___) ___-__-__'}
              title={'Введите номер в формате: +7 (999) 999-99-99'}
            />
            <div className={'flex items-start gap-3'}>
              <input
                id={`${formId}-consent`}
                type={'checkbox'}
                checked={hasConsent}
                required={true}
                disabled={isLoading}
                onChange={(evt) => setHasConsent(evt.target.checked)}
                className={'mt-1 size-4 shrink-0 cursor-pointer accent-primary'}
              />
              <div className={'text-sm leading-relaxed text-muted-foreground'}>
                <label htmlFor={`${formId}-consent`} className={'cursor-pointer'}>
                  {'Я даю ООО «Архитектор» согласие на обработку моего имени и номера ' +
                    'телефона для связи по заявке. '}
                </label>
                <Link
                  href={'/consent'}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                  className={'text-foreground underline underline-offset-4 hover:no-underline'}
                >
                  {'Условия согласия'}
                </Link>
                {' · '}
                <Link
                  href={'/privacy'}
                  target={'_blank'}
                  rel={'noopener noreferrer'}
                  className={'text-foreground underline underline-offset-4 hover:no-underline'}
                >
                  {'Политика обработки персональных данных'}
                </Link>
              </div>
            </div>
            {submitState === 'error' && (
              <p role={'alert'} className={'text-sm text-destructive'}>
                {'Не удалось отправить заявку. Попробуйте ещё раз.'}
              </p>
            )}
            <Button
              type={'submit'}
              disabled={isLoading || !hasConsent}
              className={'w-full rounded-full text-base transition-opacity hover:opacity-90 disabled:opacity-50'}
            >
              {isLoading ? 'Отправка...' : 'Отправить'}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ContactDialog;
