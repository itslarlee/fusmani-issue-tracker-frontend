import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DndContext, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { Status } from '../interfaces/issue';
import useIssues from '../hooks/useIssues';
import DraggableIssueCard from './DraggableIssueCard';

const KanbanBoard: React.FC = () => {
  const { issues, updateIssue } = useIssues();

  const filterIssues = (status: Status) => issues.filter(issue => issue.status === status);

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;

    if (over && over.id !== active.data.current?.status) {
      const newStatus = over.id as Status;
      updateIssue(active.id as string, newStatus);
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
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <Grid
      item
      xs={4}
      ref={setNodeRef}
      sx={{
        minWidth: 300,
        border: '1px solid lightgrey',
        borderRadius: '8px',
        padding: 2,
        backgroundColor: '#f4f4f4',
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
