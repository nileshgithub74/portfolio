'use client';

import Link from 'next/link';
import { FaDownload, FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaCheck } from 'react-icons/fa';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const socialLinks = [
  { 
    icon: <FaGithub className="text-xl" />, 
    href: 'https://github.com/nileshgithub74', 
    label: 'GitHub',
    color: 'hover:text-gray-800 dark:hover:text-gray-100',
    isEmail: false
  },
  { 
    icon: <FaLinkedin className="text-xl" />, 
    href: 'https://linkedin.com/in/nilesh-kumar-74w', 
    label: 'LinkedIn',
    color: 'hover:text-blue-600 dark:hover:text-blue-400',
    isEmail: false
  },
  { 
    icon: <FaTwitter className="text-xl" />, 
    href: 'https://x.com/nileshkumar74', 
    label: 'Twitter',
    color: 'hover:text-blue-400 dark:hover:text-blue-300',
    isEmail: false
  },
  { 
    icon: <FaEnvelope className="text-xl" />, 
    href: 'kumarnilesh843127@gmail.com', 
    label: 'Email',
    color: 'hover:text-red-500 dark:hover:text-red-400',
    isEmail: true
  },
];

const Hero = () => {
  const [emailCopied, setEmailCopied] = useState(false);

  const handleEmailClick = (e: React.MouseEvent, email: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(email);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center justify-center gap-8">
          {/* Profile Image */}
          <motion.div 
            className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-indigo-600/30 shadow-2xl"
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.4,
              ease: [0.6, -0.05, 0.01, 0.99]
            }}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <Image
              src="/profile.jpg"
              alt="Nilesh Kumar"
              width={128}
              height={128}
              className="object-cover"
              priority
            />
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            />
          </motion.div>

          {/* Content */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl font-bold text-gray-800 dark:text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Hello, I am <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 dark:from-teal-400 dark:via-indigo-400 dark:to-purple-400">Nilesh Kumar</span>
            </motion.h1>
            <motion.h2 
              className="text-3xl md:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Full Stack Developer
            </motion.h2>
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              I build exceptional digital experiences with modern technologies.
              Let&apos;s create something amazing together.
            </motion.p>

            {/* Social Links */}
            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.isEmail ? '#' : link.href}
                  target={link.isEmail ? undefined : "_blank"}
                  rel={link.isEmail ? undefined : "noopener noreferrer"}
                  className={`text-gray-600 dark:text-gray-400 ${link.color} transition-colors duration-300 relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                  onClick={link.isEmail ? (e) => handleEmailClick(e, link.href) : undefined}
                >
                  {link.icon}
                  <span className="text-sm font-medium">{link.label}</span>
                  {link.isEmail && emailCopied && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap flex items-center gap-1"
                    >
                      <FaCheck className="text-xs" />
                      <span>Copied!</span>
                    </motion.div>
                  )}
                </motion.a>
              ))}
            </motion.div>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-700 via-pink-700 to-purple-700 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <Link
                  href="/#contact"
                  className="relative px-6 py-3 w-full sm:w-auto bg-gradient-to-r from-rose-700 via-pink-700 to-purple-700 text-white rounded-lg hover:from-rose-800 hover:via-pink-800 hover:to-purple-800 transition-all duration-300 flex items-center justify-center font-medium tracking-wide"
                  scroll={true}
                >
                  Get in Touch
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-700 via-teal-700 to-cyan-700 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <Link
                  href="/#projects"
                  className="relative px-6 py-3 w-full sm:w-auto bg-transparent border-2 border-emerald-700/50 text-gray-800 dark:text-white rounded-lg hover:bg-emerald-700/10 transition-all duration-300 flex items-center justify-center font-medium tracking-wide"
                  scroll={true}
                >
                  View My Work
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-700 via-purple-700 to-fuchsia-700 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                <a
                  href="/cv.pdf"
                  download="Nilesh_Kumar_CV.pdf"
                  className="relative px-6 py-3 w-full sm:w-auto bg-transparent border-2 border-violet-700/50 text-gray-800 dark:text-white rounded-lg hover:bg-violet-700/10 transition-all duration-300 flex items-center justify-center gap-2 font-medium tracking-wide"
                >
                  <FaDownload className="text-lg" />
                  Download CV
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
