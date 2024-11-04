import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import DeleteIcon from '@mui/icons-material/Delete';
import ErrorIcon from '@mui/icons-material/Error';
import EditIssueModal from './EditIssueModal';
import ConfirmDeleteModal from './ConfirmDeleteModal';
import useIssues from '../hooks/useIssues';
import { Issue } from '../interfaces/issue';

interface DraggableIssueCardProps {
  issue: Issue;
}

const DraggableIssueCard: React.FC<DraggableIssueCardProps> = ({ issue }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { removeIssue } = useIssues();

  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: issue.id,
    data: { status: issue.status },
  });

  const openEditModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const openDeleteModal = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const confirmDelete = () => {
    removeIssue(issue.id);
    setIsDeleteModalOpen(false);
  };

  const getPriorityColor = () => {
    switch (issue.priority) {
      case 'High':
        return 'error.main';
      case 'Medium':
        return 'warning.main';
      case 'Low':
        return 'success.main';
      default:
        return 'text.secondary';
    }
  };

  const style: React.CSSProperties = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition: isDragging ? 'none' : 'transform 0.2s ease',
    marginBottom: '8px',
    position: 'relative',
  };

  return (
    <>
      <div ref={setNodeRef} style={style}>
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
            cursor: 'pointer',
            '&:hover .delete-icon': {
              opacity: 1,
            },
          }}
          onClick={openEditModal}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <IconButton
              aria-label="delete"
              size="small"
              onClick={openDeleteModal}
              className="delete-icon"
              sx={{
                opacity: 0.8,
                transition: 'opacity 0.2s ease',
                '&:hover': {
                  opacity: 1,
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
            <ErrorIcon sx={{ color: getPriorityColor(), fontSize: 20 }} />
          </Box>

          {/* Draggable Icon on the Left */}
          <Box
            sx={{
              cursor: 'grab',
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 1,
              paddingRight: 1,
            }}
            {...attributes}
            {...listeners}
          >
            <IconButton aria-label="drag" size="small">
              <DragIndicatorIcon />
            </IconButton>
          </Box>

          <CardContent sx={{ flexGrow: 1, width: '80%' }}>
            <Typography 
                variant="h6" 
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '80%',
                }}>{issue.title}
              </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
              }}
            >
              {issue.description}
            </Typography>
          </CardContent>
        </Card>
      </div>

      <EditIssueModal open={isEditModalOpen} onClose={closeEditModal} issue={issue} />

      <ConfirmDeleteModal open={isDeleteModalOpen} onClose={closeDeleteModal} onConfirm={confirmDelete} />
    </>
  );
};

export default DraggableIssueCard;
