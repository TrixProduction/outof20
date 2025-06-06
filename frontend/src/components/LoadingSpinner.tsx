import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-slate-700 border-t-blue-500 animate-spin mx-auto"></div>
        </div>
        <h2 className="text-3xl font-bold text-white font-['Lexend_Deca'] mb-2">
          out<span className="text-gradient">of</span>20
        </h2>
        <p className="text-slate-300 font-['DM_Sans'] text-lg mb-4">Chargement de vos notes...</p>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce delay-200"></div>
          </div>
        </div>
        <p className="text-slate-400 text-sm mt-6 font-['DM_Sans']">
          Récupération des données depuis IUT de Lille...
        </p>
      </div>
    </div>
  );
};