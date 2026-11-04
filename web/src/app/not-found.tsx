import Link from 'next/link';

import {H1, P} from '@/components/ui/typography';

export default function NotFound() {
  return (
    <main className={'flex flex-col items-center justify-center min-h-screen'}>
      <section className={'rounded-2xl bg-card p-10'}>
        <H1 variant={'page'} className={'mb-4'}>{'Страница не найдена'}</H1>
        <P className={'text-lg mb-8'}>
          {'К сожалению, запрашиваемая страница не существует.'}
        </P>
        <Link
          href={'/'}
          className={'px-6 py-3 rounded-lg transition bg-primary text-black text-lg'}
        >
          {'Вернуться на главную'}
        </Link>
      </section>
    </main>
  );
}