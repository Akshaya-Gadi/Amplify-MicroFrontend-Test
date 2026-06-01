import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Chip from '@mui/material/Chip';
import { formatCurrency, formatDate } from '@mfe/shared-utils';

const rows = [
  { id: 'INV-2042', date: '2026-05-28', amount: 1850, status: 'Paid' },
  { id: 'INV-2041', date: '2026-05-14', amount: 920, status: 'Paid' },
  { id: 'INV-2040', date: '2026-04-30', amount: 3120, status: 'Overdue' },
  { id: 'INV-2039', date: '2026-04-12', amount: 540, status: 'Pending' },
];

const color: Record<string, 'success' | 'warning' | 'error'> = {
  Paid: 'success',
  Pending: 'warning',
  Overdue: 'error',
};

export function BillingHistory() {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Billing History
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Route: <code>/billing/history</code>
      </Typography>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Invoice</TableCell>
              <TableCell>Date</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.id} hover>
                <TableCell>{r.id}</TableCell>
                <TableCell>{formatDate(r.date)}</TableCell>
                <TableCell align="right">{formatCurrency(r.amount)}</TableCell>
                <TableCell>
                  <Chip size="small" label={r.status} color={color[r.status]} variant="outlined" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
