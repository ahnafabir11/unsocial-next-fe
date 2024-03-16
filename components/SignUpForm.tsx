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
import useSignUpMutation from "@/hooks/mutations/useSignUpMutation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormErrorAlert from "./FormErrorAlert";
import FormSuccessAlert from "./FormSuccessAlert";
import { getErrorResponse, handleValidationError } from "@/lib/helper";

export const signUpBodySchema = z
  .object({
    fullName: z.string().trim().min(6),
    email: z.string().toLowerCase().email(),
    password: z.string().trim().min(6),
    confirmPassword: z.string().trim().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't match!",
    path: ["confirmPassword"],
  });

export type SignUpBodyType = z.infer<typeof signUpBodySchema>;

export default function SignUpForm() {
  const {
    signUpMutateData,
    signUpMutateAsync,
    signUpError,
    isSignUpMutatePending,
  } = useSignUpMutation();
  const form = useForm<SignUpBodyType>({
    resolver: zodResolver(signUpBodySchema),
  });

  const onSubmit = async (values: SignUpBodyType) => {
    try {
      await signUpMutateAsync(values);
    } catch (e) {
      const error = getErrorResponse(e);
      handleValidationError(error, form);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="fullName"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Jon Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="jon.doe@mail.com" {...field} />
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
                  type="password"
                  placeholder="Enter a strong password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Rewrite your password"
                  {...field}
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
          disabled={isSignUpMutatePending}
        >
          SIGN UP
        </Button>
        <FormErrorAlert error={signUpError} />
        <FormSuccessAlert data={signUpMutateData} />
      </form>
    </Form>
  );
}
