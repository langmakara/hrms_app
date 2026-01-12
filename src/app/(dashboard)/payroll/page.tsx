"use client";

import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Button, TextField, InputAdornment, Select, MenuItem, TablePagination 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import * as XLSX from 'xlsx';

export default function PayrollPage() {
  // Data State
  const initialData = [
    { id: "EM002", name: "Sok Dara", payDay: "30 Nov 2025", paymentType: "Bank transfer", totalPayment: 700.00, status: "Paid" },
    { id: "EM003", name: "Sok Dara", payDay: "30 Nov 2025", paymentType: "Bank transfer", totalPayment: 700.00, status: "Paid" },
    { id: "EM004", name: "Sok Dara", payDay: "30 Nov 2025", paymentType: "Bank transfer", totalPayment: 700.00, status: "Paid" },
    { id: "EM010", name: "Sok Dara", payDay: "30 Nov 2025", paymentType: "Bank transfer", totalPayment: 700.00, status: "Paid" },
    { id: "EM015", name: "Sok Dara", payDay: "30 Nov 2025", paymentType: "Bank transfer", totalPayment: 700.00, status: "Paid" },
    { id: "EM016", name: "Sok Dara", payDay: "30 Nov 2025", paymentType: "Bank transfer", totalPayment: 700.00, status: "Paid" },
  ];

  // Pagination & Filter States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // Logic: Filter and Paginate
  const filteredRows = initialData.filter((row) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Handlers
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleExportExcel = () => {
    const excelData = filteredRows.map(row => ({
      'Employee ID': row.id,
      'Employee Name': row.name,
      'Pay Day': row.payDay,
      'Payment Type': row.paymentType,
      'Total Payment': row.totalPayment,
      'Status': row.status
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Payroll List");
    XLSX.writeFile(workbook, "Payroll_Report.xlsx");
  };

  return (
    <div className="p-6 space-y-6">
      
      {/* --- Section 1: Summary Cards --- */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2 bg-[#f0fdf4] p-4 rounded-xl border border-green-100 flex justify-between items-center">
          <div>
            <p className="text-md text-gray-500">Period: 01/Nov/2025 - 30/Nov/2025</p>
            <h3 className="text-2xl font-bold text-blue-600">$750.00</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Payroll Cost</p>
          </div>
          <div className="h-full border-l border-gray-300 mx-4"></div>
          <div className="text-right">
            <h3 className="text-2xl font-bold text-green-600">$700.00</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase">Total Payment</p>
          </div>
        </div>

        <div className="bg-[#fff7ed] p-4 rounded-xl border border-orange-100 text-center">
          <p className="text-sm text-gray-600">Pay Day</p>
          <h3 className="text-3xl font-bold text-gray-800">30</h3>
          <p className="text-xs text-gray-500">Nov 2025</p>
        </div>

        <div className="bg-[#faf5ff] p-4 rounded-xl border border-purple-100 text-center">
          <p className="text-sm text-purple-600">Total Deduction</p>
          <h3 className="text-3xl font-bold text-purple-600">$50</h3>
          <p className="text-xs text-purple-400">Rate 15%</p>
        </div>

        <div className="flex flex-col gap-2 items-center justify-center">
          <Button 
            className='w-40'
            variant="outlined" 
            sx={{ 
              textTransform: 'none', borderRadius: '8px', 
              borderColor: '#e2e8f0', color: '#475569', backgroundColor: 'white',
              '&:hover': { backgroundColor: '#16a34a', color: 'white', borderColor: '#16a34a' } 
            }}
          >
            Record Payment
          </Button>
          <Button 
            className='w-40'
            variant="outlined" 
            onClick={handleExportExcel}
            sx={{ 
              textTransform: 'none', borderRadius: '8px', 
              borderColor: '#e2e8f0', color: '#475569', backgroundColor: 'white',
              '&:hover': { backgroundColor: '#16a34a', color: 'white', borderColor: '#16a34a' } 
            }}
          >
            Export Excel
          </Button>
        </div>
      </div>

      {/* --- Section 2: Pay list Table --- */}
      <Paper className="rounded-xl overflow-hidden shadow-sm">
        <div className="p-2 border-b">
          <h2 className="font-bold text-gray-800">Pay list</h2>
        </div>
        
        <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2">
            <Select size="small" defaultValue="Active Employee" sx={{ borderRadius: '8px', minWidth: 160 }}>
              <MenuItem value="Active Employee">Active Employee</MenuItem>
              <MenuItem value="Resigned">Resigned</MenuItem>
            </Select>
            <TextField 
              size="small" 
              placeholder="Search ID or Name..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' }, backgroundColor: '#f8fafc' }}
            />
          </div>
        </div>

        <TableContainer sx={{ height: 420 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f8fafc' }}>
                {["ID", "NAME", "PAY DAY", "PAYMENT TYPE", "TOTAL PAYMENT", "STATUS"].map((head) => (
                  <TableCell key={head} sx={{ fontWeight: 'bold', color: '#475569', fontSize: '12px' }}>{head}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="font-medium">{row.name}</TableCell>
                  <TableCell>{row.payDay}</TableCell>
                  <TableCell>{row.paymentType}</TableCell>
                  <TableCell className="font-bold">${row.totalPayment.toFixed(2)}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700 font-semibold">
                      {row.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}