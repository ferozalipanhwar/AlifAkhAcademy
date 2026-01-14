import { motion } from "framer-motion";
import {
  Bell,
  Camera,
  Globe,
  Lock,
  Mail,
  Moon,
  Save,
  Shield,
  Trash2,
  User
} from "lucide-react";
import { useState } from "react";

const Settings = () => {
  // ================= STATE: Dummy Data =================
  const [profile, setProfile] = useState({
    name: "Feroz Khan",
    email: "admin@alifakh.com",
    bio: "Super Administrator at Alif-Akh Academy. Managing courses and students.",
    role: "Administrator"
  });

  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    newStudentAlert: true,
    marketingEmails: false,
    securityAlerts: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });

  // ================= HANDLERS =================
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = (section) => {
    alert(`${section} settings saved successfully! (Demo)`);
  };

  return (
    <div className="space-y-8 p-2 max-w-5xl mx-auto">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <SettingsIcon className="text-emerald-500" /> Settings
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Manage your account preferences and system configurations.
        </p>
      </div>

      <div className="grid gap-8">
        
        {/* ================= 1. PROFILE SETTINGS ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1d21] border border-white/5 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <User size={18} className="text-emerald-500" /> Profile Information
          </h2>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Avatar Upload */}
            <div className="flex flex-col items-center gap-3">
              <div className="relative group cursor-pointer">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-3xl font-bold text-white shadow-xl border-4 border-[#1a1d21]">
                  {profile.name.charAt(0)}
                </div>
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="text-white" />
                </div>
              </div>
              <span className="text-xs text-gray-400">Allowed *.jpeg, *.jpg, *.png</span>
            </div>

            {/* Inputs */}
            <div className="flex-1 grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                 <label className="text-xs text-gray-500 font-medium ml-1">Full Name</label>
                 <input 
                   type="text" 
                   name="name"
                   value={profile.name}
                   onChange={handleProfileChange}
                   className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                 />
              </div>

              <div>
                 <label className="text-xs text-gray-500 font-medium ml-1">Email Address</label>
                 <div className="relative mt-1">
                   <Mail size={14} className="absolute left-3 top-3.5 text-gray-500" />
                   <input 
                     type="email" 
                     name="email"
                     value={profile.email}
                     onChange={handleProfileChange}
                     className="w-full pl-9 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm"
                   />
                 </div>
              </div>

              <div>
                 <label className="text-xs text-gray-500 font-medium ml-1">Role</label>
                 <div className="relative mt-1">
                   <Shield size={14} className="absolute left-3 top-3.5 text-gray-500" />
                   <input 
                     type="text" 
                     value={profile.role}
                     disabled
                     className="w-full pl-9 p-3 rounded-xl bg-[#0f1115]/50 text-gray-400 border border-gray-700 cursor-not-allowed text-sm"
                   />
                 </div>
              </div>

              <div className="md:col-span-2">
                 <label className="text-xs text-gray-500 font-medium ml-1">Bio</label>
                 <textarea 
                   rows="3"
                   name="bio"
                   value={profile.bio}
                   onChange={handleProfileChange}
                   className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-emerald-500 focus:outline-none text-sm resize-none"
                 />
              </div>

              <div className="md:col-span-2 flex justify-end">
                <button 
                  onClick={() => handleSave("Profile")}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all"
                >
                  <Save size={16} /> Save Changes
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= 2. PREFERENCES & NOTIFICATIONS ================= */}
        <div className="grid md:grid-cols-2 gap-8">
           {/* Notifications */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-[#1a1d21] border border-white/5 rounded-2xl p-6 shadow-lg h-full"
           >
             <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
               <Bell size={18} className="text-yellow-500" /> Notifications
             </h2>
             
             <div className="space-y-4">
                <ToggleItem 
                  label="Email Alerts" 
                  desc="Receive emails about account activity."
                  checked={notifications.emailAlerts}
                  onChange={() => toggleNotification('emailAlerts')}
                />
                <ToggleItem 
                  label="New Student Registrations" 
                  desc="Get notified when a student enrolls."
                  checked={notifications.newStudentAlert}
                  onChange={() => toggleNotification('newStudentAlert')}
                />
                <ToggleItem 
                  label="Security Alerts" 
                  desc="Notify on suspicious login attempts."
                  checked={notifications.securityAlerts}
                  onChange={() => toggleNotification('securityAlerts')}
                />
             </div>
           </motion.div>

           {/* App Preferences */}
           <motion.div 
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.1 }}
             className="bg-[#1a1d21] border border-white/5 rounded-2xl p-6 shadow-lg h-full"
           >
             <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
               <Globe size={18} className="text-blue-500" /> Appearance & Language
             </h2>

             <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-[#0f1115] rounded-xl border border-gray-800">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                        <Moon size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-200">Dark Mode</span>
                   </div>
                   <span className="text-xs text-emerald-500 font-medium bg-emerald-500/10 px-2 py-1 rounded">Always On</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-[#0f1115] rounded-xl border border-gray-800">
                   <div className="flex items-center gap-3">
                      <div className="p-2 bg-gray-800 rounded-lg text-gray-400">
                        <Globe size={18} />
                      </div>
                      <span className="text-sm font-medium text-gray-200">Language</span>
                   </div>
                   <select className="bg-gray-800 text-gray-300 text-xs p-1 rounded border border-gray-700 outline-none">
                     <option>English (US)</option>
                     <option>Urdu</option>
                   </select>
                </div>
             </div>
           </motion.div>
        </div>

        {/* ================= 3. SECURITY ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-[#1a1d21] border border-white/5 rounded-2xl p-6 shadow-lg"
        >
          <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
            <Lock size={18} className="text-purple-500" /> Security
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
               <label className="text-xs text-gray-500 font-medium ml-1">Current Password</label>
               <input 
                 type="password" 
                 className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-purple-500 focus:outline-none text-sm"
                 placeholder="••••••••"
               />
            </div>
            <div>
               <label className="text-xs text-gray-500 font-medium ml-1">New Password</label>
               <input 
                 type="password" 
                 className="w-full mt-1 p-3 rounded-xl bg-[#0f1115] text-white border border-gray-700 focus:border-purple-500 focus:outline-none text-sm"
                 placeholder="••••••••"
               />
            </div>
            <div className="flex items-end">
              <button 
                onClick={() => handleSave("Password")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-sm font-medium transition-all"
              >
                Update Password
              </button>
            </div>
          </div>
        </motion.div>

        {/* ================= 4. DANGER ZONE ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="border border-red-500/30 bg-red-500/5 rounded-2xl p-6"
        >
          <h2 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">
            <Trash2 size={18} /> Danger Zone
          </h2>
          <p className="text-sm text-gray-400 mb-4">
            Once you delete your account, there is no going back. Please be certain.
          </p>
          <button className="bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white border border-red-600/20 hover:border-transparent px-6 py-2 rounded-lg text-sm font-medium transition-all">
            Delete Account
          </button>
        </motion.div>

      </div>
    </div>
  );
};

// Helper Component for Icons in Header
const SettingsIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

// Helper Component for Toggles
const ToggleItem = ({ label, desc, checked, onChange }) => (
  <div className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors">
    <div>
      <h3 className="text-sm font-medium text-gray-200">{label}</h3>
      <p className="text-xs text-gray-500">{desc}</p>
    </div>
    <div 
      onClick={onChange}
      className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${checked ? 'bg-emerald-600' : 'bg-gray-700'}`}
    >
      <motion.div 
        layout
        className="bg-white w-4 h-4 rounded-full shadow-md"
        animate={{ x: checked ? 20 : 0 }}
      />
    </div>
  </div>
);

export default Settings;