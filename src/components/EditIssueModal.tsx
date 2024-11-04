import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, Typography } from '@mui/material';
import { Issue, IssueFormValues } from '../interfaces/issue';
import useIssues from '../hooks/useIssues';

interface EditIssueModalProps {
  open: boolean;
  onClose: () => void;
  issue: Issue;
}

const EditIssueModal: React.FC<EditIssueModalProps> = ({ open, onClose, issue }) => {
  const [formValues, setFormValues] = useState<IssueFormValues>({
    title: issue.title,
    description: issue.description,
    status: issue.status,
    priority: issue.priority,
  });

  const { updateIssue } = useIssues();

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name as string]: value as string,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();  
    await updateIssue(issue.id, formValues);  
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Issue</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Title"
            name="title"
            value={formValues.title}
            onChange={handleTextFieldChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="description"
            value={formValues.description}
            onChange={handleTextFieldChange}
            fullWidth
            required
            margin="normal"
            multiline
            rows={3}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={formValues.status}
              onChange={handleSelectChange}
            >
              <MenuItem value="Open">Open</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Priority</InputLabel>
            <Select
              name="priority"
              value={formValues.priority}
              onChange={handleSelectChange}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </Select>
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
            <Typography variant='body2'>Cancel</Typography>
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
            <Typography variant='body2'>Save Changes</Typography>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditIssueModal;
