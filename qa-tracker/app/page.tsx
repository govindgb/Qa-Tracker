'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [loadingRole, setLoadingRole] = useState<string | null>(null)

  const handleRoleClick = async (role: 'admin' | 'user') => {
    setLoadingRole(role)
    try {
      const res = await fetch(`/api/check-role-exists?role=${role}`)
      const data = await res.json()

      if (data.exists) {
        router.push(`/login?role=${role}`)
      } else {
        router.push(`/register?role=${role}`)
      }
    } catch (error) {
      console.error('Error checking role:', error)
    } finally {
      setLoadingRole(null)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 to-blue-100 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-10 max-w-md w-full text-center space-y-6">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to QA Monitor</h1>
        <p className="text-gray-600 text-lg">Choose your role to continue</p>

        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => handleRoleClick('admin')}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
            disabled={loadingRole === 'admin'}
          >
            {loadingRole === 'admin' ? 'Loading...' : 'Admin'}
          </button>
          <button
            onClick={() => handleRoleClick('user')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
            disabled={loadingRole === 'user'}
          >
            {loadingRole === 'user' ? 'Loading...' : 'User'}
          </button>
        </div>
      </div>
    </main>
  )
}
