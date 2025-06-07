import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { UECard } from './components/UECard';
import { EvaluationModal } from './components/EvaluationModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { RecentNotes } from './components/RecentNotes';
import { AllNotes } from './components/AllNotes';
import { NotificationSetup } from './components/NotificationSetup';
import { fetchGrades } from './lib/supabase';
import { GradeData } from './types/grades';
import { BookOpen } from 'lucide-react';

function App() {
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUE, setSelectedUE] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarOpen && window.innerWidth < 768) {
        const target = event.target as Element;
        if (!target.closest('.sidebar-container') && !target.closest('.mobile-menu-button')) {
          setSidebarOpen(false);
        }
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [sidebarOpen]);

  // Close sidebar on route change for mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [activeSection]);

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

  const handleRefresh = () => {
    // Trigger a reload of data
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
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-unity-dark flex items-center justify-center p-4 sm:p-6">
        <div className="text-center unity-card p-6 sm:p-8 max-w-md w-full">
          <h2 className="unity-title text-xl mb-4">
            out<span className="unity-metric-neutral">of</span>20
          </h2>
          <p className="unity-metric-down text-base font-medium mb-2">Erreur de chargement</p>
          <p className="unity-body mb-6">{error}</p>
          
          <div className="space-y-3">
            <button
              onClick={handleRetry}
              className="w-full px-4 py-2 unity-gradient-cyan text-white transition-all hover:opacity-90 rounded"
            >
              Réessayer
            </button>
            <button
              onClick={handleDemo}
              className="w-full px-4 py-2 unity-card hover:bg-white/5 text-white transition-all rounded"
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
      <div className="min-h-screen bg-unity-dark flex items-center justify-center p-4">
        <div className="text-center unity-card p-6 sm:p-8">
          <p className="unity-metric-down text-base font-medium">Aucune donnée disponible</p>
          <p className="unity-body mt-2">Veuillez réessayer plus tard</p>
          <button
            onClick={handleRetry}
            className="mt-4 px-4 py-2 unity-gradient-cyan text-white transition-all hover:opacity-90 rounded"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  const renderContent = () => {
    switch (activeSection) {
      case 'all-notes':
        return <AllNotes evaluations={gradeData.evaluations} />;
      case 'dashboard':
      default:
        return (
          <div className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            {/* Recent Notes Section */}
            <RecentNotes evaluations={gradeData.evaluations} />

            {/* Quick Access to All Notes */}
            <div className="mb-6 sm:mb-8">
              <div className="unity-card p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="unity-sidebar-icon flex-shrink-0">
                    <BookOpen className="text-white/60" size={20} />
                  </div>
                  <div>
                    <h3 className="unity-title text-base sm:text-lg mb-1">Consulter toutes vos notes</h3>
                    <p className="unity-body text-sm sm:text-base">Accédez à la vue complète avec recherche et tri avancés</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSection('all-notes')}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 unity-gradient-cyan text-white rounded-lg hover:opacity-90 transition-all text-sm sm:text-base unity-button"
                >
                  Voir toutes les notes
                </button>
              </div>
            </div>

            {/* Notification Setup */}
            <NotificationSetup />

            {/* UE Section */}
            <div className="mb-6 sm:mb-8">
              <h2 className="unity-title text-lg sm:text-xl mb-2">
                Unités d'<span className="unity-metric-neutral">Enseignement</span>
              </h2>
              <p className="unity-body mb-4 sm:mb-6 text-sm sm:text-base">
                Cliquez sur une UE pour découvrir le détail de vos évaluations
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
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
        );
    }
  };

  return (
    <div className="min-h-screen bg-unity-dark">
      <Sidebar 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        onRefresh={handleRefresh}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="md:ml-16 transition-all duration-300">
        {activeSection === 'dashboard' && (
          <Header
            semestre={gradeData.semestre}
            anneeUniversitaire={gradeData.annee_universitaire}
            moyenneGenerale={gradeData.moyenne_generale}
            rang={gradeData.rang}
            onRetry={handleRetry}
            onDemo={handleDemo}
          />
        )}

        {renderContent()}
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