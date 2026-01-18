"use client";

import React, { useState, Suspense } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { LoginData } from '@/services/auth/types';
import { useLogin } from '@/services/auth/auth-service';
import Loading from '@/components/loading';

function LoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMsg, setSuccessMsg] = useState("");

  const login = useLogin({
    onSuccess: () => {
      setSuccessMsg("Login Successful!");
      const redirect = searchParams.get('redirect') || "/dashboard";
      router.push(redirect);
    },
  });

  // Client-side validation
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}
    if (!formData.email) {
      newErrors.email = "Email or phone is required"
    } else if (formData.email.includes("@") && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    if (!validateForm()) {
      return
    }

    login.submit({ email: formData.email, password: formData.password });
  }

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
        {errors.general && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 text-sm text-center">{errors.general}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Email</label>
            <div className="relative">
              <input type="email" required value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-yellow-500/50 outline-none" placeholder="admin@example.com" />
              <Mail className="absolute right-3 top-2.5 text-gray-400 w-5 h-5" />
            </div>
            {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="block text-gray-700 mb-1 text-sm font-medium">Password</label>
            <div className="relative">
              <input type={showPassword ? "text" : "password"} required value={formData.password} onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))} className="w-full border border-gray-300 rounded-md p-2 pr-10 focus:ring-2 focus:ring-yellow-500/50 outline-none" placeholder="••••••••" />
              <div className="absolute right-3 top-2.5 cursor-pointer text-gray-400" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </div>
            </div>
            {errors.password && <p className="text-xs text-red-600 mt-1">{errors.password}</p>}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <button type="button" className="hover:underline">Forget password?</button>
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">Register</Link>
          </div>
          <button type="submit" disabled={login.isPending} className={`cursor-pointer w-full ${login.isPending ? 'bg-gray-400' : 'bg-[#f8be5a] hover:bg-[#f0ad35]'} text-white font-bold py-3 rounded-md shadow-sm transition-all mt-4`}>
            {login.isPending ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <LoginContent />
    </Suspense>
  );
}