import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { Button } from '@mfe/design-system';
import { eventBus, notify } from '@mfe/event-bus';
import { formatCurrency } from '@mfe/shared-utils';

export function BillingDashboard() {
  const [amount, setAmount] = useState(1850);

  // Communication example: Billing publishes a domain event that the Claims
  // module (and the shell) react to, plus a user-facing notification.
  const updateInvoice = () => {
    const next = amount + Math.round(Math.random() * 500);
    setAmount(next);
    eventBus.emit('invoice-updated', {
      invoiceId: 'INV-2042',
      amount: next,
      updatedAt: new Date().toISOString(),
    });
    notify('success', `Invoice INV-2042 updated to ${formatCurrency(next)}`);
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Billing Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Independently deployed Billing microfrontend.
      </Typography>

      <Grid container spacing={2.5}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Current invoice
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700, my: 0.5 }}>
              {formatCurrency(amount)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              INV-2042 · Acme Corp
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Cross-module demo
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Pressing the button emits an <code>invoice-updated</code> event on the shared event
              bus. The Claims module listens and refreshes its data.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              <Button onClick={updateInvoice}>Update invoice &amp; emit event</Button>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
