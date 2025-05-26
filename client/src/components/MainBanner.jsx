import React from 'react'
import { assets } from '../assets/assets.js'
import { Link } from 'react-router-dom'

const MainBanner = () => {
    return (
        <div className='relative'>
            {/* Background Images */}
            <img src={assets.main_banner_bg} alt="banner" className='w-full h-[500px] hidden md:block object-cover rounded' />
            <img src={assets.main_banner_bg_sm} alt="banner" className='w-full md:hidden object-cover rounded' />

            {/* Text Overlay */}
            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-center px-4 md:px-16 lg:px-24 text-black pt-16 pb-10 mt-50 md:mt-0 '>
                <h1 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[600px] leading-snug md:leading-tight'>
                    Fresh, Home-Cooked Tiffins Delivered To Your Doorstep Daily!
                </h1>

                <div className='flex flex-col sm:flex-row items-center gap-4 mt-6 font-medium'>
                    <Link to={'/meals'} className='group flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dull transition rounded text-white'>
                        Explore Meals
                        <img className='transition group-hover:translate-x-1' src={assets.white_arrow_icon} alt="arrow" />
                    </Link>
                    <Link to={'/provider'} className='group flex items-center gap-2 px-6 py-3 border border-black rounded hover:bg-gray-100 transition'>
                        Become Provider
                        <img className='transition group-hover:translate-x-1' src={assets.black_arrow_icon} alt="arrow" />
                    </Link>
                </div>
            </div>

        </div>
    )
}

export default MainBanner
