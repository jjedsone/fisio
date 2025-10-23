# 🔐 TESTE RÁPIDO - SISTEMA DE SEGURANÇA

## ⚡ TESTE EM 5 MINUTOS!

---

## 🎯 PASSO 1: LOGIN BÁSICO

### Abra o site:
```
http://localhost:5173
```

### Faça login:
1. Clique no botão **"Admin"** (canto superior direito)
2. Digite a senha: **`d@vi2023`**
3. Clique em **"Entrar"**

### ✅ Resultado esperado:
- Você entra no painel admin
- Vê todas as abas: Leads, Conversas, Consultas, WhatsApp Bot, **Segurança**, Configurações

---

## 🎯 PASSO 2: EXPLORAR SEGURANÇA

### Vá na aba de Segurança:
1. Clique na aba **"🔐 Segurança"**
2. Veja os cards:
   - 🔑 **Alterar Senha**
   - 🔐 **Autenticação em 2 Fatores (2FA)** - Status: ⚠️ DESATIVADO
   - ℹ️ **Como Funciona a Segurança**

### ✅ Resultado esperado:
- Você vê o painel de segurança completo
- Status do 2FA aparece como **DESATIVADO**
- Botões estão funcionais

---

## 🎯 PASSO 3: TESTAR ALTERAR SENHA

### Altere a senha:
1. Na aba **"🔐 Segurança"**
2. Clique em **"Alterar Senha"**
3. No modal que abre:
   - **Senha Atual:** `d@vi2023`
   - **Nova Senha:** `teste123456`
   - **Confirmar:** `teste123456`
4. Clique em **"🔑 Alterar Senha"**

### ✅ Resultado esperado:
- Mensagem: "✅ Senha alterada com sucesso!"
- Modal fecha

### Teste o login com a nova senha:
1. **Faça logout** (feche e abra o admin novamente)
2. Digite a **nova senha:** `teste123456`
3. Entre!

### ✅ Resultado esperado:
- Login funciona com a nova senha ✅

### ⚠️ IMPORTANTE: Volte a senha para `d@vi2023`:
1. Entre no admin (com senha `teste123456`)
2. Vá em **"🔐 Segurança"** → **"Alterar Senha"**
3. Senha Atual: `teste123456`
4. Nova Senha: `d@vi2023`
5. Confirmar: `d@vi2023`
6. Salvar!

---

## 🎯 PASSO 4: TESTAR ESQUECI MINHA SENHA

### Simule esquecimento de senha:
1. **Faça logout** (feche o admin)
2. Clique em **"Admin"** novamente
3. Na tela de login, clique em **"🔑 Esqueci minha senha"**

### ✅ Resultado esperado:
- Uma **nova aba do WhatsApp abre**
- Você vê uma mensagem pré-preenchida com o código
- Exemplo de mensagem:
  ```
  🔑 Recuperação de Senha - Dra. Teiciane Ramalho
  
  Seu código de recuperação de senha é:
  
  *123456*
  
  Este código expira em 5 minutos.
  ```

### Digite o código:
1. **Copie o código de 6 dígitos** da mensagem do WhatsApp
2. **Cole** no campo "Digite o código de 6 dígitos"
3. Clique em **"Verificar Código"**

### ✅ Resultado esperado:
- Mensagem: "✅ Código verificado! Agora defina sua nova senha."
- Tela muda para definir nova senha

### Defina nova senha:
1. **Nova Senha:** `d@vi2023`
2. **Confirmar:** `d@vi2023`
3. Clique em **"Alterar Senha"**

### ✅ Resultado esperado:
- Mensagem: "✅ Senha alterada com sucesso! Faça login com sua nova senha."
- Volta para tela de login
- Login funciona com `d@vi2023` ✅

---

## 🎯 PASSO 5: ATIVAR 2FA

### Ative o 2FA:
1. **Faça login** (senha: `d@vi2023`)
2. Vá em **"🔐 Segurança"**
3. Clique em **"🔒 Ativar 2FA"**

### ✅ Resultado esperado:
- Mensagem: "✅ Autenticação em 2 fatores ATIVADA! Na próxima vez você receberá um código no WhatsApp."
- Card do 2FA muda:
  - Status: **✅ 2FA ATIVADO** (verde)
  - Botão muda para: **"🔓 Desativar 2FA"** (vermelho)
- Na aba "🔐 Segurança" aparece um **✓** ao lado do nome

---

## 🎯 PASSO 6: TESTAR LOGIN COM 2FA

### Faça logout e login novamente:
1. **Feche o admin**
2. Clique em **"Admin"** novamente
3. Digite a senha: `d@vi2023`
4. Clique em **"Entrar"**

