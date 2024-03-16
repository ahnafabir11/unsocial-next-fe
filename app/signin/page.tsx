import SignInForm from "@/components/SignInForm";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function page() {
  return (
    <main className="h-screen flex justify-center items-center">
      <div className="max-w-sm w-full rounded p-4 m-2 shadow">
        <h2 className="scroll-m-20 text-3xl font-bold tracking-tight">
          SIGN IN
        </h2>

        <p className="text-sm font-medium leading-none mb-8">
          Don&#39;t have an account?{" "}
          <Link href="/signup" className="underline">
            Sign Up
          </Link>
        </p>

        <SignInForm />
      </div>
    </main>
  );
}
