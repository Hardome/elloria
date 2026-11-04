'use client';

import { useState } from 'react';

import { Home } from 'lucide-react';

import ContactDialog from '@/features/contact-request';
import { Button } from '@/shared/ui/button';
import { H2, H3, P } from '@/shared/ui/typography';

import { projects } from '../model/projects';
import ProjectMedia from './project-media';

const ProjectsSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id={'projects'} className={'bg-background py-20 lg:py-32'}>
      <div className={'container mx-auto px-4 lg:px-8'}>
        <H2 variant={'section'} className={'mb-16 text-primary'}>
          {'Проекты'}
        </H2>
        <div className={'grid gap-8 md:grid-cols-2 lg:gap-12'}>
          {projects.map((project) => (
            <article
              key={project.id}
              className={'overflow-hidden rounded-2xl bg-card shadow-soft transition-shadow hover:shadow-medium'}
              itemScope={true}
              itemType={'https://schema.org/Product'}
            >
              {/* Image Gallery */}
              <ProjectMedia images={project.images} />

              {/* Content */}
              <div className={'p-6 lg:p-8'}>
                <H3 variant={'card'} className={'mb-4 text-card-foreground'} itemProp={'name'}>
                  {project.name}
                </H3>

                <div className={'flex items-center gap-2 text-muted-foreground'}>
                  <Home size={24} />
                  <P className={'text-2xl font-bold'}>
                    {project.area}
                    {' м²'}
                  </P>
                </div>

                <div className={'border-t border-border pt-4'}>
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
                    className={'w-full rounded-full text-xl transition-opacity hover:opacity-90'}
                    size={'lg'}
                  >
                    {'Узнать подробнее'}
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Contact Modal */}
      <ContactDialog isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};

export default ProjectsSection;
