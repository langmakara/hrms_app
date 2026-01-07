import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const UniversalModal = ({ open, onClose, title, children }: Props) => (
  <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
    <DialogTitle className="flex justify-between items-center bg-gray-50 border-b">
      <span className="font-bold text-gray-700">{title}</span>
      <IconButton onClick={onClose}><CloseIcon /></IconButton>
    </DialogTitle>
    <DialogContent className="p-4 bg-gray-50">
      {children}
    </DialogContent>
  </Dialog>
);

export default UniversalModal;