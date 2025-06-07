import React from 'react';
import { Clock, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Evaluation } from '../types/grades';

interface RecentNotesProps {
  evaluations: Record<string, Evaluation[]>;
}

export const RecentNotes: React.FC<RecentNotesProps> = ({ evaluations }) => {
  // Flatten all evaluations and sort by date
  const allEvaluations = Object.values(evaluations)
    .flat()
    .filter(evaluation => evaluation.date) // Only keep evaluations with dates
    .sort((a, b) => {
      const dateA = new Date(a.date!).getTime();
      const dateB = new Date(b.date!).getTime();
      return dateB - dateA; // Most recent first
    })
    .slice(0, 8); // Show only 8 most recent

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `${diffDays}j`;
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
    });
  };

  if (allEvaluations.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 sm:mb-12">
      <div className="mb-4 sm:mb-6">
        <h2 className="unity-title text-lg sm:text-xl mb-2">
          Notes <span className="unity-metric-neutral">Récentes</span>
        </h2>
        <p className="unity-body text-sm sm:text-base">
          Vos dernières évaluations triées par date
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {allEvaluations.map((evaluation, index) => {
          const indicator = getGradeIndicator(evaluation.note);
          const Icon = indicator.icon;
          
          return (
            <div key={index} className="unity-card p-3 sm:p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Icon size={12} className={indicator.color} />
                  <div className={`px-2 py-1 text-xs font-medium ${getGradeBadgeClass(evaluation.note)} text-white rounded`}>
                    {evaluation.note.toFixed(1)}
                  </div>
                </div>
                <div className="flex items-center gap-1 text-xs text-unity-muted">
                  <Clock size={10} />
                  <span>{formatDate(evaluation.date!)}</span>
                </div>
              </div>

              <h4 className="unity-subtitle text-xs sm:text-sm mb-2 line-clamp-2">
                {evaluation.evaluation}
              </h4>

              <div className="text-xs text-unity-muted mb-3">
                <span className="unity-body">{evaluation.parent}</span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-unity-muted">Coef. {evaluation.coef}</span>
                <div className={`px-2 py-0.5 rounded text-xs ${
                  evaluation.note >= 16 ? 'text-unity-metric-up bg-emerald-500/10' : 
                  evaluation.note >= 12 ? 'text-unity-metric-neutral bg-cyan-500/10' :
                  'text-unity-metric-down bg-red-500/10'
                }`}>
                  {evaluation.note >= 16 ? 'Excellent' : 
                   evaluation.note >= 14 ? 'Très bien' :
                   evaluation.note >= 12 ? 'Bien' :
                   evaluation.note >= 10 ? 'Passable' : 'Insuffisant'}
                </div>
              </div>
              
              {/* Sparkline */}
              <div className="mt-3">
                <div className="unity-sparkline w-full"></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};