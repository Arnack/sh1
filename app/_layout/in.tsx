'use client'

import React from 'react'
import { AuthProvider } from '../context/authContext'
import I18nProvider from './I18nProveder'

export default function InLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </AuthProvider>
    </>
  )
}
