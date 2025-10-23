# 🚀 GUIA DE DEPLOY - Transformar em Site Online

## ✅ Código já está no GitHub!

**Repositório:** https://github.com/jjedsone/fisio

---

## 🌐 Opção 1: Deploy no Netlify (Recomendado - GRÁTIS)

### Passo a Passo:

#### 1️⃣ Criar conta no Netlify

1. Acesse: https://www.netlify.com
2. Clique em **"Sign up"**
3. Escolha **"Sign up with GitHub"**
4. Autorize o Netlify

#### 2️⃣ Importar do GitHub

1. No dashboard, clique em **"Add new site"** → **"Import an existing project"**
2. Escolha **"Deploy with GitHub"**
3. Selecione o repositório **"jjedsone/fisio"**
4. Configure:
   - **Branch to deploy:** `main`
   - **Base directory:** `meu-site`
   - **Build command:** `npm run build`
   - **Publish directory:** `meu-site/dist`

#### 3️⃣ Configurar Variáveis (Opcional)

Em **Site settings** → **Environment variables**:
```
NODE_VERSION=18
```

#### 4️⃣ Deploy Automático!

- Clique em **"Deploy site"**
- Aguarde 2-3 minutos
- Seu site estará no ar!

#### 5️⃣ Personalizar Domínio

1. Vá em **Domain settings**
2. Clique em **"Add custom domain"**
3. Se você tiver um domínio:
   - Digite seu domínio (ex: `drateiciane.com.br`)
   - Siga as instruções de DNS
4. Senão, use o domínio gratuito do Netlify:
   - Exemplo: `drateiciane.netlify.app`
   - Pode renomear em **"Domain settings"** → **"Options"** → **"Edit site name"**

### 🎉 Pronto! Seu site está online!

**Link automático:** https://seunome.netlify.app

---

## 🌐 Opção 2: Deploy no Vercel (Alternativa - GRÁTIS)

### Passo a Passo:

#### 1️⃣ Criar conta no Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel

#### 2️⃣ Importar Projeto

1. No dashboard, clique em **"Add New..."** → **"Project"**
2. Selecione o repositório **"jjedsone/fisio"**
3. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `meu-site`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

#### 3️⃣ Deploy!

- Clique em **"Deploy"**
- Aguarde 2-3 minutos
- Seu site estará no ar!

### 🎉 Pronto!

**Link automático:** https://fisio-seunome.vercel.app

---

## ⚠️ IMPORTANTE: WhatsApp Bot

### O Bot do WhatsApp NÃO funciona online!

O servidor do WhatsApp (`npm run server`) **precisa rodar localmente** porque:
- WhatsApp Web.js precisa de um navegador
- Requer autenticação com QR Code
- Não funciona em servidores serverless (Netlify/Vercel)

### ✅ Solução: 2 Ambientes

#### 🌐 Site Online (Netlify/Vercel)
- Site estático
- Chatbot do site (funciona)
- Formulários de agendamento
- Páginas de serviços

#### 💻 WhatsApp Bot Local (Seu Computador)
- Servidor rodando: `npm run server`
- Bot conectado via QR Code
- Notificações automáticas
- Admin panel com WhatsApp Bot

---

## 🔧 Deploy do WhatsApp Bot (Avançado)

### Para rodar o bot 24/7, você precisa de um VPS:

#### Opções de VPS:
1. **DigitalOcean** - $5/mês
2. **AWS EC2** - Tier gratuito 12 meses
3. **Google Cloud** - $300 crédito inicial
4. **Vultr** - $2.50/mês

#### Passos Resumidos:
1. Criar servidor Ubuntu
2. Instalar Node.js
3. Clonar repositório
4. Instalar PM2: `npm install -g pm2`
5. Iniciar bot: `pm2 start server/whatsapp-server.js`
6. Salvar: `pm2 save && pm2 startup`

**Tutorial completo:** Consulte `BOT_WHATSAPP_README.md`

---

## 📊 Resumo da Arquitetura

