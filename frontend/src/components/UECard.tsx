import React from 'react';
import { BookOpen, ChevronRight, TrendingUp } from 'lucide-react';

interface UECardProps {
  code: string;
  titre: string;
  moyenne: number;
  onClick: () => void;
}

export const UECard: React.FC<UECardProps> = ({ code, titre, moyenne, onClick }) => {
  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'from-emerald-500/20 to-green-500/20 border-emerald-400/30';
    if (grade >= 14) return 'from-blue-500/20 to-cyan-500/20 border-blue-400/30';
    if (grade >= 12) return 'from-orange-500/20 to-amber-500/20 border-orange-400/30';
    return 'from-red-500/20 to-pink-500/20 border-red-400/30';
  };

  const getGradeBadgeColor = (grade: number) => {
    if (grade >= 16) return 'bg-gradient-to-r from-emerald-500 to-green-500 text-white';
    if (grade >= 14) return 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white';
    if (grade >= 12) return 'bg-gradient-to-r from-orange-500 to-amber-500 text-white';
    return 'bg-gradient-to-r from-red-500 to-pink-500 text-white';
  };

  const getGradeTextColor = (grade: number) => {
    if (grade >= 16) return 'text-emerald-300';
    if (grade >= 14) return 'text-blue-300';
    if (grade >= 12) return 'text-orange-300';
    return 'text-red-300';
  };

  return (
    <div
      className={`card-gradient card-rainbow-hover p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 border-2 bg-gradient-to-br ${getGradeColor(moyenne)} group`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 bg-gradient-to-br from-slate-700/50 to-slate-800/50 border border-slate-600/30 group-hover:bg-slate-600/50 transition-colors duration-300">
            <BookOpen className="text-slate-300" size={24} />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-xl text-white font-['Lexend_Deca']">{code}</h3>
              <TrendingUp size={16} className={getGradeTextColor(moyenne)} />
            </div>
            <p className="text-slate-300 text-sm leading-relaxed font-['DM_Sans'] line-clamp-2">{titre}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className={`px-4 py-2 ${getGradeBadgeColor(moyenne)} font-bold text-sm font-['Lexend_Deca'] shadow-lg`}>
            {moyenne.toFixed(2)} / 20
          </div>
          <div className="p-2 bg-slate-700/30 border border-slate-600/30 group-hover:translate-x-1 transition-transform duration-300">
            <ChevronRight className="text-slate-400" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};