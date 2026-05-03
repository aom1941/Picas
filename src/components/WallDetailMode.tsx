import { motion } from 'motion/react';
import React from 'react';
import { IMAGES, WALLS } from '../data';
import { useAppState } from '../store';
import { ArrowLeft, Network, Ruler } from 'lucide-react';

interface WallDetailModeProps {
  wallId: string;
}

export function WallDetailMode({ wallId }: WallDetailModeProps) {
  const { dispatch, state } = useAppState();
  
  const wall = WALLS.find((w) => w.id === wallId);
  const images = IMAGES.filter((img) => img.wallId === wallId);

  if (!wall) return null;

  // Compute scale to fit wall in screen
  // Assuming a screen height available of roughly 800px.
  // wall.height is 4000mm. So scale around 0.08 gives a nice fit.
  const SCALE = 0.08;
  const targetWidth = wall.width * SCALE;
  const targetHeight = wall.height * SCALE;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 flex flex-col bg-[#0F0F11]"
    >
      <header className="h-16 border-b border-white/10 px-8 bg-[#0A0A0B] flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => dispatch({ type: 'pinch_out' })}
            className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <ArrowLeft size={14} />
          </button>
          <div className="flex items-center space-x-6">
            <span className="font-serif text-2xl tracking-widest text-white">{wall.title}</span>
            <div className="h-4 w-px bg-white/20"></div>
            <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Wall Detail · Meso</span>
          </div>
        </div>
        <div className="flex gap-4">
           <button
            disabled
            title="Measure tool coming soon"
            className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-mono border border-white/10 rounded-full opacity-40 cursor-not-allowed tracking-wider"
          >
            <Ruler size={14} />
            <span>Measure</span>
          </button>
          <button 
            onClick={() => dispatch({ type: 'flow_transition' })}
            className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-mono border border-white/20 rounded-full hover:bg-white/10 transition-colors tracking-wider"
          >
            <Network size={14} />
            <span>Punctum Flow</span>
          </button>
        </div>
      </header>

      {/* Main workspace */}
      <div className="flex-1 relative overflow-hidden flex items-center justify-center">
         {/* Wall Canvas */}
         <motion.div
            layoutId={`wall-container-${wall.id}`}
            layout
            className="relative border border-white/5 bg-[#1A1A1C] shadow-2xl flex items-end overflow-hidden"
            style={{ width: targetWidth, height: targetHeight, rotate: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
         >
            {/* Grid background for wall */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
               backgroundSize: '40px 40px',
               backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)'
            }} />

            {/* Scale Line */}
            <div className="absolute top-8 left-8 right-8 h-px bg-[#F27D26]/40 flex justify-between items-center text-[9px] font-mono text-[#F27D26] pointer-events-none">
               <span className="bg-[#1A1A1C] px-2">0mm</span>
               <span className="bg-[#1A1A1C] px-2">{wall.width}mm Wall Span</span>
               <span className="bg-[#1A1A1C] px-2">{wall.height}mm Height</span>
            </div>

            {images.map((img) => {
               const isSelected = state.continuity.selectionSet.has(img.id);

               return (
                  <motion.div
                     key={img.id}
                     layoutId={`image-${img.id}`}
                     layout
                     className={`absolute bg-[#2A2A2E] border-[4px] border-black shadow-xl group cursor-move ${isSelected ? 'ring-2 ring-[#F27D26] ring-offset-2 ring-offset-[#1a1a1c]' : ''}`}
                     style={{
                        width: img.width * SCALE,
                        height: img.height * SCALE,
                        left: img.x * SCALE,
                        bottom: img.y * SCALE,
                     }}
                     transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                     drag
                     dragMomentum={false}
                     whileDrag={{ scale: 1.02, zIndex: 50, boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
                  >
                     <motion.div 
                        className="w-full h-full"
                        style={{
                           backgroundImage: `url(${img.src})`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                        }}
                     />
                     <div className="absolute inset-0 opacity-50 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                     <div className="absolute bottom-2 left-2 font-mono text-[8px] opacity-40 uppercase">#{img.id}_HDR</div>
                     
                     {/* Overlay info */}
                     <div className="absolute top-full mt-2 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <p className="font-mono text-[10px] opacity-60 text-center uppercase tracking-wider">{img.title}</p>
                     </div>
                  </motion.div>
               );
            })}
         </motion.div>
      </div>
    </motion.div>
  );
}
