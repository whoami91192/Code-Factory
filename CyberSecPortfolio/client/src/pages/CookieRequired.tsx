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
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-800 border border-blue-500 rounded-xl p-6 max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Cookie Acceptance Required</h2>
        <p className="text-white mb-6">
          To continue and use the web app, you must accept cookies. 
          Without acceptance, you cannot access the application.
        </p>
        <button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-colors"
        >
          Accept Cookies
        </button>
      </div>
    </div>
  );
};

export default CookieRequired; 