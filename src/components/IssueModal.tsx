import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';
import IssueForm from './IssueForm';

interface IssueModalProps {
  open: boolean;
  onClose: () => void;
}

const IssueModal: React.FC<IssueModalProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Issue</DialogTitle>
      <DialogContent>
        <IssueForm onClose={onClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          <Typography variant='body2'>Cancel</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default IssueModal;