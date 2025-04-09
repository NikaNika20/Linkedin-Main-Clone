'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const Profile = () => {
  const [user, setUser] = useState<any>({})
  const [profilePic, setProfilePic] = useState<File | null>(null)
  const [coverPic, setCoverPic] = useState<File | null>(null)

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(storedUser)
  }, [])

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = (error) => reject(error)
    })
  }

  const saveChanges = async () => {
    const updatedUser = { ...user }

    if (profilePic) {
      updatedUser.profilePic = await fileToBase64(profilePic)
    }

    if (coverPic) {
      updatedUser.coverPic = await fileToBase64(coverPic)
    }

    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProfilePic(e.target.files[0])
    }
  }

  const handleCoverPicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCoverPic(e.target.files[0])
    }
  }

  return (
    <div className="flex flex-col gap-8 min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center gap-8 p-8">
        <div className="relative w-full">
          <img 
            src={user.coverPic || '/default-cover.jpg'} 
            alt="Cover" 
            className="w-full h-72 object-cover rounded-lg"
          />
          <input 
            type="file" 
            onChange={handleCoverPicChange} 
            className="absolute top-2 right-2 p-2 bg-white rounded-full opacity-70"
          />
        </div>

        <div className="relative w-32 h-32">
          <img 
            src={user.profilePic || '/default-profile.jpg'} 
            alt="Profile" 
            className="w-full h-full rounded-full object-cover border-4 border-white"
          />
          <input 
            type="file" 
            onChange={handleProfilePicChange} 
            className="absolute bottom-2 right-2 p-2 bg-white rounded-full opacity-70"
          />
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold">{user.firstName} {user.lastName}</h2>
          <p className="text-xl text-gray-600">{user.jobTitle}</p>
          <p className="text-md text-gray-500">{user.location}</p>
          <p className="text-lg text-gray-700">@{user.username}</p>
        </div>

        <button 
          onClick={saveChanges} 
          className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default Profile
