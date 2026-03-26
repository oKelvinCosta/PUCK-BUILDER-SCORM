import CourseHeader from '@/components/course-header';
import type { ComponentConfig } from '@puckeditor/core';

export type HeaderChoicesBlockProps = {
  gradient: 'gradient01' | 'gradient02';
  grade: string;
  subject: string;
  backgroundSrc: string;
  dividerType:
    | 'type01'
    | 'type02'
    | 'type03'
    | 'type04'
    | 'type05'
    | 'type06'
    | 'type07'
    | 'type08'
    | 'type09'
    | 'type10';
};

export const HeaderChoicesBlock: ComponentConfig<HeaderChoicesBlockProps> = {
  fields: {
    gradient: {
      type: 'text',
      label: 'Gradiente',
    },
    grade: {
      type: 'text',
      label: 'Série/Ano',
    },
    subject: {
      type: 'text',
      label: 'Assunto',
    },
    backgroundSrc: {
      type: 'text',
      label: 'Imagem de Fundo',
    },
    dividerType: {
      type: 'text',
      label: 'Tipo de Divisor',
    },
  },
  defaultProps: {
    gradient: 'gradient02',
    grade: '9º ano',
    subject: 'Sonhos viram realidade',
    backgroundSrc: './imgs/Hero.webp',
    dividerType: 'type02',
  },
  render: ({ gradient, grade, subject, backgroundSrc, dividerType }) => {
    return (
      <CourseHeader
        gradient={gradient}
        grade={grade}
        subject={subject}
        backgroundSrc={backgroundSrc}
        dividerType={dividerType}
      />
    );
  },
};
