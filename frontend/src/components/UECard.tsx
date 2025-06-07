import React from 'react';
import { BookOpen, ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface UECardProps {
  code: string;
  titre: string;
  moyenne: number;
  onClick: () => void;
}

export const UECard: React.FC<UECardProps> = ({ code, titre, moyenne, onClick }) => {
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
  const Icon = indicator.icon;

  return (
    <div
      className="unity-card p-4 sm:p-6 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-start justify-between gap-3 sm:gap-4">
        <div className="flex items-start gap-3 sm:gap-4 flex-1 min-w-0">
          <div className="unity-sidebar-icon flex-shrink-0">
            <BookOpen className="text-white/60" size={16} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-2">
              <h3 className="unity-title text-base sm:text-lg">{code}</h3>
              <Icon size={12} className={`${indicator.color} flex-shrink-0 sm:w-3.5 sm:h-3.5`} />
            </div>
            <p className="unity-body leading-relaxed line-clamp-3 text-sm sm:text-base">{titre}</p>
            
            {/* Sparkline simulation */}
            <div className="mt-3 sm:mt-4">
              <div className="unity-sparkline w-full"></div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <div className={`px-2 sm:px-3 py-1 ${getGradeBadgeClass(moyenne)} text-white text-xs sm:text-sm font-medium rounded`}>
            {moyenne.toFixed(2)}
          </div>
          <div className="unity-sidebar-icon !w-8 !h-8 sm:!w-10 sm:!h-10 group-hover:translate-x-1 transition-transform">
            <ChevronRight className="text-white/40" size={14} />
          </div>
        </div>
      </div>
    </div>
  );
};