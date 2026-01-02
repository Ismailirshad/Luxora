import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import CategoryPage from './pages/CategoryPage'
import Navbar from './components/Navbar'
import { useUserStore } from './store/useUserStore'
import { useEffect } from 'react'
import LoadingSpinner from './components/LoadingSpinner'
import AdminPage from './pages/adminPage'
import CartPage from './pages/CartPage'
import PurchaseSuccessPage from './components/PurchaseSuccessPage'
import PurchaseCancelPage from './components/PurchaseCancelPage'
import RateLimitedUi from './components/rateLimiterUi'

function App() {
  const user = useUserStore((state) => state.user);
  const checkAuth = useUserStore((state) => state.checkAuth);
  const checkingAuth = useUserStore((state) => state.checkingAuth);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth(navigate);
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />
  return (
    <div className='min-h-screen bg-gray-900 text-white relative overflow-hidden'>
      {/* Background gradient */}
      <div className='absolute inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>
      <div>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to={'/'} />} />
          <Route path='/login' element={!user ? <LoginPage /> : <Navigate to={'/'} />} />
          <Route path='/sercret-dashboard' element={user?.role === "admin" ? <AdminPage /> : <Navigate to={'/login'} />} />
          <Route path='/category/:category' element={<CategoryPage />} />
          <Route path='/cart' element={user ? <CartPage /> : <navigate to='/login' />} />
          <Route path='/purchase-success' element={user ? <PurchaseSuccessPage /> : <Navigate to='/login' />} />
          <Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />
          <Route path="/rate-limit" element={<RateLimitedUi />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
