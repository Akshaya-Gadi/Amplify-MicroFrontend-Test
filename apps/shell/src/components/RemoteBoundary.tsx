import { Component, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from '@mfe/design-system';

interface Props {
  name: string;
  children: ReactNode;
}
interface State {
  hasError: boolean;
}

/**
 * Isolates a remote so that a failed network fetch of remoteEntry.js (e.g. the
 * remote is down or mid-deploy) does not crash the whole shell.
 */
export class RemoteBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  static Loading({ name }: { name: string }) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 4 }}>
        <CircularProgress size={22} />
        <Typography color="text.secondary">Loading {name} module…</Typography>
      </Box>
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" gutterBottom>
            {this.props.name} module is unavailable
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 2 }}>
            The remote could not be loaded. It may be deploying or offline.
          </Typography>
          <Button onClick={() => this.setState({ hasError: false })}>Retry</Button>
        </Paper>
      );
    }
    return this.props.children;
  }
}
