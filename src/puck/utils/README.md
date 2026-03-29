# Editor Mode Wrapper

Este utilitário permite que componentes Puck acessem o estado do editor (editing/preview/production) sem violar as regras do React Hooks.

## Como usar

### 1. Importe o wrapper

```tsx
import { EditorModeWrapper } from '@/puck/utils/with-editor-mode';
```

### 2. Use no render function do seu componente

```tsx
export const MeuComponent: ComponentConfig<MeuComponentProps> = {
  fields: {
    // seus campos
  },
  defaultProps: {
    // props padrão
  },
  render: (props) => {
    return (
      <EditorModeWrapper>
        {({ isEditing, mode, isPreview, isProduction }) => {
          // Use o estado do editor aqui
          return (
            <div className={isEditing ? 'bg-blue-100' : ''}>
              {/* seu conteúdo */}
            </div>
          );
        }}
      </EditorModeWrapper>
    );
  },
};
```

### 3. Estados disponíveis

- `isEditing: boolean` - true quando em modo de edição
- `mode: 'editing' | 'preview' | 'production'` - modo atual
- `isPreview: boolean` - true quando em modo preview
- `isProduction: boolean` - true quando em modo produção

## Exemplo prático

Veja `src/puck/blocks/grid-block.tsx` para um exemplo completo de implementação.

## Vantagens

- ✅ Funciona com as regras do React Hooks
- ✅ Reage a mudanças de estado em tempo real
- ✅ Reutilizável em qualquer componente Puck
- ✅ Type seguro com TypeScript
