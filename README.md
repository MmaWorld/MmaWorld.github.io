# Mundo Bíblico Kids

Site infantil para aprender a Bíblia brincando, feito em HTML, CSS e JavaScript puro (sem frameworks, sem build). Funciona no GitHub Pages.

## O que tem no site

| Página | O que faz |
| --- | --- |
| `index.html` | Home com atalhos, versículo do dia e destaques |
| `pages/colorir.html` | 8 desenhos bíblicos para **colorir na tela** (toque na cor e depois na área), desfazer, ver modelo colorido, **imprimir em branco** e **baixar em PNG**. O progresso fica salvo no aparelho. |
| `pages/historias.html` | 8 **histórias animadas e narradas** (Criação, Noé, Moisés, Davi e Golias, Daniel, Jonas, Natal e a ovelha perdida). O botão “Assistir” passa as cenas sozinho com narração em voz alta (Web Speech API, voz pt-BR do aparelho), com zoom, chuva, estrelas, brilho e confete. |
| `pages/quiz.html` | **Quiz bíblico valendo pontos**: 3 níveis (48 perguntas), bônus por rapidez, estrelas, recordes e modo em dupla. Cada resposta mostra a referência bíblica. |
| `pages/pais.html` | Orientações para pais/professores e privacidade |
| `404.html` | Página de erro (usa caminhos absolutos, como exige o GitHub Pages) |

## Estrutura

```
assets/
  css/style.css        estilos de todo o site
  js/desenhos.js       biblioteca de desenhos em SVG (usada no colorir, nas histórias e na home)
  js/app.js            menu, versículo do dia, armazenamento local e sons
  js/colorir.js        página de colorir
  js/historias.js      roteiro das histórias + player
  js/quiz.js           banco de perguntas + jogo
  icons/favicon.svg
```

## Como adicionar conteúdo

- **Nova pergunta:** em `assets/js/quiz.js`, acrescente uma linha no nível desejado:
  `['Pergunta?', 'Resposta certa', ['errada 1', 'errada 2', 'errada 3'], 'Referência']`.
- **Nova história:** em `assets/js/historias.js`, acrescente um objeto em `HISTORIAS` com `cenas` (texto + efeitos opcionais: `foco`, `efeito`, `clima`, `mov`).
- **Novo desenho:** em `assets/js/desenhos.js`, crie `D.nome = function () { ... }` usando as funções auxiliares (`pessoa`, `ovelha`, `leao`, `peixe`, `nuvem`, `sol`...) e registre-o em `LISTA`. Cada área pintável usa `P/C/E/Q` com a cor original; linhas só de contorno usam `L`.

## Rodar localmente

```bash
node serve.js        # http://localhost:4173
```

## Direitos e privacidade

- Todos os desenhos foram criados em SVG especialmente para este projeto (sem imagens de terceiros).
- Sem anúncios, cookies de rastreamento ou coleta de dados. Desenhos pintados, recordes e preferências ficam só no `localStorage` do navegador.
- As fontes vêm do Google Fonts.
