'use client';

import React, { useState } from 'react';

import { Menu, Phone, X } from 'lucide-react';
import Link from 'next/link';

import { COMPANY } from '@/entities/company';
import ChooseHouseButton from '@/features/choose-house';
import { MENU_ITEMS } from '@/shared/config';
import useScrollToSection from '@/shared/lib/navigation';
import { Button } from '@/shared/ui/button';
import { P } from '@/shared/ui/typography';

import MobileMenu from './mobile-menu';

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export default function HeaderClient() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const scrollToSection = useScrollToSection();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <React.Fragment>
      <header className={'fixed top-0 right-0 left-0 z-50 bg-background transition-all duration-300'}>
        <div className={'container mx-auto px-4 lg:px-8'}>
          <div className={'flex h-18 items-center justify-between'}>
            <Link
              href={'/'}
              onClick={scrollToTop}
              className={'text-xl font-bold transition-opacity hover:opacity-80 lg:text-2xl'}
              aria-label={'ELLORIA - перейти на главную страницу'}
            >
              {'ELLORIA'}
            </Link>
            <nav className={'hidden items-center gap-8 lg:flex'} aria-label={'Основная навигация'}>
              {MENU_ITEMS.map((item) => (
                <Button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={'text-lg text-white transition-colors hover:text-gray-300'}
                  variant={'text'}
                  aria-label={`Перейти к разделу ${item.label}`}
                >
                  {item.label}
                </Button>
              ))}
            </nav>
            <div className={'flex items-center gap-4'}>
              <a
                href={COMPANY.phoneHref}
                className={[
                  'hidden items-center gap-2 text-lg font-medium text-white transition-colors',
                  'hover:text-gray-300 lg:flex',
                ].join(' ')}
              >
                <Phone size={18} />
                <P>{COMPANY.phone}</P>
              </a>
              <ChooseHouseButton size={'lg'} className={'hidden rounded-full lg:flex'} />
              <Button
                id={'mobile-menu-toggle'}
                onClick={toggleMobileMenu}
                variant={'text'}
                size={'lg'}
                className={'p-2 text-white transition-colors hover:text-gray-300 lg:hidden'}
                title={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-label={isMobileMenuOpen ? 'Закрыть меню' : 'Открыть меню'}
                aria-expanded={isMobileMenuOpen}
                aria-controls={'mobile-menu-panel'}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </Button>
            </div>
          </div>
        </div>
      </header>
      <MobileMenu isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
    </React.Fragment>
  );
}
