import { Link } from 'react-router-dom';
import { GraduationCap, Phone, Mail, MapPin, Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import { schoolInfo } from '../mock';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Gallery', path: '/gallery' }
  ];

  const importantLinks = [
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '#' },
    { name: 'Terms & Conditions', path: '#' }
  ];

  return (
    <footer className="bg-gradient-to-b from-blue-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={schoolInfo.logo}
                alt={schoolInfo.name}
                className="h-14 w-14 object-contain bg-white rounded-lg p-1"
              />
              <div>
                <h3 className="text-xl font-bold">{schoolInfo.name}</h3>
                <p className="text-yellow-300 text-sm">{schoolInfo.tagline}</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              {schoolInfo.type} catering to {schoolInfo.level}. Nurturing young minds with excellence, values, and innovation.
            </p>
            <div className="flex gap-3">
              <a href={schoolInfo.facebook} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-yellow-600 p-2 rounded-lg transition-colors">
                <Facebook size={18} />
              </a>
              <a href={schoolInfo.instagram} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-yellow-600 p-2 rounded-lg transition-colors">
                <Instagram size={18} />
              </a>
              <a href={schoolInfo.youtube} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-yellow-600 p-2 rounded-lg transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-yellow-300 text-sm transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 bg-yellow-500 rounded-full group-hover:w-2 transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Important</h4>
            <ul className="space-y-2">
              {importantLinks.map((link) => (
                <li key={link.name}>
                  {link.download ? (
                    <a
                      href={link.path}
                      download="Reyansh_School_Prospectus.pdf"
                      className="text-gray-300 hover:text-yellow-300 text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-yellow-500 rounded-full group-hover:w-2 transition-all"></span>
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-yellow-300 text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 bg-yellow-500 rounded-full group-hover:w-2 transition-all"></span>
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3 text-gray-300">
                <MapPin size={18} className="mt-1 text-yellow-500 flex-shrink-0" />
                <span>{schoolInfo.address}</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Phone size={18} className="text-yellow-500 flex-shrink-0" />
                <a href={`tel:${schoolInfo.phone}`} className="hover:text-yellow-300 transition-colors">
                  {schoolInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <Mail size={18} className="text-yellow-500 flex-shrink-0" />
                <a href={`mailto:${schoolInfo.email}`} className="hover:text-yellow-300 transition-colors break-all">
                  {schoolInfo.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-blue-800 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} {schoolInfo.name}. All rights reserved.</p>
            <div className="flex gap-6">
              <Link to="#" className="hover:text-yellow-300 transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-yellow-300 transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
