import React from 'react';


export default function About({ professional }) {
return (
<div className="bg-white p-6 rounded-2xl shadow-sm">
<h2 className="text-2xl font-semibold">Sobre {professional.name}</h2>
<p className="mt-4 text-gray-700 whitespace-pre-line">{professional.bio}</p>


<div className="mt-6">
<h3 className="font-semibold">Formação e atuação</h3>
<ul className="list-disc ml-6 mt-2 text-sm text-gray-700">
<li>Graduação em Fisioterapia — Universidade Exemplo</li>
<li>Especialização em Ortopedia e Traumatologia</li>
<li>Atuação em reabilitação pós-operatória e fisioterapia esportiva</li>
</ul>
</div>
</div>
);
}