'use client';

import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    { icon: <FaGithub />, href: 'https://github.com/nileshgithub74', label: 'GitHub' },
    { icon: <FaLinkedin />, href: 'https://www.linkedin.com/in/nilesh-kumar-74w/', label: 'LinkedIn' },
    { icon: <FaTwitter />, href: 'https://x.com/nileshkumar74', label: 'Twitter' },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <p className="text-sm">
              © {currentYear} Nilesh Kumar. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300 hover:scale-110 transform"
                aria-label={link.label}
              >
                <span className="text-xl">{link.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 