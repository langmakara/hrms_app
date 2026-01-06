
"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Profile from "../../assets/profile.png";
import Link from "next/link";
import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { he } from "date-fns/locale";
import { BsJustify } from "react-icons/bs";

const initialData = {
    name: "Lang Makara",
    id: "EM001",
    gender: "Male",
    dob: "2000-07-06",
    email: "mrlucky467@gmail.com",
    phone: "086 883 239",
    address: "St2002, Sensok, Phnom Penh",
    status: "Work",
    dateHire: "2020-07-07", 
    department: "IT",
    position: "Frontend",
    emergencyContact: "098 765 432",
    managerId: "EM010",
    managerName: "Sok Dara",
    profileImage: Profile,
};

const managers = [
  { id: "EM010", name: "Sok Dara" },
  { id: "EM011", name: "Chan Vutha" },
  { id: "EM012", name: "Meas Sreyneang" },
];

const style = {
  position: 'absolute',
  top: '40%',
  left: '60%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height: 600,
  p: 4, 
};

const DataProfile = {
    name: "Lang Makara",
    id: "EM001",
    gender: "Male",
    dob: "06/07/2000",
    email: "mrlucky467@gmail.com",
    phone: "086 883 239",
    address: "St2002, Sensok, Phnom Penh",
    status: "Work",
    dateHire: "07/07/2020",
    department: "IT",
    position: "Frontend",
    emergencyContact: "098 765 432",
    managerId: "EM010",
    managerName: "Sok Dara",
};

