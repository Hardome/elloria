import type { FastifyPluginAsync } from 'fastify';

import { ContactRepository } from '#app/modules/contacts/repository';
import { registerContactRoutes } from '#app/modules/contacts/routes';

export const contactModule: FastifyPluginAsync<{ exportKey: string }> = async (app, options) => {
  registerContactRoutes(app, new ContactRepository(app.db), options.exportKey);
};
