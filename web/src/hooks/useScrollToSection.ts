import {useRouter} from 'next/navigation';

const HEADER_HEIGHT = 72 as const;

export default function useScrollToSection() {
  const router = useRouter();

  return (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - HEADER_HEIGHT;

      window.scrollTo({top: offsetPosition, behavior: 'smooth'});
    } else {
      router.push(`/#${id}`);
    }
  };
};
