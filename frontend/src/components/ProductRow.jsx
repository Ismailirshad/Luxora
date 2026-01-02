import { Star, Trash } from 'lucide-react'
import React from 'react'

const ProductRow = ({ product, toggleFeaturedProduct, deleteProduct }) => {
  return (
     <tr className='hover:bg-gray-700'>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10">
                    <img className='h-10 w-10 rounded-full object-cover' src={product.image} alt={product.name} loading='lazy' decoding='async' />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-white">{product.name}</div>
                  </div>
                </div>
              </td>

              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>${product.price.toFixed(2)}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <div className='text-sm text-gray-300'>{product.category}</div>
              </td>
              <td className='px-6 py-4 whitespace-nowrap'>
                <button
                  onClick={() => toggleFeaturedProduct(product._id)}
                  className={`p-1 rounded-full 
                    ${product.isFeatured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"}
                     hover:bg-yellow-500 transition-colors duration-200`}
                >
                  <Star className='h-5 w-5' />

                </button>
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                <button
                  onClick={() => deleteProduct(product._id)}
                  className='text-red-400 hover:text-red-300'
                >
                  <Trash className='h-5 w-5' />
                </button>
              </td>
            </tr>
  )
}

export default React.memo(ProductRow)
