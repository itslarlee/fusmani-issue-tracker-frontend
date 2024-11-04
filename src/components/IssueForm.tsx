import React from 'react';
import { Box, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useIssues from '../hooks/useIssues';
import { IssueFormValues, Status, Priority } from '../interfaces/issue';  

interface IssueFormProps {
  onClose: () => void;
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
  status: Yup.mixed<Status>().oneOf(['Open', 'In Progress', 'Resolved']).required('Status is required'),
  priority: Yup.mixed<Priority>().oneOf(['Low', 'Medium', 'High']).required('Priority is required'),
});

const IssueForm: React.FC<IssueFormProps> = ({ onClose }) => {
  const { addIssue } = useIssues();

  const formik = useFormik<IssueFormValues>({
    initialValues: {
      title: '',
      description: '',
      status: 'Open' as Status,
      priority: 'Medium' as Priority,
    },
    validationSchema,
    onSubmit: async (values) => {
      await addIssue(values);
      onClose();
    },
  });

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        error={formik.touched.title && Boolean(formik.errors.title)}
        helperText={formik.touched.title && formik.errors.title}
      />
      <TextField
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        required
        multiline
        rows={3}
        error={formik.touched.description && Boolean(formik.errors.description)}
        helperText={formik.touched.description && formik.errors.description}
      />
      <FormControl fullWidth error={formik.touched.status && Boolean(formik.errors.status)}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={formik.values.status}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <MenuItem value="Open">Open</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Resolved">Resolved</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth error={formik.touched.priority && Boolean(formik.errors.priority)}>
        <InputLabel>Priority</InputLabel>
        <Select
          name="priority"
          value={formik.values.priority}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
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
