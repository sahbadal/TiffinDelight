import React from "react";
import {
    Utensils,
    Truck,
    Clock,
    DollarSign,
} from "lucide-react";

const features = [
    {
        icon: <Utensils size={28} className="text-emerald-400" />,
        title: "Fresh Homemade Food",
        desc: "Enjoy delicious, homemade meals prepared with love and care.",
    },
    {
        icon: <Truck size={28} className="text-emerald-400" />,
        title: "Daily Delivery",
        desc: "Get your tiffin delivered right to your doorstep every day.",
    },
    {
        icon: <Clock size={28} className="text-emerald-400" />,
        title: "On-Time Service",
        desc: "Never worry about late meals with our punctual delivery service.",
    },
    {
        icon: <DollarSign size={28} className="text-emerald-400" />,
        title: "Affordable Pricing",
        desc: "Quality food at reasonable prices that won't break the bank.",
    },
];

export default function WhyChooseUs() {
    return (
        <div className="mt-26 relative">
            <div className=" bg-primary/10 text-white py-16 px-6 rounded">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-2 text-black">Why Choose Our Tiffin Service?</h2>
                    <p className="text-gray-600 mb-12 text-lg">We provide the best tiffin service experience</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-gray-800 rounded-xl p-6 hover:bg-gray-700 transition-colors shadow-lg"
                            >
                                <div className="bg-gray-700 rounded-full p-3 inline-flex mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
