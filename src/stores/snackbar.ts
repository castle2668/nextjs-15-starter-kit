import { create } from 'zustand'

interface SnackbarState {
  open: boolean
  message: string
  severity: 'success' | 'error' | 'warning' | 'info'
  showSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'warning' | 'info'
  ) => void
  hideSnackbar: () => void
}

export const useSnackbarStore = create<SnackbarState>()(set => ({
  open: false,
  message: '',
  severity: 'info',
  showSnackbar: (message, severity) => set({ open: true, message, severity }),
  hideSnackbar: () => set({ open: false, message: '', severity: 'info' }),
}))
