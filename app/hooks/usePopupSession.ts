import { useState, useEffect } from 'react';

export const usePopupSession = () => {
  const [shouldShowPopup, setShouldShowPopup] = useState(false);

  useEffect(() => {
    // Check if popup was shown in this session
    const popupShown = sessionStorage.getItem('popupShown');
    
    if (!popupShown) {
      // Set a timer to show the popup
      const timer = setTimeout(() => {
        setShouldShowPopup(true);
        // Mark popup as shown in this session
        sessionStorage.setItem('popupShown', 'true');
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  return shouldShowPopup;
}; 