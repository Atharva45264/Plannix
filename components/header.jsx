import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SignInButton } from "@clerk/nextjs";
import { SignedOut } from "@clerk/nextjs";
import { SignUpButton } from "@clerk/nextjs";
import { SignedIn } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-xl z-20 border-b">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href={"/"} className="flex items-center">
            <Image
              src="/logo3.png"
              alt="Plannix logo"
              width={500}
              height={500}
              className="w-full h-13"
              priority
            />
          </Link>
          {/* Search and Location */}

          {/* Right side actions */}
          <div className="flex items-center">
            <SignedIn>
              {/* Create Events  */}
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton>
                <Button size="sm">Sign in</Button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>

        {/* Mobile serch location - below navbar  */}
      </nav>

      {/* Modals  */}
    </>
  );
};

export default Header;
