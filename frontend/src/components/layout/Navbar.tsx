"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BarChart2, Menu, Settings } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function Navbar() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <BarChart2 className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl inline-flex">
              <span>ViSuAl</span>
              <span className="text-primary">Iser</span>
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <Button 
            variant={isActive("/") ? "default" : "ghost"} 
            size="sm"
            className={`rounded-full ${isActive("/") ? "bg-primary" : ""}`}
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
          <Button 
            variant={isActive("/visualization") ? "default" : "ghost"} 
            size="sm"
            className={`rounded-full ${isActive("/visualization") ? "bg-primary" : ""}`}
            asChild
          >
            <Link href="/visualization">Visualization</Link>
          </Button>
          <Button 
            variant={isActive("/settings") ? "default" : "ghost"} 
            size="sm"
            className={`rounded-full ${isActive("/settings") ? "bg-primary" : ""}`}
            asChild
          >
            <Link href="/settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <div className="md:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px] rounded-xl p-2">
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted rounded-lg">
                  <Link href="/" className="w-full h-full flex items-center py-1.5">Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted rounded-lg">
                  <Link href="/visualization" className="w-full h-full flex items-center py-1.5">Visualization</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer hover:bg-muted rounded-lg">
                  <Link href="/settings" className="w-full h-full flex items-center py-1.5">Settings</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
} 