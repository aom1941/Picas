/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence } from 'motion/react';
import React from 'react';
import { FlowMode } from './components/FlowMode';
import { OverviewMode } from './components/OverviewMode';
import { WallDetailMode } from './components/WallDetailMode';
import { AppStateProvider, useAppState } from './store';

function ModeRenderer() {
  const { state } = useAppState();

  return (
    <AnimatePresence mode="wait">
      {state.mode.type === 'overview' && <OverviewMode key="overview" />}
      {state.mode.type === 'wall' && <WallDetailMode key={`wall-${state.mode.wallId}`} wallId={state.mode.wallId} />}
      {state.mode.type === 'flow' && <FlowMode key="flow" />}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppStateProvider>
      <div className="w-full h-screen bg-[#0A0A0B] text-[#E0D8D0] overflow-hidden font-sans">
        <ModeRenderer />
      </div>
    </AppStateProvider>
  );
}

