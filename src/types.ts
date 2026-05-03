export type WallID = string;
export type ImageID = string;
export type HotspotID = string;
export type PersonaID = string;
export type PeerID = string;

export type Mode =
  | { type: 'overview' }
  | { type: 'wall'; wallId: WallID }
  | { type: 'flow'; personaId?: PersonaID };

export type Event =
  | { type: 'tap_wall'; wallId: WallID }
  | { type: 'pinch_out' }
  | { type: 'tap_hotspot'; hotspotId: HotspotID; wallId: WallID }
  | { type: 'flow_transition' };

export type ContinuityToken = {
  spatialAnchor?: { x: number; y: number };
  temporalAnchor: number;
  selectionSet: Set<ImageID>;
  personaFilter?: PersonaID;
};

export type WallData = {
  id: WallID;
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  rotation: number; // degrees
};

export type ImageData = {
  id: ImageID;
  wallId: WallID;
  x: number; // mm from left
  y: number; // mm from bottom
  width: number; // mm
  height: number; // mm
  src: string;
  title: string;
  punctumScore: number;
};

export type ResonanceLink = {
  id: string;
  source: ImageID;
  target: ImageID;
  weight: number;
};
