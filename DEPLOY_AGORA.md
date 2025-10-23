# 🚀 DEPLOY AGORA - Passo a Passo Visual

## ⏱️ Tempo total: 5 minutos

---

## 📱 PASSO 1: Abra o Netlify

### Clique aqui: 👉 https://app.netlify.com

**Ou acesse:** www.netlify.com e clique em **"Log in"**

---

## 🔐 PASSO 2: Login com GitHub

### Opção A: Se você JÁ tem conta Netlify
1. Faça login normalmente

### Opção B: Se é PRIMEIRA VEZ (Recomendado)
1. Clique em **"Sign up"**
2. Clique no botão **"GitHub"** (ícone do gato preto)
3. Autorize o Netlify a acessar seu GitHub
4. Pronto! Você está logado!

---

## ➕ PASSO 3: Adicionar Novo Site

### No dashboard do Netlify:

1. Procure o botão verde **"Add new site"**
2. Clique nele
3. Selecione **"Import an existing project"**

---

## 🔗 PASSO 4: Conectar GitHub

1. Clique em **"Deploy with GitHub"**
2. Se pedir autorização novamente, autorize
3. Você verá uma lista dos seus repositórios

---

## 📦 PASSO 5: Selecionar Repositório

### Na lista de repositórios:

1. Procure por **"fisio"** (use a busca se necessário)
2. Clique no repositório **"jjedsone/fisio"**

---

## ⚙️ PASSO 6: CONFIGURAR (IMPORTANTE!)

### Você verá uma tela de configuração. Preencha EXATAMENTE assim:

```
┌─────────────────────────────────────────────┐
│ Branch to deploy:                           │
│ [main                                    ▼] │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Base directory:                             │
│ [meu-site                                  ] │ ← IMPORTANTE!
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Build command:                              │
│ [npm run build                             ] │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ Publish directory:                          │
│ [meu-site/dist                             ] │ ← IMPORTANTE!
└─────────────────────────────────────────────┘
```

### ⚠️ ATENÇÃO:
- **Base directory:** `meu-site` (sem barra no final)
- **Publish directory:** `meu-site/dist` (com barra!)

---

## 🚀 PASSO 7: DEPLOY!

1. Role a página até o final
2. Clique no botão grande **"Deploy [nome-do-site]"**
3. Aguarde... ⏳

### O que vai acontecer:
```
Building... ⚙️
↓
Processing... 🔄
↓
Publishing... 📤
↓
✅ Site is live!
```

**Tempo:** 2-3 minutos

---

## 🎉 PASSO 8: SEU SITE ESTÁ NO AR!

### Você verá:

```
┌────────────────────────────────────────────┐
│ ✅ Site is live                            │
│                                            │
│ https://[nome-aleatorio].netlify.app      │
│                                            │
│ [Visit site] [View logs]                  │
└────────────────────────────────────────────┘
```

### Clique em **"Visit site"** para ver seu site online! 🌐

---

## 🎨 PASSO 9: Personalizar Nome (Opcional)

### Para mudar de `nome-aleatorio.netlify.app` para algo melhor:

1. No painel do seu site, vá em **"Site settings"**
2. Clique em **"Change site name"** (ou "Site information" → "Change site name")
3. Digite um nome legal: `drateiciane` ou `fisioterapia-sp`
4. Salve!

### Seu novo link será:
```
https://drateiciane.netlify.app
```

---

## ✅ CHECKLIST PÓS-DEPLOY

Após o site estar no ar, teste:

- [ ] Página inicial carrega?
- [ ] Chatbot abre?
- [ ] Chatbot responde?
- [ ] Formulários funcionam?
- [ ] Página de serviços estéticos abre?
- [ ] Links do WhatsApp funcionam?

---

## 🔄 COMO ATUALIZAR O SITE DEPOIS

### Sempre que fizer mudanças:

```bash
git add .
git commit -m "Descrição da mudança"
git push
```

**O Netlify atualiza AUTOMATICAMENTE!** 🎉

