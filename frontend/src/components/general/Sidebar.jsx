import React from "react";
import {
  LayoutDashboard,
  BookOpen,
  Layers,
  Image,
  Settings,
  LogOut,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  // Function to determine the active label based on path
  const getActiveLabel = () => {
    const path = location.pathname;

    if (path === "/") return "Dashboard";
    if (path.startsWith("/Books")) return "Books";
    if (path.startsWith("/Chapters")) return "Chapters";
    if (path.startsWith("/Images")) return "Images";
    if (path.startsWith("/Settings")) return "Settings";
    return "";
  };

  return (
    <div className="h-screen bg-[#121927] border-r border-white flex flex-col justify-between py-4 px-3 left-0 top-0 w-60 z-50">
      {/* Top section */}
      <div>
        {/* Logo */}
        <div className="flex items-start justify-center mb-6 w-full relative">
          <div className="h-16 w-46 absolute -left-1">
            <img
              src="/logo-dashboard.png"
              alt="logo"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2 mt-22">
          <SidebarItem
            icon={LayoutDashboard}
            label="Dashboard"
            active={getActiveLabel()}
            url={"/"}
          />
          <SidebarItem
            icon={BookOpen}
            label="Books"
            active={getActiveLabel()}
            url={"/Books"}
          />
          <SidebarItem
            icon={Layers}
            label="Chapters"
            active={getActiveLabel()}
            url={"/Chapters"}
          />
          <SidebarItem
            icon={Image}
            label="Images"
            active={getActiveLabel()}
            url={"/Images"}
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
        />
        <SidebarItem
          icon={LogOut}
          label="Logout"
          active={getActiveLabel()}
          url={"/Logout"}
        />
      </div>
    </div>
  );
};

const SidebarItem = ({ icon: Icon, label, active, url }) => (
  <NavLink
    className={({ isActive }) =>
      `${isActive || label === active ? "text-white bg-[#333A45]" : "text-white/60 hover:bg-[#333A45]/30"} 
            flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer text-sm font-medium duration-200`
    }
    to={url !== "/Logout" ? url : ""}
  >
    <Icon className="w-4 h-4" />
    {label}
  </NavLink>
);

export default Sidebar;
