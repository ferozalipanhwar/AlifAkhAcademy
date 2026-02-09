import {
  ArrowLeft,
  Ban,
  Copyright,
  CreditCard,
  FileText,
  Mail,
  Scale,
  ShieldAlert,
  Users
} from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/navbar/Navbar";

const TermsOfService = () => {
  return (
    <>
      <Navbar />
      
      <div className="min-h-screen bg-gray-50 font-sans">
        
        {/* --- Header / Hero Section --- */}
        <div className="bg-emerald-700 text-white pt-24 pb-12">
          <div className="max-w-4xl mx-auto px-6">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-emerald-100 hover:text-white mb-6 transition-colors bg-white/10 px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Terms of Service
            </h1>
            <p className="text-emerald-100 text-lg max-w-2xl">
              Please read these terms carefully before using our platform. By accessing Alif-Akh Academy, you agree to be bound by these conditions.
            </p>
            <div className="mt-6 inline-block bg-emerald-800/50 px-4 py-1.5 rounded-lg border border-emerald-600 text-sm">
              Last Updated: February 10, 2026
            </div>
          </div>
        </div>

        {/* --- Main Content --- */}
        <div className="max-w-4xl mx-auto px-6 py-12 -mt-8">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12 space-y-12">
            
            {/* Introduction Text */}
            <div className="prose prose-emerald max-w-none text-gray-600 border-b border-gray-100 pb-8">
              <p className="text-lg leading-relaxed">
                Welcome to <strong>Alif-Akh Academy</strong>. These Terms of Service ("Terms", "Agreement") are an agreement between the operator of Alif-Akh Academy ("us", "we", or "our") and you ("User", "you", or "your"). This Agreement sets forth the general terms and conditions of your use of the website and any of its products or services.
              </p>
            </div>

            {/* Section 1: Agreement */}
            <Section 
              icon={<FileText size={24} />} 
              title="1. Acceptance of Terms"
            >
              <p>
                By accessing and using our website and services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Agreement. If you do not agree with the terms, you must not accept this Agreement and may not access the platform.
              </p>
            </Section>

            {/* Section 2: Accounts */}
            <Section 
              icon={<Users size={24} />} 
              title="2. User Accounts & Security"
            >
              <ul className="list-disc pl-5 space-y-2">
                <li>You must be at least 13 years of age to use this platform.</li>
                <li>You are responsible for maintaining the confidentiality of your account credentials (username and password).</li>
                <li>You are fully responsible for all activities that occur under your account.</li>
                <li>You must immediately notify us of any unauthorized uses of your account or any other breaches of security.</li>
                <li>We will not be liable for any acts or omissions by you, including any damages of any kind incurred as a result of such acts or omissions.</li>
              </ul>
            </Section>

            {/* Section 3: Intellectual Property */}
            <Section 
              icon={<Copyright size={24} />} 
              title="3. Intellectual Property Rights"
            >
              <p className="mb-3">
                The content provided on Alif-Akh Academy, including but not limited to videos, quizzes, text, graphics, logos, and software, is the property of Alif-Akh Academy or its content creators and is protected by copyright and intellectual property laws.
              </p>
              <p className="font-semibold text-gray-800">You agree not to:</p>
              <ul className="list-disc pl-5 space-y-1 mt-2">
                <li>Reproduce, duplicate, copy, sell, resell or exploit any portion of the Service.</li>
                <li>Share your login credentials with others to give them access to paid content.</li>
                <li>Record or download video content unless explicitly allowed by the platform.</li>
              </ul>
            </Section>

            {/* Section 4: Payments */}
            <Section 
              icon={<CreditCard size={24} />} 
              title="4. Payments, Subscriptions & Refunds"
            >
              <p className="mb-3">
                Some courses and services on the platform are provided for a fee. You agree to pay all fees associated with the services you select.
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Pricing:</strong> Prices for courses are listed on the website and are subject to change.</li>
                <li><strong>Payments:</strong> We use secure third-party payment processors. We do not store your credit card information.</li>
                <li><strong>Refunds:</strong> We offer a <strong>7-day money-back guarantee</strong> for most courses. If you are unsatisfied, you may request a refund within 7 days of purchase, provided you have not completed more than 30% of the course.</li>
              </ul>
            </Section>

            {/* Section 5: Prohibited Activities */}
            <Section 
              icon={<Ban size={24} />} 
              title="5. Prohibited Activities"
            >
              <p>You may not use the Service for any illegal or unauthorized purpose. You agree not to:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Harass, abuse, or harm another person or group.</li>
                <li>Upload viruses or malicious code.</li>
                <li>Attempt to circumvent any content filtering techniques we employ.</li>
                <li>Use automated scripts to collect information from or otherwise interact with the Service (web scraping).</li>
              </ul>
            </Section>

            {/* Section 6: Termination */}
            <Section 
              icon={<ShieldAlert size={24} />} 
              title="6. Termination"
            >
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms. If your account is terminated due to a violation of these Terms, you will not be eligible for a refund.
              </p>
            </Section>

            {/* Section 7: Limitation of Liability */}
            <Section 
              icon={<Scale size={24} />} 
              title="7. Limitation of Liability"
            >
              <p>
                In no event shall Alif-Akh Academy, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
              </p>
            </Section>

            {/* Contact Box */}
            <div className="bg-gray-50 rounded-2xl p-8 border border-gray-200 text-center mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center justify-center gap-2">
                <Mail className="text-emerald-600" /> Have Questions?
              </h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about these Terms, please contact us.
              </p>
              <a href="mailto:support@alifakh.com" className="text-emerald-600 font-bold hover:underline text-lg">
                support@alifakh.com
              </a>
            </div>

          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

// --- Helper Component for Sections ---
const Section = ({ icon, title, children }) => (
  <div className="flex gap-5">
    <div className="shrink-0">
      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
        {icon}
      </div>
    </div>
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      <div className="text-gray-600 leading-relaxed text-base">
        {children}
      </div>
    </div>
  </div>
);

export default TermsOfService;