export default function ProfilePage() {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [formData, setFormData] = useState(initialData);
      const fileInputRef = useRef<HTMLInputElement>(null);
    
      const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          const imageUrl = URL.createObjectURL(file);
          setFormData({ ...formData, profileImage: imageUrl as any });
        }
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Updated Data:", formData);
        alert("រក្សាទុកទិន្នន័យបានជោគជ័យ!");
      };
  return (
    <div className="p-3">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-stretch">

        {/* ផ្នែកខាងស្តាំ (Right Content - យក ១ ភាគ 3) */}
        <div className="lg:col-span-1 space-y-3 ">

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center h-full">
                <div className="flex items-center justify-center w-full mb-4">
                    <Image src={Profile} alt="Logo" width={140} height={40} className="object-contain" />
                </div>
                <div className="mt-4">
                    <h2 className="text-xl font-semibold text-gray-800 ">Name: {DataProfile.name}</h2>
                    <p className="text-gray-600">Id: {DataProfile.id}</p>
                    <p className="text-gray-600">Phone: {DataProfile.phone}</p>
                </div>
            </div>
        </div>
        <div className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Full Name</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.name}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">ID</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.id}
                        </div>    
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Gender</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.gender}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.dob}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Work Email</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.email}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.phone}
                        </div>
                    </div>

                    <div className="space-y-1 lg:col-span-2">
                        <label className="text-sm font-medium text-gray-700">Address</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.address}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Status</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.status}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Date of Hire</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.dateHire}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Department</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.department}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Position</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.position}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.emergencyContact}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Manager ID</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.managerId}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Manager Name</label>
                        <div className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 shadow-sm">
                            {DataProfile.managerName}
                        </div>
                    </div>
                </div>

                {/* Modal for Edit Profile */}
                <div className="flex justify-end">
                    <button className="mt-6 bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors" onClick={handleOpen}>
                        Edit
                    </button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <div className="p-3 min-h-screen">
                                        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-stretch">
                            
                                            {/* ផ្នែកខាងឆ្វេង (Sidebar Profile) - កែសម្រួល Div ដែលស្ទួន */}
                                            <div className="lg:col-span-1">
                                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center h-full">
                                                    
                                                    {/* កន្លែងបង្ហាញរូបភាព និងប្តូររូបភាព */}
                                                    <div className="flex flex-col items-center justify-center w-full mb-4">
                                                        <div 
                                                            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-green-100 shadow-sm cursor-pointer group"
                                                            onClick={() => fileInputRef.current?.click()} 
                                                        >
                                                            <Image 
                                                            src={formData.profileImage} 
                                                            alt="Profile" 
                                                            fill 
                                                            className="object-cover group-hover:opacity-70 transition-opacity" 
                                                            />
                                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 text-white text-xs font-medium">
                                                            Change Photo
                                                            </div>
                                                        </div>
                                                    
                                                        <input 
                                                            type="file" 
                                                            ref={fileInputRef} 
                                                            onChange={handleImageChange} 
                                                            className="hidden" 
                                                            accept="image/*" 
                                                        />
                                                    </div>
                            
                                                    <div className="mt-4 text-start">
                                                        <h2 className="text-xl font-semibold text-gray-800 ">Name: {formData.name}</h2>
                                                        <p className="text-gray-500 text-sm">ID: {formData.id}</p>
                                                        <p className="text-gray-500 text-sm">Phone: {formData.phone}</p>
                                                    </div>
                                                </div>
                                            </div>
                            
                                            {/* ផ្នែកខាងស្តាំ (Main Form) */}
                                            <div className="lg:col-span-3">
                                                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full flex flex-col justify-between">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Full Name</label>
                                                            <input
                                                            type="text"
                                                            name="name"
                                                            value={formData.name}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none transition-all shadow-sm"
                                                            />
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">ID</label>
                                                            <input
                                                            type="text"
                                                            name="id"
                                                            value={formData.id}
                                                            readOnly
                                                            className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-500 cursor-not-allowed outline-none"
                                                            />
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Gender</label>
                                                            <select
                                                            name="gender"
                                                            value={formData.gender}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none transition-all shadow-sm"
                                                            >
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                                                            <input
                                                            type="date"
                                                            name="dob"
                                                            value={formData.dob}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                                                            />
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Work Email</label>
                                                            <input
                                                            type="email"
                                                            name="email"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                                                            />
                                                        </div>
                                                        
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                                            <input
                                                            type="text"
                                                            name="phone"
                                                            value={formData.phone}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                                                            />
                                                        </div>
                            
                                                        <div className="space-y-1 lg:col-span-2">
                                                            <label className="text-sm font-medium text-gray-700">Address</label>
                                                            <input
                                                            type="text"
                                                            name="address"
                                                            value={formData.address}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                                                            />
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Status</label>
                                                            <select
                                                            name="status"
                                                            value={formData.status}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
                                                            >
                                                            <option value="Work">Work</option>
                                                            <option value="Leave">Leave</option>
                                                            <option value="Resign">Resign</option>
                                                            </select>
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Date of Hire</label>
                                                            <input
                                                            type="date"
                                                            name="dateHire" // កែពី hireDate មក dateHire ឱ្យត្រូវជាមួយ state
                                                            value={formData.dateHire}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                                                            />
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Department</label>
                                                            <select
                                                            name="department"
                                                            value={formData.department}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
                                                            >
                                                            <option value="IT">IT</option>
                                                            <option value="HR">HR</option>
                                                            <option value="Finance">Finance</option>
                                                            <option value="Marketing">Marketing</option>
                                                            </select>
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Position</label>
                                                            <select
                                                            name="position"
                                                            value={formData.position}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
                                                            >
                                                            <option value="Frontend">Frontend</option>
                                                            <option value="Backend">Backend</option>
                                                            <option value="UI/UX">UI/UX Designer</option>
                                                            <option value="Mobile">Mobile Developer</option>
                                                            </select>
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
                                                            <input
                                                            type="text"
                                                            name="emergencyContact"
                                                            value={formData.emergencyContact}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none"
                                                            />
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Manager ID</label>
                                                            <select
                                                            name="managerId"
                                                            value={formData.managerId}
                                                            onChange={handleChange}
                                                            className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none shadow-sm"
                                                            >
                                                            <option value="">Select Manager</option>
                                                            {managers.map((manager) => (
                                                                <option key={manager.id} value={manager.id}>
                                                                {manager.id}
                                                                </option>
                                                            ))}
                                                            </select>
                                                        </div>
                            
                                                        <div className="space-y-1">
                                                            <label className="text-sm font-medium text-gray-700">Manager Name</label>
                                                            <input
                                                                type="text"
                                                                value={managers.find(m => m.id === formData.managerId)?.name || ""}
                                                                readOnly
                                                                className="w-full border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none bg-gray-50"
                                                            />
                                                        </div>
                            
                                                    </div>
                            
                                                    {/* Action Buttons */}
                                                    <div className="justify-end flex flex-row mt-6">
                                                        <button
                                                            type="button"
                                                            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors mr-2"
                                                            onClick={handleClose}
                                                        >
                                                            Cancel 
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            className="bg-green-400 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
                                                        >
                                                                Apply
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                        </Box>
                    </Modal>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}