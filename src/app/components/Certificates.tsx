'use client';

import { motion } from 'framer-motion';
import { FaLaptopCode, FaCode, FaJava, FaRobot } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCertificates } from '@/lib/portfolioData';

const iconMap: Record<string, React.ReactElement> = {
  FaCode: <FaCode className="text-xl" />,
  FaLaptopCode: <FaLaptopCode className="text-xl" />,
  FaJava: <FaJava className="text-xl" />,
  FaRobot: <FaRobot className="text-xl" />,
};

// Client-side only component to prevent hydration errors
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) {
    return null;
  }
  
  return <>{children}</>;
};

const Certificates = () => {
  const [showAll, setShowAll] = useState(false);
  const certificatesData = getCertificates();
  const displayedCertificates = showAll ? certificatesData : certificatesData.slice(0, 4);

  return (
    <section id="certificates" className="py-20 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-6 md:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-indigo-600 to-purple-600 dark:from-teal-400 dark:via-indigo-400 dark:to-purple-400">
              Certifications
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Professional certifications that validate my expertise in various technologies
          </p>
        </motion.div>

        <ClientOnly>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedCertificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl flex items-center justify-center flex-shrink-0 text-white shadow-lg">
                    {iconMap[cert.icon] || <FaCode className="text-xl" />}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{cert.title}</h3>
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-400 mb-4">
                      <span className="font-medium">{cert.issuer}</span>
                      <span>•</span>
                      <span>{cert.date}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">{cert.description}</p>
                    <Link
                      href={cert.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                    >
                      View Certificate
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {certificatesData.length > 4 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mt-12"
            >
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {showAll ? 'Show Less' : 'View More Certificates'}
              </button>
            </motion.div>
          )}
        </ClientOnly>
      </div>
    </section>
  );
};

export default Certificates;
