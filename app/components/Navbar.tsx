'use client';
import { useState, useEffect } from 'react';
import { FiHome, FiUser, FiStar, FiCode, FiBook, FiMail } from 'react-icons/fi';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#', icon: <FiHome />, label: 'Home' },
    { href: '#about', icon: <FiUser />, label: 'About' },
    { href: '#education', icon: <FiBook />, label: 'Education' },
    { href: '#skills', icon: <FiStar />, label: 'Skills' },
    { href: '#experience', icon: <FiCode />, label: 'Experience' },
    { href: '#projects', icon: <FiBook />, label: 'Projects' },
    { href: '#contact', icon: <FiMail />, label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'py-2 bg-white/80 backdrop-blur-lg shadow-md' : 'py-4 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-1 md:space-x-4">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-gray-600 hover:text-pink-400 relative px-4 py-2 rounded-full transition-all duration-300
              hover:bg-pink-50/50 flex items-center gap-2"
            >
              {item.icon}
              <span className="hidden md:inline">{item.label}</span>
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
} 