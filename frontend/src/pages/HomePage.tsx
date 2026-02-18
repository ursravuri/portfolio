import { useEffect } from 'react';
import { Profile } from '../types';
import Hero from '../components/Hero';
import About from '../components/About';

interface HomePageProps {
  profile: Profile | null;
}

export default function HomePage({ profile }: HomePageProps) {
  useEffect(() => {
    document.title = 'Anil Kumar Ravuri | Sr. IT Systems Engineer';
  }, []);

  return (
    <>
      <Hero profile={profile} />
      <About profile={profile} />
    </>
  );
}
