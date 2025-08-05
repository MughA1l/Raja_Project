import React from 'react'
import Sidebar from '../../components/general/Sidebar';
import Header from '../../components/general/Header';

const Dashboard = () => {
  return (
    <div className='grid grid-cols-18'>

      {/* Sidebar */}
      <div className='col-span-3 relative'>
        <Sidebar />
      </div>

      <div className='col-span-15 relative'>
        <Header />
        <div className='p-5 px-10 h-fit mt-16 bg-white'>
          <button className='bg-light-pink text-white ml-3 px-3 py-2'>
            Login
          </button>
          <div className='min-h-screen'>
.
          </div>
          <div className='min-h-screen'>
.
          </div>
        </div>
      </div>

    </div>
  )
}

export default Dashboard;