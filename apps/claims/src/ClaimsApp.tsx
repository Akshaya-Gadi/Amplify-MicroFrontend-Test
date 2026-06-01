import { Routes, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { ClaimsNav } from './components/ClaimsNav';
import { ClaimsDashboard } from './pages/ClaimsDashboard';
import { OpenClaims } from './pages/OpenClaims';

/**
 * Exposed federated entry. Rendered by the shell under `/claims/*`, so routes
 * here are RELATIVE to `/claims`. Owns its internal menu only.
 */
export default function ClaimsApp() {
  return (
    <Box>
      <ClaimsNav />
      <Routes>
        <Route index element={<ClaimsDashboard />} />
        <Route path="open" element={<OpenClaims />} />
        <Route path="*" element={<Navigate to="." replace />} />
      </Routes>
    </Box>
  );
}
