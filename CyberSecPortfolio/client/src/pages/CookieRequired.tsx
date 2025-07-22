import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CookieRequired = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('CookieRequired component mounted');
    console.log('cookieConsent:', localStorage.getItem('cookieConsent'));
    
    // Αν ο χρήστης έχει ήδη αποδεχτεί, τον επιστρέφουμε στην αρχική
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      console.log('Cookies already accepted, redirecting to home');
      navigate('/');
    }
  }, [navigate]);

  const handleAccept = () => {
    console.log('Accept button clicked');
    localStorage.setItem('cookieConsent', 'accepted');
    navigate('/');
  };

  // Προειδοποίηση αν προσπαθήσει να φύγει χωρίς αποδοχή
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (localStorage.getItem('cookieConsent') !== 'accepted') {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="fixed inset-0 bg-cyber-darker/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="cyber-card max-w-lg w-full text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-cyber-primary/20 to-cyber-secondary/20 opacity-50"></div>
        
        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-cyber font-bold text-cyber-danger mb-6 drop-shadow-lg">
            Cookie Acceptance Required
          </h2>
          
          <div className="space-y-4 text-cyber-primary mb-8">
            <p className="text-lg leading-relaxed">
              To continue and use the web app, you must accept cookies.
            </p>
            <p className="text-cyber-secondary">
              Without acceptance, you cannot access the application.
            </p>
          </div>
          
          <button
            onClick={handleAccept}
            className="cyber-button text-lg px-8 py-4 font-cyber font-bold"
          >
            Accept Cookies
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieRequired; 