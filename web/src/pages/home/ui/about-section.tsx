import Image from 'next/image';

import { H2, P } from '@/shared/ui/typography';

const aboutContent = [
  {
    title: 'О поселке',
    text:
      'Представьте место, где архитектура будущего встречается с энергией природы. ' +
      'Где ваш день начинается не с пробки, а с пробежки на природе. ' +
      'Вы вдыхаете запах листвы летом, снега зимой, и влажности природы в межсезонье, ' +
      'наполняя свои легкие этой силой. Где вечером вы не стоите в очереди в прачечную, ' +
      'а играете с детьми в парке или обсуждаете последние новости с соседями за чашкой ' +
      'кофе в нашем коворкинге.\n\n' +
      'ELLORIA — это не просто дома. Это продуманная экосистема для жизни без суеты.',
    image: '/walkingArea.webp',
    imageHeight: 1080,
    alt: 'Счастливая семья в поселке',
  },
  {
    title: 'Архитектура',
    text:
      'Архитектура, которая вдохновляет: Мы построили поселок с уникальным ' +
      'современным дизайном — чистые линии, панорамное остекление, натуральные материалы. ' +
      'Каждый дом — это авторский проект, который гармонично вписан в ландшафт.\n\n' +
      'Инфраструктура, которая освобождает время: Забудьте о рутине. На территории поселка ' +
      'работает сервис управления бытом: от клининга и службы доставки продуктов до вывоза ' +
      'мусора и вызова мастера. Ваше время слишком ценно, чтобы тратить его на это.',
    image: '/topPerspective3.webp',
    imageHeight: 1080,
    alt: 'Современная архитектура домов',
  },
  {
    title: 'Природа',
    text:
      'Природа и активность прямо за порогом: Наш собственный ландшафтный парк ' +
      'с велодорожками, зоны для пикников и спортивный кластер с современным залом и ' +
      'площадками для функциональных тренировок. А прямо за территорией — настоящая природа, ' +
      'ставшая вашим личным заповедником.\n\n' +
      'Сообщество единомышленников: Мы создаем дружелюбную среду, где соседи знают друг ' +
      'друга по имени, а дети вместе играют на безопасных улицах. Здесь рождаются настоящие ' +
      'дружбы и традиции.',
    image: '/garden.webp',
    imageHeight: 1278,
    alt: 'Парк и природа',
  },
];

const imageSizes = [
  '(min-width: 1536px) 688px',
  '(min-width: 1280px) 560px',
  '(min-width: 1024px) 432px',
  '(min-width: 768px) 688px',
  '(min-width: 640px) 560px',
  'calc(100vw - 80px)',
].join(', ');

export default function AboutSection() {
  return (
    <section id={'about'} className={'bg-background py-20'}>
      <div className={'container mx-auto px-4 lg:px-8'}>
        <div className={'space-y-20 lg:space-y-32'}>
          {aboutContent.map((item, index) => (
            <article
              key={item.title}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 rounded-2xl bg-card p-6 lg:gap-16 lg:p-8`}
            >
              <div className={'flex flex-col justify-center space-y-4 lg:w-1/2 lg:px-15'}>
                <H2 variant={'card'}>{item.title}</H2>
                <P variant={'body'}>{item.text}</P>
              </div>
              <div className={'overflow-hidden rounded-2xl shadow-medium lg:aspect-[2/1] lg:min-h-[480px] lg:w-1/2'}>
                <Image
                  src={item.image}
                  alt={item.alt}
                  width={1920}
                  height={item.imageHeight}
                  className={[
                    'aspect-[3/2] h-auto w-full object-cover transition-transform duration-500',
                    'hover:scale-105 lg:aspect-auto lg:h-full',
                  ].join(' ')}
                  sizes={imageSizes}
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
