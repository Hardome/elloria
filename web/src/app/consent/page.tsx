/* eslint-disable max-len */
import type {Metadata} from 'next';
import Link from 'next/link';

import {COMPANY} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Согласие на обработку персональных данных | ELLORIA',
  description: 'Условия согласия на обработку имени и номера телефона при отправке заявки на сайте ELLORIA.',
  alternates: {canonical: 'https://elloria.ru/consent'}
};

export default function ConsentPage() {
  return (
    <main className={'min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6'}>
      <article className={'mx-auto flex max-w-3xl flex-col gap-8 font-houschka text-foreground'}>
        <header className={'flex flex-col gap-3'}>
          <Link href={'/'} className={'text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground'}>
            {'На главную'}
          </Link>
          <h1 className={'font-serif text-4xl leading-tight sm:text-5xl'}>
            {'Согласие на обработку персональных данных'}
          </h1>
          <p className={'text-sm text-muted-foreground'}>{'Редакция от 23 сентября 2026 года'}</p>
        </header>

        <section className={'flex flex-col gap-4'}>
          <p>
            {'Отмечая чекбокс согласия и отправляя форму на сайте elloria.ru, я даю '}
            {COMPANY.name}
            {` (ИНН ${COMPANY.inn}, адрес: ${COMPANY.address}) согласие на обработку моих персональных данных на следующих условиях:`}
          </p>
          <ul className={'ml-6 list-disc space-y-3'}>
            <li>{'Данные: указанные мной имя и номер телефона.'}</li>
            <li>{'Цель: обработать мою заявку и связаться со мной по указанному номеру телефона.'}</li>
            <li>
              {'Действия: сбор, запись, систематизация, хранение, уточнение, использование и удаление данных. Обработка осуществляется с использованием средств автоматизации.'}
            </li>
            <li>
              {'Согласие действует с момента отправки формы до достижения указанной цели или до его отзыва, но не более одного года с даты последнего взаимодействия по заявке, если дальнейшая обработка не требуется на ином законном основании.'}
            </li>
          </ul>
          <p>
            {'Я могу отозвать согласие, направив обращение на '}
            <a href={`mailto:${COMPANY.email}`} className={'underline underline-offset-4'}>
              {COMPANY.email}
            </a>
            {'. Отзыв не затрагивает законность обработки, выполненной до его получения.'}
          </p>
          <p>
            {'Сведения о порядке обработки и правах посетителя приведены в '}
            <Link href={'/privacy'} className={'underline underline-offset-4'}>
              {'политике обработки персональных данных'}
            </Link>
            {'. Согласие на получение рекламных сообщений настоящим документом не предоставляется.'}
          </p>
        </section>
      </article>
    </main>
  );
}
