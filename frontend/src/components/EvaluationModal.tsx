import React, { useEffect } from 'react';
import { X, BookOpen, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Evaluation } from '../types/grades';
import { EvaluationCard } from './EvaluationCard';

interface EvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
  ueCode: string;
  ueTitle: string;
  evaluations: Evaluation[];
  moyenne: number;
}

export const EvaluationModal: React.FC<EvaluationModalProps> = ({
  isOpen,
  onClose,
  ueCode,
  ueTitle,
  evaluations,
  moyenne,
}) => {
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

  if (!isOpen) return null;

  const getGradeIndicator = (grade: number) => {
    if (grade >= 16) return { icon: TrendingUp, color: 'unity-metric-up' };
    if (grade >= 12) return { icon: Minus, color: 'unity-metric-neutral' };
    return { icon: TrendingDown, color: 'unity-metric-down' };
  };

  const getGradeBadgeClass = (grade: number) => {
    if (grade >= 16) return 'unity-gradient-emerald';
    if (grade >= 12) return 'unity-gradient-cyan';
    return 'unity-gradient-carmin';
  };

  const indicator = getGradeIndicator(moyenne);
  const GradeIcon = indicator.icon;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 unity-modal-overlay">
      <div className="unity-card shadow-2xl w-full max-h-[95vh] overflow-hidden unity-modal-content max-w-4xl">
        {/* Header */}
        <div className={`flex items-center justify-between p-4 sm:p-6 lg:p-8 ${getGradeBadgeClass(moyenne)} relative`}>
          <div className="flex items-center gap-3 sm:gap-6 flex-1 min-w-0">
            <div className="unity-sidebar-icon !bg-white/20 flex-shrink-0">
              <BookOpen size={20} className="text-white sm:w-6 sm:h-6" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
                <h2 className="text-lg sm:text-xl lg:text-2xl unity-title truncate">{ueCode}</h2>
                <GradeIcon size={16} className="text-white/80 flex-shrink-0 sm:w-5 sm:h-5" />
              </div>
              <p className="text-white/90 text-sm sm:text-base line-clamp-2">{ueTitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6 flex-shrink-0">
            <div className="text-right">
              <p className="text-white/80 text-xs uppercase tracking-wide mb-1">Moyenne UE</p>
              <p className="text-xl sm:text-2xl lg:text-3xl unity-title">
                {moyenne.toFixed(2)}
              </p>
              <p className="text-white/80 text-xs sm:text-sm">/ 20</p>
            </div>
            <button
              onClick={onClose}
              className="unity-sidebar-icon !bg-white/20 hover:!bg-white/30 flex-shrink-0"
              aria-label="Fermer"
            >
              <X size={18} className="text-white sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto max-h-[calc(95vh-160px)] sm:max-h-[calc(95vh-180px)] lg:max-h-[calc(95vh-200px)] unity-scrollbar bg-unity-dark">
          <div className="mb-4 sm:mb-6">
            <h3 className="unity-title text-base sm:text-lg mb-2">Évaluations détaillées</h3>
            <p className="text-unity-muted text-sm">Détail de toutes les évaluations pour cette UE</p>
          </div>
          
          <div className="grid gap-3 sm:gap-4">
            {evaluations.map((evaluation, index) => (
              <EvaluationCard key={index} evaluation={evaluation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};