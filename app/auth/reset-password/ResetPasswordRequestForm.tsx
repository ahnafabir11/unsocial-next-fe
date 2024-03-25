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
import useResetPasswordRequest from "@/hooks/mutations/useResetPasswordRequest";
import { getErrorResponse, handleValidationError } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const resetPasswordRequestBodySchema = z.object({
  email: z.string().toLowerCase().email(),
});

export type ResetPasswordRequestBodyType = z.infer<
  typeof resetPasswordRequestBodySchema
>;

export default function ResetPasswordRequestForm() {
  const router = useRouter();

  const form = useForm<ResetPasswordRequestBodyType>({
    resolver: zodResolver(resetPasswordRequestBodySchema),
  });

  const {
    resetPasswordRequestData,
    resetPasswordRequestError,
    isResetPasswordRequestPending,
    mutateResetPasswordRequestAsync,
  } = useResetPasswordRequest();

  const onSubmit = async (values: ResetPasswordRequestBodyType) => {
    try {
      await mutateResetPasswordRequestAsync(values);
      await (() => new Promise((resolve) => setTimeout(resolve, 5000)))();
      form.reset();
      router.push("/auth/signin");
    } catch (e) {
      const error = getErrorResponse(e);
      handleValidationError<ResetPasswordRequestBodyType>(error, form);
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

        <Button
          type="submit"
          className="w-full"
          style={{ marginTop: "2rem" }}
          disabled={isResetPasswordRequestPending}
        >
          SUBMIT
        </Button>

        <FormErrorAlert error={resetPasswordRequestError} />
        <FormSuccessAlert data={resetPasswordRequestData} />
      </form>
    </Form>
  );
}
