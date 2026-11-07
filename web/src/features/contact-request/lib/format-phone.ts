export function formatPhone(rawValue: string) {
  const digits = rawValue.replace(/\D/g, '');

  if (!digits) {
    return '';
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

  return formatted;
}
