import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { User } from '../types'

interface UserState {
  user: User | null
}

const initialState: UserState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User }>) => {
      state.user = action.payload.user
    },
    clearUser: state => {
      state.user = null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
