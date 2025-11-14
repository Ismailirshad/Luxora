import { ZapIcon } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const RateLimitedUi = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 60000)
    return () => clearTimeout(timer);
  }, [navigate])
  
  return (
    <div className='max-w-6xl mx-auto px-4 py-52 '>
      <div className="bg-primary/10 border border-green-600  border-primary/30 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className='size-10 text-red-600' />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl text-red-600 font-bold mb-2">Rate Limit Reached</h3>
            <p className="text-base-content mb-1 text-red-600">
              You've made too many requests in a short period. Please wait a moment before trying again.
            </p>
            <p className="text-sm text-base-content/70 text-red-600">
              Try again in a few seconds for the best experience</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RateLimitedUi