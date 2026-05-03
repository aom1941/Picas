import { ImageData, ResonanceLink, WallData } from './types';

export const WALLS: WallData[] = [
  { id: 'w_north', title: 'North Wall', width: 12000, height: 4000, x: 0, y: -6000, rotation: 180 },
  { id: 'w_east', title: 'East Wall', width: 8000, height: 4000, x: 6000, y: -2000, rotation: 90 },
  { id: 'w_south', title: 'South Wall', width: 12000, height: 4000, x: 0, y: 2000, rotation: 0 },
  { id: 'w_west', title: 'West Wall', width: 8000, height: 4000, x: -6000, y: -2000, rotation: -90 },
];

export const IMAGES: ImageData[] = [
  // North Wall
  { id: 'img_1', wallId: 'w_north', x: 2000, y: 1500, width: 800, height: 1200, src: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&q=80&w=800', title: 'Abstract Void', punctumScore: 0.8 },
  { id: 'img_2', wallId: 'w_north', x: 4000, y: 1300, width: 1500, height: 1000, src: 'https://images.unsplash.com/photo-1518640164868-6c8a9ddbc3a5?auto=format&fit=crop&q=80&w=800', title: 'Urban Solitude', punctumScore: 0.3 },
  { id: 'img_3', wallId: 'w_north', x: 7000, y: 1400, width: 1000, height: 1400, src: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=800', title: 'Renaissance Echo', punctumScore: 0.95 },
  { id: 'img_4', wallId: 'w_north', x: 9500, y: 1600, width: 900, height: 900, src: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800', title: 'Geometric Shift', punctumScore: 0.6 },
  
  // East Wall
  { id: 'img_5', wallId: 'w_east', x: 1500, y: 1200, width: 1200, height: 1600, src: 'https://images.unsplash.com/photo-1543857778-c4a1a3e0b2eb?auto=format&fit=crop&q=80&w=800', title: 'Midnight Sea', punctumScore: 0.85 },
  { id: 'img_6', wallId: 'w_east', x: 4000, y: 1500, width: 1000, height: 1000, src: 'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&q=80&w=800', title: 'Alpine Wind', punctumScore: 0.2 },
  { id: 'img_7', wallId: 'w_east', x: 6000, y: 1400, width: 900, height: 1300, src: 'https://images.unsplash.com/photo-1557672172-298e090bd0f1?auto=format&fit=crop&q=80&w=800', title: 'Crimson Drop', punctumScore: 0.75 },

  // South Wall
  { id: 'img_8', wallId: 'w_south', x: 3000, y: 1600, width: 1400, height: 900, src: 'https://images.unsplash.com/photo-1506744626753-1fa44df14dd4?auto=format&fit=crop&q=80&w=800', title: 'Desert Mirror', punctumScore: 0.9 },
  { id: 'img_9', wallId: 'w_south', x: 6000, y: 1300, width: 1100, height: 1500, src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800', title: 'Forest Canopy', punctumScore: 0.4 },
  { id: 'img_10', wallId: 'w_south', x: 8500, y: 1500, width: 1000, height: 1000, src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=800', title: 'Autumn Mist', punctumScore: 0.65 },

  // West Wall
  { id: 'img_11', wallId: 'w_west', x: 2000, y: 1400, width: 1300, height: 1300, src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800', title: 'Morning Dew', punctumScore: 0.5 },
  { id: 'img_12', wallId: 'w_west', x: 5000, y: 1500, width: 1600, height: 1100, src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800', title: 'Ocean Horizon', punctumScore: 0.88 },
];

export const LINKS: ResonanceLink[] = [
  { id: 'l1', source: 'img_3', target: 'img_8', weight: 0.9 },
  { id: 'l2', source: 'img_1', target: 'img_5', weight: 0.75 },
  { id: 'l3', source: 'img_5', target: 'img_12', weight: 0.85 },
  { id: 'l4', source: 'img_8', target: 'img_12', weight: 0.6 },
  { id: 'l5', source: 'img_7', target: 'img_1', weight: 0.8 },
];
