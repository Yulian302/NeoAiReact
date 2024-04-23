import { Dispatch, SetStateAction } from "react";
import { PanelState } from "../types";
import NavPanel from "./NavPanel";

interface SideSettingsProps {
  panelState: PanelState;
  setPanelState: Dispatch<SetStateAction<PanelState>>;
}
const SideSettings = ({ panelState, setPanelState }: SideSettingsProps) => {
  const setActivePanelState = (name: string) => {
    setPanelState(() => {
      const clone: PanelState = { ...panelState };
      Object.keys(clone).forEach(function (key: string) {
        clone[key as keyof typeof clone] = Boolean(key === name);
      });
      return clone;
    });
  };
  return (
    <aside className="h-max overflow-x-auto  py-[1rem] w-[20rem] block max-[1068px]:self-center max-[1068px]:w-full shadowDiv">
      <nav className="p-0">
        <ul className="p-0 [&>*>*]:text-primary-text-color flex flex-col gap-x-3 gap-y-1 [&>*>*]:no-underline [&>*>*]:font-bold [&>*>*]:text-sm [&>*>*]:leading-6 hover:[&>*>*]:bg-hover-button-bg max-[1068px]:flex-row max-[1068px]:justify-center max-[442px]:flex-col">
          <li>
            <NavPanel
              isActive={panelState.general}
              setActiveState={setActivePanelState}
              name="general"
              label="General"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                ></path>
              </svg>
            </NavPanel>
          </li>
          <li>
            <NavPanel
              isActive={panelState.security}
              setActiveState={setActivePanelState}
              name="security"
              label="Security"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                ></path>
              </svg>
            </NavPanel>
          </li>
          <li>
            <NavPanel
              isActive={panelState.notifications}
              setActiveState={setActivePanelState}
              name="notifications"
              label="Notifications"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-6 h-6 shrink-0"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                ></path>
              </svg>
            </NavPanel>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default SideSettings;
