import rawData from "./data.json";

export interface PetLicense {
  licenseDate: string;
  licenseNumber: string;
  animalName: string;
  species: string;
  primaryBreed: string;
  secondaryBreed: string;
  zip: string;
}

export const records: PetLicense[] = rawData as PetLicense[];

export const breeds = Array.from(new Set(records.map((r) => r.primaryBreed).filter(Boolean))).sort();
export const zips = Array.from(new Set(records.map((r) => r.zip).filter(Boolean))).sort();
