// Hook customizado para gerenciar operações do Firebase
import { useState, useEffect } from 'react';
import { 
  agendamentosService, 
  conversasService, 
  leadsService,
  configuracoesService,
  mensagensWhatsAppService 
} from '../services/firebaseService';

export const useAgendamentos = () => {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = async () => {
    try {
      setLoading(true);
      const dados = await agendamentosService.listar();
      setAgendamentos(dados);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar agendamentos:', err);
    } finally {
      setLoading(false);
    }
  };

  const criar = async (agendamento) => {
    try {
      const novo = await agendamentosService.criar(agendamento);
      setAgendamentos(prev => [novo, ...prev]);
      return novo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const atualizar = async (id, dados) => {
    try {
      await agendamentosService.atualizar(id, dados);
      setAgendamentos(prev => 
        prev.map(item => item.id === id ? { ...item, ...dados } : item)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deletar = async (id) => {
    try {
      await agendamentosService.deletar(id);
      setAgendamentos(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return {
    agendamentos,
    loading,
    error,
    criar,
    atualizar,
    deletar,
    recarregar: carregar
  };
};

export const useConversas = () => {
  const [conversas, setConversas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = async () => {
    try {
      setLoading(true);
      const dados = await conversasService.listar();
      setConversas(dados);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar conversas:', err);
    } finally {
      setLoading(false);
    }
  };

  const salvar = async (conversa) => {
    try {
      const nova = await conversasService.salvar(conversa);
      setConversas(prev => [nova, ...prev]);
      return nova;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const atualizarStatus = async (id, status) => {
    try {
      await conversasService.atualizarStatus(id, status);
      setConversas(prev => 
        prev.map(item => item.id === id ? { ...item, status } : item)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return {
    conversas,
    loading,
    error,
    salvar,
    atualizarStatus,
    recarregar: carregar
  };
};

export const useLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = async () => {
    try {
      setLoading(true);
      const dados = await leadsService.listar();
      setLeads(dados);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar leads:', err);
    } finally {
      setLoading(false);
    }
  };

  const criar = async (lead) => {
    try {
      const novo = await leadsService.criar(lead);
      setLeads(prev => [novo, ...prev]);
      return novo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const atualizar = async (id, dados) => {
    try {
      await leadsService.atualizar(id, dados);
      setLeads(prev => 
        prev.map(item => item.id === id ? { ...item, ...dados } : item)
      );
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return {
    leads,
    loading,
    error,
    criar,
    atualizar,
    recarregar: carregar
  };
};

export const useConfiguracoes = () => {
  const [configuracoes, setConfiguracoes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = async () => {
    try {
      setLoading(true);
      const dados = await configuracoesService.buscar();
      setConfiguracoes(dados);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar configurações:', err);
    } finally {
      setLoading(false);
    }
  };

  const atualizar = async (novasConfiguracoes) => {
    try {
      await configuracoesService.atualizar(novasConfiguracoes);
      setConfiguracoes(novasConfiguracoes);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    carregar();
  }, []);

  return {
    configuracoes,
    loading,
    error,
    atualizar,
    recarregar: carregar
  };
};

export const useMensagensWhatsApp = (numeroContato = null) => {
  const [mensagens, setMensagens] = useState([]);
  const [conversas, setConversas] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const carregar = async () => {
    try {
      setLoading(true);
      if (numeroContato) {
        const dados = await mensagensWhatsAppService.listarPorContato(numeroContato);
        setMensagens(dados);
      } else {
        const dados = await mensagensWhatsAppService.listarConversas();
        setConversas(dados);
      }
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao carregar mensagens WhatsApp:', err);
    } finally {
      setLoading(false);
    }
  };

  const salvar = async (mensagem) => {
    try {
      const nova = await mensagensWhatsAppService.salvar(mensagem);
      if (numeroContato) {
        setMensagens(prev => [...prev, nova]);
      }
      return nova;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    carregar();
  }, [numeroContato]);

  return {
    mensagens,
    conversas,
    loading,
    error,
    salvar,
    recarregar: carregar
  };
};

