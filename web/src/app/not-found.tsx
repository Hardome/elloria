import Link from 'next/link';

import { H1, P } from '@/components/ui/typography';

export default function NotFound() {
  return (
    <main className={'flex min-h-screen flex-col items-center justify-center'}>
      <section className={'rounded-2xl bg-card p-10'}>
        <H1 variant={'page'} className={'mb-4'}>
          {'Страница не найдена'}
        </H1>
        <P className={'mb-8 text-lg'}>{'К сожалению, запрашиваемая страница не существует.'}</P>
        <Link href={'/'} className={'rounded-lg bg-primary px-6 py-3 text-lg text-black transition'}>
          {'Вернуться на главную'}
        </Link>
      </section>
    </main>
  );
}
