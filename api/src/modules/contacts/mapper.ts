import type { ContactRow } from '#app/db/schema/contacts';
import type { Contact } from '#app/generated/types.gen';

export function toContact(row: ContactRow): Contact {
  return { id: row.id, name: row.name, phone: row.phone, createdAt: row.createdAt.toISOString() };
}
