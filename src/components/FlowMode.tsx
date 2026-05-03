import { motion } from 'motion/react';
import React, { useMemo } from 'react';
import { IMAGES, LINKS } from '../data';
import { useAppState } from '../store';
import { LayoutGrid } from 'lucide-react';

// Hardcoded layout for the graph to maintain stable reproducible design
const FLOW_POSITIONS: Record<string, { x: number; y: number }> = {
  'img_1': { x: 30, y: 30 },
  'img_2': { x: 70, y: 20 },
  'img_3': { x: 50, y: 50 },
  'img_4': { x: 20, y: 70 },
  'img_5': { x: 80, y: 60 },
  'img_6': { x: 65, y: 80 },
  'img_7': { x: 40, y: 80 },
  'img_8': { x: 55, y: 35 },
  'img_9': { x: 90, y: 40 },
  'img_10': { x: 10, y: 45 },
  'img_11': { x: 35, y: 55 },
  'img_12': { x: 70, y: 45 },
};

export function FlowMode() {
  const { dispatch, state } = useAppState();

  const lines = useMemo(() => {
    return LINKS.map((link) => {
      const sourceList = FLOW_POSITIONS[link.source];
      const targetList = FLOW_POSITIONS[link.target];
      if (!sourceList || !targetList) return null;
      return { ...link, sourcePos: sourceList, targetPos: targetList };
    }).filter(Boolean);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(20px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="absolute inset-0 flex flex-col bg-[#0F0F11]"
    >
      <header className="h-16 border-b border-white/10 px-8 bg-[#0A0A0B] flex items-center justify-between z-10 shrink-0">
         <div className="flex items-center space-x-6">
          <span className="font-serif text-2xl tracking-widest text-[#F27D26]">AFFECTIVE REVERB</span>
          <div className="h-4 w-px bg-white/20"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Punctum Flow · Micro</span>
        </div>
        <div className="flex items-center space-x-4">
           <button 
            onClick={() => dispatch({ type: 'pinch_out' })}
            className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-mono border border-white/20 rounded-full hover:bg-white/10 transition-colors tracking-wider"
          >
            <LayoutGrid size={14} />
            <span>Macro View</span>
          </button>
        </div>
      </header>

      <div className="flex-1 relative overflow-hidden">
         {/* Background glow effects */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F27D26] opacity-[0.03] blur-[100px] rounded-full" />
            <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#9C3A1A] opacity-[0.04] blur-[120px] rounded-full" />
         </div>

         {/* SVG layer for resonance lines */}
         <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <defs>
               <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F27D26" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#9C3A1A" stopOpacity="0.8" />
               </linearGradient>
            </defs>
            {lines.map((line) => (
               <motion.line
                  key={line?.id}
                  x1={`${line?.sourcePos.x}%`}
                  y1={`${line?.sourcePos.y}%`}
                  x2={`${line?.targetPos.x}%`}
                  y2={`${line?.targetPos.y}%`}
                  stroke="url(#lineGrad)"
                  strokeWidth={line!.weight * 4}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="blur-[1px]"
               />
            ))}
         </svg>

         {/* Image Nodes */}
         {IMAGES.map((img) => {
            const pos = FLOW_POSITIONS[img.id];
            if (!pos) return null;
            
            const isSelected = state.continuity.selectionSet.has(img.id);

            return (
               <motion.div
                  key={img.id}
                  layoutId={`image-${img.id}`}
                  layout
                  onClick={() => dispatch({ type: 'tap_hotspot', hotspotId: img.id, wallId: img.wallId })}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group rounded-full overflow-hidden border-2 ${isSelected ? 'border-[#F27D26] z-50' : 'border-transparent z-10'}`}
                  style={{
                     left: `${pos.x}%`,
                     top: `${pos.y}%`,
                     width: 80 + img.punctumScore * 60,
                     height: 80 + img.punctumScore * 60,
                  }}
                  whileHover={{ scale: 1.1, zIndex: 40 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               >
                  <motion.div 
                     className="w-full h-full"
                     style={{
                        backgroundImage: `url(${img.src})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                     }}
                  />
                  {/* Punctum highlight */}
                  <div className="absolute inset-0 bg-[#F27D26] opacity-[0.15] mix-blend-overlay pointer-events-none" />
                  
                  {/* Tooltip */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-opacity">
                     <span className="font-mono text-[10px] text-white uppercase text-center block px-2 leading-tight">
                        {img.title}<br/>{img.punctumScore * 100}
                     </span>
                  </div>
               </motion.div>
            )
         })}
      </div>
    </motion.div>
  );
}
