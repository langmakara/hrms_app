"use client";
import React, { useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/utils/api';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to decode JWT token
  const decodeJWT = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

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
      // require minimum 8 characters
      newErrors.password = "Password must be at least 8 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    if (!validateForm()) {
      setIsLoading(false)
      return
    }

    try {
      const email = formData.email
      const password = formData.password
      // Call the Next.js API proxy on the same origin to avoid CORS issues.
      // The proxy route will forward requests to your backend (configured server-side).
      const proxyResp = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const responseData = await proxyResp.json()
      const access_token = responseData?.access_token || responseData?.data?.access_token

      if (access_token) {
        const payload = decodeJWT(access_token)

        document.cookie = `access_token=${access_token}; path=/; max-age=86400`
        document.cookie = "isLoggedIn=true; path=/"
        localStorage.setItem("access_token", access_token)

        if (payload) {
          const userInfo = {
            id: payload.sub,
            email: payload.email,
            roles: payload.roles || [],
          }

          localStorage.setItem("user", JSON.stringify(userInfo))
          localStorage.setItem("userRoles", JSON.stringify(payload.roles || []))

          const primaryRole = Array.isArray(payload.roles) && payload.roles.length > 0
            ? payload.roles[0]
            : "user"
          localStorage.setItem("userRole", primaryRole)
        }

        setSuccessMsg("Login Successful!")

        setTimeout(() => {
          const roles = (decodeJWT(access_token)?.roles) || []
          if (Array.isArray(roles) && roles.includes("admin")) {
            router.push("/admin-dashboard")
          } else {
            router.push("/dashboard")
          }
        }, 1000)
      }
    } catch (err: any) {
      console.error("Login error:", err)

      if (err.response) {
        const errorData = err.response?.data
        let errorMessage = "An error occurred. Please try again."
        if (typeof errorData === 'string') {
          errorMessage = errorData
        } else if (errorData && typeof errorData === 'object') {
          errorMessage = errorData.message || errorData.error || `Server error: ${err.response.status}`
        } else {
          errorMessage = `Server error: ${err.response.status}`
        }

        setErrors({ general: String(errorMessage) })
      } else if (err.request) {
        setErrors({ general: "Cannot connect to server. Please check if the backend is running." })
      } else {
        setErrors({ general: err.message || "An unexpected error occurred. Please try again." })
      }
    } finally {
      setIsLoading(false)
    }
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
          <button type="submit" disabled={isLoading} className={`w-full ${isLoading ? 'bg-gray-400' : 'bg-[#f8be5a] hover:bg-[#f0ad35]'} text-white font-bold py-3 rounded-md shadow-sm transition-all mt-4`}>
            {isLoading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}