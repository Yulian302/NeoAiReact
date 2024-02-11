import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import neoai_logo from "../../../public/images/neoai_logo.png";
import DarkLightButton from "./DarkLightButton";
import DarkModeContext from "../../user/context/DarkModeContext";
import { DarkMode } from "../../../types";
import { useSelector } from "react-redux";
import { UserState } from "../../user/types";
import DropdownMenu from "./menu/DropdownMenu";

const Header = () => {
  const user = useSelector((state: UserState) => state.user);
  const [isDark, setIsDark]: DarkMode = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
  let location = useLocation();
  return (
    <nav
      data-theme={isDark ? "dark" : "light"}
      className="bg-header-background-color"
    >
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-400 hover:bg-[#374151] hover:text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                ></path>
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-10 w-auto" src={neoai_logo} alt="NeoAi" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 [&>*]:no-underline">
                <Link
                  to="/home"
                  className={`text-[#D1D5DB] hover:text-[#ffffff] rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname.includes("home")
                      ? "tab-active"
                      : "hover:bg-hover-nav-bg"
                  }`}
                  aria-current="page"
                  id="home"
                >
                  Home
                </Link>
                <Link
                  to="/team"
                  className={`text-[#D1D5DB] hover:text-[#ffffff] rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname.includes("team")
                      ? "tab-active"
                      : "hover:bg-hover-nav-bg"
                  }`}
                  id="team"
                >
                  Team
                </Link>
                <Link
                  to="/models"
                  className={`text-[#D1D5DB] hover:text-[#ffffff] rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname.includes("models")
                      ? "tab-active"
                      : "hover:bg-hover-nav-bg"
                  }`}
                  id="models"
                >
                  Models
                </Link>
                <Link
                  to="/settings"
                  className={`text-[#D1D5DB]  hover:text-[#ffffff] rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname.includes("settings")
                      ? "tab-active"
                      : "hover:bg-hover-nav-bg"
                  }`}
                  id="settings"
                >
                  Settings
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              type="button"
              className="text-[#ffffff] relative rounded-full bg-[#1F2937] p-1 text-400 hover:text-[#ffffff] focus:outline-none focus:ring-2 focus:ring-[#ffffff] focus:ring-offset-2 focus:ring-offset-[#ffffff]"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                ></path>
              </svg>
            </button>
            <div className="relative mx-6">
              <div>
                <button
                  type="button"
                  className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src={user.profile?.avatar_url}
                    alt="User avatar"
                  />
                </button>
              </div>
              <DropdownMenu isOpen={isOpen} />
            </div>
            <div className="mx-3"></div>
          </div>
        </div>
      </div>
      <DarkLightButton isDark={isDark} setIsDark={setIsDark} />

      <div className="hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2 [&>*]:no-underline">
          <a
            href=""
            className="text-[#D1D5DB] hover:bg-[#374151] hover:text-[#ffffff] block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
            id="homemob"
          >
            Home
          </a>
          <a
            href=""
            className="text-[#D1D5DB] hover:bg-[#374151] hover:text-[#ffffff] block rounded-md px-3 py-2 text-base font-medium"
            id="teammob"
          >
            Team
          </a>
          <a
            href=""
            className="text-[#D1D5DB] hover:bg-[#374151] hover:text-[#ffffff] block rounded-md px-3 py-2 text-base font-medium"
            id="modelsmob"
          >
            Models
          </a>
          <a
            href=""
            className="text-[#D1D5DB] hover:bg-[#374151] hover:text-[#ffffff] block rounded-md px-3 py-2 text-base font-medium"
            id="settingsmob"
          >
            Settings
          </a>
        </div>
      </div>
    </nav>
  );
};

// @ts-ignore
const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export { Layout };
