"use client";
import { Main } from "./main";
import { UserProvider } from "@/contexts/UserContext";

export default function Home() {
  return (
    <UserProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Main />
      </main>
    </UserProvider>
  );
}
