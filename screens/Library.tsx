
import React, { useState } from 'react';
import { 
  Search, Grid, Layout, List, Filter, ChevronDown, Plus, 
  Library as LibraryIcon, Heart, Clock, Star, Film, Monitor,
  Folder, Layers, Tag, Briefcase, Info, Download, Trash2, 
  Settings as SettingsIcon, MoreHorizontal, ExternalLink, Edit2, Copy, Move,
  Archive
} from 'lucide-react';
import { Asset, Screen, ViewMode } from '../types';

interface Props {
  assets: Asset[];
  onOpenAsset: (asset: Asset) => void;
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
  navigateTo: (screen: Screen) => void;
}

const Library: React.FC<Props> = ({ assets, onOpenAsset, selectedAsset, setSelectedAsset, navigateTo }) => {
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const [activeTab, setActiveTab] = useState<'info' | 'tags' | 'notes' | 'export'>('info');

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1d23] border-r border-[#2a2f3b] flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#00bcd4] rounded-lg flex items-center justify-center">
            <LibraryIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Lumina</span>
          <div className="ml-auto">
            <ChevronDown className="w-4 h-4 text-[#9a9fa8]" />
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 space-y-6">
          <div>
            <h4 className="px-3 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-2">Collections</h4>
            <div className="space-y-1">
              <NavItem icon={<Monitor className="w-4 h-4" />} label="All Assets" active />
              <NavItem icon={<Clock className="w-4 h-4" />} label="Recent" />
              <NavItem icon={<Heart className="w-4 h-4" />} label="Favorites" />
              <NavItem icon={<Trash2 className="w-4 h-4" />} label="Trash" />
            </div>
          </div>

          <div>
            <h4 className="px-3 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-2">Albums</h4>
            <div className="space-y-1">
              <NavItem icon={<Folder className="w-4 h-4" />} label="Wedding 2023" />
              <NavItem icon={<Folder className="w-4 h-4" />} label="Portrait Session" />
              <NavItem icon={<Folder className="w-4 h-4" />} label="Unsorted" />
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs text-[#9a9fa8] hover:bg-[#21252b] transition-colors">
                <Plus className="w-4 h-4" /> New Album
              </button>
            </div>
          </div>

          <div>
            <h4 className="px-3 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-2">Workflow</h4>
            <div className="space-y-1">
              <NavItem icon={<Briefcase className="w-4 h-4" />} label="Projects" onClick={() => navigateTo('projects')} />
              <NavItem icon={<Layers className="w-4 h-4" />} label="Duplicates" onClick={() => navigateTo('dedup')} />
              <NavItem icon={<Archive className="w-4 h-4 text-purple-400" />} label="Delivery Wizard" onClick={() => navigateTo('export')} />
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-[#2a2f3b]">
          <NavItem icon={<SettingsIcon className="w-4 h-4" />} label="Settings" onClick={() => navigateTo('settings')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#0f1115] relative">
        {/* Top Bar */}
        <header className="h-16 border-b border-[#2a2f3b] flex items-center justify-between px-6 gap-4 shrink-0 bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex-1 max-w-xl flex items-center gap-3 bg-[#21252b] px-3 py-2 rounded-lg border border-[#2a2f3b] focus-within:border-[#00bcd4] transition-all">
            <Search className="w-4 h-4 text-[#9a9fa8]" />
            <input 
              type="text" 
              placeholder="Search by name, tag, or metadata..." 
              className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-[#5a5f6b]"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex bg-[#21252b] rounded-lg p-1 border border-[#2a2f3b]">
              <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#9a9fa8]'}`}><Grid className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('masonry')} className={`p-1.5 rounded-md ${viewMode === 'masonry' ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#9a9fa8]'}`}><Layout className="w-4 h-4" /></button>
              <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#9a9fa8]'}`}><List className="w-4 h-4" /></button>
            </div>
            <div className="h-6 w-px bg-[#2a2f3b]" />
            <button className="flex items-center gap-2 bg-[#00bcd4] hover:bg-[#00acc1] text-white px-4 py-2 rounded-lg font-bold text-xs transition-all shadow-lg active:scale-95">
              <Plus className="w-4 h-4" /> Import
            </button>
          </div>
        </header>

        {/* Filters */}
        <div className="px-6 py-3 flex items-center gap-2 shrink-0 overflow-x-auto no-scrollbar">
          <FilterChip label="Video" icon={<Film className="w-3 h-3" />} />
          <FilterChip label="4K" />
          <FilterChip label="Last 7 days" />
          <FilterChip label="Favorite" icon={<Heart className="w-3 h-3 fill-current" />} />
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-[#9a9fa8] cursor-pointer hover:text-white">
              <span>Sort: Date Added</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className={`grid gap-4 ${
            viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 
            viewMode === 'masonry' ? 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 space-y-4' : 
            'grid-cols-1'
          }`}>
            {assets.map((asset) => (
              <AssetCard 
                key={asset.id} 
                asset={asset} 
                isSelected={selectedAsset?.id === asset.id}
                onClick={() => setSelectedAsset(asset)}
                onDoubleClick={() => onOpenAsset(asset)}
                viewMode={viewMode}
              />
            ))}
          </div>
        </div>
      </main>

      {/* Inspector Panel */}
      <aside className={`w-80 bg-[#1a1d23] border-l border-[#2a2f3b] flex flex-col shrink-0 transition-all ${selectedAsset ? 'translate-x-0' : 'translate-x-full absolute right-0 h-full'}`}>
        {!selectedAsset ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-[#5a5f6b]">
            <Info className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm">Select an asset to view details</p>
          </div>
        ) : (
          <>
            <div className="p-4 border-b border-[#2a2f3b]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm truncate pr-4">{selectedAsset.name}</h3>
                <button onClick={() => setSelectedAsset(null)} className="p-1 hover:bg-[#2a2f3b] rounded"><MoreHorizontal className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center bg-[#0f1115] rounded-lg p-1 border border-[#2a2f3b]">
                <InspectorTab label="Info" active={activeTab === 'info'} onClick={() => setActiveTab('info')} />
                <InspectorTab label="Tags" active={activeTab === 'tags'} onClick={() => setActiveTab('tags')} />
                <InspectorTab label="Notes" active={activeTab === 'notes'} onClick={() => setActiveTab('notes')} />
                <InspectorTab label="Export" active={activeTab === 'export'} onClick={() => setActiveTab('export')} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {activeTab === 'info' && (
                <>
                  <section>
                    <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-3">Metadata</h4>
                    <div className="grid grid-cols-2 gap-y-3 text-xs">
                      <MetaItem label="Camera" value={selectedAsset.metadata.camera} />
                      <MetaItem label="Lens" value={selectedAsset.metadata.lens} />
                      <MetaItem label="ISO" value={selectedAsset.metadata.iso} />
                      <MetaItem label="Aperture" value={selectedAsset.metadata.aperture} />
                      <MetaItem label="Shutter" value={selectedAsset.metadata.shutter} />
                      <MetaItem label="Res" value={selectedAsset.resolution} />
                      {selectedAsset.metadata.duration && <MetaItem label="Length" value={selectedAsset.metadata.duration} />}
                    </div>
                  </section>
                  <section>
                    <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-3">Actions</h4>
                    <div className="space-y-2">
                      <ActionButton icon={<ExternalLink className="w-3.5 h-3.5" />} label="Open in Folder" />
                      <ActionButton icon={<Edit2 className="w-3.5 h-3.5" />} label="Rename" />
                      <ActionButton icon={<Copy className="w-3.5 h-3.5" />} label="Move to Collection" />
                      <ActionButton icon={<Trash2 className="w-3.5 h-3.5 text-red-400" />} label="Move to Trash" />
                    </div>
                  </section>
                </>
              )}

              {activeTab === 'tags' && (
                <div className="space-y-4">
                   <div className="flex flex-wrap gap-2">
                    {selectedAsset.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 bg-[#21252b] border border-[#2a2f3b] rounded text-[10px] text-[#e0e0e0] flex items-center gap-1">
                        {tag} <Plus className="w-2.5 h-2.5 rotate-45 cursor-pointer" />
                      </span>
                    ))}
                  </div>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 w-3 h-3 text-[#5a5f6b]" />
                    <input 
                      type="text" 
                      placeholder="Add tag..." 
                      className="w-full bg-[#0f1115] border border-[#2a2f3b] rounded-md py-2 pl-8 pr-2 text-xs outline-none focus:border-[#00bcd4]"
                    />
                  </div>
                </div>
              )}

              {activeTab === 'notes' && (
                <textarea 
                  className="w-full h-40 bg-[#0f1115] border border-[#2a2f3b] rounded-lg p-3 text-xs outline-none focus:border-[#00bcd4] resize-none"
                  placeholder="Add a note..."
                  defaultValue={selectedAsset.notes}
                />
              )}

              {activeTab === 'export' && (
                <div className="space-y-4">
                  <div 
                    onClick={() => navigateTo('export')}
                    className="p-3 bg-[#00bcd4]/10 border border-[#00bcd4]/20 rounded-lg cursor-pointer hover:bg-[#00bcd4]/20 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#00bcd4]">Open Delivery Wizard</span>
                      <Download className="w-3 h-3 text-[#00bcd4]" />
                    </div>
                  </div>
                  <div className="p-3 bg-[#21252b] border border-[#2a2f3b] rounded-lg cursor-pointer hover:border-[#00bcd4] group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">JPEG 100% (High Res)</span>
                      <Download className="w-3 h-3 text-[#9a9fa8] group-hover:text-[#00bcd4]" />
                    </div>
                  </div>
                  <div className="p-3 bg-[#21252b] border border-[#2a2f3b] rounded-lg cursor-pointer hover:border-[#00bcd4] group">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium">Original Raw</span>
                      <Download className="w-3 h-3 text-[#9a9fa8] group-hover:text-[#00bcd4]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#2a2f3b] flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star} 
                    className={`w-3.5 h-3.5 cursor-pointer transition-colors ${selectedAsset.rating >= star ? 'text-yellow-500 fill-current' : 'text-[#3a3f4b]'}`} 
                  />
                ))}
              </div>
              <div className="flex gap-1">
                <div className="w-3 h-3 rounded-full bg-red-500 cursor-pointer border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-green-500 cursor-pointer border border-white/10" />
                <div className="w-3 h-3 rounded-full bg-blue-500 cursor-pointer border border-white/10" />
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

// Sub-components
const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${active ? 'bg-[#00bcd4]/10 text-[#00bcd4]' : 'text-[#9a9fa8] hover:bg-[#21252b] hover:text-[#e0e0e0]'}`}
  >
    {icon} {label}
  </button>
);

const FilterChip: React.FC<{ label: string, icon?: React.ReactNode }> = ({ label, icon }) => (
  <button className="flex items-center gap-2 px-3 py-1.5 bg-[#21252b] border border-[#2a2f3b] hover:border-[#3a3f4b] rounded-full text-xs text-[#9a9fa8] transition-all shrink-0">
    {icon} {label}
  </button>
);

const AssetCard: React.FC<{ asset: Asset, isSelected: boolean, onClick: () => void, onDoubleClick: () => void, viewMode: ViewMode }> = ({ asset, isSelected, onClick, onDoubleClick, viewMode }) => {
  if (viewMode === 'list') {
    return (
      <div 
        onClick={onClick}
        onDoubleClick={onDoubleClick}
        className={`flex items-center gap-4 p-2 rounded-lg cursor-pointer border transition-all ${isSelected ? 'bg-[#00bcd4]/10 border-[#00bcd4]' : 'bg-[#1a1d23] border-[#2a2f3b] hover:border-[#3a3f4b]'}`}
      >
        <div className="w-12 h-12 bg-[#0f1115] rounded overflow-hidden shrink-0">
          <img src={asset.thumbnail} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">{asset.name}</p>
          <p className="text-[10px] text-[#5a5f6b]">{asset.resolution} • {asset.size}</p>
        </div>
        <div className="flex items-center gap-3 pr-2">
          {asset.favorite && <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />}
          <div className="flex items-center text-xs text-yellow-500"><Star className="w-3 h-3 fill-current mr-1" /> {asset.rating}</div>
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      onDoubleClick={onDoubleClick}
      className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
        isSelected ? 'border-[#00bcd4] ring-2 ring-[#00bcd4]/20' : 'border-transparent hover:border-[#3a3f4b]'
      } ${viewMode === 'masonry' ? 'break-inside-avoid mb-4' : 'aspect-[4/3]'}`}
    >
      <img 
        src={asset.thumbnail} 
        alt={asset.name} 
        className={`w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 ${viewMode === 'masonry' ? 'h-auto' : ''}`}
        loading="lazy"
      />
      
      {/* Type badge */}
      {asset.type === 'video' && (
        <div className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg">
          <Film className="w-3 h-3 text-white" />
        </div>
      )}

      {/* Hover Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-end p-3">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-1">
             <Heart className={`w-4 h-4 hover:scale-110 transition-transform ${asset.favorite ? 'text-red-500 fill-current' : ''}`} />
             <span className="text-[10px] font-medium opacity-80">{asset.name}</span>
          </div>
          <div className="flex gap-0.5">
            <Star className={`w-3 h-3 ${asset.rating >= 1 ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
            <Star className={`w-3 h-3 ${asset.rating >= 3 ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
            <Star className={`w-3 h-3 ${asset.rating >= 5 ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
          </div>
        </div>
      </div>

      {/* Select indicator */}
      {isSelected && (
        <div className="absolute top-2 left-2 bg-[#00bcd4] p-1 rounded-md">
          <div className="w-2 h-2 bg-white rounded-sm" />
        </div>
      )}
    </div>
  );
};

const InspectorTab: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${active ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#5a5f6b] hover:text-[#9a9fa8]'}`}
  >
    {label}
  </button>
);

const MetaItem: React.FC<{ label: string, value: string | number | undefined }> = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-[#5a5f6b] mb-0.5">{label}</p>
    <p className="text-white font-medium truncate pr-2">{value || '--'}</p>
  </div>
);

const ActionButton: React.FC<{ icon: React.ReactNode, label: string }> = ({ icon, label }) => (
  <button className="w-full flex items-center gap-3 px-3 py-2 bg-[#21252b] border border-[#2a2f3b] hover:border-[#3a3f4b] rounded-lg text-xs text-[#9a9fa8] hover:text-white transition-all text-left">
    {icon} {label}
  </button>
);

export default Library;
