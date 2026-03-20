import CompleteScormButton from '@/components/complete-scorm-button';
import Container from '@/components/container';
import Img from '@/components/img';
import MainCard from '@/components/main-card';
import { Button } from '@/components/ui/button';
import { RichTextMenu, type Config } from '@puckeditor/core';
import Bold from '@tiptap/extension-bold';
import Italic from '@tiptap/extension-italic';

type Props = {
  Text: { content: string };
  RichText: { content: any };
  Html: { content: string };
  Card: {
    imgSrc?: string;
    title?: string;
    horizontal?: boolean;
    side?: 'left' | 'right';
    content?: any;
    textSize?: 16 | 18 | 24;
    variant?: 'default' | 'gray';
    slot?: any[];
  };
  Img: { rounded: boolean };
  Grid: {
    columnFormat: '1/1' | '1/2-1/2' | '1/3-2/3' | '2/3-1/3' | '1/3-1/3-1/3' | '1/4-1/4-1/4-1/4';
    alignment: 'top' | 'center' | 'bottom';
    'col-1': any;
    'col-2': any;
    'col-3': any;
    'col-4': any;
  };
  Container: { variant: 1280 | 980 | 780 | 580; slot: any };
  Button: {
    content: string;
    alignment: 'left' | 'center' | 'right';
    variant: 'indigo' | 'gray' | 'lime' | 'red' | 'outline' | 'link';
    size: 'default' | 'lg' | 'sm';
  };
  CompleteScormButtonBlock: { content: string; alignment: 'left' | 'center' | 'right' };
  Section: {
    backgroundImage: string;
    imagePosition: 'left' | 'center' | 'right';
    paddingTop: number;
    paddingBottom: number;
    slot: any;
  };
  Embed: {
    embedCode: string;
    width: string;
    height: string;
  };
};

const isEditing = process.env.NODE_ENV === 'development';

