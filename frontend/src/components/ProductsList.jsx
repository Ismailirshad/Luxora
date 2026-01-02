import { useProductStore } from '../store/useProductStore.js'
import React, { useEffect } from 'react'
import { motion } from "framer-motion"
import ProductRow from './ProductRow.jsx';

const ProductsList = () => {
  const deleteProduct = useProductStore(s => s.deleteProduct);
  const totalPages = useProductStore(s => s.totalPages);
  const productCount = useProductStore(s => s.productCount);
  const page = useProductStore((state) => state.page);
  const products = useProductStore((state) => state.products);
  const toggleFeaturedProduct = useProductStore((state) => state.toggleFeaturedProduct);
  const fetchingPaginationProducts = useProductStore((state) => state.fetchingPaginationProducts);

  useEffect(() => {
    fetchingPaginationProducts(1);
  }, [])

  return (
    <motion.div
      className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto '
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <table className='min-w-full divide-y divide-gray-700'>
        <thead className='bg-gray-700'>
          <tr>
            <th scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Product
            </th>
            <th scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Price
            </th>
            <th scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Category
            </th>
            <th scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Featured
            </th>
            <th scope='col'
              className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Actions
            </th>
          </tr>

        </thead>

        <tbody className='bg-gray-800 divide-y divide-gray-700'>
          {products?.map((product) => (
            <ProductRow key={product._id} product={product} toggleFeaturedProduct={toggleFeaturedProduct} deleteProduct={deleteProduct} />
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-center gap-4 mt-4">

        <button
          disabled={page === 1}
          onClick={() => fetchingPaginationProducts(page - 1)}
          className={`px-4 py-2 rounded-lg border transition
      ${page === 1
              ? "bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600"
              : "bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800 hover:scale-105"}`
          }
        >
          ← Prev
        </button>

        <div className="flex items-center gap-2 text-sm  font-light">
          <span className="text-emerald-300 font-semibold">{productCount} </span>
          <span className="text-slate-200">Products •</span>
          <span>
            Page <span className="font-medium text-yellow-400">{page}</span> of{" "}
            <span className="font-medium text-yellow-400">{totalPages}</span>
          </span>
        </div>


        <button
          disabled={page === totalPages}
          onClick={() => fetchingPaginationProducts(page + 1)}
          className={`px-4 py-2 rounded-lg border transition
      ${page === totalPages
              ? "bg-gray-700 text-gray-500 cursor-not-allowed border-gray-600"
              : "bg-gray-900 text-gray-200 border-gray-700 hover:bg-gray-800 hover:scale-105"}`
          }
        >
          Next →
        </button>

      </div>

    </motion.div>
  )
}

export default React.memo(ProductsList)
