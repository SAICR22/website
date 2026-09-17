# Itami Food Consulting

Site institucional em português do Brasil, com exportação estática para GitHub Pages.

## Desenvolvimento

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Publicação

```sh
pnpm build
```

O resultado é gerado em `out/`. O workflow existente publica a branch `main` no GitHub Pages. Não usar `next start` para a exportação estática. Para testar o build: `python -m http.server 4173 --directory out`.

## Nova direção visual

Carvão, marfim e laranja, com fotografia industrial, três soluções, uma sequência de produto navegável e apresentação de Sara. Imagens fornecidas pelo usuário, otimizadas em WebP. Exemplos gerados por IA estão identificados como ilustrativos. As marcas mencionadas pertencem à trajetória profissional de Sara, não a uma lista de clientes da Itami.

Animações CSS e IntersectionObserver, navegação por teclado, menu mobile e respeito a prefers-reduced-motion. Sem dependências adicionais.

## Contato

O formulário prepara um rascunho no aplicativo de e-mail. Não há backend de envio nem confirmação fictícia de recebimento. Confirmar a ativação de `contato@itamifood.com.br` no Google Workspace antes de iniciar campanhas.

Para exibir WhatsApp, configurar `NEXT_PUBLIC_WHATSAPP_URL` com um endereço válido de `https://wa.me/` ou `https://api.whatsapp.com/` no ambiente de build e reconstruir. Nenhum número foi inventado.

## Domínio

Preservar o domínio personalizado já configurado no GitHub Pages: `itamifood.com.br`. Nenhuma mudança de DNS é necessária para atualizar o design. Manter registros MX, SPF, DKIM e DMARC do Google Workspace. Não substituir os nameservers para publicar alterações de conteúdo.

## Assets

`public/assets/product-development.webp`, `product-process.webp` e `product-retail.webp` são ilustrações, não fotografias de projetos clientes. As fotos de Sara e o logo são os assets reais fornecidos. Os nomes das empresas aparecem de forma tipográfica; inserir versões oficiais dos logotipos quando fornecidas.
