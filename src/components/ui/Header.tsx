import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import neoai_logo from "../../../public/images/neoai_logo.png";
import { DarkMode } from "../../../types";
import DarkModeContext from "../../user/context/DarkModeContext";
import { UserState } from "../../user/types";
import DarkLightButton from "./DarkLightButton";
import DropdownMenu from "./menu/DropdownMenu";
import MobileNavButton from "./nav-elements/MobileNavButton";
import NavButton from "./nav-elements/NavButton";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const user = useSelector((state: UserState) => state.user);
  const [isDark, setIsDark]: DarkMode = useContext(DarkModeContext);
  const [isOpen, setIsOpen] = useState(false);
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
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="white"
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
          <div className="flex flex-1 items-center max-[639px]:justify-center max-[360px]:justify-start max-[360px]:ml-12">
            <div className="flex flex-shrink-0 items-center">
              <img className="h-10 w-auto" src={neoai_logo} alt="NeoAi" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4 [&>*]:no-underline">
                <NavButton href="/home" name="Home" />
                <NavButton href="/models" name="Models" />
                <NavButton href="/settings" name="Settings" />
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

      <div className={isMenuOpen ? "" : "hidden"}>
        <div className="space-y-1 px-2 pb-3 pt-2 [&>*]:no-underline animate-dropmenu">
          <MobileNavButton href={"/home"} name="Home" />
          <MobileNavButton href={"/models"} name="Models" />
          <MobileNavButton href={"/settings"} name="Settings" />
        </div>
      </div>
    </nav>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export { Layout };
