import React from 'react';
import { Calendar, Weight, TrendingUp } from 'lucide-react';
import { Evaluation } from '../types/grades';

interface EvaluationCardProps {
  evaluation: Evaluation;
}

export const EvaluationCard: React.FC<EvaluationCardProps> = ({ evaluation }) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'text-emerald-300';
    if (grade >= 14) return 'text-blue-300';
    if (grade >= 12) return 'text-orange-300';
    return 'text-red-300';
  };

  const getGradeBg = (grade: number) => {
    if (grade >= 16) return 'bg-gradient-to-br from-emerald-500/10 to-green-500/10 border-emerald-400/20';
    if (grade >= 14) return 'bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-400/20';
    if (grade >= 12) return 'bg-gradient-to-br from-orange-500/10 to-amber-500/10 border-orange-400/20';
    return 'bg-gradient-to-br from-red-500/10 to-pink-500/10 border-red-400/20';
  };

  const getGradeBadge = (grade: number) => {
    if (grade >= 16) return 'bg-gradient-to-r from-emerald-500 to-green-500';
    if (grade >= 14) return 'bg-gradient-to-r from-blue-500 to-cyan-500';
    if (grade >= 12) return 'bg-gradient-to-r from-orange-500 to-amber-500';
    return 'bg-gradient-to-r from-red-500 to-pink-500';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Date non renseignée';
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className={`card-gradient card-rainbow-hover border-2 p-5 ${getGradeBg(evaluation.note)} transition-all duration-300 group`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-white flex-1 font-['DM_Sans'] text-lg">{evaluation.evaluation}</h4>
        <div className={`px-3 py-1 ${getGradeBadge(evaluation.note)} text-white font-bold text-lg font-['Lexend_Deca'] shadow-lg`}>
          {evaluation.note.toFixed(2)}
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm text-slate-300 mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-700/30 border border-slate-600/30">
            <Weight size={14} />
          </div>
          <span className="font-medium">Coef. {evaluation.coef}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-700/30 border border-slate-600/30">
            <Calendar size={14} />
          </div>
          <span>{formatDate(evaluation.date)}</span>
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <TrendingUp size={14} className={getGradeColor(evaluation.note)} />
        <span>Matière: <span className="font-medium text-slate-300">{evaluation.parent}</span></span>
      </div>
    </div>
  );
};