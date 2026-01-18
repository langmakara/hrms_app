"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import UniversalModal from '../../../components/UniversalModal';
import UserForm, { UserFormData } from '../../../components/Forms/userForm'; 
import Profile from "../../../assets/profile.png";
import * as React from 'react';


const initialData: UserFormData = {
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
    profileImage: Profile,
};

const managersList = [
  { id: "EM010", name: "Sok Dara" },
  { id: "EM011", name: "Chan Vutha" },
  { id: "EM012", name: "Meas Sreyneang" },
];

export default function ProfilePage() {
    // បង្កើត State សម្រាប់គ្រប់គ្រងទិន្នន័យ Profile ដែលបង្ហាញលើ Screen
    const [userData, setUserData] = useState<UserFormData>(initialData);

    // បង្កើត State សម្រាប់ Modal
    const [modal, setModal] = useState<{
        open: boolean;
        mode: 'add' | 'edit' | 'profile';
        data?: UserFormData;
    }>({
        open: false,
        mode: 'edit',
        data: undefined,
    });

    const handleOpenEdit = () => {
        setModal({
            open: true,
            mode: 'edit',
            data: userData // បញ្ជូនទិន្នន័យបច្ចុប្បន្នទៅ Form
        });
    };

    const handleCloseModal = () => {
        setModal({ ...modal, open: false });
    };

    const handleSubmit = (updatedData: UserFormData) => {
        console.log("Updated Data:", updatedData);
        setUserData(updatedData); // Update ទិន្នន័យលើ Screen
        handleCloseModal();
        alert("រក្សាទុកទិន្នន័យបានជោគជ័យ!");
    };

    return (
        <div className="p-3">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 items-stretch">
                
                {/* ផ្នែកខាងឆ្វេង (Sidebar Profile) */}
                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 flex flex-col items-center h-full">
                        <div className="flex items-center justify-center mb-4 relative w-32 h-32 rounded-full overflow-hidden border">
                            <Image 
                                src={userData.profileImage || Profile} 
                                alt="Profile" 
                                fill 
                                className="object-cover" 
                            />
                        </div>
                        <div className="mt-4 text-center">
                            <h2 className="text-xl font-semibold text-gray-800">{userData.name}</h2>
                            <p className="text-gray-600">ID: {userData.id}</p>
                            <p className="text-gray-600">Phone: {userData.phone}</p>
                        </div>
                    </div>
                </div>

                {/* ផ្នែកខាងស្តាំ (Main Info) */}
                <div className="lg:col-span-4">
                    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full flex flex-col justify-between">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">
                            <InfoField label="Full Name" value={userData.name} />
                            <InfoField label="ID" value={userData.id} />
                            <InfoField label="Gender" value={userData.gender} />
                            <InfoField label="Date of Birth" value={userData.dob} />
                            <InfoField label="Work Email" value={userData.email} />
                            <InfoField label="Phone Number" value={userData.phone} />
                            <InfoField label="Address" value={userData.address} className="lg:col-span-2" />
                            <InfoField label="Status" value={userData.status} />
                            <InfoField label="Date of Hire" value={userData.dateHire} />
                            <InfoField label="Department" value={userData.department} />
                            <InfoField label="Position" value={userData.position} />
                            <InfoField label="Emergency Contact" value={userData.emergencyContact} />
                            <InfoField label="Manager ID" value={userData.managerId} />
                            <InfoField 
                                label="Manager Name" 
                                value={managersList.find(m => m.id === userData.managerId)?.name || "N/A"} 
                            />
                        </div>

                        <div className="flex justify-end mt-6">
                            <button 
                                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors shadow-md" 
                                onClick={handleOpenEdit}
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* UniversalModal & UserForm */}
            <UniversalModal 
                open={modal.open} 
                onClose={handleCloseModal}
                title="Edit Profile"
            >
                <UserForm 
                    mode={modal.mode}
                    initialData={modal.data}
                    managers={managersList}
                    onClose={handleCloseModal}
                    onSubmit={(data: UserFormData) => handleSubmit(data)}
                />
            </UniversalModal>
        </div>
    );
}

// Component តូចសម្រាប់បង្ហាញ Field ទិន្នន័យឱ្យមានរបៀប
function InfoField({ label, value, className = "" }: { label: string, value: string, className?: string }) {
    return (
        <div className={`space-y-1 ${className}`}>
            <label className="text-sm font-medium text-gray-500">{label}</label>
            <div className="bg-gray-50 border border-gray-200 rounded-md px-4 py-2 text-gray-800">
                {value || "---"}
            </div>
        </div>
    );
}