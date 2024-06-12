import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SigninForm } from "./components/signin-form";
import { useSubmitSignin } from "./data-access/auth";
import { SigninFormSchema } from "./schema";
import { useAuthStore } from "src/store/use-auth-store";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AuthSigninPage = () => {
  const navigate = useNavigate();

  const { setUser } = useAuthStore();

  const signin = useSubmitSignin();

  const handleOnSubmit = async (data: SigninFormSchema) => {
    console.log("handleOnSubmit", data);

    await signin
      .mutateAsync(data)
      .then(({ data: userData, error }) => {
        if (error) {
          toast.success(<span>Coucou! Juliette... is that you? 🤔</span>);

          return;
        }

        toast.success("Welcome back BABY! 🎉");
        ``;
        setUser(userData.user);
        navigate("/");
      })
      .catch(() => {
        toast.error("Failed to sign in... 😢 Let Josh know!");
      });
  };

  return (
    <div className="w-full flex justify-center items-center">
      <Card className="w-[400px] h-min-[250px]">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>...only if your name is Juliette.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <SigninForm onSubmit={handleOnSubmit} />
        </CardContent>
      </Card>
    </div>
  );
};

export const Component = AuthSigninPage;
