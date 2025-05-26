import React from 'react'
import { useAppContext } from '../context/AppContext.jsx'
import ProductCard from '../components/ProductCard.jsx'

const Meals = () => {

    const { products, searchQuery } = useAppContext();
    const [filteredProducts, setFilteredProducts] = React.useState([]);

    React.useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())))
        }
        else {
            setFilteredProducts(products);
        }
    }, [products, searchQuery])

    return (
        <div className='flex flex-col mt-16'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium uppercase'>All Meals</p>
                <div className='w-16 h-0.5 rounded-full bg-primary'></div>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-6'>
                {filteredProducts.filter((product) => product.inStock).map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}
            </div>

        </div>
    )
}

export default Meals