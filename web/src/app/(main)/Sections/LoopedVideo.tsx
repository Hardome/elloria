import ChooseHouseButton from '@/components/ChooseHouseButton';
import {H1, Lead} from '@/components/ui/typography';

export default function LoopedVideoSection() {
  return (
    <section
      aria-label={'Главная секция с видео'}
      className={'relative h-[100vh] w-full md:h-screen overflow-hidden'}
    >
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
      <div className={'relative h-full flex flex-col items-center justify-center px-4 text-center'}>
        <div className={'max-w-4xl space-y-6 animate-fade-in'}>
          <H1 variant={'hero'}>
            {'Дружелюбный поселок \nв пяти минутах от города'}
          </H1>
          <Lead variant={'hero'}>
            {'Ваш дом — место наполнения энергией'}
          </Lead>
          <ChooseHouseButton size={'4xl'} className={'rounded-full mt-4 text-xl'} />
        </div>
      </div>
      <div className={'absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'}>
        <div
          className={
            'w-6 h-10 border-2 border-white/50 ' +
            'rounded-full flex items-start justify-center p-2'
          }
        >
          <div className={'w-1.5 h-3 bg-white/50 rounded-full'} />
        </div>
      </div>
    </section>
  );
}