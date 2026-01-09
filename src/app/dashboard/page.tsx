"use client";

import * as React from 'react';
import { 
  LucideIcon, 
  LayoutDashboard, 
  CircleDashed, 
  MapPin, 
  Bed 
} from 'lucide-react';

// MUI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  Box
} from '@mui/material';

// Assuming these are your local components
import Calendar from '../../components/calendar';
import StatCard from '../../components/statCard';

// --- Interfaces ---
interface Column {
  id: 'id' | 'name' | 'appiledOn' | 'date' | 'type';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

interface StatItem {
  id: number;
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconBgColor: string;
  textColor: string;
}

// --- Data & Constants ---
const columns: readonly Column[] = [
  { id: 'id', label: 'ID', minWidth: 70 },
  { id: 'name', label: 'Name', minWidth: 150 },
  { id: 'appiledOn', label: 'Applied On', minWidth: 150 },
  { id: 'date', label: 'Date', minWidth: 150 },
  { id: 'type', label: 'Type', minWidth: 100 },
];

const attendanceStats: StatItem[] = [
  { id: 1, title: "Total Day(s)", value: "19.5", icon: LayoutDashboard, iconBgColor: "bg-green-500", textColor: "text-green-500" },
  { id: 2, title: "Half Day(s)", value: "01", icon: CircleDashed, iconBgColor: "bg-orange-500", textColor: "text-orange-500" },
  { id: 3, title: "On Duty", value: "01", icon: MapPin, iconBgColor: "bg-indigo-600", textColor: "text-indigo-600" },
  { id: 4, title: "Leave(s)", value: "01", icon: Bed, iconBgColor: "bg-blue-500", textColor: "text-blue-500" },
];

const requests = [
  { id: 'EM011', name: 'Sok Dara', appiledOn: '12 Nov 2025', date: '12 Nov - 14 Nov', type: 'Leave' },
  { id: 'EM012', name: 'Sok Dara', appiledOn: '12 Nov 2025', date: '12 Nov - 14 Nov', type: 'On Duty' },
  { id: 'EM013', name: 'Sok Dara', appiledOn: '12 Nov 2025', date: '12 Nov - 14 Nov', type: 'Leave' },
  { id: 'EM014', name: 'Sok Dara', appiledOn: '12 Nov 2025', date: '12 Nov - 14 Nov', type: 'Late' },
  { id: 'EM015', name: 'Sok Dara', appiledOn: '12 Nov 2025', date: '12 Nov - 14 Nov', type: 'Leave' },
  { id: 'EM016', name: 'Sok Dara', appiledOn: '15 Nov 2025', date: '15 Nov - 16 Nov', type: 'Leave' },
];

const employeesData = [
  { id: 'EM011', name: 'Sok Dara', role: 'UI Designer', days: 3, In: '9:00 AM', Out: '6:00 PM' },
  { id: 'EM012', name: 'Lang Makara', role: 'Frontend Developer', days: 2, In: '9:00 AM', Out: '6:00 PM' },
  { id: 'EM013', name: 'Sok Dara', role: 'Backend Developer', days: 1, In: '9:00 AM', Out: '6:00 PM' },
  { id: 'EM014', name: 'Chan Sopheak', role: 'Project Manager', days: 4, In: '9:00 AM', Out: '6:00 PM' },
  { id: 'EM016', name: 'Meas Vanna', role: 'QA Engineer', days: 2, In: '9:00 AM', Out: '6:00 PM' },
  { id: 'EM017', name: 'Meas Vanna', role: 'QA Engineer', days: 2, In: '9:00 AM', Out: '6:00 PM' },
  { id: 'EM018', name: 'Meas Vanna', role: 'QA Engineer', days: 2, In: '9:00 AM', Out: '6:00 PM' },
];

export default function DashboardPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* --- LEFT SECTION (2 Cols) --- */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Stats Cards Wrapper */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-row items-center justify-start overflow-x-auto gap-2">
            {attendanceStats.map((stat, index) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                iconBgColor={stat.iconBgColor}
                textColor={stat.textColor}
                isLast={index === attendanceStats.length - 1}
              />
            ))}
          </div>

          {/* Main Table: Recent Requests */}
          <Paper className="rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex justify-between items-center p-4">
              <h2 className="font-bold text-gray-800 text-lg">Recent Request</h2>
              <button className="text-blue-500 text-sm font-semibold hover:underline">View All</button>
            </div>
            
            <TableContainer sx={{ height: 250, overflowY: 'auto' }}>
              <Table stickyHeader aria-label="recent requests table">
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
                          borderBottom: '2px solid #e2e8f0'
                        }}
                      >
                        {column.label}
                      </TableCell>
                      
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {requests
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, idx) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={idx}>
                        <TableCell className="text-gray-600 font-medium">{row.id}</TableCell>
                        <TableCell className="font-semibold text-gray-800">{row.name}</TableCell>
                        <TableCell className="text-gray-500">{row.appiledOn}</TableCell>
                        <TableCell className="text-gray-500">{row.date}</TableCell>
                        <TableCell>
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            row.type === 'Leave' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {row.type}
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
              count={requests.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>

        {/* --- RIGHT SECTION (Calendar) --- */}
        <div className="lg:col-span-1 max-w-lg">
          <Calendar />
        </div>
      </div>

      {/* --- BOTTOM SECTION --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">

        {/* Employee's on Leave Table */}
        <Paper className="p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Employee's on Leave</h2>
            <button className="text-blue-500 text-sm font-semibold hover:underline">View All</button>
          </div>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {employeesData.slice(0, 4).map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{row.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>{row.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{row.role}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right" sx={{ color: '#64748b', fontWeight: 500 }}>
                      {row.days} days
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Employee's on Duty Table */}
        <Paper className="p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Employee's on Duty</h2>
            <button className="text-blue-500 text-sm font-semibold hover:underline">View All</button>
          </div>
          <TableContainer>
            <Table size="small">
              <TableBody>
                {employeesData.slice(0, 4).map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell sx={{ color: '#64748b', fontWeight: 600 }}>{row.id}</TableCell>
                    <TableCell>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#1e293b' }}>{row.name}</Typography>
                        <Typography variant="caption" sx={{ color: '#94a3b8' }}>{row.role}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="flex flex-col">
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1e293b' }}>In</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>{row.In}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box className="flex flex-col">
                        <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#1e293b' }}>Out</Typography>
                        <Typography variant="caption" sx={{ color: '#64748b' }}>{row.Out}</Typography>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}