
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Search, Grid, Layout, List, Filter, ChevronDown, Plus, 
  Library as LibraryIcon, Heart, Clock, Star, Film, Monitor,
  Folder, Layers, Tag, Briefcase, Info, Download, Trash2, 
  Settings as SettingsIcon, MoreHorizontal, ExternalLink, Edit2, Copy, Move,
  Archive, Check, X as LucideX, ArrowUpDown, SortAsc, SortDesc, Image as ImageIcon,
  RotateCcw, ShieldAlert, Video, FilterX
} from 'lucide-react';
import { Asset, Screen, ViewMode, Language } from '../types';
import { translations } from '../translations';

interface Album {
  id: string;
  name: string;
}

interface Props {
  assets: Asset[];
  albums: Album[];
  language: Language;
  onOpenAsset: (asset: Asset) => void;
  selectedAsset: Asset | null;
  setSelectedAsset: (asset: Asset | null) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  onAddAlbum: (name: string) => string;
  navigateTo: (screen: Screen) => void;
}

type CollectionType = 'all' | 'recent' | 'favorites' | 'trash';
type SortKey = 'date-desc' | 'date-asc' | 'rating-desc' | 'name-asc' | 'size-desc';

const Library: React.FC<Props> = ({ 
  assets, 
  albums, 
  language,
  onOpenAsset, 
  selectedAsset, 
  setSelectedAsset, 
  updateAsset,
  onAddAlbum,
  navigateTo 
}) => {
  const t = translations[language];
  const [viewMode, setViewMode] = useState<ViewMode>('masonry');
  const [activeTab, setActiveTab] = useState<'info' | 'tags' | 'notes' | 'organize'>('info');
  const [activeCollection, setActiveCollection] = useState<CollectionType | string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortMode, setSortMode] = useState<SortKey>('date-desc');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'info' | 'success'} | null>(null);
  
  // Quick Filters State
  const [filterVideo, setFilterVideo] = useState(false);
  const [filterImage, setFilterImage] = useState(false);
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [filterMinRating, setFilterMinRating] = useState(0);

  // Filter logic
  const filteredAssets = useMemo(() => {
    let result = [...assets];

    // Basic Collection Filtering
    if (activeCollection === 'trash') {
      result = result.filter(a => a.inTrash);
    } else {
      result = result.filter(a => !a.inTrash);
      if (activeCollection === 'favorites') {
        result = result.filter(a => a.favorite);
      } else if (activeCollection === 'recent') {
        result = result.sort((a, b) => b.date.localeCompare(a.date)).slice(0, 20);
      } else if (activeCollection !== 'all') {
        result = result.filter(a => a.albumId === activeCollection);
      }
    }

    // Advanced Filters
    if (filterVideo && !filterImage) result = result.filter(a => a.type === 'video');
    if (filterImage && !filterVideo) result = result.filter(a => a.type === 'image');
    if (filterFavorite) result = result.filter(a => a.favorite);
    if (filterMinRating > 0) result = result.filter(a => a.rating >= filterMinRating);

    // Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(a => 
        a.name.toLowerCase().includes(q) || 
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    result.sort((a, b) => {
      switch (sortMode) {
        case 'date-desc': return b.date.localeCompare(a.date);
        case 'date-asc': return a.date.localeCompare(b.date);
        case 'rating-desc': return b.rating - a.rating;
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'size-desc': 
          const sizeA = parseFloat(a.size.split(' ')[0]);
          const sizeB = parseFloat(b.size.split(' ')[0]);
          return sizeB - sizeA;
        default: return 0;
      }
    });

    return result;
  }, [assets, activeCollection, searchQuery, sortMode, filterVideo, filterImage, filterFavorite, filterMinRating]);

  const activeTitle = useMemo(() => {
    if (activeCollection === 'all') return t.library.allTitle;
    if (activeCollection === 'recent') return t.library.recentTitle;
    if (activeCollection === 'favorites') return t.library.favoritesTitle;
    if (activeCollection === 'trash') return t.library.trashTitle;
    return albums.find(a => a.id === activeCollection)?.name || 'Library';
  }, [activeCollection, albums, t]);

  const resetFilters = () => {
    setFilterVideo(false);
    setFilterImage(false);
    setFilterFavorite(false);
    setFilterMinRating(0);
    setSearchQuery('');
  };

  const showToast = (message: string, type: 'info' | 'success' = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleMoveToTrash = () => {
    if (selectedAsset) {
      const isCurrentlyInTrash = selectedAsset.inTrash;
      updateAsset(selectedAsset.id, { inTrash: !isCurrentlyInTrash });
      setSelectedAsset(null);
      showToast(isCurrentlyInTrash ? 'Asset restored' : 'Moved to trash', 'success');
    }
  };

  const handleRename = () => {
    if (selectedAsset) {
      const newName = prompt(language === 'en' ? 'Enter new name:' : 'Nhập tên mới:', selectedAsset.name);
      if (newName && newName.trim() !== '') {
        updateAsset(selectedAsset.id, { name: newName.trim() });
        showToast('Asset renamed');
      }
    }
  };

  const handleOpenInFolder = () => {
    if (selectedAsset) {
      const path = `C:\\Users\\Lumina\\Pictures\\Vault\\${selectedAsset.name}`;
      showToast(language === 'en' ? `Opened folder: ${path}` : `Đã mở thư mục: ${path}`);
    }
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 bg-[#1a1d23] border border-[#00bcd4]/30 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className={`w-2 h-2 rounded-full ${notification.type === 'success' ? 'bg-green-400' : 'bg-[#00bcd4]'}`} />
          <span className="text-sm font-medium text-white">{notification.message}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-64 bg-[#1a1d23] border-r border-[#2a2f3b] flex flex-col shrink-0">
        <div className="p-4 flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-[#00bcd4] rounded-lg flex items-center justify-center">
            <LibraryIcon className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">Lumina</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 space-y-6">
          <div>
            <h4 className="px-3 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-2">{t.sidebar.collections}</h4>
            <div className="space-y-1">
              <NavItem icon={<Monitor className="w-4 h-4" />} label={t.sidebar.allAssets} active={activeCollection === 'all'} onClick={() => setActiveCollection('all')} />
              <NavItem icon={<Clock className="w-4 h-4" />} label={t.sidebar.recent} active={activeCollection === 'recent'} onClick={() => setActiveCollection('recent')} />
              <NavItem icon={<Heart className="w-4 h-4" />} label={t.sidebar.favorites} active={activeCollection === 'favorites'} onClick={() => setActiveCollection('favorites')} />
              <NavItem icon={<Trash2 className="w-4 h-4" />} label={t.sidebar.trash} active={activeCollection === 'trash'} onClick={() => setActiveCollection('trash')} count={assets.filter(a => a.inTrash).length} />
            </div>
          </div>

          <div>
            <h4 className="px-3 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-2">{t.sidebar.albums}</h4>
            <div className="space-y-1">
              {albums.map(album => (
                <NavItem key={album.id} icon={<Folder className="w-4 h-4" />} label={album.name} active={activeCollection === album.id} onClick={() => setActiveCollection(album.id)} count={assets.filter(a => a.albumId === album.id && !a.inTrash).length} />
              ))}
            </div>
          </div>
        </nav>

        <div className="p-4 border-t border-[#2a2f3b]">
          <NavItem icon={<SettingsIcon className="w-4 h-4" />} label={t.sidebar.settings} onClick={() => navigateTo('settings')} />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col bg-[#0f1115] relative">
        <header className="border-b border-[#2a2f3b] bg-[#0f1115]/80 backdrop-blur-md sticky top-0 z-10">
          <div className="h-16 flex items-center justify-between px-6 gap-4">
            <div className="flex flex-col">
              <h2 className="text-sm font-bold text-white tracking-tight">{activeTitle}</h2>
              <p className="text-[10px] text-[#5a5f6b]">{filteredAssets.length} items</p>
            </div>

            <div className="flex-1 max-w-xl flex items-center gap-3 bg-[#21252b] px-3 py-2 rounded-lg border border-[#2a2f3b] focus-within:border-[#00bcd4] transition-all">
              <Search className="w-4 h-4 text-[#9a9fa8]" />
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={t.library.searchPlaceholder} className="bg-transparent border-none outline-none text-sm w-full text-white placeholder-[#5a5f6b]" />
            </div>

            <div className="flex items-center gap-3">
              <div className="flex bg-[#21252b] rounded-lg p-1 border border-[#2a2f3b]">
                <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md ${viewMode === 'grid' ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#9a9fa8]'}`} title="Grid"><Grid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('masonry')} className={`p-1.5 rounded-md ${viewMode === 'masonry' ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#9a9fa8]'}`} title="Masonry"><Layout className="w-4 h-4" /></button>
                <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md ${viewMode === 'list' ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#9a9fa8]'}`} title="List"><List className="w-4 h-4" /></button>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="px-6 py-2 border-t border-[#2a2f3b] flex items-center gap-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-1 bg-[#21252b] rounded-lg p-0.5 border border-[#2a2f3b]">
              <FilterButton active={filterImage} onClick={() => setFilterImage(!filterImage)} icon={<ImageIcon className="w-3.5 h-3.5" />} label="Images" />
              <FilterButton active={filterVideo} onClick={() => setFilterVideo(!filterVideo)} icon={<Video className="w-3.5 h-3.5" />} label="Videos" />
            </div>

            <div className="h-4 w-px bg-[#2a2f3b]" />

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map(star => (
                <button 
                  key={star}
                  onClick={() => setFilterMinRating(filterMinRating === star ? 0 : star)}
                  className={`p-1.5 rounded-md transition-all ${filterMinRating >= star ? 'text-yellow-500' : 'text-[#5a5f6b] hover:text-[#9a9fa8]'}`}
                >
                  <Star className={`w-4 h-4 ${filterMinRating >= star ? 'fill-current' : ''}`} />
                </button>
              ))}
              {filterMinRating > 0 && <span className="text-[10px] text-white font-bold ml-1">{filterMinRating}+</span>}
            </div>

            <div className="h-4 w-px bg-[#2a2f3b]" />

            <FilterButton active={filterFavorite} onClick={() => setFilterFavorite(!filterFavorite)} icon={<Heart className={`w-3.5 h-3.5 ${filterFavorite ? 'fill-current' : ''}`} />} label="Favorites" />

            {(filterImage || filterVideo || filterFavorite || filterMinRating > 0 || searchQuery) && (
              <button onClick={resetFilters} className="ml-auto text-[10px] font-bold text-red-400 hover:text-red-300 flex items-center gap-1">
                <FilterX className="w-3 h-3" /> Reset Filters
              </button>
            )}
          </div>
        </header>

        {/* Asset Grid / List */}
        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'list' ? (
            <div className="bg-[#1a1d23] rounded-xl border border-[#2a2f3b] overflow-hidden">
               <table className="w-full text-left border-collapse">
                  <thead className="bg-[#21252b] border-b border-[#2a2f3b] text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">
                    <tr>
                      <th className="px-4 py-3 w-16 text-center">Preview</th>
                      <th className="px-4 py-3">Name</th>
                      <th className="px-4 py-3">Format</th>
                      <th className="px-4 py-3">Resolution</th>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3">Date</th>
                      <th className="px-4 py-3 text-right">Rating</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2f3b]/50">
                    {filteredAssets.map(asset => (
                      <ListRow 
                        key={asset.id} 
                        asset={asset} 
                        isSelected={selectedAsset?.id === asset.id} 
                        onClick={() => setSelectedAsset(asset)}
                        onDoubleClick={() => onOpenAsset(asset)}
                      />
                    ))}
                  </tbody>
               </table>
            </div>
          ) : (
            <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'columns-2 md:columns-3 lg:columns-4 xl:columns-5 space-y-4'}`}>
              {filteredAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} isSelected={selectedAsset?.id === asset.id} onClick={() => setSelectedAsset(asset)} onDoubleClick={() => onOpenAsset(asset)} viewMode={viewMode} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Inspector Panel */}
      <aside className={`w-80 bg-[#1a1d23] border-l border-[#2a2f3b] flex flex-col shrink-0 transition-all duration-300 ${selectedAsset ? 'translate-x-0' : 'translate-x-full absolute right-0 h-full'}`}>
        {selectedAsset && (
          <>
            <div className="p-4 border-b border-[#2a2f3b]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-sm truncate pr-4 text-white">{selectedAsset.name}</h3>
                <button onClick={() => setSelectedAsset(null)} className="p-1 hover:bg-[#2a2f3b] rounded text-[#9a9fa8] hover:text-white"><LucideX className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center bg-[#0f1115] rounded-lg p-1 border border-[#2a2f3b]">
                <InspectorTab label="Info" active={activeTab === 'info'} onClick={() => setActiveTab('info')} />
                <InspectorTab label="Tags" active={activeTab === 'tags'} onClick={() => setActiveTab('tags')} />
                <InspectorTab label="Organize" active={activeTab === 'organize'} onClick={() => setActiveTab('organize')} />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              {activeTab === 'info' && (
                <>
                  <section>
                    <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-3">Metadata</h4>
                    <div className="grid grid-cols-2 gap-y-3 text-xs">
                      <MetaItem label="Camera" value={selectedAsset.metadata.camera} />
                      <MetaItem label="Res" value={selectedAsset.resolution} />
                      <MetaItem label="Size" value={selectedAsset.size} />
                      <MetaItem label="Date" value={selectedAsset.date} />
                    </div>
                  </section>
                  <section>
                    <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest mb-3">Workflow Actions</h4>
                    <div className="space-y-2">
                      {!selectedAsset.inTrash ? (
                        <>
                          <ActionButton icon={<Edit2 className="w-3.5 h-3.5" />} label={language === 'en' ? "Rename File" : "Đổi tên tệp"} onClick={handleRename} />
                          <ActionButton icon={<ExternalLink className="w-3.5 h-3.5" />} label={language === 'en' ? "Show in Folder" : "Hiển thị trong thư mục"} onClick={handleOpenInFolder} />
                          <ActionButton icon={<Trash2 className="w-3.5 h-3.5 text-red-400" />} label={language === 'en' ? "Move to Trash" : "Chuyển vào Thùng rác"} onClick={handleMoveToTrash} />
                        </>
                      ) : (
                        <>
                          <ActionButton icon={<RotateCcw className="w-3.5 h-3.5 text-green-400" />} label={language === 'en' ? "Restore Asset" : "Khôi phục tài sản"} onClick={handleMoveToTrash} />
                        </>
                      )}
                    </div>
                  </section>
                </>
              )}
              {activeTab === 'tags' && (
                <div className="flex flex-wrap gap-2">
                  {selectedAsset.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-[#21252b] border border-[#2a2f3b] rounded text-[10px] text-[#e0e0e0] flex items-center gap-1">
                      {tag} <LucideX className="w-2.5 h-2.5 text-[#5a5f6b]" />
                    </span>
                  ))}
                </div>
              )}
              {activeTab === 'organize' && (
                <div className="space-y-1">
                  {albums.map(album => (
                    <AlbumOption key={album.id} label={album.name} active={selectedAsset.albumId === album.id} onClick={() => updateAsset(selectedAsset.id, { albumId: album.id })} />
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-[#2a2f3b] flex items-center justify-between">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} onClick={() => updateAsset(selectedAsset!.id, { rating: star })} className={`w-3.5 h-3.5 cursor-pointer transition-colors ${selectedAsset.rating >= star ? 'text-yellow-500 fill-current' : 'text-[#3a3f4b]'}`} />
                ))}
              </div>
              <button onClick={() => updateAsset(selectedAsset!.id, { favorite: !selectedAsset.favorite })} className={`p-2 rounded-lg transition-all ${selectedAsset.favorite ? 'bg-red-500/10 text-red-500' : 'text-[#3a3f4b] hover:text-white'}`}>
                <Heart className={`w-4 h-4 ${selectedAsset.favorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
};

// Sub-components
const FilterButton: React.FC<{ active: boolean, onClick: () => void, icon: React.ReactNode, label: string }> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${active ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#5a5f6b] hover:text-[#9a9fa8]'}`}
  >
    {icon} {label}
  </button>
);

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void, count?: number }> = ({ icon, label, active, onClick, count }) => (
  <button onClick={onClick} className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all group ${active ? 'bg-[#00bcd4]/10 text-[#00bcd4]' : 'text-[#9a9fa8] hover:bg-[#21252b] hover:text-[#e0e0e0]'}`}>
    <span className={`${active ? 'text-[#00bcd4]' : 'text-[#5a5f6b] group-hover:text-[#00bcd4]'} transition-colors`}>{icon}</span>
    <span className="flex-1 text-left truncate">{label}</span>
    {count !== undefined && count > 0 && <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${active ? 'bg-[#00bcd4]/20' : 'bg-[#2a2f3b]'}`}>{count}</span>}
  </button>
);

const ListRow: React.FC<{ asset: Asset, isSelected: boolean, onClick: () => void, onDoubleClick: () => void }> = ({ asset, isSelected, onClick, onDoubleClick }) => (
  <tr 
    onClick={onClick}
    onDoubleClick={onDoubleClick}
    className={`hover:bg-[#21252b] transition-colors cursor-pointer group ${isSelected ? 'bg-[#00bcd4]/10' : ''}`}
  >
    <td className="px-4 py-2 flex justify-center">
      <div className="w-10 h-10 rounded overflow-hidden border border-white/5 relative">
        <img src={asset.thumbnail} className="w-full h-full object-cover" />
        {asset.type === 'video' && <Film className="absolute bottom-1 right-1 w-2.5 h-2.5 text-white" />}
      </div>
    </td>
    <td className="px-4 py-2">
      <p className="text-xs font-bold text-white group-hover:text-[#00bcd4] transition-colors truncate max-w-[200px]">{asset.name}</p>
    </td>
    <td className="px-4 py-2 text-[10px] text-[#5a5f6b] uppercase font-mono">{asset.name.split('.').pop()}</td>
    <td className="px-4 py-2 text-[10px] text-[#5a5f6b]">{asset.resolution}</td>
    <td className="px-4 py-2 text-[10px] text-[#5a5f6b]">{asset.size}</td>
    <td className="px-4 py-2 text-[10px] text-[#5a5f6b]">{asset.date}</td>
    <td className="px-4 py-2 text-right">
      <div className="flex items-center justify-end gap-0.5">
        {[1, 2, 3, 4, 5].map(s => (
          <Star key={s} className={`w-2.5 h-2.5 ${asset.rating >= s ? 'text-yellow-500 fill-current' : 'text-[#2a2f3b]'}`} />
        ))}
      </div>
    </td>
  </tr>
);

const AssetCard: React.FC<{ asset: Asset, isSelected: boolean, onClick: () => void, onDoubleClick: () => void, viewMode: ViewMode }> = ({ asset, isSelected, onClick, onDoubleClick, viewMode }) => (
  <div onClick={onClick} onDoubleClick={onDoubleClick} className={`relative group rounded-xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${isSelected ? 'border-[#00bcd4] ring-2 ring-[#00bcd4]/20' : 'border-transparent hover:border-[#3a3f4b]'} ${viewMode === 'masonry' ? 'break-inside-avoid mb-4' : 'aspect-[4/3]'}`}>
    <img src={asset.thumbnail} alt={asset.name} className={`w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 ${viewMode === 'masonry' ? 'h-auto' : ''}`} loading="lazy" />
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
       <p className="text-[10px] font-bold text-white truncate">{asset.name}</p>
       <div className="flex items-center justify-between mt-1">
          <div className="flex gap-0.5">
             {asset.rating > 0 && <span className="text-yellow-500 flex items-center gap-0.5 text-[9px]"><Star className="w-2 h-2 fill-current" /> {asset.rating}</span>}
          </div>
          {asset.favorite && <Heart className="w-3 h-3 text-red-500 fill-current" />}
       </div>
    </div>
    {asset.type === 'video' && <div className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg"><Film className="w-3 h-3 text-white" /></div>}
  </div>
);

const InspectorTab: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all ${active ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#5a5f6b] hover:text-[#9a9fa8]'}`}>{label}</button>
);

const MetaItem: React.FC<{ label: string, value: string | number | undefined }> = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-[#5a5f6b] mb-0.5">{label}</p>
    <p className="text-white font-medium truncate pr-2">{value || '--'}</p>
  </div>
);

const ActionButton: React.FC<{ icon: React.ReactNode, label: string, onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2 bg-[#21252b] border border-[#2a2f3b] hover:border-[#3a3f4b] rounded-lg text-xs text-[#9a9fa8] hover:text-white transition-all text-left">
    {icon} {label}
  </button>
);

const AlbumOption: React.FC<{ label: string, active: boolean, onClick: () => void }> = ({ label, active, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${active ? 'bg-[#00bcd4]/10 text-[#00bcd4] font-bold' : 'text-[#9a9fa8] hover:bg-[#21252b]'}`}>
    <div className="flex items-center gap-2">
      <Folder className={`w-3.5 h-3.5 ${active ? 'text-[#00bcd4]' : 'text-[#5a5f6b]'}`} />
      {label}
    </div>
    {active && <Check className="w-3.5 h-3.5" />}
  </button>
);

export default Library;
