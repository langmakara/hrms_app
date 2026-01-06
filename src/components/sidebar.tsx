"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // ប្រើសម្រាប់ឆែក Route បច្ចុប្បន្ន
import Logo from '../assets/Logo.png';

import { 
  LayoutDashboard, 
  UserRound, 
  Users, 
  GitPullRequest, 
  CalendarCheck, 
  Coins 
} from 'lucide-react';    

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, id: "dashboard", href: "/dashboard" },
  { title: "Profile", icon: UserRound, id: "profile", href: "/profile" },
  { title: "Employees", icon: Users, id: "employees", href: "/employees" },
  { title: "Request", icon: GitPullRequest, id: "request", href: "/request" },
  { title: "Attendance", icon: CalendarCheck, id: "attendance", href: "/attendance" },
  { title: "Payroll", icon: Coins, id: "payroll", href: "/payroll" },
];

const Sidebar = () => {
  const pathname = usePathname(); // យក URL បច្ចុប្បន្ន (ឧទាហរណ៍៖ /payroll)

  return (
    <aside className="w-64 h-screen bg-white text-black p-5 border-r border-gray-200 hidden md:flex flex-col gap-8 fixed left-0 top-0">
      {/* Logo Section */}
      <div className="flex items-center px-8">
        <Image src={Logo} alt="Logo" width={140} height={40} className="object-contain" />
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          // បើ pathname ដូចនឹង item.href នោះវាគឺជា Active
          const isActive = pathname === item.href;

          return (
            <Link 
              key={item.id} 
              href={item.href}  
              className={`flex items-center gap-3 p-3 rounded-lg transition-all
                ${isActive 
                  ? "bg-[#F7BD52] text-black shadow-sm" // ពណ៌ពេលនៅចំ Route ហ្នឹង
                  : "text-gray-600 hover:bg-gray-100 hover:text-black"
                }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;