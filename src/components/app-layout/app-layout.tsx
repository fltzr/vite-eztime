import { Outlet } from "react-router-dom";

import { AppHeader } from "./app-header";
import { AppSidebar } from "./app-sidebar";

const AppLayout = () => {
  return (
    <>
      <AppSidebar />
      <main className="flex-grow h-full overflow-auto bg-[#202123] rounded-r-lg">
        <AppHeader />
        <Outlet />
      </main>
    </>
  );
};

export const Component = AppLayout;
