import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  canonical?: string;
}

const useSEO = (config: SEOConfig) => {
  const location = useLocation();

  useEffect(() => {
    const {
      title,
      description,
      keywords,
      image,
      url,
      type = 'website',
      author = 'John Katsimpris',
      publishedTime,
      modifiedTime,
      section,
      tags = [],
      noindex = false,
      canonical
    } = config;

    // Update document title
    const fullTitle = title ? 
      (title.includes('John Katsimpris') ? title : `${title} | John Katsimpris`) :
      'John Katsimpris | Cyber Security Engineer & Penetration Tester';
    
    document.title = fullTitle;

    // Update meta tags
    updateMetaTag('name', 'description', description || 'Expert Cyber Security Engineer specializing in penetration testing, security audits, incident response, and cybersecurity consulting.');
    updateMetaTag('name', 'keywords', keywords || 'cyber security engineer, john katsimpris, penetration testing, security audits, incident response, cybersecurity consulting, security tools, digital forensics, ethical hacking, vulnerability assessment');
    updateMetaTag('name', 'author', author);
    updateMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1');
    updateMetaTag('name', 'googlebot', noindex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph tags
    const fullUrl = canonical || url || `https://your-domain.com${location.pathname}`;
    const fullImage = image || 'https://your-domain.com/og-image.jpg';

    updateMetaTag('property', 'og:title', fullTitle);
    updateMetaTag('property', 'og:description', description || 'Expert Cyber Security Engineer specializing in penetration testing, security audits, incident response, and cybersecurity consulting.');
    updateMetaTag('property', 'og:image', fullImage);
    updateMetaTag('property', 'og:url', fullUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:site_name', 'John Katsimpris - Cyber Security Portfolio');
    updateMetaTag('property', 'og:locale', 'en_US');

    // Update Twitter Card tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', fullTitle);
    updateMetaTag('name', 'twitter:description', description || 'Expert Cyber Security Engineer specializing in penetration testing, security audits, incident response, and cybersecurity consulting.');
    updateMetaTag('name', 'twitter:image', fullImage);
    updateMetaTag('name', 'twitter:image:alt', fullTitle);

    // Update canonical URL
    updateCanonicalUrl(fullUrl);

    // Update article-specific meta tags
    if (type === 'article') {
      if (publishedTime) {
        updateMetaTag('property', 'article:published_time', publishedTime);
      }
      if (modifiedTime) {
        updateMetaTag('property', 'article:modified_time', modifiedTime);
      }
      if (section) {
        updateMetaTag('property', 'article:section', section);
      }
      tags.forEach(tag => {
        updateMetaTag('property', 'article:tag', tag);
      });
    }

    // Update structured data
    updateStructuredData({
      title: fullTitle,
      description: description || 'Expert Cyber Security Engineer specializing in penetration testing, security audits, incident response, and cybersecurity consulting.',
      url: fullUrl,
      image: fullImage,
      type,
      publishedTime,
      modifiedTime
    });

  }, [config, location.pathname]);

  const updateMetaTag = (attribute: 'name' | 'property', value: string, content: string) => {
    let meta = document.querySelector(`meta[${attribute}="${value}"]`) as HTMLMetaElement;
    
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute(attribute, value);
      document.head.appendChild(meta);
    }
    
    meta.setAttribute('content', content);
  };

  const updateCanonicalUrl = (url: string) => {
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    
    canonical.setAttribute('href', url);
  };

  const updateStructuredData = (data: {
    title: string;
    description: string;
    url: string;
    image: string;
    type: string;
    publishedTime?: string;
    modifiedTime?: string;
  }) => {
    // Remove existing structured data
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    // Create new structured data
    const structuredData = {
      "@context": "https://schema.org",
      "@type": data.type === 'article' ? 'Article' : 'Person',
      "name": "John Katsimpris",
      "jobTitle": "Cyber Security Engineer",
      "description": data.description,
      "url": data.url,
      "image": data.image,
      "sameAs": [
        "https://linkedin.com/in/johnkatsimpris",
        "https://github.com/johnkatsimpris",
        "https://twitter.com/johnkatsimpris"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance Cyber Security Consultant"
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

    // Add article-specific properties
    if (data.type === 'article') {
      Object.assign(structuredData, {
        "headline": data.title,
        "datePublished": data.publishedTime,
        "dateModified": data.modifiedTime || data.publishedTime,
        "author": {
          "@type": "Person",
          "name": "John Katsimpris"
        }
      });
    }

    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  };

  return {
    updateMetaTag,
    updateCanonicalUrl,
    updateStructuredData
  };
};

export default useSEO; 