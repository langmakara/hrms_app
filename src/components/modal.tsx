"use client";

import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

interface AddEmployeeProps {
  open: boolean;
  handleClose: () => void;
}

export default function Modals({ open, handleClose }: AddEmployeeProps) {
    return(
        <div className='p-3'>
            <Modal open={open} onClose={handleClose} >
                <Box sx={style}>
                    <Typography variant="h6" component="h2" mb={2}>
                        Add New Employee
                    </Typography>
                    {/* បញ្ចូល Form របស់អ្នកនៅទីនេះ */}
                    <div className="flex flex-col gap-3">
                        <input className="border p-2 rounded" placeholder="Employee Name" />
                        <input className="border p-2 rounded" placeholder="Email" />
                        <button 
                            onClick={handleClose}
                            className="bg-blue-600 text-white py-2 rounded mt-2"
                        >
                            Save
                        </button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}