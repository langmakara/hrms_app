import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import profil from '../../assets/profile.png'

// ១. កំណត់ប្រភេទ Data Interface ឱ្យបានច្បាស់លាស់
export interface UserFormData {
  id: string;
  name: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  address: string;
  status: string;
  dateHire: string;
  department: string;
  position: string;
  emergencyContact: string;
  managerId: string;
  profileImage: string | any; // ប្តូរជា string | any ដើម្បីទទួលយក StaticImageData
}

interface UserFormProps {
  initialData?: UserFormData; // បញ្ជូនមកពេល Edit
  onSubmit: (data: UserFormData) => void; // Function ពេលចុច Save
  onClose: () => void; // Function ពេលចុច Cancel
  managers: { id: string; name: string }[]; // បញ្ជី Manager សម្រាប់ទាញដាក់ក្នុង Select
  mode: 'add' | 'edit' | 'profile'; // ប្រភេទនៃ Form
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onSubmit, onClose, managers, mode }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ២. រៀបចំ Default State
  const [formData, setFormData] = useState<UserFormData>({
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
    profileImage: profil, // រូបភាពបណ្តោះអាសន្ន
  });

  // បំពេញ data ចូលក្នុង form បើមាន initialData (ពេល Edit)
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
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
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-stretch p-1">
      
      {/* ផ្នែកខាងឆ្វេង (Sidebar Profile) */}
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
              <p className="text-sm font-semibold text-gray-800">{formData.id || 'Pending...'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 uppercase font-bold">Phone</p>
              <p className="text-sm font-semibold text-gray-800">{formData.phone || '---'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ផ្នែកខាងស្តាំ (Main Form Fields) */}
      <div className="lg:col-span-3">
        <div className="bg-white p-6 rounded-lg border border-gray-200 h-full flex flex-col shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-4">
            
            {/* Input fields */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none shadow-sm transition-all" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">ID</label>
              <input type="text" name="id" value={formData.id} onChange={handleChange} 
                disabled={mode === 'edit' || mode === 'profile'}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-500 outline-none" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date of Birth</label>
              <input type="date" name="dob" value={formData.dob} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Work Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Phone Number</label>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            <div className="space-y-1 lg:col-span-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select name="status" value={formData.status} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400">
                <option value="Work">Work</option>
                <option value="Leave">Leave</option>
                <option value="Resign">Resign</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date of Hire</label>
              <input type="date" name="dateHire" value={formData.dateHire} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Department</label>
              <select name="department" value={formData.department} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400">
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Position</label>
              <select name="position" value={formData.position} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400">
                <option value="Frontend">Frontend Developer</option>
                <option value="Backend">Backend Developer</option>
                <option value="UI/UX">UI/UX Designer</option>
                <option value="Mobile">Mobile Developer</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Emergency Contact</label>
              <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400" />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Manager ID</label>
              <select name="managerId" value={formData.managerId} onChange={handleChange}
                className="w-full border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-green-400">
                <option value="">Select Manager</option>
                {managers.map((m) => (
                  <option key={m.id} value={m.id}>{m.id}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Manager Name</label>
              <input type="text" readOnly
                value={managers.find(m => m.id === formData.managerId)?.name || ""}
                className="w-full bg-gray-50 border border-gray-300 rounded-md px-4 py-2 text-gray-600 outline-none" />
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex justify-end mt-8 space-x-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-2 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-10 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 shadow-md transition-all font-medium"
            >
              {mode === 'add' ? 'Create Employee' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UserForm;