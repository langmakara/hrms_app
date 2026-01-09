"use client";

import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Select, MenuItem, TextField, Button, InputAdornment 
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import attendance_list from '../../Data/Attendance.json';
import * as XLSX from 'xlsx';

const columns = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'NAME', minWidth: 150 },
  { id: 'status', label: 'STATUS', minWidth: 150 },
  { id: 'signInTime', label: 'SIG IN TIME', minWidth: 180 },
  { id: 'signOutTime', label: 'SIGN OUT TIME', minWidth: 180 },
  { id: 'note', label: 'NOTE', minWidth: 150 },
];

export default function AttendancePage() {
  const data = attendance_list.attendance_list;

  const handleExportExcel = () => {
    const excelData = data.map(row => ({
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
    <div className="p-3 bg-gray-50">
      <Paper className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className='p-2 border-b bg-white'>
          <h2 className="font-bold text-sm text-gray-800">Attendance</h2>
        </div>

        <div className="p-4 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Department:</span>
            <Select size="small" defaultValue="Engineering" sx={{ minWidth: 160, borderRadius: '8px' }}>
              <MenuItem value="Engineering">Engineering</MenuItem>
              <MenuItem value="HR">HR</MenuItem>
            </Select>
          </div>
          <Button 
            variant="outlined" 
            onClick={handleExportExcel} // លែង Error ទៀតហើយ
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

        <TableContainer sx={{ height: 600, px: 2 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={{ backgroundColor: '#f8fafc', fontWeight: 'bold' }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
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
                  
                  {/* Sign In Time - បំបាត់ Unique Key Error */}
                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue={row.signInTime}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" key={`start-icon-${row.id}`}>
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: <span className="text-gray-300 ml-1">×</span>
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </TableCell>
                  
                  {/* Sign Out Time - បំបាត់ Unique Key Error */}
                  <TableCell>
                    <TextField
                      size="small"
                      defaultValue={row.signOutTime}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start" key={`end-icon-${row.id}`}>
                            <AccessTimeIcon fontSize="small" />
                          </InputAdornment>
                        ),
                        endAdornment: <span className="text-gray-300 ml-1">×</span>
                      }}
                      sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                    />
                  </TableCell>
                  
                  <TableCell>
                    <TextField fullWidth size="small" placeholder="Note..." defaultValue={row.note} sx={{ borderRadius: '8px' }} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="p-4 bg-white border-t text-sm text-gray-500">
          Showing <span className="font-bold text-black">{data.length}</span> of 20
        </div>
      </Paper>
    </div>
  );
}