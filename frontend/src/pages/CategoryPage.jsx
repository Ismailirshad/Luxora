import { useProductStore } from '../store/useProductStore.js'
import ProductCard from '../components/ProductCard';
import Skeleton from '../components/Skeletone.jsx';
import { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategoryPage = () => {
  const loading = useProductStore((state) => state.loading);
  const products = useProductStore((state) => state.products);
  const fetchProductsByCategory = useProductStore((state) => state.fetchProductsByCategory);
  const { category } = useParams();

  useEffect(() => {
    fetchProductsByCategory(category);
  }, [fetchProductsByCategory, category])

  return (
    <div className='min-h-screen'>
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.h1 className="text-center text-4xl sm:text-5xl font-bold text-emerald-400 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </motion.h1>

        <div
          className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center'
        >
          {products.length === 0 && (
            <h2 className="text-3xl font-semibold text-gray-300 text-center col-span-full">No Products Found</h2>
          )}
          {loading ? (
            [...Array(8)].map((_, index) => (
              <Skeleton className="h-72 w-full mt-5" key={index} />
            ))
          ) : (
            products?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )
          }

        </div>
      </div>
    </div>
  )
}

export default CategoryPage
