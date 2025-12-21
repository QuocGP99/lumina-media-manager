
import { Asset, Project } from './types';

export const MOCK_ASSETS: Asset[] = Array.from({ length: 40 }).map((_, i) => ({
  id: `asset-${i}`,
  url: i % 5 === 0 ? 'https://picsum.photos/1920/1080?sig=' + i : 'https://picsum.photos/1200/1600?sig=' + i,
  thumbnail: 'https://picsum.photos/400/300?sig=' + i,
  type: i % 7 === 0 ? 'video' : 'image',
  name: `DSC_${1000 + i}.${i % 7 === 0 ? 'mp4' : 'jpg'}`,
  size: '12.4 MB',
  resolution: i % 7 === 0 ? '3840x2160' : '6000x4000',
  favorite: i % 3 === 0,
  rating: Math.floor(Math.random() * 6),
  label: i % 10 === 0 ? 'red' : i % 10 === 1 ? 'green' : undefined,
  date: '2023-10-15',
  metadata: {
    camera: 'Sony A7IV',
    lens: 'FE 24-70mm F2.8 GM II',
    iso: 400,
    aperture: 'f/2.8',
    shutter: '1/250s',
    duration: i % 7 === 0 ? '00:15' : undefined,
  },
  tags: ['Landscape', 'Nature', 'Outdoor'],
  notes: 'Beautiful sunset session at the coast.',
}));

export const MOCK_PROJECTS: Project[] = [
  { id: 'p1', name: 'Summer Wedding 2023', status: 'Delivered', itemCount: 450, lastModified: '2023-09-12' },
  { id: 'p2', name: 'Product Shoot - Zenith', status: 'Retouch', itemCount: 120, lastModified: '2023-11-01' },
  { id: 'p3', name: 'Travel Series - Iceland', status: 'Select', itemCount: 2100, lastModified: '2023-11-20' },
  { id: 'p4', name: 'Portrait - Alice', status: 'Draft', itemCount: 45, lastModified: '2023-11-25' },
];
