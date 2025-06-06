import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Avatar icon

const testimonials = [
    {
        name: 'Priya Sharma',
        rating: 5,
        text: 'Absolutely delicious and feels just like home food. The delivery is always prompt!',
    },
    {
        name: 'Rahul Verma',
        rating: 4,
        text: 'Great variety and very affordable for daily meals. Highly recommend for busy professionals.',
    },
    {
        name: 'Aisha Khan',
        rating: 5,
        text: 'The quality and hygiene are top-notch. Love the subscription options!',
    },
];

const StarRating = ({ rating }) => (
    <div className="flex text-yellow-500">
        {Array.from({ length: 5 }, (_, i) =>
            i < rating ? <span key={i}>★</span> : <span key={i}>☆</span>
        )}
    </div>
);

const Testimonials = () => {
    return (
        <div className="bg-primary/10 py-16 px-4 md:px-20 text-center mt-24 rounded">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10">What Our Customers Say</h2>
            <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <div key={index} className="bg-white border rounded-lg shadow-sm p-6 text-left">
                        <div className="flex items-center gap-4 mb-4">
                            <FaUserCircle className="text-4xl text-gray-400" />
                            <div>
                                <h4 className="font-semibold text-gray-800">{t.name}</h4>
                                <StarRating rating={t.rating} />
                            </div>
                        </div>
                        <p className="text-gray-600 italic">"{t.text}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
