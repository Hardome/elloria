export function validateContactName(name: string): string | null {
  if (!name.trim()) {
    return 'Укажите своё имя';
  }
  if (name.length > 255) {
    return 'Имя не должно быть длиннее 255 символов';
  }
  return null;
}
