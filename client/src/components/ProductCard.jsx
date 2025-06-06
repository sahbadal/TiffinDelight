import React from "react";
import { assets } from "../assets/assets.js";
import { useAppContext } from "../context/AppContext.jsx";
import { ChefHat } from "lucide-react";

const ProductCard = ({ product }) => {
    const {
        currency,
        addToCart,
        removeFromCart,
        cartItems,
        navigate,
        provider
    } = useAppContext();

    return (
        product && (
            <div
                onClick={() => {
                    navigate(`/meals/${product.category.toLowerCase()}/${product._id}`);
                    scrollTo(0, 0);
                }}
                className="relative border border-gray-300 rounded-2xl bg-white overflow-hidden w-full shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
                {/* Product Image */}
                <div className="relative">
                    <img
                        className="w-full h-52 object-cover"
                        src={product.image[0]}
                        alt={product.name}
                    />
                </div>

                {/* Product Info */}
                <div className="px-5 py-4 space-y-2 text-gray-800">
                    {/* Name */}
                    <h3 className="text-lg font-bold truncate">{product.name}</h3>

                    {/* Kitchen */}
                    <p className="flex items-center gap-1 text-sm text-gray-500">
                        <ChefHat className="w-4 h-4" />
                        {provider?.kitchenName || 'Royal Kitchen'}
                    </p>

                    {/* Description */}
                    <p className="text-sm text-gray-400">A delightful homemade meal.</p>

                    {/* Price Section */}
                    <div className="flex justify-between items-center pt-2">
                        <div className="flex items-center gap-3">
                            <p className="text-sm line-through text-gray-400">
                                {currency}
                                {product.price}
                            </p>
                            <p className="text-xl font-semibold text-primary">
                                {currency}
                                {product.offerPrice}
                            </p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <img src={assets.star_icon} alt="rating" className="w-5" />
                            4.8
                        </div>
                    </div>

                    {/* Order Buttons */}
                    <div className="pt-4">
                        {!cartItems[product._id] ? (
                            <button
                                className="w-full bg-primary text-white py-2 rounded-lg text-sm font-medium hover:bg-primary/90 cursor-pointer"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(product._id);
                                }}
                            >
                                Order Now
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-3 w-full h-10 bg-primary/20 rounded-lg select-none">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeFromCart(product._id);
                                    }}
                                    className="text-xl font-bold px-2 cursor-pointer"
                                >
                                    −
                                </button>
                                <span className="w-6 text-center text-lg">
                                    {cartItems[product._id]}
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        addToCart(product._id);
                                    }}
                                    className="text-xl font-bold px-2 cursor-pointer"
                                >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    );
};

export default ProductCard;
