import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

import { COMPANY } from '@/entities/company';
import { ContactRequestButton } from '@/features/contact-request';
import { MaxIcon, TelegramIcon } from '@/shared/ui/icons';
import { H2 } from '@/shared/ui/typography';

const messengers = [
  { href: COMPANY.maxHref, label: 'Max' },
  { href: COMPANY.tgHref, label: 'Telegram' },
];

const Footer = () => (
  <footer className={'bg-secondary pt-20 pb-8 text-secondary-foreground'}>
    <div className={'container mx-auto px-4 lg:px-8'}>
      <div className={'mb-12 grid gap-12 md:grid-cols-2 lg:grid-cols-3'}>
        {/* About Company */}
        <div className={'space-y-4'}>
          <H2 variant={'footerLarge'}>{'ELLORIA'}</H2>
          <p className={'text-sm text-primary-foreground/80'}>
            {'Строительная компания с 15-летним опытом. Реализовано более 30\r'}
            {'успешных проектов.\r'}
          </p>
          <p className={'text-xs text-secondary-foreground'}>
            {COMPANY.name}
            {COMPANY.inn && ` ИНН ${COMPANY.inn}`}
          </p>
        </div>

        {/* Contacts */}
        <address id={'contacts'} className={'space-y-4 not-italic'}>
          <H2 variant={'footer'}>{'Контакты'}</H2>
          <div className={'space-y-3 text-sm text-primary-foreground/80'}>
            <div className={'flex items-start gap-3'}>
              <MapPin size={18} className={'mt-1 flex-shrink-0'} aria-hidden={'true'} />
              <span>
                <span>{COMPANY.address}</span>
              </span>
            </div>
            <div className={'flex items-center gap-3'}>
              <Phone size={18} className={'flex-shrink-0'} aria-hidden={'true'} />
              <a href={COMPANY.phoneHref} className={'transition-colors hover:text-primary-foreground'}>
                {COMPANY.phone}
              </a>
            </div>
            <div className={'flex items-center gap-3'}>
              <Mail size={18} className={'flex-shrink-0'} aria-hidden={'true'} />
              <a href={`mailto:${COMPANY.email}`} className={'transition-colors hover:text-primary-foreground'}>
                {COMPANY.email}
              </a>
            </div>
          </div>
        </address>

        {/* Messengers & CTA */}
        <div className={'space-y-4'}>
          <H2 variant={'footer'}>{'Связаться с нами'}</H2>
          <div className={'flex gap-3'}>
            {messengers.map((messenger) => (
              <a
                key={messenger.label}
                href={messenger.href}
                target={'_blank'}
                rel={'noopener noreferrer'}
                aria-label={`Написать в ${messenger.label}`}
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10',
                  'transition-colors hover:bg-primary-foreground/20',
                ].join(' ')}
              >
                {messenger.label === 'Max' ? <MaxIcon size={20} /> : <TelegramIcon size={20} />}
              </a>
            ))}
          </div>
          <ContactRequestButton
            payload={{ from: 'Футер сайта' }}
            className={'mt-4 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90'}
            size={'lg'}
          >
            {'Оставить заявку\r'}
          </ContactRequestButton>
        </div>
      </div>

      <div className={'border-t border-primary-foreground/20 pt-8 text-center text-sm text-secondary-foreground'}>
        <p>{`© ${new Date().getFullYear()} ELLORIA. Все права защищены.`}</p>
        <nav
          aria-label={'Документы о персональных данных'}
          className={'mt-2 flex flex-wrap justify-center gap-x-6 gap-y-2'}
        >
          <Link href={'/privacy'} className={'underline underline-offset-4 hover:text-primary-foreground'}>
            {'Политика обработки персональных данных'}
          </Link>
          <Link href={'/consent'} className={'underline underline-offset-4 hover:text-primary-foreground'}>
            {'Согласие на обработку персональных данных'}
          </Link>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
