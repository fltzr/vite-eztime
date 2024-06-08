import { GearIcon, PersonIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import { useAuthStore } from "src/store/use-auth-store";

export const GlobalHeader = () => {
  const { user } = useAuthStore();

  return (
    <header className="h-[60px] fixed top-0 w-full z-[1px]">
      <div className="w-full h-full px-4 flex items-center justify-center">
        <div className="flex-grow-0 flex-shrink justify-start align-middle overflow-hidden">
          <Link className="flex items-center gap-2 font-semibold" to="/">
            <span className="">Ez time</span>
          </Link>
        </div>

        <div className="items-center flex-grow justify-end p-0 m-0 relative z-[1px]"></div>

        <div className="flex flex-grow-0 flex-shrink justify-end overflow-hidden relative gap-4">
          {user ? (
            <>
              <Button variant="ghost" size="icon">
                <GearIcon className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <PersonIcon className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};
