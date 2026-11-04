'use client';

import React, {useState} from 'react';
import {Menu, Phone, X} from 'lucide-react';
import Link from 'next/link';

import ChooseHouseButton from '@/components/ChooseHouseButton';
import {Button} from '@/components/ui/button';
import {P} from '@/components/ui/typography';
import useScrollToSection from '@/hooks/useScrollToSection';
import {COMPANY, MENU_ITEMS} from '@/lib/constants';

import MobileMenu from './MobileMenu';

const scrollToTop = () => {
  window.scrollTo({top: 0, behavior: 'smooth'});
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
      <header
        className={
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ' +
          'bg-background'
        }
      >
        <div className={'container mx-auto px-4 lg:px-8'}>
          <div className={'flex items-center justify-between h-18'}>
            <Link
              href={'/'}
              onClick={scrollToTop}
              className={'text-xl lg:text-2xl font-bold hover:opacity-80 transition-opacity'}
              aria-label={'ELLORIA - перейти на главную страницу'}
            >
              {'ELLORIA'}
            </Link>
            <nav className={'hidden lg:flex items-center gap-8'} aria-label={'Основная навигация'}>
              {
                MENU_ITEMS.map((item) => (
                  <Button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={'text-lg text-white hover:text-gray-300 transition-colors'}
                    variant={'text'}
                    aria-label={`Перейти к разделу ${item.label}`}
                  >
                    {item.label}
                  </Button>
                ))
              }
            </nav>
            <div className={'flex items-center gap-4'}>
              <a
                href={COMPANY.phoneHref}
                className={
                  'hidden lg:flex items-center gap-2 text-white hover:text-gray-300 ' +
                  'transition-colors text-lg font-medium'
                }
              >
                <Phone size={18} />
                <P>{COMPANY.phone}</P>
              </a>
              <ChooseHouseButton size={'lg'} className={'hidden lg:flex rounded-full'} />
              <Button
                id={'mobile-menu-toggle'}
                onClick={toggleMobileMenu}
                variant={'text'}
                size={'lg'}
                className={'lg:hidden p-2 text-white hover:text-gray-300 transition-colors'}
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

