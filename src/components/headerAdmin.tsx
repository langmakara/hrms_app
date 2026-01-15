"use client";

import { Bell, User, Settings, LogOut } from "lucide-react"; // បន្ថែម Icon
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProfileImg from "../assets/profile.png";
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

// កំណត់ Style ឱ្យ Modal មើលទៅស្អាតដូចក្នុងរូប
const style = {
  position: 'absolute',
  top: '70px', // ឱ្យវាបង្ហាញនៅក្រោម Profile ក្នុង Header
  right: '20px',
  width: 250,
  bgcolor: 'background.paper',
  borderRadius: '12px', // ធ្វើឱ្យជ្រុងមូល
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
  p: 2,
  outline: 'none',
};

export default function HeaderAdminpage() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Function សម្រាប់ Logout
  const handleLogout = () => {
    // លុប Cookie ដែលយើងបានបង្កើតក្នុង middleware
    document.cookie = "isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    handleClose();
    router.push("/login"); // បញ្ជូនទៅទំព័រ Login
  };

  const getRouteName = () => {
    const routes: Record<string, string> = {
      "/admin-dashboard": "Admin Dashboard",
      "/user": "User",
      "/departments": "Departments",
      "/reports": "Reports"
    };
    
    const name = routes[pathname] || "";
    return name ? (
      <div className="flex px-8">
        <span className="text-[20px] font-medium">{name}</span>
      </div>
    ) : null;
  };

  return (
    <header className="h-16 flex items-center justify-between border-b-4 border-gray-200">
      <div className="flex items-start">
        {getRouteName()}
      </div>
      
      <div className="flex items-center gap-6 px-8">
        {/* Notification Icon */}
        <div className="relative cursor-pointer hover:opacity-70 transition-opacity text-gray-500">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
            9+
          </span>
        </div>

        {/* Profile Section */}
        <div className="relative">
          <div 
            className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all" 
            onClick={handleOpen}
          >
            <Image src={ProfileImg} alt="Profile" width={36} height={36} className="object-cover" />
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="profile-menu"
            // លុប Backdrop ខ្មៅចេញ បើអ្នកចង់ឱ្យវាដូច Menu Dropdown ធម្មតា
            slotProps={{ backdrop: { style: { backgroundColor: 'transparent' } } }} 
          >
            <Box sx={style}>
              <div className="flex flex-col gap-1">
                <button 
                  onClick={handleLogout}
                  className="mt-2 flex items-center justify-center gap-2 w-full bg-[#FF5A5A] hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-all shadow-sm"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </header>
  );
}