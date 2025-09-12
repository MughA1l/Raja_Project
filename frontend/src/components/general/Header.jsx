import { Bell, Settings } from "lucide-react";
import React from "react";
import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

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
        "w-full h-fit bg-[#F7F7F7] flex items-center justify-between px-5 mt-3 mb-3 rounded-xl"
      }
    >
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
            <h2 className="font-medium pt-[1px] text-xl text-dark-blue/80">
              {pageTitle.bottom === "Preview"
                ? "Chapter Preview"
                : pageTitle.bottom}
            </h2>
          </div>
        ) : (
          <h2 className="font-semibold pt-[1px] text-xl text-dark-blue/80">
            {pageTitle.top}
          </h2>
        )}
      </div>

      {/* Rest of your header code remains the same */}
      <div className="flex items-center gap-4 py-3">
        <span className="size-9 flex items-center justify-center duration-200 bg-[#384182] hover:bg-[#444c9b]/97 rounded-full group cursor-pointer">
          <Bell className="text-white size-5" />
        </span>

        <span className="size-9 flex items-center justify-center duration-200 bg-[#384182] hover:bg-[#444c9b]/97 rounded-full group cursor-pointer">
          <Settings className="text-white size-5" />
        </span>

        <div className="flex items-center justify-start gap-3 w-38 cursor-pointer hover:opacity-90 duration-100">
          <div className="avatar hover:opacity-85 cursor-pointer duration-100">
            <div className="ring-[#444c9b] ring-offset-base-100 size-9 rounded-full ring-2 ring-offset-2">
              <img src="https://img.daisyui.com/images/profile/demo/spiderperson@192.webp" />
            </div>
          </div>
          <div className="w-full">
            <h4 className="text-sm font-medium line-clamp-1">
              Zain298_
            </h4>
            <p className="text-xs line-clamp-1 break-all pt-[0.7px]">
              Zain@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
