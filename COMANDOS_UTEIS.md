# 🛠️ Comandos Úteis - Firebase

Referência rápida de comandos para trabalhar com o projeto.

---

## 🔥 Firebase CLI

### Instalação e Login

\`\`\`bash
# Instalar Firebase CLI globalmente
npm install -g firebase-tools

# Fazer login
firebase login

# Verificar usuário logado
firebase login:list

# Logout
firebase logout

# Verificar versão
firebase --version

# Atualizar Firebase CLI
npm install -g firebase-tools@latest
\`\`\`

### Inicialização

\`\`\`bash
# Inicializar Firebase no projeto
firebase init

# Listar projetos
firebase projects:list

# Usar projeto específico
firebase use nome-do-projeto

# Criar alias para projeto
firebase use --add

# Ver projeto atual
firebase projects:list
\`\`\`

---

## 🚀 Deploy

### Deploy Completo

\`\`\`bash
# Deploy de tudo (hosting + functions + firestore + storage)
firebase deploy

# Deploy com mensagem
firebase deploy -m "Mensagem do deploy"

# Deploy específico de um projeto
firebase deploy --project production
\`\`\`

### Deploy Seletivo

\`\`\`bash
# Deploy apenas hosting
firebase deploy --only hosting

# Deploy apenas functions
firebase deploy --only functions

# Deploy função específica
firebase deploy --only functions:api

# Deploy apenas regras do Firestore
firebase deploy --only firestore:rules

# Deploy apenas índices do Firestore
firebase deploy --only firestore:indexes

# Deploy apenas regras do Storage
firebase deploy --only storage:rules

# Deploy múltiplos serviços
firebase deploy --only hosting,functions
\`\`\`

### Preview e Rollback

\`\`\`bash
# Preview do site localmente
firebase serve

# Preview apenas hosting
firebase serve --only hosting

# Listar releases do hosting
firebase hosting:channel:list

# Ver versões anteriores
firebase hosting:releases:list

# Rollback para versão anterior (último deploy)
firebase hosting:clone SOURCE_SITE_ID:SOURCE_CHANNEL TARGET_SITE_ID:live
\`\`\`

---

## 📊 Logs e Monitoramento

### Logs das Functions

\`\`\`bash
# Ver logs em tempo real
firebase functions:log

# Ver logs de função específica
firebase functions:log --only api

# Filtrar por tipo
firebase functions:log --only api --type error

# Limitar quantidade
firebase functions:log --lines 100

# Ver logs de data específica
firebase functions:log --since 2h  # últimas 2 horas
firebase functions:log --since 1d  # último dia
\`\`\`

### Debug

\`\`\`bash
# Ver logs do Firestore
firebase firestore:export gs://bucket-name/path

# Ver quotas e uso
firebase quota:list
\`\`\`

---

## 🧪 Emuladores

### Iniciar Emuladores

\`\`\`bash
# Iniciar todos os emuladores
firebase emulators:start

# Iniciar emulador específico
firebase emulators:start --only firestore
firebase emulators:start --only functions
firebase emulators:start --only hosting

# Iniciar múltiplos emuladores
firebase emulators:start --only firestore,functions

# Importar dados para emulador
firebase emulators:start --import=./data-export

# Exportar dados do emulador
firebase emulators:export ./data-export
\`\`\`

### UI do Emulador

\`\`\`bash
# Emuladores com UI (interface gráfica)
firebase emulators:start --inspect-functions

# Acessar UI
# http://localhost:4000 (padrão)
\`\`\`

---

## 🗄️ Firestore

### Backup e Restore

\`\`\`bash
# Exportar dados do Firestore
firebase firestore:export gs://bucket-name/path

# Importar dados para o Firestore
firebase firestore:import gs://bucket-name/path

# Deletar coleção
firebase firestore:delete [path] --recursive

# Deletar todos os documentos
firebase firestore:delete --all-collections --yes
\`\`\`

### Índices

\`\`\`bash
# Listar índices
firebase firestore:indexes

# Deploy índices
firebase deploy --only firestore:indexes
\`\`\`

---

## 📦 Functions

### Desenvolvimento

\`\`\`bash
# Instalar dependências
cd functions
npm install

# Adicionar dependência
npm install nome-pacote

# Remover dependência
npm uninstall nome-pacote

# Shell interativo
firebase functions:shell

# Ver configuração
firebase functions:config:get

# Setar variável de ambiente
firebase functions:config:set someservice.key="THE API KEY"

# Deletar variável
firebase functions:config:unset someservice.key
\`\`\`

### Deploy e Logs

\`\`\`bash
# Deploy todas as functions
firebase deploy --only functions

# Deploy função específica
firebase deploy --only functions:api

# Deletar função
firebase functions:delete api

# Ver logs
firebase functions:log --only api
\`\`\`

---

## 🌐 Hosting

### Deploy

\`\`\`bash
# Deploy site
firebase deploy --only hosting

# Deploy com preview
firebase hosting:channel:deploy preview

# Criar canal de preview
firebase hosting:channel:create feature-x

# Deletar canal
firebase hosting:channel:delete feature-x

# Listar canais
firebase hosting:channel:list
\`\`\`

### Configuração

\`\`\`bash
# Listar sites
firebase hosting:sites:list

# Criar novo site
firebase hosting:sites:create site-name

# Ver domínios
firebase hosting:sites:get site-name

# Adicionar domínio customizado
# (Use o Firebase Console)
\`\`\`

---

## 📱 NPM Scripts (Customizados)

### Desenvolvimento

\`\`\`bash
# Servidor local de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
\`\`\`

### Firebase

\`\`\`bash
# Emuladores
npm run firebase:emulators

# Deploy completo (build + deploy)
npm run firebase:deploy

# Deploy apenas hosting (build + deploy)
npm run firebase:deploy:hosting

# Deploy apenas functions
npm run firebase:deploy:functions

# Deploy apenas firestore
npm run firebase:deploy:firestore

# Ver logs
npm run firebase:logs

# Preview local (build + serve)
npm run firebase:serve
\`\`\`

### WhatsApp Bot

\`\`\`bash
# Bot standalone
npm run bot

# Servidor API local
npm run server

# Sync data
npm run sync
\`\`\`

---

## 🔧 Git

### Comandos Básicos

\`\`\`bash
# Status
git status

# Adicionar arquivos
git add .
git add arquivo.js

# Commit
git commit -m "Mensagem"

# Push
git push

# Pull
git pull

# Ver histórico
git log
git log --oneline

# Criar branch
git checkout -b feature/nova-feature

# Trocar branch
git checkout main

# Merge
git merge feature/nova-feature

# Deletar branch
git branch -d feature/nova-feature
\`\`\`

### Atalhos do Projeto

\`\`\`bash
# Commit e push rápido
npm run update
# Equivalente a: git add . && git commit -m 'Atualização' && git push
\`\`\`

---

## 🧹 Limpeza e Manutenção

### Node Modules

\`\`\`bash
# Limpar node_modules
rm -rf node_modules
rm -rf functions/node_modules

# Reinstalar dependências
npm install
cd functions && npm install

# Limpar cache do npm
npm cache clean --force

# Atualizar dependências
npm update

# Verificar pacotes desatualizados
npm outdated
\`\`\`

### Build e Cache

\`\`\`bash
# Limpar build
rm -rf dist
rm -rf build

# Limpar cache do Vite
rm -rf node_modules/.vite

# Rebuild completo
rm -rf node_modules dist
npm install
npm run build
\`\`\`

---

## 🔍 Debugging

### Verificar Erros

\`\`\`bash
# Verificar sintaxe do firebase.json
firebase deploy --only hosting --dry-run

# Verificar regras do Firestore
firebase firestore:rules:check

# Verificar configuração
firebase projects:list
firebase use
\`\`\`

### Logs Detalhados

\`\`\`bash
# Firebase com logs verbosos
firebase deploy --debug

# NPM com logs
npm run build --verbose
\`\`\`

---

## 📊 Estatísticas e Uso

### Quotas

\`\`\`bash
# Ver uso e quotas
firebase quota:list

# Ver uso do Firestore (via console)
# https://console.firebase.google.com/project/SEU_PROJETO/firestore/usage

# Ver uso do Hosting (via console)
# https://console.firebase.google.com/project/SEU_PROJETO/hosting/main
\`\`\`

---

## 🆘 Troubleshooting

### Problemas Comuns

\`\`\`bash
# Erro de autenticação
firebase logout
firebase login

# Erro de permissão
firebase deploy --only firestore:rules
firebase deploy --only storage:rules

# Erro de build
rm -rf node_modules dist
npm install
npm run build

# Erro de Functions
cd functions
rm -rf node_modules
npm install
cd ..
firebase deploy --only functions

# Limpar tudo e recomeçar
rm -rf node_modules functions/node_modules dist
npm install
cd functions && npm install && cd ..
npm run build
firebase deploy
\`\`\`

### Verificar Logs de Erro

\`\`\`bash
# Ver últimos erros
firebase functions:log --type error --lines 50

# Ver logs específicos
firebase functions:log --only api --since 1h
\`\`\`

---

## 🔐 Segurança

### Regras

\`\`\`bash
# Testar regras do Firestore
firebase firestore:rules:test

# Deploy regras
firebase deploy --only firestore:rules
firebase deploy --only storage:rules

# Ver regras atuais (console)
# https://console.firebase.google.com/project/SEU_PROJETO/firestore/rules
\`\`\`

---

## 📚 Referências Rápidas

### URLs Úteis

\`\`\`
Firebase Console:
https://console.firebase.google.com/

Seu Projeto:
https://console.firebase.google.com/project/SEU_PROJETO_ID

Firestore:
https://console.firebase.google.com/project/SEU_PROJETO_ID/firestore

Functions:
https://console.firebase.google.com/project/SEU_PROJETO_ID/functions

Hosting:
https://console.firebase.google.com/project/SEU_PROJETO_ID/hosting

Storage:
https://console.firebase.google.com/project/SEU_PROJETO_ID/storage

Site Publicado:
https://SEU_PROJETO_ID.web.app
https://SEU_PROJETO_ID.firebaseapp.com
\`\`\`

---

## 💡 Dicas

### Performance

\`\`\`bash
# Analisar build
npm run build -- --stats

# Verificar tamanho dos pacotes
npm run build
du -sh dist/*

# Otimizar imagens antes do deploy
# (use ferramentas como ImageOptim, TinyPNG)
\`\`\`

### Workflow Recomendado

\`\`\`bash
# 1. Desenvolver localmente
npm run dev

# 2. Testar com emuladores
npm run firebase:emulators

# 3. Build
npm run build

# 4. Preview local
npm run preview

# 5. Deploy
npm run firebase:deploy

# 6. Verificar logs
npm run firebase:logs
\`\`\`

---

## ✅ Checklist de Deploy

\`\`\`bash
# 1. Verificar mudanças
git status

# 2. Build local
npm run build

# 3. Testar preview
npm run preview

# 4. Commit
git add .
git commit -m "Descrição das mudanças"

# 5. Push para Git
git push

# 6. Deploy Firebase
npm run firebase:deploy

# 7. Verificar site
# Abrir: https://SEU_PROJETO_ID.web.app

# 8. Verificar logs
npm run firebase:logs
\`\`\`

---

**🛠️ Comandos sempre à mão!**

**Precisa de ajuda?** Veja a [documentação completa](./FIREBASE_SETUP.md)

