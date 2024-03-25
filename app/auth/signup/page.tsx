import SignUpForm from "@/components/SignUpForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function page() {
  return (
    <>
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">SIGN UP</h2>

      <p className="text-sm font-medium leading-none">
        Already have an account?{" "}
        <Link href="/auth/signin" className="underline">
          Sign In
        </Link>
      </p>

      <p className="text-sm font-medium leading-none mb-8">
        Forgot your password?{" "}
        <Link href="/auth/reset-password" className="underline">
          Reset Password
        </Link>
      </p>

      <SignUpForm />
    </>
  );
}
