import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const localesService = strapi.plugin('i18n').service('locales');

    const existingLocales = await localesService.find();
    const existingCodes = existingLocales.map((l: any) => l.code);

    if (!existingCodes.includes('es')) {
      await localesService.create({ code: 'es', name: 'Spanish (es)' });
    }

    if (!existingCodes.includes('en')) {
      await localesService.create({ code: 'en', name: 'English (en)' });
    }

    const coreStore = strapi.store({ type: 'core' });
    const currentDefault = await coreStore.get({ key: 'default_locale' });

    if (!currentDefault || currentDefault !== 'es') {
      await coreStore.set({ key: 'default_locale', value: 'es' });
    }
  },
};