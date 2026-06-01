import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Hub from '@mui/icons-material/Hub';
import { HEADER_HEIGHT } from '../theme';

export interface HeaderProps {
  title?: string;
  onMenuClick?: () => void;
}

export function Header({ title = 'CBG Enterprise Portal', onMenuClick }: HeaderProps) {
  return (
    <AppBar
      position="fixed"
      color="default"
      sx={{
        zIndex: (t) => t.zIndex.drawer + 1,
        height: HEADER_HEIGHT,
        justifyContent: 'center',
        bgcolor: 'primary.main',
        color: 'common.white',
      }}
    >
      <Toolbar>
        {onMenuClick && (
          <IconButton color="inherit" edge="start" onClick={onMenuClick} sx={{ mr: 1, display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
        )}
        <Hub sx={{ mr: 1.5 }} />
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
            ops@cbglabs.com
          </Typography>
          <Avatar sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}>O</Avatar>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
