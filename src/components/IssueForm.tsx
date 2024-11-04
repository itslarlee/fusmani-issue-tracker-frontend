import React, { useState } from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { IssueFormValues } from '../interfaces/issue';
import useIssues from '../hooks/useIssues';

interface IssueFormProps {
  onClose: () => void;
}

const IssueForm: React.FC<IssueFormProps> = ({ onClose }) => {
  const [formValues, setFormValues] = useState<IssueFormValues>({
    title: '',
    description: '',
    status: 'Open',
    priority: 'Medium',
  });

  const { addIssue } = useIssues();

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
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await addIssue(formValues); 
    onClose(); 
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        name="title"
        value={formValues.title}
        onChange={handleTextFieldChange}
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formValues.description}
        onChange={handleTextFieldChange}
        required
        multiline
        rows={3}
      />
      <FormControl fullWidth>
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
      <FormControl fullWidth>
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
      <Button type="submit" variant="contained" color="primary">
        Create Issue
      </Button>
    </Box>
  );
};

export default IssueForm;
