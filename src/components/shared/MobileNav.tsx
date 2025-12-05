
"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Menu,
  X,
  LogOut,
  User,
  LayoutDashboard,
  ExternalLink,
} from "lucide-react";

export default function MobileNav() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="lg:hidden">
     
      <button
        onClick={toggleMenu}
        className="p-2 text-gray-600 hover:text-gray-900"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

   
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={closeMenu} />
      )}

      
      <div
        className={`fixed right-0 top-0 z-50 h-full w-72 transform bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
        
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="font-bold">CareerHub</span>
            </div>
            <button
              onClick={closeMenu}
              className="p-2 text-gray-600 hover:text-gray-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

         
          <nav className="flex-1 space-y-1 p-4">
            {session ? (
              <>
                <div className="mb-4 rounded-lg bg-gray-50 p-3">
                  <div className="flex items-center space-x-2">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm font-medium">
                        {session.user?.name || "User"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {session.user?.email}
                      </p>
                    </div>
                  </div>
                </div>

                {(session.user as any)?.companySlug && (
                  <>
                    <Link
                      href={`/${(session.user as any).companySlug}/edit`}
                      onClick={closeMenu}
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <LayoutDashboard className="h-5 w-5" />
                      <span>Dashboard</span>
                    </Link>
                    <Link
                      href={`/${(session.user as any).companySlug}/careers`}
                      target="_blank"
                      onClick={closeMenu}
                      className="flex items-center space-x-3 rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <ExternalLink className="h-5 w-5" />
                      <span>View Careers Page</span>
                    </Link>
                  </>
                )}

                <button
                  onClick={() => {
                    signOut({ callbackUrl: "/" });
                    closeMenu();
                  }}
                  className="flex w-full items-center space-x-3 rounded-lg px-3 py-2 text-red-600 hover:bg-red-50"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Sign In
                </Link>
                <Link href="/register" onClick={closeMenu}>
                  <Button className="mt-2 w-full">Get Started</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </div>
  );
}