import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import authReducer from './features/auth/authSlice'
import snackbarReducer from './features/snackbar/snackbarSlice'
import themeReducer from './features/theme/themeSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme'], // 只持久化 auth 和 theme
}

const rootReducer = combineReducers({
  auth: authReducer,
  snackbar: snackbarReducer,
  theme: themeReducer,
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
