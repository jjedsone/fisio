import React from 'react';
import ProfessionalProfile from '../components/ProfessionalProfile';
import Testimonials from '../components/Testimonials';


export default function Home({ professional }) {
return (
<div className="space-y-4">
<ProfessionalProfile professional={professional} />
<Testimonials comments={professional.comments} />
</div>
);
}