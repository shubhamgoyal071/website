import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Phone, Mail, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { schoolInfo } from '../mock';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Academics', path: '/academics' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      {/* Top bar - hidden on mobile */}
      <div className="hidden md:block bg-gradient-to-r from-blue-800 to-blue-700 text-white py-2.5">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-6">
              <a href={`tel:${schoolInfo.phone}`} className="flex items-center gap-2 hover:text-yellow-200 transition-colors">
                <Phone size={14} />
                <span className="font-medium">{schoolInfo.phone}</span>
              </a>
              <a href={`mailto:${schoolInfo.email}`} className="flex items-center gap-2 hover:text-yellow-200 transition-colors">
                <Mail size={14} />
                <span className="font-medium">{schoolInfo.email}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-yellow-100">
              <MapPin size={14} />
              <span className="font-medium">R.K.Puram, Kota, Rajasthan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className={`bg-white transition-all duration-300 ${isScrolled ? 'py-3' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                  src={schoolInfo.logo} 
                  alt={schoolInfo.name}
                  className="h-16 w-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 group-hover:text-blue-700 transition-colors">
                  {schoolInfo.name}
                </h1>
                <p className="text-xs md:text-sm text-yellow-600 font-semibold tracking-wide">
                  {schoolInfo.tagline.toUpperCase()}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    location.pathname === item.path
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <Link to="/admissions">
                <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white btn-hover font-semibold shadow-md">
                  Apply Now
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-lg animate-fadeIn">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                  location.pathname === item.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/admissions" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white mt-4">
                Apply Now
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
