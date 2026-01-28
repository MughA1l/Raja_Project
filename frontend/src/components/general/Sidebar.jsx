import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Image,
  Settings,
  LogOut,
  X,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = ({ onClose }) => {
  const location = useLocation();

  // Function to determine the active label based on path
  const getActiveLabel = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";
    if (path.startsWith("/Books")) return "Books";
    if (path.startsWith("/Chapters")) return "Chapters";
    if (path.startsWith("/Images")) return "Images";
    if (path.startsWith("/Settings")) return "Settings";
    if (path.startsWith("/Logout")) return "Logout";
    return "";
  };

  return (
    <div className="h-screen bg-[#121927] border-r border-white flex flex-col justify-between py-4 px-3 w-60">
      {/* Top section */}
      <div>
        {/* Logo and Close Button */}
        <div className="flex items-center justify-between mb-6 w-full">
          <div className="h-16 w-40">
            <img
              src="/logo-dashboard.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden text-white/60 hover:text-white p-2"
            >
              <X size={20} />
            </button>
          )}
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={getActiveLabel()}
            url={"/"}
            onClick={onClose}
          />
          <SidebarItem
            icon={BookOpen}
            label="Books"
            active={getActiveLabel()}
            url={"/Books"}
            onClick={onClose}
          />
          <SidebarItem
            icon={Layers}
            label="Chapters"
            active={getActiveLabel()}
            url={"/Chapters"}
            onClick={onClose}
          />
          <SidebarItem
            icon={Image}
            label="Images"
            active={getActiveLabel()}
            url={"/Images"}
            onClick={onClose}
          />
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-2 space-y-2">
        <SidebarItem
          icon={Settings}
          label="Settings"
          active={getActiveLabel()}
          url={"/Settings"}
          onClick={onClose}
        />
        <SidebarItem
          icon={LogOut}
          label="Logout"
          active={getActiveLabel()}
          url={"/Logout"}
          onClick={onClose}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, url, onClick }) => (
  <NavLink
    className={({ isActive }) =>
      `${isActive || label === active ? "text-white bg-[#333A45]" : "text-white/60 hover:bg-[#333A45]/30"} 
            flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium duration-200`
    }
    to={url !== "/Logout" ? url : "/Logout"}
    onClick={onClick}
  >
    <Icon className="w-4 h-4" />
    {label}
  </NavLink>
);

export default Sidebar;
