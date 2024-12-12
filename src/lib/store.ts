import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import userReducer from '../features/auth/store/userSlice'
import snackbarReducer from '../features/snackbar/store/snackbarSlice'
import storage from './storage'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [''], // 只持久化某個 Slice
}

const rootReducer = combineReducers({
  user: userReducer,
  snackbar: snackbarReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
})

export const persistor = persistStore(store)

// 為 TypeScript 導出類型定義
export type RootState = ReturnType<typeof store.getState> // store 狀態的類型
export type AppDispatch = typeof store.dispatch // dispatch 方法的類型
