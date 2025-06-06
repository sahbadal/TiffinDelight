import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext.jsx';

const BestSellers = () => {
    const { products } = useAppContext();

    return (
        <div className='mt-16'>
            <p className='text-2xl md:text-3xl font-medium'>Featured Meals</p>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6'>
                {products
                    .filter((product) => product.inStock)
                    .slice(0, 8)
                    .map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default BestSellers;
