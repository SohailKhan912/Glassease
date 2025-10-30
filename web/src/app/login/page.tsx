"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const error = params.get("error");
  return (
    <div className="max-w-md mx-auto mt-16 bg-white shadow rounded px-6 py-8 dark:bg-neutral-800">
      <h1 className="font-bold text-2xl mb-2 text-blue-600">Sign in to FlipEase</h1>
      <button className="w-full mt-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium"
        onClick={() => signIn("google")}
      >Sign in with Google</button>
      <div className="my-4 text-center text-gray-400">or</div>
      <form onSubmit={e => { e.preventDefault(); signIn("credentials", { callbackUrl: "/" }); }} className="flex flex-col gap-3">
        <input name="email" placeholder="Email" type="email" required className="rounded border px-3 py-2" />
        <input name="password" placeholder="Password" type="password" required className="rounded border px-3 py-2" />
        <button type="submit" className="bg-blue-600 mt-2 text-white rounded px-4 py-2 hover:bg-blue-700">Sign In</button>
      </form>
      {error && <div className="text-red-500 mt-3">Sign in failed. Please try again.</div>}
    </div>
  );
}
