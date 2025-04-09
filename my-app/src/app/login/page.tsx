'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const storedUser = localStorage.getItem('user')
    if (!storedUser) {
      setError('მომხმარებელი არ მოიძებნა')
      return
    }

    const user = JSON.parse(storedUser)

    if (user.email !== email || user.password !== password) {
      setError('ელფოსტა ან პაროლი არასწორია')
      return
    }

    localStorage.setItem('loggedIn', 'true')
    router.push('/')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f2ef] px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-2xl font-semibold text-[#0a66c2] text-center">LinkedIn</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-[#0a66c2] px-4 py-2 text-white hover:bg-[#004182] transition"
          >
            Sign in
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          ჯერ არ გაქვს ექაუნთი?{' '}
          <a href="/register" className="text-[#0a66c2] hover:underline">Create account</a>
        </p>
      </div>
    </div>
  )
}
