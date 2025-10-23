import React, { useState, useEffect } from 'react';
import './AgendamentoModal.css';

const AgendamentoModal = ({ onClose, servico }) => {
  const [step, setStep] = useState('telefone'); // telefone, boas-vindas, dados, horario, confirmacao
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    dataNascimento: '',
    endereco: '',
    bairro: '',
    cidade: 'São Paulo',
    observacoes: ''
  });
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const WHATSAPP_DOUTORA = '5511948541086';

  useEffect(() => {
    generateAvailableDates();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      loadAvailableTimes(selectedDate);
    }
  }, [selectedDate]);

  const checkExistingUser = (telefone) => {
    const cleanPhone = telefone.replace(/\D/g, '');
    
    // Busca em appointments
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const existingAppointment = appointments.find(apt => 
      apt.telefone?.replace(/\D/g, '') === cleanPhone
    );
    
    // Busca em leads
    const leads = JSON.parse(localStorage.getItem('leads') || '[]');
    const existingLead = leads.find(lead => 
      lead.telefone?.replace(/\D/g, '') === cleanPhone
    );
    
    if (existingAppointment) {
      setFormData({
        nome: existingAppointment.nome || '',
        telefone: telefone,
        email: existingAppointment.email || '',
        dataNascimento: existingAppointment.dataNascimento || '',
        endereco: existingAppointment.endereco || '',
        bairro: existingAppointment.bairro || '',
        cidade: existingAppointment.cidade || 'São Paulo',
        observacoes: ''
      });
      setIsExistingUser(true);
      return true;
    }
    
    if (existingLead) {
      setFormData({
        nome: existingLead.nome || '',
        telefone: telefone,
        email: existingLead.email || '',
        dataNascimento: '',
        endereco: '',
        bairro: '',
        cidade: 'São Paulo',
        observacoes: ''
      });
      setIsExistingUser(true);
      return true;
    }
    
    setIsExistingUser(false);
    setFormData(prev => ({ ...prev, telefone }));
    return false;
  };

  const handleTelefoneSubmit = () => {
    if (!formData.telefone || formData.telefone.replace(/\D/g, '').length < 10) {
      alert('Por favor, digite um número de WhatsApp válido.');
      return;
    }
    
    const isExisting = checkExistingUser(formData.telefone);
    
    if (isExisting) {
      // Usuário já cadastrado - confirma dados e vai escolher horário
      setStep('dados');
    } else {
      // Novo usuário - boas-vindas
      setStep('boas-vindas');
    }
  };

  const generateAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      // Pula domingos (0)
      if (date.getDay() !== 0) {
        dates.push({
          date: date,
          dateStr: date.toISOString().split('T')[0],
          weekDay: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'][date.getDay()],
          day: date.getDate(),
          month: date.getMonth() + 1
        });
      }
    }
    
    setAvailableDates(dates);
  };

  const loadAvailableTimes = (dateStr) => {
    const settings = JSON.parse(localStorage.getItem('adminSettings') || '{"workDays": [1,2,3,4,5,6], "startTime": "08:00", "endTime": "18:00", "breakStart": "12:00", "breakEnd": "13:00"}');
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    
    const selectedDateObj = new Date(dateStr + 'T00:00:00');
    const dayOfWeek = selectedDateObj.getDay();
    
    if (!settings.workDays.includes(dayOfWeek)) {
      setAvailableTimes([]);
      return;
    }

    const bookedTimes = appointments
      .filter(apt => apt.data === dateStr && (apt.status === 'confirmado' || apt.status === 'pendente'))
      .map(apt => apt.horario);

    const times = [];
    const [startHour] = settings.startTime.split(':').map(Number);
    const [endHour] = settings.endTime.split(':').map(Number);
    const [breakStartHour] = settings.breakStart.split(':').map(Number);
    const [breakEndHour] = settings.breakEnd.split(':').map(Number);

    for (let h = startHour; h < endHour; h++) {
      const timeStr = `${String(h).padStart(2, '0')}:00`;
      
      const isBreakTime = h >= breakStartHour && h < breakEndHour;
      const isBooked = bookedTimes.includes(timeStr);
      
      if (!isBreakTime && !isBooked) {
        times.push(timeStr);
      }
    }

    setAvailableTimes(times);
  };

  const checkTimeAvailability = (dateStr, time) => {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const conflict = appointments.some(apt => {
      if (apt.status === 'cancelada') return false;
      return apt.data === dateStr && apt.horario === time;
    });
    
    return !conflict;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateDados = () => {
    return formData.nome && formData.telefone && formData.email;
  };

  const handleNextStep = () => {
    if (step === 'telefone') {
      handleTelefoneSubmit();
    } else if (step === 'boas-vindas') {
      setStep('dados');
    } else if (step === 'dados' && validateDados()) {
      setStep('horario');
    } else if (step === 'horario' && selectedDate && selectedTime) {
      // Verificar disponibilidade antes de confirmar
      checkAndConfirmAvailability();
    }
  };

  const checkAndConfirmAvailability = () => {
    setCheckingAvailability(true);
    
    // Simula verificação em tempo real
    setTimeout(() => {
      const isAvailable = checkTimeAvailability(selectedDate, selectedTime);
      setCheckingAvailability(false);
      
      if (isAvailable) {
        setStep('confirmacao');
      } else {
        alert('😔 Desculpe! Este horário acabou de ser reservado.\n\nPor favor, escolha outro horário disponível.');
        setSelectedTime('');
        // Recarrega horários disponíveis
        loadAvailableTimes(selectedDate);
      }
    }, 800);
  };

  const handleConfirm = () => {
    // Verificação final de disponibilidade
    const isAvailable = checkTimeAvailability(selectedDate, selectedTime);
    
    if (!isAvailable) {
      alert('😔 Desculpe! Este horário acabou de ser reservado.\n\nPor favor, escolha outro horário.');
      setStep('horario');
      setSelectedTime('');
      return;
    }

    const appointment = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      ...formData,
      servico: servico?.nome || servico,
      data: selectedDate,
      horario: selectedTime,
      status: 'pendente',
      dataCriacao: new Date().toISOString(),
      origem: 'site'
    };

    // Salvar no localStorage
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    appointments.push(appointment);
    localStorage.setItem('appointments', JSON.stringify(appointments));

    // Gerar mensagem para WhatsApp
    const dateFormatted = new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    const boasVindas = !isExistingUser 
      ? `Olá Dra. Teiciane! 😊\n\n🎉 Sou novo(a) cliente e gostaria de agendar:\n\n` 
      : `Olá Dra. Teiciane! 😊\n\nGostaria de agendar:\n\n`;
    
    const message = `${boasVindas}✨ *${servico?.nome || servico}*\n📅 ${dateFormatted}\n🕐 ${selectedTime}\n\n━━━━━━━━━━━━━━━━\n👤 Nome: ${formData.nome}\n📱 WhatsApp: ${formData.telefone}${formData.email ? `\n✉️ Email: ${formData.email}` : ''}${formData.dataNascimento ? `\n🎂 Nascimento: ${new Date(formData.dataNascimento).toLocaleDateString('pt-BR')}` : ''}${formData.endereco ? `\n📍 Endereço: ${formData.endereco}, ${formData.bairro} - ${formData.cidade}` : ''}${formData.observacoes ? `\n📝 Obs: ${formData.observacoes}` : ''}\n\n💙 Aguardo sua confirmação!`;
    
    const whatsappLink = `https://wa.me/${WHATSAPP_DOUTORA}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
    
    alert(`✅ Solicitação enviada com sucesso!\n\n${!isExistingUser ? '🎉 Seja bem-vindo(a)! ' : ''}Você será redirecionado para o WhatsApp da Dra. Teiciane.\n\nAguarde a confirmação para garantir seu horário.`);
    
    // Fechar modal após 1 segundo
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  };

  return (
    <div className="agendamento-overlay" onClick={onClose}>
      <div className="agendamento-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        
        <div className="modal-header">
          <h2>Agendar: {servico?.nome || servico}</h2>
          <div className="steps-indicator">
            <div className={`step ${step === 'telefone' ? 'active' : (step !== 'telefone' ? 'completed' : '')}`}>
              <span>1</span> WhatsApp
            </div>
            <div className={`step ${(step === 'boas-vindas' || step === 'dados') ? 'active' : (step === 'horario' || step === 'confirmacao' ? 'completed' : '')}`}>
              <span>2</span> Dados
            </div>
            <div className={`step ${step === 'horario' ? 'active' : (step === 'confirmacao' ? 'completed' : '')}`}>
              <span>3</span> Horário
            </div>
            <div className={`step ${step === 'confirmacao' ? 'active' : ''}`}>
              <span>4</span> Confirmar
            </div>
          </div>
        </div>

        <div className="modal-content">
          {/* PASSO 1: TELEFONE */}
          {step === 'telefone' && (
            <div className="form-step">
              <div className="welcome-header">
                <span className="welcome-icon">📱</span>
                <h3>Primeiro, seu WhatsApp</h3>
              </div>
              
              <p className="step-description">
                Digite seu número de WhatsApp para verificarmos se você já é nosso cliente.
              </p>

              <div className="form-group">
                <label>WhatsApp *</label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={(e) => {
                    const formatted = formatPhone(e.target.value);
                    setFormData(prev => ({ ...prev, telefone: formatted }));
                  }}
                  placeholder="(11) 99999-9999"
                  maxLength="15"
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleTelefoneSubmit()}
                />
              </div>

              <div className="form-actions">
                <button 
                  className="btn-primary full-width"
                  onClick={handleTelefoneSubmit}
                  disabled={!formData.telefone || formData.telefone.replace(/\D/g, '').length < 10}
                >
                  Continuar →
                </button>
              </div>
            </div>
          )}

          {/* PASSO 2: BOAS-VINDAS (NOVOS CLIENTES) */}
          {step === 'boas-vindas' && (
            <div className="form-step welcome-step">
              <div className="welcome-header">
                <span className="welcome-icon">🎉</span>
                <h3>Seja Bem-Vindo(a)!</h3>
              </div>
              
              <p className="welcome-message">
                Que alegria ter você aqui! Vou precisar de algumas informações rápidas para 
                criarmos seu cadastro e agendarmos seu horário.
              </p>

              <div className="welcome-benefits">
                <div className="benefit-item">
                  <span>✨</span>
                  <p>Atendimento personalizado</p>
                </div>
                <div className="benefit-item">
                  <span>🏠</span>
                  <p>No conforto do seu lar</p>
                </div>
                <div className="benefit-item">
                  <span>💙</span>
                  <p>Cuidado profissional</p>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setStep('telefone')}>
                  ← Voltar
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleNextStep}
                >
                  Vamos lá! 🚀
                </button>
              </div>
            </div>
          )}

          {/* PASSO 3: DADOS */}
          {step === 'dados' && (
            <div className="form-step">
              <div className="welcome-header">
                <span className="welcome-icon">📝</span>
                <h3>{isExistingUser ? 'Confirme seus Dados' : 'Complete seu Cadastro'}</h3>
              </div>
              
              {isExistingUser && (
                <div className="info-box success">
                  <p>✅ Que bom te ver novamente, <strong>{formData.nome.split(' ')[0]}</strong>!</p>
                </div>
              )}

              <div className="form-grid">
                <div className="form-group full">
                  <label>Nome Completo *</label>
                  <input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>WhatsApp *</label>
                  <input
                    type="tel"
                    name="telefone"
                    value={formData.telefone}
                    onChange={(e) => {
                      const formatted = formatPhone(e.target.value);
                      setFormData(prev => ({ ...prev, telefone: formatted }));
                    }}
                    placeholder="(11) 99999-9999"
                    required
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label>E-mail *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Data de Nascimento</label>
                  <input
                    type="date"
                    name="dataNascimento"
                    value={formData.dataNascimento}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group full">
                  <label>Endereço (Rua, número)</label>
                  <input
                    type="text"
                    name="endereco"
                    value={formData.endereco}
                    onChange={handleInputChange}
                    placeholder="Ex: Rua das Flores, 123"
                  />
                </div>

                <div className="form-group">
                  <label>Bairro</label>
                  <input
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    placeholder="Nome do bairro"
                  />
                </div>

                <div className="form-group">
                  <label>Cidade</label>
                  <input
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleInputChange}
                    placeholder="São Paulo"
                  />
                </div>

                <div className="form-group full">
                  <label>Observações</label>
                  <textarea
                    name="observacoes"
                    value={formData.observacoes}
                    onChange={handleInputChange}
                    placeholder="Alguma informação importante sobre sua saúde ou necessidade específica..."
                    rows="3"
                  ></textarea>
                </div>
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setStep('telefone')}>
                  ← Voltar
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleNextStep}
                  disabled={!validateDados()}
                >
                  Próximo: Escolher Horário →
                </button>
              </div>
            </div>
          )}

          {/* PASSO 4: HORÁRIO */}
          {step === 'horario' && (
            <div className="horario-step">
              {isExistingUser && (
                <div className="info-box">
                  <p>👋 Olá novamente, <strong>{formData.nome.split(' ')[0]}</strong>! Escolha o melhor horário para você.</p>
                </div>
              )}
              
              <div className="availability-note">
                <span>⚡</span>
                <p>Os horários são verificados em tempo real. Reserve já o seu!</p>
              </div>

              <h3>📅 Escolha a Data</h3>
              <div className="dates-grid">
                {availableDates.slice(0, 14).map((dateObj) => (
                  <button
                    key={dateObj.dateStr}
                    className={`date-card ${selectedDate === dateObj.dateStr ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(dateObj.dateStr)}
                  >
                    <span className="weekday">{dateObj.weekDay}</span>
                    <span className="day">{dateObj.day}</span>
                    <span className="month">{dateObj.month < 10 ? '0' : ''}{dateObj.month}</span>
                  </button>
                ))}
              </div>

              {selectedDate && (
                <>
                  <h3 style={{ marginTop: '2rem' }}>🕐 Escolha o Horário</h3>
                  {availableTimes.length === 0 ? (
                    <p className="no-times">❌ Nenhum horário disponível para esta data. Tente outra data.</p>
                  ) : (
                    <div className="times-grid">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          className={`time-card ${selectedTime === time ? 'selected' : ''}`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </>
              )}

              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setStep('dados')}>
                  ← Voltar
                </button>
                <button 
                  className="btn-primary" 
                  onClick={handleNextStep}
                  disabled={!selectedDate || !selectedTime || checkingAvailability}
                >
                  {checkingAvailability ? '🔄 Verificando...' : 'Confirmar Horário →'}
                </button>
              </div>
            </div>
          )}

          {/* PASSO 5: CONFIRMAÇÃO */}
          {step === 'confirmacao' && (
            <div className="confirmacao-step">
              <div className="success-icon">✅</div>
              <h3>Confirme seu Agendamento</h3>
              
              <div className="resumo-agendamento">
                <div className="resumo-item">
                  <span className="label">👤 Nome:</span>
                  <span className="value">{formData.nome}</span>
                </div>
                <div className="resumo-item">
                  <span className="label">📱 WhatsApp:</span>
                  <span className="value">{formData.telefone}</span>
                </div>
                <div className="resumo-item">
                  <span className="label">📧 E-mail:</span>
                  <span className="value">{formData.email}</span>
                </div>
                <div className="resumo-item">
                  <span className="label">🏥 Serviço:</span>
                  <span className="value">{servico?.nome || servico}</span>
                </div>
                <div className="resumo-item highlight">
                  <span className="label">📅 Data:</span>
                  <span className="value">{new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="resumo-item highlight">
                  <span className="label">🕐 Horário:</span>
                  <span className="value">{selectedTime}</span>
                </div>
                {formData.endereco && (
                  <div className="resumo-item">
                    <span className="label">📍 Endereço:</span>
                    <span className="value">{formData.endereco}, {formData.bairro} - {formData.cidade}</span>
                  </div>
                )}
                {formData.observacoes && (
                  <div className="resumo-item">
                    <span className="label">📝 Observações:</span>
                    <span className="value">{formData.observacoes}</span>
                  </div>
                )}
              </div>

              <div className="info-box warning">
                <p>📱 Ao clicar em "Confirmar", você será direcionado ao WhatsApp da <strong>Dra. Teiciane</strong> com todas as informações preenchidas.</p>
                <p><strong>⚠️ Aguarde a confirmação da Dra. para garantir seu horário!</strong></p>
              </div>

              <div className="form-actions">
                <button className="btn-secondary" onClick={() => setStep('horario')}>
                  ← Voltar
                </button>
                <button className="btn-whatsapp-confirm" onClick={handleConfirm}>
                  💬 Confirmar e Abrir WhatsApp
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AgendamentoModal;
