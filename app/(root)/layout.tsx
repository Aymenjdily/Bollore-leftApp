"use client"

import { useState } from 'react'
import Sidebar from '@/components/Sidebar'
import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import { Loading } from '@/components/shared'
import { LoadingContextProvider } from '@/contexts/loadingContext'
import { DepartmentContextProvider } from '@/contexts/departmentContext'
import { DemandeContextProvider } from '@/contexts/demandesContext'
import { UsersContextProvider } from '@/contexts/usersContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <LoadingContextProvider>
        <DepartmentContextProvider>
          <DemandeContextProvider>
            <UsersContextProvider>
              <body className={`${inter.className} flex h-screen`} suppressHydrationWarning={true}>
                <Loading />
                <Sidebar />
                <main className='container px-10 py-6 mx-auto'>
                  <Navbar />
                  {children}
                </main>
              </body>
            </UsersContextProvider>
          </DemandeContextProvider>
        </DepartmentContextProvider>
      </LoadingContextProvider>
    </html>
  )
}
