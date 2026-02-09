import { ArrowLeft, Eye, Globe, Lock, Mail, Server, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";
const PrivacyPolicy = () => {
  return (
    <>
     <Navbar/>
        <div className="min-h-screen bg-gray-50 font-sans">
      
      {/* --- Header / Hero Section --- */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-medium">
              Effective Date: February 10, 2026
            </span>
            <span>Last Updated: Today</span>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 space-y-10">
          
          {/* Introduction */}
          <div className="prose prose-emerald max-w-none text-gray-600">
            <p className="text-lg leading-relaxed">
              At <strong>Alif-Akh Academy</strong>, accessible from our website and mobile application, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Alif-Akh Academy and how we use it.
            </p>
            <p>
              If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Section 1: Information Collection */}
          <Section 
            icon={<Eye size={24} />} 
            title="1. Information We Collect"
          >
            <p className="mb-4">We collect several different types of information for various purposes to provide and improve our Service to you.</p>
            
            <h4 className="font-bold text-gray-800 mt-4 mb-2">Personal Data</h4>
            <p className="mb-4">
              While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
            </p>
            <ul className="list-disc pl-5 space-y-2 mb-4">
              <li>Email address</li>
              <li>First name and last name</li>
              <li>Phone number</li>
              <li>Address, State, Province, ZIP/Postal code, City</li>
              <li>Cookies and Usage Data</li>
            </ul>

            <h4 className="font-bold text-gray-800 mt-4 mb-2">Usage Data</h4>
            <p>
              We may also collect information how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
            </p>
          </Section>

          {/* Section 2: How We Use Data */}
          <Section 
            icon={<Server size={24} />} 
            title="2. How We Use Your Information"
          >
            <p className="mb-4">Alif-Akh Academy uses the collected data for various purposes:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <ListItem>To provide and maintain the Service</ListItem>
              <ListItem>To notify you about changes to our Service</ListItem>
              <ListItem>To allow you to participate in interactive features</ListItem>
              <ListItem>To provide customer care and support</ListItem>
              <ListItem>To provide analysis to improve the Service</ListItem>
              <ListItem>To monitor the usage of the Service</ListItem>
              <ListItem>To detect, prevent and address technical issues</ListItem>
            </ul>
          </Section>

          {/* Section 3: Cookies */}
          <Section 
            icon={<Shield size={24} />} 
            title="3. Tracking & Cookies Data"
          >
            <p className="mb-4">
              We use cookies and similar tracking technologies to track the activity on our Service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier.
            </p>
            <p className="mb-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Service.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h5 className="font-bold text-gray-800 mb-2">Examples of Cookies we use:</h5>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li><strong>Session Cookies:</strong> We use Session Cookies to operate our Service.</li>
                <li><strong>Preference Cookies:</strong> We use Preference Cookies to remember your preferences and various settings.</li>
                <li><strong>Security Cookies:</strong> We use Security Cookies for security purposes.</li>
              </ul>
            </div>
          </Section>

          {/* Section 4: Data Security */}
          <Section 
            icon={<Lock size={24} />} 
            title="4. Data Security"
          >
            <p>
              The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security. We implement SSL encryption and secure payment gateways (Stripe/PayPal) to ensure your sensitive information is protected.
            </p>
          </Section>

          {/* Section 5: Third Party Services */}
          <Section 
            icon={<Globe size={24} />} 
            title="5. Service Providers"
          >
            <p className="mb-4">
              We may employ third party companies and individuals to facilitate our Service ("Service Providers"), to provide the Service on our behalf, to perform Service-related services or to assist us in analyzing how our Service is used.
            </p>
            <p>
              These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.
            </p>
          </Section>

          {/* Section 6: Contact */}
          <div className="bg-emerald-50 rounded-2xl p-8 border border-emerald-100 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Mail className="text-emerald-600" /> Contact Us
            </h2>
            <p className="text-gray-600 mb-6">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <div className="inline-flex flex-col gap-2 text-emerald-800 font-medium">
              <span>By email: support@alifakh.com</span>
              <span>By phone: +92 325 6749757</span>
            </div>
          </div>

        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}


// --- Helper Components for Layout ---

const Section = ({ icon, title, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg">
        {icon}
      </div>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
    <div className="text-gray-600 leading-relaxed pl-1">
      {children}
    </div>
  </div>
);

const ListItem = ({ children }) => (
  <li className="flex items-start gap-2 text-sm">
    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0"></div>
    <span>{children}</span>
  </li>
);

export default PrivacyPolicy;