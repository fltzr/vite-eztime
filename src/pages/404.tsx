import { GlobalHeader } from "@/components/global-layout/global-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="bg-[#F5F5F5] h-full overflow-hidden relative z-0">
      <GlobalHeader />
      <div
        className={`flex mx-2 mb-2 mt-[60px] dark:bg-black h-[calc(100%-60px)]`}
      >
        <div className="w-full h-full flex justify-center items-center">
          <Card className="w-[400px] h-min-[250px]">
            <CardHeader>
              <CardTitle>Oh no! Page not found.</CardTitle>

              <CardDescription>
                Sorry love, this is a dead end. If there should be something
                here, please let me know!
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button
                onClick={() => {
                  window.history.back();
                }}
              >
                <ArrowLeftIcon className="mr-2 h-4 w-4" />
                Go back
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};
