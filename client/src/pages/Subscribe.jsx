import React, { useState } from "react";

const plans = [
    {
        name: "Basic Plan",
        price: 120,
        per: "day",
        description: "Perfect for individuals who want quality meals",
        features: [
            "1 Meal per day",
            "Choice of Lunch or Dinner",
            "4 Rotis + Dal + Sabzi + Rice",
            "Basic variety menu",
            "Free delivery",
            "Cancel anytime",
        ],
        popular: false,
    },
    {
        name: "Standard Plan",
        price: 200,
        per: "day",
        description: "Great value for complete daily nutrition",
        features: [
            "2 Meals per day",
            "Lunch + Dinner included",
            "6 Rotis + Dal + 2 Sabzis + Rice",
            "Rotating variety menu",
            "Free delivery",
            "Pause anytime",
        ],
        popular: true,
    },
    {
        name: "Premium Plan",
        price: 300,
        per: "day",
        description: "For those who prefer extra variety and portions",
        features: [
            "2 Meals + Evening Snacks",
            "Customizable meals",
            "Desserts twice a week",
            "Daily special menu",
            "Free delivery",
            "Priority customer support",
        ],
        popular: false,
    },
];

const Subscribe = () => {
    const [subscribedPlan, setSubscribedPlan] = useState(null);
    const [processingPlan, setProcessingPlan] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const handleSubscribe = (planName) => {
        setProcessingPlan(planName);
        setSuccessMessage("");
        setTimeout(() => {
            setProcessingPlan(null);
            setSubscribedPlan(planName);
            setSuccessMessage(`Successfully subscribed to ${planName}!`);
            setTimeout(() => {
                setSubscribedPlan(null);
                setSuccessMessage("");
            }, 3000);
        }, 2000);
    };

    return (
        <div className="bg-orange-50 min-h-screen font-sans rounded">
            {/* <section className="text-center py-20 bg-gradient-to-br from-orange-500 to-orange-800 text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Premium Tiffin Service</h1>
        <p className="text-lg max-w-xl mx-auto">
          Fresh, homemade meals delivered to your doorstep daily. Choose the perfect plan for your lifestyle.
        </p>
      </section> */}

            <section className="container mx-auto px-4 py-16 mt-16 rounded">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">Choose Your Perfect Plan</h2>
                    <p className="text-gray-600">
                        Flexible subscription options designed to fit your needs and budget
                    </p>
                </div>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {plans.map((plan, idx) => {
                        const isProcessing = processingPlan === plan.name;
                        const isSubscribed = subscribedPlan === plan.name;
                        return (
                            <div
                                key={idx}
                                className={`relative p-8 bg-white rounded-2xl shadow  border-2 ${plan.popular
                                    ? "scale-105 border-orange-500 shadow-lg"
                                    : "border-transparent"
                                    }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-5 bg-gradient-to-br from-orange-500 to-orange-700 text-white text-sm font-semibold px-4 py-1 rounded-b-xl uppercase">
                                        Most Popular
                                    </div>
                                )}
                                <div className="text-center mb-6">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-1">{plan.name}</h3>
                                    <div className="text-4xl font-bold text-orange-600 mb-1">
                                        ₹{plan.price}
                                        <span className="text-base font-medium text-gray-500">/{plan.per}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">{plan.description}</p>
                                </div>
                                <ul className="space-y-3 text-sm text-gray-700 mb-6">
                                    {plan.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-orange-600 font-bold mr-2">✓</span>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => handleSubscribe(plan.name)}
                                    disabled={isProcessing}
                                    className={`w-full py-3 rounded-lg font-semibold tracking-wide uppercase transition duration-300 ${isSubscribed
                                        ? "bg-green-600 text-white cursor-pointer"
                                        : isProcessing
                                            ? "bg-orange-300 text-white"
                                            : "bg-gradient-to-r from-orange-500 to-orange-700 text-white hover:shadow-lg cursor-pointer"
                                        }`}
                                >
                                    {isProcessing
                                        ? "Processing..."
                                        : isSubscribed
                                            ? "Subscribed"
                                            : `Choose ${plan.name.split(" ")[0]}`}
                                </button>
                                {isSubscribed && (
                                    <p className="mt-3 text-green-600 font-semibold text-center">{successMessage}</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Subscribe;
