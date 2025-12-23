
import React, { useState } from 'react';
import { 
  ArrowLeft, Monitor, Database, Zap, Tag, Search, Eye, Keyboard, Trash2, 
  Download, Shield, Cpu, ChevronRight, Check, CheckCircle, Globe, Moon, Sun, 
  HardDrive, Info, AlertTriangle, Cloud, Settings as SettingsIcon,
  FileText, Lock, MapPin, RefreshCw, Layers, Command, Filter, ArrowRightLeft, Plus,
  Maximize2, MousePointer2, PlayCircle, Move, Sliders, Palette, Save, RotateCcw,
  Target, BarChart3, AlertCircle, Clock, Archive, Type, Image as ImageIcon,
  History, ShieldCheck, EyeOff, Terminal, ShieldAlert, Folder, Laptop, Gauge,
  User, Copyright, FileCode, Mouse, ListFilter, Activity, X, ScanText, BrainCircuit,
  Fingerprint, Sparkles, FilterX
} from 'lucide-react';
import { SmartAlbum, TagAlias, ExportPreset, Language } from '../types';
import { translations } from '../translations';

interface Props {
  language: Language;
  setLanguage: (lang: Language) => void;
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

const Settings: React.FC<Props> = ({ language, setLanguage, onBack }) => {
  const t = translations[language];
  const [activeSection, setActiveSection] = useState<SettingsSection>('General');
  const [selectedPreset, setSelectedPreset] = useState<string>('ep1');

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'General':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.general} description="Personalize your workspace and application behavior." />
            <div className="space-y-6">
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <SettingRow label={t.settings.language} description={t.settings.languageDesc}>
                  <select 
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none cursor-pointer"
                  >
                    <option value="en">English (US)</option>
                    <option value="vi">Tiếng Việt</option>
                  </select>
                </SettingRow>
                <SettingRow label={t.settings.appearance} description={t.settings.appearanceDesc}>
                  <div className="flex bg-[#21252b] border border-[#2a2f3b] rounded-lg p-1">
                    <ThemeButton icon={<Moon className="w-3 h-3" />} label={language === 'en' ? "Dark" : "Tối"} active />
                    <ThemeButton icon={<Sun className="w-3 h-3" />} label={language === 'en' ? "Light" : "Sáng"} />
                  </div>
                </SettingRow>
                <SettingRow label={t.settings.startup} description={t.settings.startupDesc}>
                  <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                    <option>Open Last Used Library</option>
                    <option>Show Library Manager</option>
                    <option>Open Empty Workspace</option>
                  </select>
                </SettingRow>
              </div>
            </div>
          </div>
        );

      case 'Libraries':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.libraries} description="Manage library locations, watched folders, and storage paths." />
            <div className="space-y-6">
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <Database className="w-3 h-3" /> Active Library
                </h4>
                <div className="flex items-center gap-4 bg-[#0f1115] p-4 rounded-xl border border-[#2a2f3b]">
                  <div className="w-10 h-10 bg-[#00bcd4]/10 rounded-lg flex items-center justify-center">
                    <HardDrive className="w-6 h-6 text-[#00bcd4]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold text-white">Production_Vault_2024</p>
                    <p className="text-[10px] text-[#5a5f6b]">D:\Photography\Lumina_Libraries\Main.lum</p>
                  </div>
                  <button className="px-3 py-1.5 bg-[#21252b] hover:bg-[#3a3f4b] rounded text-[10px] font-bold text-white border border-[#2a2f3b]">Relocate...</button>
                </div>
                <SettingRow label="Library Vault Mode" description="Encrypt the library structure. Requires password on launch.">
                  <Toggle />
                </SettingRow>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                    <Folder className="w-3 h-3" /> Watched Folders
                  </h4>
                  <button className="text-[10px] font-bold text-[#00bcd4] hover:underline">+ Add Folder</button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-[#0f1115] rounded-lg border border-[#2a2f3b]">
                    <div className="flex items-center gap-3">
                      <Monitor className="w-4 h-4 text-[#5a5f6b]" />
                      <span className="text-[11px] text-white">C:\Users\Admin\Downloads</span>
                    </div>
                    <X className="w-3.5 h-3.5 text-[#5a5f6b] cursor-pointer hover:text-red-400" />
                  </div>
                </div>
                <SettingRow label="Auto-Import New Assets" description="Automatically add new files found in watched folders.">
                  <Toggle active />
                </SettingRow>
              </div>
            </div>
          </div>
        );

      case 'Performance':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.performance} description="Optimize speed, hardware resource allocation, and cache." />
            <div className="space-y-6">
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">{t.settings.hardware}</h4>
                <SettingRow label={t.settings.gpu} description={t.settings.gpuDesc}>
                  <Toggle active />
                </SettingRow>
                <SettingRow label="Processing Threads" description="Number of CPU cores dedicated to background indexing.">
                  <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                    <option>Automatic (Recommended)</option>
                    <option>Low (2 Threads)</option>
                    <option>High (8 Threads)</option>
                  </select>
                </SettingRow>
                <SettingRow label={t.settings.memory} description={t.settings.memoryDesc}>
                  <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                    <option>4 GB (Low)</option>
                    <option selected>8 GB (Standard)</option>
                    <option>16 GB+ (Extreme)</option>
                  </select>
                </SettingRow>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Cache & Previews</h4>
                <SettingRow label="Thumbnail Quality" description="Balance between scrolling speed and image clarity.">
                  <div className="flex bg-[#21252b] border border-[#2a2f3b] rounded-lg p-1">
                    <ThemeButton label="Performance" />
                    <ThemeButton label="Balanced" active />
                    <ThemeButton label="High-Res" />
                  </div>
                </SettingRow>
                <SettingRow label="Preview Cache Location" description="Recommended: Fast SSD for smooth browsing.">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-[#5a5f6b] font-mono">C:\AppData\Lumina\Cache</span>
                    <button className="text-[10px] font-bold text-[#00bcd4]">Change</button>
                  </div>
                </SettingRow>
                <div className="pt-4 border-t border-[#2a2f3b] flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white">Current Cache: 14.2 GB</span>
                    <span className="text-[10px] text-[#5a5f6b]">Last optimized 3 days ago.</span>
                  </div>
                  <button className="px-3 py-1.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded-lg text-[10px] font-bold hover:bg-red-500 hover:text-white transition-all">Clear All Cache</button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'Metadata':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.metadata} description="Configure EXIF, XMP sidecars, automated tagging, and copyright." />
            <div className="space-y-6">
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">{t.settings.xmp}</h4>
                <SettingRow label="Write XMP Sidecars" description={t.settings.xmpDesc}>
                  <Toggle active />
                </SettingRow>
                <SettingRow label="Embed Metadata" description="Write tags and ratings directly into JPG/PNG/TIFF files.">
                  <Toggle />
                </SettingRow>
                <SettingRow label="Read-Only Mode" description="Prevent Lumina from ever writing to source files.">
                  <Toggle />
                </SettingRow>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <Activity className="w-3 h-3" /> AI Auto-Tagging
                </h4>
                <SettingRow label="Enable AI Analysis" description="Automatically generate tags using local machine learning.">
                  <Toggle active />
                </SettingRow>
                <SettingRow label="Confidence Threshold" description="Minimum score to automatically apply a tag.">
                  <div className="flex items-center gap-3">
                    <input type="range" className="accent-[#00bcd4] w-24 h-1 bg-[#21252b] rounded-full appearance-none" defaultValue="85" />
                    <span className="text-[10px] font-mono text-white">85%</span>
                  </div>
                </SettingRow>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">{t.settings.copyright}</h4>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="text-[10px] font-bold text-[#5a5f6b] uppercase block mb-1">{t.settings.author}</label>
                     <input type="text" className="w-full bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00bcd4]" defaultValue="John Doe" />
                   </div>
                   <div>
                     <label className="text-[10px] font-bold text-[#5a5f6b] uppercase block mb-1">{t.settings.license}</label>
                     <input type="text" className="w-full bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none focus:border-[#00bcd4]" defaultValue="All Rights Reserved" />
                   </div>
                </div>
                <Checkbox label="Apply global copyright to all new imports" checked />
              </div>
            </div>
          </div>
        );

      case 'Search':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.search} description="Customize AI-driven semantic search, text recognition, and smart collection logic." />
            <div className="space-y-6">
              {/* AI Semantic Indexing */}
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <BrainCircuit className="w-3 h-3 text-[#00bcd4]" /> Intelligent Indexing
                </h4>
                <SettingRow label="Semantic Scene Search" description="Search by natural descriptions like 'blue car on a rainy day'.">
                   <Toggle active />
                </SettingRow>
                <SettingRow label="Object Detection" description="Automatically identify objects (cats, laptops, buildings) for filtering.">
                   <Toggle active />
                </SettingRow>
                <SettingRow label="Facial Recognition" description="Cluster photos by people. Requires local face model download (1.2GB).">
                   <div className="flex items-center gap-2">
                     <button className="px-3 py-1.5 bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/20 rounded-lg text-[10px] font-bold">Download Model</button>
                     <Toggle />
                   </div>
                </SettingRow>
              </div>

              {/* Text Recognition (OCR) */}
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <ScanText className="w-3 h-3 text-[#00bcd4]" /> Optical Character Recognition
                </h4>
                <SettingRow label="Index Text in Media" description="Extract and search for text found in photos and screenshots.">
                   <Toggle active />
                </SettingRow>
                <SettingRow label="OCR Languages" description="Detect text in these primary languages.">
                   <div className="flex gap-1">
                      <span className="px-1.5 py-0.5 bg-[#3a3f4b] rounded text-[9px] font-bold text-white">EN</span>
                      <span className="px-1.5 py-0.5 bg-[#3a3f4b] rounded text-[9px] font-bold text-white">VI</span>
                      <button className="px-1.5 py-0.5 bg-[#21252b] border border-[#2a2f3b] rounded text-[9px] font-bold text-[#00bcd4] hover:bg-[#3a3f4b] transition-all">+</button>
                   </div>
                </SettingRow>
              </div>

              {/* Smart Album Logic */}
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <Sparkles className="w-3 h-3 text-[#00bcd4]" /> Smart Collections
                </h4>
                <SettingRow label="Auto-Update Interval" description="How often rule-based albums should refresh their contents.">
                  <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                    <option selected>Real-time (High CPU)</option>
                    <option>Every 10 Minutes</option>
                    <option>Every Hour</option>
                    <option>Manual Refresh Only</option>
                  </select>
                </SettingRow>
                <SettingRow label="Recursive Rule Evaluation" description="Allows smart albums to include results from other smart albums.">
                   <Toggle />
                </SettingRow>
              </div>

              {/* Exclusion Filters */}
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <FilterX className="w-3 h-3 text-[#00bcd4]" /> Global Exclusions
                </h4>
                <SettingRow label="Ignore Small Files" description="Hide assets smaller than a specific resolution/size.">
                  <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                    <option>No Exclusion</option>
                    <option selected>&lt; 100 KB (Icons)</option>
                    <option>&lt; 500 KB</option>
                  </select>
                </SettingRow>
                <SettingRow label="System Folders" description="Automatically ignore system-generated thumbnails and hidden folders.">
                   <Toggle active />
                </SettingRow>
              </div>
            </div>
          </div>
        );

      case 'Viewer':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.viewer} description="Customize your asset review experience and cinematic mode." />
            <div className="space-y-6">
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Cinema Mode</h4>
                <SettingRow label="Background Dimming" description="Opacity of the overlay when focusing on one asset.">
                   <div className="flex items-center gap-3">
                      <input type="range" className="accent-[#00bcd4] w-24 h-1 bg-[#21252b] rounded-full appearance-none" defaultValue="90" />
                      <span className="text-[10px] font-mono text-white">90%</span>
                   </div>
                </SettingRow>
                <SettingRow label="Auto-Hide UI" description="Hide inspector and sidebar when an asset is opened.">
                  <Toggle active />
                </SettingRow>
                <SettingRow label="Fit to Screen" description="Default zoom behavior when opening a new asset.">
                   <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                     <option>Fit (Complete view)</option>
                     <option>Fill (No black bars)</option>
                     <option>100% (Original size)</option>
                   </select>
                </SettingRow>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">On-Screen Display (OSD)</h4>
                <div className="grid grid-cols-2 gap-3">
                  <Checkbox label="Show technical EXIF (ISO/Apt)" checked />
                  <Checkbox label="Show Filename overlay" checked />
                  <Checkbox label="Show Histogram" />
                  <Checkbox label="Show Focus Point (Sony/Canon only)" />
                  <Checkbox label="Show Media Length" checked />
                  <Checkbox label="Show Safety Margins" />
                </div>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Video Playback</h4>
                <SettingRow label="Default Playback Speed" description="Speed for video and time-lapse assets.">
                   <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                     <option>0.5x</option>
                     <option selected>1.0x</option>
                     <option>1.5x</option>
                     <option>2.0x</option>
                   </select>
                </SettingRow>
                <SettingRow label="Mute by Default" description="Always start video playback without audio.">
                  <Toggle active />
                </SettingRow>
              </div>
            </div>
          </div>
        );

      case 'Hotkeys':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.hotkeys} description="Optimize your professional workflow with custom shortcuts and mouse actions." />
            <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl overflow-hidden shadow-xl">
               <div className="bg-[#21252b]/50 px-6 py-3 border-b border-[#2a2f3b] flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Standard Mappings</span>
                  <button className="text-[10px] font-bold text-[#00bcd4] hover:underline">Reset to Default</button>
               </div>
               <table className="w-full text-left text-xs">
                  <thead className="bg-[#21252b]/30">
                    <tr>
                      <th className="px-6 py-4 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Action</th>
                      <th className="px-6 py-4 text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest">Hotkey</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2a2f3b]/30">
                    <HotkeyItem action="Rate Asset (1 to 5 stars)" keys="1 - 5" />
                    <HotkeyItem action="Toggle Favorite Status" keys="F" />
                    <HotkeyItem action="Open / Close Viewer" keys="Space" />
                    <HotkeyItem action="Edit Asset Metadata" keys="Ctrl + I" />
                    <HotkeyItem action="Fast Export (Preset #1)" keys="Ctrl + E" />
                    <HotkeyItem action="Delete (Move to Trash)" keys="Del / Backspace" />
                    <HotkeyItem action="Fast Forward 10s" keys="L" />
                    <HotkeyItem action="Rewind 10s" keys="J" />
                  </tbody>
               </table>
            </div>
          </div>
        );

      case 'Cleanup':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.cleanup} description="Keep your library clean and optimize storage by identifying duplicates." />
            <div className="space-y-6">
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <Target className="w-3 h-3" /> Perceptual Similarity Engine
                </h4>
                <SettingRow label="Sensitivity Threshold" description="Lower sensitivity finds similar poses; higher finds near-identical shots.">
                   <div className="flex items-center gap-3">
                      <input type="range" className="accent-[#00bcd4] w-32 h-1 bg-[#21252b] rounded-full appearance-none" defaultValue="95" />
                      <span className="text-[10px] font-mono text-[#00bcd4]">95% Match</span>
                   </div>
                </SettingRow>
                <SettingRow label="Auto-Scan on Import" description="Analyze for duplicates as soon as new media is added.">
                   <Toggle active />
                </SettingRow>
              </div>

              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2">
                  <CheckCircle className="w-3 h-3" /> Auto-Pick Best Shot
                </h4>
                <p className="text-[10px] text-[#5a5f6b] leading-tight mb-2 italic">Rules used by the "Auto-Pick" feature in deduplication.</p>
                <div className="space-y-2">
                  <Checkbox label="Prefer higher resolution files" checked />
                  <Checkbox label="Prefer files with higher star rating" checked />
                  <Checkbox label="Prefer newest modification date" />
                  <Checkbox label="Prefer RAW/Original over Proxy/Edit" checked />
                </div>
              </div>

              <div className="bg-red-500/5 border border-red-500/10 rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Trash Hygiene</h4>
                <SettingRow label="Auto-Empty Trash" description="Permanently delete files from the trash after a set period.">
                  <select className="bg-[#21252b] border border-[#2a2f3b] rounded-lg px-3 py-1.5 text-xs text-white outline-none">
                    <option>Never</option>
                    <option selected>After 30 Days</option>
                    <option>After 7 Days</option>
                    <option>After 24 Hours</option>
                  </select>
                </SettingRow>
                <SettingRow label="Protect Rated Assets" description="Warn before moving assets with 4+ stars to trash.">
                  <Toggle active />
                </SettingRow>
              </div>
            </div>
          </div>
        );

      case 'Export':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.export} description="Define rules for social, print, and professional client delivery." />
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Download className="w-4 h-4 text-[#00bcd4]" />
                  <h3 className="text-sm font-bold text-white">Export Presets</h3>
                </div>
                <button className="flex items-center gap-1.5 px-3 py-1 bg-[#00bcd4]/10 text-[#00bcd4] border border-[#00bcd4]/20 rounded-lg text-[10px] font-bold hover:bg-[#00bcd4]/20 transition-all">
                  <Plus className="w-3 h-3" /> {language === 'en' ? 'New Preset' : 'Tạo Preset'}
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
            </div>
          </div>
        );

      case 'Backup':
        return (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-20">
            <SectionHeader title={t.settings.backup} description="Secure your library metadata and optimize local storage." />
            <div className="space-y-8">
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-6">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#00bcd4]" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-widest">{t.settings.maintenance}</h4>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <MaintenanceButton icon={<Layers className="w-3.5 h-3.5" />} title={t.settings.vacuum} sub={t.settings.vacuumDesc} />
                  <MaintenanceButton icon={<Search className="w-3.5 h-3.5" />} title={t.settings.rebuild} sub={t.settings.rebuildDesc} />
                  <MaintenanceButton icon={<ImageIcon className="w-3.5 h-3.5" />} title={t.settings.purge} sub={t.settings.purgeDesc} />
                  <MaintenanceButton icon={<Archive className="w-3.5 h-3.5" />} title={t.settings.prune} sub={t.settings.pruneDesc} />
                </div>
              </div>
              <div className="bg-[#1a1d23] border border-[#2a2f3b] rounded-2xl p-6 space-y-4">
                <h4 className="text-[10px] font-bold text-[#5a5f6b] uppercase tracking-widest flex items-center gap-2"><ShieldCheck className="w-3 h-3" /> {t.settings.privacy}</h4>
                <SettingRow label={t.settings.isolation} description={t.settings.isolationDesc}>
                  <Toggle active />
                </SettingRow>
                <SettingRow label={t.settings.redaction} description={t.settings.redactionDesc}>
                  <Toggle active />
                </SettingRow>
              </div>
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
      <aside className="w-72 border-r border-[#2a2f3b] flex flex-col shrink-0 bg-[#1a1d23]/50">
        <div className="p-6 flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-[#3a3f4b] rounded-full transition-all">
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h2 className="text-lg font-bold text-white tracking-tight">{t.sidebar.settings}</h2>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 space-y-1 py-2">
          <NavItem active={activeSection === 'General'} onClick={() => setActiveSection('General')} icon={<Globe className="w-4 h-4" />} label={t.settings.general} />
          <NavItem active={activeSection === 'Libraries'} onClick={() => setActiveSection('Libraries')} icon={<Database className="w-4 h-4" />} label={t.settings.libraries} />
          <NavItem active={activeSection === 'Performance'} onClick={() => setActiveSection('Performance')} icon={<Zap className="w-4 h-4" />} label={t.settings.performance} />
          <NavItem active={activeSection === 'Metadata'} onClick={() => setActiveSection('Metadata')} icon={<Tag className="w-4 h-4" />} label={t.settings.metadata} />
          <NavItem active={activeSection === 'Search'} onClick={() => setActiveSection('Search')} icon={<Search className="w-4 h-4" />} label={t.settings.search} />
          <NavItem active={activeSection === 'Viewer'} onClick={() => setActiveSection('Viewer')} icon={<Eye className="w-4 h-4" />} label={t.settings.viewer} />
          <NavItem active={activeSection === 'Hotkeys'} onClick={() => setActiveSection('Hotkeys')} icon={<Keyboard className="w-4 h-4" />} label={t.settings.hotkeys} />
          <NavItem active={activeSection === 'Cleanup'} onClick={() => setActiveSection('Cleanup')} icon={<Trash2 className="w-4 h-4" />} label={t.settings.cleanup} />
          <NavItem active={activeSection === 'Export'} onClick={() => setActiveSection('Export')} icon={<Download className="w-4 h-4" />} label={t.settings.export} />
          <NavItem active={activeSection === 'Backup'} onClick={() => setActiveSection('Backup')} icon={<Shield className="w-4 h-4" />} label={t.settings.backup} />
        </nav>
      </aside>
      <main className="flex-1 overflow-y-auto bg-[#0f1115]">
        <div className="max-w-3xl mx-auto p-12 h-full">
          {renderSectionContent()}
        </div>
      </main>
    </div>
  );
};

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

const HotkeyItem: React.FC<{ action: string, keys: string }> = ({ action, keys }) => (
  <tr className="hover:bg-[#21252b]/50 transition-colors">
    <td className="px-6 py-4 text-[#9a9fa8] font-medium">{action}</td>
    <td className="px-6 py-4">
      <div className="flex gap-1.5">
        {keys.split(' / ').map(k => (
          <span key={k} className="px-1.5 py-0.5 bg-[#2a2f3b] border border-[#3a3f4b] rounded text-[10px] font-mono font-bold text-white shadow-sm">{k}</span>
        ))}
      </div>
    </td>
  </tr>
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

const MaintenanceButton: React.FC<{ icon: React.ReactNode, title: string, sub: string }> = ({ icon, title, sub }) => (
  <button className="flex items-center gap-3 p-3 bg-[#21252b] border border-[#2a2f3b] rounded-xl hover:border-[#3a3f4b] transition-all group text-left">
    <div className="p-2 bg-[#0f1115] rounded-lg text-[#5a5f6b] group-hover:text-[#00bcd4] transition-colors">{icon}</div>
    <div className="overflow-hidden">
      <h5 className="text-[10px] font-bold text-white truncate">{title}</h5>
      <p className="text-[9px] text-[#5a5f6b] truncate">{sub}</p>
    </div>
  </button>
);

export default Settings;
