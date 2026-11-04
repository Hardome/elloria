'use client';

import {useState} from 'react';
import {Home} from 'lucide-react';

import ContactDialog from '@/components/ContactDialog';
import ProjectMedia from '@/components/ProjectMedia';
import {Button} from '@/components/ui/button';
import {H2, H3, P} from '@/components/ui/typography';

const generateProjectImages = (
  folderName: string,
  count: number,
  imageName: string
) => Array.from(
  {length: count},
  (_, i) => {
    return {
      src: `/${folderName}/${imageName} (${i}).webp`,
      alt: `Изображение проекта ${folderName}`
    };
  }
);

const projects = [
  {
    id: 1,
    name: 'Проект «Willow Breeze»',
    area: 291.1,
    price: 'от 34 900 000 ₽',
    images: generateProjectImages('WillowBreeze', 26, 'Willow Breeze')
  },
  {
    id: 2,
    name: 'Проект «Serenity»',
    area: 147.3,
    price: 'от 17 600 000 ₽',
    images: generateProjectImages('Serenity', 16, 'Serenity')
  },
  {
    id: 3,
    name: 'Проект «Sunnybrook»',
    area: 152,
    price: 'от 18 200 000 ₽',
    images: generateProjectImages('Sunnybrook', 33, 'Sunnybrook')
  },
  {
    id: 4,
    name: 'Проект «Hilltop»',
    area: 265.4,
    price: 'от 25 800 000 ₽',
    images: generateProjectImages('Hilltop', 19, 'Hilltop')
  },
  {
    id: 5,
    name: 'Проект «Neo»',
    area: 455.59,
    price: 'от 42 060 000 ₽',
    images: generateProjectImages('Neo', 16, 'Neo')
  }
];

const ProjectsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id={'projects'} className={'py-20 lg:py-32 bg-background'}>
      <div className={'container mx-auto px-4 lg:px-8'}>
        <H2 variant={'section'} className={'mb-16 text-primary'}>
          {'Проекты'}
        </H2>
        <div className={'grid md:grid-cols-2 gap-8 lg:gap-12'}>
          {
            projects.map((project) => (
              <article
                key={project.id}
                className={
                  'bg-card rounded-2xl overflow-hidden shadow-soft ' +
                  'hover:shadow-medium transition-shadow'
                }
                itemScope={true}
                itemType={'https://schema.org/Product'}
              >
                {/* Image Gallery */}
                <ProjectMedia images={project.images} />

                {/* Content */}
                <div className={'p-6 lg:p-8'}>
                  <H3 variant={'card'} className={'text-card-foreground mb-4'} itemProp={'name'}>
                    {project.name}
                  </H3>

                  <div className={'flex items-center gap-2 text-muted-foreground'}>
                    <Home size={24} />
                    <P className={'text-2xl font-bold'}>{project.area}{' м²'}</P>
                  </div>

                  <div className={'pt-4 border-t border-border'}>
                    <P
                      variant={'price'}
                      className={'mb-4'}
                      itemProp={'offers'}
                      itemScope={true}
                      itemType={'https://schema.org/Offer'}
                    >
                      <meta itemProp={'price'} content={project.price.replace(/\D/g, '')} />
                      <meta itemProp={'priceCurrency'} content={'RUB'} />
                      {project.price}
                    </P>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className={'w-full rounded-full hover:opacity-90 transition-opacity text-xl'}
                      size={'lg'}
                    >
                      {'Узнать подробнее'}
                    </Button>
                  </div>
                </div>
              </article>
            ))
          }
        </div>
      </div>

      {/* Contact Modal */}
      <ContactDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ProjectsSection;
