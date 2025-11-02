
import './App.css'
import AboutUs from './components/About/AboutUs'
import BlogSection from './components/Blog/BlogSection'
import ContactSection from './components/Contact/ContactSection'
import CoursesSection from './components/Courses/CoursesSection'
import EducationSection from './components/education/EducationSection'
import FeaturesSection from './components/Feature/FeatureSection'
import Footer from './components/Footer/Footer'
import Home from './components/home/Home'
import Navbar from './components/navbar/Navbar'
import TeachersSection from './components/Teachers/TeachersSection'
import TestimonialsSection from './components/Testimonials/TestimonialsSection'
function App() {

  return (
    <>
      <Navbar />
      <Home />
      <EducationSection/>
      <FeaturesSection/>
      <CoursesSection/>
      <TeachersSection/>
      <TestimonialsSection/>
      <BlogSection/>
      <ContactSection/>
      <AboutUs/>
      <Footer/>
    </>
  )
}

export default App
