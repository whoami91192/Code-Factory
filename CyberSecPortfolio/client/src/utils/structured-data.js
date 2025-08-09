// Structured Data (JSON-LD) - externalized for CSP compliance
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "John Katsimpris",
  "jobTitle": "Cyber Security Engineer",
  "description": "Expert Cyber Security Engineer specializing in penetration testing, security audits, incident response, and cybersecurity consulting.",
  "url": "https://www.jksecurestack.com",
  "image": "https://www.jksecurestack.com/profile-image.jpg",
  "sameAs": [
    "https://linkedin.com/in/johnkatsimpris",
    "https://github.com/johnkatsimpris",
    "https://twitter.com/johnkatsimpris"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "JK SecureStack - Cyber Security Consultant"
  },
  "knowsAbout": [
    "Penetration Testing",
    "Security Audits",
    "Incident Response",
    "Cybersecurity Consulting",
    "Digital Forensics",
    "Vulnerability Assessment",
    "Security Architecture",
    "Network Security",
    "Application Security",
    "Cloud Security"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Greece"
  }
};

// Inject structured data into the page
function injectStructuredData() {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
}

// Run when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', injectStructuredData);
} else {
  injectStructuredData();
}
