# Mundo do Octógono

Portal de notícias sobre MMA — HTML5, CSS3 e JavaScript puro (sem frameworks), construído para servir como página de destino em campanhas de Snapchat Ads, Taboola e Pinterest Ads, com padrão de qualidade de veículo de mídia esportiva profissional.

> **Independência editorial:** este portal não possui qualquer afiliação oficial com UFC®, PFL®, ONE Championship®, Bellator® ou outras organizações de luta. Nomes de organizações são citados apenas para fins jornalísticos/informativos (uso nominativo).

## ⚠️ Sobre o conteúdo editorial (leia antes de publicar)

Todo o conteúdo de notícias, eventos, resultados e rankings foi **substituído por informação real**, apurada via pesquisa na web em 14 de julho de 2026, com fontes citadas ao final de cada página (UFC.com, ESPN, Sherdog, Tapology, MMA Mania, entre outras). Isso inclui:

- Resultado real do **UFC 329** (Holloway vence McGregor por nocaute técnico em 69 segundos) na home, em `pages/noticia.html` e `pages/resultados.html`;
- Cards reais e confirmados dos próximos três eventos do UFC em `pages/eventos.html`;
- Rankings oficiais do UFC (peso por peso e todas as divisões, masculino e feminino) em `pages/rankings.html`;
- Notícias reais sobre PFL/Bellator (fusão de marcas, novo formato eliminatório) e ONE Championship (recorde de 72 eventos em 2026).

**Isso significa que o conteúdo tem validade temporal.** Rankings mudam semanalmente, cards de eventos podem sofrer alterações por lesões (como já ocorreu com o card de Abu Dhabi), e resultados deixam de ser "recentes" rapidamente. Antes de publicar ou reativar este site depois de um tempo parado, **revise e atualize manualmente** essas quatro páginas com informações atuais — o restante do site (design, componentes, páginas institucionais e legais) não tem essa validade limitada.

## 📷 Sobre as fotos usadas

As fotos em `assets/images/` são de banco de imagens de uso livre (Unsplash), sob licença que permite uso comercial/publicitário sem exigir atribuição. São fotos **genéricas de MMA, boxe e Jiu-Jitsu** (octógono, luvas, grappling) escolhidas por conexão temática com cada notícia — **nenhuma delas retrata os atletas reais mencionados no texto** (Conor McGregor, Max Holloway, etc.). Isso é proposital: usar fotos de atletas famosos sem licença comercial específica (a maioria das fotos de imprensa de celebridades tem licença "somente editorial", que proíbe uso em anúncios) é violação de direitos autorais/de imagem e motivo comum de reprovação em Taboola, Snapchat Ads e Pinterest Ads. Se quiser fotos reais dos atletas, será necessário licenciar diretamente com uma agência (Getty Images, AP Images) ou com o UFC/organização, especificamente para uso publicitário.

---

## 1. Estrutura do projeto

```
mundo-do-octogono/
├── index.html                       # Home
├── robots.txt
├── sitemap.xml
├── manifest.json
├── README.md
├── assets/
│   ├── css/
│   │   └── main.css                 # Design system completo (tokens, componentes, responsivo)
│   ├── js/
│   │   └── main.js                  # Navbar, menus, modais, toasts, tabs, formulários, etc.
│   ├── icons/
│   │   ├── logo.svg                 # Logo principal (usa currentColor)
│   │   └── favicon.svg
│   └── images/                      # Reservado para imagens reais (ver seção 4)
└── pages/
    ├── noticia.html                 # Template de artigo (NewsArticle schema)
    ├── categoria.html                # Listagem/categoria com filtro
    ├── eventos.html
    ├── resultados.html
    ├── rankings.html                 # Peso por peso + 8 categorias masc. + 4 fem.
    ├── sobre.html
    ├── contato.html
    ├── politica-de-privacidade.html
    ├── termos-de-uso.html
    ├── politica-de-cookies.html
    └── 404.html
```

Todas as páginas usam **caminhos absolutos a partir da raiz** (`/assets/...`, `/pages/...`). Isso exige que o site seja servido por um servidor HTTP (local ou produção) — **não abra os arquivos diretamente com `file://`**, pois os caminhos absolutos não resolverão.

## 2. Como rodar localmente

Qualquer servidor estático funciona. Exemplos:

```bash
# Python (já disponível na máquina)
python -m http.server 4173

# Node (se tiver o pacote "serve" instalado globalmente)
npx serve -l 4173
```

Depois acesse `http://localhost:4173`.

## 3. Stack e decisões técnicas

- **HTML5 semântico**: `header`, `main`, `article`, `nav`, `aside`, `footer`, landmarks e `aria-*` em todos os componentes interativos.
- **CSS3 puro** com Custom Properties (design tokens) em `assets/css/main.css` — sem pré-processador, sem framework. Mobile-first com breakpoints em 480px / 640px / 760px / 900px / 960px.
- **JavaScript ES6 vanilla** (`assets/js/main.js`), um único arquivo, sem dependências. Inclui: menu mobile acessível, mega menu, modal de busca com foco travado (focus trap), sistema de toasts, tabs com navegação por teclado (setas), validação de formulários, back-to-top, filtro client-side de categorias.
- **Tipografia**: Archivo (display/headlines) + Inter (corpo de texto), carregadas via Google Fonts com `font-display: swap` e carregamento assíncrono (`media="print" onload="this.media='all'"`) para não bloquear a renderização.
- **Sem imagens de terceiros**: os espaços de imagem usam um componente `.media-frame` (gradiente + marca do octógono em SVG) como placeholder visual elegante. Isso evita qualquer problema de direitos autorais no template. **Antes de publicar**, substitua os `.media-frame` por fotos reais licenciadas (ver seção 4).

