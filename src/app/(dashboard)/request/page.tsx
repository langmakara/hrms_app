"use client";

import * as React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  Typography,
  Button,
  Divider
} from '@mui/material';

import UniversalModal from '../../../components/UniversalModal';

// --- Interfaces & Columns (រក្សាទុកដដែល) ---
interface Column {
  id: 'id' | 'name' | 'type' | 'appliedOn' | 'startDate' | 'endDate' | 'description' | 'status';
  label: string;
  minWidth?: number;
  align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
  { id: 'id', label: 'Code', minWidth: 90 },
  { id: 'name', label: 'Name', minWidth: 165 },
  { id: 'type', label: 'Type', minWidth: 90 },
  { id: 'appliedOn', label: 'Applied On', minWidth: 150 },
  { id: 'startDate', label: 'Start Date', minWidth: 120 },
  { id: 'endDate', label: 'End Date', minWidth: 120 },
  { id: 'description', label: 'Description', minWidth: 250 },
  { id: 'status', label: 'Status', minWidth: 120, align: 'center' },
];

const requests = [
  { id: 'EM011', name: 'Sok Dara', appliedOn: '12 Nov 2025', startDate: '12 Nov', endDate: '14 Nov', type: 'Leave', description: 'Annual leave for personal reasons', status: 'Pending' },
  { id: 'EM012', name: 'Sok Dara', appliedOn: '12 Nov 2025', startDate: '12 Nov', endDate: '14 Nov', type: 'On Duty', description: 'On duty for client meeting', status: 'Approved' },
  { id: 'EM013', name: 'Sok Dara', appliedOn: '12 Nov 2025', startDate: '12 Nov', endDate: '14 Nov', type: 'Leave', description: 'Sick leave due to illness', status: 'Rejected' },
  // ... data ផ្សេងទៀត
];

export default function RequestPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  
  // State សម្រាប់គ្រប់គ្រង Modal
  const [modal, setModal] = React.useState<{
    open: boolean;
    data?: any;
  }>({
    open: false,
    data: undefined,
  });

  const handleChangePage = (event: unknown, newPage: number) => setPage(newPage);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // បើក Modal និងបញ្ជូន data របស់ Row ដែលបាន Click
  const handleRowClick = (rowData: any) => {
    setModal({
      open: true,
      data: rowData,
    });
  };

  const handleCloseModal = () => setModal({ ...modal, open: false });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-amber-100 text-amber-700';
    }
  };

  return (
    <div className="p-6">

      <Paper className="w-full rounded-xl overflow-hidden shadow-sm border border-gray-200">
        <TableContainer sx={{ height: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#4b5563', color: 'white' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {requests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => (
                  <TableRow 
                    hover 
                    key={row.id} 
                    onClick={() => handleRowClick(row)} // Click ដើម្បីបើក Modal
                    sx={{ cursor: 'pointer' }} 
                  >
                    <TableCell className="font-medium text-gray-600">{row.id}</TableCell>
                    <TableCell className="font-semibold text-gray-800">{row.name}</TableCell>
                    <TableCell><span className="text-blue-600 font-medium">{row.type}</span></TableCell>
                    <TableCell className="text-gray-500">{row.appliedOn}</TableCell>
                    <TableCell className="text-gray-500">{row.startDate}</TableCell>
                    <TableCell className="text-gray-500">{row.endDate}</TableCell>
                    <TableCell className="text-gray-500 italic text-sm no-wrap">{row.description}</TableCell>
                    <TableCell align="center">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyle(row.status)}`}>
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
          count={requests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* --- UniversalModal សម្រាប់ Approve/Reject --- */}
      <UniversalModal 
        open={modal.open} 
        onClose={handleCloseModal}
        title="Request Details"
      >
        {modal.data && (
          <Box className="p-4 space-y-4">
            {/* បង្ហាញព័ត៌មានសង្ខេប */}
            <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
                <div>
                    <Typography variant="caption" color="textSecondary">Employee Name</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{modal.data.name} ({modal.data.id})</Typography>
                </div>
                <div>
                    <Typography variant="caption" color="textSecondary">Request Type</Typography>
                    <Typography variant="body1" sx={{ color: '#2563eb', fontWeight: 600 }}>{modal.data.type}</Typography>
                </div>
                <div>
                    <Typography variant="caption" color="textSecondary">Duration</Typography>
                    <Typography variant="body2">{modal.data.startDate} - {modal.data.endDate}</Typography>
                </div>
                <div>
                    <Typography variant="caption" color="textSecondary">Current Status</Typography>
                    <Box><span className={`px-2 py-0.5 rounded text-xs font-bold ${getStatusStyle(modal.data.status)}`}>{modal.data.status}</span></Box>
                </div>
            </div>

            <div>
                <Typography variant="caption" color="textSecondary">Reason / Description</Typography>
                <Typography variant="body2" sx={{ mt: 0.5, p: 2, bgcolor: '#fff', border: '1px dashed #cbd5e1', borderRadius: 1 }}>
                    "{modal.data.description}"
                </Typography>
            </div>

            <Divider />

            {/* ប៊ូតុងសកម្មភាព */}
            <Box className="flex justify-end gap-3 pt-2">
              <Button 
                variant="outlined" 
                color="inherit" 
                onClick={handleCloseModal}
                sx={{ borderRadius: '8px', textTransform: 'none' }}
              >
                Cancel
              </Button>
              
              {/* ប៊ូតុង Reject */}
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => { alert('Rejected!'); handleCloseModal(); }}
                sx={{ borderRadius: '8px', textTransform: 'none', boxShadow: 'none' }}
              >
                Reject
              </Button>

              {/* ប៊ូតុង Approve */}
              <Button 
                variant="contained" 
                color="success" 
                onClick={() => { alert('Approved!'); handleCloseModal(); }}
                sx={{ borderRadius: '8px', textTransform: 'none', boxShadow: 'none' }}
              >
                Approve
              </Button>
            </Box>
          </Box>
        )}
      </UniversalModal>
    </div>
  );
}