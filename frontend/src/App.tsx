import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { UECard } from './components/UECard';
import { EvaluationModal } from './components/EvaluationModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RecentNotes } from './components/RecentNotes';
import { fetchGrades } from './lib/supabase';
import { GradeData } from './types/grades';

function App() {
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUE, setSelectedUE] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);

  // Auto-load data on component mount
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const data = await fetchGrades(showDemo);
        setGradeData(data);
      } catch (error) {
        console.error('Error loading grades:', error);
        setError(error instanceof Error ? error.message : 'Erreur lors du chargement des notes. Veuillez réessayer.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [showDemo]);

  const handleUEClick = (ueCode: string) => {
    setSelectedUE(ueCode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUE(null);
  };

  const handleRetry = () => {
    setShowDemo(false);
    setError(null);
  };

  const handleDemo = () => {
    setShowDemo(true);
    setError(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center p-6">
        <div className="text-center card-gradient p-8 max-w-md w-full border border-slate-600/30">
          <h2 className="text-3xl font-bold text-white font-['Lexend_Deca'] mb-4">
            out<span className="text-gradient">of</span>20
          </h2>
          <p className="text-red-400 text-xl font-['Lexend_Deca'] font-bold mb-2">Erreur de chargement</p>
          <p className="text-slate-300 mb-6 font-['DM_Sans']">{error}</p>
          
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="btn-rainbow-hover w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white transition-colors font-['DM_Sans'] font-medium"
            >
              Réessayer
            </button>
            <button
              onClick={handleDemo}
              className="btn-rainbow-hover w-full px-6 py-2 bg-slate-700/50 hover:bg-slate-600/50 text-slate-300 transition-colors font-['DM_Sans']"
            >
              Voir la démo
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!gradeData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center card-gradient p-8">
          <p className="text-red-400 text-xl font-['Lexend_Deca'] font-bold">Aucune donnée disponible</p>
          <p className="text-slate-300 mt-2 font-['DM_Sans']">Veuillez réessayer plus tard</p>
          <button
            onClick={handleRetry}
            className="btn-rainbow-hover mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white transition-colors font-['DM_Sans']"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <Header
        semestre={gradeData.semestre}
        anneeUniversitaire={gradeData.annee_universitaire}
        moyenneGenerale={gradeData.moyenne_generale}
        rang={gradeData.rang}
        onRetry={handleRetry}
        onDemo={handleDemo}
      />

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Recent Notes Section */}
        <RecentNotes evaluations={gradeData.evaluations} />

        {/* UE Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4 font-['Lexend_Deca']">
            Unités d'<span className="text-gradient">Enseignement</span>
          </h2>
          <p className="text-slate-300 text-lg font-['DM_Sans']">
            Cliquez sur une UE pour découvrir le détail de vos évaluations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(gradeData.UE).map(([ueCode, ueData]) => (
            <UECard
              key={ueCode}
              code={ueCode}
              titre={ueData.titre}
              moyenne={ueData.moyenne}
              onClick={() => handleUEClick(ueCode)}
            />
          ))}
        </div>
      </div>

      {selectedUE && (
        <EvaluationModal
          isOpen={isModalOpen}
          onClose={closeModal}
          ueCode={selectedUE}
          ueTitle={gradeData.UE[selectedUE].titre}
          evaluations={gradeData.evaluations[selectedUE] || []}
          moyenne={gradeData.UE[selectedUE].moyenne}
        />
      )}
    </div>
  );
}

export default App;