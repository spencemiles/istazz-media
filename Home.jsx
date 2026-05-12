// App.js
import React, { useEffect, useRef, useState, useCallback } from 'react';
import './App.css';

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
    revealOnScroll(); // Initial check
    
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

// Header Component
const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { width } = useWindowSize();
  const isMobile = width <= 992;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  return (
    <>
      {/* Desktop Header */}
     <header className="desktop-header">
  <div className="header-container">
    <a href="index.html" className="logo">
      <img 
        src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp" 
        alt="Istazz Media Logo"
        loading="eager"
      />
      <div className="logo-tagline">creative simplicity</div>
    </a>
    
    <nav>
      <div className="nav-blue-section"></div>
      <ul className="nav-menu">
        <li><a href="index.html" className="active">Home</a></li>

        <li 
          className="dropdown"
          onMouseEnter={() => setDropdownOpen(true)}
          onMouseLeave={() => setDropdownOpen(false)}
        >
          <a href="services.html">Services <i className="fas fa-chevron-down"></i></a>

          {dropdownOpen && (
            <div className="dropdown-content">
              <a href="design.html">Branding</a>
              <a href="events.html">Events</a>
              <a href="production.html">Production</a>
              <a href="prandmediarelations.html">PR & Media Relations</a>
              <a href="consultation.html">Consultation</a>
            </div>
          )}
        </li>

        <li><a href="ourwork.html">Our Work</a></li>
        <li><a href="ourclients.html">Clients</a></li>
        <li><a href="aboutus.html">About Us</a></li>
        <li><a href="contactus.html">Contact</a></li>
      </ul>
    </nav>
  </div>
</header>

      {/* Mobile Top Header */}
      <div className="mobile-top-header">
        <div className="mobile-logo-container">
          <a href="/" className="mobile-logo">
            <img 
              src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp" 
              alt="Istazz Media Logo"
              loading="eager"
            />
            <div className="mobile-logo-tagline">creative simplicity</div>
          </a>
        </div>
        <button className="mobile-nav-toggle" onClick={toggleMobileMenu}>
          <i className={`fas fa-${mobileMenuOpen ? 'times' : 'bars'}`}></i>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <ul>
          <li><a href="/" onClick={closeMobileMenu}><i className="fas fa-home"></i> Home</a></li>
          <li><a href="/services" onClick={closeMobileMenu}><i className="fas fa-cogs"></i> Services</a></li>
          <li><a href="/ourwork" onClick={closeMobileMenu}><i className="fas fa-briefcase"></i> Our Work</a></li>
          <li><a href="/ourclients" onClick={closeMobileMenu}><i className="fas fa-users"></i> Clients</a></li>
          <li><a href="/aboutus" onClick={closeMobileMenu}><i className="fas fa-info-circle"></i> About Us</a></li>
          <li><a href="/contactus" onClick={closeMobileMenu}><i className="fas fa-envelope"></i> Contact</a></li>
        </ul>
      </div>

      {/* Mobile Bottom Navigation */}
      <nav className="bottom-nav">
        <ul className="bottom-nav-items">
          <li><a href="/" className="bottom-nav-item active"><svg viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg><span>Home</span></a></li>
          <li className="mobile-dropdown-item">
            <a href="/services" className="bottom-nav-item mobile-dropdown-trigger">
              <svg viewBox="0 0 24 24"><path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/></svg>
              <span>Services</span>
            </a>
          </li>
          <li><a href="/ourwork" className="bottom-nav-item"><svg viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zm-5-7l-3 3.72L9 13l-3 4h12l-4-5z"/></svg><span>Our Work</span></a></li>
          <li><a href="/ourclients" className="bottom-nav-item"><svg viewBox="0 0 24 24"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg><span>Clients</span></a></li>
          <li><a href="/contactus" className="bottom-nav-item"><svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg><span>Contact</span></a></li>
          <li><a href="/aboutus" className="bottom-nav-item"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span>About</span></a></li>
        </ul>
      </nav>
    </>
  );
};

