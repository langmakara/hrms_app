"use client";
import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // ប្រើ Link សម្រាប់ប្តូរទៅទំព័រ Register

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(""); // State សម្រាប់សារជោគជ័យ

  const EXAMPLE_USER = {
    email: "admin@gmail.com",
    password: "password123"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (email === EXAMPLE_USER.email && password === EXAMPLE_USER.password) {
      setSuccessMsg("Login Successful!"); // បង្ហាញសារ

      // កំណត់ឱ្យរង់ចាំ ២ វិនាទី ទើបដូរទៅទំព័រ Dashboard
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
      
    } else {
      setError("Email ឬ Password មិនត្រឹមត្រូវទេ!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center">
             <span className="text-4xl font-bold text-blue-500 italic">C</span>
             <span className="text-4xl font-bold text-yellow-500">HRMS</span>
          </div>
          <p className="text-[10px] text-blue-900 font-semibold uppercase tracking-tighter text-center">
            Human Resource Management System
          </p>
        </div>

        {/* បង្ហាញសារ Login Successful រយៈពេល ២ វិនាទី */}
        {successMsg && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center font-medium animate-pulse">
            {successMsg}
          </div>
        )}

        {/* បង្ហាញ Error */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@gmail.com"
                className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
              <Mail className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
              <div 
                className="absolute right-3 top-2.5 cursor-pointer text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>
          </div>

          {/* កែសម្រួលចំណុច Register តាមសំណូមពរ */}
          <div className="flex justify-between text-xs text-gray-600">
            <button type="button" className="hover:underline">Forget password?</button>
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">
              Register
            </Link>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#f8be5a] hover:bg-[#f0ad35] text-white font-bold py-3 rounded-md shadow-sm transition-all active:scale-[0.98] mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}