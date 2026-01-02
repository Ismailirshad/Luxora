import React from 'react'
import { Link } from 'react-router-dom'

const CategoryItem = ({ category }) => {
    return (
        <div className='relative overflow-hidden h-96 w-full rounded-lg group'>
            <Link to={'/category' + category.href}>
                <div className="w-full h-full cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10">
                        <img src={category.imageUrl} alt={category.name}
                            loading="eager"
                            fetchPriority="high"
                            decoding="async"
                            width="400" height="400"
                            className='w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-105' />
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                            <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                            <p className="text-gray-200 text-sm">Explore {category.name}</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default React.memo(CategoryItem)
