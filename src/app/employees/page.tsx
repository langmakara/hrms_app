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
import { UserPlus, Search, X } from 'lucide-react'; // បន្ថែម X icon សម្រាប់ clear search
import Modals from '../../components/modal'

interface Column {
  id: 'id' | 'name' | 'gender' | 'email' | 'phone' | 'action';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

interface Data {
  id: string;
  name: string;
  gender: string;
  email: string;
  phone: string;
}

const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 90 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'gender', label: 'Gender', minWidth: 20 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 170, align: 'center' },
];

function createData(id: string, name: string, gender: string, email: string, phone: string): Data {
  return { id, name, gender, email, phone };
}

// បង្កើតទិន្នន័យគំរូ
const rows = [
  createData('EM0001', 'Sok Dara', 'M', 'sokdara@gmail.com', '089 553 696'),
  createData('EM0002', 'Keo Pich', 'F', 'pich@gmail.com', '012 334 556'),
  createData('EM0003', 'Chann Vanna', 'M', 'vanna@gmail.com', '098 776 554'),
  createData('EM0004', 'Mesa Thida', 'F', 'thida@gmail.com', '015 223 344'),
  // បន្ថែមទិន្នន័យដើម្បីតេស្ត Pagination
  ...Array(20).fill(null).map((_, i) => 
    createData(`EM000${i + 5}`, `Employee ${i + 5}`, i % 2 === 0 ? 'M' : 'F', `user${i}@example.com`, '012 000 000')
  )
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  
  // បង្កើត State សម្រាប់ Search
  const [searchTerm, setSearchTerm] = React.useState("");

  // បង្កើត Logic សម្រាប់ Filter ទិន្នន័យ
  const filteredRows = React.useMemo(() => {
    return rows.filter((row) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        row.name.toLowerCase().includes(searchLower) ||
        row.id.toLowerCase().includes(searchLower) ||
        row.email.toLowerCase().includes(searchLower) ||
        row.phone.includes(searchTerm)
      );
    });
  }, [searchTerm]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(0); // រាល់ពេល search ត្រូវឱ្យវាទៅទំព័រទី១វិញ
  };

  const handleEdit = (id: string) => {
    console.log("Edit ID:", id);
  };

  const handleDelete = (id: string) => {
    console.log("Delete ID:", id);
  };

  return (
    <div className='p-3'>
      <div className='p-3 flex items-center justify-between w-full gap-4'>
        {/* ប៊ូតុង Add */}
        <button 
          className="flex items-center gap-1 border hover:border-green-500 px-4 py-2 rounded-xl font-medium text-gray-800 hover:bg-green-500 hover:text-white transition-colors shrink-0"
          onClick={handleOpen}
        >
          <UserPlus size={20} strokeWidth={2.5} />
          <span className='font-bold'>Add</span>
        </button>
        <Modals open={open} handleClose={handleClose} />

        {/* ប្រអប់ Search */}
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by name, ID or email..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full py-2 pl-4 pr-10 border border-gray-400 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            {searchTerm ? (
              <X 
                size={18} 
                className="text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={() => {setSearchTerm(""); setPage(0);}}
              />
            ) : (
              <Search size={20} className="text-gray-600 pointer-events-none" />
            )}
          </div>
        </div>
      </div>

      <div className='bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200'>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ 
                        minWidth: column.minWidth, 
                        fontWeight: 'bold', 
                        backgroundColor: '#6b7280', // gray-500
                        color: 'white' 
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        if (column.id === 'action') {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Stack direction="row" spacing={1} justifyContent="center">
                                <Button 
                                  variant="text" 
                                  size="small" 
                                  onClick={() => handleEdit(row.id)}
                                  sx={{ textTransform: 'none', textDecoration: 'underline' }}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="text" 
                                  size="small" 
                                  color="error" 
                                  onClick={() => handleDelete(row.id)}
                                  sx={{ textTransform: 'none', textDecoration: 'underline' }}
                                >
                                  Delete
                                </Button>
                              </Stack>
                            </TableCell>
                          );
                        }
                        const value = row[column.id as keyof Data];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
              
              {/* បង្ហាញនៅពេលរកមិនឃើញទិន្នន័យ */}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={columns.length} align="center" sx={{ py: 3 }}>
                    No matching records found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={filteredRows.length} // ប្រើចំនួនដែលរកឃើញ
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </div>
  );
}