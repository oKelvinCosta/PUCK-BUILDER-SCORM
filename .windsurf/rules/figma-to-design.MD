---
trigger: manual
---

# Conversão de Design para Componentes React

Analise o design anexado (screenshot ou frame do Figma) e converta para componentes React seguindo os padrões abaixo.

---

## Stack

- **React 19** (sem `forwardRef`)
- **TypeScript** strict
- **Tailwind CSS v3** com CSS variables
- **Shadcn UI** (`@shadcn/ui`) para componentes headless
- **class-variance-authority (CVA)** para variantes
- **Tailwind Merge** (`tailwind-merge`) para merge de classes
- **Lucide React** ou **Heroicons** para ícones

---

## Nomenclatura

- Arquivos: **lowercase com hífens** → `user-card.tsx`, `use-modal.ts`
- **Sempre named exports**, nunca default export
- Não criar barrel files (`index.ts`) para pastas internas

---

## Interpretação do Figma

**ATENÇÃO:** Analise cuidadosamente o Figma antes de codificar:

1. **Verificar alinhamento vertical** - Se o texto está centralizado verticalmente no Figma, use `flex items-center`
2. **Verificar peso da fonte** - Se o texto está em negrito/semibold no Figma, use `<b>` ou `<strong>`
3. **Não adicionar classes desnecessárias** - Parágrafos só precisam de cor, não de font-family, size, line-height
4. **Estrutura do conteúdo** - Observe se há múltiplos parágrafos ou se é um único parágrafo com quebras
5. **Relacionar nomes das layers com componentes do projeto** - Verifique se o nome da layer corresponde a algum componente existente (MainCard, AccordionContained, TabContent, etc.)
6. **Usar template de grid baseado no nome das layers** - Para layouts com múltiplas colunas, use o nome das layers no Figma para definir a estrutura do grid

```
// ✅ EXEMPLO CORRETO baseado no Figma
// Se o Figma mostra: "Ou numa balada:" (normal) + "Nesta festa..." (negrito)
<div className="flex items-center">
  <p className="text-gray-700">
    <span>Ou numa balada:</span>
    <br />
    <b>"Nesta festa não vai faltar energia para a galera".</b>
  </p>
</div>
```

```
// ✅ EXEMPLO - Relacionar layers com componentes
// Se o Figma tem layers: "card-1", "card-2", "card-3"
// Usar MainCard para cada:
<div className="grid grid-cols-1 gap-6 md:grid-cols-3">
  <MainCard imgSrc="..." title="..." />
  <MainCard imgSrc="..." title="..." />
  <MainCard imgSrc="..." title="..." />
</div>
```

```
// ✅ EXEMPLO - Grid baseado no nome das layers
// Se o Figma tem layers: "col-6" (esquerda) e "col-2" (direita)
// Usar grid 12 colunas com span baseado no nome:
<div className="grid grid-cols-1 gap-6 md:grid-cols-12">
  <div className="md:col-span-9"> {/* col-6 ≈ 9/12 */}
    <p>Conteúdo</p>
  </div>
  <div className="md:col-span-3"> {/* col-2 ≈ 3/12 */}
    <Img src="..." />
  </div>
</div>
```

---

## Tipografia e texto

IMPORTANTE: Não adicionar estilização de texto em tags H (h1, h2, h3, etc.)
Para parágrafos, **APENAS usar classe de cor** se necessário. Não adicionar font-family, font-size, line-height, etc.
Use <b> para negrito/semibold e <i> para itálico se necessário.
Não mude o alinhamento dos textos.
**Verificar alinhamento vertical no Figma - usar flex items-center se necessário.**

```
// ✅ CORRETO - Título com classes Tailwind
<h2 className="text-center mt-10">
  ENERGIA: Múltiplos Significados
</h2>
```

```
// ❌ INCORRETO - Estilo inline na tag H
<h2 style="color: red;" className="mb-12 font-bold text-4xl">
  Título com estilo inline
</h2>
```

