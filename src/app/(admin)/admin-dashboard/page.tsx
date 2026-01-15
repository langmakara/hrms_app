"use client";

import React, { useState } from 'react';
import { Users, Building2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Button,
} from '@mui/material';

interface Column {
  id: 'id' | 'name' | 'tracking' | 'department' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'tracking', label: 'Applied On', minWidth: 150 },
  { id: 'department', label: 'Department', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
];

// Sample data (Unchanged as requested)
const requestData = [
    { id: 'EM011', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Active'},
    { id: 'EM012', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Active'},
    { id: 'EM013', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Unactive'},
    { id: 'EM014', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Active'},
    { id: 'EM015', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Active'},
    { id: 'EM016', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Active'},
    { id: 'EM017', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Active'},
    { id: 'EM018', name: 'Sok Dara', tracking : 'Tracking', department:'IT Support', status: 'Unactive'},
];

export default function AdminDashboardPage() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // Added missing handler for rows per page
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className="p-3">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 ">
        {/* Total Users Card */}
        <div className="bg-[#AEC7FF] p-8 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-6xl font-bold text-blue-700 mb-2">100</span>
            <span className="text-xl font-semibold text-gray-500">Total Users</span>
          </div>
          <div className="bg-blue-600 p-4 rounded-full shadow-lg">
            <Users className="w-12 h-12 text-white" />
          </div>
        </div>

        {/* Active Users Card */}
        <div className="bg-[#C5FFDB] p-8 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-6xl font-bold text-[#16A34A] mb-2">98</span>
                <span className="text-xl font-semibold text-gray-500">Active Users</span>
            </div>
            <div className="bg-[#16A34A] p-4 rounded-full shadow-lg">
                <Users className="w-12 h-12 text-white" />
            </div>
        </div>

        {/* Department Card */}
        <div className="bg-[#FED5C0] p-8 rounded-2xl shadow-sm flex items-center justify-between">
            <div className="flex flex-col">
                <span className="text-6xl font-bold text-[#F79F71] mb-2">2</span>
                <span className="text-xl font-semibold text-gray-500">Department</span>
            </div>
            <div className="bg-[#F79F71] p-4 rounded-full shadow-lg">
                <Building2 className="w-12 h-12 text-white" />
            </div>
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3'>
        <div className="bg-white rounded-2xl shadow-sm mt-6 overflow-hidden border border-gray-100">
          <div className="p-4 flex justify-between items-center border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-800">Recent user active</h2>
          </div>

          <TableContainer sx={{height: '350px'}}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      sx={{ 
                        minWidth: column.minWidth, 
                        fontWeight: 'bold', 
                        backgroundColor: '#f8fafc', 
                        color: '#475569',
                        borderBottom: '1px solid #e2e8f0'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {requestData
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                  <TableRow key={index} hover sx={{ '& td': { borderBottom: '1px solid #F3F4F6' } }}>
                    <TableCell sx={{ color: '#374151' }}>{row.id}</TableCell>
                    <TableCell sx={{ color: '#374151' }}>{row.name}</TableCell>
                    <TableCell sx={{ color: '#6B7280' }}>{row.tracking}</TableCell>
                    <TableCell sx={{ color: '#6B7280' }}>{row.department}</TableCell>
                    <TableCell align="center">
                      <div className="flex items-center justify-center">
                        <span 
                          className={`w-3 h-3 rounded-full shadow-sm ${
                            row.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-300'
                          }`} 
                          title={row.status === 'Active' ? 'Online' : 'Offline'}
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={requestData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ borderTop: 'none' }}
          />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm mt-6">
          <div className="border-b pb-3 mb-4">
            <h2 className="text-lg font-bold text-gray-800">Quick Actions</h2>
          </div>

          <div className="space-y-3">
            {/* Add New User Card */}
            <button 
              onClick={() => console.log("Navigate to Add User")}
              className="w-full text-left bg-blue-50 rounded-lg p-4 transition-all hover:bg-blue-100 hover:shadow-md active:scale-[0.98] cursor-pointer border border-transparent hover:border-blue-200"
            >
              <h4 className="text-blue-700 font-semibold">Add New User</h4>
              <p className="text-blue-500 text-sm">Create a new user account</p>
            </button>

            {/* Add Department Card */}
            <button 
              onClick={() => console.log("Navigate to Add Department")}
              className="w-full text-left bg-green-50 rounded-lg p-4 transition-all hover:bg-green-100 hover:shadow-md active:scale-[0.98] cursor-pointer border border-transparent hover:border-green-200"
            >
              <h4 className="text-green-700 font-semibold">Add Department</h4>
              <p className="text-green-500 text-sm">Create new department</p>
            </button>

            {/* View User Card */}
            <button 
              onClick={() => console.log("Navigate to View Users")}
              className="w-full text-left bg-purple-50 rounded-lg p-4 transition-all hover:bg-purple-100 hover:shadow-md active:scale-[0.98] cursor-pointer border border-transparent hover:border-purple-200"
            >
              <h4 className="text-purple-700 font-semibold">View User</h4>
              <p className="text-purple-500 text-sm">Manage existing users</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}