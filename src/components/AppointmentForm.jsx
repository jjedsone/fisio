import React, { useState, useEffect } from 'react';


export default function AppointmentForm({ services, days, timeSlots, onCreate }) {
const [selectedService, setSelectedService] = useState(services[0].id);
const [selectedDay, setSelectedDay] = useState(days[0].iso);
const [selectedTime, setSelectedTime] = useState(timeSlots[0]);
const [patientName, setPatientName] = useState('');


useEffect(() => {
setSelectedTime(timeSlots[0]);
}, [timeSlots, selectedDay]);


function handleSubmit(e) {
e.preventDefault();
const service = services.find(s => s.id === selectedService);
const appt = {
id: Date.now(),
day: selectedDay,
time: selectedTime,
serviceId: service.id,
serviceTitle: service.title,
patientName: patientName || 'Paciente (pré-cadastro)'
};
onCreate(appt);
}


return (
<form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-sm">
<h3 className="font-semibold mb-2">Novo agendamento</h3>


<div className="mb-3">
<label className="text-sm">Paciente</label>
<input value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Nome do paciente" className="w-full border rounded p-2" />
</div>


<div className="mb-3">
<label className="text-sm">Tipo de atendimento</label>
<select value={selectedService} onChange={e => setSelectedService(e.target.value)} className="w-full border rounded p-2">
{services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
</select>
</div>


<div className="mb-3">
<label className="text-sm">Dia</label>
<div className="flex gap-2 overflow-x-auto py-2">
{days.map(d => (
<button type="button" key={d.iso} onClick={() => setSelectedDay(d.iso)} className={`min-w-[110px] p-2 rounded ${selectedDay === d.iso ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>
<div className="text-xs">{d.label}</div>
<div className="text-xs">{d.iso}</div>
</button>
))}
</div>
</div>


<div className="mb-3">
<label className="text-sm">Horário</label>
<div className="grid grid-cols-3 gap-2 mt-2">
{timeSlots.map(t => (
<button key={t} type="button" onClick={() => setSelectedTime(t)} className={`p-2 rounded ${selectedTime === t ? 'bg-indigo-600 text-white' : 'bg-gray-100'}`}>
{t}
</button>
))}
</div>
</div>


<div className="flex justify-end">
<button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded">Confirmar</button>
</div>
</form>
);
}