import React, { useState } from 'react';
import './App.css';
import Chatbot from './components/Chatbot';
import AdminPanel from './components/AdminPanel';
import ServicosEsteticos from './pages/ServicosEsteticos';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo(0, 0);
  };

return (
    <div className="App">
      {currentPage === 'esteticos' ? (
        <>
          {/* Header */}
          <header className="header">
            <div className="container">
              <div className="header-content">
                <div className="logo" onClick={() => navigateTo('home')} style={{ cursor: 'pointer' }}>
                  <h1>Dra. Teiciane Ramalho</h1>
                  <span className="logo-subtitle">Fisioterapeuta</span>
                </div>
                <button 
                  className="menu-toggle" 
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Menu"
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                  <a href="#inicio" onClick={() => { navigateTo('home'); scrollToSection('inicio'); }}>Início</a>
                  <a href="#sobre" onClick={() => { navigateTo('home'); scrollToSection('sobre'); }}>Sobre Mim</a>
                  <a href="#servicos" onClick={() => { navigateTo('home'); scrollToSection('servicos'); }}>Fisioterapia</a>
                  <a href="#esteticos" onClick={() => navigateTo('esteticos')}>Estética</a>
                  <a href="#depoimentos" onClick={() => { navigateTo('home'); scrollToSection('depoimentos'); }}>Depoimentos</a>
                  <a href="#contato" onClick={() => { navigateTo('home'); scrollToSection('contato'); }}>Contato</a>
                </nav>
              </div>
            </div>
          </header>

          <ServicosEsteticos />

          {/* Footer */}
          <footer className="footer">
            <div className="container">
              <div className="footer-content">
                <div className="footer-section">
                  <h3>Dra. Teiciane Ramalho</h3>
                  <p>Fisioterapeuta CREFITO-3: 123456-F</p>
                  <p className="footer-desc">
                    Fisioterapeuta (UNIVOVE 2021), Instrutora de Pilates e pós-graduanda em 
                    Fisioterapia Dermatofuncional. Atendimento domiciliar personalizado e humanizado, 
                    com foco em reabilitação, estética e bem-estar.
                  </p>
                </div>
                <div className="footer-section">
                  <h4>Links Rápidos</h4>
                  <nav className="footer-nav">
                    <a href="#inicio" onClick={() => { navigateTo('home'); scrollToSection('inicio'); }}>Início</a>
                    <a href="#sobre" onClick={() => { navigateTo('home'); scrollToSection('sobre'); }}>Sobre Mim</a>
                    <a href="#servicos" onClick={() => { navigateTo('home'); scrollToSection('servicos'); }}>Fisioterapia</a>
                    <a href="#esteticos" onClick={() => navigateTo('esteticos')}>Estética</a>
                    <a href="#depoimentos" onClick={() => { navigateTo('home'); scrollToSection('depoimentos'); }}>Depoimentos</a>
                    <a href="#contato" onClick={() => { navigateTo('home'); scrollToSection('contato'); }}>Contato</a>
                  </nav>
                </div>
                <div className="footer-section">
                  <h4>Contato</h4>
                  <p>📱 (11) 94854-1086</p>
                  <p>✉️ drateiciane.fisio@email.com</p>
                  <p>📍 São Paulo - SP</p>
                  <div className="footer-social">
                    <a href="https://instagram.com/dra.teicianeramalho" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                      📷 Instagram
                    </a>
                    <a href="https://wa.me/5511948541086?text=Olá%20Dra.%20Teiciane!%20😊%20Vim%20pelo%20seu%20site." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                      💬 WhatsApp
                    </a>
                  </div>
                </div>
              </div>
              <div className="footer-bottom">
                <p>&copy; 2024 Dra. Teiciane Ramalho - Fisioterapeuta. Todos os direitos reservados.</p>
                <button 
                  className="admin-access-btn"
                  onClick={() => setAdminPanelOpen(true)}
                  title="Acesso Administrativo"
                >
                  ⚙️
                </button>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>Dra. Teiciane Ramalho</h1>
              <span className="logo-subtitle">Fisioterapeuta</span>
            </div>
            <button 
              className="menu-toggle" 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
              <a href="#inicio" onClick={() => { navigateTo('home'); scrollToSection('inicio'); }}>Início</a>
              <a href="#sobre" onClick={() => { navigateTo('home'); scrollToSection('sobre'); }}>Sobre Mim</a>
              <a href="#servicos" onClick={() => { navigateTo('home'); scrollToSection('servicos'); }}>Fisioterapia</a>
              <a href="#esteticos" onClick={() => navigateTo('esteticos')}>Estética</a>
              <a href="#galeria" onClick={() => { navigateTo('home'); scrollToSection('galeria'); }}>Galeria</a>
              <a href="#depoimentos" onClick={() => { navigateTo('home'); scrollToSection('depoimentos'); }}>Depoimentos</a>
              <a href="#contato" onClick={() => { navigateTo('home'); scrollToSection('contato'); }}>Contato</a>
</nav>
          </div>
</div>
</header>

      {/* Hero Section */}
      <section id="inicio" className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">CREFITO-3: 123456-F</div>
            <h2 className="hero-title">Fisioterapia Domiciliar em São Paulo</h2>
            <p className="hero-subtitle">Atendimento especializado e personalizado no conforto da sua casa</p>
            <div className="hero-cta">
              <a 
                href="https://wa.me/5511948541086?text=Olá%20Dra.%20Teiciane!%20😊%0A%0AVi%20seu%20site%20e%20gostaria%20de%20agendar%20uma%20avaliação%20de%20fisioterapia%20domiciliar.%0A%0APodemos%20conversar%3F" 
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Agende sua Avaliação
              </a>
              <p className="hero-phone">📱 (11) 94854-1086</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="sobre" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-image">
              <div className="profile-photo">
                <img 
                  src="../images/dra-teiciane-ramalho.jpg" 
                  alt="Dra. Teiciane Ramalho - Fisioterapeuta"
                  className="profile-img"
                />
              </div>
            </div>
            <div className="about-text-content">
              <h2 className="section-title">Sobre Mim</h2>
              <h3 className="about-subtitle">Cuidando da sua saúde com dedicação e profissionalismo</h3>
              <p className="about-text">
                Olá! Meu nome é Teiciane Ramalho, sou fisioterapeuta formada em 2021 pela UNIVOVE, 
                com experiência em reabilitação e promoção da saúde por meio de uma abordagem personalizada 
                e humanizada.
              </p>
              <p className="about-text">
                Em 2024, concluí o curso de Instrutora de Pilates, o que me permitiu integrar o método 
                aos atendimentos fisioterapêuticos, proporcionando melhora na postura, força, flexibilidade 
                e qualidade de vida dos pacientes.
              </p>
              <p className="about-text">
                Atualmente, estou cursando pós-graduação em Fisioterapia Dermatofuncional (2025–2026), 
                área que une reabilitação, estética e funcionalidade, com foco em tratamentos para 
                disfunções corporais e cuidados com a pele.
              </p>
              <p className="about-text">
                Realizo atendimentos em home care, levando a fisioterapia até o conforto e segurança do 
                lar do paciente. Essa modalidade permite um acompanhamento mais próximo, personalizado e 
                adaptado à rotina e ao ambiente de cada pessoa, garantindo praticidade sem abrir mão da 
                qualidade do tratamento.
              </p>
              <p className="about-text">
                Meu propósito é cuidar com empatia, profissionalismo e dedicação, ajudando cada paciente 
                a alcançar o equilíbrio entre corpo, mente e bem-estar.
              </p>
              <div className="credentials">
                <div className="credential-item">
                  <span className="credential-icon">🎓</span>
                  <div>
                    <strong>Formação</strong>
                    <p>Fisioterapia - UNIVOVE (2021)</p>
                  </div>
                </div>
                <div className="credential-item">
                  <span className="credential-icon">🧘</span>
                  <div>
                    <strong>Pilates</strong>
                    <p>Instrutora de Pilates (2024)</p>
                  </div>
                </div>
                <div className="credential-item">
                  <span className="credential-icon">📜</span>
                  <div>
                    <strong>Pós-Graduação</strong>
                    <p>Fisioterapia Dermatofuncional (em andamento)</p>
                  </div>
                </div>
                <div className="credential-item">
                  <span className="credential-icon">🏠</span>
                  <div>
                    <strong>Atendimento</strong>
                    <p>Home Care - Atendimento Domiciliar</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="benefits">
        <div className="container">
          <h2 className="section-title">Por Que Escolher Atendimento Domiciliar?</h2>
          <p className="section-subtitle">Vantagens de receber tratamento no conforto do seu lar</p>
          <div className="benefits-grid">
            <div className="benefit-card">
              <div className="benefit-icon">🏠</div>
              <h3>Conforto Total</h3>
              <p>Tratamento no ambiente familiar, sem estresse de deslocamento.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">❤️</div>
              <h3>Atendimento Humanizado</h3>
              <p>Maior proximidade e envolvimento da família no processo.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>100% Personalizado</h3>
              <p>Tratamento exclusivo focado nas suas necessidades específicas.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🛡️</div>
              <h3>Mais Segurança</h3>
              <p>Redução do risco de infecções e maior proteção.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">📅</div>
              <h3>Horários Flexíveis</h3>
              <p>Agendamento de acordo com sua disponibilidade.</p>
            </div>
            <div className="benefit-card">
              <div className="benefit-icon">🔧</div>
              <h3>Equipamentos Inclusos</h3>
              <p>Levo todos os recursos necessários para o tratamento.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process">
        <div className="container">
          <h2 className="section-title">Como Funciona o Atendimento</h2>
          <p className="section-subtitle">Processo simples e descomplicado</p>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Entre em Contato</h3>
              <p>Entre em contato via WhatsApp ou telefone. Tirarei todas as suas dúvidas e entenderei suas necessidades.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Agende sua Avaliação</h3>
              <p>Escolhemos juntos o melhor dia e horário para a primeira consulta, adequando à sua rotina.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Início do Tratamento</h3>
              <p>Realizo avaliação completa e já iniciamos os exercícios com plano personalizado.</p>
            </div>
          </div>
        </div>
</section>

      {/* Services Section */}
      <section id="servicos" className="services">
        <div className="container">
          <h2 className="section-title">Minhas Especialidades</h2>
          <p className="section-subtitle">Atendimento especializado em diversas áreas</p>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">👴</div>
              <h3>Fisioterapia Geriátrica</h3>
              <p>Tratamento focado em melhorar mobilidade, equilíbrio e qualidade de vida dos idosos. Prevenção de quedas e promoção da independência.</p>
              <ul className="service-list">
                <li>✓ Fortalecimento muscular</li>
                <li>✓ Treino de equilíbrio</li>
                <li>✓ Prevenção de quedas</li>
                <li>✓ Melhora da mobilidade</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🧠</div>
              <h3>Fisioterapia Neurológica</h3>
              <p>Reabilitação especializada para pacientes pós-AVC, Parkinson, Alzheimer e outras condições neurológicas.</p>
              <ul className="service-list">
                <li>✓ Recuperação pós-AVC</li>
                <li>✓ Parkinson e Alzheimer</li>
                <li>✓ Melhora da coordenação</li>
                <li>✓ Recuperação motora</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🦴</div>
              <h3>Fisioterapia Ortopédica</h3>
              <p>Tratamento de lesões musculoesqueléticas, fraturas, pós-operatório e dores crônicas.</p>
              <ul className="service-list">
                <li>✓ Pós-operatório</li>
                <li>✓ Fraturas e entorses</li>
                <li>✓ Dores articulares</li>
                <li>✓ Reabilitação completa</li>
              </ul>
            </div>
            <div className="service-card">
              <div className="service-icon">🏥</div>
              <h3>Fisioterapia Respiratória</h3>
              <p>Tratamento para melhorar a função respiratória e qualidade de vida de pacientes com doenças respiratórias.</p>
              <ul className="service-list">
                <li>✓ Doenças pulmonares</li>
                <li>✓ Exercícios respiratórios</li>
                <li>✓ Melhora da capacidade</li>
                <li>✓ Higiene brônquica</li>
              </ul>
            </div>
          </div>
          <div className="section-cta">
            <a 
              href="https://wa.me/5511948541086?text=Olá%20Dra.%20Teiciane!%20😊%0A%0ATenho%20interesse%20em%20saber%20mais%20sobre%20suas%20especialidades%20em%20fisioterapia.%0A%0APoderia%20me%20explicar%20melhor%20sobre%20os%20tratamentos%3F" 
              className="btn btn-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Fale Comigo no WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section - Galeria de Trabalhos */}
      <section id="galeria" className="gallery">
        <div className="container">
          <h2 className="section-title">Galeria de Trabalhos</h2>
          <p className="section-subtitle">Conheça alguns dos nossos resultados e tratamentos</p>
          
          <div className="gallery-grid">
            {/* Card 1 - Fisioterapia */}
            <div className="gallery-card">
              <div className="gallery-image">
                <img 
                  src="/images/trabalhos/trabalho-1.jpg" 
                  alt="Tratamento de fisioterapia"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/e3f2fd/1976d2?text=Fisioterapia+1';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Fisioterapia</span>
                </div>
              </div>
              <div className="gallery-content">
                <h3>Reabilitação Pós-Operatória</h3>
                <p>Tratamento de reabilitação completa com exercícios personalizados e acompanhamento contínuo para recuperação funcional.</p>
                <span className="gallery-date">📅 Janeiro 2025</span>
              </div>
            </div>

            {/* Card 2 - Fisioterapia */}
            <div className="gallery-card">
              <div className="gallery-image">
                <img 
                  src="/images/trabalhos/trabalho-2.jpg" 
                  alt="Tratamento de fisioterapia"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/e3f2fd/1976d2?text=Fisioterapia+2';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Fisioterapia</span>
                </div>
              </div>
              <div className="gallery-content">
                <h3>Fisioterapia Neurológica</h3>
                <p>Reabilitação neurológica com foco em recuperação de movimentos e coordenação motora do paciente.</p>
                <span className="gallery-date">📅 Fevereiro 2025</span>
              </div>
            </div>

            {/* Card 3 - Pilates */}
            <div className="gallery-card">
              <div className="gallery-image">
                <img 
                  src="/images/trabalhos/trabalho-3.jpg" 
                  alt="Sessão de Pilates"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/f3e5f5/7b1fa2?text=Pilates+1';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Pilates</span>
                </div>
              </div>
              <div className="gallery-content">
                <h3>Pilates - Fortalecimento do Core</h3>
                <p>Aula de Pilates focada em fortalecimento abdominal, melhora postural e aumento da flexibilidade.</p>
                <span className="gallery-date">📅 Dezembro 2024</span>
              </div>
            </div>

            {/* Card 4 - Pilates */}
            <div className="gallery-card">
              <div className="gallery-image">
                <img 
                  src="/images/trabalhos/trabalho-4.jpg" 
                  alt="Sessão de Pilates"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/f3e5f5/7b1fa2?text=Pilates+2';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Pilates</span>
                </div>
              </div>
              <div className="gallery-content">
                <h3>Pilates Terapêutico</h3>
                <p>Sessão individual de Pilates com foco em reabilitação e alívio de dores crônicas na coluna.</p>
                <span className="gallery-date">📅 Novembro 2024</span>
              </div>
            </div>

            {/* Card 5 - Estética */}
            <div className="gallery-card">
              <div className="gallery-image">
                <img 
                  src="/images/trabalhos/trabalho-5.jpg" 
                  alt="Tratamento estético"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/e8f5e9/388e3c?text=Estetica';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Estética</span>
                </div>
              </div>
              <div className="gallery-content">
                <h3>Tratamento Dermatofuncional</h3>
                <p>Procedimento estético facial com técnicas de fisioterapia dermatofuncional para rejuvenescimento e cuidados com a pele.</p>
                <span className="gallery-date">📅 Outubro 2024</span>
              </div>
            </div>

            {/* Card 6 - Home Care */}
            <div className="gallery-card">
              <div className="gallery-image">
                <img 
                  src="/images/trabalhos/trabalho-6.jpg" 
                  alt="Atendimento domiciliar"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300/fff3e0/f57c00?text=Home+Care';
                  }}
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">Home Care</span>
                </div>
              </div>
              <div className="gallery-content">
                <h3>Atendimento Domiciliar</h3>
                <p>Fisioterapia no conforto e segurança do lar, com todos os equipamentos necessários para tratamento completo.</p>
                <span className="gallery-date">📅 Setembro 2024</span>
              </div>
            </div>
          </div>

          <div className="gallery-info">
            <p className="gallery-note">
              ⚠️ <strong>Importante:</strong> As fotos dos pacientes são compartilhadas apenas com autorização prévia 
              e seguem todas as normas de privacidade e ética profissional.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="testimonials">
        <div className="container">
          <h2 className="section-title">O Que Meus Pacientes Dizem</h2>
          <p className="section-subtitle">Depoimentos reais de quem confia no meu trabalho</p>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                "A Dra. Teiciane é extremamente dedicada e competente. Minha mãe teve AVC e a recuperação dela 
                foi incrível com os atendimentos domiciliares. Sempre pontual e muito atenciosa. Super recomendo!"
              </p>
              <p className="testimonial-author">Michelle Esteves</p>
              <span className="testimonial-relation">Filha de paciente</span>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                "Profissional excepcional! Trato meu joelho com ela há 6 meses e já sinto uma diferença enorme. 
                A conveniência de ser atendida em casa e a qualidade do tratamento fizeram toda a diferença."
              </p>
              <p className="testimonial-author">Roberto Silva</p>
              <span className="testimonial-relation">Paciente</span>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                "Meu pai tem Parkinson e a Dra. Teiciane conseguiu melhorar muito a mobilidade dele. 
                É uma profissional humana, paciente e muito competente. Gratidão por todo cuidado!"
              </p>
              <p className="testimonial-author">Raquel Alves</p>
              <span className="testimonial-relation">Filha de paciente</span>
            </div>
            <div className="testimonial-card">
              <div className="stars">★★★★★</div>
              <p className="testimonial-text">
                "Depois da cirurgia de quadril, a Dra. Teiciane foi essencial na minha recuperação. 
                Atendimento personalizado, exercícios eficazes e muita dedicação. Excelente profissional!"
              </p>
              <p className="testimonial-author">Ana Paula Costa</p>
              <span className="testimonial-relation">Paciente</span>
            </div>
          </div>
        </div>
</section>

      {/* FAQ Section */}
      <section className="faq">
        <div className="container">
          <h2 className="section-title">Perguntas Frequentes</h2>
          <p className="section-subtitle">Tire suas dúvidas sobre o atendimento</p>
          <div className="faq-list">
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 0 ? 'active' : ''}`}
                onClick={() => toggleFaq(0)}
              >
                <span>Como funciona a primeira consulta?</span>
                <span className="faq-icon">{openFaq === 0 ? '−' : '+'}</span>
              </button>
              {openFaq === 0 && (
                <div className="faq-answer">
                  <p>
                    Na primeira consulta, realizo uma avaliação completa para entender suas necessidades, 
                    histórico médico e objetivos do tratamento. Traço um plano terapêutico personalizado 
                    e já iniciamos os primeiros exercícios. A sessão dura cerca de 60 minutos e levo todos 
                    os equipamentos necessários.
                  </p>
                </div>
              )}
            </div>
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 1 ? 'active' : ''}`}
                onClick={() => toggleFaq(1)}
              >
                <span>Quais regiões de São Paulo você atende?</span>
                <span className="faq-icon">{openFaq === 1 ? '−' : '+'}</span>
              </button>
              {openFaq === 1 && (
                <div className="faq-answer">
                  <p>
                    Atendo principalmente na Zona Sul de São Paulo (Vila Mariana, Moema, Brooklin, Jabaquara, 
                    Santo Amaro). Para outras regiões, entre em contato para verificar disponibilidade. 
                    Estou sempre buscando formas de atender mais pacientes.
                  </p>
                </div>
              )}
            </div>
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 2 ? 'active' : ''}`}
                onClick={() => toggleFaq(2)}
              >
                <span>Você atende nos finais de semana?</span>
                <span className="faq-icon">{openFaq === 2 ? '−' : '+'}</span>
              </button>
              {openFaq === 2 && (
                <div className="faq-answer">
                  <p>
                    Sim! Trabalho com horários flexíveis, incluindo finais de semana e horários diferenciados 
                    para melhor atender às necessidades dos meus pacientes. Entre em contato para verificar 
                    a disponibilidade de horários.
                  </p>
                </div>
              )}
            </div>
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 3 ? 'active' : ''}`}
                onClick={() => toggleFaq(3)}
              >
                <span>Qual o valor da sessão?</span>
                <span className="faq-icon">{openFaq === 3 ? '−' : '+'}</span>
              </button>
              {openFaq === 3 && (
                <div className="faq-answer">
                  <p>
                    Os valores variam de acordo com a especialidade, frequência de atendimentos e localização. 
                    Entre em contato via WhatsApp ou telefone para receber um orçamento personalizado. 
                    Trabalho também com pacotes de sessões com valores especiais.
                  </p>
                </div>
              )}
            </div>
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 4 ? 'active' : ''}`}
                onClick={() => toggleFaq(4)}
              >
                <span>Você aceita convênios médicos?</span>
                <span className="faq-icon">{openFaq === 4 ? '−' : '+'}</span>
              </button>
              {openFaq === 4 && (
                <div className="faq-answer">
                  <p>
                    Trabalho como profissional particular, mas forneço recibos detalhados que podem ser 
                    utilizados para reembolso junto ao seu plano de saúde, caso ele cubra atendimentos 
                    domiciliares. Consulte seu convênio sobre a política de reembolso.
                  </p>
                </div>
              )}
            </div>
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 5 ? 'active' : ''}`}
                onClick={() => toggleFaq(5)}
              >
                <span>Quantas sessões são necessárias?</span>
                <span className="faq-icon">{openFaq === 5 ? '−' : '+'}</span>
              </button>
              {openFaq === 5 && (
                <div className="faq-answer">
                  <p>
                    O número de sessões varia de acordo com cada caso, objetivos do tratamento e evolução 
                    do paciente. Na primeira avaliação, traço um plano terapêutico estimando a quantidade 
                    e frequência ideal de sessões. Alguns casos podem necessitar de 10-20 sessões, enquanto 
                    outros podem precisar de acompanhamento contínuo.
                  </p>
                </div>
              )}
            </div>
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 6 ? 'active' : ''}`}
                onClick={() => toggleFaq(6)}
              >
                <span>Preciso ter equipamentos em casa?</span>
                <span className="faq-icon">{openFaq === 6 ? '−' : '+'}</span>
              </button>
              {openFaq === 6 && (
                <div className="faq-answer">
                  <p>
                    Não! Levo todos os equipamentos e materiais necessários para a sessão. Você só precisa 
                    de um espaço adequado para realizarmos os exercícios. Em alguns casos específicos, 
                    posso orientar sobre equipamentos que podem auxiliar no tratamento diário.
                  </p>
                </div>
              )}
            </div>
            <div className="faq-item">
              <button 
                className={`faq-question ${openFaq === 7 ? 'active' : ''}`}
                onClick={() => toggleFaq(7)}
              >
                <span>Como posso agendar uma consulta?</span>
                <span className="faq-icon">{openFaq === 7 ? '−' : '+'}</span>
              </button>
              {openFaq === 7 && (
                <div className="faq-answer">
                  <p>
                    É muito simples! Você pode me chamar diretamente no WhatsApp (11) 94854-1086 ou ligar 
                    no mesmo número. Terei prazer em esclarecer suas dúvidas e agendar sua primeira avaliação 
                    no melhor horário para você.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contato" className="contact">
        <div className="container">
          <h2 className="section-title">Vamos Conversar?</h2>
          <p className="section-subtitle">Entre em contato e agende sua avaliação</p>
          <div className="contact-content">
            <a 
              href="https://wa.me/5511948541086?text=Olá%20Dra.%20Teiciane!%20😊%0A%0AEstou%20entrando%20em%20contato%20através%20do%20seu%20site.%0A%0AGostaria%20de%20conversar%20sobre%20fisioterapia%20domiciliar." 
              className="btn btn-whatsapp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>💬</span> Chamar no WhatsApp
            </a>
            <p className="contact-or">ou</p>
            <p className="contact-phone">📱 (11) 94854-1086</p>
            <p className="contact-email">✉️ drateiciane.fisio@email.com</p>
          </div>
          <div className="contact-info">
            <p>📍 Atendimento domiciliar em São Paulo - SP</p>
            <p>🕐 Segunda a Sábado - Horários flexíveis</p>
          </div>
        </div>
</section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Dra. Teiciane Ramalho</h3>
              <p>Fisioterapeuta CREFITO-3: 123456-F</p>
              <p className="footer-desc">
                Fisioterapeuta (UNIVOVE 2021), Instrutora de Pilates e pós-graduanda em 
                Fisioterapia Dermatofuncional. Atendimento domiciliar personalizado e humanizado.
              </p>
            </div>
            <div className="footer-section">
              <h4>Links Rápidos</h4>
              <nav className="footer-nav">
                <a href="#inicio" onClick={() => { navigateTo('home'); scrollToSection('inicio'); }}>Início</a>
                <a href="#sobre" onClick={() => { navigateTo('home'); scrollToSection('sobre'); }}>Sobre Mim</a>
                <a href="#servicos" onClick={() => { navigateTo('home'); scrollToSection('servicos'); }}>Fisioterapia</a>
                <a href="#esteticos" onClick={() => navigateTo('esteticos')}>Estética</a>
                <a href="#depoimentos" onClick={() => { navigateTo('home'); scrollToSection('depoimentos'); }}>Depoimentos</a>
                <a href="#contato" onClick={() => { navigateTo('home'); scrollToSection('contato'); }}>Contato</a>
              </nav>
            </div>
            <div className="footer-section">
              <h4>Contato</h4>
              <p>📱 (11)  94854-1086</p>
              <p>✉️ drateiciane.fisio@email.com</p>
              <p>📍 São Paulo - SP</p>
              <div className="footer-social">
                <a href="https://instagram.com/dra.teicianeramalho" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  📷 Instagram
                </a>
                <a href="https://wa.me/5511948541086?text=Olá%20Dra.%20Teiciane!%20😊%20Vim%20pelo%20seu%20site." target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Dra. Teiciane Ramalho - Fisioterapeuta. Todos os direitos reservados.</p>
            <button 
              className="admin-access-btn"
              onClick={() => setAdminPanelOpen(true)}
              title="Acesso Administrativo"
            >
              ⚙️
            </button>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      {chatbotOpen && <Chatbot onClose={() => setChatbotOpen(false)} />}
      
      {!chatbotOpen && (
        <button 
          className="chatbot-float-button"
          onClick={() => setChatbotOpen(true)}
          title="Agendar Consulta"
        >
          💬
        </button>
      )}

      {/* Admin Panel */}
      {adminPanelOpen && <AdminPanel onClose={() => setAdminPanelOpen(false)} />}
        </>
      )}
</div>
);
}

export default App;
