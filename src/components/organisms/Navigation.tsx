// File: /src/components/organisms/Navigation.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { Menu, X, ChevronDown } from 'lucide-react';
import styles from './Navigation.module.css';

interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { 
    label: 'Services', 
    href: '/services',
    submenu: [
      { label: 'Drainage Inspection', href: '/services/drainage' },
      { label: 'Thermal Detection', href: '/services/elphel' },
      { label: 'Anti-Drone Defense', href: '/services/anti-drone' }
    ]
  },
  { label: 'Technology', href: '/technology' },
  { label: 'Case Studies', href: '/case-studies' },
  { label: 'Contact', href: '/contact' }
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Animate nav items on mount
    gsap.fromTo(itemsRef.current,
      {
        opacity: 0,
        y: -20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out'
      }
    );
  }, []);

  // Magnetic hover effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 100) {
          const strength = (100 - distance) / 100;
          gsap.to(item, {
            x: x * strength * 0.3,
            y: y * strength * 0.3,
            duration: 0.3,
            ease: 'power2.out'
          });
        } else {
          gsap.to(item, {
            x: 0,
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    };

    const handleMouseLeave = () => {
      itemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.to(item, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out'
        });
      });
    };

    const nav = navRef.current;
    if (nav) {
      nav.addEventListener('mousemove', handleMouseMove);
      nav.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      if (nav) {
        nav.removeEventListener('mousemove', handleMouseMove);
        nav.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Animate mobile menu
    if (!isMobileMenuOpen) {
      gsap.fromTo('.mobile-menu-item',
        {
          opacity: 0,
          x: -50
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.4,
          stagger: 0.1,
          ease: 'power2.out'
        }
      );
    }
  };

  return (
    <nav 
      ref={navRef}
      className={`${styles.navigation} ${isScrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Deep Sky Solutions</span>
          <span className={styles.logoAccent}>AI</span>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navList}>
          {navItems.map((item, index) => (
            <li 
              key={item.href}
              ref={el => itemsRef.current[index] = el}
              className={styles.navItem}
              onMouseEnter={() => item.submenu && setActiveSubmenu(item.label)}
              onMouseLeave={() => setActiveSubmenu(null)}
            >
              <Link 
                href={item.href}
                className={`${styles.navLink} ${pathname === item.href ? styles.active : ''}`}
              >
                <span>{item.label}</span>
                {item.submenu && (
                  <ChevronDown 
                    size={16} 
                    className={`${styles.chevron} ${activeSubmenu === item.label ? styles.chevronActive : ''}`}
                  />
                )}
              </Link>
              
              {/* Submenu */}
              {item.submenu && (
                <div className={`${styles.submenu} ${activeSubmenu === item.label ? styles.submenuActive : ''}`}>
                  <div className={styles.submenuInner}>
                    {item.submenu.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={`${styles.submenuLink} ${pathname === subItem.href ? styles.active : ''}`}
                      >
                        <span className={styles.submenuIcon}>▸</span>
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Link href="/contact" className={styles.ctaButton}>
          <span>Request Demo</span>
          <div className={styles.ctaGlow} />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className={styles.mobileMenuToggle}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
        <ul className={styles.mobileNavList}>
          {navItems.map((item) => (
            <li key={item.href} className="mobile-menu-item">
              <Link
                href={item.href}
                className={`${styles.mobileNavLink} ${pathname === item.href ? styles.active : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
              {item.submenu && (
                <ul className={styles.mobileSubmenu}>
                  {item.submenu.map((subItem) => (
                    <li key={subItem.href}>
                      <Link
                        href={subItem.href}
                        className={`${styles.mobileSubmenuLink} ${pathname === subItem.href ? styles.active : ''}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
