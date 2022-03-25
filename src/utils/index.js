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
