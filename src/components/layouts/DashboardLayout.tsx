'use client'

import CodeIcon from '@mui/icons-material/Code'
import DashboardIcon from '@mui/icons-material/Dashboard'
import ExtensionIcon from '@mui/icons-material/Extension'
import GitHubIcon from '@mui/icons-material/GitHub'
import IntegrationInstructionsIcon from '@mui/icons-material/IntegrationInstructions'
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks'
import SettingsIcon from '@mui/icons-material/Settings'
import TerminalIcon from '@mui/icons-material/Terminal'
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import { ReactNode } from 'react'

import { useAppSelector } from '@/lib/hooks'
import { cn } from '@/lib/utils'

import { Header } from './Header'
import { UserMenu } from './UserMenu'

const menuItems = [
  { text: 'Next.js Starter Kit', icon: <CodeIcon />, path: '/' },
  { text: '功能總覽', icon: <DashboardIcon />, path: '/overview' },
  { text: '專案設定', icon: <SettingsIcon />, path: '/settings' },
  { text: '套件管理', icon: <ExtensionIcon />, path: '/packages' },
  { text: 'API 文件', icon: <LibraryBooksIcon />, path: '/api-docs' },
  { text: '開發指南', icon: <TerminalIcon />, path: '/guide' },
  { text: 'Git 設定', icon: <GitHubIcon />, path: '/git' },
  {
    text: '整合教學',
    icon: <IntegrationInstructionsIcon />,
    path: '/integration',
  },
]

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-500 to-emerald-700">
      <div className="mx-auto flex min-h-screen max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex-1 rounded-lg bg-white/95 p-6 shadow-lg backdrop-blur-sm">
          {children}
        </div>
      </div>
    </div>
  )
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  const user = useAppSelector(state => state.auth.user)

  if (!user) {
    return <AuthLayout>{children}</AuthLayout>
  }

  return (
    <div className="h-screen bg-emerald-500">
      <div className="flex h-full p-4">
        <Drawer
          variant="permanent"
          className={cn(
            'w-[240px]',
            'h-full',
            '[&_.MuiDrawer-paper]:w-[240px] [&_.MuiDrawer-paper]:border-r-0',
            '[&_.MuiDrawer-paper]:relative [&_.MuiDrawer-paper]:bg-transparent'
          )}
        >
          <Box className="flex h-full flex-col rounded-lg bg-emerald-500 p-4 text-white">
            <Box className="mb-6 flex items-center text-xl font-bold">
              <CodeIcon className="mr-2" />
              Next.js Starter Kit
            </Box>

            <List className="flex-1 space-y-1">
              {menuItems.map(item => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton className="rounded-lg hover:bg-white/10">
                    <ListItemIcon className="min-w-0 text-white">
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} className="ml-3" />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>

            <div className="mt-auto border-t border-white/20 pt-4">
              <UserMenu />
            </div>
          </Box>
        </Drawer>

        <Box className="h-full flex-1 overflow-auto rounded-lg bg-gray-100 p-6">
          <Header />
          {children}
        </Box>
      </div>
    </div>
  )
}
