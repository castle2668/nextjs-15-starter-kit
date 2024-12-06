'use client'

import { hideSnackbar } from '@/lib/features/snackbar/snackbarSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { Alert, Snackbar as MuiSnackbar } from '@mui/material'

export function Snackbar() {
  const dispatch = useAppDispatch()
  const { open, message, severity } = useAppSelector(state => state.snackbar)

  const handleClose = () => {
    dispatch(hideSnackbar())
  }

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
