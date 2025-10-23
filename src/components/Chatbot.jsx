import React, { useState, useEffect, useRef } from 'react';
import './Chatbot.css';

const Chatbot = ({ onClose }) => {
const [messages, setMessages] = useState([
    { 
      type: 'bot', 
      text: '👋 Olá! Que bom ter você aqui!\n\nSou a assistente da Dra. Teiciane Ramalho e estou aqui para ajudá-lo a cuidar da sua saúde e beleza.\n\nComo posso te ajudar hoje?',
      options: [
        '🏥 Fisioterapia', 
        '✨ Tratamentos Estéticos',
        '📱 Falar direto com a Dra.'
      ]
    }
  ]);
  const [step, setStep] = useState('inicial');
  const [leadData, setLeadData] = useState({
    nome: '',
    telefone: '',
    idade: '',
    altura: '',
    peso: '',
    tipoServico: '', // 'fisioterapia' ou 'estetico'
    servicoEscolhido: '',
    necessidade: '',
    urgencia: '',
    conheceu: '',
    observacoes: ''
  });
  const messagesEndRef = useRef(null);
  const conversationIdRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Iniciar conversa ao abrir chatbot
    initConversation();
  }, []);

useEffect(() => {
    // Atualizar conversa a cada nova mensagem
    if (conversationIdRef.current) {
      updateConversation();
    }
}, [messages]);

  const initConversation = () => {
    const conversationId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    conversationIdRef.current = conversationId;
    
    const conversation = {
      id: conversationId,
      dataInicio: new Date().toISOString(),
      dataUltimaInteracao: new Date().toISOString(),
      status: 'em_andamento',
      mensagens: messages,
      leadParcial: {},
      origem: 'chatbot',
      finalizado: false
    };

    saveConversation(conversation);
  };

  const updateConversation = () => {
    const conversations = JSON.parse(localStorage.getItem('chatbotConversations') || '[]');
    const index = conversations.findIndex(c => c.id === conversationIdRef.current);
    
    if (index !== -1) {
      conversations[index] = {
        ...conversations[index],
        dataUltimaInteracao: new Date().toISOString(),
        mensagens: messages,
        leadParcial: leadData,
        status: step === 'finalizado' ? 'completo' : 'em_andamento'
      };
      
      localStorage.setItem('chatbotConversations', JSON.stringify(conversations));
    }
  };

  const saveConversation = (conversation) => {
    const conversations = JSON.parse(localStorage.getItem('chatbotConversations') || '[]');
    conversations.push(conversation);
    localStorage.setItem('chatbotConversations', JSON.stringify(conversations));
  };

  const markConversationComplete = () => {
    const conversations = JSON.parse(localStorage.getItem('chatbotConversations') || '[]');
    const index = conversations.findIndex(c => c.id === conversationIdRef.current);
    
    if (index !== -1) {
      conversations[index] = {
        ...conversations[index],
        status: 'completo',
        finalizado: true,
        leadCompleto: leadData,
        dataFim: new Date().toISOString()
      };
      
      localStorage.setItem('chatbotConversations', JSON.stringify(conversations));
    }
  };

  const loadServicosEsteticos = () => {
    const servicos = JSON.parse(localStorage.getItem('servicosEsteticos') || '[]');
    const servicosAtivos = servicos.filter(s => s.ativo);
    
    if (servicosAtivos.length === 0) {
      addMessage({ 
        type: 'bot', 
        text: '✨ Tratamentos Estéticos Disponíveis:\n\n💆‍♀️ Limpeza de Pele\n🌟 Peeling Químico\n💉 Microagulhamento\n💆 Drenagem Linfática\n💆‍♀️ Massagens Relaxantes\n🔥 Massagem com Pedras Quentes\n\nQual tratamento te interessa?',
        options: [
          'Limpeza de Pele',
          'Peeling/Microagulhamento',
          'Drenagem Linfática',
          'Massagens',
          '✨ Ver todos',
          '📅 Quero agendar'
        ]
      });
} else {
      const opcoes = servicosAtivos.slice(0, 5).map(s => s.nome);
      opcoes.push('✨ Ver todos', '📅 Quero agendar');
      
      addMessage({ 
        type: 'bot', 
        text: '✨ Tratamentos Estéticos Disponíveis:\n\n' + servicosAtivos.map(s => `${s.categoria === 'facial' ? '💆‍♀️' : '💆'} ${s.nome}`).join('\n') + '\n\nQual tratamento te interessa?',
        options: opcoes
      });
    }
  };

  const addMessage = (message) => {
    setMessages(prev => [...prev, message]);
  };

  const saveLeadToLocalStorage = (data) => {
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    const newLead = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...data,
      status: 'novo',
      dataCriacao: new Date().toISOString(),
      origem: 'chatbot'
    };
    leads.push(newLead);
    localStorage.setItem('leads', JSON.stringify(leads));
    return newLead;
  };

  const handleOptionClick = (option) => {
    addMessage({ type: 'user', text: option });

    setTimeout(() => {
      if (option === '🏥 Fisioterapia') {
        setLeadData(prev => ({ ...prev, tipoServico: 'fisioterapia' }));
        addMessage({ 
          type: 'bot', 
          text: '🏥 Fisioterapia - Ótima escolha!\n\nO que você precisa?',
          options: [
            '📅 Quero agendar consulta',
            '💬 Tirar dúvidas primeiro',
            '📋 Ver especialidades'
          ]
        });
      } else if (option === '✨ Tratamentos Estéticos') {
        setLeadData(prev => ({ ...prev, tipoServico: 'estetico' }));
        loadServicosEsteticos();
      } else if (option === '📅 Quero agendar consulta') {
        setStep('apresentacao-fisio');
        addMessage({ 
          type: 'bot', 
          text: '🎉 Excelente escolha! Você está a poucos passos de transformar sua qualidade de vida.\n\n✨ A Dra. Teiciane é especialista em fisioterapia domiciliar há mais de 12 anos, e já ajudou centenas de pacientes a recuperarem sua mobilidade e bem-estar.\n\nVou fazer algumas perguntas rápidas para conhecê-lo melhor e a Dra. Teiciane entrará em contato pessoalmente para agendar o melhor horário para você. Combinado?',
          options: ['✅ Sim, vamos lá!', '❌ Tenho dúvidas ainda']
        });
      } else if (option === '💬 Tirar dúvidas primeiro') {
        addMessage({ 
          type: 'bot', 
          text: '📚 Ficarei feliz em ajudar! Sobre qual especialidade você gostaria de saber mais?',
          options: [
            'Fisioterapia Geriátrica 👴',
            'Fisioterapia Neurológica 🧠', 
            'Fisioterapia Ortopédica 🦴',
            'Fisioterapia Respiratória 🫁',
            'Como funciona em casa? 🏠'
          ]
        });
        setStep('duvidas');
      } else if (option === '📋 Ver especialidades') {
        addMessage({ 
          type: 'bot', 
          text: '🏥 Especialidades em Fisioterapia:\n\n👴 Geriátrica - Idosos\n🧠 Neurológica - AVC, Parkinson\n🦴 Ortopédica - Dores, fraturas\n🫁 Respiratória - Pulmões\n\nQual te interessa?',
          options: [
            'Fisioterapia Geriátrica',
            'Fisioterapia Neurológica',
            'Fisioterapia Ortopédica',
            'Fisioterapia Respiratória',
            '📅 Quero agendar'
          ]
        });
      } else if (option === '📱 Falar direto com a Dra.') {
        addMessage({ 
          type: 'bot', 
          text: '📞 Você pode entrar em contato diretamente:\n\n💬 WhatsApp: (11) 94854-1086\n\nMas que tal eu agilizar isso para você? Posso coletar suas informações e a Dra. Teiciane te liga em até 1 hora! ⚡\n\nO que prefere?',
          options: ['⚡ Sim, quero que ela me ligue!', '📱 Vou ligar agora mesmo']
        });
      } else if (option === '✅ Sim, vamos lá!' || option === '📅 Quero agendar') {
        setStep('nome');
        addMessage({ 
          type: 'bot', 
          text: 'Perfeito! Vamos começar. 😊\n\nQual é o seu nome completo?',
          input: 'text'
        });
      } else if (option === '❌ Tenho dúvidas ainda') {
        addMessage({ 
          type: 'bot', 
          text: 'Sem problemas! Estou aqui para esclarecer tudo. 😊\n\nQual sua principal dúvida?',
          options: [
            'Como funciona o atendimento?',
            'Quanto custa?',
            'Quais problemas podem ser tratados?',
            'A Dra. atende minha região?',
            '✅ Ok, quero agendar!'
          ]
        });
      } else if (option.includes('Fisioterapia')) {
        handleDuvidasFisioterapia(option);
      } else if (option === 'Como funciona em casa? 🏠') {
        addMessage({ 
          type: 'bot', 
          text: '🏠 O atendimento domiciliar é super prático!\n\n✅ A Dra. vai até sua casa\n✅ Leva todos os equipamentos\n✅ Atendimento personalizado\n✅ Conforto e segurança\n✅ Horários flexíveis\n\nSem estresse de deslocamento e com muito mais atenção focada em você!\n\nQuer agendar sua avaliação?',
          options: ['🏥 Sim, quero agendar!', '💰 Quanto custa?']
        });
      } else if (option === 'Como funciona o atendimento?') {
        addMessage({ 
          type: 'bot', 
          text: '📋 É muito simples!\n\n1️⃣ Você agenda sua avaliação\n2️⃣ A Dra. vai até sua casa\n3️⃣ Faz uma avaliação completa\n4️⃣ Monta um plano personalizado\n5️⃣ Já inicia os exercícios\n\nCada sessão dura cerca de 1 hora e você pode agendar nos dias e horários que melhor funcionam para você!\n\nQuer começar?',
          options: ['✅ Sim, quero começar!', '💬 Outra dúvida']
        });
      } else if (option === 'Quanto custa?' || option === '💰 Quanto custa?') {
        addMessage({ 
          type: 'bot', 
          text: '💰 Ótima pergunta!\n\nO investimento varia de acordo com:\n• Tipo de tratamento necessário\n• Frequência das sessões\n• Localização\n\n💡 Mas tenho uma boa notícia: a Dra. Teiciane oferece avaliação gratuita para novos pacientes! Assim você conhece o trabalho sem compromisso.\n\nQue tal agendar sua avaliação gratuita agora?',
          options: ['🎁 Quero a avaliação gratuita!', '📱 Prefiro falar com a Dra.']
        });
      } else if (option === 'Quais problemas podem ser tratados?') {
        addMessage({ 
          type: 'bot', 
          text: '🏥 A Dra. Teiciane trata diversos casos:\n\n✅ Dores nas costas, joelhos, ombros\n✅ Recuperação pós-cirúrgica\n✅ Reabilitação pós-AVC\n✅ Parkinson, Alzheimer\n✅ Fortalecimento para idosos\n✅ Problemas respiratórios\n✅ Fraturas e lesões\n✅ E muito mais!\n\nQual é o seu caso?',
          options: ['Dor crônica', 'Pós-operatório', 'Idoso/Geriátrico', 'Neurológico', 'Outro']
        });
      } else if (option === 'A Dra. atende minha região?') {
        addMessage({ 
          type: 'bot', 
          text: '📍 A Dra. Teiciane atende principalmente:\n\n✅ Vila Mariana\n✅ Moema\n✅ Brooklin\n✅ Jabaquara\n✅ Santo Amaro\n✅ E regiões próximas\n\nQue tal me passar suas informações? Vou verificar se atendemos sua região e já adiantamos seu agendamento!',
          options: ['✅ Vamos lá!', '📱 Prefiro ligar']
        });
      } else if (option === '✅ Ok, quero agendar!' || option === '🏥 Sim, quero agendar!' || 
                 option === '✅ Sim, quero começar!' || option === '✅ Vamos lá!' ||
                 option === '🎁 Quero a avaliação gratuita!' || option === '⚡ Sim, quero que ela me ligue!') {
        setStep('nome');
        addMessage({ 
          type: 'bot', 
          text: '🎉 Maravilha! Você está fazendo a escolha certa para sua saúde!\n\nPara começar, qual é o seu nome completo?',
          input: 'text'
        });
      } else if (option === '📱 Prefiro falar com a Dra.' || option === '📱 Prefiro ligar' || 
                 option === '📱 Vou ligar agora mesmo') {
        addMessage({ 
          type: 'bot', 
          text: '📱 Perfeito! Você pode entrar em contato:\n\n💬 WhatsApp: (11) 94854-1086\n\n✨ A Dra. Teiciane vai adorar conversar com você!\n\nSe mudar de ideia e quiser que ela te ligue, é só voltar aqui! 😊'
        });
      } else if (option === '💬 Outra dúvida') {
        addMessage({ 
          type: 'bot', 
          text: 'Claro! Qual sua dúvida?',
          options: [
            'Quanto custa?',
            'Quais problemas podem ser tratados?',
            'A Dra. atende minha região?',
            '✅ Quero agendar agora!'
          ]
        });
      } else if (['Dor crônica', 'Pós-operatório', 'Idoso/Geriátrico', 'Neurológico', 'Outro'].includes(option)) {
        setLeadData(prev => ({ ...prev, necessidade: option }));
        addMessage({ 
          type: 'bot', 
          text: `Entendi, ${option}. A Dra. Teiciane tem muita experiência nessa área! 💙\n\nQue tal agendarmos sua avaliação? Vou só coletar algumas informações básicas e a Dra. entrará em contato para agendar o melhor horário para você!`,
          options: ['✅ Vamos lá!', '📱 Prefiro ligar']
        });
      } else if (option === '✨ Ver todos') {
        loadServicosEsteticos();
      } else if (option.includes('Limpeza') || option.includes('Peeling') || option.includes('Microagulhamento') || 
                 option.includes('Drenagem') || option.includes('Massagem') || option.includes('Hidratação') ||
                 option.includes('Pedras')) {
        setLeadData(prev => ({ ...prev, servicoEscolhido: option }));
        setStep('apresentacao-estetico');
        addMessage({ 
          type: 'bot', 
          text: `✨ ${option} - Excelente escolha!\n\n🌟 A Dra. Teiciane realiza tratamentos estéticos profissionais com técnicas avançadas e produtos de alta qualidade.\n\nVou fazer algumas perguntas rápidas e a Dra. entrará em contato para agendar seu horário. Pode ser?`,
          options: ['✅ Sim, vamos lá!', '💬 Tenho dúvidas']
        });
      } else if (option === '💬 Tenho dúvidas') {
        addMessage({ 
          type: 'bot', 
          text: 'Claro! O que você gostaria de saber?',
          options: [
            'Quanto custa?',
            'Como funciona?',
            'Onde é feito?',
            '✅ Ok, quero agendar!'
          ]
        });
      } else if (option === '💬 Chamar no WhatsApp Agora') {
        const mensagem = encodeURIComponent(
          `Olá Dra. Teiciane! 😊\n\nAcabei de preencher o cadastro no seu site e gostaria de conversar com você agora!\n\n${leadData.nome ? `Meu nome: ${leadData.nome}` : ''}\n${leadData.telefone ? `WhatsApp: ${leadData.telefone}` : ''}\n\nEstou ansioso(a) para começar! 💙`
        );
        window.open(`https://wa.me/5511948541086?text=${mensagem}`, '_blank');
        addMessage({ 
          type: 'bot', 
          text: '✅ Abrindo WhatsApp...\n\nSe não abriu automaticamente, clique aqui:\n\n📱 (11) 94854-1086\n\n💙 A Dra. está aguardando você!'
        });
      } else if (option === '✅ Vou aguardar o contato') {
        addMessage({ 
          type: 'bot', 
          text: '✅ Perfeito!\n\n🕐 A Dra. Teiciane entrará em contato em breve.\n\n💙 Obrigada pela preferência!\n\nSe precisar de algo antes, você sabe onde me encontrar! 😊'
        });
      } else if (option === '🏥 Agendar para outra pessoa') {
        // Reset do formulário para nova pessoa
        setLeadData({
          nome: '',
          telefone: '',
          idade: '',
          altura: '',
          peso: '',
          tipoServico: leadData.tipoServico, // Mantém o tipo de serviço
          servicoEscolhido: leadData.servicoEscolhido, // Mantém o serviço escolhido
          necessidade: '',
          urgencia: '',
          conheceu: '',
          observacoes: ''
        });
        setStep('nome');
        addMessage({ 
          type: 'bot', 
          text: '🏥 Ótimo! Vou cadastrar outra pessoa.\n\nQual o nome completo dessa pessoa?',
          input: 'text'
        });
      }
    }, 500);
  };

  const handleDuvidasFisioterapia = (tipo) => {
    let resposta = '';
    
    if (tipo.includes('Geriátrica')) {
      resposta = '👴 Fisioterapia Geriátrica\n\nIdeal para idosos que precisam:\n✅ Melhorar equilíbrio e mobilidade\n✅ Prevenir quedas\n✅ Fortalecer musculatura\n✅ Ganhar independência\n✅ Tratar doenças do envelhecimento\n\nA Dra. Teiciane é especialista em proporcionar mais qualidade de vida e autonomia para nossos queridos idosos! 💙';
    } else if (tipo.includes('Neurológica')) {
      resposta = '🧠 Fisioterapia Neurológica\n\nEspecializada em:\n✅ Recuperação pós-AVC\n✅ Parkinson\n✅ Alzheimer\n✅ Paralisia cerebral\n✅ Esclerose múltipla\n\nReabilitação focada em recuperar movimentos, coordenação e independência. Cada caso é único e merece atenção especializada!';
    } else if (tipo.includes('Ortopédica')) {
      resposta = '🦴 Fisioterapia Ortopédica\n\nTratamento para:\n✅ Dores nas costas, joelhos, ombros\n✅ Pós-operatório\n✅ Fraturas\n✅ Entorses e distensões\n✅ Lesões esportivas\n✅ Hérnia de disco\n\nAlívio da dor e recuperação completa da função!';
    } else if (tipo.includes('Respiratória')) {
      resposta = '🫁 Fisioterapia Respiratória\n\nIndicada para:\n✅ Doenças pulmonares\n✅ Problemas respiratórios crônicos\n✅ Pós-COVID\n✅ Dificuldade para respirar\n✅ Acúmulo de secreção\n\nMelhora a capacidade respiratória e qualidade de vida!';
    }

    addMessage({ 
      type: 'bot', 
      text: resposta + '\n\nÉ esse tipo de tratamento que você precisa?',
      options: ['✅ Sim, quero agendar!', '💬 Outra especialidade', '📱 Quero falar com a Dra.']
    });
  };

  const handleInputSubmit = (value) => {
    if (!value.trim()) return;

    addMessage({ type: 'user', text: value });

    setTimeout(() => {
      switch(step) {
        case 'nome':
          setLeadData(prev => ({ ...prev, nome: value }));
          setStep('telefone');
          const firstName = value.split(' ')[0];
          addMessage({ 
            type: 'bot', 
            text: `Prazer em conhecê-lo, ${firstName}! 😊\n\nAgora preciso do seu WhatsApp para a Dra. Teiciane entrar em contato:\n\n(Digite com DDD)`,
            input: 'tel'
          });
          break;

        case 'telefone':
          setLeadData(prev => ({ ...prev, telefone: value }));
          setStep('idade');
          addMessage({ 
            type: 'bot', 
            text: 'Ótimo! 📱\n\nPara um atendimento mais personalizado, qual é a sua idade?',
            input: 'number'
          });
          break;

        case 'idade':
          setLeadData(prev => ({ ...prev, idade: value }));
          setStep('altura');
          addMessage({ 
            type: 'bot', 
            text: 'Perfeito! 👍\n\nQual é a sua altura? (em metros, ex: 1.75)',
            input: 'text'
          });
          break;

        case 'altura':
          setLeadData(prev => ({ ...prev, altura: value }));
          setStep('peso');
          addMessage({ 
            type: 'bot', 
            text: 'Anotado! 📝\n\nE o seu peso atual? (em kg)',
            input: 'number'
          });
          break;

        case 'peso':
          setLeadData(prev => ({ ...prev, peso: value }));
          
          // Se for fisioterapia, pergunta a necessidade
          if (leadData.tipoServico === 'fisioterapia') {
            setStep('necessidade');
            addMessage({ 
              type: 'bot', 
              text: 'Excelente! Agora me conta:\n\nQual é o seu principal motivo para buscar fisioterapia?',
              options: [
                'Dor crônica/contínua',
                'Recuperação pós-cirúrgica',
                'Problema neurológico',
                'Fortalecimento/prevenção',
                'Reabilitação geral',
                'Outro motivo'
              ]
            });
          } else {
            // Se for estético, vai direto para urgência
            setStep('urgencia');
            addMessage({ 
              type: 'bot', 
              text: 'Perfeito! 💙\n\nQuando você gostaria de fazer o tratamento?',
              options: [
                '🔴 Urgente (esta semana)',
                '🟡 Breve (próxima semana)',
                '🟢 Flexível (posso esperar)',
                'Só quero informações'
              ]
            });
          }
          break;

        case 'necessidade':
          setLeadData(prev => ({ ...prev, necessidade: value }));
          
          // Se for serviço estético, pula a pergunta de necessidade e vai direto para urgência
          if (leadData.tipoServico === 'estetico') {
            setStep('urgencia');
            addMessage({ 
              type: 'bot', 
              text: `Perfeito! 💙\n\nQuando você gostaria de fazer o tratamento?`,
              options: [
                '🔴 Urgente (esta semana)',
                '🟡 Breve (próxima semana)',
                '🟢 Flexível (posso esperar)',
                'Só quero informações'
              ]
            });
} else {
            setStep('urgencia');
            addMessage({ 
              type: 'bot', 
              text: `Entendi, ${value}. 💙\n\nQuando você gostaria de começar o tratamento?`,
              options: [
                '🔴 Urgente (esta semana)',
                '🟡 Breve (próxima semana)',
                '🟢 Flexível (posso esperar)',
                'Só quero informações'
              ]
            });
          }
          break;

        case 'urgencia':
          setLeadData(prev => ({ ...prev, urgencia: value }));
          
          // Se escolheu "Só quero informações", finaliza com mensagem de agradecimento
          if (value === 'Só quero informações') {
            addMessage({ 
              type: 'bot', 
              text: '💙 Muito obrigada pelas informações!\n\n✅ Seus dados foram registrados com sucesso.\n\n📱 Em breve a Dra. Teiciane entrará em contato pelo WhatsApp para te passar todas as informações que você precisa!\n\n🕐 Fique atento(a) ao seu celular.\n\n✨ Será um prazer atendê-lo(a)!\n\nDra. Teiciane Ramalho 💙'
            });
            
            // Salva lead mesmo que seja só informações
            const leadParcial = {
              ...leadData,
              urgencia: value,
              observacoes: 'Solicitou apenas informações'
            };
            saveLeadToLocalStorage(leadParcial);
            
            setTimeout(() => {
              addMessage({ 
                type: 'bot', 
                text: '📲 Quer falar agora com a Dra.?\n\nWhatsApp: (11) 94854-1086\n\nOu aguarde que ela entrará em contato! 😊',
                options: [
                  '💬 Chamar no WhatsApp Agora',
                  '✅ Vou aguardar o contato'
                ]
              });
            }, 2000);
            
            setStep('finalizado');
          } else {
            // Continua fluxo normal
            setStep('conheceu');
            addMessage({ 
              type: 'bot', 
              text: 'Perfeito! Última pergunta rápida:\n\nComo você conheceu a Dra. Teiciane?',
              options: [
                'Google/Internet',
                'Indicação de amigo/familiar',
                'Instagram/Redes Sociais',
                'Já sou paciente',
                'Outro'
              ]
            });
          }
          break;

        case 'conheceu':
          setLeadData(prev => ({ ...prev, conheceu: value }));
          setStep('observacoes');
          addMessage({ 
            type: 'bot', 
            text: 'Obrigada por compartilhar! 😊\n\nGostaria de adicionar alguma observação importante sobre seu caso? (Se não, digite "não")',
            input: 'text'
          });
          break;

        case 'observacoes':
          const obs = value.toLowerCase() === 'não' || value.toLowerCase() === 'nao' ? '' : value;
          setLeadData(prev => ({ ...prev, observacoes: obs }));
          finalizarCadastro({ ...leadData, observacoes: obs });
          break;

        default:
          break;
      }
    }, 500);
  };

  const finalizarCadastro = (data) => {
    const lead = saveLeadToLocalStorage(data);
    markConversationComplete();
    
    const urgenciaEmoji = data.urgencia.includes('Urgente') ? '🔴' : 
                          data.urgencia.includes('Breve') ? '🟡' : '🟢';
    
    const tipoTratamento = data.tipoServico === 'estetico' ? '✨ Tratamento Estético' : '🏥 Fisioterapia';
    const servicoTexto = data.servicoEscolhido ? `${data.servicoEscolhido}` : data.necessidade;

    addMessage({ 
      type: 'bot', 
      text: `🎉 Pronto, ${data.nome.split(' ')[0]}!\n\n✅ Suas informações foram registradas com sucesso!\n\n📋 RESUMO:\n👤 Nome: ${data.nome}\n📱 WhatsApp: ${data.telefone}\n👶 Idade: ${data.idade} anos\n📏 Altura: ${data.altura}m\n⚖️ Peso: ${data.peso}kg\n${data.tipoServico === 'estetico' ? '✨' : '🏥'} Serviço: ${tipoTratamento}\n${data.servicoEscolhido ? `💎 Tratamento: ${data.servicoEscolhido}` : data.necessidade ? `🏥 Necessidade: ${data.necessidade}` : ''}\n${urgenciaEmoji} Urgência: ${data.urgencia}\n${data.observacoes ? `📝 Obs: ${data.observacoes}` : ''}\n\n━━━━━━━━━━━━━━━━\n\n🌟 PRÓXIMOS PASSOS:\n\n1️⃣ A Dra. Teiciane entrará em contato pelo WhatsApp em até 24 horas\n2️⃣ Vocês conversarão sobre ${data.tipoServico === 'estetico' ? 'o tratamento' : 'seu caso'}\n3️⃣ Agendarão o melhor horário para você\n4️⃣ Início do ${data.tipoServico === 'estetico' ? 'tratamento estético!' : 'tratamento personalizado!'}\n\n✨ Você está a um passo de ${data.tipoServico === 'estetico' ? 'realçar sua beleza!' : 'transformar sua qualidade de vida!'}\n\n💙 Fique tranquilo, a Dra. cuidará muito bem de você!`
    });

    setTimeout(() => {
      addMessage({ 
        type: 'bot', 
        text: '💙 Obrigada pela confiança!\n\n📱 Em breve você receberá o atendimento da Dra. Teiciane pelo WhatsApp.\n\n🕐 Fique atento(a) ao seu celular nas próximas horas!\n\n✨ Ela está ansiosa para cuidar de você! 😊'
      });
      
      setTimeout(() => {
        addMessage({ 
          type: 'bot', 
          text: '📲 Quer falar agora com a Dra.?\n\nWhatsApp: (11) 94854-1086\n\nClique abaixo para abrir uma conversa!',
          options: [
            '💬 Chamar no WhatsApp Agora',
            '✅ Vou aguardar o contato',
            '🏥 Agendar para outra pessoa'
          ]
        });
      }, 2000);
    }, 2000);

    setStep('finalizado');
  };

