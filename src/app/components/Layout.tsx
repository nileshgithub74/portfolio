'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Lighting Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-1/2 left-1/2 w-[1000px] h-[1000px] bg-gradient-to-r from-violet-500/20 via-purple-500/20 to-fuchsia-500/20 rounded-full blur-3xl transform -translate-x-1/2" />
        <div className="absolute top-1/2 -right-1/4 w-[800px] h-[800px] bg-gradient-to-r from-teal-500/20 via-cyan-500/20 to-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] bg-gradient-to-r from-rose-500/20 via-pink-500/20 to-fuchsia-500/20 rounded-full blur-3xl" />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Top Left Light */}
        <motion.div
          className="absolute -top-40 -left-40 w-80 h-80 bg-teal-300 dark:bg-teal-800 rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Top Right Light */}
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-800 rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Bottom Left Light */}
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 dark:bg-pink-800 rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Bottom Right Light */}
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-800 rounded-full filter blur-3xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Center Light */}
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 dark:from-indigo-800 dark:via-purple-800 dark:to-pink-800 rounded-full filter blur-3xl opacity-10"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 dark:hover:from-indigo-300 dark:hover:via-purple-300 dark:hover:to-pink-300 transition-all duration-300">
              Nilesh
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/#hero"
                className={`relative text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ${
                  pathname === '/' ? 'text-indigo-500 dark:text-indigo-300' : ''
                }`}
                scroll={true}
              >
                Home
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 dark:bg-indigo-300 transform transition-transform duration-300 ${
                  pathname === '/' ? 'scale-x-100' : 'scale-x-0'
                }`} />
              </Link>
              <Link
                href="/#about"
                className="relative text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 group"
                scroll={true}
              >
                About
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 dark:bg-indigo-300 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              <Link
                href="/#projects"
                className="relative text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 group"
                scroll={true}
              >
                Projects
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 dark:bg-indigo-300 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
              <Link
                href="/#contact"
                className="relative text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 group"
                scroll={true}
              >
                Contact
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 dark:bg-indigo-300 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden ${
              isMenuOpen ? 'block' : 'hidden'
            } py-4 space-y-4`}
          >
            <Link
              href="/#hero"
              className={`block text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ${
                pathname === '/' ? 'text-indigo-500 dark:text-indigo-300' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
              scroll={true}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="block text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
              scroll={true}
            >
              About
            </Link>
            <Link
              href="/#projects"
              className="block text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
              scroll={true}
            >
              Projects
            </Link>
            <Link
              href="/#contact"
              className="block text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300"
              onClick={() => setIsMenuOpen(false)}
              scroll={true}
            >
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">{children}</main>
    </div>
  );
};

export default Layout; 