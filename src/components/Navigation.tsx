'use client';

import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useRef, useState, useTransition} from 'react';
import {usePathname} from 'next/navigation';
import Link from 'next/link';
import {Globe} from 'lucide-react';
import {usePathname as useI18nPathname, useRouter} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import type {Locale} from 'next-intl';
import {useParams} from 'next/navigation';
import LocaleSwitcher from './LocaleSwitcher';
import NavigationLink from './NavigationLink';

export default function Navigation() {
  const t = useTranslations('Navigation');
  const tLocale = useTranslations('LocaleSwitcher');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocaleDropdownOpen, setIsLocaleDropdownOpen] = useState(false);
  const pathname = usePathname();
  const i18nPathname = useI18nPathname();
  const router = useRouter();
  const params = useParams();
  const locale = useLocale();
  const localeDropdownRef = useRef<HTMLDivElement>(null);
  const [isPending, startTransition] = useTransition();

  // Check if current page is home page (root path)
  const isHomePage = pathname === '/' || pathname === '/en' || pathname === '/zh-CN' || pathname === '/zh-Hant';

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

  // Close locale dropdown when clicking outside
  useEffect(() => {
    if (!isLocaleDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (localeDropdownRef.current && !localeDropdownRef.current.contains(e.target as Node)) {
        setIsLocaleDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isLocaleDropdownOpen]);

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
        <div className="md:hidden flex items-center gap-1">
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
          <div className="relative" ref={localeDropdownRef}>
            <button
              type="button"
              onClick={() => setIsLocaleDropdownOpen((v) => !v)}
              disabled={isPending}
              className="text-white p-2 focus:outline-none hover:opacity-80 transition-opacity disabled:opacity-60"
              aria-label={tLocale('label')}
              aria-expanded={isLocaleDropdownOpen}
              aria-haspopup="listbox"
            >
              <Globe className="w-5 h-5" />
            </button>
            {isLocaleDropdownOpen && (
              <ul
                className="absolute right-0 top-full mt-1 min-w-[140px] rounded-lg border border-gray-700 bg-black py-1 shadow-lg z-[60]"
                role="listbox"
              >
                {routing.locales.map((cur) => (
                  <li key={cur} role="option" aria-selected={cur === locale}>
                    <button
                      type="button"
                      onClick={() => {
                        startTransition(() => {
                          router.replace(
                            // @ts-expect-error -- pathname/params match current route
                            {pathname: i18nPathname, params},
                            {locale: cur as Locale}
                          );
                        });
                        setIsLocaleDropdownOpen(false);
                      }}
                      className={`block w-full text-left px-4 py-2.5 text-sm text-white hover:bg-gray-800 transition-colors ${
                        cur === locale ? 'bg-gray-800 font-medium' : ''
                      }`}
                    >
                      {tLocale('locale', {locale: cur.replaceAll('-', '_')})}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
