import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { BillingNav } from './components/BillingNav';
import { BillingDashboard } from './pages/BillingDashboard';
import { BillingHistory } from './pages/BillingHistory';

/**
 * Exposed federated entry. Rendered by the shell under the `/billing/*` route,
 * so all routes here are RELATIVE to `/billing`. It deliberately does NOT render
 * a Router (the shell owns the single shared Router) nor the global Layout
 * (the shell provides header/sidebar/footer). It only owns its internal menu.
 */
export default function BillingApp() {
  return (
    <Box>
      <BillingNav />
      <Routes>
        <Route index element={<BillingDashboard />} />
        <Route path="history" element={<BillingHistory />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </Box>
  );
}
