# Design System — Documentação de Estilização
> **Projeto:** SiloPrime LibSP  
> **Arquivos analisados:** `sp_posicionadorCarimbo.css` · `paginaValidacao.css`  
> **Padrão:** CSS Custom Properties (Design Tokens) + Layout responsivo

---

## Sumário

1. [Design Tokens](#1-design-tokens)
   - 1.1 [Paleta de Cores](#11-paleta-de-cores)
   - 1.2 [Gradientes](#12-gradientes)
   - 1.3 [Superfícies e Fundos](#13-superfícies-e-fundos)
   - 1.4 [Sombras](#14-sombras)
   - 1.5 [Tipografia](#15-tipografia)
   - 1.6 [Espaçamento e Bordas](#16-espaçamento-e-bordas)
   - 1.7 [Transições e Animações](#17-transições-e-animações)
2. [Estrutura de Layout](#2-estrutura-de-layout)
   - 2.1 [Posicionador de Carimbo](#21-posicionador-de-carimbo)
   - 2.2 [Página de Validação](#22-página-de-validação)
3. [Componentes](#3-componentes)
   - 3.1 [Botões](#31-botões)
   - 3.2 [Painéis e Cards](#32-painéis-e-cards)
   - 3.3 [Inputs e Selects](#33-inputs-e-selects)
   - 3.4 [Alertas](#34-alertas)
   - 3.5 [Carimbo (Stamp)](#35-carimbo-stamp)
   - 3.6 [Controles de Página (PDF Viewer)](#36-controles-de-página-pdf-viewer)
   - 3.7 [Linha do Tempo](#37-linha-do-tempo)
   - 3.8 [Estado Vazio (Empty State)](#38-estado-vazio-empty-state)
4. [Responsividade](#4-responsividade)
5. [Padrões de Interação](#5-padrões-de-interação)
6. [Animações](#6-animações)
7. [Convenções de Nomenclatura](#7-convenções-de-nomenclatura)

---

## 1. Design Tokens

Todos os valores visuais são centralizados em variáveis CSS definidas em `:root`, garantindo consistência e fácil manutenção.

---

### 1.1 Paleta de Cores

#### `sp_posicionadorCarimbo.css` — Tokens de cor

| Token | Valor | Uso |
|---|---|---|
| `--bg` | `#f0f4f8` | Fundo geral da página |
| `--panel` | `#ffffff` | Fundo de painéis e cards |
| `--cor-principal` | `#38b2d8` | Cor de destaque primária (azul claro) |
| `--cor-secundaria` | `#1a6fad` | Cor de destaque secundária (azul médio) |
| `--muted` | `#9fb8c6` | Textos auxiliares, labels, placeholders |
| `--acoes-title` | `#1c2d3a` | Cor principal de texto e títulos |
| `--thumb-bg` | `#eef9fb` | Fundo de thumbnails |

#### `paginaValidacao.css` — Tokens de cor (prefixo `--sp-`)

| Token | Valor | Uso |
|---|---|---|
| `--sp-azul-escuro` | `#245697` | Títulos de seções, destaques |
| `--sp-azul-medio` | `#337ab7` | Marcadores da linha do tempo |
| `--sp-azul-claro` | `#42bde3` | Linha do tempo, acentuações |
| `--sp-azul-profundo` | `#052b6e` | Gradiente do header |
| `--sp-azul-sidebar-hover` | `#1b447a` | Estado hover da sidebar |
| `--sp-texto-primario` | `#1d2b3d` | Texto de corpo e títulos principais |
| `--sp-texto-secundario` | `#5a6b7f` | Subtítulos e texto de apoio |
| `--sp-texto-terciario` | `#8896a7` | Labels, metadados, placeholders |

#### Cor de Perigo / Erro (ambos os arquivos)

| Valor | Uso |
|---|---|
| `#e04050` | Botão de remoção do carimbo, alertas de erro (`.alerta-danger`) |

#### Cor de Sucesso

| Valor | Uso |
|---|---|
| `#22c55e` | Ícone de validação, marcador verde da linha do tempo |
| `#16a34a` | Ponto final do gradiente de sucesso |

---

### 1.2 Gradientes

| Token / Uso | Definição | Direção |
|---|---|---|
| `--principal-background-cor` | `#1a6fad → #38b2d8` | 135° |
| `--principal-background-cor-hover` | `#155d93 → #2a94b8` | 135° |
| `--sp-gradiente-principal` | `#217ebd → #42bde3` | 135° |
| `--sp-gradiente-header` | `#1b447a → #245697 → #337ab7` | 135° (3 stops) |
| `--sp-gradiente-fundo` | `#dde6f0 → #e8f4f8 → #f0f7fb` | 180° (3 stops) |
| `--sp-gradiente-sucesso` | `#22c55e → #16a34a` | 135° |
| Alerta info | `rgba(56,178,216,0.08) → rgba(26,111,173,0.06)` | 135° |
| Alerta danger | `rgba(224,64,80,0.08) → rgba(224,64,80,0.05)` | 135° |

> **Padrão:** todos os gradientes seguem a direção `135deg` (diagonal superior-esquerda → inferior-direita), criando consistência visual.

---

### 1.3 Superfícies e Fundos

#### Posicionador de Carimbo

| Token | Valor | Uso |
|---|---|---|
| `--surface-glass` | `rgba(255,255,255,0.72)` | Fundo translúcido (glassmorphism) |
| `--surface-glass-border` | `rgba(255,255,255,0.45)` | Borda do elemento glass |
| `--surface-hover` | `#edf6fa` | Fundo de itens ao passar o mouse |
| `--surface-input` | `#f7fbfd` | Fundo de campos de formulário |
| `--surface-input-border` | `#dce9f0` | Borda padrão de inputs |

#### Página de Validação

| Token | Valor | Uso |
|---|---|---|
| `--sp-fundo-pagina` | `#eaf1f8` | Fundo geral |
| `--sp-fundo-cartao` | `#ffffff` | Fundo de cards |
| `--sp-fundo-item` | `#f0f5fc` | Fundo dos itens de detalhe |
| `--sp-fundo-item-hover` | `#e4edf8` | Fundo dos itens no hover |
| `--sp-vidro-fundo` | `rgba(255,255,255,0.75)` | Efeito glassmorphism |
| `--sp-vidro-borda` | `rgba(255,255,255,0.45)` | Borda do glassmorphism |

---

### 1.4 Sombras

#### Posicionador de Carimbo

| Token | Valor |
|---|---|
| `--shadow` | `0 4px 24px rgba(18,50,64,0.07)` |
| `--shadow-elevated` | `0 8px 32px rgba(18,50,64,0.12)` |
| `--shadow-btn` | `0 4px 14px rgba(26,111,173,0.20)` |
| `--shadow-btn-hover` | `0 6px 20px rgba(26,111,173,0.30)` |
| `--shadow-carimbo` | `0 4px 16px rgba(33,126,189,0.25)` |
| `--focus-ring` | `0 0 0 3px rgba(56,178,216,0.30)` |

#### Página de Validação

| Token | Valor |
|---|---|
| `--sp-sombra-cartao` | `0 8px 32px rgba(36,86,151,0.10), 0 2px 8px rgba(36,86,151,0.06)` |
| `--sp-sombra-cartao-hover` | `0 12px 40px rgba(36,86,151,0.14), 0 4px 12px rgba(36,86,151,0.08)` |
| `--sp-sombra-interna` | `0 2px 12px rgba(36,86,151,0.06)` |
| `--sp-sombra-botao` | `0 4px 16px rgba(36,86,151,0.25)` |
| `--sp-sombra-botao-hover` | `0 8px 24px rgba(36,86,151,0.35)` |

> **Padrão:** sombras utilizam a cor primária azul com baixa opacidade, reforçando a identidade cromática mesmo nos efeitos de profundidade.

---

### 1.5 Tipografia

| Propriedade | Valor |
|---|---|
| **Família principal** | `'Inter'`, `'Segoe UI'`, `Roboto`, `Arial`, `sans-serif` |
| **Importação** | Google Fonts — `Inter` (400, 500, 600, 700, 800) |
| **Suavização** | `-webkit-font-smoothing: antialiased` + `-moz-osx-font-smoothing: grayscale` |
| **Line-height base** | `1.6` |

#### Escala tipográfica utilizada

| Tamanho | Uso |
|---|---|
| `26px / 700` | Título principal do card de validação |
| `22px / 700` | Título principal (tablet) |
| `20px / 700` | Título do estado vazio |
| `17px / 600` | Título de seções internas (detalhes, histórico) |
| `15px / 400` | Subtítulo do cabeçalho do card |
| `14px / 500` | Texto de corpo, valores de itens |
| `13px / 600` | Botões, labels de alerta, inputs |
| `13px / 500` | Texto de placeholder e apoio |
| `12px / 400` | Texto auxiliar de alertas, hora de evento |
| `11px / 700` | Labels em maiúsculas (uppercase), rótulos de seção |
| `10px / 700` | Título interno do carimbo |

> **Padrão de labels:** labels de campos e seções usam `font-size: 11px`, `font-weight: 700`, `text-transform: uppercase` e `letter-spacing: 0.6–0.8px`.

---

### 1.6 Espaçamento e Bordas

#### Border-radius

| Token | Valor | Uso |
|---|---|---|
| `--radius` / `--sp-raio-medio` | `14px` | Painéis, cards internos, canvas |
| `--sp-raio-grande` | `20px` | Card principal da validação |
| `--radius-sm` / `--sp-raio-pequeno` | `8–10px` | Inputs, botões, seções menores |
| `--radius-pill` | `999px` | Controles de paginação (pill) |
| `50%` | — | Ícones circulares, marcadores |

#### Gap e espaçamento

| Token | Valor | Uso |
|---|---|---|
| `--gap` | `18px` | Gap principal entre colunas |
| `--gap-sm` | `10px` | Gap secundário |
| Padding de painéis | `22px` | `.acoes-panel` |
| Padding de cards | `24–32px` | `.detalhes-card`, `.historico-card`, `.conteudo-card` |
| Padding de botões | `11–12px 18–28px` | Botões primários |

---

### 1.7 Transições e Animações

| Token | Valor | Uso |
|---|---|---|
| `--transition-fast` | `0.18s cubic-bezier(0.4,0,0.2,1)` | Hovers rápidos (borders, cores) |
| `--transition-base` | `0.28s cubic-bezier(0.4,0,0.2,1)` | Transições padrão |
| `--transition-slow` | `0.4s cubic-bezier(0.4,0,0.2,1)` | Animações de entrada (alertas) |
| `--sp-transicao` | `0.3s cubic-bezier(0.4,0,0.2,1)` | Transição global da validação |

> **Padrão:** todas as transições utilizam a curva `cubic-bezier(0.4, 0, 0.2, 1)` (Material Design easing), garantindo aceleração e desaceleração naturais.

---

## 2. Estrutura de Layout

### 2.1 Posicionador de Carimbo

```
.main-container  (flex-row, 100vw × 100vh, padding: 20px)
└── .posicionador-container  (flex-row, gap: 18px)
    ├── .pdf-container  (width: 75%)
    │   ├── .viewer-header
    │   │   └── .page-controls  (pill, glassmorphism)
    │   └── .viewer-canvas  (flex: 1, overflow: auto)
    │       └── canvas .pdf-canvas
    └── .acoes-container  (width: 25%, min-width: 260px)
        ├── .acoes-panel  (card branco, padding: 22px)
        │   ├── .acao-section  (seções separadas por borda)
        │   └── .select-anexo
        └── .alerta / .alerta-danger
```

**Proporção de colunas:** `75% PDF` / `25% Controles`  
**Altura:** `100vh` fixo, sem scroll na janela principal — scroll interno nos containers.

---

### 2.2 Página de Validação

```
body  (flex-column, min-height: 100vh, background: gradiente fixo)
└── .cabecalho  (header com animação fadeInDown)
    └── .container-logo  (gradiente azul escuro, logo centralizada)
└── .container-cards  (flex, padding: 40px 20px, flex-grow: 1)
    └── .card-principal  (max-width: 880px, border-radius: 20px)
        ├── .cabecalho-card  (flex-row, fundo verde translúcido)
        │   ├── .icone-validacao  (círculo 56px, gradiente sucesso)
        │   └── .container-titulo-card
        │       ├── .titulo-cabecalho-card  (26px, bold)
        │       └── .subtitulo-cabecalho-card
        ├── .conteudo-card  (flex-row, gap: 24px)
        │   ├── .detalhes-card  (62% da largura)
        │   │   └── .items-card  (grid 2 colunas)
        │   │       └── .item-card  (label + valor)
        │   └── .historico-card  (38% da largura)
        │       └── .linha-do-tempo  (lista com marcadores)
        └── .acoes-card  (flex-end, botão de portal)
```

**Proporção interna:** `62% Detalhes` / `38% Histórico`  
**Largura máxima do card:** `min(880px, 92%)` — adaptável a qualquer viewport.

---

## 3. Componentes

### 3.1 Botões

#### Botão Primário (`.btn.primary`)

```css
padding: 11px 18px
border-radius: 8px
background: linear-gradient(135deg, #1a6fad → #38b2d8)
color: #ffffff
font-weight: 600
font-size: 13px
box-shadow: 0 4px 14px rgba(26,111,173,0.20)
```

**Estados:**
| Estado | Comportamento |
|---|---|
| `:hover` | Gradiente mais escuro, `translateY(-1px)`, sombra elevada |
| `:active` | `translateY(0)`, sombra reduzida |
| `:focus-visible` | `focus-ring` (anel de foco azul 3px) |
| `:disabled` | `opacity: 0.55`, sem transform, sem sombra |

#### Botão Ghost (`.btn.ghost`)

```css
background: transparent
border: 1.5px solid #dce9f0
color: #1a6fad
```

**Estados:**
| Estado | Comportamento |
|---|---|
| `:hover` | `background: rgba(56,178,216,0.08)`, borda azul claro, `translateY(-1px)` |
| `:active` | `background: rgba(56,178,216,0.14)` |
| `:disabled` | `opacity: 0.5` |

#### Botão de Portal (`.botao-acessar-portal`)

```css
padding: 12px 28px
background: linear-gradient(135deg, #217ebd → #42bde3)
border-radius: 10px
font-weight: 600
font-size: 14px
```

Possui efeito de shimmer no hover: uma faixa de brilho translúcida desliza da esquerda para a direita via `::before`.

#### Modificador de largura
- `.btn.full` → `width: 100%`

---

### 3.2 Painéis e Cards

#### Painel de Ações (`.acoes-panel`)

```
background: #ffffff
border-radius: 14px
padding: 22px
box-shadow: 0 4px 24px rgba(18,50,64,0.07)
border: 1px solid rgba(220,233,240,0.5)
```
Hover eleva a sombra para `--shadow-elevated`.

#### Card Principal (`.card-principal`)

```
width: min(880px, 92%)
border-radius: 20px
box-shadow: 0 8px 32px rgba(36,86,151,0.10), 0 2px 8px rgba(36,86,151,0.06)
border: 1px solid rgba(36,86,151,0.08)
overflow: hidden
```

#### Item de Detalhe (`.item-card`)

```
background: linear-gradient(135deg, #f0f5fc → #f5f8fd)
border-radius: 10px
padding: 12px 16px
border: 1px solid rgba(36,86,151,0.06)
```

Possui uma barra lateral esquerda de `3px` com gradiente principal (`.item-card::before`) que aparece com `opacity: 1` no hover.

#### Títulos de seção de cards

Possuem ícone-badge de `32×32px` com `border-radius: 8px` e fundo em gradiente azul translúcido (`rgba(36,86,151,0.08) → rgba(66,189,227,0.08)`).

---

### 3.3 Inputs e Selects

#### Select (`.select-anexo`)

```css
padding: 10px 14px
border-radius: 8px
border: 1.5px solid #dce9f0
background: #f7fbfd
font-size: 13px
font-weight: 500
appearance: none  /* ícone SVG customizado */
```

Ícone de seta personalizado via `background-image` SVG inline, posicionado em `right: 12px`.

**Estados:** hover e focus mudam a borda para `--cor-principal` com `focus-ring`.

#### Input numérico (controles de página)

```css
width: 52px
text-align: center
border-radius: 8px
border: 1.5px solid #dce9f0
background: #f7fbfd
font-weight: 600
font-size: 13px
```

Spinners nativos removidos via `-webkit-appearance: none` e `-moz-appearance: textfield`.

---

### 3.4 Alertas

#### Alerta Informativo (`.alerta`)

```
background: gradiente azul translúcido (8% → 6% opacidade)
border: 1px solid rgba(56,178,216,0.30)
border-radius: 8px
padding: 14px 16px
```

- Barra superior de `3px` com gradiente principal via `::before`
- Indicador pulsante `●` animado antes do título
- Animação de entrada `slideDown` (0.4s)

#### Alerta de Perigo (`.alerta-danger`)

```
background: gradiente vermelho translúcido (8% → 5% opacidade)
border: 1px solid rgba(224,64,80,0.30)
```

- Barra superior `#e04050`
- Indicador triangular `▲` com animação `dangerPulse` (1s loop)
- Cor do título: `#e04050`

---

### 3.5 Carimbo (Stamp)

O carimbo é um elemento `position: absolute` posicionado sobre o canvas do PDF.

```css
.carimbo-rascunho {
  width: 145px
  background: rgba(255,255,255,0.95)
  border: 2px dashed #1a6fad  /* borda tracejada */
  border-radius: 8px
  padding: 8px 12px
  box-shadow: 0 4px 16px rgba(33,126,189,0.25)
  backdrop-filter: blur(4px)
  animation: stampAppear (0.28s, scale 0.85→1)
}
```

#### Estrutura interna

```
.carimbo-rascunho
├── .carimbo-rascunho-titulo  (uppercase, 10px, azul)
├── .carimbo-rascunho-info    (linhas com ícone + texto)
└── .carimbo-rascunho-remover (botão circular, vermelho)
```

#### Variantes de tamanho

| Classe | Largura | Padding | Font título | Info |
|---|---|---|---|---|
| `.carimbo-sm` | 60px | 4px 7px | 8px | oculto |
| `.carimbo-md` | 135px | 8px 12px | 10px | 10px |
| `.carimbo-lg` | 160px | 12px 16px | 12px | 12px |

#### Botão de remoção (`.carimbo-rascunho-remover`)

```css
width/height: 22px
border-radius: 50%
border: 1.5px solid #e04050
background: #ffffff
color: #e04050
position: absolute; top: -10px; right: -10px
```

Hover: fundo vira `#e04050`, texto vira branco, `scale(1.15)`.

---

### 3.6 Controles de Página (PDF Viewer)

```css
.page-controls {
  display: inline-flex
  background: rgba(255,255,255,0.72)  /* glassmorphism */
  backdrop-filter: blur(12px)
  padding: 6px 10px
  border-radius: 999px  /* pill */
  border: 1px solid rgba(255,255,255,0.45)
  box-shadow: 0 2px 12px rgba(18,50,64,0.06)
}
```

Botões internos: `hover` adiciona fundo `#edf6fa` com `scale(1.08)`. Active com `scale(0.95)`.

---

### 3.7 Linha do Tempo

```
.linha-do-tempo  (ul, padding-left: 28px)
  ::before → linha vertical de 2px (gradiente azul claro → transparente)
  └── .evento-linha-tempo
        ├── .marcador-evento  (círculo 20px, border 2.5px)
        │     .azul   → border: #337ab7
        │     .verde  → fundo gradiente sucesso + check "✓"
        └── .conteudo-evento
              ├── .descricao-evento (13px, bold)
              └── .hora-evento (12px, terciário)
```

Hover nos eventos anima o marcador com `scale(1.15)`.

---

### 3.8 Estado Vazio (Empty State)

#### Canvas vazio (`.no-content-container`)

```
background: #ffffff
border-radius: 14px
padding: 48px 40px
width: 70%
```

- Ícone de 56px com `opacity: 0.45` e animação `floatIcon` (flutua ±8px em loop de 3s)
- Título em 20px / bold
- Parágrafo auxiliar em 14px / `--muted`, `max-width: 320px`, `line-height: 1.5`

#### Placeholder de cards (`paginaValidacao.css`)

Ícone de 36px com `opacity: 0.6` centralizado, acompanhado de texto de apoio em 14px / `--sp-texto-terciario`.

---

## 4. Responsividade

### 4.1 Posicionador de Carimbo

| Breakpoint | Comportamento |
|---|---|
| `≤ 1000px` | Coluna esquerda do PDF ocultada (`.pdf-left-column`) |
| `≤ 900px` | Layout muda de `row` para `column`; PDF ocupa 60vh; painel de ações vira `flex-wrap` horizontal |
| `≤ 720px` | Separadores ocultos; valor de zoom oculto; controles de página com `flex-wrap` |
| `≤ 600px` | PDF em 50vh; painel de ações volta a `column`; botões e inputs reduzem tamanho; padding geral reduzido para 8px |

### 4.2 Página de Validação

| Breakpoint | Comportamento |
|---|---|
| `≤ 768px` | Layout interno muda de `row` para `column`; `.detalhes-card` e `.historico-card` vão a 100%; botão de portal ocupa 100% da largura |
| `≤ 480px` | Padding geral reduzido; ícone de validação diminui de 56px para 44px; grid de itens passa a 1 coluna; títulos reduzem para 20px |
| `≤ 360px` | Cabeçalho do card em `flex-direction: column` e `text-align: center`; títulos em 18px; labels em 10px |

---

## 5. Padrões de Interação

### Hover em elementos elevados
Elementos como painéis e cards elevam sua sombra no hover (`box-shadow` mais intensa) e podem aplicar `translateY(-1px)`, criando a sensação de "levantar" o elemento.

### Foco acessível
Todos os elementos interativos possuem `:focus-visible` com anel de foco (`--focus-ring: 0 0 0 3px rgba(56,178,216,0.30)`), sem uso de `outline: none` isolado.

### Feedback de clique
Botões e controles utilizam `transform: scale(0.95)` ou `translateY(0)` no `:active`, fornecendo feedback tátil visual.

### Cursor de pan (PDF Viewer)
```css
#viewerCanvas.pan-enabled          → cursor: grab
#viewerCanvas.pan-enabled.dragging → cursor: grabbing
```

---

## 6. Animações

| Nome | Descrição | Duração |
|---|---|---|
| `fadeInDown` | Entrada do header (opacidade 0→1, translateY -16px→0) | `0.6s ease-out` |
| `fadeInUp` | Entrada de cards e seções (opacidade 0→1, translateY 24px→0) | `0.5–0.7s ease-out` |
| `scaleIn` | Entrada do ícone de validação (scale 0.85→1) | `0.5s ease-out` |
| `stampAppear` | Entrada do carimbo (scale 0.85→1 + opacidade) | `0.28s ease-out` |
| `slideDown` | Entrada de alertas (translateY -10px→0) | `0.4s ease-out` |
| `floatIcon` | Flutuação do ícone de estado vazio (±8px) | `3s ease-in-out ∞` |
| `pulse` | Indicador pulsante do alerta informativo | `1.5s ease-in-out ∞` |
| `dangerPulse` | Indicador pulsante do alerta de perigo | `1s ease-in-out ∞` |
| `pulseGlow` | Glow do ícone de validação (box-shadow pulsante verde) | `2.5s ease-in-out ∞` |
| `shimmer` | Efeito de brilho no botão de portal | `on hover` |

> **Padrão de entrada:** elementos usam `animation: ... both` com `animation-delay` escalonado (0.15s → 0.3s → 0.4s → 0.55s), criando uma sequência de aparição em cascata.

---

## 7. Convenções de Nomenclatura

### Prefixos de variáveis CSS

| Prefixo | Arquivo | Escopo |
|---|---|---|
| `--` (sem prefixo) | `sp_posicionadorCarimbo.css` | Tokens locais do componente |
| `--sp-` | `paginaValidacao.css` | Tokens globais do sistema LibSP |

### Nomenclatura de classes

| Padrão | Exemplo | Descrição |
|---|---|---|
| `kebab-case` | `.acoes-panel` | Padrão geral de classes |
| Prefixo `sp-` | `--sp-azul-escuro` | Variáveis do design system global |
| Modificadores BEM-like | `.btn.primary`, `.carimbo-sm` | Variações por classe adicional |
| Prefixo de contexto | `.acoes-container`, `.acoes-panel` | Agrupa componentes de uma mesma região |

### Idioma das classes
As classes e variáveis utilizam **português brasileiro** para nomenclatura semântica (`cabecalho`, `conteudo`, `detalhes`, `historico`, `carimbo`), com termos técnicos em inglês quando convencionais (`panel`, `container`, `btn`, `card`).

---

*Documentação gerada com base na análise estática dos arquivos `sp_posicionadorCarimbo.css` e `paginaValidacao.css` do projeto SiloPrime LibSP.*
