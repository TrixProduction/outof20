import React from 'react';
import { Calendar, Weight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Evaluation } from '../types/grades';

interface EvaluationCardProps {
  evaluation: Evaluation;
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({ evaluation }) => {
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

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date non renseignée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const indicator = getGradeIndicator(evaluation.note);
  const Icon = indicator.icon;

  return (
    <div className="unity-card p-4 sm:p-5 group">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h4 className="unity-subtitle text-sm sm:text-base flex-1 line-clamp-2 pr-3">{evaluation.evaluation}</h4>
        <div className={`px-2 sm:px-3 py-1 ${getGradeBadgeClass(evaluation.note)} text-white font-medium text-xs sm:text-sm rounded flex items-center gap-1 sm:gap-2 flex-shrink-0`}>
          <Icon size={10} className="sm:w-3 sm:h-3" />
          {evaluation.note.toFixed(2)}
        </div>
      </div>
      
      <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-unity-muted mb-3">
        <div className="flex items-center gap-2">
          <div className="unity-sidebar-icon !w-5 !h-5 sm:!w-6 sm:!h-6">
            <Weight size={10} className="text-white/40 sm:w-3 sm:h-3" />
          </div>
          <span>Coef. {evaluation.coef}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="unity-sidebar-icon !w-5 !h-5 sm:!w-6 sm:!h-6">
            <Calendar size={10} className="text-white/40 sm:w-3 sm:h-3" />
          </div>
          <span className="truncate">{formatDate(evaluation.date)}</span>
        </div>
      </div>
      
      <div className="text-xs sm:text-sm text-unity-muted">
        <span>Matière: <span className="text-unity-secondary">{evaluation.parent}</span></span>
      </div>
      
      {/* Sparkline */}
      <div className="mt-3 sm:mt-4">
        <div className="unity-sparkline w-full"></div>
      </div>
    </div>
  );
};