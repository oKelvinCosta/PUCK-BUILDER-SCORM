# `usePuck` - Explicação Completa com Base no Projeto

Você está certo, a documentação é confusa. Vou explicar com base no uso real no seu projeto:

## O que é `usePuck`?

É um hook que dá acesso à **API interna do Puck** (`PuckApi`) para manipular o estado do editor durante o ciclo de vida React.

## Principais Funcionalidades

### 1. **`appState` - Estado Atual do Editor**

```tsx
const { appState } = usePuck();
```

**No seu projeto:**

- `appState.data` → Contém os dados atuais da página (content, root, zones)
- `appState.ui` → Estado da interface (sidebar, drag, etc.)

**Uso prático:**

```tsx
const handlePublish = async () => {
  await saveJsonFile(appState.data); // Pega dados ATUAIS, não os iniciais
};
```

### 2. **`dispatch(action)` - Executar Ações**

Permite modificar o estado programaticamente:

```tsx
const { dispatch } = usePuck();

// Fechar sidebar
dispatch({
  type: 'setUi',
  ui: { leftSideBarVisible: false },
});

// Inserir componente
dispatch({
  type: 'insert',
  componentType: 'HeadingBlock',
  index: 0,
  zone: 'root',
});
```

### 3. **Métodos de Navegação**

```tsx
const {
  getItemById, // Buscar componente por ID
  getItemBySelector, // Buscar por seletor
  getParentById, // Buscar pai de um componente
  getSelectorForId, // Obter seletor de um ID
} = usePuck();

// Exemplo: buscar componente selecionado
const selectedItem = getItemById('HeadingBlock-123');
```

## Importante: Onde Usar

**✅ Funciona dentro de:**

- `overrides.headerActions`
- `overrides.fields`
- Componentes customizados dentro do Puck

**❌ Não funciona fora:**

- Componentes pai do `<Puck>`
- Fora do contexto do Puck

## No Seu Código

```tsx
overrides={{
  headerActions: ({ children }) => {
    // ✅ usePuck funciona AQUI - dentro do contexto do Puck
    const { appState } = usePuck();

    const handlePublish = async () => {
      // appState.data tem os dados ATUAIS do editor
      await saveJsonFile(appState.data);
    };

    return (
      <>
        <Button onClick={handlePublish}>
          <Rocket /> Exportar
        </Button>
      </>
    );
  }
}}
```

## Por que isso resolveu seu problema?

**Antes:** `handlePublish` usava `initialData` (dados estáticos iniciais)
**Agora:** `handlePublish` usa `appState.data` (dados dinâmicos atuais)

O `appState.data` é atualizado em tempo real conforme você edita a página, então ao clicar em "Exportar", você salva exatamente o que está visível no editor.
