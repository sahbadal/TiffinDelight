import React from 'react';
import { useAppContext } from '../context/AppContext.jsx';
import { useParams } from 'react-router-dom';
import { categories } from '../assets/assets.js';
import ProductCard from '../components/ProductCard.jsx';

const ProductCategories = () => {
    const { products } = useAppContext();
    const { category } = useParams();

    const searchCategory = categories.find(
        (item) => item.path.toLowerCase() === category
    );

    const filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === category
    );

    return (
        <div className="mt-16 px-4 md:px-8">
            {searchCategory && (
                <div className="flex flex-col items-end w-max mx-auto mb-6">
                    <p className="text-3xl font-semibold text-center">
                        {searchCategory.text.toUpperCase()}
                    </p>
                    <div className="w-24 h-1 bg-primary rounded-full mt-2"></div>
                </div>
            )}

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[60vh]">
                    <p className="text-2xl font-medium text-primary">
                        No Meals Found in this Category
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductCategories;
