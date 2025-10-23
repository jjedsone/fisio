import React from 'react';


export default function Testimonials({ comments }) {
return (
<div className="bg-white p-4 rounded-2xl shadow-sm mt-4">
<h3 className="font-semibold mb-2">Depoimentos</h3>
<ul className="space-y-2 text-gray-700 text-sm">
{comments.map(c => (
<li key={c.id} className="border-l-2 border-gray-200 pl-3"> <strong>{c.author}:</strong> {c.text}</li>
))}
</ul>
</div>
);
}