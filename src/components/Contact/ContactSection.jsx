import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send
} from "lucide-react";
import { useState } from "react";
import API from "../../apiHelper/api.js";

const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await API.post("/contact/send", form);
      setStatus({ type: "success", message: "Message sent successfully! We'll get back to you soon." });
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus({ type: "error", message: "Failed to send message. Please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="Contact" className="py-20 bg-gray-50 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-64 bg-emerald-600 skew-y-3 transform -translate-y-20 origin-top-left z-0"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-white/80 font-bold text-sm tracking-widest uppercase bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
            We'd Love to Hear From You
          </h2>
          <p className="text-emerald-100 mt-3 max-w-2xl mx-auto text-lg">
            Have questions about our courses or need assistance? Our team is here to help.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* ================= LEFT: CONTACT INFO & MAP ================= */}
          <div className="w-full lg:w-5/12 flex flex-col gap-6">
            
            {/* Info Cards */}
            <div className="grid gap-4">
              <ContactCard 
                icon={<MapPin size={24} />} 
                title="Our Location" 
                text="LSE Houghton Street, London WC2A 2AE, UK" 
                color="text-red-500"
                bgColor="bg-red-50"
              />
              <ContactCard 
                icon={<Mail size={24} />} 
                title="Email Us" 
                text="hello@alif-akh.com" 
                color="text-blue-500"
                bgColor="bg-blue-50"
              />
              <ContactCard 
                icon={<Phone size={24} />} 
                title="Call Support" 
                text="+44 (20) 7405 7686" 
                color="text-emerald-500"
                bgColor="bg-emerald-50"
              />
            </div>

            {/* Map */}
            <div className="flex-1 min-h-[300px] bg-gray-200 rounded-2xl overflow-hidden shadow-lg border border-gray-100 relative group">
              <iframe
                title="Google Map"
                className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.90502179144!2d-0.11653128407486302!3d51.51490521796685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604b3036315a5%3A0xecc330f14690747a!2sLSE%2C%20Houghton%20St%2C%20London%20WC2A%202AE%2C%20UK!5e0!3m2!1sen!2s!4v1652362070335!5m2!1sen!2s"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>

          {/* ================= RIGHT: CONTACT FORM ================= */}
          <div className="w-full lg:w-7/12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100 h-full"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700 ml-1">Message</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="How can we help you?"
                    value={form.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all resize-none"
                    required
                  ></textarea>
                </div>

                {/* Status Message */}
                {status.message && (
                  <div className={`p-4 rounded-xl flex items-center gap-3 text-sm font-medium ${
                    status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-700 hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> Sending...
                    </>
                  ) : (
                    <>
                      Send Message <Send size={20} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Helper Component for Info Cards
const ContactCard = ({ icon, title, text, color, bgColor }) => (
  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bgColor} ${color}`}>
      {icon}
    </div>
    <div>
      <h4 className="text-sm font-bold text-gray-900">{title}</h4>
      <p className="text-sm text-gray-500">{text}</p>
    </div>
  </div>
);

export default ContactSection;