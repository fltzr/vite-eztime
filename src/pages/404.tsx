import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeftIcon } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-[400px] h-min-[250px]">
        <CardTitle>404 | Uh oh!</CardTitle>
        <CardDescription>
          Sorry love, this is a dead end. If there should be something here,
          please let me know!
        </CardDescription>
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
  );
};
