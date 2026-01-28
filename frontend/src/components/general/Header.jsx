import { Bell, Settings, User, LogOut, ChevronDown, Lock, BarChart3, Shield, Menu } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserProfile } from "@services/settingsService";
import { logoutUser } from "@services/authService";

const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);
  const [user, setUser] = useState({
    username: "",
    email: "",
    profileImage: null,
  });
  const [loading, setLoading] = useState(true);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "statistics", label: "Statistics", icon: BarChart3 },
    { id: "account", label: "Account", icon: Shield },
  ];

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(event.target)) {
        setShowSettingsDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await getUserProfile();
      if (response.success) {
        setUser({
          username: response.data.username || "",
          email: response.data.email || "",
          profileImage: response.data.profileImage,
        });
      }
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setShowProfileDropdown(false);
    await logoutUser();
  };

  const handleSettingsClick = () => {
    setShowProfileDropdown(false);
    navigate("/Settings");
  };

  const handleSettingsTabClick = (tabId) => {
    setShowSettingsDropdown(false);
    navigate(`/Settings?tab=${tabId}`);
  };

  const getPageTitle = (pathname) => {
    // Handle nested routes
    if (
      pathname.startsWith("/Books/") &&
      pathname.includes("/Chapters")
    ) {
      return { top: "Books", bottom: "Chapters" };
    }
    if (pathname.startsWith("/Chapters/")) {
      return { top: "Chapters", bottom: "Preview" };
    }

    // Handle base routes
    switch (pathname) {
      case "/":
        return { top: "Dashboard", bottom: "" };
      case "/Books":
        return { top: "Dashboard", bottom: "Books" };
      case "/Chapters":
        return { top: "Dashboard", bottom: "Chapters" };
      case "/Images":
        return { top: "Dashboard", bottom: "Images" };
      case "/Settings":
        return { top: "Dashboard", bottom: "Settings" };
      default:
        return { top: "Dashboard", bottom: "" };
    }
  };

  const pageTitle = getPageTitle(location.pathname);

  return (
    <div
      className={
        "w-full h-fit bg-[#F7F7F7] flex items-center justify-between px-3 md:px-5 mt-3 mb-3 rounded-xl"
      }
    >
      <div className="flex items-center gap-3">
        {/* Hamburger Menu for Mobile */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            className="md:hidden p-2 hover:bg-black/5 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-dark-blue" />
          </button>
        )}
        
        <div>
          {pageTitle.bottom ? (
            <div>
              <h3 className="text-xs flex items-center">
                <span className="text-light-pink">
                  {pageTitle.top}
                  &nbsp;
                </span>
                <span className="text-dark-blue">
                  {" / "}
                  {pageTitle.bottom}
                </span>
              </h3>
              <h2 className="font-medium pt-[1px] text-base md:text-xl text-dark-blue/80">
                {pageTitle.bottom === "Preview"
                  ? "Chapter Preview"
                  : pageTitle.bottom}
              </h2>
            </div>
          ) : (
            <h2 className="font-semibold pt-[1px] text-base md:text-xl text-dark-blue/80">
              {pageTitle.top}
            </h2>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4 py-3">
        <span className="size-8 md:size-9 flex items-center justify-center duration-200 bg-[#384182] hover:bg-[#444c9b]/97 rounded-full group cursor-pointer">
          <Bell className="text-white size-4 md:size-5" />
        </span>

        {/* Settings Icon with Dropdown */}
        <div className="relative" ref={settingsDropdownRef}>
          <span
            onClick={() => setShowSettingsDropdown(!showSettingsDropdown)}
            className="size-8 md:size-9 flex items-center justify-center duration-200 bg-[#384182] hover:bg-[#444c9b]/97 rounded-full group cursor-pointer"
          >
            <Settings className="text-white size-4 md:size-5" />
          </span>

          {/* Settings Dropdown */}
          {showSettingsDropdown && (
            <div className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden z-50">
              <div className="py-1.5">
                {settingsTabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => handleSettingsTabClick(tab.id)}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-slate-500" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profile with Dropdown */}
        <div className="relative" ref={profileDropdownRef}>
          <div
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 md:gap-2.5 cursor-pointer hover:opacity-90 duration-100 select-none max-w-32 md:max-w-60"
          >
            <div className="avatar flex-shrink-0">
              <div className="ring-[#444c9b] ring-offset-base-100 size-8 md:size-9 rounded-full ring-2 ring-offset-2 overflow-hidden bg-slate-100">
                {loading ? (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin"></div>
                  </div>
                ) : user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.username}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-light-pink to-purple-500">
                    <User className="w-4 md:w-5 h-4 md:h-5 text-white" />
                  </div>
                )}
              </div>
            </div>
            <div className="min-w-0 flex-1 hidden sm:block">
              {loading ? (
                <>
                  <div className="h-4 w-16 bg-slate-200 rounded animate-pulse mb-1"></div>
                  <div className="h-3 w-24 bg-slate-200 rounded animate-pulse"></div>
                </>
              ) : (
                <>
                  <h4 className="text-sm font-medium truncate">
                    {user.username || "User"}
                  </h4>
                  <p className="text-xs truncate text-slate-500">
                    {user.email || "No email"}
                  </p>
                </>
              )}
            </div>
            <ChevronDown
              className={`w-3 md:w-4 h-3 md:h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                showProfileDropdown ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileDropdown && (
            <div className="absolute right-0 top-full mt-2 w-40 bg-white rounded-xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden z-50">
              <div className="py-1.5">
                <button
                  onClick={handleSettingsClick}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <Settings className="w-4 h-4 text-slate-500" />
                  <span>Settings</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-500" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
