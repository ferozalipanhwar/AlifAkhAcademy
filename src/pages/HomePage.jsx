import { useEffect } from 'react';
import AboutUs from '../components/About/AboutUs';
import BlogSection from '../components/Blog/BlogSection';
import ContactSection from '../components/Contact/ContactSection';
import CoursesSection from '../components/Courses/CoursesSection';
import EducationSection from '../components/education/EducationSection';
import FeaturesSection from '../components/Feature/FeatureSection';
import Footer from '../components/Footer/Footer';
import Home from '../components/home/Home';
import Navbar from '../components/navbar/Navbar';
import ProgramSection from '../components/program/ProgramSection';
import TeachersSection from '../components/Teachers/TeachersSection';
import TestimonialsSection from '../components/Testimonials/TestimonialsSection';
 
export default function HomePage() {
  // Scroll to hash if page loaded with #id
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Home />
      <EducationSection id="education" />
      <FeaturesSection id="features" />
      <CoursesSection id="courses" />
      <ProgramSection id="program" />
      <TeachersSection id="teachers" />
      <TestimonialsSection id="testimonials" />
      <BlogSection id="blog" />
      <ContactSection id="contact" />
      <AboutUs id="about" />
      <Footer />
    </>
  );
}
