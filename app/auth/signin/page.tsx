import SignInForm from "@/components/SignInForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function page() {
  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">SIGN IN</h2>

      <p className="text-sm font-medium leading-none">
        Don&#39;t have an account?{" "}
        <Link href="/auth/signup" className="underline">
          Sign Up
        </Link>
      </p>

      <p className="text-sm font-medium leading-none mb-8">
        Forgot your password?{" "}
        <Link href="/auth/reset-password" className="underline">
          Reset Password
        </Link>
      </p>

      <SignInForm />
    </>
  );
}
