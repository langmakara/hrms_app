  "use client";

  import { Bell } from "lucide-react";
  import { usePathname } from "next/navigation";
  import Link from "next/link";
  import Image from "next/image";
  import Profile from "../assets/profile.png";
  import * as React from 'react';
  import Box from '@mui/material/Box';
  import Typography from '@mui/material/Typography';
  import Modal from '@mui/material/Modal';
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  export default function Header() {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const getRouteName = () => {
      if (pathname === "/dashboard"){
        return (
          <div className="flex px-8">
            <span className="text-Size-20">Dashboard</span>
          </div>
        );
      };
      if (pathname === "/profile") {
        return (
          <div className="flex gap-6">
            <span className="text-Size-20 mx-6">Profile</span>
            
            {/* <Link href="/profile/edit">
              <span className="text-Size-20">Edit Profile</span>
            </Link> */}
          </div>
        )
      };
      if (pathname === "/employees") {
        return (
          <div className="flex gap-6">
            <span className="text-Size-20 mx-6">Employee</span>
          </div>
        )
      };
      if (pathname === "/request") {
        return(
          <div className="flex gap-6">
            <span className="text-Size-20 mx-6">Request</span>
          </div>
        )
      }
      if (pathname === "/attendance") return "Attendance";
      if (pathname === "/payroll") return "Payroll";
      return "";
    }

    return (
      <header className="h-16 flex items-center justify-between border-b-3 border-gray-300">
        {/* Link តាម Route */}
        <div className="flex items-start">
          {getRouteName()}
        </div>
        
        <div className="flex items-center gap-6 px-8">
          {/* Notification Icon */}
          <div className="relative cursor-pointer hover:opacity-70 transition-opacity">
            <Bell size={24} className="text-gray-600" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[12px] w-4 h-4 flex items-center justify-center rounded-full">
              9+
            </span>
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-300 " onClick={handleOpen}>
              <Image src={Profile} alt="Profile" width={36} height={36} className="object-cover" />
            </div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Text in a modal
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
      </header>
    );
  }