import { NextResponse } from 'next/server';

// Define interfaces for GitHub API responses
interface GitHubRepo {
  name: string;
  description: string | null;
  stargazers_count: number;
  topics: string[];
  language: string | null;
}

interface GitHubEvent {
  type: string;
  repo: {
    name: string;
  };
}

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || 'nileshgithub74';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Add a fallback data function to return when GitHub API fails
function getFallbackData() {
  return {
    totalRepos: 15,
    totalStars: 25,
    totalCommits: 120,
    repos: [
      {
        name: "portfolio",
        description: "My personal portfolio website",
        stargazers_count: 5,
        topics: ["react", "nextjs", "typescript"],
        language: "TypeScript"
      },
      {
        name: "frontend-project",
        description: "A frontend project with React",
        stargazers_count: 3,
        topics: ["react", "frontend"],
        language: "JavaScript"
      },
      {
        name: "backend-api",
        description: "A backend API with Node.js",
        stargazers_count: 4,
        topics: ["nodejs", "express", "api"],
        language: "JavaScript"
      },
      {
        name: "database-project",
        description: "A project using MongoDB",
        stargazers_count: 2,
        topics: ["mongodb", "database"],
        language: "JavaScript"
      },
      {
        name: "devops-tools",
        description: "DevOps tools and scripts",
        stargazers_count: 3,
        topics: ["docker", "kubernetes", "devops"],
        language: "Shell"
      }
    ],
    events: Array(30).fill(null).map((_, i) => ({
      type: "PushEvent",
      repo: {
        name: i % 5 === 0 ? "portfolio" : 
              i % 5 === 1 ? "frontend-project" : 
              i % 5 === 2 ? "backend-api" : 
              i % 5 === 3 ? "database-project" : "devops-tools"
      }
    }))
  };
}

async function fetchWithTimeout(url: string, retries = 2, timeout = 5000) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      // Log the token (first few characters) to verify it's being used
      console.log(`Using GitHub token: ${GITHUB_TOKEN ? GITHUB_TOKEN.substring(0, 10) + '...' : 'No token provided'}`);
      
      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
          ...(GITHUB_TOKEN && { 'Authorization': `token ${GITHUB_TOKEN}` })
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error(`GitHub API error: ${response.status} - ${response.statusText}`);
        if (response.status === 403) {
          console.warn('GitHub API rate limit exceeded or authentication failed. Using fallback data.');
          return null; // Return null to indicate we should use fallback data
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Attempt ${i + 1} failed for ${url}:`, error);
      if (i === retries) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
}

export async function GET() {
  try {
    console.log(`Fetching GitHub data for user: ${GITHUB_USERNAME}`);
    
    // Fetch user repositories
    const repos = await fetchWithTimeout(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
    ) as GitHubRepo[] | null;

    // If repos fetch failed, use fallback data
    if (!repos) {
      console.log('Using fallback GitHub data');
      return NextResponse.json(getFallbackData());
    }

    // Fetch user events
    const events = await fetchWithTimeout(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`
    ) as GitHubEvent[] | null;

    // If events fetch failed, use fallback data
    if (!events) {
      console.log('Using fallback GitHub data');
      return NextResponse.json(getFallbackData());
    }

    // Calculate total stats
    const totalStars = repos.reduce((acc: number, repo: GitHubRepo) => acc + repo.stargazers_count, 0);
    const totalContributions = events.filter((event: GitHubEvent) => 
      ['PushEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)
    ).length;

    // Return the data
    return NextResponse.json({
      totalRepos: repos.length,
      totalStars,
      totalCommits: totalContributions,
      repos,
      events
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    console.log('Using fallback GitHub data due to error');
    return NextResponse.json(getFallbackData());
  }
} 