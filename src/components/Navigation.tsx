'use client';

import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="container flex justify-between p-2 text-white items-center">
        <div>
          <img src="/images/logo-white-en.png" alt="logo" width={200} height={100} />
        </div>
        <div className="text-white flex gap-6 items-center">
          <NavigationLink href="/" className="px-4 hover:text-gray-300 transition-colors duration-200">{t('home')}</NavigationLink>
          <NavigationLink href="/about" className="px-4 hover:text-gray-300 transition-colors duration-200">{t('about')}</NavigationLink>
          <NavigationLink href="/news" className="px-4 hover:text-gray-300 transition-colors duration-200">{t('news')}</NavigationLink>
          <NavigationLink href="/contact" className="px-4 hover:text-gray-100 transition-colors duration-200 bg-white text-black rounded-full py-2 px-4 font-bold text-black">{t('contact')}</NavigationLink>
               <LocaleSwitcher />
        </div>
   
      </nav>
    </div>
  );
}
