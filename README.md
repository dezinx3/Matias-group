# Matias Group — Site institucional

Site institucional estático da Matias Group, desenvolvido com HTML, CSS e JavaScript, sem framework ou dependências de terceiros.

## Estrutura
- `index.html` — conteúdo, metadados e estrutura semântica.
- `style.css` — identidade visual, responsividade e animações.
- `script.js` — menu, modais, animações e interações.
- `noscript.css` — mantém o conteúdo visível sem JavaScript.
- `assets/` — imagens WebP, favicon e fontes locais.
- `vercel.json` — cabeçalhos HTTP de segurança e cache para a Vercel.
- `robots.txt` e `sitemap.xml` — orientação básica para mecanismos de busca.
- `_headers` e `.htaccess` — configurações alternativas para outras hospedagens; não substituem `vercel.json` na Vercel.

## Desenvolvimento local
Abra `index.html` no navegador ou utilize a extensão Live Server do VS Code. Não há etapa de build.

## Publicação na Vercel
Aponte o projeto para a pasta que contém `index.html`. Como o site é estático, não é necessário comando de build. O arquivo `vercel.json` aplica os cabeçalhos HTTP na implantação.

O arquivo `.vercelignore` evita publicar arquivos de documentação e configurações destinadas a outros servidores.

## Segurança
- A política CSP é enviada como cabeçalho HTTP pela Vercel.
- `style-src-attr 'unsafe-inline'` é mantido para permitir os estilos dinâmicos utilizados nas animações; scripts continuam restritos a arquivos do próprio domínio.
- Não há autenticação, banco de dados, formulário ou API neste site estático.
- Nunca coloque senhas, tokens ou chaves privadas no repositório ou em arquivos públicos.
- Se adicionar analytics, pixels, formulários ou integrações, revise a CSP e a política de privacidade antes de publicar.

## Conteúdo e contatos
Antes de publicar alterações em telefone, e-mail, endereço ou modalidades, confirme se os dados estão atualizados. A política de privacidade deve refletir o tratamento real de dados feito pela empresa e precisa ser validada com as informações jurídicas e operacionais corretas.


## Páginas legais
- `privacidade/index.html` — Política de Privacidade.
- `termos/index.html` — Termos de Uso.
- Os links dessas páginas estão no rodapé do site.
- O contato para assuntos de privacidade é o WhatsApp (88) 99265-6779.
- A documentação identifica André Filho de Sousa Matias como pessoa física responsável pela operação; a marca ainda não possui CNPJ próprio.
- O CPF do responsável não é publicado.

**Atenção:** os documentos são uma versão inicial baseada nas informações operacionais fornecidas. Antes de divulgar, confirme que o compartilhamento, os canais, os parceiros, a retenção e os procedimentos descritos correspondem à prática real. Recomenda-se revisão jurídica especializada, especialmente antes de iniciar coleta sistemática ou encaminhamento de documentos e dados financeiros.
