# 🤖 Bot do WhatsApp - Dra. Teiciane Ramalho

## 📋 Descrição

Bot automatizado de WhatsApp que:
- ✅ Responde mensagens automaticamente
- 📅 Permite agendamento de consultas via WhatsApp
- 🔔 Envia notificações de novos agendamentos do site
- 📊 Monitora e sincroniza dados com o sistema

---

## 🚀 Como Iniciar o Bot

### 1️⃣ Instalar Dependências

```bash
npm install
```

### 2️⃣ Iniciar o Bot

```bash
npm run bot
```

### 3️⃣ Escanear QR Code

1. Um QR Code aparecerá no terminal
2. Abra o WhatsApp no celular
3. Vá em **Menu (⋮)** → **Aparelhos conectados**
4. Toque em **Conectar um aparelho**
5. Escaneie o QR Code mostrado no terminal

✅ **Pronto!** O bot está ativo e rodando!

---

## 💬 Funcionalidades do Bot

### Menu Interativo

Quando alguém enviar uma mensagem, o bot responde com:

```
👋 Olá! Bem-vindo(a) à Clínica Dra. Teiciane Ramalho!

🤖 Sou o assistente virtual. Como posso ajudar?

1️⃣ Agendar consulta
2️⃣ Ver horários disponíveis
3️⃣ Informações sobre serviços
4️⃣ Localização e contato
5️⃣ Falar com a Dra.

Digite o número da opção desejada:
```

### Fluxo de Agendamento

1. **Cliente digita "1" ou "agendar"**
2. Bot solicita nome completo
3. Bot solicita serviço desejado
4. Bot solicita data preferida
5. Bot solicita horário
6. Bot mostra resumo e pede confirmação
7. ✅ Agendamento salvo e Dra. é notificada!

### Comandos Rápidos

- `MENU` ou `VOLTAR` → Volta ao menu principal
- `HORÁRIOS` → Mostra horários de atendimento
- `SERVIÇOS` → Lista todos os serviços
- `AGENDAR` → Inicia processo de agendamento
- `CONTATO` → Informações de localização

---

## 🔔 Notificações Automáticas

O bot monitora continuamente:

1. **Agendamentos do Site**: Quando alguém agenda pelo site, a Dra. recebe notificação no WhatsApp
2. **Agendamentos pelo WhatsApp**: Notifica imediatamente
3. **Novos Leads**: Pode ser configurado para notificar sobre novos leads

### Formato da Notificação

```
🆕 NOVO AGENDAMENTO VIA WHATSAPP!

👤 Nome: João Silva
📱 Telefone: 11999999999
🏥 Serviço: Fisioterapia Domiciliar
📅 Data: 25/10/2025
🕐 Horário: 10:00

⏰ Agendado em: 23/10/2025 às 18:30

💡 Acesse o painel administrativo do site para confirmar!
```

---

## 📂 Estrutura de Arquivos

```
meu-site/
├── whatsapp-bot.js          # Bot principal
├── sync-data.js             # Script de sincronização
├── data/                    # Dados do bot
│   ├── appointments.json    # Agendamentos
│   ├── leads.json          # Leads capturados
│   ├── sent_notifications.json  # Controle de notificações
│   └── browser-data.json   # Dados exportados do site
├── .wwebjs_auth/           # Sessão do WhatsApp (criado automaticamente)
└── BOT_WHATSAPP_README.md  # Este arquivo
```

---

## 🔄 Sincronização com o Site

### Como Exportar Dados do Site para o Bot

1. **Abra o site no navegador**
2. **Pressione F12** para abrir o console
3. **Cole e execute este comando**:

```javascript
console.log(JSON.stringify({
  appointments: localStorage.getItem('appointments'),
  leads: localStorage.getItem('leads')
}, null, 2));
```

4. **Copie o resultado** que aparecerá no console
5. **Cole em** `data/browser-data.json`
6. **Execute** o script de sincronização:

```bash
npm run sync
```

✅ Os dados agora estão sincronizados!

---

## ⚙️ Configuração

### Alterar Número da Dra.

Edite `whatsapp-bot.js` linha 7:

```javascript
const NUMERO_DRA = '5511948541086'; // Formato: 55 + DDD + número
```

### Alterar Horários de Atendimento

Edite a função `handleMenuResponse` em `whatsapp-bot.js`:

```javascript
case '2':
  await message.reply(
    `🕐 HORÁRIOS DE ATENDIMENTO\n\n` +
    `📅 Segunda a Sexta:\n` +
    `• Manhã: 08:00 às 12:00\n` +  // ← Altere aqui
    `• Tarde: 14:00 às 18:00\n\n`  // ← E aqui
    // ...
  );
  break;
```

### Alterar Serviços Disponíveis

Edite a variável `servicos` em `whatsapp-bot.js`:

```javascript
const servicos = {
  '1': 'Fisioterapia Domiciliar',
  '2': 'Drenagem Linfática',
  '3': 'Massagem Relaxante',
  '4': 'Peeling/Limpeza de Pele',
  '5': 'Outro'
};
```

---

## 🛠️ Manutenção

### Verificar Logs

O bot imprime logs em tempo real:

```
✅ BOT DO WHATSAPP CONECTADO E ATIVO!

🤖 Funções ativas:
   • Responder mensagens automaticamente
   • Notificar novos agendamentos
   • Fornecer informações sobre horários

👁️  Monitoramento de agendamentos iniciado...
```

### Parar o Bot

Pressione **Ctrl + C** no terminal

### Reiniciar o Bot

```bash
npm run bot
```

### Limpar Sessão (se der problema)

1. Pare o bot (Ctrl + C)
2. Delete a pasta `.wwebjs_auth/`
3. Inicie o bot novamente
4. Escaneie o QR Code novamente

---

## 🎯 Boas Práticas

### ✅ Recomendado:

- Manter o bot rodando 24/7 em um servidor
- Fazer backup regular da pasta `data/`
- Monitorar logs periodicamente
- Atualizar mensagens conforme necessário

### ❌ Não Recomendado:

- Usar o mesmo número em múltiplos dispositivos
- Desconectar frequentemente
- Modificar arquivos em `data/` manualmente enquanto o bot roda

---

## 🐛 Solução de Problemas

### QR Code não aparece

```bash
# Reinstalar dependências
npm install
```

### Erro de autenticação

```bash
# Limpar sessão e tentar novamente
rm -rf .wwebjs_auth
npm run bot
```

### Bot não responde

1. Verifique se o bot está rodando
2. Verifique os logs para erros
3. Reinicie o bot

### Notificações não chegam

1. Verifique o número da Dra. em `whatsapp-bot.js`
2. Verifique se há dados em `data/appointments.json`
3. Execute `npm run sync` para sincronizar

---

## 📱 Número do WhatsApp

**Dra. Teiciane Ramalho**  
📱 (11) 94854-1086

---

## 🆘 Suporte

Para dúvidas ou problemas:

1. Verifique este README primeiro
2. Consulte os logs do bot
3. Verifique a documentação do WhatsApp Web.js: https://wwebjs.dev

---

## 📄 Licença

Uso exclusivo da Clínica Dra. Teiciane Ramalho.

---

**✨ Bot desenvolvido com amor para automatizar e melhorar o atendimento! 💙**

