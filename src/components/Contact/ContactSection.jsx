
const ContactSection = () => {
  return (
    <section id="Contact" className="bg-white py-12 px-6 md:px-16">
      <h2 className="text-3xl font-semibold text-center mb-10 text-gray-800">
        Contact
      </h2>

      <div className="flex flex-col md:flex-row gap-10 md:items-start justify-between">
        {/* Left Side — Form and Contact Info */}
        <div className="md:w-1/2 w-full space-y-6">
          {/* Form */}
          <form className="space-y-5">
            <div>
              <label className="block text-gray-700 font-medium">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border-b border-gray-300 focus:border-green-500 outline-none py-2"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium">Message</label>
              <textarea
                placeholder="Write your message..."
                rows="4"
                className="w-full border border-gray-300 rounded-md p-3 focus:border-green-500 outline-none resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 transition-all duration-300"
            >
              Send
            </button>
          </form>

         
        </div>

        {/* Right Side — Map */}
        <div className= "md:w-1/2 w-full display: flex; flex-direction: column; ">
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
