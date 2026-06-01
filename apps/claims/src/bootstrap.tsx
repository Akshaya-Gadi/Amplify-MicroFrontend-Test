import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GavelIcon from '@mui/icons-material/Gavel';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { AppThemeProvider, Layout, type NavItem } from '@mfe/design-system';
import ClaimsApp from './ClaimsApp';

const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/claims', icon: <GavelIcon /> },
  { label: 'Open Claims', to: '/claims/open', icon: <FolderOpenIcon /> },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <BrowserRouter>
        <Layout title="Claims (standalone)" navItems={navItems} navHeading="Claims">
          <Routes>
            <Route path="/" element={<Navigate to="/claims" replace />} />
            <Route path="/claims/*" element={<ClaimsApp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppThemeProvider>
  </React.StrictMode>,
);
