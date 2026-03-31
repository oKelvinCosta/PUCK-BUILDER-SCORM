import * as Blocks from '@/editor/blocks';
import { type Config } from '@puckeditor/core';

type Props = {
  RichText: Blocks.RichTextBlockProps;
  Html: Blocks.HtmlBlockProps;
  Card: Blocks.CardBlockProps;
  Img: Blocks.ImgBlockProps;
  Grid: Blocks.GridBlockProps;
  Container: Blocks.ContainerBlockProps;
  Button: Blocks.ButtonBlockProps;
  CompleteScormButtonBlock: Blocks.CompleteScormButtonBlockProps;
  Section: Blocks.SectionBlockProps;
  Embed: Blocks.EmbedBlockProps;
  HeaderChoicesBlock: Blocks.HeaderChoicesBlockProps;
  FooterChoicesBlock: Blocks.FooterChoicesBlockProps;
  CarouselBlock: Blocks.CarouselBlockProps;
  AccordionBlock: Blocks.AccordionBlockProps;
};

export function config(): Config<Props> {
  return {
    categories: {
      layout: {
        components: ['Section', 'Container', 'Grid'],
      },
      texto: {
        components: ['RichText'],
      },
      mídia: {
        components: ['Img', 'Embed'],
      },
      scorm: {
        components: ['CompleteScormButtonBlock'],
        defaultExpanded: false,
      },
      prebuilt: {
        components: ['HeaderChoicesBlock', 'FooterChoicesBlock'],
        defaultExpanded: false,
      },
    },
    components: {
      // CompleteScormButton
      CompleteScormButtonBlock: Blocks.CompleteScormButtonBlock,
      // Button
      Button: Blocks.ButtonBlock,
      // Container
      Container: Blocks.ContainerBlock(),

      // RichText
      RichText: Blocks.RichTextBlock,
      // Card
      Card: Blocks.CardBlock,
      // Html
      Html: Blocks.HtmlBlock,

      // Img
      Img: Blocks.ImgBlock,

      // Grid
      Grid: Blocks.GridBlock(),

      // Section
      Section: Blocks.SectionBlock(),

      // Embed
      Embed: Blocks.EmbedBlock,

      // HeaderChoices
      HeaderChoicesBlock: Blocks.HeaderChoicesBlock,

      // FooterChoices
      FooterChoicesBlock: Blocks.FooterChoicesBlock,

      // Carousel
      CarouselBlock: Blocks.CarouselBlock,

      // Accordion
      AccordionBlock: Blocks.AccordionBlock,
    },
  };
}
