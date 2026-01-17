"use client";

import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

interface Column {
    id: 'id' | 'createdBy' | 'type' | 'startdate' | 'enddate' | 'status';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center' | 'left';
}

const columns: readonly Column[] = [
    { id: 'id', label: 'Code', minWidth: 90 },
    { id: 'createdBy', label: 'Created By', minWidth: 150 },
    { id: 'type', label: 'Type', minWidth: 150 },
    { id: 'startdate', label: 'Start Date', minWidth: 100 },
    { id: 'enddate', label: 'End Date', minWidth: 100 },
    { id: 'status', label: 'Status', minWidth: 100, align: 'center' },
];

const reports = [
    { id: 'RPT001', createdBy: 'Admin User', type: 'Employee Summary', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Approved' },
    { id: 'RPT002', createdBy: 'HR Manager', type: 'Attendance Report', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Pending' },
    { id: 'RPT003', createdBy: 'Finance Team', type: 'Salary Report', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Pending' },
    { id: 'RPT004', createdBy: 'Admin User', type: 'Leave Report', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Approved' },
    { id: 'RPT005', createdBy: 'Admin User', type: 'Leave Report', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Approved' },
    { id: 'RPT006', createdBy: 'HR Manager', type: 'Leave Report', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Pending' },
    { id: 'RPT007', createdBy: 'Finance Team', type: 'Tax Filing', startdate: '2024-04-01', enddate: '2024-04-30', status: 'Approved' },
    { id: 'RPT008', createdBy: 'System Bot', type: 'Performance Review', startdate: '2024-01-01', enddate: '2024-03-31', status: 'Draft' },
    { id: 'RPT009', createdBy: 'HR Manager', type: 'Onboarding Checklist', startdate: '2024-06-01', enddate: '2024-06-15', status: 'Pending' },
    { id: 'RPT010', createdBy: 'Admin User', type: 'Audit Log', startdate: '2024-05-15', enddate: '2024-05-20', status: 'Approved' },
    { id: 'RPT011', createdBy: 'Finance Team', type: 'Expense Claims', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Rejected' },
    { id: 'RPT012', createdBy: 'Operations', type: 'Shift Schedule', startdate: '2024-07-01', enddate: '2024-07-07', status: 'Approved' },
    { id: 'RPT013', createdBy: 'HR Manager', type: 'Attendance Report', startdate: '2024-04-01', enddate: '2024-04-30', status: 'Approved' },
    { id: 'RPT014', createdBy: 'Finance Team', type: 'Salary Report', startdate: '2024-06-01', enddate: '2024-06-30', status: 'Pending' },
    { id: 'RPT015', createdBy: 'Admin User', type: 'Employee Summary', startdate: '2024-01-01', enddate: '2024-12-31', status: 'Approved' },
    { id: 'RPT016', createdBy: 'System Bot', type: 'System Health', startdate: '2024-05-25', enddate: '2024-05-25', status: 'Approved' },
    { id: 'RPT017', createdBy: 'HR Manager', type: 'Recruitment Funnel', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Pending' },
    { id: 'RPT018', createdBy: 'Operations', type: 'Inventory Audit', startdate: '2024-05-10', enddate: '2024-05-12', status: 'Rejected' },
    { id: 'RPT019', createdBy: 'Finance Team', type: 'Tax Filing', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Pending' },
    { id: 'RPT020', createdBy: 'Admin User', type: 'Security Access', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Approved' },
    { id: 'RPT021', createdBy: 'HR Manager', type: 'Training Progress', startdate: '2024-02-01', enddate: '2024-02-28', status: 'Approved' },
    { id: 'RPT022', createdBy: 'Finance Team', type: 'Salary Report', startdate: '2024-03-01', enddate: '2024-03-31', status: 'Approved' },
    { id: 'RPT023', createdBy: 'Operations', type: 'Logistics Cost', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Draft' },
    { id: 'RPT024', createdBy: 'Admin User', type: 'Leave Report', startdate: '2024-04-01', enddate: '2024-04-30', status: 'Approved' },
    { id: 'RPT025', createdBy: 'HR Manager', type: 'Attendance Report', startdate: '2024-03-01', enddate: '2024-03-31', status: 'Approved' },
    { id: 'RPT026', createdBy: 'Finance Team', type: 'Expense Claims', startdate: '2024-04-01', enddate: '2024-04-30', status: 'Approved' },
    { id: 'RPT027', createdBy: 'System Bot', type: 'Error Logs', startdate: '2024-05-29', enddate: '2024-05-30', status: 'Approved' },
    { id: 'RPT028', createdBy: 'Operations', type: 'Shift Schedule', startdate: '2024-06-01', enddate: '2024-06-07', status: 'Pending' },
    { id: 'RPT029', createdBy: 'HR Manager', type: 'Performance Review', startdate: '2024-04-01', enddate: '2024-06-30', status: 'Pending' },
    { id: 'RPT030', createdBy: 'Finance Team', type: 'Overtime Pay', startdate: '2024-05-01', enddate: '2024-05-31', status: 'Approved' }
];

export default function ReportsEPage() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // FIX: Slice the reports array based on current page and rows per page
    const visibleRows = React.useMemo(
        () => reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
        [page, rowsPerPage]
    );

    // Helper for Status Styling
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Approved': return 'bg-green-100 text-green-800';
            case 'Rejected': return 'bg-red-100 text-red-800';
            case 'Pending': return 'bg-yellow-100 text-yellow-800';
            case 'Draft': return 'bg-gray-100 text-gray-800';
            default: return 'bg-blue-100 text-blue-800';
        }
    };

    return (
        <div className="p-3">
            <div className='bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200'>
                <TableContainer sx={{ height: 750 }}>
                    <Table stickyHeader aria-label="reports table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ 
                                            minWidth: column.minWidth, 
                                            fontWeight: 'bold', 
                                            backgroundColor: '#6b7280', 
                                            color: 'white' 
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {visibleRows.map((report) => (
                                <TableRow hover role="checkbox" tabIndex={-1} key={report.id}>
                                    <TableCell>{report.id}</TableCell>
                                    <TableCell>{report.createdBy}</TableCell>
                                    <TableCell>{report.type}</TableCell>
                                    <TableCell>{report.startdate}</TableCell>
                                    <TableCell>{report.enddate}</TableCell>
                                    <TableCell align="center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusStyles(report.status)}`}>
                                            {report.status}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25]}
                    component="div"
                    count={reports.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
        </div>
    );
}