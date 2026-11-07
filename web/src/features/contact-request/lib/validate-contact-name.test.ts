import { expect, test as it } from 'vitest';

import { validateContactName } from './validate-contact-name';

it.each(['', '   ', '\t'])('отклоняет пустое имя %j', (name) => {
  expect(validateContactName(name)).toBe('Укажите своё имя');
});

it.each(['Иван', '  Анна  ', 'я'.repeat(255)])('принимает непустое имя допустимой длины %j', (name) => {
  expect(validateContactName(name)).toBeNull();
});

it('отклоняет имя длиннее 255 символов', () => {
  expect(validateContactName('я'.repeat(256))).toBe('Имя не должно быть длиннее 255 символов');
});