```
// ✅ CORRETO - Parágrafo com APENAS cor
// NÃO adicionar font-family, font-size, line-height, margins
<p className="text-gray-700">
  Texto normal com <b>negrito</b> e <i>itálico</i> para ênfase
</p>
```

```
// ❌ INCORRETO - Parágrafo com classes desnecessárias
<p className="font-gamay-editorial text-lg leading-[24px] text-gray-700">
  Texto com classes desnecessárias
</p>
```

```
// ✅ CORRETO - Verificar alinhamento vertical do Figma
<div className="flex items-center">
  <p className="text-gray-700">Texto alinhado verticalmente</p>
</div>
```

```
// ✅ CORRETO
<ul className="list-inside list-disc">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul>
```

```
// ✅ CORRETO
<ol className="list-inside list-decimal">
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ol>
```

---

## Estrutura de Componente

```tsx
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm leading-none font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        indigo: 'bg-indigo-600 text-white hover:bg-indigo-600/70',
        gray: 'bg-gray-700 text-white hover:bg-gray-400',
        lime: 'bg-lime-400 text-indigo-600 hover:bg-lime-200',
        red: 'bg-coral-400 text-white hover:bg-coral-200',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 pt-[10px] pb-[6px] px-4',
        lg: 'h-14 px-9 py-4 text-base',
        sm: 'h-9 rounded-md px-3',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'indigo',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
```

---

## Compound Components

```tsx
import { cn } from '@/lib/utils';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import * as React from 'react';

const Accordion = AccordionPrimitive.Root;

interface AccordionItemProps
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> {}

const AccordionItem = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Item>,
  AccordionItemProps
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'flex w-full items-center justify-between py-4 text-left font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
        className
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ComponentRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all',
      className
    )}
    {...props}
  >
    <div className={cn('pb-4 pt-0', className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
```

---

## Cores (CSS Variables)

```
bg-background, bg-card, bg-popover      → fundos principais
bg-primary, bg-secondary, bg-accent     → ações/estados
bg-muted                                → elemento desabilitado/sutil
bg-destructive                          → erros/danger
bg-success                              → sucesso (custom)

text-foreground                         → texto principal
text-card-foreground, text-popover-foreground → texto em cards/popovers
text-primary-foreground                 → texto em bg primary
text-secondary-foreground               → texto em bg secondary
text-muted-foreground                   → texto desabilitado/sutil
text-destructive-foreground              → texto em bg destructive
text-success-foreground                  → texto em bg success

border-border, border-input             → bordas padrão
border-sidebar-border                   → bordas sidebar

ring-ring                               → focus ring
--sidebar-background, --sidebar-foreground → cores sidebar
--azure-200, --azure-400               → custom brand (azure)
--coral-200, --coral-400               → custom brand (coral)
--lime-200, --lime-400                 → custom brand (lime)
```

---

## TypeScript

```tsx
// ✅ Estender ComponentProps + VariantProps
export interface ButtonProps
  extends ComponentProps<'button'>,
    VariantProps<typeof buttonVariants> {}

// ✅ Import type para tipos
import type { ComponentProps } from 'react';
import type { VariantProps } from 'tailwind-variants';

// ❌ Não usar React.FC nem any
```

---

## Padrões Importantes

