import React from 'react'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { DollarSign, Package, ShoppingCart, Users } from 'lucide-react'
import { useEffect } from 'react'
import api from '../lib/axios.js'
import { CartesianGrid, LineChart, ResponsiveContainer, YAxis, XAxis, Tooltip, Legend, Line } from 'recharts';

const AnalyticsTab = () => {
  const [dailySalesData, setDailySalesData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState({
    users: 0,
    products: 0,
    totalSales: 0,
    totalRevenue: 0,
  })
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const res = await api.get('/analytics');
        setAnalyticsData(res.data.analyticsData);
        setDailySalesData(res.data.dailySalesData);
      } catch (error) {
        console.log("Error fetching analytics data:", error)
      } finally {
        setLoading(false);
      }
    }
    fetchAnalyticsData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard title='Total Users'
          value={analyticsData.users.toLocaleString()}
          icon={Users}
          color='from-emerald-500 to-teal-700'
        />
        <AnalyticsCard title='Total Products'
          value={analyticsData.products.toLocaleString()}
          icon={Package}
          color='from-emerald-500 to-teal-700'
        />
        <AnalyticsCard title='Total Sales'
          value={analyticsData.totalSales.toLocaleString()}
          icon={ShoppingCart}
          color='from-emerald-500 to-teal-700'
        />
        <AnalyticsCard title='Total Revenue'

          value={analyticsData.totalRevenue.toLocaleString()} 
          icon={DollarSign}
          color='from-emerald-500 to-teal-700'
        />
      </div>

      <motion.div
        className='bg-gray-800/60 rounded-lg p-6 shadow-lg'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dailySalesData} >
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey="date" stroke='#D1D5DB' />
            <YAxis yAxisId='left' stroke='#D1D5DB' />
            <YAxis yAxisId='right' stroke='#D1D5DB' orientation='right' />
            <Tooltip />
            <Legend />
            <Line
              yAxisId='left'
              type='monotone'
              dataKey='sales'
              stroke='#10B981'
              activeDot={{ r: 8 }}
              name='Sales'
            />
            <Line
              yAxisId='right'
              type='monotone'
              dataKey='revenue'
              stroke='#3B82F6'
              activeDot={{ r: 8 }}
              name='Revenue'
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}

export default AnalyticsTab

const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`}
  >
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className='text-emerald-300 text-sm mb-1 font-semibold'>{title}</p>
        <h3 className='text-white text-3xl font-bold'>{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30" />
    <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
      <Icon className='h-32 w-32' />
    </div>

  </motion.div>
)
