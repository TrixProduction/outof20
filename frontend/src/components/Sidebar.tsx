import React from 'react';
import { 
  Home, 
  RefreshCw,
  BookOpen,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onRefresh: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  onRefresh, 
  isOpen, 
  onToggle 
}) => {
  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Tableau de bord', action: 'navigate' },
    { id: 'refresh', icon: RefreshCw, label: 'Actualiser', action: 'refresh' },
    { id: 'all-notes', icon: BookOpen, label: 'Toutes les notes', action: 'navigate' },
  ];

  const handleItemClick = (item: any) => {
    if (item.action === 'refresh') {
      onRefresh();
    } else {
      onSectionChange(item.id);
    }
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      onToggle();
    }
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={onToggle}
        className="md:hidden fixed top-4 left-4 z-50 unity-sidebar-icon"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X size={18} className="text-white/80" />
        ) : (
          <Menu size={18} className="text-white/80" />
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed left-0 top-0 h-full bg-unity-dark border-r border-white/10 z-40
        transition-all duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:w-16 w-64
        flex flex-col py-6
      `}>
        {/* Mobile Header */}
        <div className="md:hidden px-6 mb-8">
          <h2 className="unity-title text-xl">
            out<span className="unity-metric-neutral">of</span>20
          </h2>
          <p className="text-unity-muted text-sm mt-1">Navigation</p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2 flex-1 px-3 md:px-0 md:items-center">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`
                  group relative transition-all duration-200 rounded-lg
                  ${isActive ? 'bg-white/10' : 'hover:bg-white/5'}
                  ${item.id === 'refresh' ? 'hover:animate-spin' : ''}
                  
                  /* Mobile Styles */
                  md:unity-sidebar-icon md:w-10 md:h-10
                  flex items-center gap-3 px-4 py-3 w-full
                `}
                title={item.label}
              >
                <Icon 
                  size={18} 
                  className={`
                    transition-colors flex-shrink-0
                    ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white/80'}
                  `} 
                />
                
                {/* Mobile Label */}
                <span className={`
                  md:hidden unity-body transition-colors
                  ${isActive ? 'text-white' : 'text-white/80'}
                `}>
                  {item.label}
                </span>
                
                {/* Active indicator - Desktop */}
                {isActive && (
                  <div className="hidden md:block absolute -right-2 top-1/2 transform -translate-y-1/2 w-1 h-6 unity-gradient-cyan rounded-l-full"></div>
                )}
                
                {/* Active indicator - Mobile */}
                {isActive && (
                  <div className="md:hidden absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-8 unity-gradient-cyan rounded-r-full"></div>
                )}
                
                {/* Tooltip - Desktop only */}
                <div className="hidden md:block absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                  {item.label}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Mobile Footer */}
        <div className="md:hidden px-6 pt-6 border-t border-white/10">
          <p className="text-unity-muted text-xs">
            IUT de Lille • Consultation des notes
          </p>
        </div>
      </div>
    </>
  );
};