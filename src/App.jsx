
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import AboutUs from './components/About/AboutUs'
import Blogs from './components/Admin/Courses/Blogs'
import Contacts from './components/Admin/Courses/Contacts'
import CourseManager from './components/Admin/Courses/CourseManager'
import Students from './components/Admin/Courses/Students'
import Teachers from './components/Admin/Courses/Teachers'
import UsersList from './components/Admin/Courses/UsersList'
import BlogSection from './components/Blog/BlogSection'
import ContactSection from './components/Contact/ContactSection'
import CourseRoadmap from './components/Courses/CourseRoadmap'
import CoursesSection from './components/Courses/CoursesSection'
import EducationSection from './components/education/EducationSection'
import FeaturesSection from './components/Feature/FeatureSection'
import Footer from './components/Footer/Footer'
import Home from './components/home/Home'
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import Navbar from './components/navbar/Navbar'
import TeachersSection from './components/Teachers/TeachersSection'
import TestimonialsSection from './components/Testimonials/TestimonialsSection'
import PageNotFOund from './components/UniversalComponents/PageNotFound'
import AdminDashboard from './pages/AdminDashboard'
import BlogDetail from './pages/BlogDetail'
import CourseRegister from './pages/CourseRegister'

function App() {
  return (
    <>
      <Router basename="/AlifAkhAcademy">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <Home />
                <EducationSection />
                <FeaturesSection />
                <CoursesSection />
                <TeachersSection />
                <TestimonialsSection />
                <BlogSection />
                <ContactSection />
                <AboutUs />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/course-register" element={<><CourseRoadmap/><CourseRegister /> </>} />
          <Route path="/blogs" element={<BlogSection />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> 
          
             <Route path="/admin-dashboard" element={<AdminDashboard />}>
                 <Route path='courses' element={<CourseManager/>}/>
                 <Route path='teachers' element={<Teachers/>}/>
                 <Route path='students' element={<Students/>} />
                 <Route path='contacts' element={<Contacts/>} />
                 <Route path='blogs' element={<Blogs/>} />
                 <Route path='users' element={<UsersList/>} />
                 <Route path='*' element={<PageNotFOund/>} />
          
            </Route>
          <Route path="*" element={<PageNotFOund/>} />
        </Routes>
      </Router>
    </>
  );
}
export default App