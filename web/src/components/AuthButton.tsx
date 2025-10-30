"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="w-20">Loading...</div>;
  if (!session)
    return <button onClick={() => signIn()} className="rounded px-3 py-1 bg-blue-600 text-white font-semibold hover:bg-blue-700">Sign In</button>;
  return (
    <div className="flex items-center gap-2">
      <span className="font-medium">{session.user?.name ?? session.user?.email}</span>
      <button onClick={() => signOut()} className="rounded px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-neutral-700 dark:text-gray-100 dark:hover:bg-neutral-600">Sign Out</button>
      <Link href="/account" className="ml-2 text-blue-600 hover:underline">Account</Link>
    </div>
  );
}
