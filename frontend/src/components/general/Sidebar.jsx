import { LayoutDashboard, BookOpen, Layers, Image, Settings, LogOut } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
    const [selected, setSelected] = useState('Dashboard');

    return (
        <div className="h-screen bg-[#121927] border-r border-white flex flex-col justify-between py-4 px-3 fixed left-0 top-0 w-60 z-50">
            {/* Top section */}
            <div>
                {/* Logo */}
                <div className="flex items-start justify-center mb-6 w-full relative">
                    <div className='h-16 w-46 absolute -left-1'>
                        <img src="../../../public/logo-dashboard.png" alt="logo"
                            className="w-full h-full object-contain"
                        />
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2 mt-22">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" setSelected={setSelected} selected={selected} url={'/'} />
                    <SidebarItem icon={BookOpen} label="Books" setSelected={setSelected} selected={selected} url={'/Books'} />
                    <SidebarItem icon={Layers} label="Chapters" setSelected={setSelected} selected={selected} url={'/Chapters'} />
                    <SidebarItem icon={Image} label="Images" setSelected={setSelected} selected={selected} url={'/Images'} />
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="px-2 space-y-2">
                <SidebarItem icon={Settings} label="Settings" setSelected={setSelected} selected={selected} url={'/Settings'} />
                <SidebarItem icon={LogOut} label="Logout" setSelected={setSelected} selected={selected} url={'/Logout'} />
            </div>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, selected, setSelected, url }) => (
    <NavLink className={`${label === selected ? 'text-white bg-[#333A45]' : 'text-white/60 hover:bg-[#333A45]/30'} flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium  duration-200`}
        onClick={() => { setSelected(label) }}
        to={url != '/Logout' ? url : ''}
    >
        <Icon className="w-4 h-4" />
        {label}
    </NavLink>
);

export default Sidebar;