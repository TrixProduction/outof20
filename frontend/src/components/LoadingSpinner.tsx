import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="min-h-screen bg-unity-dark flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-12 h-12 border-2 border-white/20 border-t-white/60 rounded-full animate-spin mx-auto"></div>
        </div>
        <h2 className="unity-title text-xl mb-2">
          out<span className="unity-metric-neutral">of</span>20
        </h2>
        <p className="unity-body mb-4">Chargement de vos notes...</p>
        <div className="mt-4 flex justify-center">
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
        <p className="text-unity-muted text-xs mt-6">
          Récupération des données depuis IUT de Lille...
        </p>
      </div>
    </div>
  );
};