import { useState, useEffect } from 'react';
import { Profile } from '../types';
import { profileApi } from './useApi';

interface UseProfileReturn {
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useProfile(): UseProfileReturn {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await profileApi.getProfile();
      setProfile(data);
    } catch (err) {
      setError('Failed to load profile. Using cached data.');
      // Fallback data so the site still works if API is down
      setProfile(FALLBACK_PROFILE);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  return { profile, loading, error, refetch: fetchProfile };
}

// Fallback in case API is unreachable
const FALLBACK_PROFILE: Profile = {
  name: "Anil Kumar Ravuri",
  title: "Sr. IT Systems Engineer",
  tagline: "IBM DataPower & API Connect Specialist",
  bio: [
    "Senior IT Systems Engineer with 7+ years of hands-on expertise in IBM DataPower Gateways and IBM API Connect.",
    "Specializing in designing, securing, and optimizing enterprise API infrastructure at scale.",
    "Currently leading API platform engineering at Florida Blue (BCBS Florida)."
  ],
  email: "anilkumar80459@gmail.com",
  phone: "(510) 298-7126",
  location: "Jacksonville, FL",
  available: true,
  skills: [],
  experience: [],
  education: []
};
