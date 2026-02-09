import {
  ChevronDown,
  CreditCard,
  FileText,
  Mail,
  MessageCircle,
  Monitor,
  Phone,
  Search,
  User
} from "lucide-react";
import { useState } from "react";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";

// --- Helper Component for Support Cards ---
const SupportCard = ({ icon, title, desc, action, link }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 mb-6 leading-relaxed">{desc}</p>
    <a href={link} className="inline-block px-6 py-2.5 bg-gray-50 text-emerald-700 font-bold rounded-xl text-sm group-hover:bg-emerald-50 transition-colors">
      {action}
    </a>
  </div>
);

// --- Helper for Quick Link Badge ---
const QuickLink = ({ icon, text }) => (
  <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors shadow-sm">
    {icon} {text}
  </button>
);

// --- Main Component ---
const HelpSupport = () => {
  const [openIndex, setOpenIndex] = useState(0); // First FAQ open by default

  const faqs = [
    { 
      question: "How do I enroll in a course?", 
      answer: "To enroll, first log in to your account. Browse our 'Courses' catalog, select the course you're interested in, and click the 'Enroll Now' button. If it's a paid course, you'll be redirected to the payment gateway. Once confirmed, the course will appear in your 'My Learning' dashboard immediately." 
    },
    { 
      question: "What is your refund policy?", 
      answer: "We offer a 7-day money-back guarantee for all paid courses. If you are unsatisfied with the content, you can request a full refund within 7 days of purchase, provided you haven't completed more than 30% of the course material. Contact support@alifakh.com to initiate a refund." 
    },
    { 
      question: "How do I verify my certificate?", 
      answer: "Every certificate issued has a unique verification ID. Go to the 'Verify Certificate' page (link in footer), enter your Certificate ID, and the system will validate its authenticity. You can also share this link with employers." 
    },
    { 
      question: "I forgot my password, how can I reset it?", 
      answer: "Click on 'Login' at the top right, then select 'Forgot Password'. Enter your registered email address, and we will send you a secure link to reset your password. The link expires in 24 hours for security reasons." 
    },
    { 
      question: "Can I access courses on mobile?", 
      answer: "Yes! Alif-Akh Academy is fully responsive. You can access all your courses, quizzes, and certificates on any smartphone or tablet via our mobile-friendly website." 
    },
  ];

  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 font-sans pb-20">
        
        {/* --- Hero Section --- */}
        <div className="bg-emerald-900 relative overflow-hidden pt-32 pb-20 px-6 text-center">
           {/* Abstract Background Shapes */}
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute top-10 left-10 w-40 h-40 bg-emerald-500 rounded-full blur-3xl opacity-20"></div>
           <div className="absolute bottom-10 right-10 w-60 h-60 bg-teal-400 rounded-full blur-3xl opacity-20"></div>

           <div className="relative z-10 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                How can we help you today?
              </h1>
              <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
                Search our knowledge base or contact our support team for assistance with courses, payments, and account settings.
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl mx-auto shadow-2xl rounded-full">
                <Search className="absolute left-5 top-4 text-gray-400" size={22} />
                <input 
                  type="text" 
                  placeholder="Search for articles, topics, or keywords..." 
                  className="w-full pl-14 pr-6 py-4 rounded-full border-0 focus:ring-4 focus:ring-emerald-500/30 text-gray-800 shadow-lg text-base"
                />
              </div>

              {/* Quick Links */}
              <div className="flex flex-wrap justify-center gap-3 mt-8">
                 <QuickLink icon={<FileText size={16}/>} text="Certificate Issues" />
                 <QuickLink icon={<CreditCard size={16}/>} text="Payment & Billing" />
                 <QuickLink icon={<User size={16}/>} text="Account Settings" />
                 <QuickLink icon={<Monitor size={16}/>} text="Technical Support" />
              </div>
           </div>
        </div>

        {/* --- Support Cards --- */}
        <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <SupportCard 
              icon={<Mail size={32}/>} 
              title="Email Support" 
              desc="Best for detailed inquiries. We usually respond within 24 hours." 
              action="support@alifakh.com" 
              link="mailto:support@alifakh.com"
            />
            <SupportCard 
              icon={<Phone size={32}/>} 
              title="Phone Support" 
              desc="Available Mon-Fri, 9am - 6pm PKT for urgent issues." 
              action="+92 325 6749757" 
              link="tel:+923256749757"
            />
            <SupportCard 
              icon={<MessageCircle size={32}/>} 
              title="Live Chat" 
              desc="Chat with our support team instantly for quick resolutions." 
              action="Start Live Chat" 
              link="#"
            />
          </div>
        </div>

        {/* --- FAQ Section --- */}
        <div className="max-w-3xl mx-auto px-6 mt-24">
          <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-gray-900 mb-3">Frequently Asked Questions</h2>
             <p className="text-gray-500">Quick answers to the most common questions we receive.</p>
          </div>

          <div className="bg-white rounded-3xl p-2 shadow-sm border border-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b last:border-0 border-gray-100">
                <button 
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none group"
                >
                  <span className={`font-semibold text-lg transition-colors ${openIndex === index ? "text-emerald-600" : "text-gray-800 group-hover:text-emerald-600"}`}>
                    {faq.question}
                  </span>
                  <div className={`p-2 rounded-full transition-all duration-300 ${openIndex === index ? "bg-emerald-100 text-emerald-600 rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-emerald-50"}`}>
                     <ChevronDown size={20} />
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Still Need Help? --- */}
        <div className="text-center mt-20">
           <p className="text-gray-500 mb-4">Still can't find what you're looking for?</p>
           <a href="mailto:support@alifakh.com" className="text-emerald-600 font-bold text-lg hover:underline underline-offset-4">
              Contact our Support Team &rarr;
           </a>
        </div>

      </div>
      
      <Footer />
    </>
  );
};

export default HelpSupport;