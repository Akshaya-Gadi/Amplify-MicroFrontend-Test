import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { eventBus, type EventPayloadMap } from '@mfe/event-bus';

type Notification = EventPayloadMap['notification'];

/**
 * Listens to the shared event bus for `notification` events emitted by ANY
 * microfrontend and renders them as MUI snackbars. Mounted once in the shell.
 */
export function NotificationCenter() {
  const [queue, setQueue] = useState<Notification[]>([]);
  const [current, setCurrent] = useState<Notification | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return eventBus.on('notification', (n) => setQueue((q) => [...q, n]));
  }, []);

  useEffect(() => {
    if (!current && queue.length > 0) {
      setCurrent(queue[0]);
      setQueue((q) => q.slice(1));
      setOpen(true);
    }
  }, [queue, current]);

  return (
    <Snackbar
      key={current?.id}
      open={open}
      autoHideDuration={4000}
      onClose={(_, reason) => {
        if (reason !== 'clickaway') setOpen(false);
      }}
      onTransitionExited={() => setCurrent(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      {current ? (
        <Alert severity={current.severity} variant="filled" onClose={() => setOpen(false)} sx={{ width: '100%' }}>
          {current.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
}
