# 🔥 Fisio Dra. Teiciane Ramalho - Firebase Edition

> **Sistema completo de agendamento online com Firebase, Chatbot inteligente e Bot do WhatsApp**

![Status](https://img.shields.io/badge/status-migrado%20para%20firebase-success)
![React](https://img.shields.io/badge/React-19.1-blue)
![Firebase](https://img.shields.io/badge/Firebase-Ready-orange)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-green)

---

## 🎉 Novidade: Migrado para Firebase!

Este projeto foi **completamente migrado para Firebase**, trazendo:

✅ **Banco de dados em nuvem** (Firestore)  
✅ **Hospedagem profissional** (Firebase Hosting)  
✅ **Backend serverless** (Firebase Functions)  
✅ **Armazenamento de arquivos** (Firebase Storage)  
✅ **Sincronização em tempo real**  
✅ **Backup automático**  
✅ **HTTPS grátis**  

---

## 🚀 Início Rápido

### ⚡ Deploy em 5 Minutos

\`\`\`bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Configurar credenciais
cp env.example .env
# Edite .env com suas credenciais do Firebase Console

# 4. Build e Deploy
npm run build
firebase deploy
\`\`\`

**📖 Guia completo:** [INICIO_RAPIDO_FIREBASE.md](./INICIO_RAPIDO_FIREBASE.md)

---

## 📚 Documentação

| Guia | Descrição | Tempo |
|------|-----------|-------|
| **[⚡ INICIO_RAPIDO_FIREBASE.md](./INICIO_RAPIDO_FIREBASE.md)** | Início rápido - 5 passos | 5 min |
| **[🚀 DEPLOY_FIREBASE.md](./DEPLOY_FIREBASE.md)** | Deploy simplificado | 5 min |
| **[📖 FIREBASE_SETUP.md](./FIREBASE_SETUP.md)** | Guia completo passo a passo | 30 min |
| **[🔄 MIGRACAO_COMPONENTES.md](./MIGRACAO_COMPONENTES.md)** | Como migrar código | 15 min |
| **[📋 README_FIREBASE.md](./README_FIREBASE.md)** | Visão geral completa | 10 min |
| **[📊 RESUMO_MIGRACAO.md](./RESUMO_MIGRACAO.md)** | O que foi feito | 5 min |

---

## 🌟 Funcionalidades

### 🌐 Site Profissional
- ✅ Design moderno e responsivo
- ✅ Chatbot inteligente com marketing
- ✅ Formulário de agendamento direto
- ✅ Página de serviços estéticos
- ✅ Links WhatsApp personalizados

### 🔥 Firebase Integration
- ✅ Firestore Database (dados em nuvem)
- ✅ Firebase Hosting (CDN global)
- ✅ Firebase Functions (backend serverless)
- ✅ Firebase Storage (upload de imagens)
- ✅ Tempo real (sincronização automática)

### 📱 WhatsApp Bot Integrado
- ✅ Respostas automáticas 24/7
- ✅ Agendamento completo via chat
- ✅ Menu interativo
- ✅ Notificações instantâneas

### 📊 Painel Administrativo
- ✅ Gestão de leads e conversas
- ✅ Gestão de consultas
- ✅ Histórico completo de interações
- ✅ Gerenciamento do WhatsApp Bot
- ✅ Configurações de horários

---

## 🛠️ Tecnologias

### Frontend
- **React 19** - Framework UI
- **Vite** - Build tool
- **CSS3** - Estilização

### Backend & Infraestrutura
- **Firebase Firestore** - Banco de dados NoSQL
- **Firebase Functions** - Serverless backend
- **Firebase Hosting** - CDN hosting
- **Firebase Storage** - Armazenamento de arquivos
- **Node.js** - Runtime
- **Express** - API REST

### Integrações
- **whatsapp-web.js** - Bot do WhatsApp
- **qrcode-terminal** - Autenticação WhatsApp

---

## 📦 Estrutura do Projeto

\`\`\`
fisio-main/
├── 📁 src/                          # Código-fonte React
│   ├── 📁 config/
│   │   └── 🔥 firebase.js          # Configuração Firebase
│   ├── 📁 services/
│   │   └── 🔥 firebaseService.js   # Serviços CRUD
│   ├── 📁 hooks/
│   │   └── 🔥 useFirebase.js       # Hooks customizados
│   ├── 📁 components/              # Componentes React
│   └── 📁 pages/                   # Páginas
│
├── 📁 functions/                    # Firebase Functions (Backend)
│   ├── index.js                    # API REST
│   └── package.json
│
├── 📁 scripts/                      # Scripts utilitários
│   ├── migrate-to-firebase.js      # Exportar dados
│   └── import-to-firestore.js      # Importar dados
│
├── 📁 public/                       # Assets públicos
│   └── 📁 images/                  # Imagens
│
├── 🔥 firebase.json                 # Config Firebase
├── 🔥 firestore.rules              # Regras Firestore
├── 🔥 firestore.indexes.json       # Índices
├── 🔥 storage.rules                # Regras Storage
├── 🔥 .firebaserc                  # Projeto ativo
├── 📦 package.json                 # Dependências
└── 📚 Documentação/                # Guias em Markdown
\`\`\`

---

## 💻 Desenvolvimento Local

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta no Firebase
- Firebase CLI

### Instalação

\`\`\`bash
# 1. Instalar dependências
npm install

# 2. Configurar Firebase
cp env.example .env
# Edite .env com suas credenciais

# 3. Iniciar desenvolvimento
npm run dev
\`\`\`

### Comandos Disponíveis

\`\`\`bash
# Desenvolvimento
npm run dev                      # Servidor local (http://localhost:5173)
npm run build                    # Build para produção
npm run preview                  # Preview do build

# Firebase
npm run firebase:deploy          # Deploy completo
npm run firebase:deploy:hosting  # Deploy apenas site
npm run firebase:deploy:functions # Deploy apenas backend
npm run firebase:emulators       # Testar localmente
npm run firebase:logs            # Ver logs

# Outros
npm run bot                      # WhatsApp Bot standalone
npm run server                   # API server local
\`\`\`

---

## 🗂️ Banco de Dados (Firestore)

### Coleções Principais

- **agendamentos** - Agendamentos de consultas
- **leads** - Leads capturados
- **conversas** - Histórico do chatbot
- **configuracoes** - Configurações do sistema
- **mensagensWhatsApp** - Mensagens do bot
- **notificacoes** - Notificações admin

**Veja estrutura completa:** [RESUMO_MIGRACAO.md](./RESUMO_MIGRACAO.md)

---

## 🔐 Segurança

### Regras do Firestore

- ✅ Agendamentos: Criar (público), CRUD (admin)
- ✅ Leads: Criar (público), Read/Update (admin)
- ✅ Conversas: Criar (público), Read (admin)
- ✅ Configurações: Ler (público), Escrever (admin)

### Regras do Storage

- ✅ Imagens públicas: leitura livre
- ✅ Upload: apenas admins autenticados

**Arquivos:** `firestore.rules` e `storage.rules`

---

## 📱 WhatsApp Bot

### Recursos

- Respostas automáticas
- Agendamento via chat
- Menu interativo
- Confirmações automáticas
- Logs em tempo real

### Uso

\`\`\`bash
# Método 1: Via admin panel
# Acesse o painel admin e clique em "WhatsApp Bot"

# Método 2: Script standalone
npm run bot
\`\`\`

---

## 🎯 Como Usar no Código

### Hooks (Recomendado)

\`\`\`javascript
import { useAgendamentos } from '../hooks/useFirebase';

function MeuComponente() {
  const { agendamentos, loading, criar, atualizar, deletar } = useAgendamentos();

  // Criar
  await criar({ nome: 'João', telefone: '123' });

  // Listar (automático!)
  return (
    <div>
      {agendamentos.map(item => (
        <div key={item.id}>{item.nome}</div>
      ))}
    </div>
  );
}
\`\`\`

### Serviços Diretos

\`\`\`javascript
import { agendamentosService } from '../services/firebaseService';

const criar = async () => {
  await agendamentosService.criar({ nome: 'João' });
};
\`\`\`

**Veja mais exemplos:** [ExemploFirebase.jsx](./src/components/ExemploFirebase.jsx)

---

## 🚀 Deploy

### Firebase Hosting

\`\`\`bash
# Deploy completo
npm run firebase:deploy

# Deploy apenas site
npm run firebase:deploy:hosting
\`\`\`

**URL:** `https://SEU_PROJETO.web.app`

### Netlify/Vercel (Alternativo)

\`\`\`bash
npm run build
# Arraste a pasta 'dist' para Netlify/Vercel
\`\`\`

---

## 💰 Custos

### Firebase (Plano Gratuito)

- ✅ Firestore: 50k leituras/dia
- ✅ Hosting: 10 GB/mês
- ✅ Storage: 5 GB
- ✅ Functions: Plano Blaze (pay-as-you-go)

**Estimativa mensal:** R$ 0 - R$ 20 (tráfego normal)

---

## 🆘 Troubleshooting

| Problema | Solução |
|----------|---------|
| "Permission denied" | `firebase deploy --only firestore:rules` |
| "Functions 404" | Upgrade para Blaze + deploy functions |
| Site não atualiza | `npm run build` + deploy + Ctrl+F5 |
| Dados não aparecem | Verifique Firebase Console |

**Veja mais:** [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

---

## 📞 Contato

**Dra. Teiciane Ramalho**  
📱 WhatsApp: (11) 94854-1086  
✉️ Email: drateiciane.fisio@email.com  
📍 São Paulo - SP  

---

## 📝 Licença

Uso exclusivo da Clínica Dra. Teiciane Ramalho.

---

## 🤝 Contribuindo

Este é um projeto privado. Para sugestões, entre em contato.

---

## 🎉 Recursos Adicionais

- [Firebase Console](https://console.firebase.google.com)
- [Documentação Firebase](https://firebase.google.com/docs)
- [Exemplo de Código](./src/components/ExemploFirebase.jsx)
- [Guia de Migração](./MIGRACAO_COMPONENTES.md)

---

## ✅ Checklist de Setup

- [ ] Projeto criado no Firebase Console
- [ ] Firestore ativado
- [ ] Storage ativado
- [ ] Credenciais configuradas (.env)
- [ ] Firebase CLI instalado
- [ ] Build executado
- [ ] Deploy realizado
- [ ] Site funcionando
- [ ] Dados migrados (opcional)

---

**💙 Desenvolvido com amor para automatizar e profissionalizar o atendimento!**

**🔥 Powered by Firebase** | **⚛️ Built with React** | **💬 WhatsApp Ready**

**Status:** 🟢 Online | **Última atualização:** Outubro 2025

---

## 🗺️ Roadmap

### ✅ Concluído
- [x] Migração para Firebase
- [x] Firestore Database
- [x] Firebase Hosting
- [x] Firebase Functions
- [x] Firebase Storage
- [x] Hooks customizados
- [x] Documentação completa

### 🚧 Em Progresso
- [ ] Migração de componentes
- [ ] Autenticação admin
- [ ] Analytics

### 📅 Futuro
- [ ] Push notifications
- [ ] Domínio customizado
- [ ] PWA (Progressive Web App)
- [ ] Modo offline
- [ ] Internacionalização

---

**Desenvolvido para Dra. Teiciane Ramalho** 💜
