"use client";

import { useState, useRef } from "react";
import ContactPopup from "./ContactPopup";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const closePopup = () => setIsPopupVisible(false);

  return (
    <>
      {children}
      {isPopupVisible && (
        <div
          className="fixed inset-0 bg-[#D8CEC6]/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={closePopup}
        >
          <div
            ref={popupRef}
            className="bg-white/90 backdrop-blur-sm p-6 max-w-2xl w-full mx-4 max-h-[95vh] overflow-y-auto rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <ContactPopup onClose={closePopup} />
          </div>
        </div>
      )}
    </>
  );
} 