'use client';

import type React from 'react';
import { useId, useState } from 'react';

import { X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  payload?: {
    from?: string;
  };
}

const ContactDialog = ({ isOpen, onClose, payload }: ContactDialogProps) => {
  const formId = useId();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');

  const handleClose = () => {
    setPhone('');
    setName('');
    setHasConsent(false);
    setSubmitState('idle');
    onClose();
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!hasConsent) {
      return;
    }

    setSubmitState('idle');
    setIsLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? '/api';

      const response = await fetch(`${backendUrl}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          phone,
          ...payload,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при отправке формы');
      }

      setSubmitState('success');
    } catch (err) {
      setSubmitState('error');
      // eslint-disable-next-line no-console
      console.error('Error submitting form:', JSON.stringify(err));
    } finally {
      setIsLoading(false);
    }
  };

  const handlePhoneChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = evt.target.value;
    const digits = rawValue.replace(/\D/g, '');

    if (!digits) {
      setPhone('');

      return;
    }

    const hasCountryCode =
      rawValue.trimStart().startsWith('+7') || ((digits.length === 1 || digits.length === 11) && /^[78]/.test(digits));
    const localDigits = (hasCountryCode ? digits.slice(1) : digits).slice(0, 10);

    let formatted = `+7`;

    if (localDigits.length > 0) {
      formatted += ` (${localDigits.slice(0, 3)}`;
    }
    if (localDigits.length > 3) {
      formatted += `) ${localDigits.slice(3, 6)}`;
    }
    if (localDigits.length > 6) {
      formatted += `-${localDigits.slice(6, 8)}`;
    }
    if (localDigits.length > 8) {
      formatted += `-${localDigits.slice(8, 10)}`;
    }

    setPhone(formatted);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className={'max-h-[calc(100dvh-2rem)] overflow-y-auto p-4 sm:p-6'}>
        <DialogHeader>
          <div className={'flex items-center justify-between gap-2'}>
            <DialogTitle className={'text-2xl font-medium whitespace-nowrap sm:text-3xl'}>
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
              disabled={isLoading}
              className={'rounded-lg'}
              onChange={(evt) => setName(evt.target.value)}
              placeholder={'Имя'}
              title={'Укажите своё имя'}
            />
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
