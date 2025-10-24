# 🔥 Guia Completo de Migração para Firebase

Este guia irá ajudá-lo a migrar o projeto da Dra. Teiciane Ramalho para o Firebase.

## 📋 Pré-requisitos

1. Conta no Google
2. Node.js 18+ instalado
3. npm ou yarn
4. Firebase CLI

## 🚀 Passo 1: Configurar Projeto no Firebase

### 1.1 Criar Projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `fisio-dra-teiciane` (ou o nome que preferir)
4. Desative o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 1.2 Ativar Serviços Necessários

#### **Firestore Database**
1. No menu lateral, clique em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Selecione "Iniciar no modo de produção"
4. Escolha a localização: `southamerica-east1` (São Paulo)
5. Clique em "Ativar"

#### **Authentication** (Opcional - para login de admin)
1. No menu lateral, clique em "Authentication"
2. Clique em "Começar"
3. Ative o provedor "E-mail/senha"

#### **Storage**
1. No menu lateral, clique em "Storage"
2. Clique em "Começar"
3. Aceite as regras padrão
4. Escolha a localização: `southamerica-east1`

#### **Functions**
1. No menu lateral, clique em "Functions"
2. Clique em "Começar"
3. Faça upgrade para o plano Blaze (pay-as-you-go)
   - **Nota:** O Firebase oferece um generoso nível gratuito
   - Só paga se ultrapassar os limites

### 1.3 Configurar Aplicativo Web

1. Na página inicial do projeto, clique em "Web" (ícone `</>`)
2. Nome do app: `Fisio Dra Teiciane`
3. ✅ Marque "Configurar também o Firebase Hosting"
4. Clique em "Registrar app"
5. **COPIE as credenciais** que aparecem (você vai precisar!)

