import { Outlet } from "react-router-dom";
import { GlobalHeader } from "./global-header";
import { Toaster } from "../ui/toaster";

const GlobalLayout = () => {
  return (
    <div className="bg-black h-full overflow-hidden relative z-0">
      <GlobalHeader />
      <div
        className={`flex mx-2 mb-2 mt-[60px] dark:bg-black h-[calc(100%-60px)]`}
      >
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
};

export const Component = GlobalLayout;
