// App.js
import React, { useEffect, useRef, useState } from 'react';

// Custom hook for scroll reveal animation
const useScrollReveal = () => {
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOnScroll = () => {
      revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
          element.classList.add('active');
        }
      });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
    
    return () => window.removeEventListener('scroll', revealOnScroll);
  }, []);
};

// Custom hook for window resize handling
const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

// Global Styles Component
const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Comic Neue', 'Comic Sans MS', 'Comic Sans', cursive !important;
      }
      
      body {
        background: #f5f7fa;
        color: #111;
        overflow-x: hidden;
      }
      
      .reveal {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s ease;
      }
      
      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }
      
      .service-card:hover .service-image img {
        transform: scale(1.1);
      }
      
      .portfolio-item:hover .portfolio-image {
        transform: scale(1.1);
      }
      
      .portfolio-item:hover .portfolio-overlay {
        opacity: 1;
      }
      
      .bottom-nav-item:hover {
        background-color: rgba(255, 255, 255, 0.25) !important;
      }
      
      .social-link:hover {
        background: #ff3366;
        transform: translateY(-3px);
      }
      
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-18px); }
      }
      
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      
      .container {
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 20px;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
};

// Header Component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 992;
  const isMobileDropdown = width <= 768;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileDropdown = (e) => {
    if (isMobileDropdown) {
      e.preventDefault();
      setMobileDropdownOpen(!mobileDropdownOpen);
    }
  };

  const closeMobileDropdown = () => {
    setMobileDropdownOpen(false);
  };

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  useEffect(() => {
    if (mobileDropdownOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileDropdownOpen]);

  const headerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '1in',
    zIndex: 1000,
    padding: 0,
    background: '#ffffff',
    borderBottom: '2px solid #e5e7eb',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const headerContainerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '1400px',
    height: '100%',
    margin: '0 auto',
    padding: '0 20px',
  };

  const logoSyles = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    height: '100%',
    padding: '0 15px',
    backgroundColor: '#ffffff',
    width: 'auto',
    minWidth: '240px',
    maxWidth: '300px',
    position: 'relative',
    zIndex: 1001,
    borderRight: '2px solid #e5e7eb',
    flexShrink: 0,
  };

  const logoImgStyles = {
    height: '0.7in',
    width: 'auto',
    maxWidth: '1.2in',
    marginRight: '10px',
    objectFit: 'contain',
    transform: 'scale(1.2)',
    transformOrigin: 'left center',
    filter: 'brightness(1.1) contrast(1.1)',
  };

  const logoTaglineStyles = {
    fontSize: '14px',
    fontWeight: 600,
    color: '#4b5563',
    whiteSpace: 'nowrap',
    letterSpacing: '0.8px',
    textTransform: 'uppercase',
    padding: '6px 10px',
    background: '#f8fafc',
    borderRadius: '6px',
    borderLeft: '2px solid #e5e7eb',
    marginLeft: '8px',
    fontFamily: "'Comic Neue', 'Comic Sans MS', 'Comic Sans', cursive !important",
    flexShrink: 0,
  };

  const navStyles = {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    flexGrow: 1,
    background: '#ff1493',
    padding: 0,
    position: 'relative',
    borderRight: '2px solid rgba(255,255,255,0.3)',
    minWidth: 0,
  };

  const navBlueSectionStyles = {
    position: 'absolute',
    top: 0,
    right: 0,
    width: '30%',
    height: '100%',
    background: '#2563eb',
    zIndex: 1,
    borderLeft: '2px solid rgba(255,255,255,0.3)',
  };

  const navUlStyles = {
    display: 'flex',
    listStyle: 'none',
    height: '100%',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    position: 'relative',
    zIndex: 2,
    padding: '0 10px',
    margin: 0,
    flexWrap: 'nowrap',
  };

  const navLinkStyles = {
    color: '#ffffff',
    textDecoration: 'none',
    fontWeight: 700,
    fontSize: '14px',
    transition: 'all 0.3s ease',
    padding: '10px 12px',
    display: 'flex',
    alignItems: 'center',
    borderRadius: '6px',
    textShadow: '1px 1px 3px rgba(0,0,0,0.8)',
    letterSpacing: '0.5px',
    background: 'transparent',
    border: 'none',
    textAlign: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
  };

  const dropdownContentStyles = {
    display: 'none',
    position: 'absolute',
    background: '#ff1493',
    minWidth: '200px',
    padding: '8px 0',
    borderRadius: '8px',
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
    zIndex: 1001,
    border: '1px solid rgba(255,255,255,0.3)',
  };

  const mobileTopHeaderStyles = {
    display: isMobile ? 'flex' : 'none',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '1in',
    background: '#ffffff',
    zIndex: 1001,
    padding: '0 15px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: '2px solid #e5e7eb',
  };

  const mobileNavMenuStyles = {
    display: mobileMenuOpen ? 'block' : 'none',
    position: 'fixed',
    top: '1in',
    left: 0,
    width: '100%',
    background: '#ffffff',
    zIndex: 1000,
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    maxHeight: mobileMenuOpen ? '400px' : '0',
    overflow: 'hidden',
    transition: 'max-height 0.4s ease, padding 0.3s ease',
    padding: mobileMenuOpen ? '15px 0' : '0',
  };

  const bottomNavStyles = {
    display: isMobile ? 'flex' : 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '85px',
    background: 'linear-gradient(135deg, #ff1493, #2563eb)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: '0 -4px 20px rgba(0,0,0,0.4)',
    zIndex: 999,
    padding: '10px 5px',
    borderTop: '2px solid rgba(255,255,255,0.2)',
  };

  const bottomNavItemsStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    listStyle: 'none',
    padding: '0 5px',
    margin: 0,
    width: '100%',
    height: '100%',
  };

  const mobileDropupContentStyles = {
    position: 'fixed',
    bottom: '60px',
    left: '16px',
    right: '16px',
    background: 'white',
    zIndex: 1001,
    display: 'flex',
    flexDirection: 'column',
    opacity: mobileDropdownOpen ? 1 : 0,
    visibility: mobileDropdownOpen ? 'visible' : 'hidden',
    transform: mobileDropdownOpen ? 'translateY(0)' : 'translateY(20px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    borderRadius: '16px 16px 0 0',
    boxShadow: '0 -10px 30px rgba(0,0,0,0.15)',
    maxHeight: '70vh',
    overflow: 'hidden',
  };

  const dropupBackdropStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: '60px',
    background: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    opacity: mobileDropdownOpen ? 1 : 0,
    visibility: mobileDropdownOpen ? 'visible' : 'hidden',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(3px)',
  };

  return (
    <>
      <GlobalStyles />
      <header style={headerStyles}>
        <div style={headerContainerStyles}>
          <a href="/" style={logoSyles}>
            <img 
              src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp" 
              alt="Istazz Media Logo"
              loading="eager"
              style={logoImgStyles}
            />
            <div style={logoTaglineStyles}>creative simplicity</div>
          </a>
          
          <nav style={navStyles}>
            <div style={navBlueSectionStyles}></div>
            <ul style={navUlStyles}>
              <li><a href="/" style={navLinkStyles}>Home</a></li>
              <li 
                style={{ position: 'relative' }}
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <a href="/services" style={{ ...navLinkStyles, backgroundColor: 'rgba(255,255,255,0.3)' }}>Services <i className="fas fa-chevron-down"></i></a>
                {dropdownOpen && (
                  <div style={dropdownContentStyles}>
                    <a href="/design" style={{ display: 'block', padding: '10px 15px', color: '#ffffff', textDecoration: 'none' }}>Branding</a>
                    <a href="/events" style={{ display: 'block', padding: '10px 15px', color: '#ffffff', textDecoration: 'none' }}>Events</a>
                    <a href="/production" style={{ display: 'block', padding: '10px 15px', color: '#ffffff', textDecoration: 'none' }}>Production</a>
                    <a href="/prandmediarelations" style={{ display: 'block', padding: '10px 15px', color: '#ffffff', textDecoration: 'none' }}>PR & Media Relations</a>
                    <a href="/consultation" style={{ display: 'block', padding: '10px 15px', color: '#ffffff', textDecoration: 'none' }}>Consultation</a>
                  </div>
                )}
              </li>
              <li><a href="/ourwork" style={navLinkStyles}>Our Work</a></li>
              <li><a href="/ourclients" style={navLinkStyles}>Clients</a></li>
              <li><a href="/aboutus" style={navLinkStyles}>About Us</a></li>
              <li><a href="/contactus" style={navLinkStyles}>Contact</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <div style={mobileTopHeaderStyles}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 0, overflow: 'hidden' }}>
          <a href="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', padding: '5px 0', flex: 1 }}>
            <img 
              src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp" 
              alt="Istazz Media Logo"
              loading="eager"
              style={{ height: '0.65in', width: 'auto', maxWidth: '1.1in', objectFit: 'contain', transform: 'scale(1.2)', transformOrigin: 'left center', filter: 'brightness(1.1) contrast(1.1)', flexShrink: 0 }}
            />
            <div style={{ fontSize: '12px', fontWeight: 600, color: '#4b5563', marginLeft: '10px', whiteSpace: 'nowrap', letterSpacing: '0.7px', textTransform: 'uppercase', padding: '4px 8px', background: '#f8fafc', borderRadius: '4px', borderLeft: '2px solid #e5e7eb', flexShrink: 0 }}>creative simplicity</div>
          </a>
        </div>
        <button 
          onClick={toggleMobileMenu}
          style={{ background: 'none', border: 'none', fontSize: '22px', color: '#374151', cursor: 'pointer', padding: '8px', borderRadius: '4px', flexShrink: 0, marginLeft: '10px' }}
        >
          <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>

      <div style={mobileNavMenuStyles}>
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ borderBottom: '1px solid #f3f4f6' }}><a href="/" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', textDecoration: 'none', color: '#374151', fontWeight: 500, fontSize: '15px' }}><i className="fas fa-home" style={{ marginRight: '12px', width: '20px', color: '#ff1493' }}></i> Home</a></li>
          <li style={{ borderBottom: '1px solid #f3f4f6' }}><a href="/services" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', textDecoration: 'none', color: '#374151', fontWeight: 500, fontSize: '15px' }}><i className="fas fa-cogs" style={{ marginRight: '12px', width: '20px', color: '#ff1493' }}></i> Services</a></li>
          <li style={{ borderBottom: '1px solid #f3f4f6' }}><a href="/ourwork" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', textDecoration: 'none', color: '#374151', fontWeight: 500, fontSize: '15px' }}><i className="fas fa-briefcase" style={{ marginRight: '12px', width: '20px', color: '#ff1493' }}></i> Our Work</a></li>
          <li style={{ borderBottom: '1px solid #f3f4f6' }}><a href="/ourclients" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', textDecoration: 'none', color: '#374151', fontWeight: 500, fontSize: '15px' }}><i className="fas fa-users" style={{ marginRight: '12px', width: '20px', color: '#ff1493' }}></i> Clients</a></li>
          <li style={{ borderBottom: '1px solid #f3f4f6' }}><a href="/aboutus" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', textDecoration: 'none', color: '#374151', fontWeight: 500, fontSize: '15px' }}><i className="fas fa-info-circle" style={{ marginRight: '12px', width: '20px', color: '#ff1493' }}></i> About Us</a></li>
          <li style={{ borderBottom: '1px solid #f3f4f6' }}><a href="/contactus" onClick={closeMobileMenu} style={{ display: 'flex', alignItems: 'center', padding: '14px 20px', textDecoration: 'none', color: '#374151', fontWeight: 500, fontSize: '15px' }}><i className="fas fa-envelope" style={{ marginRight: '12px', width: '20px', color: '#ff1493' }}></i> Contact</a></li>
        </ul>
      </div>

      <nav style={bottomNavStyles}>
        <ul style={bottomNavItemsStyles}>
          <li><a href="/" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textDecoration: 'none', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '6px 3px', borderRadius: '8px', flex: 1, textAlign: 'center' }}><svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', marginBottom: '4px', fill: '#ffffff' }}><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><span>Home</span></a></li>
          <li style={{ position: 'relative', listStyle: 'none', height: '100%', display: 'flex', alignItems: 'center' }}>
            <a 
              href="/services" 
              onClick={toggleMobileDropdown}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', padding: '8px 12px', textDecoration: 'none', color: '#ffffff', transition: 'all 0.3s ease', height: '100%', minWidth: '60px', position: 'relative', zIndex: 100, background: 'transparent' }}
            >
              <svg viewBox="0 0 24 24" style={{ width: '24px', height: '24px', fill: '#ffffff' }}><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
              <span>Services</span>
            </a>
            <div style={mobileDropupContentStyles}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 16px 16px', borderBottom: '1px solid #eee', background: 'white' }}>
                <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 600, color: '#333' }}>Our Services</h4>
                <button onClick={closeMobileDropdown} style={{ background: 'none', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#666' }}><svg width="16" height="16" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/></svg></button>
              </div>
              <div style={{ padding: '8px 16px', overflowY: 'auto', flex: 1 }}>
                <a href="/design" onClick={closeMobileDropdown} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', textDecoration: 'none', borderRadius: '12px', marginBottom: '8px', background: '#f8f9fa', color: '#333' }}><span style={{ fontSize: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,123,255,0.1)', borderRadius: '8px' }}>🎨</span><span>Branding</span></a>
                <a href="/events" onClick={closeMobileDropdown} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', textDecoration: 'none', borderRadius: '12px', marginBottom: '8px', background: '#f8f9fa', color: '#333' }}><span style={{ fontSize: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,123,255,0.1)', borderRadius: '8px' }}>🎪</span><span>Events</span></a>
                <a href="/production" onClick={closeMobileDropdown} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', textDecoration: 'none', borderRadius: '12px', marginBottom: '8px', background: '#f8f9fa', color: '#333' }}><span style={{ fontSize: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,123,255,0.1)', borderRadius: '8px' }}>🎬</span><span>Production</span></a>
                <a href="/prandmediarelations" onClick={closeMobileDropdown} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', textDecoration: 'none', borderRadius: '12px', marginBottom: '8px', background: '#f8f9fa', color: '#333' }}><span style={{ fontSize: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,123,255,0.1)', borderRadius: '8px' }}>📰</span><span>PR & Media Relations</span></a>
                <a href="/consultation" onClick={closeMobileDropdown} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', textDecoration: 'none', borderRadius: '12px', marginBottom: '8px', background: '#f8f9fa', color: '#333' }}><span style={{ fontSize: '20px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,123,255,0.1)', borderRadius: '8px' }}>💻</span><span>Consultation</span></a>
              </div>
              <div style={{ padding: '16px', borderTop: '1px solid #eee', background: 'white' }}>
                <a href="/services" onClick={closeMobileDropdown} style={{ display: 'block', textAlign: 'center', padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', textDecoration: 'none', borderRadius: '12px', fontWeight: 500 }}>View All Services →</a>
              </div>
            </div>
            <div style={dropupBackdropStyles} onClick={closeMobileDropdown}></div>
          </li>
          <li><a href="/ourwork" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textDecoration: 'none', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '6px 3px', borderRadius: '8px', flex: 1, textAlign: 'center' }}><svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', marginBottom: '4px', fill: '#ffffff' }}><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/></svg><span>Our Work</span></a></li>
          <li><a href="/ourclients" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textDecoration: 'none', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '6px 3px', borderRadius: '8px', flex: 1, textAlign: 'center' }}><svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', marginBottom: '4px', fill: '#ffffff' }}><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg><span>Clients</span></a></li>
          <li><a href="/contactus" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textDecoration: 'none', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '6px 3px', borderRadius: '8px', flex: 1, textAlign: 'center' }}><svg viewBox="0 0 24 24" style={{ width: '22px', height: '22px', marginBottom: '4px', fill: '#ffffff' }}><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span>Contact</span></a></li>
          <li><a href="/aboutus" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', textDecoration: 'none', color: '#ffffff', fontSize: '12px', fontWeight: 700, padding: '6px 3px', borderRadius: '8px', flex: 1, textAlign: 'center' }}><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '22px', height: '22px', marginBottom: '4px', fill: '#ffffff' }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span>About</span></a></li>
        </ul>
      </nav>
    </>
  );
};

