'use client';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';

import { formatPhone } from '../lib/format-phone';
import { validateContactName } from '../lib/validate-contact-name';

export function useContactForm(onClose: () => void) {
  const activeRequest = useRef<symbol | null>(null);

  useEffect(
    () => () => {
      activeRequest.current = null;
    },
    [],
  );

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [phone, setPhone] = useState('');
  const [hasConsent, setHasConsent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitState, setSubmitState] = useState<'idle' | 'success' | 'error'>('idle');

  const handleClose = () => {
    activeRequest.current = null;
    setIsLoading(false);
    setPhone('');
    setName('');
    setNameError(null);
    setHasConsent(false);
    setSubmitState('idle');
    onClose();
  };

  const finishSubmit = (request: symbol, state: 'success' | 'error') => {
    if (activeRequest.current === request) {
      activeRequest.current = null;
      setIsLoading(false);
      setSubmitState(state);
    }
  };

  const handleSubmit = async (evt: React.FormEvent) => {
    evt.preventDefault();

    if (!hasConsent || activeRequest.current !== null) {
      return;
    }

    const error = validateContactName(name);
    setNameError(error);
    if (error !== null) {
      return;
    }

    setSubmitState('idle');
    const request = Symbol('contact-request');
    activeRequest.current = request;
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
        }),
      });

      finishSubmit(request, response.ok ? 'success' : 'error');
    } catch {
      finishSubmit(request, 'error');
    }
  };

  const handlePhoneChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(evt.target.value));
  };

  const handleNameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
    setNameError(null);
  };

  return {
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
  };
}
