"use client";

import React from 'react';

// 1. Define the Shape of your Data
interface Department {
    id: string;
    name: string;
    manager: string;
    employees: number;
    budget: string;
}

// 2. Mock Data
const departments: Department[] = [
    { id: 'DEPT001', name: 'Engineering', manager: 'John Doe', employees: 100, budget: '$800,000' },
    { id: 'DEPT002', name: 'Marketing', manager: 'Jane Smith', employees: 85, budget: '$650,000' },
    { id: 'DEPT003', name: 'Finance', manager: 'Robert Brown', employees: 75, budget: '$500,000' },
    { id: 'DEPT004', name: 'Human Resources', manager: 'Emily Davis', employees: 60, budget: '$450,000' },
    { id: 'DEPT005', name: 'Operations', manager: 'Michael Wilson', employees: 95, budget: '$750,000' },
    { id: 'DEPT006', name: 'Sales', manager: 'Sarah Jenkins', employees: 88, budget: '$680,000' },
];

// 3. Reusable Card Component
function DepartmentCard({ dept }: { dept: Department }) {
    return (
        <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition-shadow">
            {/* Header: Title and Edit Button */}
            <div className="flex justify-between items-start mb-6">
                <h2 className="font-bold text-lg text-gray-900 leading-tight">
                    {dept.name}
                </h2>
                <button className="text-blue-600 text-sm font-semibold hover:underline decoration-2 underline-offset-4 shrink-0 ml-2">
                    Edit
                </button>
            </div>

            {/* Stats Section: flex-grow ensures button stays at bottom */}
            <div className="space-y-4 mb-8 flex-grow">
                <div className="flex justify-between items-baseline gap-4">
                    <span className="text-gray-400 text-sm font-medium whitespace-nowrap">Manager:</span>
                    <span className="font-semibold text-gray-800 text-right">{dept.manager}</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                    <span className="text-gray-400 text-sm font-medium whitespace-nowrap">Employees:</span>
                    <span className="font-semibold text-gray-800 text-right">{dept.employees}</span>
                </div>
                <div className="flex justify-between items-baseline gap-4">
                    <span className="text-gray-400 text-sm font-medium whitespace-nowrap">Budget:</span>
                    <span className="font-semibold text-gray-800 text-right">{dept.budget}</span>
                </div>
            </div>

            {/* Action Button */}
            <button className="w-full py-2.5 px-4 border border-blue-400 text-blue-500 rounded-md font-bold hover:bg-blue-50 transition-colors">
                View Detail
            </button>
        </div>
    );
}

// 4. Main Page Component
export default function DepartmentsPage() {
    return (
        <div className="p-3 md:p-3">
            <div className="mx-auto">
                {/* Responsive Grid Logic:
                  - grid-cols-1: Mobile (Default)
                  - sm:grid-cols-2: Large Phones / Tablets
                  - lg:grid-cols-3: Desktop / Laptops
                  - xl:grid-cols-4: Large Monitors
                */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {departments.map((dept) => (
                        <DepartmentCard key={dept.id} dept={dept} />
                    ))}
                </div>
            </div>
        </div>
    );
}