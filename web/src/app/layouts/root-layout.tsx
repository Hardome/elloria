import type { Metadata } from 'next';
import { Cormorant_Garamond as Cormorant } from 'next/font/google';
import localFont from 'next/font/local';

import { COMPANY } from '@/entities/company';
import { createSocialMetadata } from '@/shared/config';
import Footer from '@/widgets/footer';
import Header from '@/widgets/header';

import '../styles/globals.css';

const cormorant = Cormorant({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  preload: true,
  // Показываем системный шрифт, пока загружается основной.
  display: 'swap',
});

const houschkaPro = localFont({
  src: [
    {
      path: '../fonts/HouschkaPro-Light.woff2',
      weight: '500',
      style: 'normal',
    },
  ],
  variable: '--font-houschka',
  preload: true,
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'ELLORIA - Жилой посёлок в Тюмени',
  description: 'ELLORIA - это посёлок с уникальной архитектурой и инфраструктурой для комфортного проживания',
  keywords: [
    'ELLORIA',
    'ЖК',
    'Тюмень',
    'Посёлок',
    'Купить дом',
    'Продажа домов',
    'Дома',
    'Архитектура',
    'Инфраструктура',
    'Комфортное проживание',
  ],
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/x-icon',
      rel: 'icon',
    },
  },
  alternates: {
    canonical: 'https://elloria.ru',
  },
  ...createSocialMetadata(
    'ELLORIA — Жилой посёлок в Тюмени',
    'ELLORIA — посёлок с уникальной архитектурой и инфраструктурой для комфортного проживания',
    'https://elloria.ru',
  ),
};

const organization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': 'https://elloria.ru/#organization',
  name: COMPANY.name,
  url: 'https://elloria.ru',
  taxID: COMPANY.inn,
  address: COMPANY.address,
  telephone: COMPANY.phone,
  email: COMPANY.email,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={'ru'}>
      <body className={`${cormorant.variable} ${houschkaPro.variable} antialiased`}>
        <script type={'application/ld+json'}>{JSON.stringify(organization).replace(/</g, '\\u003c')}</script>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
