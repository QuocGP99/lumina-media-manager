
import React, { useState } from 'react';
import { Database, FolderOpen, ShieldCheck, Zap, Server } from 'lucide-react';

interface Props {
  onComplete: () => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [libType, setLibType] = useState<'reference' | 'managed'>('reference');
  const [watchToggle, setWatchToggle] = useState(true);

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f1115] to-[#1a1d23] p-8">
      <div className="max-w-3xl w-full bg-[#1a1d23]/80 backdrop-blur-xl border border-[#2a2f3b] p-10 rounded-3xl shadow-2xl flex flex-col gap-8">
        <header className="text-center space-y-2">
          <div className="w-16 h-16 bg-[#00bcd4] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_20px_rgba(0,188,212,0.4)]">
            <Database className="text-white w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Setup Your Library</h1>
          <p className="text-[#9a9fa8]">Choose how Lumina handles your files for maximum performance.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            onClick={() => setLibType('reference')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${libType === 'reference' ? 'bg-[#00bcd4]/10 border-[#00bcd4]' : 'bg-[#21252b] border-transparent hover:border-[#3a3f4b]'}`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#2a2f3b] rounded-lg">
                <FolderOpen className={`w-6 h-6 ${libType === 'reference' ? 'text-[#00bcd4]' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Referenced Library</h3>
                <p className="text-xs text-[#9a9fa8] leading-relaxed">Files stay in their original folders. Lumina just scans and indexes them. Best for huge external drives.</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => setLibType('managed')}
            className={`cursor-pointer p-6 rounded-2xl border transition-all duration-300 ${libType === 'managed' ? 'bg-[#00bcd4]/10 border-[#00bcd4]' : 'bg-[#21252b] border-transparent hover:border-[#3a3f4b]'}`}
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-[#2a2f3b] rounded-lg">
                <ShieldCheck className={`w-6 h-6 ${libType === 'managed' ? 'text-[#00bcd4]' : 'text-gray-400'}`} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-1">Managed Library</h3>
                <p className="text-xs text-[#9a9fa8] leading-relaxed">Lumina copies files into its own internal structure. Faster browsing and safer backups.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#21252b] rounded-xl">
              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-yellow-500" />
                <div>
                  <h4 className="text-sm font-medium">Automatic Folder Watch</h4>
                  <p className="text-[10px] text-[#9a9fa8]">Detect new files as they land in your selected folders.</p>
                </div>
              </div>
              <button 
                onClick={() => setWatchToggle(!watchToggle)}
                className={`w-10 h-5 rounded-full transition-colors relative ${watchToggle ? 'bg-[#00bcd4]' : 'bg-[#3a3f4b]'}`}
              >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${watchToggle ? 'right-1' : 'left-1'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-[#21252b] rounded-xl">
              <div className="flex items-center gap-3">
                <Server className="w-5 h-5 text-purple-500" />
                <div>
                  <h4 className="text-sm font-medium">Thumbnail Cache Location</h4>
                  <p className="text-[10px] text-[#9a9fa8]">Recommended: SSD for smooth scrolling. Limit: 10GB.</p>
                </div>
              </div>
              <button className="text-[10px] px-3 py-1 bg-[#3a3f4b] hover:bg-[#4a4f5b] rounded text-[#e0e0e0]">Browse...</button>
            </div>
          </div>

          <button 
            onClick={onComplete}
            className="w-full py-4 bg-[#00bcd4] hover:bg-[#00acc1] text-white font-bold rounded-xl transition-all shadow-[0_4px_14px_rgba(0,188,212,0.3)] active:scale-[0.98]"
          >
            Create Library
          </button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