return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <div className="chatbot-header-info">
          <div className="chatbot-avatar">👩‍⚕️</div>
          <div>
            <h3>Dra. Teiciane Ramalho</h3>
            <span className="chatbot-status">🟢 Online agora</span>
</div>
</div>
        <button className="chatbot-close" onClick={onClose}>✕</button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            {msg.type === 'bot' && <div className="message-avatar">🤖</div>}
            <div className="message-content">
              <div className="message-bubble">
                {msg.text.split('\n').map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i < msg.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
              {msg.options && (
                <div className="message-options">
                  {msg.options.map((option, i) => (
                    <button 
                      key={i} 
                      className="option-button"
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </button>
))}
</div>
              )}
              {msg.input && (
                <ChatInput 
                  type={msg.input} 
                  onSubmit={handleInputSubmit}
                />
              )}
            </div>
            {msg.type === 'user' && <div className="message-avatar user">👤</div>}
          </div>
        ))}
        <div ref={messagesEndRef} />
</div>
</div>
);
};

const ChatInput = ({ type, onSubmit }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onSubmit(value);
      setValue('');
    }
  };

  const getPlaceholder = () => {
    switch(type) {
      case 'tel': return '(11) 99999-9999';
      case 'number': return 'Digite aqui...';
      default: return 'Digite sua resposta...';
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <input
        type={type === 'number' ? 'number' : 'text'}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={getPlaceholder()}
        required
        className="chat-input"
        autoFocus
        min={type === 'number' ? '0' : undefined}
        step={type === 'number' ? '1' : undefined}
      />
      <button type="submit" className="chat-submit">
        Enviar ➤
      </button>
    </form>
  );
};

export default Chatbot;
