import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, Typography, Button, AppBar, Toolbar, Box, CssBaseline } from '@mui/material';
import KanbanBoard from './components/KanbanBoard';
import IssueModal from './components/IssueModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
      },
      secondary: {
        main: '#f48fb1',
      },
      background: {
        default: '#002138',
        paper: '#00171F', 
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />

      <AppBar position="static" sx={{ bgcolor: darkTheme.palette.background.paper }} elevation={0}>
        <Toolbar>
          <Box sx={{ position: 'absolute', left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h6" align="center">
              Issue Tracker
            </Typography>
          </Box>
          
          <Box sx={{ marginLeft: 'auto' }}>
            <Button color="inherit" variant="outlined" onClick={openModal}>
              Create New Issue
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <KanbanBoard />
      </Container>

      <IssueModal open={isModalOpen} onClose={closeModal} />
    </ThemeProvider>
  );
};

export default App;
