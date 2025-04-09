'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')  // სახელი
  const [lastName, setLastName] = useState<string>('')    // გვარი
  const [username, setUsername] = useState<string>('')    // username
  const [location, setLocation] = useState<string>('')    // ადგილი
  const [jobTitle, setJobTitle] = useState<string>('')    // სამუშაო/სასწავლო ადგილი
  const [error, setError] = useState<string>('')

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('პაროლები არ ემთხვევა')
      return
    }

    // მომხმარებლის სრული ინფორმაცია
    const user = { 
      email, 
      password, 
      firstName, 
      lastName, 
      username, 
      location, 
      jobTitle 
    }

    // მომხმარებელი ინახება LocalStorage-ში
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('loggedIn', 'true')

    // რეგისტრაციის შემდეგ ლოგინის გვერდზე გადახვალთ
    router.push('/login')  // <- აქ არის გადატანა Login-თან
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f3f2ef] px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-4 shadow-md">
        <h1 className="mb-4 text-2xl font-semibold text-[#0a66c2] text-center">LinkedIn</h1>

        <form onSubmit={handleRegister} className="space-y-3">
          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm text-gray-700">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Location (Country, City)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block text-sm text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
              />
            </div>

            <div className="w-1/2">
              <label className="block text-sm text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full rounded border border-gray-300 px-3 py-1.5 text-sm focus:border-[#0a66c2] focus:outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            className="w-full rounded-full bg-[#0a66c2] px-4 py-2 text-white hover:bg-[#004182] transition"
          >
            Create Account
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          უკვე გაქვს ექაუნთი?{' '}
          <a href="/login" className="text-[#0a66c2] hover:underline">Sign in</a>
        </p>
      </div>
    </div>
  )
}
