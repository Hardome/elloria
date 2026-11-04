/* eslint-disable max-len */
import type {Metadata} from 'next';
import {Cormorant_Garamond as Cormorant} from 'next/font/google';
import localFont from 'next/font/local';

import Footer from '@/components/Footer';
import Header from '@/components/Header';

import './globals.css';

const cormorant = Cormorant({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'cyrillic'],
  variable: '--font-cormorant',
  preload: true, /* заренее начинает грузить шрифт (<link rel="preload" as="font">) */
  display: 'swap' /* позволяет отображать сначала системный шрифт без ожидания окончани загрузки кастомного, затем заменяет на кастомный */
});

const houschkaPro = localFont({
  src: [{
    path: './fonts/HouschkaPro-Light.woff2',
    weight: '500',
    style: 'normal'
  }],
  variable: '--font-houschka',
  preload: true,
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'ELLORIA - Жилой посёлок в Тюмени',
  description: 'ELLORIA - это посёлок с уникальной архитектурой и инфраструктурой для комфортного проживания',
  keywords: ['ELLORIA', 'ЖК', 'Тюмень', 'Посёлок', 'Купить дом', 'Продажа домов', 'Дома', 'Архитектура', 'Инфраструктура', 'Комфортное проживание'],
  icons: {
    icon: {
      url: '/favicon.ico',
      type: 'image/x-icon',
      rel: 'icon'
    }
  },
  alternates: {
    canonical: 'https://elloria.ru'
  },
  openGraph: {
    title: 'ELLORIA — Жилой посёлок в Тюмени',
    description: 'ELLORIA — посёлок с уникальной архитектурой и инфраструктурой для комфортного проживания',
    url: 'https://elloria.ru',
    siteName: 'ELLORIA',
    images: [
      {
        url: 'https://elloria.ru/topPerspective3.webp',
        width: 1200,
        height: 630,
        alt: 'ELLORIA — вид сверху'
      }
    ],
    locale: 'ru_RU',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ELLORIA — Жилой посёлок в Тюмени',
    description: 'ELLORIA — посёлок с уникальной архитектурой и инфраструктурой для комфортного проживания',
    images: ['https://elloria.ru/topPerspective3.webp']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang={'ru'}>
      <body className={`${cormorant.variable} ${houschkaPro.variable} antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
