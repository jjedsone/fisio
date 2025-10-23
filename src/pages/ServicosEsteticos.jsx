import React, { useState, useEffect } from 'react';
import './ServicosEsteticos.css';
import AgendamentoModal from '../components/AgendamentoModal';

const ServicosEsteticos = () => {
  const [servicos, setServicos] = useState([]);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [modalOpen, setModalOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState(null);

  useEffect(() => {
    loadServicos();
  }, []);

  const loadServicos = () => {
    const stored = JSON.parse(localStorage.getItem('servicosEsteticos') || '[]');
    
    // Se não houver serviços, adicionar serviços padrão
    if (stored.length === 0) {
      const servicosPadrao = [
        {
          id: 1,
          nome: 'Limpeza de Pele Profunda',
          categoria: 'facial',
          descricao: 'Procedimento que remove impurezas, cravos e células mortas, deixando a pele renovada e saudável.',
          beneficios: ['Desobstrui os poros', 'Remove cravos e impurezas', 'Renova a pele', 'Previne acne'],
          duracao: '60 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/LimpezadePeleProfunda.jpg',
          ativo: true
        },
        {
          id: 2,
          nome: 'Peeling Químico',
          categoria: 'facial',
          descricao: 'Tratamento que promove renovação celular através de ácidos, reduzindo manchas, rugas e melhorando a textura da pele.',
          beneficios: ['Clareia manchas', 'Reduz rugas finas', 'Melhora textura', 'Estimula colágeno'],
          duracao: '45 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/PeelingQuimico.jpg',
          ativo: true
        },
        {
          id: 3,
          nome: 'Microagulhamento',
          categoria: 'facial',
          descricao: 'Técnica que estimula a produção de colágeno através de microperfurações controladas, ideal para rejuvenescimento.',
          beneficios: ['Rejuvenesce a pele', 'Reduz cicatrizes', 'Minimiza poros', 'Aumenta firmeza'],
          duracao: '90 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/Microagulhamento.jpg',
          ativo: true
        },
        {
          id: 4,
          nome: 'Drenagem Linfática Facial',
          categoria: 'facial',
          descricao: 'Massagem específica que reduz inchaço, melhora circulação e proporciona efeito lifting natural.',
          beneficios: ['Reduz inchaço', 'Melhora circulação', 'Efeito lifting', 'Relaxamento profundo'],
          duracao: '50 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/DrenagemLinfaticaFacial.jpg',
          ativo: true
        },
        {
          id: 5,
          nome: 'Drenagem Linfática Corporal',
          categoria: 'corporal',
          descricao: 'Técnica que elimina toxinas, reduz retenção de líquidos e melhora a aparência da pele.',
          beneficios: ['Elimina toxinas', 'Reduz celulite', 'Diminui medidas', 'Sensação de leveza'],
          duracao: '60 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/DrenagemLinfaticaCorporal.jpg',
          ativo: true
        },
        {
          id: 6,
          nome: 'Massagem Relaxante',
          categoria: 'corporal',
          descricao: 'Massagem terapêutica que alivia tensões, reduz estresse e promove bem-estar completo.',
          beneficios: ['Alivia tensões', 'Reduz estresse', 'Melhora sono', 'Bem-estar geral'],
          duracao: '60 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/MassagemRelaxante.jpg',
          ativo: true
        },
        {
          id: 7,
          nome: 'Massagem com Pedras Quentes',
          categoria: 'corporal',
          descricao: 'Terapia que utiliza pedras aquecidas para relaxamento profundo, alívio de dores e equilíbrio energético.',
          beneficios: ['Relaxamento profundo', 'Alivia dores musculares', 'Melhora circulação', 'Equilíbrio energético'],
          duracao: '75 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/MassagemcomPedrasQuentes.jpg',
          ativo: true
        },
        {
          id: 8,
          nome: 'Hidratação Facial Profunda',
          categoria: 'facial',
          descricao: 'Tratamento intensivo que repõe água e nutrientes essenciais, deixando a pele macia e luminosa.',
          beneficios: ['Hidratação intensa', 'Pele macia', 'Luminosidade', 'Anti-idade'],
          duracao: '50 minutos',
          preco: 'Consulte',
          imagem: '/images/servicos/HidratacaoFacialProfunda.jpg',
          ativo: true
        }
      ];
      
      localStorage.setItem('servicosEsteticos', JSON.stringify(servicosPadrao));
      setServicos(servicosPadrao);
    } else {
      setServicos(stored);
    }
  };

  const servicosFiltrados = filtroCategoria === 'todos' 
    ? servicos.filter(s => s.ativo)
    : servicos.filter(s => s.categoria === filtroCategoria && s.ativo);

  const categorias = [
    { id: 'todos', nome: 'Todos os Serviços', icon: '✨' },
    { id: 'facial', nome: 'Tratamentos Faciais', icon: '💆‍♀️' },
    { id: 'corporal', nome: 'Tratamentos Corporais', icon: '💆' }
  ];

  const handleAgendar = (servico) => {
    setServicoSelecionado(servico);
    setModalOpen(true);
  };

  return (
    <div className="servicos-esteticos">
      {/* Hero Section */}
      <section className="esteticos-hero">
        <div className="container">
          <div className="hero-content-esteticos">
            <h1 className="hero-title-esteticos">Serviços Estéticos</h1>
            <p className="hero-subtitle-esteticos">
              Tratamentos profissionais para realçar sua beleza natural e bem-estar
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-buttons">
            {categorias.map(cat => (
              <button
                key={cat.id}
                className={`filter-btn ${filtroCategoria === cat.id ? 'active' : ''}`}
                onClick={() => setFiltroCategoria(cat.id)}
              >
                <span className="filter-icon">{cat.icon}</span>
                {cat.nome}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="services-section">
        <div className="container">
          {servicosFiltrados.length === 0 ? (
            <div className="no-services">
              <p>📋 Nenhum serviço disponível nesta categoria</p>
            </div>
          ) : (
            <div className="services-grid-esteticos">
              {servicosFiltrados.map(servico => (
                <div key={servico.id} className="service-card-estetico">
                  <div className="service-image-container">
                    <img 
                      src={servico.imagem} 
                      alt={servico.nome}
                      className="service-image"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23667eea" width="400" height="300"/%3E%3Ctext fill="white" font-size="40" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3E✨%3C/text%3E%3C/svg%3E';
                      }}
                    />
                    <div className="service-overlay">
                      <span className="service-duracao">🕐 {servico.duracao}</span>
                    </div>
                  </div>
                  
                  <div className="service-content">
                    <h3 className="service-name">{servico.nome}</h3>
                    <p className="service-categoria">
                      {servico.categoria === 'facial' ? '💆‍♀️ Facial' : '💆 Corporal'}
                    </p>
                    <p className="service-descricao">{servico.descricao}</p>
                    
                    <div className="service-beneficios">
                      <h4>Benefícios:</h4>
                      <ul>
                        {servico.beneficios.map((beneficio, index) => (
                          <li key={index}>✓ {beneficio}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="service-footer">
                      <span className="service-preco">{servico.preco}</span>
                      <button 
                        className="btn-agendar"
                        onClick={() => handleAgendar(servico)}
                      >
                        Agendar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-esteticos">
        <div className="container">
          <div className="cta-content">
            <h2>Pronta para realçar sua beleza?</h2>
            <p>Entre em contato e agende seu horário!</p>
            <a 
              href="https://wa.me/5511999999999?text=Olá! Gostaria de conhecer os serviços estéticos"
              className="btn-cta-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              💬 Agendar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Modal de Agendamento */}
      {modalOpen && (
        <AgendamentoModal 
          servico={servicoSelecionado}
          onClose={() => {
            setModalOpen(false);
            setServicoSelecionado(null);
          }}
        />
      )}
    </div>
  );
};

export default ServicosEsteticos;

