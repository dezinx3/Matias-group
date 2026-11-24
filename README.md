# Matias Group — Site institucional

Site estático (HTML + CSS + JS, sem dependências e sem recursos de terceiros).

## Estrutura
- `index.html` — conteúdo
- `style.css` — identidade neon (cores no `:root`) e fontes locais (`@font-face` no topo)
- `script.js` — menu, modais dos serviços, animações de entrada, partículas
- `noscript.css` — garante que o conteúdo apareça mesmo com JavaScript desligado
- `assets/` — imagens em **.webp** e `assets/fonts/` (Manrope e DM Sans, hospedadas aqui)
- `_headers` (Netlify / Cloudflare Pages) e `.htaccess` (Apache/cPanel) — cabeçalhos de segurança e cache

## Trocar uma imagem
Mantenha o **mesmo nome de arquivo** em `assets/` e use `.webp`, com no máximo **1200 px de largura** (900 px para `foto-hero`).
Para converter: https://squoosh.app (formato WebP, qualidade ~75). Fotos de câmera/celular direto (5–15 MB) deixam o site pesado.

| Arquivo | Onde aparece |
|---|---|
| `foto-hero.webp` | Topo do site (pode ter fundo transparente) |
| `foto-equipe.webp` | Seção da equipe |
| `servico-inss.webp`, `servico-servidor.webp`, `servico-trabalhador.webp`, `servico-outras.webp` | Card e modal de cada serviço |
| `logo-matias-group.webp` | Seção "Quem somos" |
| `favicon.png` | Ícone da aba |

## Editar textos dos modais
Em `script.js`: objeto `SERVICES` (INSS, servidor, trabalhador) e lista `OTHERS`.

## Segurança — publicar
- O `index.html` já traz uma **Content-Security-Policy** (só permite arquivos do próprio site) e `referrer` restrito.
- Para o conjunto completo (HSTS, anti-iframe, nosniff…), o servidor precisa enviar os cabeçalhos: use `_headers` (Netlify, Cloudflare Pages) ou `.htaccess` (Apache). GitHub Pages não aceita cabeçalhos personalizados (a CSP do `<meta>` continua valendo).
- Se um dia adicionar Google Analytics, Pixel, chat etc., libere o domínio correspondente na CSP (`script-src`, `connect-src`, `img-src`), senão será bloqueado de propósito.
- Use sempre HTTPS.

## Contatos atuais
WhatsApp +55 (88) 9.9265-6779 · Instagram @_matias.andre · E-mail andresousa42757@gmail.com · Atendimento Home-office e à domicílio.
