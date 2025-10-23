export const PROFESSIONAL = {
    name: 'Dra. Mariana Silva',
    role: 'Fisioterapeuta — Ortopedia e Reabilitação',
    photo: 'https://via.placeholder.com/400x400?text=Foto+Profissional',
    bio: `Dra. Mariana Silva é fisioterapeuta com mais de dez anos de experiência na área de
    reabilitação pós-operatória, terapias manuais e fisioterapia esportiva. Preza pelo
    atendimento humanizado, fundamentado em protocolos cientificamente embasados e
    práticas consolidadas ao longo de sua carreira. Atua com rigor técnico e compromisso
    com a recuperação funcional do paciente.`,
    gallery: [
    'https://via.placeholder.com/600x400?text=Atendimento+1',
    'https://via.placeholder.com/600x400?text=Atendimento+2',
    'https://via.placeholder.com/600x400?text=Equipamento'
    ],
    comments: [
    { id: 1, author: 'Carlos M.', text: 'Atendimento de excelência; demonstrou conhecimento técnico e postura profissional.' },
    { id: 2, author: 'Ana P.', text: 'Evoluí muito em poucas sessões. Ambiente organizado e acolhedor.' }
    ]
    };
    
    
    export const SERVICES = [
    { id: 'av', title: 'Avaliação Inicial — 60 min', price: 'R$150' },
    { id: 'ses', title: 'Sessão de Fisioterapia — 45 min', price: 'R$120' },
    { id: 'mass', title: 'Massoterapia — 30 min', price: 'R$80' }
    ];
    
    
    // Simula armazenamento local de agendamentos
    let APPOINTMENTS = [];
    
    
    export function fetchAppointments() {
    return Promise.resolve(APPOINTMENTS);
    }
    
    
    export function createAppointment(appt) {
    APPOINTMENTS.push(appt);
    return Promise.resolve(appt);
    }
    
    
    export function deleteAppointment(id) {
    APPOINTMENTS = APPOINTMENTS.filter(a => a.id !== id);
    return Promise.resolve(true);
    }