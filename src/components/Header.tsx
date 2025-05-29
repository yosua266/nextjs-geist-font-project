"use client"

import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-black">
            DongPlay
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-600 hover:text-black">
              Beranda
            </Link>
            <Link href="/donghua" className="text-gray-600 hover:text-black">
              Donghua
            </Link>
            <Link href="/bookmark" className="text-gray-600 hover:text-black">
              Bookmark
            </Link>
            <Link href="/jadwal" className="text-gray-600 hover:text-black">
              Jadwal
            </Link>
            <Link href="/random" className="text-gray-600 hover:text-black">
              Acak!
            </Link>
          </div>

          {/* Mobile Navigation Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Beranda
              </Link>
              <Link 
                href="/donghua" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Donghua
              </Link>
              <Link 
                href="/bookmark" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Bookmark
              </Link>
              <Link 
                href="/jadwal" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Jadwal
              </Link>
              <Link 
                href="/random" 
                className="text-gray-600 hover:text-black"
                onClick={() => setIsOpen(false)}
              >
                Acak!
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
