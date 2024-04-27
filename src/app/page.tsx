"use client";
import { Steps } from "./components/Steps";
import { UserProvider } from "@/contexts/UserContext";

export default function Home() {
  return (
    <UserProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Steps />
      </main>
    </UserProvider>
  );
}
