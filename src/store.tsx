import React, { createContext, useContext, useReducer } from 'react';
import { ContinuityToken, Event, Mode } from './types';

type State = {
  mode: Mode;
  continuity: ContinuityToken;
};

type AppStateContextType = {
  state: State;
  dispatch: React.Dispatch<Event>;
};

const initialState: State = {
  mode: { type: 'overview' },
  continuity: {
    temporalAnchor: Date.now(),
    selectionSet: new Set(),
  },
};

function stateReducer(state: State, event: Event): State {
  switch (event.type) {
    case 'tap_wall':
      if (state.mode.type === 'overview' || state.mode.type === 'flow') {
        return {
          ...state,
          mode: { type: 'wall', wallId: event.wallId },
          continuity: { ...state.continuity, temporalAnchor: Date.now() },
        };
      }
      return state;

    case 'pinch_out':
      if (state.mode.type === 'wall' || state.mode.type === 'flow') {
        return {
          ...state,
          mode: { type: 'overview' },
          continuity: { ...state.continuity, temporalAnchor: Date.now() },
        };
      }
      return state;

    case 'flow_transition':
      return {
        ...state,
        mode: { type: 'flow' },
        continuity: { ...state.continuity, temporalAnchor: Date.now() },
      };

    case 'tap_hotspot':
      return {
        ...state,
        mode: { type: 'wall', wallId: event.wallId },
        continuity: {
          ...state.continuity,
          temporalAnchor: Date.now(),
          selectionSet: new Set([event.hotspotId]),
        },
      };

    default:
      return state;
  }
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(stateReducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error('useAppState must be used within an AppStateProvider');
  }
  return context;
}
