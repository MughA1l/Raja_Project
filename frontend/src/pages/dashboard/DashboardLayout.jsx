import React from 'react'
import Sidebar from '../../components/general/Sidebar';
import Header from '../../components/general/Header';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
    return (
        <div className='flex md:flex-row h-screen'>

            {/* Sidebar */}
            <div className='w-fit relative md:visible max-md:hidden'>
                <Sidebar />
            </div>

            <div className='pr-4 pl-4 pb-6 overflow-y-auto w-full'>
                <Header />
                <div className='h-fit w-full bg-white'>
                    <Outlet />
                </div>
            </div>

        </div>
    )
}

export default DashboardLayout;