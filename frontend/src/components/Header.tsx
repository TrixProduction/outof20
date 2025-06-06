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
    <div className="relative overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      
      {/* Floating elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Header Title with Action Buttons */}
        <div className="flex items-center justify-between mb-12">
          <div className="text-center flex-1">
            <div className="flex items-center justify-center mb-4">
              <div>
                <h1 className="text-6xl font-bold text-white font-['Lexend_Deca']">
                  out<span className="text-gradient">of</span>20
                </h1>
                <p className="text-slate-300 text-lg font-['DM_Sans'] font-light">IUT de Lille • Consultation des notes</p>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onDemo}
              className="btn-rainbow-hover p-3 bg-slate-700/20 border border-slate-500/30 transition-all duration-300 group"
              title="Voir la démo"
            >
              <Eye size={20} className="text-slate-300 group-hover:text-slate-200" />
            </button>
            <button
              onClick={onRetry}
              className="btn-rainbow-hover p-3 bg-blue-500/20 border border-blue-400/30 transition-all duration-300 group"
              title="Actualiser"
            >
              <RotateCcw size={20} className="text-blue-300 group-hover:text-blue-200" />
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Academic Year Card */}
          <div className="card-gradient card-rainbow-hover p-6 group transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30">
                <Calendar className="text-blue-300" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Année universitaire</p>
                <p className="text-2xl font-bold text-white font-['Lexend_Deca']">{anneeUniversitaire}</p>
                <p className="text-blue-300 text-sm">Semestre {semestre}</p>
              </div>
            </div>
          </div>

          {/* Average Grade Card */}
          <div className="card-gradient card-rainbow-hover p-6 group transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-400/30">
                <Star className="text-emerald-300" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Moyenne générale</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gradient font-['Lexend_Deca']">
                    {moyenneGenerale.toFixed(2)}
                  </span>
                  <span className="text-slate-400 text-lg">/ 20</span>
                </div>
              </div>
            </div>
          </div>

          {/* Ranking Card */}
          <div className="card-gradient card-rainbow-hover p-6 group transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-orange-500/20 to-amber-500/20 border border-orange-400/30">
                <Trophy className="text-orange-300" size={24} />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium">Classement</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-gradient font-['Lexend_Deca']">
                    {rang.position}
                  </span>
                  <span className="text-orange-300 text-lg">e</span>
                </div>
                <p className="text-slate-400 text-sm">sur {rang.total} étudiants</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};