
import React, { useState, useEffect } from 'react';
import { Screen, Asset, Project } from './types';
import { MOCK_ASSETS, MOCK_PROJECTS } from './constants';
import Onboarding from './screens/Onboarding';
import Library from './screens/Library';
import Viewer from './screens/Viewer';
import Deduplication from './screens/Deduplication';
import Projects from './screens/Projects';
import Settings from './screens/Settings';
import ExportWizard from './screens/ExportWizard';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);

  // Keyboard Navigation / Global Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Numbers 1-5 for rating
      if (selectedAsset && e.key >= '1' && e.key <= '5') {
        const rating = parseInt(e.key);
        setAssets(prev => prev.map(a => a.id === selectedAsset.id ? { ...a, rating } : a));
      }
      // 'f' for favorite
      if (selectedAsset && e.key.toLowerCase() === 'f') {
        setAssets(prev => prev.map(a => a.id === selectedAsset.id ? { ...a, favorite: !a.favorite } : a));
      }
      // 'Escape' to close viewer or reset selection
      if (e.key === 'Escape') {
        if (currentScreen === 'viewer' || currentScreen === 'export') {
          setCurrentScreen('library');
        } else {
          setSelectedAsset(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAsset, currentScreen]);

  const handleOpenAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentScreen('viewer');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('library');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'library':
        return (
          <Library 
            assets={assets} 
            onOpenAsset={handleOpenAsset} 
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            navigateTo={(s) => setCurrentScreen(s)}
          />
        );
      case 'viewer':
        return selectedAsset ? (
          <Viewer 
            asset={selectedAsset} 
            onClose={() => setCurrentScreen('library')} 
          />
        ) : null;
      case 'dedup':
        return (
          <Deduplication 
            onBack={() => setCurrentScreen('library')} 
          />
        );
      case 'projects':
        return (
          <Projects 
            projects={projects}
            onBack={() => setCurrentScreen('library')}
          />
        );
      case 'settings':
        return (
          <Settings 
            onBack={() => setCurrentScreen('library')}
          />
        );
      case 'export':
        return (
          <ExportWizard 
            onBack={() => setCurrentScreen('library')}
            selectedCount={12} // Mock selection count
          />
        );
      default:
        return <div>Screen not found</div>;
    }
  };

  return (
    <div className="h-screen w-screen bg-[#0f1115] text-[#e0e0e0] flex flex-col overflow-hidden select-none">
      {renderScreen()}
    </div>
  );
};

export default App;
