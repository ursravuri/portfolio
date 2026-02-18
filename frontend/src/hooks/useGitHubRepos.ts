import { useState, useEffect } from 'react';
import { GitHubRepo } from '../types';

const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'anilkumarravuri';

export function useGitHubRepos() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = sessionStorage.getItem('github_repos');
    if (cached) {
      setRepos(JSON.parse(cached));
      setLoading(false);
      return;
    }

    const fetchRepos = async () => {
      try {
        const res = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
        );
        if (!res.ok) throw new Error('GitHub API error');
        const data: GitHubRepo[] = await res.json();
        const filtered = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);
        setRepos(filtered);
        sessionStorage.setItem('github_repos', JSON.stringify(filtered));
      } catch {
        setError('Failed to load GitHub repos');
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, []);

  return { repos, loading, error };
}
