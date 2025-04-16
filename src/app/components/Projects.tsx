'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

// Project type definition
interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: 'E-commerce Platform',
    description: 'A full-stack e-commerce platform with user authentication, product management, and payment integration.',
    image: '/images/ecommerce.png',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    link: 'https://ecommerce-react-2024-frontendss.vercel.app/',
    github: 'https://github.com/nileshgithub74/Ecommerce-react-2024',
    demo: 'https://ecommerce-react-2024-frontendss.vercel.app/'
  },
  {
    title: 'Video Conferencing App ',
    description: 'A collaborative task management application with real-time updates and team features.',
    image: '/images/vdieocallapp.png',
    tags: ['Next.js', 'Tyepscript', 'Tailwind CSS'],
    link: 'https://stream-flow-gules.vercel.app/',
    github: 'https://github.com/nileshgithub74/Backend-Project',
    demo: 'https://stream-flow-gules.vercel.app/'
  },
  {
    title: 'fearless-voice',
    description: 'FearlessVoice is an anonymous whistleblowing platform built on the Internet Computer (ICP) blockchain to enable secure and private reporting of misconduct, corruption, harassment, and abuse. .',
    image: '/images/fearlessvoice.png',
    tags: ['Next.js', 'TypeScript', 'Motoko'],
    link: 'https://phlrf-ayaaa-aaaai-atgjq-cai.icp0.io/',
    github: 'https://github.com/nileshgithub74/FearlessVoice-main',
    demo: 'https://phlrf-ayaaa-aaaai-atgjq-cai.icp0.io/'
  },
  {
    title: 'Weather Dashboard',
    description: 'A weather application with real-time data and 5-day forecast.',
    image: '/projects/weather.jpg',
    tags: ['React', 'OpenWeather API', 'Chart.js'],
    link: '/projects/weather',
    github: 'https://github.com/yourusername/weather-app',
    demo: 'https://weather-demo.com'
  },
  {
    title: 'Social Media Dashboard',
    description: 'Analytics dashboard for social media platforms with data visualization.',
    image: '/projects/social.jpg',
    tags: ['React', 'D3.js', 'Express', 'PostgreSQL'],
    link: '/projects/social-dashboard',
    github: 'https://github.com/yourusername/social-dashboard',
    demo: 'https://social-dashboard-demo.com'
  },
  {
    title: 'Recipe Finder',
    description: 'A recipe search application with filtering and favorite recipes feature.',
    image: '/projects/recipe.jpg',
    tags: ['Vue.js', 'Firebase', 'Spoonacular API'],
    link: '/projects/recipe-finder',
    github: 'https://github.com/yourusername/recipe-finder',
    demo: 'https://recipe-finder-demo.com'
  }
];

const Projects = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="relative py-20">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 -z-10" />
      
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
              Featured Projects
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            A selection of my recent work and projects
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group relative h-full"
              style={{ perspective: "1000px" }}
            >
              <motion.div
                className="relative w-full h-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg transition-all duration-500"
                style={{ transformStyle: "preserve-3d" }}
                whileHover={{ 
                  rotateY: 10,
                  rotateX: -5,
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300,
                  damping: 20
                }}
              >
                {/* Card Front */}
                <div className="relative h-full">
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      priority={index < 3}
                    />
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  
                  <div className="p-6">
                    <motion.h3 
                      className="text-2xl font-bold text-gray-800 dark:text-white mb-2"
                      whileHover={{ y: -5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      {project.title}
                    </motion.h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, tagIndex) => (
                        <motion.span
                          key={tagIndex}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          whileHover={{ 
                            scale: 1.1, 
                            y: -3,
                            backgroundColor: "rgba(99, 102, 241, 0.2)",
                            color: "rgb(99, 102, 241)"
                          }}
                          transition={{ type: "spring", stiffness: 500 }}
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4">
                      <Link
                        href={project.link}
                        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                      >
                        View Project
                        <svg
                          className="w-4 h-4 ml-2"
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
                      {project.github && (
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                          GitHub
                        </Link>
                      )}
                      {project.demo && (
                        <Link
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                        >
                          Live Demo
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* 3D Glow Effect */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ 
                    background: "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15), transparent 70%)",
                    opacity: 0
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
                
                {/* 3D Edge Highlight */}
                <motion.div 
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  style={{ 
                    boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.1)",
                    opacity: 0
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {projects.length > 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mt-12"
          >
            <motion.button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              {showAll ? 'Show Less' : 'View More Projects'}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects; 