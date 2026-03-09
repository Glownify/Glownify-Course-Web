 import React from 'react';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F0FDFA] pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top Section: Branding and Links */}
        <div className="grid grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* Brand Column */}
          <div className=" col-span-2 lg:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              {/* <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center shadow-sm">
                <span className="text-pink-500 font-bold text-xl italic">G</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Glownify</span> */}
               <img
                className="w-20 h-20 object-contain drop-shadow-sm"
                src="/GlownifyLogoPng.png"
                alt="Glownify Logo"
              />
            </div>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              The trusted marketplace for beauty professionals to launch training courses and for students to discover their next skill.
            </p>
            <div className="flex gap-4 text-gray-400">
              <Instagram size={20} className="hover:text-pink-500 cursor-pointer transition-colors" />
              <Facebook size={20} className="hover:text-blue-600 cursor-pointer transition-colors" />
              <Twitter size={20} className="hover:text-blue-400 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Platform Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Platform</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Browse Courses</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Become a Seller</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Seller Dashboard</a></li>
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h4 className="font-bold text-gray-900 mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Safety Guidelines</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className='col-span-2 lg:col-span-1'>
            <h4 className="font-bold text-gray-900 mb-6">Contact</h4>
            <div className="flex items-center gap-2 text-sm text-gray-500 hover:text-teal-600 transition-colors">
              <Mail size={16} />
              <a href="mailto:support@glownify.com">support@glownify.com</a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright and Disclaimer */}
        <div className="pt-8 border-t border-gray-200/60 flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-xs text-gray-400">
            © {currentYear} Glownify. All rights reserved.
          </p>
          
          {/* Payment Disclaimer Banner */}
          <div className="bg-white/60 backdrop-blur-sm px-6 py-2.5 rounded-full border border-gray-100 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
            <p className="text-[11px] md:text-xs text-gray-500 font-medium">
              Glownify does not handle payments. All payments are collected directly by course providers.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;