// Hero Section Component with optimized video loading - shows poster image instantly, swaps to video when ready
const Hero = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [showPoster, setShowPoster] = useState(true);
  const videoRef = useRef(null);
  
  // Poster image URL - shows instantly on page load
  const posterImageUrl = "https://res.cloudinary.com/dekdxx6yx/image/upload/v1778591270/ChatGPT_Image_May_12_2026_04_07_16_PM_ezt41n.png";
  const videoUrl = "https://res.cloudinary.com/dekdxx6yx/video/upload/homescreenvideo_h282qv.mp4";
  
  useEffect(() => {
    // Reveal animations for hero content
    const heroTagline = document.querySelector('.hero-tagline');
    const heroDescription = document.querySelector('.hero-description');
    const ctaButton = document.querySelector('.hero .cta-button');
    
    if (heroTagline) heroTagline.classList.add('reveal');
    if (heroDescription) heroDescription.classList.add('reveal');
    if (ctaButton) ctaButton.classList.add('reveal');
    
    // Create a video element to preload in background
    const preloadVideo = document.createElement('video');
    preloadVideo.preload = 'auto';
    preloadVideo.src = videoUrl;
    preloadVideo.muted = true;
    
    // When video is fully loaded and ready to play
    const handleVideoReady = () => {
      console.log('Video fully loaded and ready');
      setVideoLoaded(true);
      
      // Small delay for smooth crossfade
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play()
            .then(() => {
              setShowPoster(false);
            })
            .catch(e => console.log('Autoplay prevented:', e));
        }
      }, 100);
    };
    
    const handleVideoCanPlay = () => {
      // Video has enough data to start playing
      if (preloadVideo.readyState >= 3) { // HAVE_FUTURE_DATA or HAVE_ENOUGH_DATA
        handleVideoReady();
      }
    };
    
    const handleVideoError = () => {
      console.error('Video failed to load');
      setVideoError(true);
      setShowPoster(false); // Hide poster if video fails
    };
    
    preloadVideo.addEventListener('canplaythrough', handleVideoReady);
    preloadVideo.addEventListener('canplay', handleVideoCanPlay);
    preloadVideo.addEventListener('error', handleVideoError);
    
    // Start loading video in background
    preloadVideo.load();
    
    // Cleanup
    return () => {
      preloadVideo.removeEventListener('canplaythrough', handleVideoReady);
      preloadVideo.removeEventListener('canplay', handleVideoCanPlay);
      preloadVideo.removeEventListener('error', handleVideoError);
      preloadVideo.src = '';
    };
  }, []);

  // Force hide poster when video is fully loaded and ready
  useEffect(() => {
    if (videoLoaded && videoRef.current) {
      const timer = setTimeout(() => {
        setShowPoster(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [videoLoaded]);
  
  return (
    <section className="hero">
      {/* Poster image - shows instantly on page load, hidden when video is ready */}
      <div 
        className={`hero-poster ${showPoster && !videoLoaded ? 'poster-visible' : 'poster-hidden'}`}
        style={{ backgroundImage: `url(${posterImageUrl})` }}
      />
      
      {/* Video element - starts hidden, fades in when loaded */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        className={`hero-video ${videoLoaded && !showPoster ? 'video-visible' : 'video-hidden'}`}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>
      
      {/* Fallback image if video fails */}
      {videoError && (
        <div 
          className="hero-fallback"
          style={{ backgroundImage: `url(${posterImageUrl})` }}
        />
      )}
      
      <div className="hero-overlay"></div>
      
      <img 
        src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp"
        alt="Istazz Logo"
        className="istazz-here-logo"
        loading="eager"
      />
      
      <div className="hero-content">
        <h1 className="hero-tagline">Your Vision, Elevated, Experience More</h1>
        <p className="hero-description">We transform ideas into immersive visual experiences through cinematic storytelling, innovative design, and cutting-edge production.</p>
        <a href="/services" className="cta-button">Dive In to The Istazz Show</a>
      </div>
    </section>
  );
};

// What We Do Section Component
const WhatWeDo = () => {
  useScrollReveal();
  
  const services = [
    { title: "Branding", desc: "Crafting unique brand identities that connect emotionally with your audience and position you for long-term success.", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768501052/IMG-20250212-WA0231_tfg85a.jpg", link: "/design" },
    { title: "Events", desc: "Designing and executing unforgettable events that captivate audiences and create lasting impressions.", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768569324/IMG-20250212-WA0210_k4csq7.jpg", link: "/eventbranding" },
    { title: "Production", desc: "High-quality content production including video, photography, and digital media storytelling.", img: "https://res.cloudinary.com/dekdxx6yx/image/upload/v1768569607/IMG-20250212-WA0167_gypr3g.jpg", link: "/istazzproduction" },
    { title: "PR & Media", desc: "Strategic public relations and media engagement to strengthen brand credibility and visibility.", img: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80", link: "/prandmediarelations" },
    { title: "Business Consultancy", desc: "Data-driven consultancy helping businesses scale, innovate, and adapt in the digital economy.", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=800&q=80", link: "/consultation" }
  ];

  return (
    <section className="what-we-do">
      <div className="floating-element floating-1"></div>
      <div className="floating-element floating-2"></div>
      <div className="floating-element floating-3"></div>
      <div className="container">
        <h2 className="section-title reveal">What We Do</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <a href={service.link} key={index} className="service-card reveal">
              <div className="service-image">
                <img src={service.img} alt={service.title} loading="lazy" />
              </div>
              <div className="service-content">
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.desc}</p>
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

  return (
    <section className="portfolio">
      <div className="container">
        <div className="portfolio-header">
          <h2 className="section-title reveal">Featured Projects</h2>
          <a href="/ourwork" className="view-all-btn">View All Projects</a>
        </div>
        <div className="portfolio-grid">
          {projects.map((project, index) => (
            <a href={project.link} key={index} className="portfolio-item reveal">
              <img src={project.img} alt={project.title} className="portfolio-image" loading="lazy" />
              <div className="portfolio-overlay">
                <h3 className="portfolio-title">{project.title}</h3>
                <p className="portfolio-category">{project.category}</p>
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

  return (
    <section className="gallery-section">
      <div className="container">
        <h2 className="section-title reveal">Our Work in Action</h2>
        <div className="gallery-container">
          <div className="gallery-track">
            {galleryImages.map((img, index) => (
              <div className="gallery-item" key={index}>
                <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {galleryImages.map((img, index) => (
              <div className="gallery-item" key={`dup-${index}`}>
                <img src={img} alt={`Gallery ${index + 1}`} loading="lazy" />
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
  
  const stats = [
    { number: "150+", label: "Projects Completed" },
    { number: "50+", label: "Happy Clients" },
    { number: "16", label: "Years Experience" }
  ];

  return (
    <section className="stats">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div className="stat-item reveal" key={index}>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const Testimonials = () => {
  useScrollReveal();
  
  const testimonials = [
    { text: "Istazz Media transformed our brand identity completely. Their attention to detail and creative approach exceeded our expectations.", author: "Sarah Johnson", role: "Marketing Director, Safaricom PLC" },
    { text: "The event management was flawless. From conceptualization to execution, Istazz delivered beyond our imagination.", author: "James Mwangi", role: "CEO, Equity Bank" },
    { text: "Their production quality is exceptional. Our TV commercials have significantly boosted our brand recognition.", author: "Mary Wambui", role: "Brand Manager, Kenya Airways" },
    { text: "The PR campaign they developed for us generated positive media coverage across all major platforms.", author: "David Ochieng", role: "Communications Director, KCB Group" },
    { text: "Their strategic consultancy helped us navigate a difficult rebranding process with minimal disruption.", author: "Grace Atieno", role: "Managing Director, Nation Media Group" }
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title reveal">What Kenyan Companies Say</h2>
        <div className="testimonials-container">
          <div className="testimonials-track">
            {testimonials.map((testimonial, index) => (
              <div className="testimonial" key={index}>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-role">{testimonial.role}</p>
              </div>
            ))}
            {testimonials.map((testimonial, index) => (
              <div className="testimonial" key={`dup-${index}`}>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <p className="testimonial-author">{testimonial.author}</p>
                <p className="testimonial-role">{testimonial.role}</p>
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
  useEffect(() => {
    const ctaTitle = document.querySelector('.cta-title');
    const ctaDescription = document.querySelector('.cta-description');
    const ctaButton = document.querySelector('.cta-section .cta-button.white');
    
    if (ctaTitle) ctaTitle.classList.add('reveal');
    if (ctaDescription) ctaDescription.classList.add('reveal');
    if (ctaButton) ctaButton.classList.add('reveal');
  }, []);

  return (
    <section className="cta-section">
      <div className="container">
        <h2 className="cta-title">Let's Create Together</h2>
        <p className="cta-description">Ready to elevate your brand and create unforgettable experiences? Get in touch with our team today.</p>
        <a href="/contactus" className="cta-button white">Contact Us</a>
      </div>
    </section>
  );
};

// Footer Component
const Footer = () => {
  const [toast, setToast] = useState({ visible: false, message: '', type: '' });

  const showToast = (message, type) => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast({ visible: false, message: '', type: '' });
    }, 3000);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="istazz-footer-brand">
              <div className="istazz-brand-logo istazz-compact">
                <img src="https://res.cloudinary.com/dekdxx6yx/image/upload/v1760854267/logo_fx72mz.webp" alt="Istazz Media Logo" loading="lazy" />
              </div>
            </div>
            <p className="footer-description">
              A uniquely structured media agency with an eye for excellence in branding, event management 
              and production solutions, all with an urge to exceed customer expectations.
              We are founded on a philosophy of 'Creative Simplicity' where we seek to always use new and 
              innovative techniques and solutions to meet the needs of our clients.
              Creativity is in our DNA.
            </p>
            <div className="social-links">
              <h4>Follow Us</h4>
              <div className="social-icons">
                <a href="https://www.facebook.com/share/1DEnuTKxai/" className="social-link" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.instagram.com/istazzmedia?igsh=MXVqbW9ydjk2M2hkYQ==" className="social-link" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-link" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="https://youtube.com/@istazzmedia-gig?si=HsHSVKgYco8G-lao" className="social-link" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3>Quick Links</h3>
           <ul className="footer-links">
              <li><a href="index.html"><i className="bi bi-chevron-right"></i> Home</a></li>
              <li><a href="aboutus.html"><i className="bi bi-chevron-right"></i> About Us</a></li>
              <li><a href="services.html"><i className="bi bi-chevron-right"></i> Services</a></li>
              <li><a href="ourwork.html"><i className="bi bi-chevron-right"></i> Our Work</a></li>
              <li><a href="ourclients.html"><i className="bi bi-chevron-right"></i> Our Clients</a></li>
              <li><a href="eventbranding.html"><i className="bi bi-chevron-right"></i> Event Branding</a></li>
              <li><a href="prandmediarelations.html"><i className="bi bi-chevron-right"></i> PR & Media Relations</a></li>
              <li><a href="consultation.html"><i className="bi bi-chevron-right"></i> Consultation</a></li>
              <li><a href="design.html"><i className="bi bi-chevron-right"></i> Design</a></li>
              <li><a href="contactus.html"><i className="bi bi-chevron-right"></i> Contact Us</a></li>
            </ul>
          </div>

          {/* Contact & Support Section */}
          <div className="footer-section">
            <h3>Contact Info</h3>
            <ul className="footer-links contact-info">
              <li>
                <a href="#">
                  <i className="bi bi-geo-alt"></i>
                  <span>Nairobi, Kenya<br /><small>Thome 1st Avenue, off Northern Bypass.</small></span>
                </a>
              </li>
              <li>
                <a href="tel:+254725116708">
                  <i className="bi bi-telephone"></i>
                  <span>+254 725 116 708<br /><small>24/7</small></span>
                </a>
              </li>
              <li>
                <a href="mailto:info@istazzmedia.co.ke">
                  <i className="bi bi-envelope"></i>
                  <span>info@istazzmedia.co.ke<br /><small>Email Us</small></span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; 2026 Istazz Media. All rights reserved.</p>
            </div>
          </div>
          <div className="footer-credits">
            <p>Designed by Istazz Media Team</p>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast ${toast.type} ${toast.visible ? 'visible' : ''}`}>
        <div className="toast-icon">
          <i className={`bi bi-${toast.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
        </div>
        <div className="toast-message">{toast.message}</div>
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
