import React, { useEffect, useState } from 'react';
import AppointmentForm from '../components/AppointmentForm';
import Chatbot from '../components/Chatbot';
import { fetchAppointments, createAppointment, deleteAppointment } from '../api/mockData';


function getNextDays(count = 14) {
const days = [];
const now = new Date();
for (let i = 0; i < count; i++) {
const d = new Date(now);
d.setDate(now.getDate() + i);
days.push({ iso: d.toISOString().slice(0, 10), label: d.toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' }) });
}
return days;
}


export default function Schedule({ services, timeSlots }) {
const [appointments, setAppointments] = useState([]);
const days = getNextDays(14);


useEffect(() => {
fetchAppointments().then(setAppointments);
}, []);


function handleCreate(appt) {
createAppointment(appt).then(a => setAppointments(prev => [...prev, a]));
}


function handleDelete(id) {
deleteAppointment(id).then(() => setAppointments(prev => prev.filter(p => p.id !== id)));
}


return (
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
<div className="lg:col-span-2 space-y-4">
<AppointmentForm services={services} days={days} timeSlots={timeSlots} onCreate={handleCreate} />


<div className="bg-white p-4 rounded-2xl shadow-sm">
<h3 className="font-semibold mb-2">Agendamentos marcados</h3>
<ul className="space-y-2 text-sm text-gray-700">
{appointments.length === 0 && <li>Nenhum agendamento encontrado.</li>}
{appointments.map(a => (
<li key={a.id} className="flex items-center justify-between border rounded-md p-2">
<div>
<div className="font-medium">{a.serviceTitle}</div>
<div className="text-xs text-gray-600">{a.day} — {a.time} — {a.patientName}</div>
</div>
<div>
<button onClick={() => handleDelete(a.id)} className="px-3 py-1 border rounded">Cancelar</button>
</div>
</li>
))}
</ul>
</div>
</div>


<aside>
<Chatbot services={services} />
</aside>
</div>
);
}