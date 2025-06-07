import React, { useEffect } from 'react';
import { X, Smartphone, Download, Bell, ExternalLink, Copy, Check } from 'lucide-react';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copiedTopic, setCopiedTopic] = React.useState(false);
  const topicId = import.meta.env.VITE_NTFY_TOPIC_ID || 'dimitrisnotes';

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Close on escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  const copyTopicId = async () => {
    try {
      await navigator.clipboard.writeText(topicId);
      setCopiedTopic(true);
      setTimeout(() => setCopiedTopic(false), 2000);
    } catch (err) {
      console.error('Failed to copy topic ID:', err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 unity-modal-overlay">
      <div className="unity-card shadow-2xl w-full max-h-[95vh] overflow-hidden unity-modal-content max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 lg:p-8 unity-gradient-cyan relative">
          <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
            <div className="unity-sidebar-icon !bg-white/20 flex-shrink-0">
              <Bell size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg sm:text-xl lg:text-2xl unity-title">Configuration des notifications</h2>
              <p className="text-white/90 text-sm sm:text-base mt-1">
                Restez informé de vos nouvelles notes
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="unity-sidebar-icon !bg-white/20 hover:!bg-white/30 flex-shrink-0"
            aria-label="Fermer"
          >
            <X size={18} className="text-white sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(95vh-140px)] unity-scrollbar bg-unity-dark">
          {/* App Introduction */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center gap-4 mb-4">
              <img 
                src="https://ntfy.sh/_next/static/media/logo.077f6a13.svg" 
                alt="ntfy logo" 
                className="w-12 h-12 sm:w-16 sm:h-16"
              />
              <div>
                <h3 className="unity-title text-lg sm:text-xl mb-1">ntfy</h3>
                <p className="text-unity-muted text-sm">Application de notifications push simple et gratuite</p>
              </div>
            </div>
            <p className="unity-body text-sm sm:text-base">
              ntfy est une application gratuite et open-source qui vous permet de recevoir des notifications 
              push sur votre téléphone. Nous l'utilisons pour vous notifier dès qu'une nouvelle note est disponible.
            </p>
          </div>

          {/* Step 1: Download */}
          <div className="mb-6 sm:mb-8">
            <h4 className="unity-title text-base sm:text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-unity-metric-neutral text-white rounded-full flex items-center justify-center text-xs">1</span>
              Télécharger l'application
            </h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
              <a
                href="https://apps.apple.com/us/app/ntfy/id1625396347"
                target="_blank"
                rel="noopener noreferrer"
                className="unity-card p-4 hover:bg-white/5 transition-all flex items-center gap-3 unity-button"
              >
                <Smartphone size={24} className="text-white/80" />
                <div className="flex-1">
                  <p className="unity-subtitle text-sm">App Store</p>
                  <p className="text-unity-muted text-xs">iOS</p>
                </div>
                <ExternalLink size={14} className="text-white/40" />
              </a>
              
              <a
                href="https://play.google.com/store/apps/details?id=io.heckel.ntfy"
                target="_blank"
                rel="noopener noreferrer"
                className="unity-card p-4 hover:bg-white/5 transition-all flex items-center gap-3 unity-button"
              >
                <Smartphone size={24} className="text-white/80" />
                <div className="flex-1">
                  <p className="unity-subtitle text-sm">Google Play</p>
                  <p className="text-unity-muted text-xs">Android</p>
                </div>
                <ExternalLink size={14} className="text-white/40" />
              </a>
            </div>

            <div className="unity-card p-4 bg-white/5 border border-white/10">
              <div className="flex items-start gap-3">
                <Download size={16} className="text-unity-metric-neutral mt-0.5" />
                <div>
                  <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Alternative</p>
                  <p className="unity-body text-sm">
                    Vous pouvez également télécharger l'APK directement depuis{' '}
                    <a 
                      href="https://ntfy.sh/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="unity-metric-neutral hover:underline"
                    >
                      ntfy.sh
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Subscribe */}
          <div className="mb-6 sm:mb-8">
            <h4 className="unity-title text-base sm:text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-unity-metric-neutral text-white rounded-full flex items-center justify-center text-xs">2</span>
              S'abonner au topic
            </h4>

            <div className="space-y-4">
              <p className="unity-body text-sm sm:text-base">
                Une fois l'application installée, vous devez vous abonner au topic suivant pour recevoir 
                les notifications de nouvelles notes :
              </p>

              <div className="unity-card p-4 bg-white/5 border border-white/10">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Topic ID</p>
                    <p className="unity-title text-base sm:text-lg font-mono">{topicId}</p>
                  </div>
                  <button
                    onClick={copyTopicId}
                    className="unity-sidebar-icon hover:bg-white/10"
                    title="Copier le topic ID"
                  >
                    {copiedTopic ? (
                      <Check size={16} className="text-unity-metric-up" />
                    ) : (
                      <Copy size={16} className="text-white/60" />
                    )}
                  </button>
                </div>
              </div>

              <div className="unity-card p-4 bg-unity-metric-neutral/10 border border-unity-metric-neutral/20">
                <p className="text-sm">
                  <strong>Instructions :</strong>
                </p>
                <ol className="list-decimal list-inside text-sm space-y-1 mt-2 text-unity-muted">
                  <li>Ouvrez l'application ntfy</li>
                  <li>Appuyez sur le bouton "+" pour ajouter un topic</li>
                  <li>Saisissez le topic ID : <span className="font-mono bg-white/10 px-1 rounded">{topicId}</span></li>
                  <li>Validez pour vous abonner</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Step 3: Confirmation */}
          <div className="mb-4">
            <h4 className="unity-title text-base sm:text-lg mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-unity-metric-up text-white rounded-full flex items-center justify-center text-xs">3</span>
              Profitez des notifications
            </h4>

            <div className="unity-card p-4 bg-unity-metric-up/10 border border-unity-metric-up/20">
              <p className="unity-body text-sm">
                Une fois configuré, vous recevrez automatiquement une notification push sur votre téléphone 
                chaque fois qu'une nouvelle note sera disponible. Les notifications incluront des informations 
                sur le nombre de nouvelles notes detectées ainsi que la variation detectée sur votre moyenne generale.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-unity-muted text-xs text-center">
              ntfy est un service gratuit et open-source. Vos données restent privées.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};