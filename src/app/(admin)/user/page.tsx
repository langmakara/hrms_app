
"use client";

import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { UserPlus, Search, X } from 'lucide-react'; 
import UniversalModal from '../../../components/UniversalModal';
import UserForm, { UserFormData } from '../../../components/Forms/userForm';
import profil from '../../../assets/profile.png'

interface Column {
  id: 'id' | 'name' | 'gender' | 'email' | 'phone' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 90 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 20 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' },
];

const initialRows: UserFormData[] = [
  { 
    id: 'EM0001', name: 'Sok Dara', gender: 'Male', dob: '1995-10-15', 
    email: 'sokdara@gmail.com', phone: '089 553 696', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2023-01-01', department: 'IT', position: 'Frontend', 
    emergencyContact: '012 000 001', managerId: 'M-01', profileImage: profil 
  },
  { 
    id: 'EM0002', name: 'Keo Pich', gender: 'Female', dob: '1998-05-20', 
    email: 'pich@gmail.com', phone: '012 334 556', address: 'Kandal', 
    status: 'Work', dateHire: '2023-02-15', department: 'HR', position: 'Manager', 
    emergencyContact: '012 000 002', managerId: 'M-01', profileImage: profil
  },
  { 
    id: 'EM0003', name: 'Chan Vanna', gender: 'Male', dob: '1992-03-12', 
    email: 'vanna.chan@gmail.com', phone: '098 776 554', address: 'Kampong Cham', 
    status: 'Work', dateHire: '2022-05-10', department: 'Finance', position: 'Accountant', 
    emergencyContact: '012 000 003', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0004', name: 'Mesa Thida', gender: 'Female', dob: '1996-11-25', 
    email: 'thida.mesa@gmail.com', phone: '015 223 344', address: 'Siem Reap', 
    status: 'Work', dateHire: '2023-06-01', department: 'Marketing', position: 'Designer', 
    emergencyContact: '012 000 004', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0005', name: 'Nareth Sophea', gender: 'Female', dob: '1994-08-08', 
    email: 'sophea.n@gmail.com', phone: '011 445 566', address: 'Phnom Penh', 
    status: 'Leave', dateHire: '2021-09-20', department: 'IT', position: 'Backend', 
    emergencyContact: '012 000 005', managerId: 'M-01', profileImage: profil
  },
  { 
    id: 'EM0006', name: 'Ratanak Vibol', gender: 'Male', dob: '1990-12-30', 
    email: 'vibol.ratanak@gmail.com', phone: '077 889 900', address: 'Battambang', 
    status: 'Work', dateHire: '2020-01-15', department: 'Admin', position: 'Supervisor', 
    emergencyContact: '012 000 006', managerId: 'M-03', profileImage: profil
  },
  { 
    id: 'EM0007', name: 'Kosal Sreyneath', gender: 'Female', dob: '1997-02-14', 
    email: 'sreyneath.k@gmail.com', phone: '010 667 788', address: 'Takeo', 
    status: 'Work', dateHire: '2023-03-10', department: 'HR', position: 'Recruiter', 
    emergencyContact: '012 000 007', managerId: 'M-03', profileImage: profil
  },
  { 
    id: 'EM0008', name: 'Bunthoeun Samat', gender: 'Male', dob: '1993-06-18', 
    email: 'samat.b@gmail.com', phone: '012 990 011', address: 'Kampot', 
    status: 'Resign', dateHire: '2019-11-01', department: 'IT', position: 'Network Admin', 
    emergencyContact: '012 000 008', managerId: 'M-01', profileImage: profil
  },
  { 
    id: 'EM0009', name: 'Phalla Sitha', gender: 'Male', dob: '1991-04-05', 
    email: 'sitha.p@gmail.com', phone: '088 554 433', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2022-08-12', department: 'Finance', position: 'Auditor', 
    emergencyContact: '012 000 009', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0010', name: 'Leakena Som', gender: 'Female', dob: '1999-07-22', 
    email: 'leakena.som@gmail.com', phone: '093 221 100', address: 'Preah Sihanouk', 
    status: 'Work', dateHire: '2024-01-05', department: 'Marketing', position: 'Content Creator', 
    emergencyContact: '012 000 010', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0011', name: 'Vicheka Long', gender: 'Male', dob: '1995-11-11', 
    email: 'vicheka.l@gmail.com', phone: '015 667 789', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2022-12-01', department: 'IT', position: 'Mobile Dev', 
    emergencyContact: '012 000 011', managerId: 'M-01', profileImage: profil
  },
  { 
    id: 'EM0012', name: 'Srey Moch', gender: 'Female', dob: '1996-09-09', 
    email: 'sreymoch.c@gmail.com', phone: '069 334 455', address: 'Kandal', 
    status: 'Work', dateHire: '2023-05-20', department: 'Admin', position: 'Receptionist', 
    emergencyContact: '012 000 012', managerId: 'M-03', profileImage: profil
  },
  { 
    id: 'EM0013', name: 'Visal Kong', gender: 'Male', dob: '1992-05-05', 
    email: 'visal.k@gmail.com', phone: '092 112 233', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2021-02-14', department: 'IT', position: 'UI/UX Designer', 
    emergencyContact: '012 000 013', managerId: 'M-01', profileImage: profil
  },
  { 
    id: 'EM0014', name: 'Bopha Chann', gender: 'Female', dob: '1994-12-12', 
    email: 'bopha.ch@gmail.com', phone: '016 778 899', address: 'Kampong Thom', 
    status: 'Leave', dateHire: '2022-10-10', department: 'HR', position: 'Assistant', 
    emergencyContact: '012 000 014', managerId: 'M-03', profileImage: profil
  },
  { 
    id: 'EM0015', name: 'Davit Lim', gender: 'Male', dob: '1998-01-01', 
    email: 'davit.lim@gmail.com', phone: '010 445 577', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2023-07-07', department: 'Marketing', position: 'Sales', 
    emergencyContact: '012 000 015', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0016', name: 'Piseth Roeun', gender: 'Male', dob: '1993-02-28', 
    email: 'piseth.r@gmail.com', phone: '081 223 355', address: 'Pursat', 
    status: 'Work', dateHire: '2021-08-01', department: 'Finance', position: 'CFO', 
    emergencyContact: '012 000 016', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0017', name: 'Sreylin Mao', gender: 'Female', dob: '1997-06-15', 
    email: 'sreylin.mao@gmail.com', phone: '097 556 677', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2023-09-15', department: 'IT', position: 'QA Engineer', 
    emergencyContact: '012 000 017', managerId: 'M-01', profileImage: profil
  },
  { 
    id: 'EM0018', name: 'Sokha Meng', gender: 'Male', dob: '1991-10-10', 
    email: 'sokha.m@gmail.com', phone: '012 334 112', address: 'Kratie', 
    status: 'Work', dateHire: '2020-05-05', department: 'Admin', position: 'Clerk', 
    emergencyContact: '012 000 018', managerId: 'M-03', profileImage: profil
  },
  { 
    id: 'EM0019', name: 'Vatana Sim', gender: 'Male', dob: '1995-03-20', 
    email: 'vatana.sim@gmail.com', phone: '015 889 001', address: 'Prey Veng', 
    status: 'Work', dateHire: '2022-04-01', department: 'Marketing', position: 'Lead Sales', 
    emergencyContact: '012 000 019', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0020', name: 'Nita Ros', gender: 'Female', dob: '1999-12-05', 
    email: 'nita.ros@gmail.com', phone: '061 223 445', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2024-02-20', department: 'HR', position: 'Junior HR', 
    emergencyContact: '012 000 020', managerId: 'M-03', profileImage: profil
  },
  { 
    id: 'EM0021', name: 'Tola Hang', gender: 'Male', dob: '1994-04-14', 
    email: 'tola.hang@gmail.com', phone: '012 554 111', address: 'Svay Rieng', 
    status: 'Work', dateHire: '2021-12-25', department: 'Finance', position: 'Tax Consultant', 
    emergencyContact: '012 000 021', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0022', name: 'Phary Vann', gender: 'Female', dob: '1996-05-30', 
    email: 'phary.vann@gmail.com', phone: '010 332 211', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2023-11-11', department: 'IT', position: 'DevOps', 
    emergencyContact: '012 000 022', managerId: 'M-01', profileImage: profil
  },
  { 
    id: 'EM0023', name: 'Odom Phann', gender: 'Male', dob: '1990-08-15', 
    email: 'odom.p@gmail.com', phone: '085 776 655', address: 'Stung Treng', 
    status: 'Resign', dateHire: '2018-06-01', department: 'Admin', position: 'Logistics', 
    emergencyContact: '012 000 023', managerId: 'M-03', profileImage: profil
  },
  { 
    id: 'EM0024', name: 'Chanrea Keo', gender: 'Female', dob: '1993-01-20', 
    email: 'chanrea.k@gmail.com', phone: '016 443 322', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2022-01-10', department: 'Marketing', position: 'SEO Specialist', 
    emergencyContact: '012 000 024', managerId: 'M-02', profileImage: profil
  },
  { 
    id: 'EM0025', name: 'Serey Bun', gender: 'Male', dob: '1992-07-07', 
    email: 'serey.bun@gmail.com', phone: '011 229 988', address: 'Phnom Penh', 
    status: 'Work', dateHire: '2021-03-15', department: 'IT', position: 'Fullstack Dev', 
    emergencyContact: '012 000 025', managerId: 'M-01', profileImage: profil
  },
];

