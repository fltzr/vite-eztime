import { GearIcon, PersonIcon } from '@radix-ui/react-icons';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useAuthStore } from 'src/store/use-auth-store';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Separator } from '../ui/separator';

import { LogOutIcon } from 'lucide-react';

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
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <GearIcon className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <PersonIcon className="h-5 w-5" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-bold">Juliette C</p>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <Separator />
                    <nav className="grid items-start px-1 text-sm font-medium">
                      <Button
                        variant="ghost"
                        className="flex flex-col items-center self-start gap-3 rounded-lg hover:text-black hover:bg-muted/90"
                      >
                        Profile
                      </Button>
                      <Button
                        variant="link"
                        className="flex items-center gap-3 rounded-lg hover:text-black hover:bg-muted/90"
                      >
                        <LogOutIcon className="w-4 h-4" />
                        <span>Logout</span>
                      </Button>
                    </nav>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </header>
  );
};
