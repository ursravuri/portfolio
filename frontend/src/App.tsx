import './styles/globals.css';
import { Routes, Route } from 'react-router-dom';
import { useProfile } from './hooks/useProfile';

import Cursor from './components/Cursor';
import Layout from './components/Layout';
import Loader from './components/Loader';

import HomePage from './pages/HomePage';
import CareerPage from './pages/CareerPage';
import ProjectsPage from './pages/ProjectsPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ResumePage from './pages/ResumePage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  const { profile, loading } = useProfile();

  if (loading) return <Loader />;

  return (
    <>
      <Cursor />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage profile={profile} />} />
          <Route path="career" element={<CareerPage profile={profile} />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<BlogPostPage />} />
          <Route path="resume" element={<ResumePage profile={profile} />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