const managersList = [
  { id: 'M-01', name: 'John Doe' },
  { id: 'M-02', name: 'Jane Smith' },
];


export default function AdminUserPage() {
    const [page, setPage] = React.useState(0);
      const [rowsPerPage, setRowsPerPage] = React.useState(10);
      const [searchTerm, setSearchTerm] = React.useState("");
      
      // បន្ថែម Modal State
      const [modal, setModal] = React.useState<{
        open: boolean;
        mode: 'add' | 'edit' ;
        data?: UserFormData;
      }>({
        open: false,
        mode: 'add',
        data: undefined,
      });
    
      // Filter Logic
      const filteredRows = React.useMemo(() => {
        return initialRows.filter((row) => {
          const searchLower = searchTerm.toLowerCase();
          return (
            row.name.toLowerCase().includes(searchLower) ||
            row.id.toLowerCase().includes(searchLower) ||
            row.email.toLowerCase().includes(searchLower) ||
            row.phone.includes(searchTerm)
          );
        });
      }, [searchTerm]);
    
      // Handlers
      const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
      const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };
    
      const handleEdit = (row: UserFormData) => {
        setModal({ open: true, mode: 'edit', data: row });
      };
    
      const handleSubmit = (data: UserFormData) => {
        console.log("Submitted Data:", data);
        setModal({ ...modal, open: false });
        // នៅទីនេះអ្នកអាចបន្ថែម logic ដើម្បី Update ទៅ Database ឬ State
      };
  return (
    <div className='p-3'>
      <div className='p-3 flex items-center justify-between w-full gap-4'>
        
        {/* ប៊ូតុង Add New */}
        <button 
          onClick={() => setModal({ open: true, mode: 'add', data: undefined })}
          className="flex items-center gap-2 border hover:border-green-600  hover:bg-green-600 hover:text-white text-black px-4 py-2 rounded-lg transition-all"
        >
          <UserPlus size={18} />
          Add
        </button>

        {/* ប្រអប់ Search */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
            className="w-full py-2 pl-4 pr-10 border border-gray-400 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400">
            {searchTerm ? (
              <X size={18} className="cursor-pointer hover:text-gray-600" onClick={() => setSearchTerm("")} />
            ) : (
              <Search size={20} />
            )}
          </div>
        </div>
      </div>

      {/* ការហៅប្រើ UniversalModal និង UserForm */}
      <UniversalModal 
        open={modal.open} 
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.mode === 'add' ? "Add New Employee" : "Edit Employee Information"}
      >
        <UserForm 
          mode={modal.mode}
          initialData={modal.data}
          managers={managersList}
          onClose={() => setModal({ ...modal, open: false })}
          onSubmit={handleSubmit}
        />
      </UniversalModal>

      {/* តារាងបង្ហាញទិន្នន័យ */}
      <div className='bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200'>
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#6b7280', color: 'white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow hover key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.gender}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell align="center">
                      <Stack direction="row" spacing={1} justifyContent="center">
                        <Button size="small" onClick={() => handleEdit(row)}>Edit</Button>
                        <Button size="small" color="error">Delete</Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}