"use client";

import Image from "next/image";
import Link from "next/link";
import {
  SignInButton,
  UserButton,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo3.png"
            alt="Plannix logo"
            width={120}
            height={40}
            priority
          />
        </Link>

        <div className="flex items-center gap-2">

          <Button variant="ghost" size="sm">
            Pricing
          </Button>

          <Button variant="ghost" size="sm" asChild>
            <Link href="/explore">Explore</Link>
          </Button>

          {/* Clerk Auth */}
          <SignedOut>
  <SignInButton mode="modal">
    <span className="px-3 py-2 text-sm hover:text-white cursor-pointer">
      Sign in
    </span>
  </SignInButton>
</SignedOut>

          <SignedIn>
            <Button size="sm" asChild className="flex gap-2">
              <Link href="/create-event">
                <Plus className="w-4 h-4" />
                Create Event
              </Link>
            </Button>

            <UserButton />
          </SignedIn>

        </div>
      </div>
    </nav>
  );
}