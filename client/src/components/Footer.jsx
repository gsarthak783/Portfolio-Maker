import React from 'react';
import { name } from '../constants';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-base-content pt-12 pb-6 px-6 shadow-md">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Core Features */}
        <div className="space-y-4">
          <p className="font-semibold text-blue-600">Core Features</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Easy Customization</li>
            <li>Responsive Designs</li>
            <li>Real-Time Updates</li>
            <li>Secure Hosting</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="space-y-4">
          <p className="font-semibold text-blue-600">Contact Us</p>
          <p className="text-sm text-gray-600">
            Have questions? Reach out to our support team at:
          </p>
          <p className="text-sm text-blue-500">
            <a href="mailto:support@portfolio.com" className="hover:underline">
              gsarthak783@gmail.com
            </a>
          </p>
        </div>

        {/* Legal Information */}
        <div className="space-y-4">
          <p className="font-semibold text-blue-600">Legal</p>
          <ul className="space-y-2 text-sm text-gray-600">
            <li><a href="#terms" className="hover:text-blue-500">Terms of Service</a></li>
            <li><a href="#privacy" className="hover:text-blue-500">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center pt-4 text-sm text-gray-600 mt-4">
        <p>
          Designed & Developed by <span className="font-semibold">{name}</span>
        </p>
        <p>© {year} All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
