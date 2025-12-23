
export type AssetType = 'image' | 'video';
export type Language = 'en' | 'vi';

export interface Asset {
  id: string;
  url: string;
  thumbnail: string;
  type: AssetType;
  name: string;
  size: string;
  resolution: string;
  favorite: boolean;
  rating: number; // 0-5
  label?: 'red' | 'blue' | 'green' | 'yellow' | 'purple';
  date: string;
  albumId?: string; // Link to specific albums
  inTrash?: boolean;
  metadata: {
    camera?: string;
    lens?: string;
    iso?: number;
    aperture?: string;
    shutter?: string;
    duration?: string;
  };
  tags: string[];
  notes: string;
}

export type ViewMode = 'grid' | 'masonry' | 'list';

export interface Project {
  id: string;
  name: string;
  status: 'Draft' | 'Select' | 'Retouch' | 'Delivered';
  itemCount: number;
  lastModified: string;
}

export interface SmartAlbum {
  id: string;
  name: string;
  rules: string;
  isPinned: boolean;
  usageCount: number;
}

export interface TagAlias {
  canonical: string;
  aliases: string[];
}

export interface ExportPreset {
  id: string;
  name: string;
  format: 'JPG' | 'PNG' | 'TIFF' | 'Original';
  quality: number;
  resizeEdge?: number;
  stripMetadata: boolean;
  watermark: boolean;
}

export type Screen = 'onboarding' | 'library' | 'viewer' | 'dedup' | 'projects' | 'settings' | 'export' | 'import';
