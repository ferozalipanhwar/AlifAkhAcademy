import { useState } from "react";
import API from "../../apiHelper/api.js";
const ContactSection = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = API.post(
        "/contact/send",
        form
      );

      setMsg("✅ Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setMsg("❌ Failed to send message. Try again!");
    }

    setLoading(false);
  };

  return (
    <section id="Contact" className="bg-white py-12 px-6 md:px-16">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        Contact
      </h2>

      <div className="flex flex-col md:flex-row gap-10 md:items-start justify-between">

        {/* Left — Contact Form */}
        <div className="md:w-1/2 w-full space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows="4"
                className="w-full border border-gray-300 rounded-md p-3 focus:border-green-500 outline-none resize-none"
                required
              ></textarea>
            </div>

            {/* Send Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-300 w-fit"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </form>

          {/* Response Message */}
          {msg && <p className="mt-2 text-lg">{msg}</p>}
        </div>

        {/* Right — Map + Contact Info */}
        <div className="md:w-1/2 w-full flex flex-col">
          <iframe
            title="map"
            className="w-full h-80 rounded-2x2 border"
            src="https://www.google.com/maps?q=London&output=embed"
            allowFullScreen
            loading="lazy"
          ></iframe>

          {/* Contact Info */}
          <div className="pt-6 space-y-3 text-gray-700">
            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">📍</span>
              <p>LSE Houghton Street, London WC2A 2AE, UK.</p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">✉️</span>
              <p>hello@gmail.com</p>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-green-600 text-xl">📞</span>
              <p>+44(20) 74057686</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
