'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaCode, FaServer, FaDatabase, FaLaptopCode, FaTools, FaRocket, FaGithub, FaStar, FaCodeBranch } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface Skill {
  icon: React.ReactNode;
  title: string;
  description: string;
  level: number;
  stats?: {
    repos: number;
    stars: number;
    commits: number;
  };
}

const About = () => {
  const [showAll, setShowAll] = useState(false);
  const [skills, setSkills] = useState<Skill[]>([
    { 
      icon: <FaCode className="text-2xl" />, 
      title: "Frontend Development", 
      description: "React, Next.js, TypeScript, Tailwind CSS",
      level: 0,
      stats: { repos: 0, stars: 0, commits: 0 }
    },
    { 
      icon: <FaServer className="text-2xl" />, 
      title: "Backend Development", 
      description: "Node.js, Express, Python, Django",
      level: 0,
      stats: { repos: 0, stars: 0, commits: 0 }
    },
    { 
      icon: <FaTools className="text-2xl" />, 
      title: "DevOps & DSA", 
      description: "Docker, Kubernetes, AWS, Algorithms, Data Structures",
      level: 0,
      stats: { repos: 0, stars: 0, commits: 0 }
    },
    { 
      icon: <FaLaptopCode className="text-2xl" />, 
      title: "Programming", 
      description: "JavaScript, Python, Java, C++",
      level: 0,
      stats: { repos: 0, stars: 0, commits: 0 }
    },
    { 
      icon: <FaDatabase className="text-2xl" />, 
      title: "Database", 
      description: "MongoDB, PostgreSQL, MySQL",
      level: 0,
      stats: { repos: 0, stars: 0, commits: 0 }
    },
    { 
      icon: <FaRocket className="text-2xl" />, 
      title: "Other Skills", 
      description: "Git, REST APIs, GraphQL, Testing",
      level: 0,
      stats: { repos: 0, stars: 0, commits: 0 }
    }
  ]);

  const [githubStats, setGithubStats] = useState({
    totalRepos: 0,
    totalStars: 0,
    totalCommits: 0
  });

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        // Fetch user repositories with topics
        const reposResponse = await fetch('https://api.github.com/users/nileshgithub74/repos?per_page=100');
        const repos = await reposResponse.json();

        // Fetch user events for commit count
        const eventsResponse = await fetch('https://api.github.com/users/nileshgithub74/events?per_page=100');
        const events = await eventsResponse.json();

        // Fetch user's starred repositories
        const starsResponse = await fetch('https://api.github.com/users/nileshgithub74/starred?per_page=100');
        const starredRepos = await starsResponse.json();

        // Calculate total stats
        const totalStars = repos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);
        const totalCommits = events.filter((event: any) => event.type === 'PushEvent').length;
        const totalContributions = events.filter((event: any) => 
          ['PushEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)
        ).length;

        setGithubStats({
          totalRepos: repos.length,
          totalStars,
          totalCommits: totalContributions
        });

        // Calculate skill levels based on repository data
        const updatedSkills = skills.map(skill => {
          let level = 0;
          let skillStats = { repos: 0, stars: 0, commits: 0 };
          
          // Count repositories and commits for each skill
          const relevantRepos = repos.filter((repo: any) => {
            const repoName = repo.name.toLowerCase();
            const repoDescription = (repo.description || '').toLowerCase();
            const repoTopics = (repo.topics || []).map((t: string) => t.toLowerCase());
            const repoLanguage = (repo.language || '').toLowerCase();
            
            if (skill.title === "Frontend Development") {
              return repoName.includes('react') || 
                     repoName.includes('next') || 
                     repoName.includes('frontend') ||
                     repoDescription.includes('react') ||
                     repoDescription.includes('next') ||
                     repoDescription.includes('frontend') ||
                     repoTopics.includes('react') ||
                     repoTopics.includes('nextjs') ||
                     repoTopics.includes('frontend') ||
                     repoLanguage === 'javascript' ||
                     repoLanguage === 'typescript' ||
                     repoLanguage === 'html' ||
                     repoLanguage === 'css';
            } else if (skill.title === "Backend Development") {
              return repoName.includes('node') || 
                     repoName.includes('express') || 
                     repoName.includes('python') ||
                     repoName.includes('django') ||
                     repoDescription.includes('node') ||
                     repoDescription.includes('express') ||
                     repoDescription.includes('python') ||
                     repoDescription.includes('django') ||
                     repoTopics.includes('nodejs') ||
                     repoTopics.includes('express') ||
                     repoTopics.includes('python') ||
                     repoTopics.includes('django') ||
                     repoLanguage === 'python' ||
                     repoLanguage === 'javascript' ||
                     repoLanguage === 'typescript';
            } else if (skill.title === "Database") {
              return repoName.includes('mongodb') || 
                     repoName.includes('postgres') || 
                     repoName.includes('mysql') ||
                     repoDescription.includes('mongodb') ||
                     repoDescription.includes('postgres') ||
                     repoDescription.includes('mysql') ||
                     repoTopics.includes('mongodb') ||
                     repoTopics.includes('postgresql') ||
                     repoTopics.includes('mysql') ||
                     repoLanguage === 'sql';
            } else if (skill.title === "Programming") {
              return repoName.includes('javascript') || 
                     repoName.includes('python') || 
                     repoName.includes('java') ||
                     repoName.includes('cpp') ||
                     repoDescription.includes('javascript') ||
                     repoDescription.includes('python') ||
                     repoDescription.includes('java') ||
                     repoDescription.includes('cpp') ||
                     repoTopics.includes('javascript') ||
                     repoTopics.includes('python') ||
                     repoTopics.includes('java') ||
                     repoTopics.includes('cpp') ||
                     repoLanguage === 'javascript' ||
                     repoLanguage === 'python' ||
                     repoLanguage === 'java' ||
                     repoLanguage === 'cpp';
            } else if (skill.title === "DevOps & DSA") {
              return repoName.includes('docker') || 
                     repoName.includes('kubernetes') || 
                     repoName.includes('aws') ||
                     repoName.includes('algorithm') ||
                     repoName.includes('dsa') ||
                     repoDescription.includes('docker') ||
                     repoDescription.includes('kubernetes') ||
                     repoDescription.includes('aws') ||
                     repoDescription.includes('algorithm') ||
                     repoDescription.includes('dsa') ||
                     repoTopics.includes('docker') ||
                     repoTopics.includes('kubernetes') ||
                     repoTopics.includes('aws') ||
                     repoTopics.includes('algorithm') ||
                     repoTopics.includes('dsa');
            } else if (skill.title === "Other Skills") {
              return repoName.includes('api') || 
                     repoName.includes('graphql') || 
                     repoDescription.includes('api') ||
                     repoDescription.includes('graphql') ||
                     repoTopics.includes('api') ||
                     repoTopics.includes('graphql') ||
                     repoTopics.includes('rest') ||
                     repoTopics.includes('graphql-api');
            }
            return false;
          });

          // Calculate stats for this skill
          const skillCommits = events.filter((event: any) => 
            relevantRepos.some((repo: any) => repo.name === event.repo.name)
          ).length;

          skillStats = {
            repos: relevantRepos.length,
            stars: relevantRepos.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0),
            commits: skillCommits
          };

          // Calculate level based on multiple factors
          if (relevantRepos.length > 0) {
            const repoFactor = Math.min(1, relevantRepos.length / 5);
            const starFactor = Math.min(1, skillStats.stars / 10);
            const commitFactor = Math.min(1, skillStats.commits / 50);
            const contributionFactor = Math.min(1, totalContributions / 100);
            
            level = Math.min(95, Math.max(70, 
              (repoFactor * 0.3 + 
               starFactor * 0.2 + 
               commitFactor * 0.3 + 
               contributionFactor * 0.2) * 100
            ));
          }

          return { ...skill, level, stats: skillStats };
        });

        setSkills(updatedSkills);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        // Fallback to default levels if API fails
        setSkills([
          { ...skills[0], level: 85, stats: { repos: 5, stars: 10, commits: 50 } },
          { ...skills[1], level: 80, stats: { repos: 4, stars: 8, commits: 40 } },
          { ...skills[2], level: 75, stats: { repos: 3, stars: 5, commits: 30 } },
          { ...skills[3], level: 80, stats: { repos: 4, stars: 7, commits: 35 } },
          { ...skills[4], level: 75, stats: { repos: 3, stars: 5, commits: 25 } },
          { ...skills[5], level: 80, stats: { repos: 4, stars: 6, commits: 30 } }
        ]);
      }
    };

    fetchGitHubStats();
  }, []);

  const displayedSkills = showAll ? skills : skills.slice(0, 4);

  return (
    <section id="about" className="relative">
      {/* Background Lighting Effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
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
              About Me
            </span>
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Get to know more about my background and expertise
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Profile Image */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-square max-w-[24rem] mx-auto rounded-3xl overflow-hidden shadow-2xl group">
                <Image
                  src="/profile.jpg"
                  alt="About Me"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full opacity-20 blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-2xl" />
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white">My Skills & Expertise</h3>
                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <FaGithub className="text-lg" />
                    {githubStats.totalRepos} Repos
                  </span>
                  <span className="flex items-center gap-1">
                    <FaStar className="text-lg" />
                    {githubStats.totalStars} Stars
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCodeBranch className="text-lg" />
                    {githubStats.totalCommits} Commits
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {displayedSkills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative flex flex-col gap-4 p-4 rounded-xl hover:bg-white/20 dark:hover:bg-gray-700/20 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 dark:from-teal-500/5 dark:to-indigo-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                        {skill.icon}
                      </div>
                      <div className="relative z-10">
                        <h4 className="font-semibold text-gray-800 dark:text-white group-hover:text-teal-500 dark:group-hover:text-teal-400 transition-colors duration-300">{skill.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{skill.description}</p>
                      </div>
                    </div>

                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                        <span>Proficiency</span>
                        <span>{skill.level}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="h-full bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                      <span className="flex items-center gap-1">
                        <FaGithub className="text-sm" />
                        {skill.stats?.repos || 0} repos
                      </span>
                      <span className="flex items-center gap-1">
                        <FaStar className="text-sm" />
                        {skill.stats?.stars || 0} stars
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCodeBranch className="text-sm" />
                        {skill.stats?.commits || 0} commits
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {skills.length > 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mt-8"
                >
                  <button
                    onClick={() => setShowAll(!showAll)}
                    className="px-6 py-3 bg-gradient-to-r from-teal-600 to-indigo-600 hover:from-teal-700 hover:to-indigo-700 text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    {showAll ? 'Show Less' : 'View More Skills'}
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Row - Who Am I and My Approach */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Who Am I?</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              I'm a passionate Full Stack Developer with a strong focus on creating modern, user-friendly web applications. 
              With expertise in both frontend and backend technologies, I bring ideas to life through clean, efficient code.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              My journey in web development started with a curiosity for how things work on the internet, 
              and it has evolved into a deep passion for creating digital experiences that make a difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-8 rounded-3xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">My Approach</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <FaCode className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Clean Code</h4>
                  <p className="text-gray-600 dark:text-gray-400">Focus on writing clean, maintainable code following best practices and design patterns</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <FaTools className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">User-Centric</h4>
                  <p className="text-gray-600 dark:text-gray-400">Design and develop with the end-user in mind, ensuring intuitive and engaging experiences</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <FaRocket className="text-xl" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">Continuous Learning</h4>
                  <p className="text-gray-600 dark:text-gray-400">Stay updated with the latest technologies and industry trends to deliver cutting-edge solutions</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 