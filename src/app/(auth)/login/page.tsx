"use client";
import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/axios';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");
    setIsLoading(true);
    console.log("email:", email, "password:", password)

    try {
      const response = await api.post('/auth/login', { email, password });
      console.log(response.data);

      if (response.data?.data?.access_token) {
        // រក្សាទុកសម្រាប់ Middleware និងការប្រើប្រាស់បន្ត
        document.cookie = "isLoggedIn=true; path=/"; 
        localStorage.setItem("access_token", response.data.data.access_token);

        setSuccessMsg("Login Successful!");
        setTimeout(() => {
          router.push("/dashboard");
        }, 2000);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Email ឬ Password មិនត្រឹមត្រូវ!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="flex items-center">
             <span className="text-4xl font-bold text-blue-500 italic">C</span>
             <span className="text-4xl font-bold text-yellow-500">HRMS</span>
          </div>
          <p className="text-[10px] text-blue-900 font-semibold uppercase">Human Resource Management System</p>
        </div>

        {successMsg && <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 text-sm text-center font-medium animate-pulse">{successMsg}</div>}
        {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-yellow-500/50 outline-none" placeholder="admin@example.com" />
              <Mail className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-yellow-500/50 outline-none" placeholder="••••••••" />
              <div className="absolute right-3 top-2.5 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <button type="button" className="hover:underline">Forget password?</button>
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">Register</Link>
          </div>
          <button type="submit" disabled={isLoading} className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#f8be5a] hover:bg-[#f0ad35]'} text-white font-bold py-3 rounded-md shadow-sm transition-all mt-4`}>
            {isLoading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}