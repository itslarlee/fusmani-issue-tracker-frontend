import React, { useState } from 'react';
import { Container, Typography, Button } from '@mui/material';
import KanbanBoard from './components/KanbanBoard';
import IssueModal from './components/IssueModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" align="center" gutterBottom>
        Issue Tracker
      </Typography>

      <Button variant="contained" color="primary" onClick={openModal}>
        Create New Issue
      </Button>

      <KanbanBoard />

      <IssueModal open={isModalOpen} onClose={closeModal} />
    </Container>
  );
};

export default App;