import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NavLink, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';
import { SIDEBAR_WIDTH } from '../theme';

export interface NavItem {
  label: string;
  to: string;
  icon?: ReactNode;
  /** Match the route as a prefix (useful for module roots like /billing). */
  matchPrefix?: boolean;
}

export interface NavbarProps {
  items: NavItem[];
  mobileOpen?: boolean;
  onClose?: () => void;
  heading?: string;
}

function NavContent({ items, heading }: { items: NavItem[]; heading?: string }) {
  const { pathname } = useLocation();
  return (
    <Box sx={{ overflow: 'auto', py: 1 }}>
      {heading && (
        <Typography variant="overline" sx={{ px: 3, color: 'text.secondary' }}>
          {heading}
        </Typography>
      )}
      <List>
        {items.map((item) => {
          const selected = item.matchPrefix
            ? pathname === item.to || pathname.startsWith(item.to + '/')
            : pathname === item.to;
          return (
            <ListItem key={item.to} disablePadding sx={{ px: 1 }}>
              <ListItemButton
                component={NavLink}
                to={item.to}
                selected={selected}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': { bgcolor: 'primary.main', color: 'common.white' },
                  '&.Mui-selected:hover': { bgcolor: 'primary.dark' },
                  '&.Mui-selected .MuiListItemIcon-root': { color: 'common.white' },
                }}
              >
                {item.icon && <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

/** Responsive left navigation. Permanent on desktop, temporary drawer on mobile. */
export function Navbar({ items, mobileOpen = false, onClose, heading }: NavbarProps) {
  return (
    <Box component="nav" sx={{ width: { md: SIDEBAR_WIDTH }, flexShrink: { md: 0 } }}>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: SIDEBAR_WIDTH },
        }}
      >
        <Toolbar />
        <NavContent items={items} heading={heading} />
      </Drawer>
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: SIDEBAR_WIDTH,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
      >
        <Toolbar />
        <NavContent items={items} heading={heading} />
      </Drawer>
    </Box>
  );
}
