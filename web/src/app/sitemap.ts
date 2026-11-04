import type {MetadataRoute} from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://elloria.ru',
      changeFrequency: 'weekly',
      priority: 1
    },
    {
      url: 'https://elloria.ru/privacy',
      changeFrequency: 'yearly',
      priority: 0.3
    },
    {
      url: 'https://elloria.ru/consent',
      changeFrequency: 'yearly',
      priority: 0.3
    }
  ];
}
