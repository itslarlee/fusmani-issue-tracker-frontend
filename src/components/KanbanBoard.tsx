import React from 'react';
import { Box, Grid, Typography, useTheme } from '@mui/material';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { IssueFormValues, Status } from '../interfaces/issue';
import useIssues from '../hooks/useIssues';
import DraggableIssueCard from './DraggableIssueCard';

const KanbanBoard: React.FC = () => {
  const { issues, updateIssue } = useIssues();

  const filterIssues = (status: Status) => issues.filter(issue => issue.status === status);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && over.id !== active.data.current?.status) {
      const newStatus = over.id as Status;
      const issueId = active.id as string;
      const issueToUpdate = issues.find(issue => issue.id === issueId);
      if (issueToUpdate) {
        const updatedValues: IssueFormValues = {
          title: issueToUpdate.title,
          description: issueToUpdate.description,
          status: newStatus,
          priority: issueToUpdate.priority,
        };

        updateIssue(issueId, updatedValues); 
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Box
        sx={{
          display: 'flex',
          gap: 3,
          padding: 2,
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {(['Open', 'In Progress', 'Resolved'] as Status[]).map((status) => (
          <Column key={status} status={status}>
            {filterIssues(status).map((issue) => (
              <DraggableIssueCard key={issue.id} issue={issue} />
            ))}
          </Column>
        ))}
      </Box>
    </DndContext>
  );
};

interface ColumnProps {
  status: Status;
  children: React.ReactNode;
}

const Column: React.FC<ColumnProps> = ({ status, children }) => {
  const theme = useTheme(); 
  
const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Grid
      item
      xs={4}
      ref={setNodeRef}
      sx={{
        minWidth: 350,
        height: 700, 
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '8px',
        padding: 2,
        backgroundColor: theme.palette.background.paper, 
      }}
    >
      <Typography variant="h6" gutterBottom align="center">
        {status}
      </Typography>
      {children}
    </Grid>
  );
};

export default KanbanBoard;

