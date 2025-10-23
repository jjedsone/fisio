# 🚀 COMO USAR - Sistema Completo

## ✅ Sistema Integrado com WhatsApp Bot no Admin

### 📋 O que você tem agora:

1. ✅ **Site profissional** com chatbot interativo
2. ✅ **Painel administrativo** completo
3. ✅ **Bot do WhatsApp integrado** diretamente no painel admin
4. ✅ **QR Code visível** no navegador (não precisa terminal!)
5. ✅ **Logs em tempo real** no admin
6. ✅ **Notificações automáticas** para cada agendamento

---

## 🎯 Como Iniciar TUDO (2 comandos)

### Terminal 1: Site

```bash
npm run dev
```

✅ Site roda em: **http://localhost:5173**

### Terminal 2: Servidor WhatsApp

```bash
npm run server
```

✅ API roda em: **http://localhost:3001**

---

## 📱 Como Conectar o WhatsApp

### 1️⃣ Abra o painel admin

1. Acesse: http://localhost:5173
2. Clique em **"Admin"** (canto superior direito)
3. Digite a senha: **`admin123`**

### 2️⃣ Vá na aba "WhatsApp Bot"

1. Clique na aba **"📱 WhatsApp Bot"**
2. Clique no botão verde **"▶️ Iniciar Bot"**
3. Aguarde aparecer o **QR Code** (10-30 segundos)

### 3️⃣ Escaneie o QR Code

1. Abra o WhatsApp no celular
2. Toque em **Menu (⋮)** → **Aparelhos conectados**
3. Toque em **"Conectar um aparelho"**
4. Aponte a câmera para o **QR Code** que apareceu no admin

### 4️⃣ Pronto! ✅

Quando conectar, você verá:
- ✅ **"Bot Conectado e Ativo!"** em verde
- ● **Indicador verde** na aba do WhatsApp
- 📋 **Logs em tempo real** aparecendo

---

## 🎉 Testar o Sistema

### Teste 1: Chatbot do Site

1. No site, clique no **ícone do chat** (canto inferior direito)
2. Escolha **"🏥 Fisioterapia"** ou **"✨ Tratamentos Estéticos"**
3. Complete o cadastro
4. ✅ **Você receberá notificação no WhatsApp!**

### Teste 2: Bot do WhatsApp

1. Envie **"oi"** para o número conectado
2. O bot responde com o menu
3. Digite **"1"** para agendar
4. Siga o fluxo completo
5. ✅ **Agendamento aparecerá no admin!**

---

## 📊 Painel Administrativo

### Abas Disponíveis:

#### 🎯 Novos Leads
- Ver todos os leads capturados
- Marcar como contatado/agendado/perdido
- Chamar diretamente no WhatsApp

#### 💬 Conversas
- Histórico completo de conversas do chatbot
- Ver informações parciais coletadas
- Analisar comportamento dos visitantes

#### 📅 Consultas
- Ver todos os agendamentos (site + WhatsApp)
- Cadastrar consultas manualmente
- Confirmar/cancelar/concluir
- Badges "🆕 NOVO!" para agendamentos recentes

#### 📱 WhatsApp Bot ⭐
- **Iniciar/Parar/Reiniciar** o bot
- **Ver QR Code** para conectar
- **Status em tempo real** (Online/Offline)
- **Logs do bot** ao vivo
- **Gerenciar tudo** pelo navegador

#### ⚙️ Configurações
- Definir dias de atendimento
- Configurar horários
- Intervalo de almoço
- Duração das consultas

---

## 🔔 Como Funcionam as Notificações

### Você recebe notificação no WhatsApp quando:

1. ✅ Alguém agenda **pelo site**
2. ✅ Alguém agenda **pelo WhatsApp Bot**
3. ✅ Alguém preenche o **chatbot do site**

### Formato da Notificação:

```
🆕 NOVO AGENDAMENTO VIA WHATSAPP!

👤 Nome: Maria Silva
📱 Telefone: 11999999999
🏥 Serviço: Fisioterapia Domiciliar
📅 Data: 25/10/2025
🕐 Horário: 10:00

⏰ Agendado em: 23/10/2025 18:45

💡 Acesse o painel administrativo!
```

---

## 🛠️ Comandos Úteis

### Iniciar Sistema Completo

