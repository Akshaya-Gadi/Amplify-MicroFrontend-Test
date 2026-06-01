import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import GavelIcon from '@mui/icons-material/Gavel';
import { Button } from '@mfe/design-system';
import { useEventListener } from '@mfe/shared-utils';

function StatCard({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="overline" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" sx={{ fontWeight: 700, my: 0.5 }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {hint}
      </Typography>
    </Paper>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const [lastInvoiceEvent, setLastInvoiceEvent] = useState<string>('none yet');

  // The shell can also observe domain events from any module.
  useEventListener('invoice-updated', (p) =>
    setLastInvoiceEvent(`Invoice ${p.invoiceId} → $${p.amount}`),
  );

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Welcome back 👋
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Operational overview across all enterprise modules.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Open Invoices" value="128" hint="+12 this week" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Pending Claims" value="42" hint="6 high priority" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Revenue (MTD)" value="$1.2M" hint="+8% vs last month" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Last invoice event" value="•" hint={lastInvoiceEvent} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <ReceiptLongIcon color="primary" />
              <Typography variant="h6">Billing</Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Manage invoices and review billing history. Loaded as an independent remote.
            </Typography>
            <Button onClick={() => navigate('/billing')}>Open Billing</Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={1.5} alignItems="center" sx={{ mb: 1 }}>
              <GavelIcon color="secondary" />
              <Typography variant="h6">Claims</Typography>
            </Stack>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Triage open claims and adjudication queues. Loaded as an independent remote.
            </Typography>
            <Button color="secondary" onClick={() => navigate('/claims')}>
              Open Claims
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
