import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-950 text-gray-300 py-16 mt-12 border-t border-gray-800 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                A
              </div>
              <span className="font-bold text-xl text-white tracking-tight">
                ALIF-AKH<span className="text-emerald-500">ACADEMY</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Empowering students with world-class education and practical skills. 
              Join us to shape your future with knowledge and innovation.
            </p>
            <div className="flex gap-4 pt-2">
              <SocialIcon icon={<Facebook size={18} />} href="#" />
              <SocialIcon icon={<Twitter size={18} />} href="#" />
              <SocialIcon icon={<Instagram size={18} />} href="#" />
              <SocialIcon icon={<Linkedin size={18} />} href="#" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink text="Home" href="#" />
              <FooterLink text="About Us" href="#AboutUs" />
              <FooterLink text="Our Courses" href="#Courses" />
              <FooterLink text="Expert Teachers" href="#Teachers" />
              <FooterLink text="Latest Blogs" href="/blogs" />
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-3 text-sm">
              <FooterLink text="Student Portal" href="/profile" />
              <FooterLink text="Become a Teacher" href="/register" />
              <FooterLink text="Test Preparation" href="/take-test" />
              <FooterLink text="Privacy Policy" href="#" />
              <FooterLink text="Terms of Service" href="#" />
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-emerald-500 shrink-0" size={20} />
                <span>
                  near baba aata chaki , post office road,<br />
                  badin sindh, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-emerald-500 shrink-0" size={20} />
                <span>+92 325 6749757</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-emerald-500 shrink-0" size={20} />
                <span>supportalifakh@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Alif-Akh Academy. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Cookies</a>
            <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper Components to keep code clean
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

const FooterLink = ({ text, href }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-400 hover:text-emerald-400 hover:pl-1 transition-all duration-300 block"
    >
      {text}
    </a>
  </li>
);

export default Footer;