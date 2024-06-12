import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { AlignLeftIcon } from "lucide-react";

export const NotFoundPage = () => {
  return (
    <Card>
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
          <AlignLeftIcon className="mr-2 h-4 w-4" />
          Go back
        </Button>
      </CardFooter>
    </Card>
  );
};
