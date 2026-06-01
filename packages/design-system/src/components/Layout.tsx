import { useState, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { Header } from './Header';
import { Footer } from './Footer';
import { Navbar, type NavItem } from './Navbar';
import { NotificationCenter } from './NotificationCenter';
import { SIDEBAR_WIDTH } from '../theme';

export interface LayoutProps {
  title?: string;
  navItems: NavItem[];
  navHeading?: string;
  children: ReactNode;
}

/**
 * Shared application shell layout: fixed header, responsive sidebar, scrollable
 * main content and footer. The shell uses this; standalone microfrontends can too.
 */
export function Layout({ title, navItems, navHeading, children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      <Header title={title} onMenuClick={() => setMobileOpen((o) => !o)} />
      <Navbar
        items={navItems}
        heading={navHeading}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          width: { md: `calc(100% - ${SIDEBAR_WIDTH}px)` },
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>{children}</Box>
        <Footer />
      </Box>
      <NotificationCenter />
    </Box>
  );
}
