"use client";

import FormErrorAlert from "@/components/FormErrorAlert";
import FormSuccessAlert from "@/components/FormSuccessAlert";
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
import useResetPassword from "@/hooks/mutations/useResetPassword";
import { getErrorResponse, handleValidationError } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ChangePasswordFormProps {
  token: string;
}

export const resetPasswordBodySchema = z
  .object({
    password: z.string().trim().min(6),
    confirmPassword: z.string().trim().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords didn't match!",
    path: ["confirmPassword"],
  });

export type ResetPasswordBodyType = z.infer<typeof resetPasswordBodySchema>;

export default function ChangePasswordForm({ token }: ChangePasswordFormProps) {
  const router = useRouter();

  const form = useForm<ResetPasswordBodyType>({
    resolver: zodResolver(resetPasswordBodySchema),
  });

  const {
    resetPasswordData,
    resetPasswordError,
    isResetPasswordPending,
    mutateResetPasswordAsync,
  } = useResetPassword();

  const onSubmit = async (values: ResetPasswordBodyType) => {
    try {
      await mutateResetPasswordAsync({ token, body: values });
      await (() => new Promise((resolve) => setTimeout(resolve, 5000)))();
      form.reset();
      router.push("/auth/signin");
    } catch (e) {
      const error = getErrorResponse(e);
      handleValidationError<ResetPasswordBodyType>(error, form);
    }
  };

  return (
    <Form {...form}>
      <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
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

        <FormField
          name="confirmPassword"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="password"
                  placeholder="Rewrite your password"
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
          disabled={isResetPasswordPending}
        >
          SUBMIT
        </Button>

        <FormErrorAlert error={resetPasswordError} />
        <FormSuccessAlert data={resetPasswordData} />
      </form>
    </Form>
  );
}
