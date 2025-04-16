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

async function fetchWithTimeout(url: string, retries = 2, timeout = 5000) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, { 
        signal: controller.signal,
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-App',
          ...(GITHUB_TOKEN && { 'Authorization': `Bearer ${GITHUB_TOKEN}` })
        }
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
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
    // Fetch user repositories
    const repos = await fetchWithTimeout(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`
    ) as GitHubRepo[];

    // Fetch user events
    const events = await fetchWithTimeout(
      `https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`
    ) as GitHubEvent[];

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
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
} 