```bash
# Terminal 1 - Site
npm run dev

# Terminal 2 - WhatsApp Server
npm run server
```

### Parar Tudo

Pressione **Ctrl + C** em cada terminal

### Reinstalar (se der problema)

```bash
rm -rf node_modules
npm install
```

---

## 🎮 Fluxo Completo de Uso

### Manhã (Uma vez)

1. ✅ Abra 2 terminais
2. ✅ Terminal 1: `npm run dev`
3. ✅ Terminal 2: `npm run server`
4. ✅ Acesse o admin e conecte o WhatsApp (se ainda não estiver conectado)

### Durante o Dia

- ✅ **Clientes agendam** pelo site ou WhatsApp
- ✅ **Você recebe notificações** automáticas
- ✅ **Confirma no admin** quando quiser
- ✅ **Bot responde** automaticamente 24/7

### Final do Dia

- ✅ Revise os agendamentos no admin
- ✅ Marque os atendidos como "Concluído"
- ✅ Pode deixar o bot rodando (ou fechar tudo)

---

## ⚙️ Configurações Importantes

### Número da Dra. Teiciane

**Já configurado:** `(11) 94854-1086`

Se precisar alterar, edite:
- `server/whatsapp-server.js` (linha 13)
- `whatsapp-bot.js` (linha 7)

### Senha do Admin

**Padrão:** `admin123`

Para alterar: edite `src/components/AdminPanel.jsx` (linha 43)

### Horários de Atendimento

Configure no admin: **⚙️ Configurações** → **Horários de Funcionamento**

---

## 🐛 Solução de Problemas

### "ERR_CONNECTION_REFUSED" no admin

**Problema:** Servidor não está rodando  
**Solução:** Execute `npm run server` em outro terminal

### QR Code não aparece

**Soluções:**
1. Aguarde 30 segundos
2. Clique em "🔄 Gerar Novo QR"
3. Reinicie o servidor (Ctrl+C e `npm run server`)

### Bot desconectou

**Solução:**
1. Vá no admin → aba "WhatsApp Bot"
2. Clique em "🔄 Reiniciar"
3. Escaneie o novo QR Code

### Site não abre

**Soluções:**
1. Verifique se `npm run dev` está rodando
2. Acesse http://localhost:5173
3. Limpe o cache do navegador (Ctrl+Shift+R)

---

## 📱 Comandos do Bot (para clientes)

Os clientes podem digitar no WhatsApp:

- `oi` ou `menu` → Ver menu principal
- `1` → Agendar consulta
- `2` → Ver horários
- `3` → Ver serviços
- `4` → Localização
- `5` → Falar com a Dra.

---

## 🎯 Recursos Principais

### ✅ No Site:
- Chatbot inteligente com marketing
- Formulário de agendamento direto
- Página de serviços estéticos
- Design responsivo e profissional

### ✅ No Admin:
- Gerenciar leads e conversas
- Ver e editar consultas
- **Conectar WhatsApp pelo navegador**
- **Ver QR Code sem terminal**
- **Logs em tempo real**
- Configurar horários

### ✅ No WhatsApp:
- Respostas automáticas 24/7
- Agendamento completo por chat
- Notificações instantâneas
- Menu interativo

---

## 🚀 Próximos Passos

### Para Produção:

1. **Deploy do Site:**
   - Netlify, Vercel, ou servidor próprio
   - Configure variáveis de ambiente

2. **Deploy do Servidor:**
   - VPS (DigitalOcean, AWS, etc.)
   - Use PM2 para manter rodando 24/7
   - Configure domínio e HTTPS

3. **Melhorias:**
   - Autenticação segura no admin
   - Backup automático dos dados
   - Relatórios e estatísticas
   - Integração com calendário

---

## 📞 Suporte

**Dúvidas?**
- Consulte os arquivos `.md` na pasta do projeto
- Veja logs no admin (aba WhatsApp Bot)
- Verifique o console do navegador (F12)

---

## 🎉 Resumo Rápido

**2 terminais rodando:**
1. `npm run dev` → Site (http://localhost:5173)
2. `npm run server` → WhatsApp (http://localhost:3001)

**1 aba no navegador:**
- Admin → WhatsApp Bot → Iniciar → Escanear QR

**Pronto! Sistema 100% funcional! 🚀**

---

**💙 Tudo integrado e funcionando perfeitamente! ✨**

