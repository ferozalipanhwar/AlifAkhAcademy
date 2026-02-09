
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
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
import AdminLectures from './components/Admin/Lecture/AdminLectures'
import AttemptTest from './components/Admin/prepComponent/attemptTests/AttemptTest'
import TeacherApplication from './components/Admin/TeacherApplication/TeacherApplication'
import BlogSection from './components/Blog/BlogSection'
import CourseRoadmap from './components/Courses/CourseRoadmap'
import Login from './components/LoginRegister/Login'
import Register from './components/LoginRegister/Register'
import PageNotFOund from './components/UniversalComponents/PageNotFound'
import AdminDashboard from './pages/AdminDashboard'
import AiTutor from './pages/AiTutor'
import BlogDetail from './pages/BlogDetail'
import CoursePlayer from './pages/CoursePlayer'
import CourseRegister from './pages/CourseRegister'
import BecomeTeacher from './pages/footerpages/BecomeTeacher'
import HelpSupport from './pages/footerpages/HelpSupport'
import PrivacyPolicy from './pages/footerpages/PrivacyPolicy'
import TeacherRegistrationForm from './pages/footerpages/TeacherRegistrationForm'
import TermsOfService from './pages/footerpages/TermsOfService'
import HomePage from './pages/HomePage'
import StartPreparationPage from './pages/prepTest/StartPreparationPage'
import Profile from './pages/Profile'
import MyResults from './pages/TakeTest/MyResults'
import TakeTest from './pages/TakeTest/TakeTest'
import VerifyCertificate from './pages/VerifyCertificate'
function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route
            path=""
            element={
              <>
            <HomePage/>
               
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/ai-tutor" element={<AiTutor />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="/learning/:id" element={<CoursePlayer />} />
          <Route path="/view-certificate" element={<MyResults />} />
          <Route path='verify-certificate' element={<VerifyCertificate/>}/>
          <Route path="/prep-test" element={<StartPreparationPage />} />
        
          <Route path="/support" element={<HelpSupport />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/become-teacher" element={<BecomeTeacher />} /> 
          <Route path="/teacher-register" element={<TeacherRegistrationForm />} />
          <Route path="/course-register" element={<><CourseRoadmap/><CourseRegister /> </>} />
          <Route path="/blogs" element={<BlogSection />} />
          <Route path="/blog/:id" element={<BlogDetail />} /> 
          
             <Route path="/admin-dashboard" element={<AdminDashboard />}>
                  <Route index element={<AdminStastics />} />
                 <Route path='courses' element={<CourseManager/>}/>
                 <Route path='teachers' element={<Teachers/>}/>
                 <Route path='students' element={<Students/>} />
                 <Route path='manage-prep' element={<ManagePrep/>} />
                 <Route path='attempt-tests' element={<AttemptTest/>} />
                 <Route path='contacts' element={<Contacts/>} />
                 <Route path='manage-categories' element={<ManageCategories/>} />
                 <Route path='manage-tests' element={<ManageTests/>} />
                 <Route path='teachers-applications' element={<TeacherApplication/>} />
                 <Route path='manage-questions' element={<ManageQuestions/>} />
                 <Route path='lectures' element={<AdminLectures/>} />
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