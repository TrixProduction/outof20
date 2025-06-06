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

  const getGradeIcon = (grade: number) => {
    if (grade >= 16) return <TrendingUp size={16} className="text-emerald-400" />;
    if (grade >= 12) return <Minus size={16} className="text-orange-400" />;
    return <TrendingDown size={16} className="text-red-400" />;
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-emerald-300 bg-emerald-500/10 border-emerald-400/30';
    if (grade >= 14) return 'text-blue-300 bg-blue-500/10 border-blue-400/30';
    if (grade >= 12) return 'text-orange-300 bg-orange-500/10 border-orange-400/30';
    return 'text-red-300 bg-red-500/10 border-red-400/30';
  };

  const getGradeBadge = (grade: number) => {
    if (grade >= 16) return 'bg-gradient-to-r from-emerald-500 to-green-500';
    if (grade >= 14) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (grade >= 12) return 'bg-gradient-to-r from-orange-500 to-amber-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  if (allEvaluations.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4 font-['Lexend_Deca']">
          Notes <span className="text-gradient">Récentes</span>
        </h2>
        <p className="text-slate-300 text-lg font-['DM_Sans']">
          Vos dernières évaluations triées par date
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {allEvaluations.map((evaluation, index) => (
          <div
            key={index}
            className={`card-gradient card-rainbow-hover p-4 transition-all duration-300 border-2 ${getGradeColor(evaluation.note)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {getGradeIcon(evaluation.note)}
                <div className={`px-2 py-1 text-xs font-bold ${getGradeBadge(evaluation.note)} text-white font-['Lexend_Deca'] shadow-sm`}>
                  {evaluation.note.toFixed(1)}
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Clock size={12} />
                <span>{formatDate(evaluation.date!)}</span>
              </div>
            </div>

            <h4 className="font-semibold text-white text-sm mb-2 font-['DM_Sans'] line-clamp-2">
              {evaluation.evaluation}
            </h4>

            <div className="text-xs text-slate-400 mb-2">
              <span className="font-medium">{evaluation.parent}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Coef. {evaluation.coef}</span>
              <div className={`px-2 py-0.5 ${getGradeColor(evaluation.note)} font-medium`}>
                {evaluation.note >= 16 ? 'Excellent' : 
                 evaluation.note >= 14 ? 'Très bien' :
                 evaluation.note >= 12 ? 'Bien' :
                 evaluation.note >= 10 ? 'Passable' : 'Insuffisant'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};