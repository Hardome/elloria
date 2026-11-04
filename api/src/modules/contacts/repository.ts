import { and, asc, gt, lte, sql } from 'drizzle-orm';
import type { NodePgDatabase } from 'drizzle-orm/node-postgres';

import { type ContactRow, contacts } from '#app/db/schema/contacts';
import type * as databaseSchema from '#app/db/schema/index';
import type { CreateContact } from '#app/generated/types.gen';

export class ContactRepository {
  readonly #database: NodePgDatabase<typeof databaseSchema>;

  constructor(database: NodePgDatabase<typeof databaseSchema>) {
    this.#database = database;
  }

  async create(input: CreateContact): Promise<ContactRow> {
    const [contact] = await this.#database.insert(contacts).values(input).returning();
    if (!contact) throw new Error('Не удалось сохранить заявку');
    return contact;
  }

  async exportUpperBound(): Promise<number> {
    const [row] = await this.#database.select({ id: sql<number>`coalesce(max(${contacts.id}), 0)` }).from(contacts);
    return row?.id ?? 0;
  }

  async exportBatch(afterId: number, upperBound: number, limit: number): Promise<ContactRow[]> {
    return this.#database
      .select()
      .from(contacts)
      .where(and(gt(contacts.id, afterId), lte(contacts.id, upperBound)))
      .orderBy(asc(contacts.id))
      .limit(limit);
  }
}
