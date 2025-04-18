'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Only show the UI after first mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // If not mounted, return a placeholder to avoid hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/20 dark:border-gray-800/20 shadow-lg">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex items-center justify-center h-16 sm:h-20">
              {/* Placeholder content */}
            </div>
          </div>
        </nav>
        <main className="pt-20">{children}</main>
      </div>
    );
  }

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
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/20 dark:border-gray-800/20 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center h-16 sm:h-20">
            <Link href="/" className="absolute left-4 sm:left-6 flex items-center text-lg sm:text-xl font-bold">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mr-2 shadow-md">
                <span className="text-white font-bold">N</span>
              </div>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 dark:hover:from-indigo-300 dark:hover:via-purple-300 dark:hover:to-pink-300 transition-all duration-300">Nilesh</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full px-2 py-1 shadow-md">
              <Link
                href="/#hero"
                className={`relative text-base font-semibold px-5 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300 ${
                  pathname === '/' ? 'text-indigo-600 dark:text-indigo-300 bg-white/80 dark:bg-gray-700/80 shadow-sm' : ''
                }`}
                scroll={true}
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="relative text-base font-semibold px-5 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300"
                scroll={true}
              >
                About
              </Link>
              <Link
                href="/#projects"
                className="relative text-base font-semibold px-5 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300"
                scroll={true}
              >
                Projects
              </Link>
              <Link
                href="/#contact"
                className="relative text-base font-semibold px-5 py-2 rounded-full text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300"
                scroll={true}
              >
                Contact
              </Link>
            </div>

            {/* Right Side Elements */}
            <div className="absolute right-4 sm:right-6 flex items-center space-x-4">
              {/* Social Links - Desktop */}
              <div className="hidden md:flex items-center space-x-3">
                <a href="https://github.com/nileshgithub74" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-300">
                  <FaGithub className="text-lg" />
                </a>
                <a href="https://linkedin.com/in/nilesh-kumar-74w" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-300">
                  <FaLinkedin className="text-lg" />
                </a>
                <a href="https://x.com/nileshkumar74" target="_blank" rel="noopener noreferrer" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-300">
                  <FaTwitter className="text-lg" />
                </a>
              </div>
              
              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-gray-700 dark:text-gray-200 focus:outline-none hover:text-indigo-600 dark:hover:text-indigo-300 transition-colors duration-300 p-2"
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
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
          </div>

          {/* Mobile Navigation */}
          <div
            className={`md:hidden ${
              isMenuOpen ? 'block' : 'hidden'
            } py-3 space-y-2 border-t border-gray-200 dark:border-gray-800`}
          >
            <Link
              href="/#hero"
              className={`block text-base font-medium px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-indigo-500 dark:hover:text-indigo-300 transition-colors duration-300 ${
                pathname === '/' ? 'text-indigo-500 dark:text-indigo-300 bg-gray-100 dark:bg-gray-800/50 rounded-lg' : ''
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