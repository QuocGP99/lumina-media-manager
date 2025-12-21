
import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw, 
  FlipHorizontal, Play, SkipBack, SkipForward, Maximize2, 
  Star, Heart, MoreHorizontal, Info, PlayCircle, FastForward,
  Rewind, Frame
} from 'lucide-react';
import { Asset } from '../types';

interface Props {
  asset: Asset;
  onClose: () => void;
}

const Viewer: React.FC<Props> = ({ asset, onClose }) => {
  const [zoom, setZoom] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Auto-hide controls
  useEffect(() => {
    let timeout: any;
    if (isPlaying) {
      timeout = setTimeout(() => setShowControls(false), 3000);
    } else {
      setShowControls(true);
    }
    return () => clearTimeout(timeout);
  }, [isPlaying]);

  const handleMouseMove = () => {
    setShowControls(true);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black flex flex-col select-none cursor-default overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background Layer for dismiss */}
      <div className="absolute inset-0 z-0" onClick={onClose} />

      {/* Top Bar (OSD & Actions) */}
      <header className={`h-16 flex items-center justify-between px-6 shrink-0 z-20 transition-opacity duration-500 bg-gradient-to-b from-black/80 to-transparent ${showControls ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white transition-all">
            <X className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h3 className="text-white text-xs font-bold flex items-center gap-2">
              {asset.name}
              {asset.favorite && <Heart className="w-3 h-3 text-red-500 fill-current" />}
            </h3>
            <p className="text-[10px] text-gray-400 font-medium">
              {asset.resolution} • {asset.size} • Zoom {zoom}%
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/5 backdrop-blur-xl px-3 py-1.5 rounded-2xl border border-white/10 shadow-2xl">
          <button onClick={(e) => { e.stopPropagation(); setZoom(Math.max(25, zoom - 25)); }} className="p-1.5 hover:text-[#00bcd4] rounded-lg hover:bg-white/5 transition-all"><ZoomOut className="w-4 h-4" /></button>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <button onClick={(e) => { e.stopPropagation(); setZoom(100); }} className="text-[10px] font-bold px-2 hover:text-[#00bcd4]">100%</button>
          <div className="h-4 w-px bg-white/10 mx-1" />
          <button onClick={(e) => { e.stopPropagation(); setZoom(Math.min(800, zoom + 25)); }} className="p-1.5 hover:text-[#00bcd4] rounded-lg hover:bg-white/5 transition-all"><ZoomIn className="w-4 h-4" /></button>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <button className="p-1.5 hover:text-[#00bcd4] rounded-lg hover:bg-white/5 transition-all"><RotateCcw className="w-4 h-4" /></button>
          <button className="p-1.5 hover:text-[#00bcd4] rounded-lg hover:bg-white/5 transition-all"><FlipHorizontal className="w-4 h-4" /></button>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5 mr-4">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} className={`w-3.5 h-3.5 ${asset.rating >= s ? 'text-yellow-500 fill-current' : 'text-white/20'}`} />
            ))}
          </div>
          <button className="px-4 py-2 bg-[#00bcd4] text-white rounded-xl font-bold text-xs hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">
            Export Presets
          </button>
        </div>
      </header>

      {/* Main Content Viewport */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden z-10" onClick={onClose}>
        {/* Navigation Arrows */}
        <button 
          onClick={(e) => e.stopPropagation()}
          className={`absolute left-8 z-30 p-5 bg-black/40 backdrop-blur-md hover:bg-[#00bcd4]/20 rounded-full text-white transition-all group border border-white/10 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={(e) => e.stopPropagation()}
          className={`absolute right-8 z-30 p-5 bg-black/40 backdrop-blur-md hover:bg-[#00bcd4]/20 rounded-full text-white transition-all group border border-white/10 ${showControls ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'}`}
        >
          <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
        </button>

        <div 
          className="transition-all duration-300 ease-out transform origin-center flex items-center justify-center cursor-move" 
          style={{ scale: `${zoom / 100}` }}
          onClick={(e) => e.stopPropagation()}
        >
          {asset.type === 'video' ? (
             <div className="relative group rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)] border border-white/5">
               <img src={asset.url} className="max-h-[80vh] max-w-[90vw] object-contain" />
               <div className="absolute inset-0 flex items-center justify-center">
                 {!isPlaying && (
                    <button 
                      onClick={() => setIsPlaying(true)}
                      className="w-24 h-24 bg-[#00bcd4] text-white rounded-full flex items-center justify-center shadow-2xl backdrop-blur-md hover:scale-110 transition-transform active:scale-95"
                    >
                      <Play className="w-10 h-10 ml-2 fill-current" />
                    </button>
                 )}
               </div>
             </div>
          ) : (
            <img 
              src={asset.url} 
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-[0_0_80px_rgba(0,0,0,0.6)] border border-white/5" 
            />
          )}
        </div>
      </div>

      {/* Bottom Bar (Timeline & Filmstrip) */}
      <footer className={`shrink-0 z-20 transition-all duration-700 bg-gradient-to-t from-black via-black/90 to-transparent ${showControls ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'}`}>
        
        {/* Playback Controls (Video Only) */}
        {asset.type === 'video' && (
          <div className="px-12 py-4 flex flex-col gap-4">
            <div className="group flex flex-col gap-3">
              <div className="relative h-2 w-full bg-white/10 rounded-full overflow-hidden cursor-pointer group/line">
                <div className="absolute left-0 top-0 h-full w-[35%] bg-[#00bcd4] rounded-full" />
                <div className="absolute left-[35%] top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 bg-white rounded-full shadow-2xl opacity-0 group-hover/line:opacity-100 transition-opacity ring-4 ring-[#00bcd4]/20" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"><Rewind className="w-4 h-4" /></button>
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 bg-white/5 hover:bg-[#00bcd4] rounded-xl text-white transition-all"
                    >
                      {isPlaying ? <X className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                    </button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all"><FastForward className="w-4 h-4" /></button>
                  </div>
                  <div className="h-6 w-px bg-white/10 mx-2" />
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all" title="Frame Step Back (,)"><ChevronLeft className="w-4 h-4" /></button>
                    <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-all" title="Frame Step Forward (.)"><ChevronRight className="w-4 h-4" /></button>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                   <span className="text-[11px] font-mono text-white/60 tabular-nums tracking-widest">00:04:12 <span className="text-white/20 mx-1">/</span> {asset.metadata.duration}</span>
                   <button className="text-[10px] font-bold text-[#00bcd4] px-3 py-1 bg-[#00bcd4]/10 rounded-lg border border-[#00bcd4]/20 hover:bg-[#00bcd4]/20">Set Cover</button>
                   <Maximize2 className="w-4 h-4 text-white/40 hover:text-white cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filmstrip Context */}
        <div className="h-28 flex items-center justify-center px-12 pb-6 gap-3 overflow-x-hidden">
          <div className="flex items-center gap-2 p-1 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-inner">
            {[...Array(9)].map((_, i) => (
              <div 
                key={i} 
                className={`w-20 h-16 rounded-xl overflow-hidden shrink-0 cursor-pointer border-2 transition-all relative group/thumb ${i === 4 ? 'border-[#00bcd4] scale-105 shadow-2xl z-10' : 'border-transparent opacity-40 hover:opacity-100'}`}
              >
                <img src={`https://picsum.photos/200/200?sig=${i + 120}`} className="w-full h-full object-cover grayscale-[0.5] group-hover/thumb:grayscale-0 transition-all" />
                {i === 4 && <div className="absolute inset-0 ring-4 ring-inset ring-[#00bcd4]/30 pointer-events-none" />}
              </div>
            ))}
          </div>
        </div>
      </footer>

      {/* Professional Shortcut Overlay (Bottom Left) */}
      <div className={`fixed bottom-8 left-10 text-[10px] flex items-center gap-6 z-30 transition-opacity duration-500 ${showControls ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/10 text-white font-bold">ESC</kbd>
          <span className="text-white/60">Back</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/10 text-white font-bold">J/K</kbd>
          <span className="text-white/60">Prev/Next</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/10 text-white font-bold">1-5</kbd>
          <span className="text-white/60">Rate</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/10 text-white font-bold">F</kbd>
          <span className="text-white/60">Favorite</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/10 text-white font-bold">,</kbd>
          <kbd className="px-1.5 py-0.5 bg-white/10 rounded-md border border-white/10 text-white font-bold">.</kbd>
          <span className="text-white/60">Frame Step</span>
        </div>
      </div>
    </div>
  );
};

export default Viewer;