## 4. Antes de publicar (checklist)

- [ ] Substituir os placeholders `.media-frame` por imagens reais (fotos licenciadas ou produzidas internamente), em formato **WebP** com fallback, sempre com `alt` descritivo.
- [ ] Trocar o domínio placeholder `https://www.mundodooctogono.com.br` por seu domínio real em: `canonical`, Open Graph, Twitter Card, JSON-LD, `robots.txt` e `sitemap.xml`.
- [ ] Revisar e atualizar as notícias, cards de eventos, resultados e rankings (já são reais, mas ficam desatualizados com o tempo — ver aviso no topo deste documento).
- [ ] Configurar o envio real dos formulários (newsletter e contato) para um backend, ESP (ex.: Mailchimp/Resend) ou serviço de formulários — atualmente eles validam no client-side e exibem apenas um toast de confirmação, sem envio real.
- [ ] Gerar favicons adicionais em PNG (16x16, 32x32, 180x180 para Apple Touch Icon) a partir do `favicon.svg`, se quiser suporte a navegadores mais antigos.
- [ ] Revisar todos os textos legais (Privacidade, Termos, Cookies) com um profissional jurídico antes da publicação.

## 5. Marketing e mensuração

Os locais para os scripts de mensuração estão **preparados, porém comentados** (sem nenhum ID inserido) no `<head>` e logo após a abertura do `<body>` do arquivo `index.html`:

- Google Tag Manager (script no `<head>` + `<noscript>` no `<body>`)
- Google Analytics 4 (gtag.js)
- Meta Pixel
- Pinterest Tag
- Snap Pixel
- Microsoft Clarity
- UTMify (captura/persistência de parâmetros UTM)

Para ativar: descomente o bloco correspondente, insira o ID fornecido pela plataforma, e **replique o mesmo bloco no `<head>`/`<body>` das demais páginas em `/pages`**, já que o projeto não usa um sistema de templates (é HTML estático puro). Caso o projeto cresça, considere migrar para um gerador de site estático (Astro, Eleventy) para compartilhar esse cabeçalho automaticamente entre páginas.

## 6. SEO técnico incluído

- `title` e `meta description` únicos por página.
- `canonical` em todas as páginas indexáveis.
- Open Graph + Twitter Card completos.
- JSON-LD: `Organization`, `WebSite` (com `SearchAction`), `NewsArticle` (na página de notícia), `BreadcrumbList` (notícia e categoria), `SportsEvent` (eventos).
- `robots.txt` e `sitemap.xml` na raiz.
- `manifest.json` para instalação como PWA leve (ícone, cores de tema).
- Hierarquia de headings (`h1` único por página, `h2`/`h3` estruturados).
- Página 404 com `noindex, follow` e navegação de recuperação.

## 7. Acessibilidade (WCAG)

- Skip link ("Pular para o conteúdo") em todas as páginas.
- Contraste de cores validado nas combinações principais (texto sobre branco, texto sobre preto, badges).
- `aria-label`, `aria-current`, `aria-expanded`, `aria-haspopup`, `aria-selected`, `role="dialog"`/`role="tablist"` onde aplicável.
- Navegação completa por teclado: menu mobile, mega menu, modais (com focus trap e fechamento via `Esc`), tabs (setas ← →).
- `prefers-reduced-motion` respeitado globalmente (desativa animações/transições).
- Todas as imagens decorativas usam `aria-hidden="true"`; imagens informativas usam `alt` (a definir ao substituir os placeholders por fotos reais).

## 8. Performance

- Zero frameworks JS/CSS pesados — apenas HTML/CSS/JS nativos.
- Fontes carregadas de forma assíncrona e não bloqueante.
- CSS em arquivo único, minificável em produção (ver seção 9).
- SVGs inline para ícones (sem requisições HTTP extras).
- `prefetch`/`preload` aplicados em recursos críticos (fonte, logo).
- Sem layout shift perceptível: dimensões de imagem/ícones definidas via `width`/`height` e `aspect-ratio` nos `.media-frame`.

## 9. Antes de ir para produção: minificação e compressão

Este projeto entrega os arquivos **não minificados** para máxima legibilidade e manutenção. Para produção, recomenda-se um passo simples de build (qualquer uma das opções):

```bash
# Exemplo com esbuild (instalação única)
npx esbuild assets/css/main.css --minify --outfile=assets/css/main.min.css
npx esbuild assets/js/main.js --minify --outfile=assets/js/main.min.js
```

Depois, aponte os `<link>`/`<script>` para as versões `.min`. Habilite também compressão Gzip/Brotli no servidor ou CDN.

## 10. Licença e uso de marcas

Todo o código, design e textos originais deste projeto pertencem ao Mundo do Octógono. Marcas de terceiros citadas (UFC®, PFL®, ONE Championship®, Bellator® etc.) pertencem aos seus respectivos titulares e são usadas apenas de forma nominativa/editorial, sem qualquer alegação de parceria oficial.
