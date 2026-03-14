# juliocanalizacoes

Website institucional de Júlio Gonçalves Canalizações, com apresentação de serviços, galeria de trabalhos e formulário de pedido de orçamento.

## Stack

- Next.js 14 (App Router) + React 18
- TypeScript
- Tailwind CSS
- API Route Handler para envio de emails (Nodemailer)

## Execução Local

1. Instalar dependências:

```bash
npm install
```

2. Configurar variáveis de ambiente:

```bash
cp .env.example .env.local
```

3. Iniciar em desenvolvimento:

```bash
npm run dev
```

4. Validar qualidade e build de produção:

```bash
npm run check
```

## Variáveis de Ambiente

Definir no `.env.local` (local) e no Vercel (produção):

- `NEXT_PUBLIC_SITE_URL`: URL pública do website (ex: `https://www.juliocanalizacoes.pt`)
- `SMTP_HOST`: host SMTP
- `SMTP_PORT`: porta SMTP (587 ou 465)
- `SMTP_USER`: utilizador SMTP
- `SMTP_PASS`: password SMTP
- `CONTACT_EMAIL_FROM`: remetente (ex: `no-reply@dominio.pt`)
- `CONTACT_EMAIL_TO`: destinatário dos pedidos de orçamento

## Auditoria Técnica do Projeto

### O que está correto

- Projeto compila e faz build sem erros.
- Lint sem warnings/erros.
- Formulário com validação de campos obrigatórios.
- Proteções anti-spam já implementadas:
	- honeypot (`website`)
	- validação de content-type
	- rate limiting em memória por IP
	- sanitização de headers e escaping HTML

### O que estava desatualizado e foi corrigido

- Nome do projeto atualizado para `juliocanalizacoes`.
- README totalmente atualizado para o projeto atual.
- Configuração de segurança adicionada em `next.config.js`.
- Metadados (canonical/OpenGraph/robots) melhorados em `src/app/layout.tsx`.
- `.env.example` atualizado para incluir `NEXT_PUBLIC_SITE_URL`.

### Itens a mais / potencialmente desnecessários

- Não há dependências claramente redundantes neste momento; `@types/nodemailer` é necessário para o TypeScript neste setup.
- Pastas de build local (`.next/`) e dependências (`node_modules/`) existem no workspace local, mas não devem ser versionadas.

### Pontos de atenção (recomendado antes de escalar tráfego)

- O rate limit atual usa memória local do processo. Em ambiente serverless pode não ser global entre instâncias.
- Para segurança adicional, considerar:
	- rate limit distribuído (ex: Redis/Upstash)
	- CAPTCHA invisível para formulário
	- monitorização de erros com Sentry

## Preparação para Produção (Vercel)

Já incluído no código:

- `reactStrictMode: true`
- `poweredByHeader: false`
- security headers:
	- `X-Content-Type-Options: nosniff`
	- `X-Frame-Options: DENY`
	- `Referrer-Policy: strict-origin-when-cross-origin`
	- `Permissions-Policy`
	- `Strict-Transport-Security`
- scripts de validação:
	- `npm run typecheck`
	- `npm run check`

## Guia Completo para Publicar no Vercel (Seguro e Atual)

### 1. Pré-requisitos

- Conta no Vercel
- Repositório Git (GitHub/GitLab/Bitbucket)
- Domínio próprio (opcional, recomendado)
- Credenciais SMTP válidas

### 2. Checklist local antes do deploy

```bash
npm ci
npm run check
```

Se isto falhar localmente, corrigir antes de publicar.

### 3. Subir código para o repositório

```bash
git add .
git commit -m "chore: prepare juliocanalizacoes for vercel production"
git push
```

### 4. Criar projeto no Vercel

1. Ir a Vercel Dashboard.
2. `Add New` -> `Project`.
3. Importar o repositório.
4. Framework preset: `Next.js`.
5. Root Directory: raiz do projeto.
6. Build command: `npm run build` (default do Next).
7. Output: `.next` (default do Next).

### 5. Configurar Environment Variables no Vercel

No projeto Vercel, abrir `Settings` -> `Environment Variables` e adicionar:

- `NEXT_PUBLIC_SITE_URL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASS`
- `CONTACT_EMAIL_FROM`
- `CONTACT_EMAIL_TO`

Boas práticas:

- Definir para `Production` e `Preview` quando aplicável.
- Nunca commitar `.env.local`.
- Rotacionar `SMTP_PASS` periodicamente.

### 6. Deploy inicial

1. Fazer `Deploy` no Vercel.
2. Verificar logs de build.
3. Abrir a URL gerada e testar:
	 - página inicial
	 - galeria
	 - envio do formulário

### 7. Validar email em produção

Testar formulário com dados reais e confirmar:

- receção no email de destino
- `reply-to` correto
- sem erros em logs de runtime

### 8. Configurar domínio customizado

1. `Settings` -> `Domains`.
2. Adicionar domínio (ex: `www.juliocanalizacoes.pt`).
3. Configurar DNS (A/CNAME) no teu provider conforme instruções Vercel.
4. Confirmar SSL ativo (TLS automático no Vercel).
5. Atualizar `NEXT_PUBLIC_SITE_URL` para o domínio final.

### 9. Hardening e boas práticas de operação

- Ativar 2FA na conta Vercel e no provedor Git.
- Limitar quem pode fazer deploy em produção.
- Proteger branch principal (`main`) com PR review.
- Usar preview deployments para validação antes de merge.
- Configurar alertas de uptime e erro (ex: UptimeRobot + Sentry).

### 10. Rotina de manutenção recomendada

- Semanal:
	- rever logs de funções
	- testar envio do formulário
- Mensal:
	- atualizar dependências (`npm outdated`)
	- verificar vulnerabilidades (`npm audit`)
- Trimestral:
	- rever headers/políticas de segurança
	- rodar teste completo de deploy em preview

## Estrutura Atual (resumo)

```text
src/
	app/
		layout.tsx
		page.tsx
		globals.css
		api/
			orcamento/
				route.ts
public/
	img/
```

## Licença

© 2026 Júlio Gonçalves Canalizações. Todos os direitos reservados.
