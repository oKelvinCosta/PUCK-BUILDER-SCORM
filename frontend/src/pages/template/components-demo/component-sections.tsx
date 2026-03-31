// src/pages/template/components-demo/component-sections.ts
import AccordionExampleSection from './accordion-example-section';
import AlertsImageSection from './alert-image-section';
import AlertsSection from './alerts-section';
import BlockContentSection from './block-content-section';
import ButtonsSection from './button-section'; // ✅ unified button section
import CardSection from './card-section';
import CarouselSection from './carousel-section';
import ClickRevealSection from './click-reveal-section';
import ColorsSection from './colors-section';
import HeaderEditSection from './header-section';
import ImageMapSection from './image-map-section';
import ListSection from './list-section';
import MainPageBuilder from './MainPageBuilder';
import QuestionCheckboxSection from './question-checkbox-section';
import QuestionRadioSection from './question-radio-section';
import TabsSection from './tab-section';
import TypographySection from './typography-section';
import VideoExternalBoxSection from './video-external-box-section';
import YouTubeVideoSection from './youtube-video-section';

// helper to create ids
const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

export const componentSections = [
  { title: 'Header Editor', content: () => <HeaderEditSection /> },
  { title: 'Section Builder', content: () => <MainPageBuilder /> },
  { title: 'Colors', content: () => <ColorsSection /> },
  { title: 'Typography', content: () => <TypographySection /> },
  { title: 'Buttons', content: () => <ButtonsSection /> }, // ✅ unified section
  { title: 'Card', content: () => <CardSection /> },
  { title: 'Accordion', content: () => <AccordionExampleSection /> },
  { title: 'Carousel', content: () => <CarouselSection /> },
  { title: 'Alerts', content: () => <AlertsSection /> },
  { title: 'Alerts (with Image)', content: () => <AlertsImageSection /> },
  { title: 'Question Radio', content: () => <QuestionRadioSection /> },
  { title: 'Question Checkbox', content: () => <QuestionCheckboxSection /> },
  { title: 'Click Reveal', content: () => <ClickRevealSection /> },
  { title: 'Image Map', content: () => <ImageMapSection /> },
  { title: 'YouTube Video', content: () => <YouTubeVideoSection /> },
  { title: 'Video Box', content: () => <VideoExternalBoxSection /> },
  { title: 'Tab Content', content: () => <TabsSection /> },
  { title: 'Block Content', content: () => <BlockContentSection /> },
  { title: 'List Builder', content: () => <ListSection /> },
].map((s) => ({ ...s, id: slug(s.title) }));
