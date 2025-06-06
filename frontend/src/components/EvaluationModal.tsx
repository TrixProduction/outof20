import React from 'react';
import { X, BookOpen, TrendingUp } from 'lucide-react';
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
  if (!isOpen) return null;

  const getGradeColor = (grade: number) => {
    if (grade >= 16) return 'from-emerald-500 to-green-500';
    if (grade >= 14) return 'from-blue-500 to-cyan-500';
    if (grade >= 12) return 'from-orange-500 to-amber-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card-gradient shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-slate-600/30">
        <div className={`flex items-center justify-between p-8 bg-gradient-to-r ${getGradeColor(moyenne)} relative overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          
          <div className="flex items-center gap-6 relative z-10">
            <div className="p-4 bg-white/20 backdrop-blur-sm border border-white/30">
              <BookOpen size={32} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-3xl font-bold text-white font-['Lexend_Deca']">{ueCode}</h2>
                <TrendingUp size={24} className="text-white/80" />
              </div>
              <p className="text-white/90 text-lg font-['DM_Sans'] max-w-lg">{ueTitle}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 relative z-10">
            <div className="text-right">
              <p className="text-white/80 text-sm font-medium">Moyenne UE</p>
              <p className="text-4xl font-bold text-white font-['Lexend_Deca']">
                {moyenne.toFixed(2)}
              </p>
              <p className="text-white/80 text-sm">/ 20</p>
            </div>
            <button
              onClick={onClose}
              className="btn-rainbow-hover p-3 bg-white/20 hover:bg-white/30 border border-white/30 transition-all duration-300"
            >
              <X size={24} className="text-white" />
            </button>
          </div>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)] bg-gradient-to-b from-slate-900/50 to-slate-800/50">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-white font-['Lexend_Deca'] mb-2">Évaluations détaillées</h3>
            <p className="text-slate-400 text-sm">Cliquez sur une évaluation pour plus de détails</p>
          </div>
          <div className="grid gap-4">
            {evaluations.map((evaluation, index) => (
              <EvaluationCard key={index} evaluation={evaluation} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};