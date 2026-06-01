import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} CBG Labs — Microfrontend Reference Architecture
      </Typography>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <Link href="#" variant="body2" color="text.secondary" underline="hover">
          Privacy
        </Link>
        <Link href="#" variant="body2" color="text.secondary" underline="hover">
          Support
        </Link>
      </Box>
    </Box>
  );
}
