import Container from '@/components/container';
import { RichTextMenu, type Config } from '@puckeditor/core';
import Emoji, { gitHubEmojis } from '@tiptap/extension-emoji';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';

type Props = {
  Text: { content: string };
  RichText: { content: any };
  Html: { content: string };
  Card: { title: string; description: string; padding: number };
  Grid: {
    columnFormat: '1/1' | '1/2-1/2' | '1/3-2/3' | '2/3-1/3' | '1/3-1/3-1/3' | '1/4-1/4-1/4-1/4';
    'col-1': any;
    'col-2': any;
    'col-3': any;
    'col-4': any;
  };
  Container: { variant: 1280 | 980 | 780 | 580; slot: any };
};

const isEditing = process.env.NODE_ENV === 'development';

export const config: Config<Props> = {
  categories: {
    layout: {
      components: ['Container', 'Grid'],
    },
    typography: {
      components: ['Text', 'RichText', 'Html'],
    },
  },
  components: {
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
        },
      },
      defaultProps: {
        variant: 780,
        slot: [],
      },
      render: ({ variant, slot: Slot }) => {
        return (
          <Container maxWidth={variant}>
            <Slot />
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
      fields: {
        content: {
          type: 'richtext',
          contentEditable: true,

          tiptap: {
            extensions: [
              Emoji.configure({
                emojis: gitHubEmojis,
                enableEmoticons: true,
              }),

              Image,
              Link.configure({
                openOnClick: false,
              }),
            ],
          },

          renderMenu: ({ children, editor, editorState }) => (
            <RichTextMenu>
              {/* Render default menu */}
              {children}

              <RichTextMenu.Group>
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
      render: ({ content }) => (
        <div
          style={{
            padding: '16px',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            backgroundColor: '#ffffff',
          }}
        >
          {content}
        </div>
      ),
    },
    // Card
    Card: {
      // Add the fields for the title, description and padding
      fields: {
        title: { type: 'text' },
        description: { type: 'textarea' },
        padding: { type: 'number', min: 4, max: 64 },
      },
      // Add default values for each field
      defaultProps: {
        title: 'Topic Title',
        description: 'Topic description...',
        padding: 16,
      },
      render: ({ title, description, padding }) => {
        // Render the card using the values from its fields
        return (
          <article style={{ padding }}>
            <h2>{title}</h2>
            <p>{description}</p>
          </article>
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
        'col-1': [],
        'col-2': [],
        'col-3': [],
        'col-4': [],
      },
      render: ({ columnFormat, 'col-1': Col1, 'col-2': Col2, 'col-3': Col3, 'col-4': Col4 }) => {
        const gridConfigs = {
          '1/1': {
            containerClass: 'mt-10 grid grid-cols-1 gap-6',
            spans: [12],
            slots: [Col1],
          },
          '1/2-1/2': {
            containerClass: 'mt-10 grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [6, 6],
            slots: [Col1, Col2],
          },
          '1/3-2/3': {
            containerClass: 'mt-10 grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [4, 8],
            slots: [Col1, Col2],
          },
          '2/3-1/3': {
            containerClass: 'mt-10 grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [8, 4],
            slots: [Col1, Col2],
          },
          '1/3-1/3-1/3': {
            containerClass: 'mt-10 grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [4, 4, 4],
            slots: [Col1, Col2, Col3],
          },
          '1/4-1/4-1/4-1/4': {
            containerClass: 'mt-10 grid grid-cols-1 gap-6 md:grid-cols-12',
            spans: [3, 3, 3, 3],
            slots: [Col1, Col2, Col3, Col4],
          },
        };

        const config =
          gridConfigs[columnFormat as keyof typeof gridConfigs] || gridConfigs['1/2-1/2'];

        return (
          <div className={`${isEditing && 'py-4'} ${config.containerClass}`}>
            {config.slots.map((Slot, index) => (
              <div key={index} className={`md:col-span-${config.spans[index]}`}>
                <Slot />
              </div>
            ))}
          </div>
        );
      },
    },
  },
};
