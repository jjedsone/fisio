# 🏥 Site Dra. Teiciane Ramalho - Fisioterapia & Estética

Sistema completo de agendamento online com chatbot inteligente e bot do WhatsApp integrado.

![Status](https://img.shields.io/badge/status-ativo-success)
![React](https://img.shields.io/badge/React-19.1-blue)
![WhatsApp](https://img.shields.io/badge/WhatsApp-Bot-green)

## 🚀 Funcionalidades

### 🌐 Site Profissional
- ✅ Design moderno e responsivo
- ✅ Chatbot inteligente com marketing
- ✅ Formulário de agendamento direto
- ✅ Página de serviços estéticos
- ✅ Links WhatsApp personalizados

### 📱 WhatsApp Bot Integrado
- ✅ Respostas automáticas 24/7
- ✅ Agendamento completo via chat
- ✅ Menu interativo
- ✅ Notificações instantâneas
- ✅ **Controle pelo Admin (QR Code no navegador)**

### 📊 Painel Administrativo
- ✅ Gestão de leads e conversas
- ✅ Gestão de consultas
- ✅ Histórico completo de interações
- ✅ **Gerenciamento do WhatsApp Bot**
- ✅ Configurações de horários

## 🛠️ Tecnologias

- **Frontend:** React 19, Vite
- **Backend:** Node.js, Express
- **WhatsApp:** whatsapp-web.js
- **Armazenamento:** LocalStorage + JSON Files

## 📦 Instalação

```bash
# Clonar repositório
git clone https://github.com/jjedsone/fisio.git
cd fisio/meu-site

# Instalar dependências
npm install
```

## 🚀 Como Usar

### Desenvolvimento Local

**Terminal 1 - Site:**
```bash
cd meu-site
npm run dev
```
→ Abre em: http://localhost:5173

**Terminal 2 - WhatsApp Bot:**
```bash
cd meu-site
npm run server
```
→ API em: http://localhost:3001

### Conectar WhatsApp

1. Acesse http://localhost:5173
2. Clique em **"Admin"** (canto superior direito)
3. Senha: `admin123`
4. Vá na aba **"📱 WhatsApp Bot"**
5. Clique em **"▶️ Iniciar Bot"**
6. Escaneie o QR Code que aparecer

## 🎯 Estrutura do Projeto

```
meu-site/
├── server/
│   └── whatsapp-server.js      # Servidor Express do WhatsApp Bot
├── src/
│   ├── components/
│   │   ├── AdminPanel.jsx      # Painel admin com WhatsApp Bot
│   │   ├── Chatbot.jsx         # Chatbot do site
│   │   ├── AgendamentoModal.jsx
│   │   └── ...
│   ├── pages/
│   │   └── ServicosEsteticos.jsx
│   └── App.jsx
├── data/                        # Dados (criado automaticamente)
├── whatsapp-bot.js             # Bot standalone
├── sync-data.js
└── package.json
```

## 📱 Contato

**Dra. Teiciane Ramalho**  
WhatsApp: (11) 94854-1086  
Localização: Vila Mariana - São Paulo/SP

## 📖 Documentação

- 📘 [Como Usar](./COMO_USAR.md) - Guia completo
- 🧪 [Teste Final](./TESTE_FINAL.md) - Checklist
- 🔧 [Integração](./INTEGRACAO_COMPLETA.md) - Detalhes técnicos
- 📱 [Bot WhatsApp](./BOT_WHATSAPP_README.md) - Documentação do bot

## 🌟 Destaques

### ⭐ Diferenciais:
- Bot WhatsApp controlado pelo navegador
- QR Code visível no admin (sem terminal)
- Notificações automáticas para cada agendamento
- Logs em tempo real
- Sistema completo e integrado

## 🚀 Deploy

### Para Netlify/Vercel:

```bash
# Build do projeto
npm run build

# Deploy
# Arraste a pasta 'dist' para Netlify/Vercel
```

### Configurações:
- **Build command:** `npm run build`
- **Publish directory:** `dist`
- **Node version:** 18.x

## ⚙️ Variáveis de Ambiente

Para produção, configure:
- `ADMIN_PASSWORD` - Senha do painel admin
- `WHATSAPP_NUMBER` - Número da Dra. Teiciane

## 📝 Licença

Uso exclusivo da Clínica Dra. Teiciane Ramalho.

## 🤝 Contribuindo

Este é um projeto privado. Para sugestões, entre em contato.

---

**💙 Desenvolvido com amor para automatizar e profissionalizar o atendimento! ✨**

**Status:** 🟢 Online | **Última atualização:** Outubro 2025
