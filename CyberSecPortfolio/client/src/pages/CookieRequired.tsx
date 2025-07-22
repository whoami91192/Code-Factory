import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CookieRequired = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Αν ο χρήστης έχει ήδη αποδεχτεί, τον επιστρέφουμε στην αρχική
    if (localStorage.getItem('cookieConsent') === 'accepted') {
      navigate('/');
    }
  }, [navigate]);

  const handleAccept = () => {
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
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="cyber-card max-w-lg w-full text-center">
        <h2 className="text-2xl font-cyber font-bold text-cyber-red mb-4">Cookie Acceptance Required</h2>
        <p className="text-white mb-6">
          To continue and use the web app, you must accept cookies. 
          Without acceptance, you cannot access the application.
        </p>
        <button
          onClick={handleAccept}
          className="cyber-button flex items-center justify-center mx-auto"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieRequired; 