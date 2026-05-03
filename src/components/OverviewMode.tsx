import { motion } from 'motion/react';
import React from 'react';
import { IMAGES, WALLS } from '../data';
import { useAppState } from '../store';
import { Maximize2, Network } from 'lucide-react';

const SCALE = 0.05;

export function OverviewMode() {
  const { dispatch } = useAppState();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex flex-col"
    >
      <header className="h-16 border-b border-white/10 px-8 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center space-x-6">
          <span className="font-serif text-2xl tracking-widest text-white">PICAS</span>
          <div className="h-4 w-px bg-white/20"></div>
          <span className="text-[10px] uppercase tracking-[0.2em] opacity-60">Overview · Macro</span>
        </div>
        <div className="flex items-center space-x-4">
           <button 
            onClick={() => dispatch({ type: 'flow_transition' })}
            className="flex items-center gap-2 px-4 py-2 text-[10px] uppercase font-mono border border-white/20 rounded-full hover:bg-white/10 transition-colors tracking-wider"
          >
            <Network size={14} />
            <span>Punctum Flow</span>
          </button>
        </div>
      </header>
      
      <div className="flex-1 relative overflow-hidden bg-[#0F0F11] flex items-center justify-center">
        <div className="absolute inset-0 bg-dot-grid" />
        <div className="relative" style={{ width: 0, height: 0 }}>
          {WALLS.map((wall) => {
            const width = wall.width * SCALE;
            const height = 20; // top-down thickness
            const depth = wall.height * SCALE; // actual height of wall
            
            const x = wall.x * SCALE;
            const y = wall.y * SCALE;
            
            // Render top-down representation of wall, but maybe we want a slight isometric or just flat 2D layout.
            // Let's make it a 2D flat layout map.
            
            return (
              <motion.div
                key={wall.id}
                layoutId={`wall-container-${wall.id}`}
                layout
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="absolute border border-white/10 bg-[#1A1A1C] cursor-pointer hover:border-[#F27D26] transition-colors group flex items-end justify-center overflow-hidden"
                style={{
                  width,
                  height: depth,
                  left: x - width / 2,
                  top: y - depth / 2,
                  rotate: wall.rotation,
                }}
                onClick={() => dispatch({ type: 'tap_wall', wallId: wall.id })}
              >
                <div className="absolute inset-0 bg-[#F27D26] opacity-0 group-hover:opacity-5 transition-opacity" />
                <span className="absolute top-2 left-2 font-mono text-[10px] text-[#8E9299] uppercase">
                  {wall.title}
                </span>

                {/* Render placeholders for images on this wall in overview */}
                {IMAGES.filter((img) => img.wallId === wall.id).map((img) => (
                  <motion.div
                    key={img.id}
                    layoutId={`image-${img.id}`}
                    layout
                    transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                    className="absolute bg-[#2A2A2E] border border-black shadow-lg"
                    style={{
                      width: img.width * SCALE,
                      height: img.height * SCALE,
                      left: img.x * SCALE,
                      bottom: img.y * SCALE, // y is from bottom
                    }}
                  >
                     <motion.div 
                        className="w-full h-full"
                        style={{
                           backgroundImage: `url(${img.src})`,
                           backgroundSize: 'cover',
                           backgroundPosition: 'center',
                           opacity: 0.5
                        }}
                     />
                     {/* Punctum glow indicator */}
                     {img.punctumScore > 0.8 && (
                       <div className="absolute -inset-2 bg-orange-500/20 blur-md rounded-full pointer-events-none" />
                     )}
                  </motion.div>
                ))}
              </motion.div>
            );
          })}
        </div>
      </div>
      
      <div className="absolute bottom-6 w-full text-center pointer-events-none">
        <p className="font-mono text-[#8E9299] text-[10px] uppercase tracking-widest">
          Spatial Memory Active • FLIP Transitions Enabled
        </p>
      </div>
    </motion.div>
  );
}
