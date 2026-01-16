
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import AboutUs from './components/About/AboutUs'
import AdminStastics from './components/Admin/Courses/AdminStastics'
import Blogs from './components/Admin/Courses/Blogs'
import Contacts from './components/Admin/Courses/Contacts'
import CourseEnrollments from './components/Admin/Courses/CourseEnrollments'
import CourseManager from './components/Admin/Courses/CourseManager'
import ManageCategories from './components/Admin/Courses/ManageCategories'
import ManagePrep from './components/Admin/Courses/ManagePrep'
import ManageQuestions from './components/Admin/Courses/ManageQuestions'
import ManageTests from './components/Admin/Courses/ManageTests'
import Settings from './components/Admin/Courses/Settings'
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
import ProgramSection from './components/program/ProgramSection'
import TeachersSection from './components/Teachers/TeachersSection'
import TestimonialsSection from './components/Testimonials/TestimonialsSection'
import PageNotFOund from './components/UniversalComponents/PageNotFound'
import AdminDashboard from './pages/AdminDashboard'
import AiTutor from './pages/AiTutor'
import BlogDetail from './pages/BlogDetail'
import CourseRegister from './pages/CourseRegister'
import StartPreparationPage from './pages/prepTest/StartPreparationPage'
import Profile from './pages/Profile'
import MyResults from './pages/TakeTest/MyResults'
import TakeTest from './pages/TakeTest/TakeTest'
function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route
            path=""
            element={
              <>
            
                <Navbar />
                <Home />
                <EducationSection />
                <FeaturesSection />
                <CoursesSection />
                <ProgramSection />
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-tutor" element={<AiTutor />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="/view-certificate" element={<MyResults />} />
          <Route path="/prep-test" element={<StartPreparationPage />} />
          <Route path="/course-register" element={<><CourseRoadmap/><CourseRegister /> </>} />
          <Route path="/blogs" element={<BlogSection />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> 
          
             <Route path="/admin-dashboard" element={<AdminDashboard />}>
                  <Route index element={<AdminStastics />} />
                 <Route path='courses' element={<CourseManager/>}/>
                 <Route path='teachers' element={<Teachers/>}/>
                 <Route path='students' element={<Students/>} />
                 <Route path='manage-prep' element={<ManagePrep/>} />
               
                 <Route path='contacts' element={<Contacts/>} />
                 <Route path='manage-categories' element={<ManageCategories/>} />
                 <Route path='manage-tests' element={<ManageTests/>} />
                 <Route path='manage-questions' element={<ManageQuestions/>} />
                 <Route path='blogs' element={<Blogs/>} />
                 <Route path='course-enrollments' element={<CourseEnrollments/>} />
                 <Route path='users' element={<UsersList/>} />
                 <Route path='*' element={<PageNotFOund/>} />
                 <Route path='settings' element={<Settings/>}/>
          
            </Route>
          <Route path="*" element={<PageNotFOund/>} />
        </Routes>
      </Router>
    </>
  );
}
export default App