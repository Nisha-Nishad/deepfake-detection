import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const activePath = location.pathname;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);

    // Close dropdown if clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (dropdownRef.current && target && !dropdownRef.current.contains(target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-crypto-blue/80 backdrop-blur-md py-3 shadow-lg'
          : 'py-6'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">
          DeepFake<span className="text-crypto-purple">Detector</span>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center space-x-8">
          <li>
            <Link
              to="/"
              className={`transition-colors ${
                activePath === '/'
                  ? 'text-crypto-purple font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/blogs"
              className={`transition-colors ${
                activePath === '/blogs'
                  ? 'text-crypto-purple font-semibold'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Blogs
            </Link>
          </li>
        </ul>

        {/* Profile Dropdown */}
        <div className="hidden lg:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-white hover:text-crypto-purple transition-colors"
              >
                <i className="bi bi-person-circle text-2xl"></i>
                <span className="font-medium">{user?.name || "User"}</span>
                <i className="bi bi-caret-down-fill text-xs"></i>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded-lg shadow-lg py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link
                to="/login"
                className="bg-crypto-purple hover:bg-crypto-dark-purple text-white w-full px-4 py-2 rounded font-medium"
              >
                Login
              </Link>
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