```tsx
// Sempre usar cn (clsx + tailwind-merge)
className={cn('classes-base', className)}

// Sempre usar data-slot
<div data-slot="card">

// Estados com data-attributes
data-disabled={disabled ? '' : undefined}
className="data-[disabled]:opacity-50 data-[selected]:bg-primary"

// Focus visible
'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'

// Ícones com tamanho
<Check className="size-4" />
'[&_svg]:size-3.5' // em variantes

// Botões de ícone precisam de aria-label
<button aria-label="Fechar"><X className="size-4" /></button>

// Props spread no final
{...props}

// sempre usar imagens de placeholder do projeto, pois irei modificar depois
// Exemplo:
<Img src="./imgs/core/placeholder.webp" className="rounded-2xl" alt="" />

// Grid 12 colunas sempre que possível quando tiver conteúdo um do lado do outro. Deve ser responsível e se adaptar em mobile para 1 coluna
// **IMPORTANTE**: Relacionar o nome da layer no Figma com a estrutura do grid
// Exemplo: layers "col-6" e "col-2" → grid 12 colunas com spans correspondentes
    <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-12">
      <div className="md:col-span-3"> {/* layer "col-2" ≈ 3/12 */}
        <Img
          src="./imgs/core/placeholder.webp"
          className="rounded-2xl"
          alt=""
        />
      </div>
      <div className="md:col-span-9"> {/* layer "col-6" ≈ 9/12 */}
        <p>"Nesta festa não vai faltar energia para a galera".</p>
      </div>
    </div>

// Verificar se o nome da layer corresponde a componentes existentes:
// - "card", "card-*" → MainCard
// - "accordion", "faq" → AccordionContained
// - "tabs", "tab-*" → TabContent
// - "carousel" → CarouselCard

```

---

## Componentes Personalizados (Sobrescrevem Shadcn/UI)

### Accordion - Usar `AccordionContained`

**Local:** `@/components/accordion-contained.tsx`
**Quando usar:** Sempre que precisar de accordions
**Props:**

```tsx
<AccordionContained items={[{ title: 'Título', content: 'Conteúdo' }]} className="custom-class" />
```

### Cards - Usar `MainCard`

<!-- #### CardInfo (para cards informativos)

**Local:** `@/components/card-info.tsx`
**Quando usar:** Cards com título + conteúdo, layout responsivo
**Props:**

```tsx
<CardInfo
  title="Título"
  variant="white" | "gray"
  size={16 | 18 | 24}
  centered={false}
>
  Conteúdo
</CardInfo>
``` -->

#### MainCard (para cards com imagem)

**Local:** `@/components/main-card.tsx`
**Quando usar:** Cards com imagem + título + conteúdo
**Props:**

```tsx
<MainCard
  imgSrc="/image.jpg"
  title="Título"
  horizontal={false}
  side="left" | "right"
  textSize={16 | 18 | 24}
  variant="default" | "gray"
>
  Conteúdo
</MainCard>
```

### Carousel - Usar `CarouselCard`

**Local:** `@/components/carousel-card.tsx`
**Quando usar:** Carrosséis com imagem + conteúdo
**Props:**

```tsx
<CarouselCard
  items={[
    { imgSrc: "/img.jpg", title: "Título", content: "Conteúdo" }
  ]}
  layout="1:1" | "1:2" | "2:1"
/>
```

### Imagens - Usar `Img`

**Local:** `@/components/img.tsx`
**Quando usar:** Sempre que precisar de imagens
**Props:**

```tsx
<Img
  src="/image.jpg"
  isCircle={false}
  className="custom-class"
  loading="lazy" // padrão
/>
```

### Tabs - Usar `TabContent`

**Local:** `@/components/tab-content.tsx`
**Quando usar:** Sempre que precisar de abas
**Props:**

```tsx
<TabContent
  tabs={[
    { label: 'Aba 1', content: 'Conteúdo 1' },
    { label: 'Aba 2', content: 'Conteúdo 2' },
  ]}
  defaultIndex={0}
  contentClassName="h-64"
/>
```

---

## Checklist

- [ ] Arquivo lowercase com hífens
- [ ] Named export
- [ ] `ComponentProps<'elemento'>` + `VariantProps`
- [ ] Variantes com `cva()`, classes com `cn()`
- [ ] `data-slot` para identificação
- [ ] Estados via `data-[state]:`
- [ ] Cores do tema (não hardcoded)
- [ ] Focus visible em interativos
- [ ] `aria-label` em botões de ícone
- [ ] `{...props}` no final

---

Agora analise o design anexado e gere o código do componente.
