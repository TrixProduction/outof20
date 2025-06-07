import React, { useState, useMemo } from 'react';
import { Search, SortAsc, SortDesc, Calendar, Trophy, Filter, ArrowLeft } from 'lucide-react';
import { Evaluation } from '../types/grades';

interface AllNotesProps {
  evaluations: Record<string, Evaluation[]>;
}

type SortType = 'date' | 'grade' | 'subject' | 'name';
type SortOrder = 'asc' | 'desc';

export const AllNotes: React.FC<AllNotesProps> = ({ evaluations }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState<SortType>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Flatten all evaluations
  const allEvaluations = useMemo(() => {
    return Object.entries(evaluations).flatMap(([ueCode, evals]) =>
      evals.map(evaluation => ({ ...evaluation, ueCode }))
    );
  }, [evaluations]);

  // Filter and sort evaluations
  const filteredAndSortedEvaluations = useMemo(() => {
    let filtered = allEvaluations.filter(evaluation =>
      evaluation.evaluation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.parent.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evaluation.ueCode.toLowerCase().includes(searchTerm.toLowerCase())
    );

    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortType) {
        case 'date':
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          comparison = dateA - dateB;
          break;
        case 'grade':
          comparison = a.note - b.note;
          break;
        case 'subject':
          comparison = a.parent.localeCompare(b.parent);
          break;
        case 'name':
          comparison = a.evaluation.localeCompare(b.evaluation);
          break;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });

    return filtered;
  }, [allEvaluations, searchTerm, sortType, sortOrder]);

  const toggleSort = (type: SortType) => {
    if (sortType === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortType(type);
      setSortOrder('desc');
    }
  };

  const getSortIcon = (type: SortType) => {
    if (sortType !== type) return null;
    return sortOrder === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Aucune date';
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const getGradeStats = () => {
    const grades = allEvaluations.map(e => e.note);
    const average = grades.reduce((sum, grade) => sum + grade, 0) / grades.length;
    const max = Math.max(...grades);
    const min = Math.min(...grades);
    
    return { average, max, min, total: grades.length };
  };

  const stats = getGradeStats();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="unity-title text-xl sm:text-2xl mb-2">
          Toutes les <span className="unity-metric-neutral">Notes</span>
        </h1>
        <p className="unity-body text-sm sm:text-base">
          Vue complète de toutes vos évaluations avec outils de recherche et tri
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="unity-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="unity-sidebar-icon !w-6 !h-6 sm:!w-8 sm:!h-8">
              <Trophy size={12} className="text-white/60 sm:w-3.5 sm:h-3.5" />
            </div>
            <div>
              <p className="text-unity-muted text-xs uppercase tracking-wide">Total</p>
              <p className="unity-title text-base sm:text-lg">{stats.total}</p>
            </div>
          </div>
        </div>
        
        <div className="unity-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="unity-sidebar-icon !w-6 !h-6 sm:!w-8 sm:!h-8">
              <Calendar size={12} className="unity-metric-up sm:w-3.5 sm:h-3.5" />
            </div>
            <div>
              <p className="text-unity-muted text-xs uppercase tracking-wide">Moyenne</p>
              <p className="unity-title text-base sm:text-lg unity-metric-up">{stats.average.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="unity-card p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="unity-sidebar-icon !w-6 !h-6 sm:!w-8 sm:!h-8">
              <Calendar size={12} className="unity-metric-up sm:w-3.5 sm:h-3.5" />
            </div>
            <div>
              <p className="text-unity-muted text-xs uppercase tracking-wide">Maximum</p>
              <p className="unity-title text-base sm:text-lg unity-metric-up">{stats.max.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div className="unity-card p-3 sm:p-4 col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="unity-sidebar-icon !w-6 !h-6 sm:!w-8 sm:!h-8">
              <Calendar size={12} className="unity-metric-down sm:w-3.5 sm:h-3.5" />
            </div>
            <div>
              <p className="text-unity-muted text-xs uppercase tracking-wide">Minimum</p>
              <p className="unity-title text-base sm:text-lg unity-metric-down">{stats.min.toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <div className="unity-card p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex flex-col gap-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              <Search size={16} className="text-white/40" />
            </div>
            <input
              type="text"
              placeholder="Rechercher par nom d'évaluation, matière ou UE..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/20 focus:bg-white/8 transition-all text-sm sm:text-base"
            />
          </div>

          {/* Sort Controls */}
          <div className="grid grid-cols-2 lg:flex gap-2">
            <button
              onClick={() => toggleSort('date')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs sm:text-sm ${
                sortType === 'date' 
                  ? 'unity-gradient-cyan text-white' 
                  : 'unity-card hover:bg-white/5 text-white/80'
              }`}
            >
              <Calendar size={12} />
              <span className="hidden sm:inline">Date</span>
              {getSortIcon('date')}
            </button>
            
            <button
              onClick={() => toggleSort('grade')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs sm:text-sm ${
                sortType === 'grade' 
                  ? 'unity-gradient-emerald text-white' 
                  : 'unity-card hover:bg-white/5 text-white/80'
              }`}
            >
              <Trophy size={12} />
              <span className="hidden sm:inline">Note</span>
              {getSortIcon('grade')}
            </button>
            
            <button
              onClick={() => toggleSort('subject')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs sm:text-sm ${
                sortType === 'subject' 
                  ? 'unity-gradient-cyan text-white' 
                  : 'unity-card hover:bg-white/5 text-white/80'
              }`}
            >
              <Filter size={12} />
              <span className="hidden sm:inline">Matière</span>
              {getSortIcon('subject')}
            </button>
            
            <button
              onClick={() => toggleSort('name')}
              className={`px-3 sm:px-4 py-2 sm:py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-xs sm:text-sm ${
                sortType === 'name' 
                  ? 'unity-gradient-cyan text-white' 
                  : 'unity-card hover:bg-white/5 text-white/80'
              }`}
            >
              <Filter size={12} />
              <span className="hidden sm:inline">Nom</span>
              {getSortIcon('name')}
            </button>
          </div>
        </div>
        
        {/* Results count */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <p className="text-unity-muted text-sm">
            {filteredAndSortedEvaluations.length} évaluation(s) trouvée(s)
            {searchTerm && ` pour "${searchTerm}"`}
          </p>
        </div>
      </div>

      {/* Evaluations Grid */}
      <div className="grid gap-3 sm:gap-4">
        {filteredAndSortedEvaluations.length === 0 ? (
          <div className="unity-card p-6 sm:p-8 text-center">
            <p className="unity-body text-base sm:text-lg mb-2">Aucune évaluation trouvée</p>
            <p className="text-unity-muted text-sm">Essayez de modifier vos critères de recherche</p>
          </div>
        ) : (
          filteredAndSortedEvaluations.map((evaluation, index) => (
            <div key={index} className="unity-card p-4 sm:p-5">
              <div className="grid grid-cols-1 lg:grid-cols-6 gap-3 sm:gap-4 lg:items-center">
                {/* Evaluation Name & UE */}
                <div className="lg:col-span-2">
                  <h4 className="unity-subtitle text-sm sm:text-base mb-1 line-clamp-2">{evaluation.evaluation}</h4>
                  <p className="text-unity-muted text-xs sm:text-sm">UE: {evaluation.ueCode}</p>
                </div>
                
                {/* Subject */}
                <div>
                  <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Matière</p>
                  <p className="unity-body text-xs sm:text-sm">{evaluation.parent}</p>
                </div>
                
                {/* Date */}
                <div>
                  <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Date</p>
                  <p className="unity-body text-xs sm:text-sm">{formatDate(evaluation.date)}</p>
                </div>
                
                {/* Coefficient */}
                <div>
                  <p className="text-unity-muted text-xs uppercase tracking-wide mb-1">Coefficient</p>
                  <p className="unity-body text-xs sm:text-sm">{evaluation.coef}</p>
                </div>
                
                {/* Grade */}
                <div className="flex justify-start lg:justify-end">
                  <div className={`px-3 sm:px-4 py-1 sm:py-2 rounded-lg font-medium text-sm ${
                    evaluation.note >= 16 ? 'unity-gradient-emerald' :
                    evaluation.note >= 12 ? 'unity-gradient-cyan' :
                    'unity-gradient-carmin'
                  } text-white`}>
                    {evaluation.note.toFixed(2)} / 20
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};