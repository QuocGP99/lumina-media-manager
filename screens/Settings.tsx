
import React, { useState } from 'react';
import { 
  ArrowLeft, Monitor, Database, Zap, Tag, Search, Eye, Keyboard, Trash2, 
  Download, Shield, Cpu, ChevronRight, Check, Globe, Moon, Sun, 
  HardDrive, Info, AlertTriangle, Cloud, Settings as SettingsIcon,
  FileText, Lock, MapPin, RefreshCw, Layers, Command, Filter, ArrowRightLeft, Plus,
  Maximize2, MousePointer2, PlayCircle, Move, Sliders, Palette, Save, RotateCcw,
  Target, BarChart3, AlertCircle, Clock, Archive, Type, Image as ImageIcon,
  History, ShieldCheck, EyeOff, Terminal, ShieldAlert, Folder
} from 'lucide-react';
import { SmartAlbum, TagAlias, ExportPreset } from '../types';

interface Props {
  onBack: () => void;
}

type SettingsSection = 
  | 'General' | 'Libraries' | 'Performance' | 'Metadata' 
  | 'Search' | 'Viewer' | 'Hotkeys' | 'Cleanup' 
  | 'Export' | 'Backup' | 'AI';

const MOCK_PRESETS: ExportPreset[] = [
  { id: 'ep1', name: 'Social 2048px JPG', format: 'JPG', quality: 85, resizeEdge: 2048, stripMetadata: true, watermark: true },
  { id: 'ep2', name: 'Print High-Res 300DPI', format: 'JPG', quality: 95, resizeEdge: 4000, stripMetadata: false, watermark: false },
  { id: 'ep3', name: 'Client Clean Delivery', format: 'JPG', quality: 90, stripMetadata: true, watermark: false },
];

