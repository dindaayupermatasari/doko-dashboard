import { useState } from 'react';
import { Bell, User, Menu, Sun, Moon, LogOut, Settings, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout: () => void;
}

export function Header({ onToggleSidebar, isSidebarOpen, isDarkMode, onToggleDarkMode, onLogout }: HeaderProps) {
  return (
    <header className="bg-white dark:bg-[#242424] border-b border-gray-200 dark:border-white/10 px-6 py-4 shadow-sm sticky top-0 z-30">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onToggleSidebar}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a2e23] rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600 dark:text-[#e5e5e5]" />
          </button>
          <div>
            <p className="text-sm text-gray-500 dark:text-[#a3a3a3]">Selamat Datang Kembali,</p>
            <h3 className="text-[#2d5f3f] dark:text-[#b88746]">Admin</h3>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={onToggleDarkMode}
            className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a2e23] rounded-xl transition-colors"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-[#d4a373]" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>

          {/* Notifications */}
          <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-[#1a2e23] rounded-xl transition-colors relative">
            <Bell className="w-5 h-5 text-gray-600 dark:text-[#e5e5e5]" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-[#242424]"></span>
          </button>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="ml-2 flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-[#1a2e23] px-3 py-1.5 rounded-xl transition-colors">
                <div className="w-10 h-10 bg-gradient-to-br from-[#2d5f3f] to-[#4a7c59] dark:from-[#b88746] dark:to-[#d4a373] rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="text-sm text-left">
                  <p className="text-gray-900 dark:text-[#e5e5e5]">Admin</p>
                  <p className="text-xs text-gray-500 dark:text-[#a3a3a3]">Administrator</p>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500 dark:text-[#a3a3a3]" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                <span>Profil</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Pengaturan</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                className="cursor-pointer text-red-600 focus:text-red-600"
                onClick={onLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
