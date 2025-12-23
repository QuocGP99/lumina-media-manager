
import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, Plus, Folder, ImageIcon, Video, CheckCircle, 
  Info, Loader2, Zap, Settings, ChevronRight, X, Trash2, Tag, 
  HardDrive, Monitor, ShieldCheck, FileText, Check, Layers
} from 'lucide-react';
import { Asset } from '../types';

interface Album {
  id: string;
  name: string;
}

interface Props {
  albums: Album[];
  onBack: () => void;
  onImportComplete: (newAssets: Asset[]) => void;
}

const ImportWizard: React.FC<Props> = ({ albums, onBack, onImportComplete }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isScanning, setIsScanning] = useState(false);
  const [importMethod, setImportMethod] = useState<'reference' | 'managed'>('reference');
  const [destinationAlbumId, setDestinationAlbumId] = useState<string | undefined>(undefined);
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
        
        const newAssets: Asset[] = selectedFiles.map((file, i) => {
          const isVideo = file.type.startsWith('video/');
          const objectUrl = URL.createObjectURL(file);
          
          return {
            id: `imported-${Date.now()}-${i}`,
            url: objectUrl,
            thumbnail: objectUrl,
            type: isVideo ? 'video' : 'image',
            name: file.name,
            size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
            resolution: isVideo ? '4K (Est.)' : 'High Res',
            favorite: false,
            rating: 0,
            albumId: destinationAlbumId,
            date: new Date(file.lastModified).toISOString().split('T')[0],
            metadata: {
              camera: 'Imported File',
              iso: 0,
              aperture: 'N/A',
              shutter: 'N/A'
            },
            tags: ['Local Import', isVideo ? 'Video' : 'Photo'],
            notes: `Imported to album: ${destinationAlbumId || 'Unsorted'}`
          };
        });

        onImportComplete(newAssets);
      }
    }, 150);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f1115] overflow-hidden">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} multiple accept="image/*,video/*" className="hidden" />

      <header className="h-16 border-b border-[#2a2f3b] flex items-center px-6 gap-4 shrink-0 bg-[#0f1115]">
        <button onClick={onBack} className="p-2 hover:bg-[#21252b] rounded-full transition-all text-white"><ArrowLeft className="w-5 h-5" /></button>
        <div className="flex flex-col">
          <h2 className="font-bold text-sm text-white">Import Assets</h2>
          <p className="text-[10px] text-[#5a5f6b]">Add new media to your library.</p>
        </div>

        <div className="ml-auto flex items-center gap-8 mr-4">
           <StepInfo active={step === 1} number={1} label="Source" />
           <div className="w-8 h-px bg-[#2a2f3b]" />
           <StepInfo active={step === 2} number={2} label="Settings" />
           <div className="w-8 h-px bg-[#2a2f3b]" />
           <StepInfo active={step === 3} number={3} label="Finish" />
        </div>
      </header>

      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {step === 1 && !isScanning && (
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="text-center">
                 <h3 className="text-2xl font-bold text-white mb-2">Select your media source</h3>
                 <p className="text-sm text-[#5a5f6b]">Pick files directly from your disk.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SourceCard icon={<Folder className="w-10 h-10 text-[#00bcd4]" />} title="Choose Files" description="Open file picker to select images/videos." onClick={handleBrowseClick} />
                  <SourceCard icon={<HardDrive className="w-10 h-10 text-purple-400" />} title="External Storage" description="Import from SD card or USB drive." onClick={handleBrowseClick} />
               </div>
            </div>
          )}

          {isScanning && (
            <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in zoom-in-95">
               <div className="relative w-24 h-24">
                  <Loader2 className="w-full h-full text-[#00bcd4] animate-spin opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-[#00bcd4]">{progress}%</div>
               </div>
               <p className="text-xs text-[#5a5f6b]">Processing {selectedFiles.length} items...</p>
            </div>
          )}

          {step === 2 && !isScanning && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
               <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">Import Review ({selectedFiles.length} files)</h3>
                    <p className="text-xs text-[#5a5f6b]">Configure metadata and storage strategy.</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-8">
                  <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl overflow-hidden flex flex-col max-h-[450px]">
                     <div className="p-3 border-b border-[#2a2f3b] bg-[#21252b]/50 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex justify-between">
                        <span>Selected Media</span>
                        <span>Size</span>
                     </div>
                     <div className="flex-1 overflow-y-auto divide-y divide-[#2a2f3b]/50 no-scrollbar">
                        {selectedFiles.map((file, i) => (
                           <div key={i} className="px-4 py-3 flex items-center justify-between hover:bg-[#21252b]">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-[#0f1115] rounded overflow-hidden border border-white/5 flex items-center justify-center">
                                    <ImageIcon className="w-4 h-4 text-[#5a5f6b]" />
                                 </div>
                                 <span className="text-[11px] font-medium text-white truncate max-w-[150px]">{file.name}</span>
                              </div>
                              <span className="text-[10px] text-[#5a5f6b]">{(file.size / (1024 * 1024)).toFixed(1)} MB</span>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2"><Monitor className="w-3 h-3" /> Destination Album</h4>
                        <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-xl overflow-hidden divide-y divide-[#2a2f3b]/50">
                          {albums.map(album => (
                            <button 
                              key={album.id}
                              onClick={() => setDestinationAlbumId(album.id)}
                              className={`w-full px-4 py-3 text-left text-xs flex items-center justify-between transition-colors ${destinationAlbumId === album.id ? 'bg-[#00bcd4]/10 text-[#00bcd4]' : 'text-gray-400 hover:bg-[#21252b]'}`}
                            >
                              <div className="flex items-center gap-2"><Folder className="w-3.5 h-3.5" /> {album.name}</div>
                              {destinationAlbumId === album.id && <Check className="w-3.5 h-3.5" />}
                            </button>
                          ))}
                          <button 
                             onClick={() => setDestinationAlbumId(undefined)}
                             className={`w-full px-4 py-3 text-left text-xs flex items-center justify-between transition-colors ${!destinationAlbumId ? 'bg-[#00bcd4]/10 text-[#00bcd4]' : 'text-gray-400 hover:bg-[#21252b]'}`}
                          >
                            <div className="flex items-center gap-2"><Layers className="w-3.5 h-3.5" /> No Album (Unsorted)</div>
                            {!destinationAlbumId && <Check className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                     </div>

                     <div className="space-y-4">
                        <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> Strategy</h4>
                        <div className="flex gap-2">
                           <button onClick={() => setImportMethod('reference')} className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${importMethod === 'reference' ? 'bg-[#00bcd4] border-[#00bcd4] text-white' : 'border-[#2a2f3b] text-[#5a5f6b]'}`}>Reference</button>
                           <button onClick={() => setImportMethod('managed')} className={`flex-1 py-2 rounded-lg text-[10px] font-bold border transition-all ${importMethod === 'managed' ? 'bg-[#00bcd4] border-[#00bcd4] text-white' : 'border-[#2a2f3b] text-[#5a5f6b]'}`}>Managed</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
          )}
        </div>
      </main>

      <footer className="h-20 border-t border-[#2a2f3b] px-12 flex items-center justify-between bg-[#0f1115] shrink-0">
         <span className="text-[10px] text-[#5a5f6b] italic">Ready to import {selectedFiles.length} items.</span>
         <div className="flex gap-4">
            <button onClick={onBack} className="px-6 py-2 rounded-xl text-xs font-bold text-[#5a5f6b] hover:text-white transition-all">Cancel</button>
            {step === 2 && (
               <button onClick={handleFinishImport} disabled={isScanning} className="flex items-center gap-2 px-10 py-2 bg-[#00bcd4] text-white rounded-xl text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">Complete <ChevronRight className="w-4 h-4" /></button>
            )}
         </div>
      </footer>
    </div>
  );
};

const StepInfo: React.FC<{ active: boolean, number: number, label: string }> = ({ active, number, label }) => (
  <div className={`flex items-center gap-3 ${active ? 'opacity-100' : 'opacity-30'}`}>
     <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border ${active ? 'bg-[#00bcd4] border-[#00bcd4] text-white' : 'border-[#5a5f6b] text-[#5a5f6b]'}`}>{number}</div>
     <span className={`text-[11px] font-bold uppercase tracking-widest ${active ? 'text-white' : 'text-[#5a5f6b]'}`}>{label}</span>
  </div>
);

const SourceCard: React.FC<{ icon: React.ReactNode, title: string, description: string, onClick: () => void }> = ({ icon, title, description, onClick }) => (
  <div onClick={onClick} className="p-8 bg-[#1a1d23] border-2 border-[#2a2f3b] rounded-3xl cursor-pointer hover:border-[#00bcd4] hover:bg-[#00bcd4]/5 transition-all group flex flex-col items-center text-center space-y-4">
    <div className="transition-transform group-hover:scale-110 duration-300">{icon}</div>
    <div><h4 className="text-lg font-bold text-white mb-2">{title}</h4><p className="text-xs text-[#5a5f6b] leading-relaxed">{description}</p></div>
  </div>
);

export default ImportWizard;
