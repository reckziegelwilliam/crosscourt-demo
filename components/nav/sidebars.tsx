import { UsersIcon, SettingsIcon } from '@/components/icons'
import { NavItem } from './nav-item'
import React from 'react'

export const LeftSidebar = () => {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 p-4 border-r bg-gray-100/40 dark:bg-gray-800/40">
        <nav className="flex-1 overflow-auto">
          <NavItem href="/">
            <UsersIcon className="h-4 w-4" />
            Users
          </NavItem>
          <NavItem href="/matches">
            Matches
          </NavItem>
          <NavItem href="/settings">
            <SettingsIcon className="h-4 w-4" />
            Settings
          </NavItem>
        </nav>
    </aside>
  )
}

export const RightSidebar = () => {
  return (
    <aside className="hidden lg:flex lg:flex-col w-64 p-4 border-l bg-gray-100/40 dark:bg-gray-800/40">
        <nav className="flex-1 overflow-auto">
          <NavItem href="/profile">
            Profile
          </NavItem>
          <NavItem href="/logout">
            Logout
          </NavItem>
        </nav>
    </aside>
  )
}