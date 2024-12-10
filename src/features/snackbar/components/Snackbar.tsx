'use client'

import { Alert, Snackbar as MuiSnackbar } from '@mui/material'

import { hideSnackbar } from '@/features/snackbar/store/snackbarSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

export function Snackbar() {
  const dispatch = useAppDispatch()
  const { open, message, severity } = useAppSelector(state => state.snackbar)

  const handleClose = () => {
    dispatch(hideSnackbar())
  }

  return (
    <MuiSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </MuiSnackbar>
  )
}
