/* eslint-disable max-len */
import type {Metadata} from 'next';
import Link from 'next/link';

import {COMPANY} from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Политика обработки персональных данных | ELLORIA',
  description: 'Как ООО «Архитектор» обрабатывает персональные данные посетителей сайта ELLORIA.',
  alternates: {canonical: 'https://elloria.ru/privacy'}
};

export default function PrivacyPage() {
  return (
    <main className={'min-h-screen bg-background px-4 pb-20 pt-32 sm:px-6'}>
      <article className={'mx-auto flex max-w-3xl flex-col gap-8 font-houschka text-foreground'}>
        <header className={'flex flex-col gap-3'}>
          <Link href={'/'} className={'text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground'}>
            {'На главную'}
          </Link>
          <h1 className={'font-serif text-4xl leading-tight sm:text-5xl'}>
            {'Политика обработки персональных данных'}
          </h1>
          <p className={'text-sm text-muted-foreground'}>{'Редакция от 23 сентября 2026 года'}</p>
        </header>

        <section className={'flex flex-col gap-3'}>
          <h2 className={'font-serif text-2xl'}>{'1. Общие положения'}</h2>
          <p>
            {'Настоящая политика описывает обработку персональных данных при использовании сайта elloria.ru и отправке заявки на обратную связь. Оператор персональных данных — '}
            {COMPANY.name}
            {` (ИНН ${COMPANY.inn}), адрес: ${COMPANY.address}.`}
          </p>
          <p>
            {'По вопросам обработки данных и для реализации своих прав можно обратиться по адресу '}
            <a href={`mailto:${COMPANY.email}`} className={'underline underline-offset-4'}>
              {COMPANY.email}
            </a>
            {'.'}
          </p>
        </section>

        <section className={'flex flex-col gap-3'}>
          <h2 className={'font-serif text-2xl'}>{'2. Цель, данные и основание обработки'}</h2>
          <p>
            {'При отправке заявки оператор получает указанные посетителем имя и номер телефона. Эти данные используются для обработки заявки и связи с посетителем по его запросу. Основание обработки — согласие посетителя, выраженное отдельной отметкой в форме.'}
          </p>
          <p>
            {'При работе сайта также могут обрабатываться технические данные запроса, в том числе IP-адрес, дата и время обращения, сведения о браузере. Они используются для работы сайта и обеспечения его безопасности.'}
          </p>
        </section>

        <section className={'flex flex-col gap-3'}>
          <h2 className={'font-serif text-2xl'}>{'3. Как обрабатываются данные'}</h2>
          <p>
            {'Оператор собирает, записывает, систематизирует, хранит, использует, уточняет и удаляет данные с применением средств автоматизации. Данные заявок хранятся в базе данных на территории Российской Федерации. Оператор не передаёт данные заявок третьим лицам и не осуществляет их трансграничную передачу.'}
          </p>
          <p>
            {'Доступ к данным ограничивается лицами, которым он необходим для обработки заявок. Оператор применяет организационные и технические меры для защиты данных от неправомерного доступа.'}
          </p>
        </section>

        <section className={'flex flex-col gap-3'}>
          <h2 className={'font-serif text-2xl'}>{'4. Срок обработки и удаление'}</h2>
          <p>
            {'Данные заявки обрабатываются до завершения взаимодействия по ней, но не более одного года с даты последнего взаимодействия. Если цель обработки достигнута раньше или согласие отозвано, оператор прекращает обработку и удаляет данные в предусмотренный законом срок, если нет иного законного основания для их хранения.'}
          </p>
        </section>

        <section className={'flex flex-col gap-3'}>
          <h2 className={'font-serif text-2xl'}>{'5. Права посетителя'}</h2>
          <p>
            {'Посетитель вправе запросить сведения об обработке своих данных, потребовать их уточнения или удаления, а также отозвать согласие. Для этого нужно направить обращение на '}
            <a href={`mailto:${COMPANY.email}`} className={'underline underline-offset-4'}>
              {COMPANY.email}
            </a>
            {'. Для рассмотрения обращения оператору может потребоваться подтвердить личность заявителя.'}
          </p>
          <p>
            {'Условия согласия при отправке формы изложены в отдельном '}
            <Link href={'/consent'} className={'underline underline-offset-4'}>
              {'документе'}
            </Link>
            {'.'}
          </p>
        </section>
      </article>
    </main>
  );
}
