import { Dispatch, SetStateAction } from 'react';

export type ExtruderCalibrationForm = {
  currentSteps: number;
  measuredOffset: number;
  extrusionLength: number;
  extrusionPadding: number;
};

export type SpoolPrintForm = {
  filamentLength: number;
  copies: number;
};

export type ZAxisCalibrationForm = {
  layerHeight: number;
  stepAngle: number;
  customStepAngle: number;
  leadscrewPitch: number;
  customLeadscrewPitch: number;
  printHeight: number;
};

export type SpoolWeightForm = {
  brand: string;
  material: string;
  filamentDiameter: number;
  netWeight: number;
  currentWeight: number;
  spoolWeight: number;
  materialDensity: number;
  customSpoolMass?: number;
  customMaterialDensity?: number;
};

export type SpoolDimensionsForm = {
  material: string;
  customMaterialDensity: number;
  filamentDiameter: number;
  outerDiameter: number;
  spoolDiameter: number;
  spoolWidth: number;
};

export type FilamentUsageForm = {
  material: string;
  diameter: number;
  length: number;
  price: number;
  customMaterialDensity: number;
};

export type Spool = {
  color: string;
  currentWeight: number;
  filamentDiameter: number;
  id: string;
  material: string;
  materialDensity: number;
  name: string;
  netWeight: number;
  purchaseCost?: number;
  purchaseDate?: string;
  spoolWeight: number;
  transmissionDistance?: number;
  vendor?: string;
};

export type SettingsContext = {
  filamentDiameter: number;
  setFilamentDiameter: Dispatch<SetStateAction<number>>;
  spools: Spool[];
  setSpools: Dispatch<SetStateAction<Spool[]>>;
  findSpool: (id: string) => Spool | null;
  addSpool: (spool: Spool) => void;
  updateSpool: (spool: Spool) => void;
  removeSpool: (spool: Spool) => void;
};
