
import React, { useState } from 'react';
import { 
  ArrowLeft, RefreshCw, Trash2, CheckCircle, Info, Layers, 
  ChevronRight, ChevronLeft, Target, AlertTriangle, ShieldCheck, 
  Eye, BarChart3, Clock, Check
} from 'lucide-react';

interface Props {
  onBack: () => void;
}

const Deduplication: React.FC<Props> = ({ onBack }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [activeTab, setActiveTab] = useState<'exact' | 'similar' | 'low-res'>('similar');
  const [selectedSet, setSelectedSet] = useState<number>(0);

  const startScan = () => {
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f1115] overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-[#2a2f3b] flex items-center px-6 gap-4 bg-[#0f1115] z-10 shrink-0">
        <button onClick={onBack} className="p-2 hover:bg-[#21252b] rounded-full transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="font-bold text-sm">Cleanup & Deduplication</h2>
          <p className="text-[10px] text-[#5a5f6b]">Optimize storage and remove visual clutter.</p>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex bg-[#21252b] rounded-lg p-1 border border-[#2a2f3b]">
            <TabButton active={activeTab === 'exact'} onClick={() => setActiveTab('exact')} label="Exact Matches" count={12} />
            <TabButton active={activeTab === 'similar'} onClick={() => setActiveTab('similar')} label="Similar Photos" count={45} />
            <TabButton active={activeTab === 'low-res'} onClick={() => setActiveTab('low-res')} label="Low Quality" count={8} />
          </div>
          <button 
            onClick={startScan}
            disabled={isScanning}
            className="flex items-center gap-2 bg-[#00bcd4] hover:bg-[#00acc1] text-white px-4 py-2 rounded-lg font-bold text-xs transition-all disabled:opacity-50 shadow-lg shadow-[#00bcd4]/20"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            {isScanning ? 'Scanning...' : 'Scan Library'}
          </button>
        </div>
      </header>

      {isScanning ? (
        <div className="flex-1 flex flex-col items-center justify-center">
           <div className="w-24 h-24 border-4 border-t-[#00bcd4] border-[#2a2f3b] rounded-full animate-spin mb-6" />
           <h3 className="text-xl font-bold mb-2 text-white">Analyzing Perceptual Hashes...</h3>
           <p className="text-[#9a9fa8] text-sm max-w-md text-center">Lumina is comparing visual content across 12,400 assets in your library to find duplicates and near-matches.</p>
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar: Set List */}
          <aside className="w-80 border-r border-[#2a2f3b] flex flex-col shrink-0 bg-[#1a1d23]/50 overflow-y-auto">
            <div className="p-4 border-b border-[#2a2f3b] flex items-center justify-between">
              <span className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Similarity Groups</span>
              <button className="text-[10px] text-[#00bcd4] font-bold">Auto-Pick All</button>
            </div>
            <div className="flex-1">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div 
                  key={i} 
                  onClick={() => setSelectedSet(i)}
                  className={`p-4 border-b border-[#2a2f3b]/50 cursor-pointer transition-all ${selectedSet === i ? 'bg-[#00bcd4]/10 border-l-4 border-l-[#00bcd4]' : 'hover:bg-[#21252b]/50'}`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex -space-x-3 overflow-hidden">
                      <img className="inline-block h-8 w-8 rounded-lg ring-2 ring-[#0f1115] object-cover" src={`https://picsum.photos/100/100?sig=${i*10}`} />
                      <img className="inline-block h-8 w-8 rounded-lg ring-2 ring-[#0f1115] object-cover" src={`https://picsum.photos/100/100?sig=${i*11}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold text-white truncate">Burst Session #{120 + i}</p>
                      <p className="text-[9px] text-[#5a5f6b]">94% Match • 3 Assets</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </aside>

          {/* Main Content: Comparison View */}
          <main className="flex-1 flex flex-col bg-[#0f1115] p-8 overflow-y-auto">
            <div className="max-w-6xl mx-auto w-full space-y-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                   <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                     <Target className="w-6 h-6 text-yellow-500" />
                   </div>
                   <div>
                      <h3 className="text-xl font-bold text-white">Review Similarity Set #124</h3>
                      <p className="text-xs text-[#5a5f6b]">Lumina found 3 assets with high visual similarity (94%). Review and keep the best versions.</p>
                   </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 bg-[#21252b] border border-[#2a2f3b] rounded-lg text-xs font-bold hover:text-white transition-all">Ignore Set</button>
                  <button className="px-4 py-2 bg-[#00bcd4] text-white rounded-lg text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">Deduplicate Now</button>
                </div>
              </div>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                 <ComparisonCard 
                    isKeep 
                    img={`https://picsum.photos/600/400?sig=keep`}
                    name="DSC_4520.jpg"
                    res="6000x4000 (24MP)"
                    size="12.4 MB"
                    date="Oct 12, 2023"
                    rating={4}
                    status="Recommended Original"
                 />
                 <ComparisonCard 
                    img={`https://picsum.photos/600/400?sig=dup1`}
                    name="DSC_4520_Edit.jpg"
                    res="1920x1280 (2.5MP)"
                    size="1.2 MB"
                    date="Oct 13, 2023"
                    rating={0}
                    status="Low Resolution Duplicate"
                 />
                 <ComparisonCard 
                    img={`https://picsum.photos/600/400?sig=dup2`}
                    name="Copy_of_DSC_4520.png"
                    res="6000x4000 (24MP)"
                    size="34.1 MB"
                    date="Oct 12, 2023"
                    rating={0}
                    status="Identical Content"
                 />
              </div>

              {/* Advanced Comparison Logic Info */}
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 flex gap-6 items-start">
                 <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <Info className="w-5 h-5 text-blue-400" />
                 </div>
                 <div className="space-y-1">
                    <h4 className="text-xs font-bold text-white">Decision Criteria</h4>
                    <p className="text-[10px] text-[#5a5f6b] leading-relaxed">
                       Lumina suggests keeping <span className="text-white font-bold">DSC_4520.jpg</span> because it has the highest resolution, has a user rating of 4 stars, and is located in your Managed library. Moving others to trash will free up approximately <span className="text-green-400 font-bold">35.3 MB</span>.
                    </p>
                 </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Footer Info */}
      <footer className="h-10 border-t border-[#2a2f3b] bg-[#0f1115] flex items-center px-6 text-[10px] text-[#5a5f6b] justify-between">
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2"><CheckCircle className="w-3 h-3 text-green-400" /> Database Optimized</div>
           <div className="flex items-center gap-2"><Clock className="w-3 h-3" /> Last Full Scan: 2 hours ago</div>
        </div>
        <div>Indexed Assets: 12,400 • Potential Savings: 2.4 GB</div>
      </footer>
    </div>
  );
};

const ComparisonCard: React.FC<{ 
  isKeep?: boolean, 
  img: string, 
  name: string, 
  res: string, 
  size: string, 
  date: string, 
  rating: number,
  status: string 
}> = ({ isKeep, img, name, res, size, date, rating, status }) => (
  <div className={`flex flex-col rounded-2xl border-2 transition-all group overflow-hidden ${isKeep ? 'border-[#00bcd4] bg-[#00bcd4]/5' : 'border-[#2a2f3b] bg-[#1a1d23]'}`}>
     <div className="relative aspect-[3/2] overflow-hidden">
        <img src={img} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all" />
        <button className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-md rounded-lg text-white opacity-0 group-hover:opacity-100 transition-all"><Eye className="w-3.5 h-3.5" /></button>
        {isKeep && (
           <div className="absolute top-2 left-2 px-2 py-1 bg-[#00bcd4] text-white text-[9px] font-bold uppercase rounded shadow-lg">Suggested to Keep</div>
        )}
     </div>
     <div className="p-4 space-y-4">
        <div>
           <h4 className="text-xs font-bold text-white truncate mb-1">{name}</h4>
           <p className="text-[10px] text-[#5a5f6b]">{status}</p>
        </div>
        <div className="grid grid-cols-2 gap-y-3 pt-2">
           <MetaItem label="Resolution" value={res} highlighted={isKeep} />
           <MetaItem label="File Size" value={size} />
           <MetaItem label="Modified" value={date} />
           <MetaItem label="Rating" value={`${rating} stars`} />
        </div>
        <div className="pt-2">
           {isKeep ? (
              <div className="w-full py-2 bg-[#00bcd4] text-white rounded-lg text-[10px] font-bold text-center flex items-center justify-center gap-2 cursor-default">
                 <Check className="w-3.5 h-3.5" /> Keep this asset
              </div>
           ) : (
              <button className="w-full py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all">Move to Trash</button>
           )}
        </div>
     </div>
  </div>
);

const MetaItem: React.FC<{ label: string, value: string, highlighted?: boolean }> = ({ label, value, highlighted }) => (
  <div>
    <p className="text-[9px] text-[#5a5f6b] mb-0.5">{label}</p>
    <p className={`text-[10px] font-medium truncate ${highlighted ? 'text-[#00bcd4]' : 'text-gray-300'}`}>{value}</p>
  </div>
);

const TabButton: React.FC<{ active: boolean, onClick: () => void, label: string, count: number }> = ({ active, onClick, label, count }) => (
  <button 
    onClick={onClick}
    className={`px-4 py-1.5 rounded-md text-[10px] font-bold transition-all flex items-center gap-2 ${active ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#5a5f6b] hover:text-[#9a9fa8]'}`}
  >
    {label} <span className={`px-1.5 py-0.5 rounded-full text-[8px] ${active ? 'bg-[#00bcd4]/20 text-[#00bcd4]' : 'bg-[#2a2f3b] text-[#5a5f6b]'}`}>{count}</span>
  </button>
);

export default Deduplication;
