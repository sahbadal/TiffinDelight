import React from 'react'
import MainBanner from '../components/MainBanner.jsx'
import TiffinCategories from '../components/TiffinCategories.jsx'
import BestSellers from '../components/BestSellers.jsx'
import WhyChooseUs from '../components/WhyChooseUs.jsx'
import NewsLetter from '../components/NewsLetter.jsx'
import Testimonials from '../components/Testimonials.jsx'

const Home = () => {
    return (
        <div className='mt-10'>
            <MainBanner />
            <TiffinCategories />
            <BestSellers />
            <WhyChooseUs />
            <Testimonials />
            <NewsLetter />
        </div>
    )
}

export default Home