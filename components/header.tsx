"use client"
import Link from 'next/link';
import {
  CircleUser,
  Menu,
  Package2,
  Search,
} from 'lucide-react';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useRouter, usePathname } from 'next/navigation';
import type { NextRequest } from 'next/server'

import { cn } from '@/lib/utils';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname()
  const getLinkClass = (path: string) => {
    return pathname === path
      ? 'text-active-color' // Replace with your active link class
      : 'text-muted-foreground hover:text-foreground'; // Replace with your inactive link class
  };

  return (
    <>
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
            {/* <Package2 className="h-6 w-6" /> */}
            <Image src={'/assets/images/ororama.png'} height={120} width={320} alt="ororama" />
            {/* <span className="sr-only">Acme Inc</span> */}
          </Link>
          <Link href="/admin_dashboard" className={getLinkClass('/admin_dashboard')}>
            Dashboard
          </Link>
          <Link href="/admin_dashboard/products" className={getLinkClass('/admin_dashboard/products')}>
            Products
          </Link>
          <Link href="/admin_dashboard/employees" className={getLinkClass('/admin_dashboard/cashiers')}>
            Employee
          </Link>
          <Link href="/admin_dashboard/analytics" className={getLinkClass('/admin_dashboard/analytics')}>
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link href="/admin_dashboard" className={getLinkClass("/admin_dashboard")}>
                Dashboard
              </Link>
              <Link href="/admin_dashboard/products" className={getLinkClass("/admin_dashboard/products")}>
                Products
              </Link>
              <Link href="/admin_dashboard/analytics" className={getLinkClass('/admin_dashboard/employees')}>
                Employees
              </Link>
              <Link href="/admin_dashboard/analytics" className={getLinkClass("/admin_dashboard/analytics")}>
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search products..." className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]" />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full h-[7vh] w-[10vw] py-[1vh] px-[1vw] flex justify-center items-center ">
                <Avatar className='m-[1vh]'>
                  <AvatarImage src="/assets/gif/pikachu-pixel.gif"  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                {/* <CircleUser className="h-5 w-5" /> */}
                <span>{sessionStorage.getItem('fullname')}</span>
                <span className="sr-only">Toggle user menu</span>
                
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>   
    
  );
}