export const config: Config<Props> = {
  categories: {
    layout: {
      components: ['Section', 'Container', 'Grid'],
    },
    typography: {
      components: ['Text', 'RichText', 'Html'],
    },
    media: {
      components: ['Img'],
    },
    scorm: {
      components: ['CompleteScormButtonBlock'],
    },
  },
  components: {
    // CompleteScormButton
    CompleteScormButtonBlock: {
      fields: {
        content: {
          type: 'text',
        },
        alignment: {
          type: 'radio',
          options: [
            { label: 'left', value: 'left' },
            { label: 'center', value: 'center' },
            { label: 'right', value: 'right' },
          ],
        },
      },
      defaultProps: {
        content: 'Button',
        alignment: 'left',
      },
      render: ({ content, alignment }) => {
        const alignmentClasses = {
          left: 'mr-auto',
          center: 'mx-auto',
          right: 'ml-auto',
        };
        return <CompleteScormButton text={content} className={alignmentClasses[alignment]} />;
      },
    },
    // Button
    Button: {
      fields: {
        content: {
          type: 'richtext',
          renderMenu: ({ editor }) => (
            <RichTextMenu>
              <RichTextMenu.Group>
                <RichTextMenu.Italic />
                <button
                  onClick={() => {
                    const url = prompt('Digite a URL');

                    if (!url) return;

                    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }}
                >
                  🔗 Link
                </button>

                <button
                  onClick={() => {
                    editor?.chain().focus().unsetLink().run();
                  }}
                >
                  ❌ link
                </button>
              </RichTextMenu.Group>
            </RichTextMenu>
          ),
        },
        alignment: {
          type: 'radio',
          options: [
            { label: 'left', value: 'left' },
            { label: 'center', value: 'center' },
            { label: 'right', value: 'right' },
          ],
        },
        variant: {
          type: 'radio',
          options: [
            { label: 'Indigo', value: 'indigo' },
            { label: 'Gray', value: 'gray' },
            { label: 'Lime', value: 'lime' },
            { label: 'Red', value: 'red' },
            { label: 'Outline', value: 'outline' },
            { label: 'Link', value: 'link' },
          ],
        },
        size: {
          type: 'radio',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Large', value: 'lg' },
            { label: 'Small', value: 'sm' },
          ],
        },
      },
      defaultProps: {
        content: 'Button',
        alignment: 'left',
        variant: 'indigo',
        size: 'default',
      },
      render: ({ content, alignment, variant, size }) => {
        const alignmentClasses = {
          left: 'mr-auto',
          center: 'mx-auto',
          right: 'ml-auto',
        };
        return (
          <Button variant={variant} size={size} className={alignmentClasses[alignment]}>
            {content}
          </Button>
        );
      },
    },
    // Container
    Container: {
      fields: {
        variant: {
          type: 'select',
          options: [
            { label: '1280px (Extra Large)', value: '1280' },
            { label: '980px (Large)', value: '980' },
            { label: '780px (Medium)', value: '780' },
            { label: '580px (Small)', value: '580' },
          ],
        },
        slot: {
          type: 'slot',
          disallow: ['Container'],
        },
      },
      defaultProps: {
        variant: 780,
        slot: [],
      },
      render: ({ variant, slot: Slot }) => {
        return (
          <Container maxWidth={variant}>
            <Slot className={isEditing ? 'p-6' : ''} />
          </Container>
        );
      },
    },
    // Text
    Text: {
      fields: {
        content: { type: 'text' },
      },
      defaultProps: {
        content: 'Text Block',
      },
      render: ({ content }) => <p>{content}</p>,
    },
    // RichText
    RichText: {
      label: 'Rich Text',
      fields: {
        content: {
          type: 'richtext',
          contentEditable: true,

          tiptap: {
            extensions: [Bold, Italic],
          },

          renderMenu: ({ children, editor }) => (
            <RichTextMenu>
              {/* Render default menu */}
              {children}

              <RichTextMenu.Group>
                {/* Simple red color selector */}
                <button
                  onClick={() => {
                    editor
                      ?.chain()
                      .focus()
                      .extendMarkRange('textStyle')
                      .setMark('textStyle', {
                        style: 'color: #ff0000',
                      })
                      .run();
                  }}
                  style={{
                    marginLeft: '8px',
                    padding: '4px 8px',
                    background: '#ff0000',
                    color: 'white',
                    borderRadius: '4px',
                    border: 'none',
                  }}
                >
                  🔴
                </button>

                <button
                  onClick={() => {
                    const url = prompt('Digite a URL');

                    if (!url) return;

                    editor?.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
                  }}
                >
                  🔗 Link
                </button>

                <button
                  onClick={() => {
                    editor?.chain().focus().unsetLink().run();
                  }}
                >
                  ❌ link
                </button>
              </RichTextMenu.Group>
            </RichTextMenu>
          ),
        },
      },
      defaultProps: {
        content: 'Rich Text Block',
      },
      render: ({ content }) => <div className="py-4">{content}</div>,
    },
    // Card
    Card: {
      fields: {
        imgSrc: { type: 'text' },
        title: { type: 'text' },
        horizontal: {
          type: 'radio',
          options: [
            { label: 'Vertical', value: false },
            { label: 'Horizontal', value: true },
          ],
        },
        side: {
          type: 'radio',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Right', value: 'right' },
          ],
        },
        content: {
          type: 'richtext',
          tiptap: {
            extensions: [Bold, Italic],
          },
        },
        textSize: {
          type: 'radio',
          options: [
            { label: 'Small', value: 16 },
            { label: 'Medium', value: 18 },
            { label: 'Large', value: 24 },
          ],
        },
        variant: {
          type: 'radio',
          options: [
            { label: 'Default', value: 'default' },
            { label: 'Gray', value: 'gray' },
          ],
        },
        slot: {
          type: 'slot',
        },
      },
      defaultProps: {
        title: 'Card Title',
        content: 'Card content goes here...',
        horizontal: false,
        side: 'left',
        textSize: 16,
        variant: 'default',
        imgSrc: '',
        slot: [],
      },
      render: ({ imgSrc, title, horizontal, side, content, textSize, variant, slot: Slot }) => {
        return (
          <MainCard
            imgSrc={imgSrc || undefined}
            title={title}
            horizontal={horizontal}
            side={side}
            textSize={textSize}
            variant={variant}
          >
            {content}
            {Slot && Slot.length > 0 ? (
              <Slot className={isEditing ? 'p-6' : ''} />
            ) : (
              <div style={{ height: '20px' }} />
            )}
          </MainCard>
        );
      },
    },
    // Html
    Html: {
      fields: {
        content: { type: 'textarea' },
      },
      defaultProps: {
        content: '<p>HTML Block</p>',
      },
      render: ({ content }) => {
        // Validação básica de segurança para HTML
        const sanitizedContent = content
          .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
          .replace(/on\w+="[^"]*"/gi, '')
          .replace(/javascript:/gi, '');

        return (
          <div
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            style={{
              border: '1px solid #e2e8f0',
              padding: '16px',
              borderRadius: '8px',
              backgroundColor: '#f8fafc',
            }}
          />
        );
      },
    },

    // Img
    Img: {
      fields: {
        rounded: {
          type: 'radio',
          options: [
            { label: 'Normal', value: false },
            { label: 'Rounded', value: true },
          ],
        },
      },
      defaultProps: {
        rounded: false,
      },
      render: ({ rounded }) => (
        <Img
          src="https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=800&h=600&fit=crop"
          alt="Placeholder image"
          isCircle={rounded}
        />
      ),
    },

    // Grid
    Grid: {
      fields: {
        columnFormat: {
          type: 'radio',
          options: [
            { label: '1/1', value: '1/1' },
            { label: '1/2 1/2', value: '1/2-1/2' },
            { label: '1/3 2/3', value: '1/3-2/3' },
            { label: '2/3 1/3', value: '2/3-1/3' },
            { label: '1/3 1/3 1/3', value: '1/3-1/3-1/3' },
            { label: '1/4 1/4 1/4 1/4', value: '1/4-1/4-1/4-1/4' },
          ],
        },
        alignment: {
          type: 'radio',
          options: [
            { label: 'Top', value: 'top' },
            { label: 'Center', value: 'center' },
            { label: 'Bottom', value: 'bottom' },
          ],
        },
        'col-1': {
          type: 'slot',
          disallow: ['Container'],
        },
        'col-2': {
          type: 'slot',
          disallow: ['Container'],
        },
        'col-3': {
          type: 'slot',
          disallow: ['Container'],
        },
        'col-4': {
          type: 'slot',
          disallow: ['Container'],
        },
      },
      defaultProps: {
        columnFormat: '1/2-1/2',
        alignment: 'top',
        'col-1': [],
        'col-2': [],
        'col-3': [],
        'col-4': [],
      },
      render: ({
        columnFormat,
        alignment,
        'col-1': Col1,
        'col-2': Col2,
        'col-3': Col3,
        'col-4': Col4,
      }) => {
        const gridConfigs = {
          '1/1': {
            containerClass: ' grid grid-cols-1 gap-6',
            spans: [12],
            slots: [Col1],
          },
          '1/2-1/2': {
            containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [6, 6],
            slots: [Col1, Col2],
          },
          '1/3-2/3': {
            containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [4, 8],
            slots: [Col1, Col2],
          },
          '2/3-1/3': {
            containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [8, 4],
            slots: [Col1, Col2],
          },
          '1/3-1/3-1/3': {
            containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [4, 4, 4],
            slots: [Col1, Col2, Col3],
          },
          '1/4-1/4-1/4-1/4': {
            containerClass: ' grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [3, 3, 3, 3],
            slots: [Col1, Col2, Col3, Col4],
          },
        };

        const config =
          gridConfigs[columnFormat as keyof typeof gridConfigs] || gridConfigs['1/2-1/2'];

        const alignmentClasses = {
          top: 'items-start',
          center: 'items-center',
          bottom: 'items-end',
        };

        return (
          <div
            className={`${isEditing && 'py-4'} mt-10 ${config.containerClass} ${alignmentClasses[alignment]}`}
          >
            {config.slots.map((Slot, index) => (
              <div key={index} className={`md:col-span-${config.spans[index]}`}>
                <Slot className={isEditing ? 'p-6' : ''} />
              </div>
            ))}
          </div>
        );
      },
    },

    // Section
    Section: {
      fields: {
        // 🖼️ background image
        backgroundImage: {
          type: 'text', // pode trocar por image field depois
          label: 'Background Image URL',
        },

        // ↔️ posição da imagem
        imagePosition: {
          type: 'radio',
          label: 'Image Position',
          options: [
            { label: 'Left', value: 'left' },
            { label: 'Center', value: 'center' },
            { label: 'Right', value: 'right' },
          ],
        },

        // 📏 padding
        paddingTop: {
          type: 'number',
          label: 'Padding Top',
        },
        paddingBottom: {
          type: 'number',
          label: 'Padding Bottom',
        },

        slot: {
          type: 'slot',
          disallow: ['Section'],
        },
      },

      defaultProps: {
        backgroundImage: '',
        imagePosition: 'center',
        paddingTop: 80,
        paddingBottom: 80,
        slot: [],
      },

      render: ({ backgroundImage, imagePosition, paddingTop, paddingBottom, slot: Slot }) => {
        return (
          <section
            style={{
              paddingTop: `${paddingTop}px`,
              paddingBottom: `${paddingBottom}px`,
              backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined,
              backgroundPosition: imagePosition,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <Slot className={isEditing ? 'p-6' : ''} />
          </section>
        );
      },
    },

    // Embed
    Embed: {
      fields: {
        embedCode: {
          type: 'textarea',
          label: 'Embed (iframe ou script)',
        },

        width: {
          type: 'text',
          label: 'Width',
        },

        height: {
          type: 'text',
          label: 'Height',
        },
      },

      defaultProps: {
        embedCode: '<iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ" />',
        width: '100%',
        height: '400px',
      },

      render: ({ embedCode, width, height }) => {
        return (
          <div
            style={{
              width,
              height,
              position: 'relative',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
              }}
              dangerouslySetInnerHTML={{ __html: embedCode }}
            />
          </div>
        );
      },
    },
  },
};
