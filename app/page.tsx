'use client'

import type { NextPage } from 'next'
import { useAuth } from './context/authContext'
import { redirect } from 'next/navigation'

const Home: NextPage = () => {
  const { user } = useAuth();

  if (!user || !user.access_token) {
    redirect('/login')
  }

  return (
    <div>Welcome {JSON.stringify(user)}</div>
  )
}

export default Home