import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
import { useEventListener } from '@mfe/shared-utils';
import { notify } from '@mfe/event-bus';
import { formatCurrency, formatDate } from '@mfe/shared-utils';

export function ClaimsDashboard() {
  const [refreshedAt, setRefreshedAt] = useState<string | null>(null);
  const [linkedInvoice, setLinkedInvoice] = useState<{ id: string; amount: number } | null>(null);

  // Consumer side of the cross-module demo: Claims listens for invoice updates
  // emitted by Billing and "refreshes" its linked data.
  useEventListener('invoice-updated', (payload) => {
    setLinkedInvoice({ id: payload.invoiceId, amount: payload.amount });
    setRefreshedAt(payload.updatedAt);
    notify('info', `Claims refreshed: linked invoice ${payload.invoiceId} changed`);
  });

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Claims Dashboard
      </Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Independently deployed Claims microfrontend.
      </Typography>

      {refreshedAt && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Data refreshed at {formatDate(refreshedAt)} due to a Billing event.
        </Alert>
      )}

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Open Claims
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              42
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="overline" color="text.secondary">
              Linked invoice
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {linkedInvoice ? formatCurrency(linkedInvoice.amount) : '—'}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {linkedInvoice ? linkedInvoice.id : 'Waiting for Billing event'}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
