import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, useLocation } from 'react-router-dom';

/** Claims-internal navigation/menu, owned by the Claims module. */
export function ClaimsNav() {
  const { pathname } = useLocation();
  const value = pathname.endsWith('/open') ? '/claims/open' : '/claims';

  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={value}>
        <Tab label="Dashboard" value="/claims" component={Link} to="/claims" />
        <Tab label="Open Claims" value="/claims/open" component={Link} to="/claims/open" />
      </Tabs>
    </Box>
  );
}
