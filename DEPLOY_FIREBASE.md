# 🚀 Deploy Rápido no Firebase

## ⚡ Método Simplificado (5 minutos)

### 1️⃣ Instalar Firebase CLI

\`\`\`bash
npm install -g firebase-tools
\`\`\`

### 2️⃣ Fazer Login

\`\`\`bash
firebase login
\`\`\`

### 3️⃣ Configurar Credenciais

1. Copie `env.example` para `.env`
2. Cole suas credenciais do Firebase Console
3. Atualize `src/config/firebase.js` com as mesmas credenciais

### 4️⃣ Deploy em 3 Comandos

\`\`\`bash
# 1. Build do projeto
npm run build

# 2. Deploy do Firestore (regras + índices)
firebase deploy --only firestore

# 3. Deploy do site
firebase deploy --only hosting
\`\`\`

### 5️⃣ Deploy das Functions (Opcional)

\`\`\`bash
# Instalar dependências
cd functions
npm install
cd ..

# Deploy
firebase deploy --only functions
\`\`\`

## ✅ Pronto!

Seu site estará disponível em:
\`https://SEU_PROJETO.web.app\`

---

## 🔧 Comandos Úteis

\`\`\`bash
# Ver logs
firebase functions:log

# Deploy completo
firebase deploy

# Preview local
npm run dev
\`\`\`

## 📝 Checklist Rápido

- [ ] Firebase CLI instalado
- [ ] Login realizado
- [ ] Projeto criado no Firebase Console
- [ ] Firestore ativado
- [ ] Credenciais configuradas
- [ ] Build gerado
- [ ] Deploy realizado
- [ ] Site funcionando

---

Para o guia completo, veja: [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

