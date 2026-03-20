import CourseFooter from '@/components/course-footer';
import CourseHeader from '@/components/course-header';
import Section from '@/components/section';
import Section1 from './section1';
import Section2 from './section2';
import Section3 from './section3';
import Section5 from './section5';

export default function Choices() {
  return (
    <>
      <CourseHeader
        gradient="gradient02"
        grade="9º ano"
        subject="Sonhos viram realidade"
        backgroundSrc="./imgs/Hero.webp"
        dividerType="type02"
      />

      <Section className="[&_h2]:text-primary [&_h4]:text-primary">
        <Section1 />
      </Section>

      <Section className="bg-gradient-to-r from-indigo-600 to-coral-400">
        <Section2 />
      </Section>
      <Section className="bg-lime-200">
        <Section3 />
      </Section>

      <Section
        dividerTop={{ type: 'type02', className: 'text-lime-200' }}
        dividerBottom={{ type: 'type02', className: 'text-primary' }}
        backgroundSrc="./imgs/bg_final.webp"
      >
        <Section5 />
      </Section>

      <CourseFooter />
    </>
  );
}
