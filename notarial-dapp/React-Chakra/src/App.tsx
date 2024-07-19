import React from 'react';
import {
  ChakraProvider,
  Box,
  extendTheme,
  CSSReset,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotaryDashboard from './pages/NotaryPage';
import ClientDashboard from './pages/ClientPage';
import Feedback from './pages/FeedbackPage';
import GuidePage from './pages/GuidePage';
import { NotificationProvider } from './components/Notifications';  // Adjust the path as necessary

const theme = extendTheme({
  colors: {
    brand: {
      900: '#1a365d',
      800: '#153e75',
      700: '#2a69ac',
    },
  },
});

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Router>
        <NotificationProvider> {/* Wrap all routes with the NotificationProvider */}
          <Box>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/notary-dashboard" element={<NotaryDashboard />} />
              <Route path="/client-dashboard" element={<ClientDashboard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/guide" element={<GuidePage />} />
            </Routes>
          </Box>
        </NotificationProvider>
      </Router>
    </ChakraProvider>
  );
};

export default App;
