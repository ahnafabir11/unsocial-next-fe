"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useLoginMutation from "@/hooks/mutations/useLoginMutation";
import { getErrorResponse, handleValidationError } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormErrorAlert from "./FormErrorAlert";
import FormSuccessAlert from "./FormSuccessAlert";

export const loginBodySchema = z.object({
  email: z.string().toLowerCase().email(),
  password: z.string().trim().min(6),
});

export type LoginBodyType = z.infer<typeof loginBodySchema>;

export default function SignInForm() {
  const router = useRouter();
  const { loginMutateData, loginMutateAsync, isLoginPending, loginError } =
    useLoginMutation();
  const form = useForm<LoginBodyType>({
    resolver: zodResolver(loginBodySchema),
  });

  const onSubmit = async (values: LoginBodyType) => {
    try {
      await loginMutateAsync(values);
      router.push("/");
    } catch (e) {
      const error = getErrorResponse(e);
      handleValidationError<LoginBodyType>(error, form);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} placeholder="jon.doe@mail.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="password"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Enter your password"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          style={{ marginTop: "2rem" }}
          disabled={isLoginPending}
        >
          SIGN IN
        </Button>
        <FormErrorAlert error={loginError} />
        <FormSuccessAlert data={loginMutateData} />
      </form>
    </Form>
  );
}
