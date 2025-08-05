import { LayoutDashboard, BookOpen, Layers, Image, Settings, LogOut, Bot } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
    const [selected, setSelected] = useState('Dashboard');

    return (
        <div className="h-screen bg-[#121927] border-r border-white flex flex-col justify-between py-4 px-3 fixed left-0 top-0 w-60 z-50">
            {/* Top section */}
            <div>
                {/* Logo */}
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-white text-black rounded-lg p-2">
                        <Bot className="w-6 h-6" />
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2">
                    <SidebarItem icon={LayoutDashboard} label="Dashboard" setSelected={setSelected} selected={selected} />
                    <SidebarItem icon={BookOpen} label="Books" setSelected={setSelected} selected={selected} />
                    <SidebarItem icon={Layers} label="Chapters" setSelected={setSelected} selected={selected} />
                    <SidebarItem icon={Image} label="Images" setSelected={setSelected} selected={selected} />
                </nav>
            </div>

            {/* Bottom Section */}
            <div className="px-2 space-y-2">
                <SidebarItem icon={Settings} label="Settings" setSelected={setSelected} selected={selected} />
                <SidebarItem icon={LogOut} label="Logout" setSelected={setSelected} selected={selected} isLogout={true} />
            </div>
        </div>
    );
};

const SidebarItem = ({ icon: Icon, label, selected, setSelected, isLogout }) => (
    <div className={`${label === selected ? 'text-white bg-[#333A45]' : 'text-white/60 hover:bg-[#333A45]/30'} flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium  duration-200`}
        onClick={() => { setSelected(label) }}
    >
        <Icon className="w-4 h-4" />
        {label}
    </div>
);

export default Sidebar;