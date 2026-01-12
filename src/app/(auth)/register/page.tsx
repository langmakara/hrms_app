"use client";
import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-2xl">
        {/* Logo (Same as Login) */}
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center">
             <span className="text-4xl font-bold text-blue-500 italic">C</span>
             <span className="text-4xl font-bold text-yellow-500">HRMS</span>
          </div>
          <p className="text-[10px] text-blue-900 font-semibold uppercase">Human Resource Management System</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium">Work Email</label>
            <input type="email" className="w-full border border-gray-300 rounded-md p-2 mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-md p-2 mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <input type="text" className="w-full border border-gray-300 rounded-md p-2 mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Company Name</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-md p-2 mt-1 appearance-none bg-white">
                  <option>Select...</option>
                </select>
                <ChevronDown className="absolute right-3 top-4 text-gray-400 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Company Name</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-md p-2 mt-1 appearance-none bg-white">
                <option>Select...</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input type="text" className="w-full border border-gray-300 rounded-md p-2 mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Phone Number</label>
            <input type="tel" className="w-full border border-gray-300 rounded-md p-2 mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Job Title</label>
            <div className="relative">
              <select className="w-full border border-gray-300 rounded-md p-2 mt-1 appearance-none bg-white">
                <option>Select...</option>
              </select>
              <ChevronDown className="absolute right-3 top-4 text-gray-400 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          <div className="flex justify-center pt-4">
            <button className="bg-[#f8be5a] hover:bg-[#f0ad35] text-white font-bold py-2 px-12 rounded-md shadow-sm transition-colors">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}