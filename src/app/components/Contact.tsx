'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormStatus {
  loading: boolean;
  success: boolean;
  error: string | null;
}

const Contact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    loading: false,
    success: false,
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus({ loading: true, success: false, error: null });

    try {
      console.log('Sending form data:', formData);
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log('Response from server:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setFormStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', message: '' }); // Reset form
    } catch (error) {
      console.error('Error submitting form:', error);
      
      let errorMessage = 'Failed to send message. Please try again later.';
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      setFormStatus({
        loading: false,
        success: false,
        error: errorMessage,
      });
    }
  };

  const socialLinks = [
    { 
      icon: <FaGithub />, 
      href: 'https://github.com/nileshgithub74', 
      label: 'GitHub',
      color: 'hover:text-gray-800 dark:hover:text-gray-100'
    },
    { 
      icon: <FaLinkedin />, 
      href: 'https://linkedin.com/in/nilesh-kumar-74w', 
      label: 'LinkedIn',
      color: 'hover:text-blue-600 dark:hover:text-blue-400'
    },
    { 
      icon: <FaTwitter />, 
      href: 'https://twitter.com/nileshkumar74', 
      label: 'Twitter',
      color: 'hover:text-blue-400 dark:hover:text-blue-300'
    },
  ];

  return (
    <section id="contact" className="relative py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-300 dark:bg-teal-800 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 dark:bg-indigo-800 rounded-full filter blur-3xl opacity-20" />
      </div>

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
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Let&apos;s discuss your project and how I can help you achieve your goals
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-2xl text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Email</h4>
                    <a href="mailto:nileshsreyansh62@gmail.com" className="text-gray-700 dark:text-gray-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
                      nileshsreyansh62@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-2xl text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Phone</h4>
                    <p className="text-gray-700 dark:text-gray-300">+91-123456789</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-2xl text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">Location</h4>
                    <p className="text-gray-700 dark:text-gray-300">India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Connect with Me</h3>
              <div className="flex flex-wrap gap-6">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 text-gray-700 dark:text-gray-300 ${link.color} transition-colors duration-300 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/70 dark:hover:bg-gray-800/70`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                    required
                    disabled={formStatus.loading}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                    required
                    disabled={formStatus.loading}
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/10 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-white placeholder-gray-400"
                    required
                    disabled={formStatus.loading}
                  />
                </div>

                {/* Status Messages */}
                {formStatus.error && (
                  <div className="p-4 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg">
                    {formStatus.error}
                  </div>
                )}
                {formStatus.success && (
                  <div className="p-4 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg">
                    Message sent successfully! I&apos;ll get back to you soon.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formStatus.loading}
                  className={`w-full px-6 py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                    formStatus.loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-teal-600 hover:to-indigo-600'
                  }`}
                >
                  {formStatus.loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact; 