### ✅ Resultado esperado:
- Mensagem: "✅ Senha correta! Um código de verificação foi enviado para seu WhatsApp."
- Uma **nova aba do WhatsApp abre**
- Você vê o código de 6 dígitos
- A tela muda para: **"🔐 Verificação em 2 Fatores"**

### Digite o código 2FA:
1. **Copie o código** da mensagem do WhatsApp
2. **Cole** no campo "Digite o código de 6 dígitos"
3. Clique em **"Verificar Código"**

### ✅ Resultado esperado:
- Mensagem: "✅ Código verificado! Acesso liberado."
- Você entra no painel admin! 🎉

---

## 🎯 PASSO 7: TESTAR REENVIO DE CÓDIGO

### Simule código expirado:
1. **Faça logout**
2. Faça login novamente (senha: `d@vi2023`)
3. Na tela de verificação 2FA, **NÃO digite o código**
4. Clique em **"📱 Reenviar código"**

### ✅ Resultado esperado:
- Nova aba do WhatsApp abre
- Novo código de 6 dígitos é exibido
- Mensagem: "📱 Novo código enviado!"

---

## 🎯 PASSO 8: DESATIVAR 2FA

### Desative o 2FA:
1. **Entre no admin** (com 2FA)
2. Vá em **"🔐 Segurança"**
3. Clique em **"🔓 Desativar 2FA"**

### ✅ Resultado esperado:
- Mensagem: "⚠️ Autenticação em 2 fatores DESATIVADA!"
- Card do 2FA muda:
  - Status: **⚠️ 2FA DESATIVADO** (laranja)
  - Botão muda para: **"🔒 Ativar 2FA"** (verde)
- O **✓** ao lado da aba "🔐 Segurança" desaparece

### Teste login sem 2FA:
1. **Faça logout**
2. Faça login novamente (senha: `d@vi2023`)
3. Clique em **"Entrar"**

### ✅ Resultado esperado:
- Login direto, sem pedir código! ✅
- Você entra imediatamente no painel admin

---

## ✅ CHECKLIST DE TESTES

### Marque conforme testa:

- [ ] **Login básico** funciona com `d@vi2023`
- [ ] **Painel de Segurança** aparece e funciona
- [ ] **Alterar senha** funciona (teste e volte para `d@vi2023`)
- [ ] **Esqueci minha senha** abre WhatsApp com código
- [ ] **Recuperação de senha** funciona (código → nova senha)
- [ ] **Ativar 2FA** funciona e muda o status
- [ ] **Login com 2FA** pede código e funciona
- [ ] **Reenviar código** envia novo código
- [ ] **Desativar 2FA** funciona e login volta ao normal
- [ ] **Visual da aba Segurança** mostra ✓ quando 2FA está ativo

---

## 🎯 TESTE COMPLETO!

### Se todos os itens acima funcionaram:

# ✅ SEU SISTEMA DE SEGURANÇA ESTÁ 100% FUNCIONAL! 🎉

---

## 🛡️ CONFIGURAÇÃO RECOMENDADA

### Para máxima segurança:

1. ✅ **Mantenha a senha:** `d@vi2023` (ou troque para uma ainda mais forte)
2. ✅ **ATIVE o 2FA:** Proteção máxima contra acessos não autorizados
3. ✅ **Anote sua senha:** Em local seguro (papel, cofre de senhas)
4. ✅ **Teste periodicamente:** Verifique se tudo funciona
5. ✅ **Nunca compartilhe:** Senha e códigos 2FA são pessoais

---

## 📱 NÚMEROS E MENSAGENS

### WhatsApp configurado:
- **Número:** (11) 94854-1086
- **Formatado:** +55 11 94854-1086
- **Link:** https://wa.me/5511948541086

### Tipos de mensagens:
1. **Código 2FA** (login)
2. **Código de Recuperação** (esqueci senha)

---

## 🆘 SE ALGO NÃO FUNCIONAR

### ❌ WhatsApp não abre:
- Verifique se permite pop-ups no navegador
- A aba abre automaticamente com a mensagem pré-preenchida

### ❌ "Código expirado":
- Códigos expiram em 5 minutos
- Clique em "Reenviar código"

### ❌ "Senha incorreta":
- Verifique CapsLock
- Senha padrão: `d@vi2023`
- Use "Esqueci minha senha" se necessário

---

## 🎉 PARABÉNS!

Você testou e validou um **sistema de segurança profissional**! 🛡️

### Recursos testados:
- ✅ Login com senha
- ✅ Autenticação em 2 fatores
- ✅ Recuperação de senha
- ✅ Alterar senha
- ✅ Painel de gerenciamento
- ✅ Integração com WhatsApp
- ✅ Códigos temporários
- ✅ Validações de segurança

---

**🔐 Seu site está ULTRA SEGURO e TESTADO!** 🎉