```
┌─────────────────────────────────────────────┐
│  SITE ONLINE (Netlify/Vercel)              │
│  ✅ Páginas estáticas                        │
│  ✅ Chatbot do site                          │
│  ✅ Formulários                              │
│  🌐 https://drateiciane.netlify.app         │
└─────────────────────────────────────────────┘
                     │
                     │ (Visitantes)
                     ▼
┌─────────────────────────────────────────────┐
│  SEU COMPUTADOR (Local)                     │
│  ✅ npm run dev → Admin Panel                │
│  ✅ npm run server → WhatsApp Bot            │
│  🔐 http://localhost:3001                   │
└─────────────────────────────────────────────┘
                     │
                     │ (WhatsApp)
                     ▼
┌─────────────────────────────────────────────┐
│  CLIENTES                                   │
│  📱 WhatsApp Bot                             │
│  🌐 Site online                              │
└─────────────────────────────────────────────┘
```

---

## 🎯 Cenários de Uso

### Cenário 1: Apenas Site Online (Sem WhatsApp Bot)

**Deploy:** Netlify/Vercel  
**Funciona:**
- ✅ Site profissional
- ✅ Chatbot do site
- ✅ Formulários de agendamento
- ✅ Página de serviços
- ❌ Bot do WhatsApp (offline)
- ❌ Admin Panel (offline)

**Melhor para:** Captura de leads online

### Cenário 2: Site + Bot Local (Recomendado)

**Site:** Netlify/Vercel (online)  
**Bot:** Seu computador (local)  

**Funciona:**
- ✅ Site online 24/7
- ✅ Chatbot do site
- ✅ Bot WhatsApp quando PC ligado
- ✅ Admin Panel quando PC ligado
- ✅ Notificações automáticas

**Melhor para:** Operação diária com controle total

### Cenário 3: Tudo Online (Profissional)

**Site:** Netlify/Vercel (online)  
**Bot:** VPS (online 24/7)  

**Funciona:**
- ✅ Tudo online 24/7
- ✅ Automação completa
- ✅ Sempre disponível

**Melhor para:** Operação profissional completa

---

## 🚀 Começar Agora

### Passo 1: Deploy do Site (5 minutos)

1. Vá em https://www.netlify.com
2. "Sign up with GitHub"
3. "Import project" → Selecione "fisio"
4. Configure:
   - Base: `meu-site`
   - Build: `npm run build`
   - Publish: `meu-site/dist`
5. Deploy!

### Passo 2: Testar o Site Online

1. Aguarde 2-3 minutos
2. Acesse o link fornecido
3. Teste o chatbot
4. Teste os formulários

### Passo 3: WhatsApp Bot (Local)

1. No seu PC: `npm run server`
2. Acesse admin: http://localhost:5173
3. Conecte WhatsApp com QR Code
4. Bot funcionando!

---

## 📝 Checklist de Deploy

### Antes do Deploy:
- [x] Código no GitHub
- [x] README.md criado
- [x] .gitignore configurado
- [x] Build testado localmente

### Deploy Netlify:
- [ ] Conta criada
- [ ] Projeto importado
- [ ] Configurações ajustadas
- [ ] Deploy bem-sucedido
- [ ] Site testado online

### Pós-Deploy:
- [ ] Personalizar domínio (opcional)
- [ ] Testar todas as páginas
- [ ] Verificar chatbot
- [ ] Atualizar links se necessário

---

## 🆘 Problemas Comuns

### Build Falhou no Netlify

**Erro:** `Command failed with exit code 1`

**Solução:**
1. Verifique se o Base directory está: `meu-site`
2. Build command: `npm run build`
3. Publish directory: `meu-site/dist`

### Site carrega mas sem estilos

**Solução:**
- Limpe cache do Netlify
- Faça rebuild: "Trigger deploy" → "Clear cache and deploy site"

### Links não funcionam

**Solução:**
- Verifique se `netlify.toml` foi commitado
- Ele tem a configuração de redirects

---

## 📞 Suporte

**Dúvidas sobre deploy?**
- Netlify Docs: https://docs.netlify.com
- Vercel Docs: https://vercel.com/docs

**Dúvidas sobre o projeto?**
- Consulte `COMO_USAR.md`
- Consulte `TESTE_FINAL.md`

---

## 🎉 Próximos Passos

Após deploy:

1. **Compartilhe o link** com clientes
2. **Configure domínio próprio** (opcional)
3. **Monitore acessos** no dashboard Netlify/Vercel
4. **Atualize conteúdo** conforme necessário

Para atualizar o site:
```bash
git add .
git commit -m "Atualização"
git push
```

O site atualiza automaticamente! 🚀

---

**💙 Seu site está pronto para o mundo! ✨**

**Site Online + WhatsApp Bot = Sistema Completo! 🎯**

