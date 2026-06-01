import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

/** Billing-internal navigation/menu. Owned by the Billing module, not the shell. */
export function BillingNav() {
  const { pathname } = useLocation();
  const value = pathname.endsWith('/history') ? '/billing/history' : '/billing';

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={value}>
        <Tab label="Dashboard" value="/billing" component={Link} to="/billing" />
        <Tab label="History" value="/billing/history" component={Link} to="/billing/history" />
      </Tabs>
    </Box>
  );
}
