
import React, { useState } from 'react';
import { 
  ArrowLeft, Download, Plus, Archive, Folder, Calendar, 
  Settings, ChevronRight, CheckCircle, Info, X, Zap, Loader2,
  FileText, ExternalLink, ShieldAlert, Layers, Star
} from 'lucide-react';

interface Props {
  onBack: () => void;
  selectedCount: number;
}

const ExportWizard: React.FC<Props> = ({ onBack, selectedCount }) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isExporting, setIsExporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const startExport = () => {
    setIsExporting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setStep(3);
        setIsExporting(false);
      }
      setProgress(Math.floor(p));
    }, 400);
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0f1115] overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-[#2a2f3b] flex items-center px-6 gap-4 shrink-0 bg-[#0f1115]">
        <button onClick={onBack} className="p-2 hover:bg-[#21252b] rounded-full transition-all">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex flex-col">
          <h2 className="font-bold text-sm">Export & Delivery Wizard</h2>
          <p className="text-[10px] text-[#5a5f6b]">Packaging {selectedCount} assets for delivery.</p>
        </div>
        
        {/* Step Indicator */}
        <div className="ml-auto flex items-center gap-8 mr-4">
           <StepInfo active={step >= 1} number={1} label="Preset" />
           <div className="w-12 h-px bg-[#2a2f3b]" />
           <StepInfo active={step >= 2} number={2} label="Packaging" />
           <div className="w-12 h-px bg-[#2a2f3b]" />
           <StepInfo active={step >= 3} number={3} label="Finish" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-12 overflow-y-auto">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div>
                 <h3 className="text-xl font-bold text-white mb-2">Select Export Preset</h3>
                 <p className="text-sm text-[#5a5f6b]">Choose how the assets will be processed and formatted.</p>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <PresetSelect active name="Client Delivery (Clean)" description="Full Res JPEG, Strip Metadata, No Watermark" />
                 <PresetSelect name="Social Preview 2048px" description="2048px Long Edge, Watermarked, Compressed" />
                 <PresetSelect name="Original RAW Handoff" description="Direct Copy of source files, No Processing" />
                 <PresetSelect name="Web Gallery Optimized" description="1080p WebP, sRGB Profile, Strip GPS" />
               </div>
               <div className="p-6 bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest">Naming Pattern Preview</h4>
                  <div className="p-3 bg-[#0f1115] rounded-lg border border-[#2a2f3b] font-mono text-[11px] text-[#00bcd4]">
                    Client_Wedding_2023_{"{seq}"}_DSC_1020.jpg
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-[#5a5f6b]">
                    <Settings className="w-3 h-3" />
                    <span>Using Global Naming Template. Edit in Settings > Export.</span>
                  </div>
               </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Delivery & Structure</h3>
                  <p className="text-sm text-[#5a5f6b]">Configure how the files are organized and delivered.</p>
                </div>
                <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-3xl p-8 space-y-8">
                   <div className="space-y-6">
                      <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Folder Organization</h4>
                      <div className="grid grid-cols-2 gap-3">
                         <OptionCard active icon={<Folder className="w-5 h-5" />} label="By Album Folder" sub="Create subfolders per album" />
                         <OptionCard icon={<Layers className="w-5 h-5" />} label="Flat (All Files)" sub="Place all files in root folder" />
                         <OptionCard icon={<Calendar className="w-5 h-5" />} label="By Date Taken" sub="YYYY/MM/DD structure" />
                         <OptionCard icon={<Star className="w-5 h-5" />} label="By Rating" sub="Group 1-5 star items" />
                      </div>
                   </div>

                   <div className="space-y-6 pt-6 border-t border-[#2a2f3b]">
                      <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Archive Options</h4>
                      <div className="flex items-center justify-between p-4 bg-[#21252b] rounded-2xl border border-[#2a2f3b]">
                         <div className="flex items-center gap-3">
                            <Archive className="w-5 h-5 text-purple-400" />
                            <div>
                               <p className="text-xs font-bold text-white">ZIP Package Delivery</p>
                               <p className="text-[10px] text-[#5a5f6b]">Compress all exported items into a single archive.</p>
                            </div>
                         </div>
                         <div className="w-10 h-5 bg-[#00bcd4] rounded-full relative">
                            <div className="absolute top-1 right-1 w-3 h-3 bg-white rounded-full" />
                         </div>
                      </div>
                   </div>
                </div>

                {isExporting && (
                  <div className="p-8 bg-black/60 backdrop-blur-3xl rounded-3xl border border-[#00bcd4]/20 flex flex-col items-center gap-6">
                     <div className="relative w-20 h-20">
                        <Loader2 className="w-full h-full text-[#00bcd4] animate-spin opacity-20" />
                        <div className="absolute inset-0 flex items-center justify-center text-xs font-mono font-bold text-[#00bcd4]">
                           {progress}%
                        </div>
                     </div>
                     <div className="w-full max-w-sm h-1.5 bg-[#2a2f3b] rounded-full overflow-hidden">
                        <div className="h-full bg-[#00bcd4] transition-all duration-300" style={{ width: `${progress}%` }} />
                     </div>
                     <p className="text-xs text-[#5a5f6b] animate-pulse">Processing asset {Math.floor(selectedCount * (progress/100))} of {selectedCount}...</p>
                  </div>
                )}
             </div>
          )}

          {step === 3 && (
             <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in-95 duration-500">
                <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border-4 border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
                   <CheckCircle className="w-12 h-12 text-green-500" />
                </div>
                <div className="text-center">
                   <h3 className="text-2xl font-bold text-white mb-2">Export Complete</h3>
                   <p className="text-sm text-[#5a5f6b]">{selectedCount} assets exported successfully. ZIP Archive created (2.4 GB).</p>
                </div>
                <div className="flex gap-4">
                   <button className="flex items-center gap-2 px-6 py-3 bg-[#21252b] border border-[#2a2f3b] rounded-xl text-xs font-bold hover:bg-[#2a2f3b]/80 transition-all">
                      <FileText className="w-4 h-4" /> View Report
                   </button>
                   <button className="flex items-center gap-2 px-8 py-3 bg-[#00bcd4] text-white rounded-xl text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">
                      <ExternalLink className="w-4 h-4" /> Open Output Folder
                   </button>
                </div>
                <div className="pt-8 border-t border-[#2a2f3b] w-full max-w-md text-center">
                   <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-bold border border-yellow-500/20">
                      <ShieldAlert className="w-3 h-3" /> Warning: 3 assets skipped due to missing source files.
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
            <span className="text-[10px] text-[#5a5f6b]">Estimated Package Size: ~2.8 GB • Est. Time: 4 mins</span>
         </div>
         <div className="flex gap-4">
            {step < 3 && (
              <button onClick={onBack} className="px-6 py-2 rounded-xl text-xs font-bold text-[#5a5f6b] hover:text-white transition-all">Cancel</button>
            )}
            {step === 1 && (
               <button onClick={() => setStep(2)} className="flex items-center gap-2 px-8 py-2 bg-[#00bcd4] text-white rounded-xl text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">
                  Next: Packaging <ChevronRight className="w-4 h-4" />
               </button>
            )}
            {step === 2 && !isExporting && (
               <button onClick={startExport} className="flex items-center gap-2 px-10 py-2 bg-[#00bcd4] text-white rounded-xl text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">
                  <Zap className="w-4 h-4" /> Start Export Job
               </button>
            )}
            {step === 3 && (
               <button onClick={onBack} className="flex items-center gap-2 px-10 py-2 bg-[#21252b] text-white rounded-xl text-xs font-bold hover:bg-[#2a2f3b] transition-all">
                  Done
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

const PresetSelect: React.FC<{ active?: boolean, name: string, description: string }> = ({ active, name, description }) => (
  <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${active ? 'border-[#00bcd4] bg-[#00bcd4]/5 shadow-lg shadow-[#00bcd4]/10' : 'border-[#2a2f3b] bg-[#1a1d23] hover:border-[#3a3f4b]'}`}>
     <div className="flex items-center justify-between mb-1">
        <h4 className="text-xs font-bold text-white">{name}</h4>
        {active && <CheckCircle className="w-4 h-4 text-[#00bcd4]" />}
     </div>
     <p className="text-[10px] text-[#5a5f6b] leading-relaxed">{description}</p>
  </div>
);

const OptionCard: React.FC<{ active?: boolean, icon: React.ReactNode, label: string, sub: string }> = ({ active, icon, label, sub }) => (
  <div className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${active ? 'border-[#00bcd4] bg-[#00bcd4]/5' : 'border-[#2a2f3b] bg-[#21252b] hover:border-[#3a3f4b]'}`}>
     <div className={`mb-3 ${active ? 'text-[#00bcd4]' : 'text-[#5a5f6b]'}`}>{icon}</div>
     <h4 className="text-[11px] font-bold text-white mb-0.5">{label}</h4>
     <p className="text-[9px] text-[#5a5f6b] leading-tight">{sub}</p>
  </div>
);

export default ExportWizard;
