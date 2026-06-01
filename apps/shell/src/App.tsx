import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GavelIcon from '@mui/icons-material/Gavel';
import { Layout, type NavItem } from '@mfe/design-system';
import { Dashboard } from './pages/Dashboard';
import { RemoteBoundary } from './components/RemoteBoundary';

// Lazy load remote microfrontends. Their code (and remoteEntry.js) is only
// fetched when the user navigates into /billing or /claims => route-level code
// splitting across deployment boundaries.
const BillingApp = lazy(() => import('billing/BillingApp'));
const ClaimsApp = lazy(() => import('claims/ClaimsApp'));

// Shell owns these top-level nav entries. Module-internal links live inside
// each microfrontend's own menu.
const navItems: NavItem[] = [
  { label: 'Dashboard', to: '/dashboard', icon: <DashboardIcon /> },
  { label: 'Billing', to: '/billing', icon: <ReceiptLongIcon />, matchPrefix: true },
  { label: 'Claims', to: '/claims', icon: <GavelIcon />, matchPrefix: true },
];

export function App() {
  return (
    <Layout title="CBG Enterprise Portal" navItems={navItems} navHeading="Workspace">
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Route ownership: the shell owns the /billing/* prefix and delegates
            everything below it to the Billing remote, which renders its own
            nested <Routes>. Same for /claims/*. */}
        <Route
          path="/billing/*"
          element={
            <RemoteBoundary name="Billing">
              <Suspense fallback={<RemoteBoundary.Loading name="Billing" />}>
                <BillingApp />
              </Suspense>
            </RemoteBoundary>
          }
        />
        <Route
          path="/claims/*"
          element={
            <RemoteBoundary name="Claims">
              <Suspense fallback={<RemoteBoundary.Loading name="Claims" />}>
                <ClaimsApp />
              </Suspense>
            </RemoteBoundary>
          }
        />

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}
