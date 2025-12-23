
import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Plus, Folder, ImageIcon, Video, CheckCircle, 
  Info, Loader2, Zap, Settings, ChevronRight, X, Trash2, Tag, 
  HardDrive, Monitor, ShieldCheck, FileText
} from 'lucide-react';
import { Asset } from '../types';

interface Props {
  onBack: () => void;
  onImportComplete: (newAssets: Asset[]) => void;
}

const ImportWizard: React.FC<Props> = ({ onBack, onImportComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isScanning, setIsScanning] = useState(false);
  const [importMethod, setImportMethod] = useState<'reference' | 'managed'>('reference');
  const [progress, setProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsScanning(true);
    const fileList = Array.from(files);
    setSelectedFiles(fileList);

    // Simulate "Scanning" for professional feel
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setIsScanning(false);
        setStep(2);
      }
    }, 80);
  };

  const handleFinishImport = () => {
    setIsScanning(true);
    setProgress(0);
    let p = 0;
    const interval = setInterval(() => {
      p += 15;
      setProgress(Math.min(p, 100));
      if (p >= 100) {
        clearInterval(interval);
        
        // Convert real File objects to Lumina Assets
        const newAssets: Asset[] = selectedFiles.map((file, i) => {
          const isVideo = file.type.startsWith('video/');
          const objectUrl = URL.createObjectURL(file);
          
          return {
            id: `imported-${Date.now()}-${i}`,
            url: objectUrl,
            thumbnail: objectUrl, // For local files, the URL itself serves as a preview
            type: isVideo ? 'video' : 'image',
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            resolution: isVideo ? '4K (Est.)' : 'High Res',
            favorite: false,
            rating: 0,
            date: new Date(file.lastModified).toISOString().split('T')[0],
            metadata: {
              camera: 'Imported File',
              iso: 0,
              aperture: 'N/A',
              shutter: 'N/A'
            },
            tags: ['Local Import', isVideo ? 'Video' : 'Photo'],
            notes: `Imported from local disk: ${file.name}`
          };
        });

        onImportComplete(newAssets);
      }
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f1115] overflow-hidden">
      {/* Hidden Native File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        multiple 
        accept="image/*,video/*" 
        className="hidden" 
      />

      {/* Header */}
      <header className="h-16 border-b border-[#2a2f3b] flex items-center px-6 gap-4 shrink-0 bg-[#0f1115]">
        <button onClick={onBack} className="p-2 hover:bg-[#21252b] rounded-full transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="font-bold text-sm">Import Assets</h2>
          <p className="text-[10px] text-[#5a5f6b]">Add new media to your Lumina library.</p>
        </div>

        <div className="ml-auto flex items-center gap-8 mr-4">
           <StepInfo active={step === 1} number={1} label="Source" />
           <div className="w-8 h-px bg-[#2a2f3b]" />
           <StepInfo active={step === 2} number={2} label="Settings" />
           <div className="w-8 h-px bg-[#2a2f3b]" />
           <StepInfo active={step === 3} number={3} label="Finish" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {step === 1 && !isScanning && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-white mb-2">Select your media source</h3>
                 <p className="text-sm text-[#5a5f6b]">Pick files directly from your disk or external storage.</p>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SourceCard 
                    icon={<Folder className="w-10 h-10 text-[#00bcd4]" />} 
                    title="Choose Files" 
                    description="Open the file picker to select images and videos from your disk."
                    onClick={handleBrowseClick}
                  />
                  <SourceCard 
                    icon={<HardDrive className="w-10 h-10 text-purple-400" />} 
                    title="External Drive" 
                    description="Import directly from an SD card or connected external storage."
                    onClick={handleBrowseClick}
                  />
               </div>

               <div className="p-6 bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl flex items-start gap-4">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-500 border border-yellow-500/20">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white mb-1">Local Processing</h4>
                    <p className="text-[10px] text-[#5a5f6b] leading-relaxed">
                      Lumina indexes your files directly from your disk. We use local blob URLs for previews, 
                      so your high-resolution media never leaves your computer.
                    </p>
                  </div>
               </div>
            </div>
          )}

          {isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95">
               <div className="relative w-24 h-24">
                  <Loader2 className="w-full h-full text-[#00bcd4] animate-spin opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-[#00bcd4]">
                    {progress}%
                  </div>
               </div>
               <div className="text-center">
                  <h3 className="text-lg font-bold text-white mb-1">{progress < 100 ? 'Scanning files...' : 'Finalizing list...'}</h3>
                  <p className="text-xs text-[#5a5f6b]">Preparing metadata and local previews for {selectedFiles.length} items.</p>
               </div>
               <div className="w-full max-w-sm h-1.5 bg-[#2a2f3b] rounded-full overflow-hidden">
                  <div className="h-full bg-[#00bcd4] transition-all duration-300" style={{ width: `${progress}%` }} />
               </div>
            </div>
          )}

          {step === 2 && !isScanning && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Review {selectedFiles.length} files for import</h3>
                    <p className="text-xs text-[#5a5f6b]">Preparing to add files from your selection.</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-[#21252b] border border-[#2a2f3b] rounded text-[10px] text-white font-bold hover:bg-[#3a3f4b]">Deduplicate</button>
                    <button onClick={() => { setStep(1); setSelectedFiles([]); }} className="px-3 py-1 bg-[#21252b] border border-[#2a2f3b] rounded text-[10px] text-white font-bold hover:bg-[#3a3f4b]">Clear All</button>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  {/* Left Column: Real List Preview */}
                  <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl overflow-hidden flex flex-col max-h-[450px]">
                     <div className="p-3 border-b border-[#2a2f3b] bg-[#21252b]/50 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex justify-between">
                        <span>Selected Media</span>
                        <span>Size</span>
                     </div>
                     <div className="flex-1 overflow-y-auto divide-y divide-[#2a2f3b]/50">
                        {selectedFiles.map((file, i) => (
                           <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-[#21252b] transition-colors group">
                              <div className="flex items-center gap-3 overflow-hidden">
                                 <div className="w-10 h-10 bg-[#0f1115] rounded overflow-hidden shrink-0 border border-white/5">
                                    {file.type.startsWith('image/') ? (
                                      <img src={URL.createObjectURL(file)} className="w-full h-full object-cover" />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-[#00bcd4]/10">
                                        <Video className="w-4 h-4 text-[#00bcd4]" />
                                      </div>
                                    )}
                                 </div>
                                 <div className="overflow-hidden">
                                    <span className="text-[11px] font-medium text-white truncate block">{file.name}</span>
                                    <span className="text-[9px] text-[#5a5f6b] uppercase">{file.type.split('/')[1]}</span>
                                 </div>
                              </div>
                              <span className="text-[10px] text-[#5a5f6b] shrink-0">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Column: Settings */}
                  <div className="space-y-6">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                          <Settings className="w-3 h-3" /> Storage Strategy
                        </h4>
                        <div className="grid grid-cols-1 gap-3">
                           <MethodOption 
                             active={importMethod === 'reference'} 
                             icon={<Monitor className="w-4 h-4" />}
                             title="Reference Source (Default)"
                             description="Keep files where they are. Only index metadata."
                             onClick={() => setImportMethod('reference')}
                           />
                           <MethodOption 
                             active={importMethod === 'managed'} 
                             icon={<ShieldCheck className="w-4 h-4" />}
                             title="Copy to Lumina Vault"
                             description="Safer. Copy files into Lumina's library folder."
                             onClick={() => setImportMethod('managed')}
                           />
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                          <Tag className="w-3 h-3" /> Automated Tagging
                        </h4>
                        <div className="flex flex-wrap gap-2">
                           <span className="px-2 py-1 bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/20 rounded text-[10px] font-bold">New Session</span>
                           <span className="px-2 py-1 bg-[#21252b] border border-[#2a2f3b] rounded text-[10px] text-[#5a5f6b] hover:text-white cursor-pointer">+ Add Tags</span>
                        </div>
                     </div>

                     <div className="p-4 bg-[#00bcd4]/5 border border-[#00bcd4]/20 rounded-xl flex gap-3">
                        <Zap className="w-5 h-5 text-[#00bcd4] shrink-0" />
                        <div>
                           <h4 className="text-xs font-bold text-white mb-0.5">Instant AI Indexing</h4>
                           <p className="text-[10px] text-[#5a5f6b]">Your local CPU will index these assets for natural language search immediately after import.</p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="h-20 border-t border-[#2a2f3b] px-12 flex items-center justify-between bg-[#0f1115] shrink-0">
         <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-[#5a5f6b]" />
            <span className="text-[10px] text-[#5a5f6b]">
              {step === 1 ? 'Select images or videos to begin.' : `Ready to import ${selectedFiles.length} items from disk.`}
            </span>
         </div>
         <div className="flex gap-4">
            <button onClick={onBack} className="px-6 py-2 rounded-xl text-xs font-bold text-[#5a5f6b] hover:text-white transition-all">Cancel</button>
            {step === 2 && (
               <button 
                 onClick={handleFinishImport}
                 disabled={isScanning || selectedFiles.length === 0}
                 className="flex items-center gap-2 px-10 py-2 bg-[#00bcd4] text-white rounded-xl text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20 disabled:opacity-50"
               >
                  Complete Import <ChevronRight className="w-4 h-4" />
               </button>
            )}
         </div>
      </footer>
    </div>
  );
};

// Sub-components
const StepInfo: React.FC<{ active: boolean, number: number, label: string }> = ({ active, number, label }) => (
  <div className={`flex items-center gap-3 ${active ? 'opacity-100' : 'opacity-30'}`}>
     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${active ? 'bg-[#00bcd4] border-[#00bcd4] text-white' : 'border-[#5a5f6b] text-[#5a5f6b]'}`}>
        {number}
     </div>
     <span className={`text-[11px] font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-[#5a5f6b]'}`}>{label}</span>
  </div>
);

const SourceCard: React.FC<{ icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className="p-8 bg-[#1a1d23] border-2 border-[#2a2f3b] rounded-3xl cursor-pointer hover:border-[#00bcd4] hover:bg-[#00bcd4]/5 transition-all group flex flex-col items-center text-center space-y-4"
  >
    <div className="transition-transform group-hover:scale-110 duration-300">
      {icon}
    </div>
    <div>
      <h4 className="text-lg font-bold text-white mb-2">{title}</h4>
      <p className="text-xs text-[#5a5f6b] leading-relaxed">{description}</p>
    </div>
    <div className="pt-4">
      <button className="px-6 py-2 bg-[#21252b] border border-[#2a2f3b] rounded-xl text-[11px] font-bold text-[#9a9fa8] group-hover:bg-[#00bcd4] group-hover:text-white group-hover:border-transparent transition-all">
        Browse Files
      </button>
    </div>
  </div>
);

const MethodOption: React.FC<{ active: boolean, icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ active, icon, title, description, onClick }) => (
  <div 
    onClick={onClick}
    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-start gap-4 ${active ? 'bg-[#00bcd4]/10 border-[#00bcd4]' : 'bg-[#21252b] border-transparent hover:border-[#3a3f4b]'}`}
  >
    <div className={`p-2 rounded-lg ${active ? 'bg-[#00bcd4] text-white' : 'bg-[#2a2f3b] text-[#5a5f6b]'}`}>
      {icon}
    </div>
    <div>
      <h5 className="text-[11px] font-bold text-white mb-0.5">{title}</h5>
      <p className="text-[9px] text-[#5a5f6b]">{description}</p>
    </div>
  </div>
);

export default ImportWizard;
