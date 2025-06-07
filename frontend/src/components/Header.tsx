import React from 'react';
import { Calendar, Trophy, Star, RotateCcw, Eye } from 'lucide-react';

interface HeaderProps {
  semestre: number;
  anneeUniversitaire: string;
  moyenneGenerale: number;
  rang: {
    position: string;
    total: number;
  };
  onRetry: () => void;
  onDemo: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  semestre,
  anneeUniversitaire,
  moyenneGenerale,
  rang,
  onRetry,
  onDemo,
}) => {
  return (
    <div className="border-b border-white/10 bg-unity-dark">
      <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Header Title with Action Buttons */}
        <div className="flex items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl unity-title mb-1 sm:mb-2">
              out<span className="unity-metric-neutral">of</span>20
            </h1>
            <p className="unity-body text-sm sm:text-base">IUT de Lille • Consultation des notes</p>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <button
              onClick={onDemo}
              className="unity-sidebar-icon !w-8 !h-8 sm:!w-10 sm:!h-10"
              title="Voir la démo"
            >
              <Eye size={14} className="text-white/60 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={onRetry}
              className="unity-sidebar-icon !w-8 !h-8 sm:!w-10 sm:!h-10"
              title="Actualiser"
            >
              <RotateCcw size={14} className="text-white/60 sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Academic Year Card */}
          <div className="unity-card p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="unity-sidebar-icon flex-shrink-0">
                <Calendar className="text-white/80" size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Année universitaire</p>
                <p className="unity-title text-lg sm:text-xl truncate">{anneeUniversitaire}</p>
                <p className="unity-metric-neutral text-sm">Semestre {semestre}</p>
              </div>
            </div>
          </div>

          {/* Average Grade Card */}
          <div className="unity-card p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="unity-sidebar-icon flex-shrink-0">
                <Star className="text-white/80" size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Moyenne générale</p>
                <div className="flex items-baseline gap-1">
                  <span className="unity-title text-xl sm:text-2xl unity-metric-up">
                    {moyenneGenerale.toFixed(2)}
                  </span>
                  <span className="text-unity-muted text-sm">/ 20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ranking Card */}
          <div className="unity-card p-4 sm:p-6 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="unity-sidebar-icon flex-shrink-0">
                <Trophy className="text-white/80" size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Classement</p>
                <div className="flex items-baseline gap-1">
                  <span className="unity-title text-xl sm:text-2xl unity-metric-neutral">
                    {rang.position}
                  </span>
                  <span className="unity-metric-neutral text-sm">e</span>
                </div>
                <p className="text-unity-muted text-sm">sur {rang.total} étudiants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};