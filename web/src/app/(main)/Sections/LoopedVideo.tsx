import ChooseHouseButton from '@/components/ChooseHouseButton';
import { H1, Lead } from '@/components/ui/typography';

export default function LoopedVideoSection() {
  return (
    <section aria-label={'Главная секция с видео'} className={'relative h-[100vh] w-full overflow-hidden md:h-screen'}>
      <video
        className={'absolute inset-0 h-full w-full object-cover opacity-70'}
        src={'/interview.webm'}
        autoPlay={true}
        muted={true}
        loop={true}
        playsInline={true}
        aria-label={'Видео презентация поселка ELLORIA'}
      />
      <div className={'absolute inset-0 bg-black/40'} />
      <div className={'relative flex h-full flex-col items-center justify-center px-4 text-center'}>
        <div className={'animate-fade-in max-w-4xl space-y-6'}>
          <H1 variant={'hero'}>{'Дружелюбный поселок \nв пяти минутах от города'}</H1>
          <Lead variant={'hero'}>{'Ваш дом — место наполнения энергией'}</Lead>
          <ChooseHouseButton size={'4xl'} className={'mt-4 rounded-full text-xl'} />
        </div>
      </div>
      <div className={'absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'}>
        <div className={'flex h-10 w-6 items-start justify-center rounded-full border-2 border-white/50 p-2'}>
          <div className={'h-3 w-1.5 rounded-full bg-white/50'} />
        </div>
      </div>
    </section>
  );
}
