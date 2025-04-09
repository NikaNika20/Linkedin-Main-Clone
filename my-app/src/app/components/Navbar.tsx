import Image from 'next/image'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-300 py-4 shadow-md w-full">
      <div className="w-full mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 34 34" 
            width="30" 
            height="30" 
            fill="#0a66c2"
          >
            <path d="M34,17c0,9.4-7.6,17-17,17S0,26.4,0,17S7.6,0,17,0S34,7.6,34,17z M10.1,13.1H5.8v15.1h4.3V13.1z M8,11.4 c1.4,0,2.3-1,2.3-2.2c0-1.3-0.9-2.2-2.3-2.2C6.6,7,5.7,7.9,5.7,9.2C5.7,10.4,6.6,11.4,8,11.4z M28.2,20.1 c0-4.3-2.3-6.3-5.4-6.3c-2.5,0-3.6,1.4-4.2,2.4v-2h-4.3c0.1,1.3,0,15.1,0,15.1h4.3v-8.4c0-0.5,0-1.1,0.2-1.5 c0.4-1.1,1.2-2.2,2.6-2.2c1.8,0,2.5,1.7,2.5,4.1v8h4.3V20.1z"></path>
          </svg>
          <span className="text-xl font-semibold text-[#0a66c2]">LinkedIn</span>
        </div>

        <div className="flex-1 max-w-lg">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
          />
        </div>

        <div className="flex items-center space-x-6">
          <Link href="/" className="text-lg text-[#0a66c2] hover:text-[#004182]">
            Home
          </Link>
          <Link href="/profile" className="text-lg text-[#0a66c2] hover:text-[#004182]">
            Me
          </Link>
        </div>
      </div>
    </nav>
  )
}
