import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type Severity = 'success' | 'error' | 'warning' | 'info'

interface SnackbarState {
  open: boolean
  message: string
  severity: Severity
}

const initialState: SnackbarState = {
  open: false,
  message: '',
  severity: 'info',
}

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; severity: Severity }>
    ) => {
      state.open = true
      state.message = action.payload.message
      state.severity = action.payload.severity
    },
    hideSnackbar: state => {
      state.open = false
      state.message = ''
      state.severity = 'info'
    },
  },
})

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer
