export const createWebWorker = (worker) => {
  if (typeof window !== 'object') {
    return;
  }

  const code = worker.toString();
  const blob = new Blob([`(${code})()`]);

  return new Worker(URL.createObjectURL(blob));
};

export const spools = [
  { brand: '3D Solutech', mass: 173 },
  { brand: 'Amazon Basics', mass: 248 },
  { brand: 'Amolen', mass: 190 },
  { brand: 'Atomic Filament', mass: 306 },
  { brand: 'Colorfabb', mass: 236 },
  { brand: 'eSun', mass: 224 },
  { brand: 'Inland', mass: 225 },
  { brand: 'Hatchbox', mass: 225 },
  { brand: 'Overture', mass: 237 },
  { brand: 'PolyMaker', mass: 220 },
  { brand: 'Prusament', mass: 201 },
  { brand: 'ProtoPasta', mass: 70 },
  { brand: 'StrongHero3D', mass: 151 },
  { brand: 'SunLu', mass: 133 },
  { brand: 'ZYLtech', mass: 179 }
];

export const getSpool = (brand) =>
  spools.find((spool) => spool.brand === brand);

export const materials = [
  { name: 'PLA', density: 1.24 },
  { name: 'ABS', density: 1.04 },
  { name: 'PETG', density: 1.27 },
  { name: 'Nylon', density: 1.52 },
  { name: 'TPU', density: 1.21 },
  { name: 'PC', density: 1.3 },
  { name: 'CF', density: 1.3 },
  { name: 'HIPS', density: 1.03 },
  { name: 'PVA', density: 1.23 },
  { name: 'ASA', density: 1.05 },
  { name: 'PP', density: 0.9 },
  { name: 'POM', density: 1.4 },
  { name: 'PMMA', density: 1.18 }
];

export const getMaterial = (name) =>
  materials.find((material) => material.name === name);

export const nozzles = [
  { name: 'Mk8', diameter: 2.4, length: 13 },
  { name: 'Mk10', diameter: 4, length: 13 },
  { name: 'Volcano 1.75mm', diameter: 2, length: 21 },
  { name: 'Volcano 3mm', diameter: 3.2, length: 21 }
];

export const getNozzle = (name) =>
  nozzles.find((nozzle) => nozzle.name === name);

export const hotends = [
  { name: 'Ender 3', meltZoneDiameter: 2, meltZoneLength: 25 },
  { name: 'Volcano', meltZoneDiameter: 6, meltZoneLength: 19 }
];

export const getHotend = (name) =>
  hotends.find((hotend) => hotend.name === name);

export const stepAngles = [1.8, 0.9, 7.5];

export const leadscrewPitches = [1.25, 1, 12, 16, 25, 1.41111, 1.27, 1.5875];
