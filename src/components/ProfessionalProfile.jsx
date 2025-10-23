import React from 'react';


export default function ProfessionalProfile({ professional }) {
return (
<div className="bg-white p-4 rounded-2xl shadow-sm">
<div className="flex gap-4 items-center">
<img src={professional.photo} alt="Foto da profissional" className="w-28 h-28 rounded-full object-cover shadow" />
<div>
<h2 className="text-xl font-semibold">{professional.name}</h2>
<p className="text-sm text-gray-700">{professional.role}</p>
</div>
</div>


<div className="mt-4 text-gray-700 text-sm whitespace-pre-line">{professional.bio}</div>


<div className="mt-4">
<h3 className="font-medium">Galeria</h3>
<div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
{professional.gallery.map((g, i) => (
<img key={i} src={g} alt={`galeria-${i}`} className="w-full h-28 object-cover rounded-md" />
))}
</div>
</div>
</div>
);
}