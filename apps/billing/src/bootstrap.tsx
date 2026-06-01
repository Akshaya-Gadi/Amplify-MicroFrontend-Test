import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import HistoryIcon from '@mui/icons-material/History';
import { AppThemeProvider, Layout, type NavItem } from '@mfe/design-system';
import BillingApp from './BillingApp';

// Standalone harness: lets the Billing module run on its own (npm run dev) with
// the shared Layout, exactly as a developer would expect. In production the
// shell renders <BillingApp/> directly without this wrapper.
const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/billing', icon: <ReceiptLongIcon /> },
  { label: 'History', to: '/billing/history', icon: <HistoryIcon /> },
];

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppThemeProvider>
      <BrowserRouter>
        <Layout title="Billing (standalone)" navItems={navItems} navHeading="Billing">
          <Routes>
            <Route path="/" element={<Navigate to="/billing" replace />} />
            <Route path="/billing/*" element={<BillingApp />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AppThemeProvider>
  </React.StrictMode>,
);
