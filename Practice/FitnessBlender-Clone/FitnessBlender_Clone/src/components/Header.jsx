import React from 'react';
import { Search, ShoppingBag, Menu, User, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans border-b border-gray-100">
      <div className="max-w-[1440px] mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-black tracking-tighter text-gray-900 uppercase">
              Fitness Blender
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            <NavItem label="Workouts" to="/videos" hasDropdown />
            <NavItem label="Programs" to="/programs-challenges" hasDropdown />
            <NavItem label="Healthy Living" to="/healthy-living" hasDropdown />
            <NavItem label="Community" to="/community" hasDropdown />
            <NavItem label="About" to="/page/about-fitness-blender" hasDropdown />
            <Link to="/store" className="text-gray-700 hover:text-blue-600 font-semibold py-2">Store</Link>
            <Link to="/membership" className="text-blue-600 font-bold py-2">Membership</Link>
          </nav>

          {/* User & Utils */}
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex items-center space-x-3 cursor-pointer group">
              <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <User size={18} className="text-gray-500" />
              </div>
              <div className="flex flex-col text-sm">
                <span className="text-gray-500 text-xs">Hi! Sign In</span>
                <span className="font-bold flex items-center text-gray-800 group-hover:text-blue-600 transition-colors">
                  My Fitness <ChevronDown size={14} className="ml-1" />
                </span>
              </div>
            </div>

            <button className="text-gray-700 hover:text-blue-600 transition-colors">
              <Search size={22} />
            </button>
            <Link to="/store/cart" className="text-gray-700 hover:text-blue-600 relative transition-colors">
              <ShoppingBag size={22} />
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="lg:hidden text-gray-700">
              <Menu size={28} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

const NavItem = ({ label, to, hasDropdown }) => (
  <div className="relative group flex items-center cursor-pointer py-2">
    <Link to={to} className="text-gray-700 font-semibold group-hover:text-blue-600 flex items-center transition-colors">
      {label}
      {hasDropdown && <ChevronDown size={16} className="ml-1" />}
    </Link>
  </div>
);

export default Header;
