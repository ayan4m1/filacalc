import { Dispatch, JSX, SetStateAction } from 'react';

export type SortFields = keyof Spool | 'costPerKg';

export type CalcResults = {
  label: string;
  content: string | JSX.Element;
};

export type ExtruderCalibrationForm = {
  currentSteps: number;
  measuredOffset: number;
  extrusionLength: number;
  extrusionPadding: number;
};

export type ExtruderCalibrationResults = {
  stepsPerMm: number;
};

export type SpoolPrintForm = {
  filamentLength: number;
  copies: number;
};

export type ZAxisCalibrationForm = {
  layerHeight: number;
  stepAngle: number | 'custom';
  customStepAngle: number;
  leadscrewPitch: number | 'custom';
  customLeadscrewPitch: number;
  printHeight: number;
};

export type ZAxisCalibrationResults = {
  evenlyDivisible: boolean;
  printHeight: number;
  results: (
    | {
        label: string;
        content: JSX.Element;
      }
    | CalcResults
  )[];
  layerHeights: {
    height: number;
    steps: number;
    error: string;
  }[];
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

export type VolumetricFlowForm = {
  nozzle?: string;
  hotend?: string;
  nozzleDiameter: number;
  filamentDiameter: number;
  customNozzleDiameter: number;
  customNozzleLength: number;
  customMeltZoneDiameter: number;
  customMeltZoneLength: number;
  layerHeight: number;
  extrusionWidth: number;
  printSpeed: number;
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

export type TD1ScanResults = {
  transmissionDistance: number;
  color: string;
};

export type GCodeParserMessage = { format: '3mf' | 'gcode'; file: File };

export type SettingsContext = {
  filamentDiameter: number;
  setFilamentDiameter: Dispatch<SetStateAction<number>>;
  spools: Spool[];
  setSpools: Dispatch<SetStateAction<Spool[]>>;
  findSpool: (id: string) => Spool | undefined;
  addSpool: (spool: Spool) => void;
  updateSpool: (spool: Spool) => void;
  removeSpool: (spool: Spool) => void;
};
