import { GearIcon, CountdownTimerIcon } from '@radix-ui/react-icons';
import { NavItem } from '../nav-item/nav-item';

export const AppSidebar = () => {
  return (
    <div className="border-r border-r-[#FBFBFB] block bg-[#FBFBFB] rounded-l-lg min-w-56 px-3 pt-[6px] pb-3">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-1 text-sm font-medium">
            <NavItem href="/time">
              <CountdownTimerIcon className="h-4 w-4" />
              Time log
            </NavItem>
            <NavItem href="/settings">
              <GearIcon className="h-4 w-4" />
              Settings
            </NavItem>
          </nav>
        </div>
      </div>
    </div>
  );
};
