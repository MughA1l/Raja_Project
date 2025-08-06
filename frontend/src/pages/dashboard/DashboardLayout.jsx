import React from 'react'
import Sidebar from '../../components/general/Sidebar';
import Header from '../../components/general/Header';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='grid grid-cols-18'>

            {/* Sidebar */}
            <div className='col-span-3 relative'>
                <Sidebar />
            </div>

            <div className='col-span-15 relative'>
                <Header />
                <div className='p-5 px-10 h-fit mt-16 bg-white'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout;