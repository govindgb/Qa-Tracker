'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [loadingRole, setLoadingRole] = useState<string | null>(null)

  const handleRoleClick = async (role: 'admin' | 'user') => {
    
    try {

        if(role === 'admin'){
          router.push(`/register?role=${role}`)
        } else if(role === 'user'){
          router.push(`/register?role=${role}`)
        }
      
    } catch (error) {
      console.error('Error checking role:', error)
    } finally {
      setLoadingRole(null)
    }
  }

  return (

    <div className="relative min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 overflow-hidden flex flex-col">
      {/* Blurred Background */}
      <div className="absolute inset-0 -z-10">
        <img
          src="/bg.png"
          alt="Background"
          className="w-full h-full object-cover opacity-30 blur-lg"
        />

        <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm" />
      </div>

      {/* Centered Header */}
      <header className="py-6 z-10 w-full text-center">
        <div className="inline-block relative group">
          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 tracking-tight drop-shadow-lg">
            QA Monitor
          </h1>
          <span className="absolute left-1/2 -bottom-2 transform -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:animate-pulse transition-all duration-300 rounded-full" />
        </div>
      </header>




      {/* Moved Welcome Title (OUTSIDE the box) */}
      <div className="z-10 mt-10 mb-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Welcome to <span className="text-blue-600">QA Monitor 👋</span>
        </h2>
      </div>

      {/* Centered Content Box */}
      <main className="flex-grow flex items-center justify-center px-4 z-10">
        <div className="w-full max-w-6xl bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]">

          {/* Left Content */}
          <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-8">
            <p className="text-lg text-gray-700 max-w-lg">
              ✨ Empower your QA team with seamless test case management, efficient collaboration, and real-time insights – all in one elegant platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center md:justify-start">
              <button
                onClick={() => handleRoleClick('admin')}
                className="w-full sm:w-auto text-xl bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={loadingRole === 'admin'}
              >
                👨‍💼 {loadingRole === 'admin' ? 'Loading...' : 'Admin'}
              </button>
              <button
                onClick={() => handleRoleClick('user')}
                className="w-full sm:w-auto text-xl bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white py-4 px-8 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={loadingRole === 'user'}
              >
                👩‍💻 {loadingRole === 'user' ? 'Loading...' : 'User'}
              </button>
            </div>
          </div>

          {/* Right-side Image */}
          <div className="flex-1 flex justify-center">
            <img
              src="front.jpeg"
              alt="QA Illustration"
              className="w-full max-w-lg h-auto object-contain rounded-xl shadow-xl"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-gray-500 z-10">
        © 2025 QA Monitor. Built for quality teams.
      </footer>
    </div>
  )

}
