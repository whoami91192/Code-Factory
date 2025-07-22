import { useEffect, useState } from 'react';

interface ServiceWorkerRegistrationProps {
  onUpdateAvailable?: () => void;
  onUpdateInstalled?: () => void;
}

const ServiceWorkerRegistration: React.FC<ServiceWorkerRegistrationProps> = ({
  onUpdateAvailable,
  onUpdateInstalled
}) => {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdateInstalled, setIsUpdateInstalled] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      registerServiceWorker();
    }
  }, []);

  const registerServiceWorker = async () => {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });

      console.log('Service Worker registered successfully:', registration);

      // Handle updates
      registration.addEventListener('updatefound', () => {
        console.log('Service Worker update found');
        const newWorker = registration.installing;
        
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New Service Worker installed');
              setIsUpdateAvailable(true);
              onUpdateAvailable?.();
            }
          });
        }
      });

      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker controller changed');
        setIsUpdateInstalled(true);
        onUpdateInstalled?.();
      });

      // Handle service worker messages
      navigator.serviceWorker.addEventListener('message', (event) => {
        if (event.data && event.data.type === 'SW_VERSION') {
          console.log('Service Worker version:', event.data.version);
        }
      });

    } catch (error) {
      console.error('Service Worker registration failed:', error);
    }
  };

  const updateServiceWorker = async () => {
    if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
      try {
        // Send message to service worker to skip waiting
        navigator.serviceWorker.controller.postMessage({
          type: 'SKIP_WAITING'
        });

        // Reload the page to activate the new service worker
        window.location.reload();
      } catch (error) {
        console.error('Failed to update service worker:', error);
      }
    }
  };

  const checkForUpdates = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
        }
      } catch (error) {
        console.error('Failed to check for updates:', error);
      }
    }
  };

  // Check for updates periodically
  useEffect(() => {
    const interval = setInterval(() => {
      checkForUpdates();
    }, 1000 * 60 * 60); // Check every hour

    return () => clearInterval(interval);
  }, []);

  // Show update notification
  if (isUpdateAvailable && !isUpdateInstalled) {
    return (
      <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">🔄 Update Available</h3>
            <p className="text-sm opacity-90">A new version is ready to install</p>
          </div>
          <button
            onClick={updateServiceWorker}
            className="ml-4 bg-white text-blue-600 px-3 py-1 rounded text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Update
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default ServiceWorkerRegistration; 