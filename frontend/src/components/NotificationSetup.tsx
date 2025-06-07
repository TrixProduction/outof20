import React, { useState } from 'react';
import { Bell, Smartphone } from 'lucide-react';
import { NotificationModal } from './NotificationModal';

export const NotificationSetup: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="mb-6 sm:mb-8">
        <div className="unity-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3 sm:gap-4 flex-1">
            <div className="unity-sidebar-icon flex-shrink-0">
              <Bell className="text-white/60" size={20} />
            </div>
            <div>
              <h3 className="unity-title text-base sm:text-lg mb-1">Notifications de nouvelles notes</h3>
              <p className="unity-body text-sm sm:text-base">
                Recevez une notification sur votre téléphone dès qu'une nouvelle note est disponible
              </p>
              <div className="flex items-center gap-2 mt-2">
                <Smartphone size={14} className="text-unity-muted" />
                <span className="text-unity-muted text-xs">iOS & Android</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 unity-gradient-cyan text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base unity-button"
          >
            Configurer
          </button>
        </div>
      </div>

      <NotificationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};