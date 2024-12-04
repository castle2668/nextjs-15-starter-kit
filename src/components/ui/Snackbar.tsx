'use client'

import { useSnackbarStore } from '@/stores/snackbar'
import { Alert, Snackbar as MuiSnackbar } from '@mui/material'

export function Snackbar() {
  const { open, message, severity, hideSnackbar } = useSnackbarStore()

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={hideSnackbar}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert onClose={hideSnackbar} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
