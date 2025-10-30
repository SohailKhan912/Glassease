"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status]);
  if (status === "loading") return <div>Loading...</div>;
  if (!session) return null;
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded dark:bg-neutral-800">
      <h2 className="font-bold text-xl mb-2">My Account</h2>
      <div><b>Name:</b> {session.user?.name}</div>
      <div><b>Email:</b> {session.user?.email}</div>
      {/* Add more profile details and actions here */}
    </div>
  );
}
