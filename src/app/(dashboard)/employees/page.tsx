"use client";

import * as React from 'react';
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
import UserForm from '../../../components/Forms/userForm';

// Import Services និង Types
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee } from '../../../service/employeeService';
import { EmployeeDto } from '../../../dtos/employee';

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

export default function EmployeesPage() {
  // កំណត់ Initial State ជា Array ទទេជានិច្ច ដើម្បីការពារ rows.filter is not a function
  const [rows, setRows] = React.useState<EmployeeDto[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [searchTerm, setSearchTerm] = React.useState("");

  const [modal, setModal] = React.useState<{
    open: boolean;
    mode: 'add' | 'edit';
    data?: EmployeeDto;
  }>({
    open: false,
    mode: 'add',
    data: undefined,
  });
  const [submitting, setSubmitting] = React.useState(false);
  const [serverError, setServerError] = React.useState<string | null>(null);

  // ទាញទិន្នន័យពី API
  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await fetchEmployees();
      setRows(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to load employees:", error);
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  // List of managers (derived from employees)
  const managers = React.useMemo(() => {
    return rows.map(emp => ({ id: emp.id, name: emp.name }));
  }, [rows]);

  React.useEffect(() => {
    loadEmployees();
  }, []);

  // Filter Logic
  const filteredRows = React.useMemo(() => {
    if (!Array.isArray(rows)) return [];

    const searchLower = searchTerm.toLowerCase();
    return rows.filter((row) => {
      return (
        row.name?.toLowerCase().includes(searchLower) ||
        row.id?.toString().toLowerCase().includes(searchLower) ||
        row.email?.toLowerCase().includes(searchLower) ||
        row.phone?.toLowerCase().includes(searchLower)
      );
    });
  }, [searchTerm, rows]);

  // Handlers
  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (row: EmployeeDto) => {
    setModal({ open: true, mode: 'edit', data: row });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("តើអ្នកប្រាកដថាចង់លុបបុគ្គលិកនេះមែនទេ?")) {
      try {
        await deleteEmployee(id);
        alert("លុបបានជោគជ័យ");
        loadEmployees();
      } catch (error) {
        console.error("Delete Error:", error);
        alert("ការលុបមិនបានសម្រេច");
      }
    }
  };

  const handleSubmit = async (formData: any) => {
    setServerError(null);
    setSubmitting(true);
    try {
      if (modal.mode === 'add') {
        const { id, ...createData } = formData; // Remove id if it's there (should be auto-gen)
        await createEmployee(createData);
        // optional: show toast instead of alert
        alert("បង្កើតថ្មីជោគជ័យ");
      } else {
        const id = formData.id || modal.data?.id;
        if (!id) throw new Error("Missing Employee ID");
        await updateEmployee(id, formData);
        alert("កែប្រែជោគជ័យ");
      }
      setModal({ ...modal, open: false });
      await loadEmployees();
    } catch (error: any) {
      // Prefer server-provided message
      const msg = error?.response?.data?.message || error?.response?.data || error?.message || String(error);
      console.error("Submit Error:", msg);
      setServerError(typeof msg === 'string' ? msg : JSON.stringify(msg));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className='p-3'>
      <div className='p-3 flex items-center justify-between w-full gap-4'>
        <button
          onClick={() => setModal({ open: true, mode: 'add', data: undefined })}
          className="flex items-center gap-2 border hover:border-green-600 hover:bg-green-600 hover:text-white text-black px-4 py-2 rounded-lg transition-all"
        >
          <UserPlus size={18} /> Add
        </button>

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

      <UniversalModal
        open={modal.open}
        onClose={() => setModal({ ...modal, open: false })}
        title={modal.mode === 'add' ? "Add New Employee" : "Edit Employee Information"}
      >
        <UserForm
          mode={modal.mode}
          initialData={modal.data}
          managers={managers}
          onClose={() => setModal({ ...modal, open: false })}
          onSubmit={handleSubmit}
          submitting={submitting}
          serverError={serverError}
        />
      </UniversalModal>

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
              {loading ? (
                <TableRow><TableCell colSpan={6} align="center">កំពុងទាញទិន្នន័យ...</TableCell></TableRow>
              ) : filteredRows.length === 0 ? (
                <TableRow><TableCell colSpan={6} align="center">មិនមានទិន្នន័យត្រូវបានបង្ហាញទេ</TableCell></TableRow>
              ) : (
                filteredRows
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
                          <Button size="small" variant="outlined" onClick={() => handleEdit(row)}>Edit</Button>
                          <Button size="small" variant="outlined" color="error" onClick={() => handleDelete(row.id)}>Delete</Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
              )}
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