import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import profil from '../../assets/profile.png'; // ប្រាកដថា path នេះត្រឹមត្រូវ
// Import Types ពី Frontend DTOs ដែលយើងបានបង្កើត
import { EmployeeDto, CreateEmployeeDto, UpdateEmployeeDto } from '../../dtos/employee';

// Export for compatibility with other pages
export type UserFormData = EmployeeDto;

interface UserFormProps {
  initialData?: EmployeeDto; // ទិន្នន័យចាស់សម្រាប់ Edit
  onSubmit: (data: Record<string, unknown>) => void; // Function ផ្ញើទៅកាន់ API Service
  onClose: () => void;
  managers: { id: string; name: string }[];
  mode: 'add' | 'edit' | 'profile';
  // UX props
  submitting?: boolean;
  serverError?: string | null;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onClose, managers, mode, submitting = false, serverError = null }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // កំណត់ State ឱ្យត្រូវតាម EmployeeDto
  const [formData, setFormData] = useState<Partial<EmployeeDto>>({
    id: '',
    name: '',
    gender: 'Male',
    dob: '',
    email: '',
    phone: '',
    address: '',
    status: 'Work',
    dateHire: '',
    department: 'IT',
    position: 'Frontend',
    emergencyContact: '',
    managerId: '',
    profileImage: '',
  });

  // បំពេញទិន្នន័យចូល Form ពេល Edit
  useEffect(() => {
    if (initialData) {
      // schedule async update to avoid sync setState-in-effect linter rule
      Promise.resolve().then(() => setFormData(initialData as Partial<EmployeeDto>));
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData((prev) => ({ ...prev, profileImage: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic client-side validation to avoid sending bad requests
    if (!formData.name || (typeof formData.name === 'string' && formData.name.trim() === '')) {
      alert('Please enter full name');
      return;
    }
    if (!formData.email || (typeof formData.email === 'string' && formData.email.trim() === '')) {
      alert('Please enter email');
      return;
    }

    // Send cleaned data to parent (remove empty string fields)
    const cleaned: Record<string, unknown> = {};
    Object.keys(formData).forEach((k) => {
      const v = (formData as Record<string, unknown>)[k];
      if (v !== undefined && v !== null && !(typeof v === 'string' && (v as string).trim() === '')) cleaned[k] = v;
    });

    // បញ្ជូន formData ទៅកាន់ Parent Component ដើម្បីហៅ Service
    onSubmit(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch p-1">

      {/* Sidebar Profile Area */}
      <div className="lg:col-span-1">
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 flex flex-col items-center h-full shadow-sm">
          <div
            className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-md cursor-pointer group"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src={formData.profileImage || profil}
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

          <div className="mt-6 text-start w-full space-y-2">
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Name</p>
              <p className="text-sm font-semibold text-gray-800 truncate">{formData.name || '---'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">ID</p>
              <p className="text-sm font-semibold text-gray-800">{formData.id || 'Auto-generated'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Phone</p>
              <p className="text-sm font-semibold text-gray-800">{formData.phone || '---'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Input Fields */}
      <div className="lg:col-span-3">
        <div className="bg-white p-6 rounded-lg border border-gray-200 h-full flex flex-col shadow-sm">
          {serverError ? (
            <div className="mb-3 p-3 bg-red-50 border border-red-100 rounded text-red-700 text-sm">
              {serverError}
            </div>
          ) : null}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Work Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none" />
            </div>

            <div className="space-y-1 lg:col-span-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none">
                <option value="Work">Work</option>
                <option value="Leave">Leave</option>
                <option value="Resign">Resign</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <select name="department" value={formData.department} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none">
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Position</label>
              <input type="text" name="position" value={formData.position} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Manager ID</label>
              <select name="managerId" value={formData.managerId} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none">
                <option value="">Select Manager</option>
                {managers.map((m) => (
                  <option key={m.id} value={m.id}>{m.id} - {m.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Buttons Area */}
          <div className="flex justify-end mt-auto pt-8 space-x-3">
            <button type="button" onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all font-medium">
              Cancel
            </button>
            <button type="submit"
              disabled={submitting}
              className={`px-10 py-2 rounded-md shadow-md transition-all font-medium ${submitting ? 'bg-green-300 text-white cursor-wait' : 'bg-green-500 text-white hover:bg-green-600'}`}>
              {submitting ? 'Saving...' : (mode === 'add' ? 'Create Employee' : 'Save Changes')}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserForm;