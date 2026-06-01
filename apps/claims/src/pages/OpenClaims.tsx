import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import { formatDate } from '@mfe/shared-utils';

const rows = [
  { id: 'CLM-5521', opened: '2026-05-27', priority: 'High', status: 'In Review' },
  { id: 'CLM-5520', opened: '2026-05-25', priority: 'Medium', status: 'Awaiting Docs' },
  { id: 'CLM-5519', opened: '2026-05-21', priority: 'Low', status: 'In Review' },
  { id: 'CLM-5518', opened: '2026-05-19', priority: 'High', status: 'Escalated' },
];

const color: Record<string, 'error' | 'warning' | 'default'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'default',
};

export function OpenClaims() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Open Claims
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Route: <code>/claims/open</code>
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Claim</TableCell>
              <TableCell>Opened</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.id}</TableCell>
                <TableCell>{formatDate(r.opened)}</TableCell>
                <TableCell>
                  <Chip size="small" label={r.priority} color={color[r.priority]} variant="outlined" />
                </TableCell>
                <TableCell>{r.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
