import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, test as it, vi } from 'vitest';

import ContactDialog from './contact-dialog';

const fetchMock = vi.fn<typeof fetch>();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
  vi.stubEnv('NEXT_PUBLIC_BACKEND_URL', '/api');
});

function fillForm(name = '  Иван  ', consent = true) {
  fireEvent.change(screen.getByRole('textbox', { name: 'Имя' }), { target: { value: name } });
  fireEvent.change(screen.getByRole('textbox', { name: 'Телефон' }), { target: { value: '89991234567' } });
  if (consent) {
    fireEvent.click(screen.getByRole('checkbox'));
  }
}

function submit() {
  const form = screen.getByRole('button', { name: 'Отправить' }).closest('form');
  if (!form) {
    throw new Error('Форма не найдена');
  }
  fireEvent.submit(form);
}

it('отправляет обрезанное имя и отформатированный телефон, показывает успех', async () => {
  fetchMock.mockResolvedValue(new Response(null, { status: 201 }));
  render(<ContactDialog isOpen={true} onClose={vi.fn()} />);
  fillForm();
  submit();
  expect(fetchMock).toHaveBeenCalledWith('/api/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Иван', phone: '+7 (999) 123-45-67' }),
  });
  expect(await screen.findByRole('heading', { name: 'Заявка отправлена' })).toBeTruthy();
});

it.each(['   ', 'x'.repeat(256)])('объясняет ошибку имени без запроса: %s', (name) => {
  render(<ContactDialog isOpen={true} onClose={vi.fn()} />);
  fillForm(name);
  submit();
  const input = screen.getByRole('textbox', { name: 'Имя' });
  expect(input.getAttribute('maxlength')).toBe('255');
  expect(input.getAttribute('aria-invalid')).toBe('true');
  expect(input.getAttribute('aria-describedby')).toBe(screen.getByRole('alert').id);
  expect(fetchMock).not.toHaveBeenCalled();
  fireEvent.change(input, { target: { value: 'Иван' } });
  expect(screen.queryByRole('alert')).toBeNull();
});

it('не отправляет заявку без согласия', () => {
  render(<ContactDialog isOpen={true} onClose={vi.fn()} />);
  fillForm('Иван', false);
  submit();
  expect(fetchMock).not.toHaveBeenCalled();
});

it('блокирует повторный запрос и поля до завершения отправки', async () => {
  const pending = Promise.withResolvers<Response>();
  fetchMock.mockReturnValue(pending.promise);
  render(<ContactDialog isOpen={true} onClose={vi.fn()} />);
  fillForm();
  const form = screen.getByRole('button', { name: 'Отправить' }).closest('form');
  if (!form) {
    throw new Error('Форма не найдена');
  }
  fireEvent.submit(form);
  fireEvent.submit(form);
  expect(fetchMock).toHaveBeenCalledTimes(1);
  expect(screen.getByRole('textbox', { name: 'Имя' }).hasAttribute('disabled')).toBe(true);
  expect(screen.getByRole('checkbox').hasAttribute('disabled')).toBe(true);
  expect(screen.getByRole('button', { name: 'Отправка...' }).hasAttribute('disabled')).toBe(true);
  await act(() => pending.resolve(new Response(null, { status: 201 })));
});

it.each(['http', 'network'])('показывает ошибку %s, сохраняет поля и позволяет повторить отправку', async (failure) => {
  if (failure === 'http') {
    fetchMock.mockResolvedValueOnce(new Response(null, { status: 500 }));
  } else {
    fetchMock.mockRejectedValueOnce(new Error('offline'));
  }
  fetchMock.mockResolvedValueOnce(new Response(null, { status: 201 }));
  render(<ContactDialog isOpen={true} onClose={vi.fn()} />);
  fillForm();
  submit();
  expect(await screen.findByRole('alert')).toBeTruthy();
  expect((screen.getByRole('textbox', { name: 'Имя' }) as HTMLInputElement).value).toBe('  Иван  ');
  expect(screen.getByRole('button', { name: 'Отправить' }).hasAttribute('disabled')).toBe(false);
  submit();
  expect(await screen.findByRole('heading', { name: 'Заявка отправлена' })).toBeTruthy();
  expect(fetchMock).toHaveBeenCalledTimes(2);
});

it.each(['success', 'error'])('игнорирует поздний %s после закрытия и не завершает новый запрос', async (outcome) => {
  const oldRequest = Promise.withResolvers<Response>();
  const newRequest = Promise.withResolvers<Response>();
  fetchMock.mockReturnValueOnce(oldRequest.promise).mockReturnValueOnce(newRequest.promise);
  const onClose = vi.fn();
  const view = render(<ContactDialog isOpen={true} onClose={onClose} />);
  fillForm();
  submit();
  fireEvent.click(screen.getByRole('button', { name: 'Закрыть форму' }));
  expect(onClose).toHaveBeenCalledOnce();
  view.rerender(<ContactDialog isOpen={false} onClose={onClose} />);
  view.rerender(<ContactDialog isOpen={true} onClose={onClose} />);
  expect((screen.getByRole('textbox', { name: 'Имя' }) as HTMLInputElement).value).toBe('');
  expect((screen.getByRole('textbox', { name: 'Телефон' }) as HTMLInputElement).value).toBe('');
  expect((screen.getByRole('checkbox') as HTMLInputElement).checked).toBe(false);
  expect(screen.getByRole('textbox', { name: 'Имя' }).hasAttribute('disabled')).toBe(false);
  fillForm('Анна');
  submit();
  await act(() => {
    if (outcome === 'success') {
      oldRequest.resolve(new Response(null, { status: 201 }));
    } else {
      oldRequest.reject(new Error('late error'));
    }
  });
  expect(screen.queryByRole('alert')).toBeNull();
  expect(screen.queryByRole('heading', { name: 'Заявка отправлена' })).toBeNull();
  expect(screen.getByRole('button', { name: 'Отправка...' }).hasAttribute('disabled')).toBe(true);
  await act(() => newRequest.resolve(new Response(null, { status: 201 })));
  expect(await screen.findByRole('heading', { name: 'Заявка отправлена' })).toBeTruthy();
});

it('сбрасывает ошибку имени при закрытии', () => {
  render(<ContactDialog isOpen={true} onClose={vi.fn()} />);
  fillForm('   ');
  submit();
  expect(screen.getByRole('alert')).toBeTruthy();
  fireEvent.click(screen.getByRole('button', { name: 'Закрыть форму' }));
  expect(screen.queryByRole('alert')).toBeNull();
});

it('безопасно завершает запрос после размонтирования', async () => {
  const pending = Promise.withResolvers<Response>();
  fetchMock.mockReturnValue(pending.promise);
  const view = render(<ContactDialog isOpen={true} onClose={vi.fn()} />);
  fillForm();
  submit();
  view.unmount();
  await act(() => pending.reject(new Error('unmounted')));
  await waitFor(() => expect(screen.queryByRole('dialog')).toBeNull());
});
