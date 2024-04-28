"use client";
import { Main } from "./main";
import { UserProvider } from "@/contexts/UserContext";

export default function Home() {
  console.log("Home");
  return (
    <UserProvider>
      <main className="min-h-[800px] flex w-screen justify-center p-24">
        <Main />
      </main>
    </UserProvider>
  );
}