Você verá o deploy acontecendo no painel do Netlify.

---

## ❌ PROBLEMAS COMUNS

### Erro: "Build failed"

**Veja o erro:**
- Clique em "View logs" para ver o erro completo

**Soluções:**
1. Verifique se o **Base directory** está: `meu-site`
2. Verifique se o **Publish directory** está: `meu-site/dist`
3. Clique em "Retry deploy"

### Erro: "Failed to install dependencies"

**Solução:**
1. Vá em "Site settings" → "Build & deploy" → "Environment"
2. Adicione variável:
   - Key: `NODE_VERSION`
   - Value: `18`
3. Faça retry do deploy

### Site carrega mas sem estilos

**Solução:**
1. Vá em "Deploys"
2. Clique em "Trigger deploy" → "Clear cache and deploy site"

---

## 📊 PAINEL DO NETLIFY

### Onde encontrar tudo:

```
┌────────────────────────────────────────────┐
│ NETLIFY DASHBOARD                          │
├────────────────────────────────────────────┤
│ Sites                                      │
│  └─ fisio                                  │
│     ├─ Deploys (histórico)                 │
│     ├─ Site settings (configurações)       │
│     ├─ Domain settings (domínio)           │
│     └─ Analytics (estatísticas)            │
└────────────────────────────────────────────┘
```

---

## 🌟 RECURSOS DO NETLIFY (GRÁTIS)

### Você tem GRÁTIS:

- ✅ **100 GB** de banda por mês
- ✅ **Atualizações automáticas** do GitHub
- ✅ **HTTPS** gratuito
- ✅ **Domínio .netlify.app** grátis
- ✅ **Formulários** funcionam
- ✅ **Analytics** básico

### Isso é MAIS que suficiente! 🎉

---

## 📱 PRÓXIMOS PASSOS

### Após deploy:

1. **Compartilhe o link** com seus clientes
2. **Teste tudo** no celular também
3. **Configure domínio próprio** (se tiver)
4. **Monitore acessos** no painel Netlify

### WhatsApp Bot (Local):

Lembre-se: O bot do WhatsApp roda no seu PC:

```bash
# Terminal 1
npm run dev

# Terminal 2
npm run server
```

Admin: http://localhost:5173 → WhatsApp Bot → Escanear QR

---

## 🎯 RESUMO RÁPIDO

### DEPLOY EM 3 PASSOS:

1. **Netlify.com** → Login com GitHub
2. **Import project** → Selecione "fisio"
3. **Configure:**
   - Base: `meu-site`
   - Publish: `meu-site/dist`
4. **Deploy!**

### ⏱️ 5 minutos = Site online! 🚀

---

## 🆘 PRECISA DE AJUDA?

### Documentação Netlify:
- https://docs.netlify.com

### Suporte:
- Netlify tem chat de suporte gratuito
- Comunidade muito ativa

### Nossos Guias:
- **COMECE_AQUI.md** - Instruções básicas
- **DEPLOY_GUIA.md** - Guia completo
- **COMO_USAR.md** - Como usar o sistema

---

## 🎊 PARABÉNS!

### Quando terminar o deploy:

✅ **Seu site estará online!**  
✅ **Visível para o mundo todo!**  
✅ **Pronto para receber clientes!**  

**Link:** https://seu-nome.netlify.app

---

## 💡 DICA PROFISSIONAL

### Compartilhe seu link:

📱 **WhatsApp Status:**
"Novo site online! Confira: https://seu-link.netlify.app"

📘 **Instagram Bio:**
Adicione o link do site

📧 **E-mail:**
Coloque na assinatura

🎯 **Google Meu Negócio:**
Adicione como website

---

## 🚀 COMECE AGORA!

### Abra agora:
👉 **https://app.netlify.com**

### Siga os passos acima!

**Em 5 minutos seu site estará no ar!** ✨

---

**💙 Boa sorte! Você está a poucos cliques de ter seu site online! 🎉**

**Qualquer dúvida, me chame!** 😊

