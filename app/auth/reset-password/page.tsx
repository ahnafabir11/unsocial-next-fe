import ResetPasswordRequestForm from "@/app/auth/reset-password/ResetPasswordRequestForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Reset Password",
};

export default function ResetPassword() {
  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
        Reset Password
      </h2>

      <p className="text-sm font-medium leading-none">
        Already have an account?{" "}
        <Link href="/auth/signin" className="underline">
          Sign In
        </Link>
      </p>

      <p className="text-sm font-medium leading-none mb-8">
        Don&#39;t have an account?{" "}
        <Link href="/auth/signup" className="underline">
          Sign Up
        </Link>
      </p>

      <ResetPasswordRequestForm />
    </>
  );
}