// Hero Section Component - Mobile: image background, Desktop: video background
// Hero Section Component - Mobile: image background, Desktop: video background
const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const mobileBackgroundImage =
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1778591270/ChatGPT_Image_May_12_2026_04_07_16_PM_ezt41n.png";

  const videoUrl =
    "https://res.cloudinary.com/dekdxx6yx/video/upload/v1778607025/homescreenvideo_h282qv.mp4";

  useEffect(() => {
    const heroTagline = document.querySelector(".hero-tagline");
    const heroDescription = document.querySelector(".hero-description");
    const ctaButton = document.querySelector(".hero .cta-button");

    heroTagline?.classList.add("reveal");
    heroDescription?.classList.add("reveal");
    ctaButton?.classList.add("reveal");

    if (!isMobile) {
      const video = document.createElement("video");
      video.src = videoUrl;
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;

      const handleReady = () => {
        setVideoLoaded(true);
        videoRef.current?.play().catch(() => {});
      };

      const handleError = () => {
        setVideoError(true);
      };

      video.addEventListener("canplaythrough", handleReady);
      video.addEventListener("error", handleError);
      video.load();

      return () => {
        video.removeEventListener("canplaythrough", handleReady);
        video.removeEventListener("error", handleError);
        video.src = "";
      };
    }
  }, [isMobile]);

  const heroStyles = {
    height: "100vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  };

  const mobileBgStyles = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    backgroundImage: `url(${mobileBackgroundImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
  };

  const heroOverlayStyles = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.75))",
    zIndex: 1,
  };

  const heroContentStyles = {
    textAlign: "center",
    maxWidth: "800px",
    padding: "0 20px",
    position: "relative",
    zIndex: 2,
    color: "white",
  };

  // 🔥 REDUCED TITLE SIZE
  const heroTaglineStyles = {
    fontSize: isMobile ? "20px" : "38px",
    fontWeight: 700,
    marginBottom: "18px",
    lineHeight: 1.2,
    color: "white",
    textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
  };

  // 🔥 REDUCED DESCRIPTION SIZE
  const heroDescriptionStyles = {
    fontSize: isMobile ? "12px" : "15px",
    marginBottom: "32px",
    lineHeight: 1.6,
    color: "rgba(255,255,255,0.92)",
  };

  const ctaButtonStyles = {
    display: "inline-block",
    padding: isMobile ? "9px 22px" : "13px 34px",
    background: "linear-gradient(135deg, #ff3366, #3366ff)",
    color: "#fff",
    textDecoration: "none",
    fontWeight: 600,
    fontSize: isMobile ? "12px" : "15px",
    borderRadius: "30px",
    transition: "all 0.3s ease",
    boxShadow: "0 5px 15px rgba(255,51,102,0.3)",
    cursor: "pointer",
  };

  const logoStyles = {
    position: "absolute",
    top: isMobile ? "70px" : "120px",
    left: "50%",
    transform: "translateX(-50%)",
    width: isMobile ? "95px" : "170px",
    zIndex: 15,
  };

  return (
    <section style={heroStyles}>
      {isMobile ? (
        <div style={mobileBgStyles} />
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
              opacity: videoLoaded ? 1 : 0,
              transition: "opacity 0.6s ease",
            }}
            onCanPlay={() => setVideoLoaded(true)}
            onError={() => setVideoError(true)}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>

          {videoError && <div style={mobileBgStyles} />}
        </>
      )}

      <div style={heroOverlayStyles}></div>

      <img
        src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp"
        alt="Istazz Logo"
        style={logoStyles}
        loading="eager"
      />

      <div style={heroContentStyles}>
        <h1 className="hero-tagline" style={heroTaglineStyles}>
          Your Vision, Elevated, Experience More
        </h1>

        <p className="hero-description" style={heroDescriptionStyles}>
          We transform ideas into immersive visual experiences through cinematic
          storytelling, innovative design, and cutting-edge production.
        </p>

        <a href="/services" className="cta-button" style={ctaButtonStyles}>
          Dive In to The Istazz Show
        </a>
      </div>
    </section>
  );
};

// What We Do Section Component
const WhatWeDo = () => {
  useScrollReveal();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  
  const services = [
    { title: "Branding", desc: "Crafting unique brand identities that connect emotionally with your audience and position you for long-term success.", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768501052/IMG-20250212-WA0231_tfg85a.jpg", link: "/design" },
    { title: "Events", desc: "Designing and executing unforgettable events that captivate audiences and create lasting impressions.", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768569324/IMG-20250212-WA0210_k4csq7.jpg", link: "/eventbranding" },
    { title: "Production", desc: "High-quality content production including video, photography, and digital media storytelling.", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768569607/IMG-20250212-WA0167_gypr3g.jpg", link: "/istazzproduction" },
    { title: "PR & Media", desc: "Strategic public relations and media engagement to strengthen brand credibility and visibility.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", link: "/prandmediarelations" },
    { title: "Business Consultancy", desc: "Data-driven consultancy helping businesses scale, innovate, and adapt in the digital economy.", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80", link: "/consultation" }
  ];

  const sectionStyles = {
    padding: '100px 0',
    background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 100%)',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const sectionTitleStyles = {
    fontSize: isMobile ? '2.4rem' : '3rem',
    fontWeight: 800,
    textAlign: 'center',
    marginBottom: '70px',
    background: 'linear-gradient(135deg, #ff1493, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
  
  const servicesGridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '280px' : '300px'}, 1fr))`,
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };
  
  const serviceCardStyles = {
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '22px',
    overflow: 'hidden',
    transition: 'all 0.4s ease',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255,20,147,0.2)',
    textDecoration: 'none',
    color: 'inherit',
    cursor: 'pointer',
  };
  
  const serviceImageStyles = {
    height: isMobile ? '190px' : '220px',
    overflow: 'hidden',
  };
  
  const serviceImgStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.6s ease',
  };
  
  const serviceContentStyles = {
    padding: '30px',
    textAlign: 'center',
  };
  
  const serviceTitleStyles = {
    fontSize: '1.6rem',
    fontWeight: 700,
    marginBottom: '15px',
    background: 'linear-gradient(135deg, #ff1493, #ffffff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
  
  const serviceDescStyles = {
    color: '#e0e0e0',
    fontSize: '1rem',
    lineHeight: 1.7,
  };
  
  const floatingStyles = {
    position: 'absolute',
    borderRadius: '50%',
    background: 'rgba(255,20,147,0.2)',
    animation: 'float 6s ease-in-out infinite',
  };
  
  return (
    <section style={sectionStyles}>
      <div style={{ ...floatingStyles, width: '80px', height: '80px', top: '15%', left: '10%' }}></div>
      <div style={{ ...floatingStyles, width: '120px', height: '120px', bottom: '20%', right: '8%' }}></div>
      <div style={{ ...floatingStyles, width: '60px', height: '60px', top: '55%', left: '5%' }}></div>
      <div className="container">
        <h2 className="section-title reveal" style={sectionTitleStyles}>What We Do</h2>
        <div style={servicesGridStyles}>
          {services.map((service, index) => (
            <a href={service.link} key={index} className="service-card reveal" style={serviceCardStyles}>
              <div style={serviceImageStyles} className="service-image">
                <img src={service.img} alt={service.title} loading="lazy" style={serviceImgStyles} className="service-image-img" />
              </div>
              <div style={serviceContentStyles}>
                <h3 style={serviceTitleStyles}>{service.title}</h3>
                <p style={serviceDescStyles}>{service.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Portfolio Section Component
const Portfolio = () => {
  useScrollReveal();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  
  const projects = [
    { title: "Airtel End year christmas party 2025", category: "Event Branding", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1777130979/WhatsApp_Image_2026-04-21_at_6.59.39_PM_m2sjaj.jpg", link: "/ourwork#corporate-rebrand" },
    { title: "Mabingwa awards SN1 2026", category: "Event Branding", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1776960578/istazz_mosse_image_1_wasmjg.jpg", link: "/ourwork#summer-festival" },
    { title: "Product Launch Campaign", category: "Production", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768501037/IMG-20250212-WA0186_svfc9z.jpg", link: "/ourwork#product-launch" },
    { title: "Premium Event Sound & Lighting", category: "Crystal-Clear Audio • Dynamic Lighting • Unforgettable Experiences", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762590733/Furniture_Decor_ife5xo.webp", link: "/ourwork#awareness-campaign" },
    { title: "Professional Audio Equipment Setup", category: "High-quality speakers, mixers, and sound systems", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762589749/Audio_Equipment_ekew8h.jpg", link: "/ourwork#business-strategy" },
    { title: "Offset Printing Solutions", category: "High-quality, large-scale printing", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762582817/Offset_Printing_npanov.jpg", link: "/ourwork#digital-transformation" },
    { title: "Brand Launch Events", category: "Creative event experiences", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762588497/Brand_Launch_Events_shot3r.png", link: "/ourwork#consultancy" },
    { title: "UV Printing Solutions", category: "Advanced UV printing technology", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762582813/UV_Printing_z01ocw.webp", link: "/ourwork#consultancy" },
    { title: "Event Setup & Production", category: "Professional event setup services", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768501053/IMG-20250212-WA0277_gbl1wx.jpg", link: "/ourwork#consultancy" }
  ];

  const sectionStyles = {
    padding: '100px 0',
    backgroundColor: '#fff',
  };
  
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };
  
  const portfolioHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    flexWrap: 'wrap',
  };
  
  const sectionTitleStyles = {
    fontSize: isMobile ? '28px' : '36px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
    color: '#333',
  };
  
  const viewAllBtnStyles = {
    display: 'inline-block',
    padding: '12px 30px',
    background: 'transparent',
    color: '#ff3366',
    border: '2px solid #ff3366',
    borderRadius: '30px',
    fontWeight: 600,
    fontSize: '16px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  };
  
  const portfolioGridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fill, minmax(${isMobile ? '280px' : '300px'}, 1fr))`,
    gap: '30px',
    marginBottom: '40px',
  };
  
  const portfolioItemStyles = {
    position: 'relative',
    borderRadius: '10px',
    overflow: 'hidden',
    height: '300px',
    cursor: 'pointer',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    textDecoration: 'none',
    color: 'inherit',
    display: 'block',
  };
  
  const portfolioImageStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease',
  };
  
  const portfolioOverlayStyles = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.7))',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    padding: '30px',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  };
  
  const portfolioTitleStyles = {
    fontSize: '22px',
    marginBottom: '10px',
    color: '#fff',
  };
  
  const portfolioCategoryStyles = {
    fontSize: '14px',
    color: '#ff3366',
    fontWeight: 500,
  };
  
  return (
    <section style={sectionStyles}>
      <div className="container" style={containerStyles}>
        <div style={portfolioHeaderStyles}>
          <h2 className="section-title reveal" style={sectionTitleStyles}>Featured Projects</h2>
          <a href="/ourwork" className="view-all-btn" style={viewAllBtnStyles}>View All Projects</a>
        </div>
        <div style={portfolioGridStyles}>
          {projects.map((project, index) => (
            <a href={project.link} key={index} className="portfolio-item reveal" style={portfolioItemStyles}>
              <img src={project.img} alt={project.title} className="portfolio-image" loading="lazy" style={portfolioImageStyles} />
              <div className="portfolio-overlay" style={portfolioOverlayStyles}>
                <h3 style={portfolioTitleStyles}>{project.title}</h3>
                <p style={portfolioCategoryStyles}>{project.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

// Gallery Section Component
const Gallery = () => {
  useScrollReveal();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  
  const galleryImages = [
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1777130979/WhatsApp_Image_2026-04-21_at_6.59.39_PM_m2sjaj.jpg",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1776960578/istazz_mosse_image_1_wasmjg.jpg",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768501037/IMG-20250212-WA0186_svfc9z.jpg",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762590733/Furniture_Decor_ife5xo.webp",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762589749/Audio_Equipment_ekew8h.jpg",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762582817/Offset_Printing_npanov.jpg",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762588497/Brand_Launch_Events_shot3r.png",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1762582813/UV_Printing_z01ocw.webp",
    "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768501053/IMG-20250212-WA0277_gbl1wx.jpg"
  ];

  const sectionStyles = {
    padding: '80px 0',
    backgroundColor: '#f8f9fa',
    overflow: 'hidden',
  };
  
  const sectionTitleStyles = {
    fontSize: isMobile ? '28px' : '36px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
    color: '#333',
  };
  
  const galleryContainerStyles = {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  };
  
  const galleryTrackStyles = {
    display: 'flex',
    gap: '20px',
    animation: 'scroll 30s linear infinite',
    width: 'max-content',
  };
  
  const galleryItemStyles = {
    flex: '0 0 auto',
    width: isMobile ? '240px' : '300px',
    height: isMobile ? '160px' : '200px',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
  };
  
  const galleryImgStyles = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };
  
  return (
    <section style={sectionStyles}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 className="section-title reveal" style={sectionTitleStyles}>Our Work in Action</h2>
        <div style={galleryContainerStyles}>
          <div style={galleryTrackStyles}>
            {galleryImages.map((img, index) => (
              <div className="gallery-item" key={index} style={galleryItemStyles}>
                <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" style={galleryImgStyles} />
              </div>
            ))}
            {galleryImages.map((img, index) => (
              <div className="gallery-item" key={`dup-${index}`} style={galleryItemStyles}>
                <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" style={galleryImgStyles} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Stats Section Component
const Stats = () => {
  useScrollReveal();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  
  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "16", label: "Years Experience" }
  ];

  const sectionStyles = {
    padding: '80px 0',
    background: 'linear-gradient(135deg, #ff3366, #3366ff)',
    color: '#fff',
  };
  
  const statsGridStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '200px' : '250px'}, 1fr))`,
    gap: '30px',
    textAlign: 'center',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };
  
  const statNumberStyles = {
    fontSize: isMobile ? '36px' : '48px',
    fontWeight: 700,
    marginBottom: '10px',
  };
  
  const statLabelStyles = {
    fontSize: isMobile ? '16px' : '18px',
    opacity: 0.9,
  };
  
  return (
    <section style={sectionStyles}>
      <div style={statsGridStyles}>
        {stats.map((stat, index) => (
          <div className="stat-item reveal" key={index}>
            <div style={statNumberStyles}>{stat.number}</div>
            <div style={statLabelStyles}>{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Testimonials Section Component
const Testimonials = () => {
  useScrollReveal();
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  
  const testimonials = [
    { text: "Istazz Media transformed our brand identity completely. Their attention to detail and creative approach exceeded our expectations.", author: "Sarah Johnson", role: "Marketing Director, Safaricom PLC" },
    { text: "The event management was flawless. From conceptualization to execution, Istazz delivered beyond our imagination.", author: "James Mwangi", role: "CEO, Equity Bank" },
    { text: "Their production quality is exceptional. Our TV commercials have significantly boosted our brand recognition.", author: "Mary Wambui", role: "Brand Manager, Kenya Airways" },
    { text: "The PR campaign they developed for us generated positive media coverage across all major platforms.", author: "David Ochieng", role: "Communications Director, KCB Group" },
    { text: "Their strategic consultancy helped us navigate a difficult rebranding process with minimal disruption.", author: "Grace Atieno", role: "Managing Director, Nation Media Group" }
  ];

  const sectionStyles = {
    padding: '100px 0',
    backgroundColor: '#fff',
    overflow: 'hidden',
  };
  
  const sectionTitleStyles = {
    fontSize: isMobile ? '28px' : '36px',
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: '60px',
    position: 'relative',
    color: '#333',
  };
  
  const testimonialsTrackStyles = {
    display: 'flex',
    gap: '40px',
    animation: 'scroll 40s linear infinite',
    width: 'max-content',
  };
  
  const testimonialStyles = {
    flex: '0 0 auto',
    width: isMobile ? '320px' : '400px',
    background: '#f8f9fa',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
  };
  
  const testimonialTextStyles = {
    fontSize: '16px',
    fontStyle: 'italic',
    lineHeight: 1.6,
    marginBottom: '20px',
    color: '#666',
  };
  
  const testimonialAuthorStyles = {
    fontWeight: 600,
    fontSize: '18px',
    color: '#333',
  };
  
  const testimonialRoleStyles = {
    fontSize: '14px',
    opacity: 0.7,
    color: '#666',
  };
  
  return (
    <section style={sectionStyles}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 className="section-title reveal" style={sectionTitleStyles}>What Kenyan Companies Say</h2>
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <div style={testimonialsTrackStyles}>
            {testimonials.map((testimonial, index) => (
              <div className="testimonial" key={index} style={testimonialStyles}>
                <p style={testimonialTextStyles}>"{testimonial.text}"</p>
                <p style={testimonialAuthorStyles}>{testimonial.author}</p>
                <p style={testimonialRoleStyles}>{testimonial.role}</p>
              </div>
            ))}
            {testimonials.map((testimonial, index) => (
              <div className="testimonial" key={`dup-${index}`} style={testimonialStyles}>
                <p style={testimonialTextStyles}>"{testimonial.text}"</p>
                <p style={testimonialAuthorStyles}>{testimonial.author}</p>
                <p style={testimonialRoleStyles}>{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// CTA Section Component
const CTASection = () => {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  
  useEffect(() => {
    const ctaTitle = document.querySelector('.cta-title');
    const ctaDescription = document.querySelector('.cta-description');
    const ctaButton = document.querySelector('.cta-section .cta-button.white');
    
    if (ctaTitle) ctaTitle.classList.add('reveal');
    if (ctaDescription) ctaDescription.classList.add('reveal');
    if (ctaButton) ctaButton.classList.add('reveal');
  }, []);

  const sectionStyles = {
    padding: '100px 0',
    textAlign: 'center',
    background: 'linear-gradient(135deg, #ff3366, #3366ff)',
    color: '#fff',
  };
  
  const ctaTitleStyles = {
    fontSize: isMobile ? '28px' : '36px',
    marginBottom: '20px',
  };
  
  const ctaDescriptionStyles = {
    fontSize: isMobile ? '16px' : '18px',
    maxWidth: '600px',
    margin: '0 auto 40px',
    opacity: 0.9,
  };
  
  const ctaButtonStyles = {
    display: 'inline-block',
    padding: isMobile ? '12px 30px' : '14px 35px',
    background: '#fff',
    color: '#ff3366',
    textDecoration: 'none',
    borderRadius: '30px',
    fontWeight: 600,
    fontSize: isMobile ? '14px' : '16px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };
  
  return (
    <section className="cta-section" style={sectionStyles}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
        <h2 className="cta-title reveal" style={ctaTitleStyles}>Let's Create Together</h2>
        <p className="cta-description reveal" style={ctaDescriptionStyles}>Ready to elevate your brand and create unforgettable experiences? Get in touch with our team today.</p>
        <a href="contactus.html" className="cta-button white" style={ctaButtonStyles}>Contact Us</a>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: '' });
    }, 3000);
  };

  const footerStyles = {
    background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    color: '#ffffff',
    padding: '60px 0 0',
    position: 'relative',
    overflow: 'hidden',
  };
  
  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px',
  };
  
  const footerContentStyles = {
    display: 'grid',
    gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? '250px' : '300px'}, 1fr))`,
    gap: '40px',
    marginBottom: '50px',
  };
  
  const footerDescriptionStyles = {
    color: 'rgba(255,255,255,0.8)',
    lineHeight: 1.7,
    marginBottom: '25px',
    fontSize: '0.95rem',
  };
  
  const socialIconsStyles = {
    display: 'flex',
    gap: '12px',
    marginTop: '10px',
  };
  
  const socialLinkStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    color: 'white',
    transition: 'all 0.3s ease',
    fontSize: '1.1rem',
    textDecoration: 'none',
  };
  
  const footerLinksStyles = {
    listStyle: 'none',
    padding: 0,
  };
  
  const footerLinkStyles = {
    marginBottom: '12px',
  };
  
  const footerLinkAStyles = {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'flex-start',
    gap: '8px',
    fontSize: '0.95rem',
  };
  
  const footerBottomStyles = {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    padding: '25px 0',
  };
  
  const copyrightStyles = {
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.9rem',
    margin: 0,
  };
  
  const footerCreditsStyles = {
    textAlign: 'center',
    color: 'rgba(255,255,255,0.8)',
    fontSize: '0.85rem',
    marginTop: '15px',
  };
  
  const toastStyles = {
    position: 'fixed',
    top: '20px',
    right: '20px',
    background: 'white',
    color: '#333',
    padding: '15px 20px',
    borderRadius: '5px',
    boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    zIndex: 1000,
    transform: toast.visible ? 'translateX(0)' : 'translateX(150%)',
    transition: 'transform 0.3s ease',
    borderLeft: toast.type === 'success' ? '4px solid #28a745' : '4px solid #dc3545',
  };
  
  return (
    <footer style={footerStyles}>
      <div style={containerStyles}>
        <div style={footerContentStyles}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '15px', cursor: 'pointer', maxHeight: '50px' }}>
              <img src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp" alt="Istazz Media Logo" style={{ height: '90px', width: 'auto', objectFit: 'contain' }} loading="lazy" />
            </div>
            <p style={footerDescriptionStyles}>
              A uniquely structured media agency with an eye for excellence in branding, event management 
              and production solutions, all with an urge to exceed customer expectations.
              We are founded on a philosophy of 'Creative Simplicity' where we seek to always use new and 
              innovative techniques and solutions to meet the needs of our clients.
              Creativity is in our DNA.
            </p>
            <div>
              <h4 style={{ fontSize: '1rem', margin: '20px 0 15px', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Follow Us</h4>
              <div style={socialIconsStyles}>
                <a href="https://www.facebook.com/share/1DEnuTKxai/" style={socialLinkStyles} target="_blank" rel="noopener noreferrer" className="social-link"><i className="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/istazzmedia?igsh=MXVqbW9ydjk2M2hkYQ==" style={socialLinkStyles} target="_blank" rel="noopener noreferrer" className="social-link"><i className="bi bi-instagram"></i></a>
                <a href="#" style={socialLinkStyles} target="_blank" rel="noopener noreferrer" className="social-link"><i className="bi bi-twitter"></i></a>
                <a href="https://youtube.com/@istazzmedia-gig?si=HsHSVKgYco8G-lao" style={socialLinkStyles} target="_blank" rel="noopener noreferrer" className="social-link"><i className="bi bi-youtube"></i></a>
              </div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', position: 'relative', display: 'inline-block', fontWeight: 700 }}>Quick Links</h3>
            <ul style={footerLinksStyles}>
              <li style={footerLinkStyles}><a href="/" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Home</a></li>
              <li style={footerLinkStyles}><a href="/aboutus" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> About Us</a></li>
              <li style={footerLinkStyles}><a href="/services" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Services</a></li>
              <li style={footerLinkStyles}><a href="/ourwork" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Our Work</a></li>
              <li style={footerLinkStyles}><a href="/ourclients" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Our Clients</a></li>
              <li style={footerLinkStyles}><a href="/eventbranding" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Event Branding</a></li>
              <li style={footerLinkStyles}><a href="/prandmediarelations" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> PR & Media Relations</a></li>
              <li style={footerLinkStyles}><a href="/consultation" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Consultation</a></li>
              <li style={footerLinkStyles}><a href="/design" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Design</a></li>
              <li style={footerLinkStyles}><a href="/contactus" style={footerLinkAStyles}><i className="bi bi-chevron-right"></i> Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', position: 'relative', display: 'inline-block', fontWeight: 700 }}>Contact Info</h3>
            <ul style={footerLinksStyles}>
              <li style={footerLinkStyles}>
                <a href="#" style={footerLinkAStyles}>
                  <i className="bi bi-geo-alt"></i>
                  <span>Nairobi, Kenya<br /><small>Thome 1st Avenue, off Northern Bypass.</small></span>
                </a>
              </li>
              <li style={footerLinkStyles}>
                <a href="tel:+254725116708" style={footerLinkAStyles}>
                  <i className="bi bi-telephone"></i>
                  <span>+254 725 116 708<br /><small>24/7</small></span>
                </a>
              </li>
              <li style={footerLinkStyles}>
                <a href="mailto:info@istazzmedia.co.ke" style={footerLinkAStyles}>
                  <i className="bi bi-envelope"></i>
                  <span>info@istazzmedia.co.ke<br /><small>Email Us</small></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div style={footerBottomStyles}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', marginBottom: '15px' }}>
            <div style={copyrightStyles}>
              <p>&copy; 2026 Istazz Media. All rights reserved.</p>
            </div>
          </div>
          <div style={footerCreditsStyles}>
            <p>Designed by Istazz Media Team</p>
          </div>
        </div>
      </div>

      <div style={toastStyles}>
        <div>
          <i className={`bi bi-${toast.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
        </div>
        <div>{toast.message}</div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="App">
      <Header />
      <main>
        <Hero />
        <WhatWeDo />
        <Portfolio />
        <Gallery />
        <Stats />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default App;
