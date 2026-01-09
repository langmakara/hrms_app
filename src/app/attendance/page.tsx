import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, 
  Select, MenuItem, TextField, Button, InputAdornment 
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime'; // កុំភ្លេច install mui icons
import attendance_list from '../../Data/Attendance.json';

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

  return (
    <div className="p-6 bg-gray-50">
      <Paper className="rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className='p-3 border-b bg-white'>
            <h2 className="font-bold text-gray-800">Attendance</h2>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Department:</span>
              <Select size="small" defaultValue="Engineering" sx={{ minWidth: 150, borderRadius: '8px' }}>
                <MenuItem value="Engineering">Engineering</MenuItem>
                <MenuItem value="HR">HR</MenuItem>
              </Select>
            </div>
          </div>
          <Button variant="outlined" className="capitalize border-gray-300 text-gray-700">
            Export Excel
          </Button>
        </div>

        <div className='p-4'>
            {/* Table Section */}
            <TableContainer sx={{ height: 400 }}> {/* កម្ពស់ថេរ */}
                <Table stickyHeader size="medium">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                            <TableCell
                                key={column.id}
                                sx={{ backgroundColor: '#f8fafc', fontWeight: 'bold', color: '#475569' }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {data.map((row) => (
                        <TableRow hover key={row.id}>
                        {/* ID */}
                        <TableCell>{row.id}</TableCell>
                        
                        {/* Name */}
                        <TableCell className="font-medium">{row.name}</TableCell>
                        
                        {/* Status Select */}
                        <TableCell>
                            <Select fullWidth size="small" defaultValue={row.status} sx={{ borderRadius: '8px' }}>
                                <MenuItem value="On time">On time</MenuItem>
                                <MenuItem value="Late">Late</MenuItem>
                                <MenuItem value="Absent">On Leave</MenuItem>
                            </Select>
                        </TableCell>
                        
                        {/* Sign In Time */}
                        <TableCell>
                            <TextField
                            size="small"
                            defaultValue={row.signInTime}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccessTimeIcon fontSize="small" />
                                </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </TableCell>
                        
                        {/* Sign Out Time */}
                        <TableCell>
                            <TextField
                            size="small"
                            defaultValue={row.signOutTime}
                            InputProps={{
                                startAdornment: (
                                <InputAdornment position="start">
                                    <AccessTimeIcon fontSize="small" />
                                </InputAdornment>
                                ),
                            }}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </TableCell>
                        
                        {/* Note Input */}
                        <TableCell>
                            <TextField
                            size="small"
                            placeholder="Note..."
                            defaultValue={row.note}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
                            />
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

        {/* Footer Section */}
        <div className="p-4 bg-white text-sm text-gray-500">
          Showing <span className="font-bold text-black">{data.length}</span> of <span className="font-bold text-black">16</span>
        </div>
      </Paper>
    </div>
  );
}