'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Check if current page is home page (root path)
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/zh-CN' || pathname === '/zh-TC';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    // Only add scroll listener if we're on the home page
    if (isHomePage) {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [isHomePage]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Determine background class based on page and scroll state
  const getBackgroundClass = () => {
    if (isHomePage) {
      // On home page: transparent initially, black when scrolled
      return isScrolled ? 'bg-black shadow-lg' : 'bg-transparent';
    } else {
      // On other pages: always black
      return 'bg-black shadow-lg';
    }
  };

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getBackgroundClass()}`}>
      <nav className="container flex justify-between p-2 text-white items-center">
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/images/logo-white-en.png" alt="logo" width={200} height={100} />
          </Link>
        </div>
        <div className="hidden md:flex text-white gap-6 items-center">
          <NavigationLink href="/" className="px-4 hover:text-gray-300 transition-colors duration-200">{t('home')}</NavigationLink>
          <NavigationLink href="/about" className="px-4 hover:text-gray-300 transition-colors duration-200">{t('about')}</NavigationLink>
          <NavigationLink href="/news" className="px-4 hover:text-gray-300 transition-colors duration-200">{t('news')}</NavigationLink>
          <NavigationLink href="/works" className="px-4 hover:text-gray-300 transition-colors duration-200">{t('works')}</NavigationLink>
          <NavigationLink href="/contact" className="px-4 hover:opacity-80 transition-all duration-200 bg-white text-black rounded-full py-2 px-4 font-normal">{t('contact')}</NavigationLink>
          <LocaleSwitcher />
        </div>
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="text-white p-2 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-6 h-0.5 bg-white transition-all duration-300 mt-1 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
            </div>
          </button>
        </div>
      </nav>
      <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`} onClick={closeMobileMenu}>
        <div className={`absolute top-30 left-0 right-0 bg-black transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}>
          <div className="container mx-auto px-4 py-8">
             <div className="flex flex-col space-y-6 text-white">
              <img src="/images/logo-white-en.png" alt="logo" width={100} height={100} />
             </div>
            <div className="flex flex-col space-y-6 text-white">
              <NavigationLink 
                href="/" 
                className="text-xl py-3 border-b border-gray-700 hover:text-gray-300 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                {t('home')}
              </NavigationLink>
              <NavigationLink 
                href="/about" 
                className="text-xl py-3 border-b border-gray-700 hover:text-gray-300 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                {t('about')}
              </NavigationLink>
              <NavigationLink 
                href="/news" 
                className="text-xl py-3 border-b border-gray-700 hover:text-gray-300 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                {t('news')}
              </NavigationLink>
              <NavigationLink 
                href="/works" 
                className="text-xl py-3 border-b border-gray-700 hover:text-gray-300 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                {t('works')}
              </NavigationLink>
              <NavigationLink 
                href="/contact" 
                className="text-xl py-3 border-b border-gray-700 hover:text-gray-300 transition-colors duration-200"
                onClick={closeMobileMenu}
              >
                {t('contact')}
              </NavigationLink>
              <div className="py-3 hidden md:block">
                <LocaleSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
