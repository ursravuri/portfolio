import { useEffect } from 'react';
import ContactSection from '../components/Contact';

export default function ContactPage() {
  useEffect(() => {
    document.title = 'Contact | Anil Kumar Ravuri';
  }, []);

  return (
    <div style={{ paddingTop: '5rem' }}>
      <ContactSection />
    </div>
  );
}
