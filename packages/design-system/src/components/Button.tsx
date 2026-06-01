import MuiButton, { type ButtonProps } from '@mui/material/Button';

/** Thin wrapper so every module renders buttons with the shared default variant. */
export function Button(props: ButtonProps) {
  return <MuiButton variant="contained" disableElevation {...props} />;
}
