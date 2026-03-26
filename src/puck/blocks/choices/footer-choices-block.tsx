import CourseFooter from '@/components/course-footer';
import Section from '@/components/section';
import Section5 from '@/pages/section5';
import type { ComponentConfig } from '@puckeditor/core';

export type FooterChoicesBlockProps = {
  dividerTopType:
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
  dividerTopClassName: string;
  dividerBottomType:
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
  dividerBottomClassName: string;
  backgroundSrc: string;
};

export const FooterChoicesBlock: ComponentConfig<FooterChoicesBlockProps> = {
  fields: {
    dividerTopType: {
      type: 'text',
      label: 'Tipo do Divisor Superior',
    },
    dividerTopClassName: {
      type: 'text',
      label: 'Classe do Divisor Superior',
    },
    dividerBottomType: {
      type: 'text',
      label: 'Tipo do Divisor Inferior',
    },
    dividerBottomClassName: {
      type: 'text',
      label: 'Classe do Divisor Inferior',
    },
    backgroundSrc: {
      type: 'text',
      label: 'Imagem de Fundo',
    },
  },
  defaultProps: {
    dividerTopType: 'type02',
    dividerTopClassName: 'text-lime-200',
    dividerBottomType: 'type02',
    dividerBottomClassName: 'text-primary',
    backgroundSrc: './imgs/bg_final.webp',
  },
  render: ({
    dividerTopType,
    dividerTopClassName,
    dividerBottomType,
    dividerBottomClassName,
    backgroundSrc,
  }) => {
    return (
      <>
        <Section
          dividerTop={{ type: dividerTopType, className: dividerTopClassName }}
          dividerBottom={{ type: dividerBottomType, className: dividerBottomClassName }}
          backgroundSrc={backgroundSrc}
        >
          <Section5 />
        </Section>

        <CourseFooter />
      </>
    );
  },
};
