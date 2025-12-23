
import React, { useState, useEffect } from 'react';
import { Screen, Asset, Project, Language } from './types';
import { MOCK_ASSETS, MOCK_PROJECTS } from './constants';
import Onboarding from './screens/Onboarding';
import Library from './screens/Library';
import Viewer from './screens/Viewer';
import Deduplication from './screens/Deduplication';
import Projects from './screens/Projects';
import Settings from './screens/Settings';
import ExportWizard from './screens/ExportWizard';
import ImportWizard from './screens/ImportWizard';

interface Album {
  id: string;
  name: string;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('onboarding');
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [language, setLanguage] = useState<Language>('en');
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [albums, setAlbums] = useState<Album[]>([
    { id: 'wedding-2023', name: 'Wedding 2023' },
    { id: 'portrait-session', name: 'Portrait Session' },
    { id: 'unsorted', name: 'Unsorted' }
  ]);

  // Keyboard Navigation / Global Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Numbers 1-5 for rating
      if (selectedAsset && e.key >= '1' && e.key <= '5') {
        const rating = parseInt(e.key);
        updateAsset(selectedAsset.id, { rating });
      }
      // 'f' for favorite
      if (selectedAsset && e.key.toLowerCase() === 'f') {
        updateAsset(selectedAsset.id, { favorite: !selectedAsset.favorite });
      }
      // 'Escape' to close viewer or reset selection
      if (e.key === 'Escape') {
        if (currentScreen === 'viewer' || currentScreen === 'export' || currentScreen === 'import') {
          setCurrentScreen('library');
        } else {
          setSelectedAsset(null);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedAsset, currentScreen]);

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, ...updates } : a));
    if (selectedAsset?.id === id) {
      setSelectedAsset(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const handleOpenAsset = (asset: Asset) => {
    setSelectedAsset(asset);
    setCurrentScreen('viewer');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('library');
  };

  const handleAddAlbum = (name: string) => {
    const newAlbum = { id: name.toLowerCase().replace(/\s+/g, '-'), name };
    setAlbums(prev => [...prev, newAlbum]);
    return newAlbum.id;
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'onboarding':
        return <Onboarding onComplete={handleOnboardingComplete} />;
      case 'library':
        return (
          <Library 
            assets={assets} 
            albums={albums}
            language={language}
            onOpenAsset={handleOpenAsset} 
            selectedAsset={selectedAsset}
            setSelectedAsset={setSelectedAsset}
            updateAsset={updateAsset}
            onAddAlbum={handleAddAlbum}
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
            language={language}
            setLanguage={setLanguage}
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
      case 'import':
        return (
          <ImportWizard 
            onBack={() => setCurrentScreen('library')}
            onImportComplete={(newAssets) => {
              setAssets(prev => [...newAssets, ...prev]);
              setCurrentScreen('library');
            }}
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
