"use client";

import React, { useState } from 'react';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Select, MenuItem, TextField, Button, InputAdornment, TablePagination 
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
// Ensure your JSON path is correct. 
// Assuming JSON structure is: { "attendance_list": [...] }
import attendance_data from '../../Data/Attendance.json'; 
import * as XLSX from 'xlsx';

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'NAME', minWidth: 150 },
  { id: 'status', label: 'STATUS', minWidth: 150 },
  { id: 'signInTime', label: 'SIGN IN TIME', minWidth: 180 },
  { id: 'signOutTime', label: 'SIGN OUT TIME', minWidth: 180 },
  { id: 'note', label: 'NOTE', minWidth: 150 },
];

export default function AttendancePage() {
  // 1. Initialize data from the JSON object
  const data = attendance_data.attendance_list || [];

  // 2. States
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  // 3. Logic: Filter and Paginate
  const filteredRows = data.filter((row: any) =>
    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.id.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // 4. Handlers
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
      'Status': row.status,
      'Sign In': row.signInTime,
      'Sign Out': row.signOutTime,
      'Note': row.note || ''
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance List");
    XLSX.writeFile(workbook, "Attendance_Report.xlsx");
  };

  return (
    <div className="p-2 bg-gray-50">
      <Paper className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className='p-2 border-b bg-white flex justify-between items-center'>
          <h2 className="font-bold text-lg text-gray-800">Attendance Management</h2>
          <Button 
            variant="outlined" 
            onClick={handleExportExcel}
            sx={{ 
              textTransform: 'none', 
              borderRadius: '8px', 
              borderColor: '#e2e8f0', 
              color: '#475569',
              '&:hover': { backgroundColor: '#16a34a', color: 'white', borderColor: '#16a34a' } 
            }}
          >
            Export Excel
          </Button>
        </div>

        {/* Filter Toolbar */}
        <div className="p-3 flex flex-wrap items-center gap-4 bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Department:</span>
            <Select size="small" defaultValue="Engineering" sx={{ minWidth: 160, borderRadius: '8px' }}>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </Select>
          </div>

          <TextField 
            size="small" 
            placeholder="Search name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
            sx={{ minWidth: 250, '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
        </div>

        <TableContainer sx={{ height: 580 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell 
                    key={column.id} 
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: '#f8fafc', fontWeight: 'bold', color: '#64748b' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedRows.map((row: any) => (
                <TableRow hover key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="font-semibold">{row.name}</TableCell>
                  <TableCell>
                    <Select fullWidth size="small" defaultValue={row.status} sx={{ borderRadius: '8px' }}>
                      <MenuItem value="On time">On time</MenuItem>
                      <MenuItem value="Late">Late</MenuItem>
                      <MenuItem value="On Leave">On Leave</MenuItem>
                    </Select>
                  </TableCell>
                  
                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue={row.signInTime}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue={row.signOutTime}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        )
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <TextField fullWidth size="small" placeholder="Note..." defaultValue={row.note} sx={{ borderRadius: '8px' }} />
                  </TableCell>
                </TableRow>
              ))}
              {filteredRows.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3, color: 'gray' }}>
                    No results found.
                  </TableCell>
                </TableRow>
              )}
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