Exemplo:
\`\`\`javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "fisio-dra-teiciane.firebaseapp.com",
  projectId: "fisio-dra-teiciane",
  storageBucket: "fisio-dra-teiciane.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
\`\`\`

## 🛠️ Passo 2: Instalar Firebase CLI

### 2.1 Instalar globalmente

\`\`\`bash
npm install -g firebase-tools
\`\`\`

### 2.2 Fazer login

\`\`\`bash
firebase login
\`\`\`

## ⚙️ Passo 3: Configurar Projeto Local

### 3.1 Inicializar Firebase no projeto

\`\`\`bash
cd fisio-main
firebase init
\`\`\`

**Selecione os serviços:**
- ✅ Firestore
- ✅ Functions
- ✅ Hosting
- ✅ Storage

**Configurações:**

**Firestore:**
- Rules file: `firestore.rules` (já criado)
- Indexes file: `firestore.indexes.json` (já criado)

**Functions:**
- Language: JavaScript
- ESLint: No
- Install dependencies: Yes

**Hosting:**
- Public directory: `dist`
- Single-page app: Yes
- GitHub deploys: No

**Storage:**
- Rules file: `storage.rules` (já criado)

### 3.2 Configurar Credenciais

1. Copie o arquivo `.env.example` para `.env`:

\`\`\`bash
cp .env.example .env
\`\`\`

2. Edite o arquivo `.env` e cole suas credenciais do Firebase:

\`\`\`env
VITE_FIREBASE_API_KEY=sua_api_key_aqui
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto_id
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_messaging_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
\`\`\`

3. Atualize o arquivo `src/config/firebase.js` com suas credenciais

### 3.3 Atualizar .firebaserc

Edite o arquivo `.firebaserc` e substitua `SEU_PROJETO_ID` pelo ID do seu projeto:

\`\`\`json
{
  "projects": {
    "default": "fisio-dra-teiciane"
  }
}
\`\`\`

## 📦 Passo 4: Instalar Dependências

### 4.1 Dependências do projeto principal

\`\`\`bash
npm install
\`\`\`

### 4.2 Dependências das Functions

\`\`\`bash
cd functions
npm install
cd ..
\`\`\`

## 🔧 Passo 5: Deploy das Regras e Configurações

### 5.1 Deploy das Regras do Firestore

\`\`\`bash
firebase deploy --only firestore:rules
firebase deploy --only firestore:indexes
\`\`\`

### 5.2 Deploy das Regras do Storage

\`\`\`bash
firebase deploy --only storage:rules
\`\`\`

## 🚀 Passo 6: Deploy das Functions

\`\`\`bash
firebase deploy --only functions
\`\`\`

**Importante:** Anote a URL da função API que será gerada:
\`https://REGION-PROJECT_ID.cloudfunctions.net/api\`

## 🌐 Passo 7: Build e Deploy do Site

### 7.1 Build do projeto

\`\`\`bash
npm run build
\`\`\`

### 7.2 Deploy no Firebase Hosting

\`\`\`bash
firebase deploy --only hosting
\`\`\`

Seu site estará disponível em:
\`https://SEU_PROJETO_ID.web.app\`

## 📊 Passo 8: Migrar Dados Existentes

Se você já tem dados no LocalStorage, você pode migrá-los para o Firestore.

### 8.1 Exportar dados do LocalStorage

Abra o console do navegador no site atual e execute:

\`\`\`javascript
// Exportar agendamentos
const agendamentos = localStorage.getItem('appointments');
console.log('Agendamentos:', agendamentos);

// Exportar leads
const leads = localStorage.getItem('leads');
console.log('Leads:', leads);

// Exportar conversas
const conversas = localStorage.getItem('chatbotConversations');
console.log('Conversas:', conversas);
\`\`\`

### 8.2 Importar para o Firestore

Você pode criar um script de migração ou importar manualmente pelo Firebase Console:

1. Acesse o Firestore Database no Console
2. Crie as coleções: `agendamentos`, `leads`, `conversas`
3. Adicione os documentos manualmente ou use o script abaixo

**Script de migração (opcional):**

\`\`\`javascript
// Crie um arquivo: scripts/migrate-data.js
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Seus dados do localStorage (cole aqui)
const agendamentos = [...];
const leads = [...];
const conversas = [...];

async function migrate() {
  // Migrar agendamentos
  for (const item of agendamentos) {
    await db.collection('agendamentos').add(item);
  }
  
  // Migrar leads
  for (const item of leads) {
    await db.collection('leads').add(item);
  }
  
  // Migrar conversas
  for (const item of conversas) {
    await db.collection('conversas').add(item);
  }
  
  console.log('Migração concluída!');
}

migrate();
\`\`\`

## 🔐 Passo 9: Configurar Autenticação Admin

### 9.1 Criar usuário admin

No Firebase Console > Authentication > Users:

1. Clique em "Adicionar usuário"
2. Email: `admin@drateiciane.com`
3. Senha: (escolha uma senha forte)
4. Clique em "Adicionar usuário"

### 9.2 Definir custom claims (admin)

No terminal, execute:

\`\`\`bash
firebase functions:shell
\`\`\`

E então:

\`\`\`javascript
const admin = require('firebase-admin');
admin.auth().setCustomUserClaims('UID_DO_USUARIO', { admin: true });
\`\`\`

Ou crie uma Cloud Function para isso.

## 📱 Passo 10: Configurar WhatsApp Bot (Opcional)

Para o WhatsApp Bot funcionar em produção, você precisa de um servidor sempre ativo.

**Opções:**

1. **Heroku** (grátis com limitações)
2. **Railway** (grátis com limitações)
3. **Google Cloud Run** (pago, mas escalável)
4. **VPS** (DigitalOcean, AWS EC2, etc.)

**Passos básicos:**

1. Deploy do código do WhatsApp Bot no servidor
2. Manter o processo rodando (PM2 ou Docker)
3. Escanear QR Code uma vez para autenticar
4. Bot fica ativo 24/7

## ✅ Checklist Final

- [ ] Projeto criado no Firebase Console
- [ ] Firestore ativado
- [ ] Storage ativado
- [ ] Functions ativadas (plano Blaze)
- [ ] Credenciais configuradas no `.env`
- [ ] Firebase CLI instalado
- [ ] Login no Firebase CLI
- [ ] Projeto inicializado localmente
- [ ] Regras do Firestore deployadas
- [ ] Regras do Storage deployadas
- [ ] Functions deployadas
- [ ] Build do projeto gerado
- [ ] Site deployado no Hosting
- [ ] Dados migrados (se aplicável)
- [ ] Autenticação admin configurada
- [ ] WhatsApp Bot configurado (opcional)

## 🎯 Comandos Úteis

### Desenvolvimento Local

\`\`\`bash
# Executar site localmente
npm run dev

# Executar emuladores do Firebase
firebase emulators:start

# Executar functions localmente
cd functions
npm run serve
\`\`\`

### Deploy

\`\`\`bash
# Deploy completo
firebase deploy

# Deploy apenas hosting
firebase deploy --only hosting

# Deploy apenas functions
firebase deploy --only functions

# Deploy apenas firestore
firebase deploy --only firestore

# Deploy apenas storage
firebase deploy --only storage
\`\`\`

### Logs e Monitoramento

\`\`\`bash
# Ver logs das functions
firebase functions:log

# Ver logs em tempo real
firebase functions:log --only api
\`\`\`

## 📚 Recursos Adicionais

- [Documentação Firebase](https://firebase.google.com/docs)
- [Firestore Quickstart](https://firebase.google.com/docs/firestore/quickstart)
- [Functions Quickstart](https://firebase.google.com/docs/functions/get-started)
- [Hosting Quickstart](https://firebase.google.com/docs/hosting/quickstart)

## 💰 Custos Estimados

Com o uso típico do site:

- **Firestore:** Gratuito (abaixo de 50k leituras/dia)
- **Functions:** Gratuito (abaixo de 2M invocações/mês)
- **Hosting:** Gratuito (abaixo de 10 GB transferidos/mês)
- **Storage:** Gratuito (abaixo de 5 GB armazenados)

**Total estimado:** R$ 0,00 - R$ 20,00/mês (depende do tráfego)

## 🆘 Problemas Comuns

### "Permission denied" no Firestore

**Solução:** Verifique as regras do Firestore. Para testes, você pode usar:

\`\`\`
allow read, write: if true;
\`\`\`

**⚠️ CUIDADO:** Isso permite acesso público. Use apenas para testes!

### Functions não estão respondendo

**Solução:**
1. Verifique se o deploy foi bem-sucedido
2. Verifique os logs: `firebase functions:log`
3. Certifique-se de que está no plano Blaze

### Site não atualiza após deploy

**Solução:**
1. Limpe o cache do navegador (Ctrl + F5)
2. Verifique se o build foi executado: `npm run build`
3. Verifique a pasta `dist` foi criada

## 🎉 Pronto!

Seu projeto agora está rodando no Firebase! 🚀

Para suporte adicional:
- 📧 Email: suporte@exemplo.com
- 💬 WhatsApp: (11) 94854-1086

---

**Desenvolvido com ❤️ para automatizar e profissionalizar o atendimento da Dra. Teiciane Ramalho**