const Settings: React.FC<Props> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<SettingsSection>('Backup');
  const [selectedPreset, setSelectedPreset] = useState<string>('ep1');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'Backup':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title="Backup & Privacy" description="Secure your library metadata and manage your local data footprint." />

            {/* Backup Configuration */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-[#00bcd4]" />
                  <h3 className="text-sm font-bold text-white">Vault Backups</h3>
                </div>
                <button className="flex items-center gap-2 px-4 py-1.5 bg-[#00bcd4] text-white rounded-lg text-[10px] font-bold hover:bg-[#00acc1] transition-all">
                  <Archive className="w-3.5 h-3.5" /> Backup Now
                </button>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-6">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Backup Scope</h4>
                    <div className="space-y-3">
                      <Checkbox label="Library Database (Tags, Ratings, Albums)" checked />
                      <Checkbox label="Application Presets & Settings" checked />
                      <Checkbox label="Thumbnail & Preview Cache (Heavy)" />
                      <Checkbox label="AI Semantic Embeddings Index" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Schedule</h4>
                    <SettingRow label="Frequency" description="When to auto-generate snapshots.">
                      <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                        <option>Daily</option>
                        <option selected>Weekly</option>
                        <option>Monthly</option>
                        <option>Off</option>
                      </select>
                    </SettingRow>
                    <SettingRow label="Retention" description="How many backups to keep.">
                      <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                        <option>Last 3</option>
                        <option selected>Last 7</option>
                        <option>Last 30</option>
                      </select>
                    </SettingRow>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#2a2f3b]">
                  <SettingRow label="Backup Location" description="Recommended: External drive or Cloud-synced folder.">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-[#5a5f6b] font-mono bg-[#0f1115] px-2 py-1 rounded border border-[#2a2f3b]">D:\Backups\Lumina\</span>
                      {/* Added Folder icon here to fix the missing component error */}
                      <button className="p-1.5 bg-[#2a2f3b] hover:bg-[#3a3f4b] rounded text-white transition-all"><Folder className="w-3.5 h-3.5" /></button>
                    </div>
                  </SettingRow>
                </div>
              </div>
            </div>

            {/* Storage Management */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <BarChart3 className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Storage & Maintenance</h3>
              </div>
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                    <span className="text-[#5a5f6b]">Database: 1.2 GB</span>
                    <span className="text-[#00bcd4]">Cache: 8.4 GB</span>
                    <span className="text-purple-400">Previews: 12.1 GB</span>
                  </div>
                  <div className="h-2 w-full bg-[#0f1115] rounded-full overflow-hidden flex">
                    <div className="h-full bg-white/20" style={{ width: '10%' }} />
                    <div className="h-full bg-[#00bcd4]" style={{ width: '40%' }} />
                    <div className="h-full bg-purple-500" style={{ width: '50%' }} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <MaintenanceButton icon={<RefreshCw className="w-3.5 h-3.5" />} label="Vacuum Database" sub="Recover unused disk space" />
                  <MaintenanceButton icon={<Layers className="w-3.5 h-3.5" />} label="Purge Stale Cache" sub="Clear images no longer indexed" />
                  <MaintenanceButton icon={<Search className="w-3.5 h-3.5" />} label="Rebuild Index" sub="Fix search or tag inconsistencies" />
                  <MaintenanceButton icon={<ImageIcon className="w-3.5 h-3.5" />} label="Regenerate Thumbs" sub="Refresh all library previews" />
                </div>
              </div>
            </div>

            {/* Privacy & Local-First */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <h3 className="text-sm font-bold text-white">Privacy & Local-First Policy</h3>
              </div>
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <SettingRow label="Network Isolation" description="Disable all non-essential network calls (except updates).">
                  <Toggle active />
                </SettingRow>
                <SettingRow label="Opt-in Analytics" description="Help us improve Lumina by sharing anonymous usage data.">
                  <Toggle />
                </SettingRow>
                <SettingRow label="Sensitive Path Redaction" description="Hide full Windows paths in UI and diagnostic logs.">
                  <Toggle active />
                </SettingRow>
                <div className="pt-2 border-t border-[#2a2f3b] space-y-3">
                   <Checkbox label="Strip GPS location from all Viewer UI overlays" checked />
                   <Checkbox label="Auto-purge search history every 30 days" />
                </div>
              </div>
            </div>

            {/* Diagnostics */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Terminal className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-bold text-white">Diagnostics & Troubleshooting</h3>
              </div>
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">Export Diagnostic Log</h4>
                    <p className="text-[10px] text-[#5a5f6b]">Redacts private paths and serial numbers by default.</p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-[#21252b] border border-[#2a2f3b] rounded-lg text-xs font-bold hover:text-white transition-all">Generate Report</button>
              </div>
            </div>

            <div className="flex justify-end pt-4 gap-4">
              <button className="px-6 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition-all">
                Factory Reset App
              </button>
              <button className="flex items-center gap-2 px-8 py-2 bg-[#00bcd4] text-white rounded-xl text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">
                <Save className="w-4 h-4" /> Save Security Profile
              </button>
            </div>
          </div>
        );

      case 'Export':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title="Export & Delivery" description="Define export presets for social media, print, and professional client handoffs." />

            {/* Preset Manager */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#00bcd4]" />
                  <h3 className="text-sm font-bold text-white">Preset Manager</h3>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1 bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/20 rounded-lg text-[10px] font-bold hover:bg-[#00bcd4]/20 transition-all">
                  <Plus className="w-3 h-3" /> New Preset
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_PRESETS.map(preset => (
                  <div 
                    key={preset.id}
                    onClick={() => setSelectedPreset(preset.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${selectedPreset === preset.id ? 'border-[#00bcd4] bg-[#00bcd4]/5 shadow-lg shadow-[#00bcd4]/10' : 'border-[#2a2f3b] bg-[#1a1d23] hover:border-[#3a3f4b]'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">{preset.format}</span>
                      {selectedPreset === preset.id && <Check className="w-3 h-3 text-[#00bcd4]" />}
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1">{preset.name}</h4>
                    <p className="text-[9px] text-[#5a5f6b]">{preset.resizeEdge ? `${preset.resizeEdge}px Long Edge` : 'Original Resolution'}</p>
                  </div>
                ))}
              </div>

              {/* Preset Details Editor */}
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl overflow-hidden mt-6">
                 <div className="bg-[#21252b]/50 px-6 py-4 border-b border-[#2a2f3b] flex items-center justify-between">
                    <span className="text-xs font-bold text-white">Preset Parameters: {MOCK_PRESETS.find(p => p.id === selectedPreset)?.name}</span>
                    <div className="flex gap-2">
                      <button className="p-1.5 hover:bg-[#3a3f4b] rounded text-[#5a5f6b]"><RotateCcw className="w-3.5 h-3.5" /></button>
                      <button className="p-1.5 hover:bg-[#3a3f4b] rounded text-[#5a5f6b]"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                 </div>
                 <div className="p-6 space-y-6">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2"><ImageIcon className="w-3 h-3" /> Output & Quality</h5>
                        <SettingRow label="Format" description="Target file extension.">
                          <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                            <option>JPEG</option>
                            <option>PNG</option>
                            <option>TIFF (16-bit)</option>
                            <option>Original (Copy)</option>
                          </select>
                        </SettingRow>
                        <SettingRow label="Quality" description="Compression level (85 suggested).">
                          <div className="flex items-center gap-3">
                            <input type="range" className="w-20 h-1 accent-[#00bcd4]" />
                            <span className="text-[11px] font-mono text-white">85%</span>
                          </div>
                        </SettingRow>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2"><Maximize2 className="w-3 h-3" /> Resizing</h5>
                        <SettingRow label="Resize Strategy" description="How to handle larger images.">
                          <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                            <option>Long Edge (px)</option>
                            <option>Width & Height (Fit)</option>
                            <option>Original Size</option>
                          </select>
                        </SettingRow>
                        <SettingRow label="Pixels" description="Max dimension in pixels.">
                          <input type="number" defaultValue="2048" className="w-20 bg-[#21252b] border border-[#2a2f3b] rounded px-2 py-1 text-xs text-white" />
                        </SettingRow>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 pt-4 border-t border-[#2a2f3b]">
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2"><Lock className="w-3 h-3" /> Privacy & Metadata</h5>
                        <div className="space-y-3">
                          <Checkbox label="Strip GPS/Location Data" checked />
                          <Checkbox label="Remove Camera Serial Number" checked />
                          <Checkbox label="Strip all Technical EXIF" />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h5 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2"><Type className="w-3 h-3" /> Watermarking</h5>
                        <SettingRow label="Enabled" description="Apply watermark to this preset.">
                          <Toggle active={MOCK_PRESETS.find(p => p.id === selectedPreset)?.watermark} />
                        </SettingRow>
                        <SettingRow label="Watermark Text" description="Standard identifier string.">
                          <input type="text" placeholder="© 2023 Lumina Photography" className="w-full bg-[#21252b] border border-[#2a2f3b] rounded px-3 py-1.5 text-xs text-white" />
                        </SettingRow>
                      </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Packaging & Zip */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Archive className="w-4 h-4 text-purple-400" />
                <h3 className="text-sm font-bold text-white">Packaging & ZIP Options</h3>
              </div>
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <SettingRow label="Compress to ZIP" description="Automatically package exports into a single archive.">
                  <Toggle active />
                </SettingRow>
                <SettingRow label="Compression Level" description="Balanced is recommended for speed/size.">
                  <div className="flex bg-[#21252b] border border-[#2a2f3b] rounded-lg p-1">
                    <ThemeButton label="Fast" />
                    <ThemeButton active label="Balanced" />
                    <ThemeButton label="Maximum" />
                  </div>
                </SettingRow>
                <SettingRow label="Split Archives" description="Segment ZIP into smaller parts (helpful for email/cloud).">
                  <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                    <option>No Split</option>
                    <option>2 GB Segments</option>
                    <option>4 GB (FAT32 Compatible)</option>
                  </select>
                </SettingRow>
              </div>
            </div>

            {/* Post-Export Actions */}
            <div className="space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-yellow-400" />
                <h3 className="text-sm font-bold text-white">Workflow Post-Export</h3>
              </div>
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 grid grid-cols-2 gap-4">
                <Checkbox label="Open Folder in Explorer" checked />
                <Checkbox label="Copy Folder Path to Clipboard" />
                <Checkbox label="Show Export Summary Report" checked />
                <Checkbox label="Sound notification on finish" checked />
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button className="flex items-center gap-2 px-8 py-3 bg-[#00bcd4] text-white rounded-xl text-xs font-bold hover:bg-[#00acc1] transition-all shadow-lg shadow-[#00bcd4]/20">
                <Save className="w-4 h-4" /> Apply Global Export Settings
              </button>
            </div>
          </div>
        );

      case 'Cleanup':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title="Dedup & Cleanup" description="Manage duplicate assets and optimize your storage space." />
            <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 flex flex-col items-center justify-center opacity-50">
              <p className="text-xs italic">Cleanup tools are active.</p>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center text-[#5a5f6b] opacity-50 space-y-4 pt-20">
            <SettingsIcon className="w-16 h-16" />
            <p className="text-sm italic">Section content under construction.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex h-full overflow-hidden bg-[#0f1115]">
      {/* Settings Navigation Sidebar */}
      <aside className="w-72 border-r border-[#2a2f3b] flex flex-col shrink-0 bg-[#1a1d23]/50">
        <div className="p-6 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-[#3a3f4b] rounded-full transition-all">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-lg font-bold text-white tracking-tight">Settings</h2>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 space-y-1 py-2">
          <NavItem active={activeSection === 'General'} onClick={() => setActiveSection('General')} icon={<Globe className="w-4 h-4" />} label="General" />
          <NavItem active={activeSection === 'Libraries'} onClick={() => setActiveSection('Libraries')} icon={<Database className="w-4 h-4" />} label="Library & Storage" />
          <NavItem active={activeSection === 'Performance'} onClick={() => setActiveSection('Performance')} icon={<Zap className="w-4 h-4" />} label="Performance & Cache" />
          <NavItem active={activeSection === 'Metadata'} onClick={() => setActiveSection('Metadata')} icon={<Tag className="w-4 h-4" />} label="Metadata & Tagging" />
          <NavItem active={activeSection === 'Search'} onClick={() => setActiveSection('Search')} icon={<Search className="w-4 h-4" />} label="Search & Smart Albums" />
          <NavItem active={activeSection === 'Viewer'} onClick={() => setActiveSection('Viewer')} icon={<Eye className="w-4 h-4" />} label="Viewer & Playback" />
          <NavItem active={activeSection === 'Hotkeys'} onClick={() => setActiveSection('Hotkeys')} icon={<Keyboard className="w-4 h-4" />} label="Hotkeys & Input" />
          <NavItem active={activeSection === 'Cleanup'} onClick={() => setActiveSection('Cleanup')} icon={<Trash2 className="w-4 h-4" />} label="Dedup & Cleanup" />
          <NavItem active={activeSection === 'Export'} onClick={() => setActiveSection('Export')} icon={<Download className="w-4 h-4" />} label="Export & Delivery" />
          <NavItem active={activeSection === 'Backup'} onClick={() => setActiveSection('Backup')} icon={<Shield className="w-4 h-4" />} label="Backup & Privacy" />
          <NavItem active={activeSection === 'AI'} onClick={() => setActiveSection('AI')} icon={<Cpu className="w-4 h-4" />} label="Lumina AI (Local)" />
        </nav>
      </aside>

      {/* Settings Content Pane */}
      <main className="flex-1 overflow-y-auto bg-[#0f1115]">
        <div className="max-w-3xl mx-auto p-12 h-full">
          {renderSectionContent()}
        </div>
      </main>
    </div>
  );
};

// Sub-components
const SectionHeader: React.FC<{ title: string, description: string }> = ({ title, description }) => (
  <header className="mb-8 border-b border-[#2a2f3b] pb-6">
    <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
    <p className="text-sm text-[#9a9fa8]">{description}</p>
  </header>
);

const NavItem: React.FC<{ icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }> = ({ icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center gap-4 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${active ? 'bg-[#00bcd4] text-white shadow-lg shadow-[#00bcd4]/20' : 'text-[#9a9fa8] hover:bg-[#21252b] hover:text-white'}`}
  >
    <span className={`${active ? 'text-white' : 'text-[#5a5f6b] group-hover:text-[#00bcd4]'} transition-colors`}>{icon}</span>
    {label}
  </button>
);

const SettingRow: React.FC<{ label: string, description: string, children: React.ReactNode }> = ({ label, description, children }) => (
  <div className="flex items-center justify-between py-4 border-b border-[#2a2f3b]/50">
    <div className="max-w-[70%]">
      <h4 className="text-xs font-bold text-white mb-1">{label}</h4>
      <p className="text-[10px] text-[#5a5f6b]">{description}</p>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

const Checkbox: React.FC<{ label?: string, checked?: boolean }> = ({ label, checked = false }) => {
  const [val, setVal] = useState(checked);
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <div 
        onClick={() => setVal(!val)}
        className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${val ? 'bg-[#00bcd4] border-[#00bcd4]' : 'border-[#3a3f4b] group-hover:border-[#00bcd4]'}`}
      >
        {val && <Check className="w-3 h-3 text-white" />}
      </div>
      {label && <span className="text-[10px] font-medium text-[#9a9fa8] group-hover:text-white">{label}</span>}
    </label>
  );
};

const MaintenanceButton: React.FC<{ icon: React.ReactNode, label: string, sub: string }> = ({ icon, label, sub }) => (
  <button className="flex items-center gap-4 p-4 bg-[#21252b] border border-[#2a2f3b] rounded-xl hover:border-[#3a3f4b] transition-all group text-left">
    <div className="p-2 bg-[#0f1115] rounded-lg text-[#5a5f6b] group-hover:text-[#00bcd4] transition-colors">{icon}</div>
    <div>
      <h5 className="text-[11px] font-bold text-white">{label}</h5>
      <p className="text-[9px] text-[#5a5f6b]">{sub}</p>
    </div>
  </button>
);

const ThemeButton: React.FC<{ icon?: React.ReactNode, label: string, active?: boolean }> = ({ icon, label, active }) => (
  <button className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-[10px] font-bold transition-all ${active ? 'bg-[#3a3f4b] text-[#00bcd4]' : 'text-[#5a5f6b] hover:text-white'}`}>
    {icon} {label}
  </button>
);

const Toggle: React.FC<{ active?: boolean }> = ({ active: initialActive = false }) => {
  const [active, setActive] = useState(initialActive);
  return (
    <button 
      onClick={() => setActive(!active)}
      className={`w-10 h-5 rounded-full transition-colors relative ${active ? 'bg-[#00bcd4]' : 'bg-[#3a3f4b]'}`}
    >
      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${active ? 'right-1' : 'left-1'}`} />
    </button>
  );
};

export default Settings;
