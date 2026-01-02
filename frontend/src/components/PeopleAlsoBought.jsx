import { useEffect, useState } from 'react'
import api from '../lib/axios.js';
import toast from 'react-hot-toast';
import LoadingSpinner from './LoadingSpinner';
import ProductCard from './ProductCard';

const PeopleAlsoBought = () => {
  const [recommendation, setRecommendation] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendation = async () => {
      try {
        const res = await api.get('/products/recomendation');
        setRecommendation(res.data);
      } catch (error) {
        toast.error(error.res.data.message || "An error occured while fetching recomendations")
      } finally {
        setLoading(false);
      }
    }
    fetchRecommendation();
  }, [])

  if (loading) return <LoadingSpinner />
  return (
    <div className='mt-8'>
      <h3 className="text-2xl font-semibold text-emerald-400">Peolple also bought</h3>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {recommendation.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

    </div>
  )
}

export default PeopleAlsoBought
