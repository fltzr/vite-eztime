import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { zodResolver } from '@hookform/resolvers/zod';

import { type SigninFormSchema, signinFormSchema } from '../schema';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

type SigninFormProps = {
  onSubmit: (data: SigninFormSchema) => Promise<void>;
};

export const SigninForm = ({ onSubmit }: SigninFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<SigninFormSchema>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: 'juliettecorrelb@gmail.com',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <FormItem>
            <FormLabel>Username</FormLabel>
            <FormControl>
              <Input readOnly value="juliettecorrelb@gmail.com" />
            </FormControl>
            <FormMessage />
          </FormItem>

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      className="pr-9"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="•••••••"
                      {...field}
                    />
                    <Button
                      className="absolute right-0 top-0 text-muted-foreground"
                      type="button"
                      variant={'ghost'}
                      size="icon"
                      onClick={(event) => {
                        event.preventDefault();
                        setShowPassword((prev) => !prev);
                      }}
                    >
                      {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Sign in</Button>
        </div>
      </form>
    </Form>
  );
};
