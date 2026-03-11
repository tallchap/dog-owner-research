export interface DogRecord {
  id: string;
  ownerName: string;
  address: string;
  neighborhood: string;
  zip: string;
  breed: string;
  dogName: string;
  sex: "M" | "F";
  spayedNeutered: boolean;
  licenseExpiration: string;
}

// Sample dataset representing what SF dog license records look like.
// Replace with real data once obtained via public records request.
export const sampleRecords: DogRecord[] = [
  { id: "SF-2024-001", ownerName: "Maria Chen", address: "482 Valencia St", neighborhood: "Mission", zip: "94103", breed: "Yorkshire Terrier", dogName: "Mochi", sex: "F", spayedNeutered: true, licenseExpiration: "2026-08-15" },
  { id: "SF-2024-002", ownerName: "David Park", address: "1120 Folsom St", neighborhood: "SoMa", zip: "94103", breed: "Golden Retriever", dogName: "Buddy", sex: "M", spayedNeutered: true, licenseExpiration: "2026-06-01" },
  { id: "SF-2024-003", ownerName: "Sarah Johnson", address: "55 Castro St", neighborhood: "Castro", zip: "94114", breed: "Poodle", dogName: "Coco", sex: "F", spayedNeutered: true, licenseExpiration: "2026-09-20" },
  { id: "SF-2024-004", ownerName: "James Wong", address: "901 Irving St", neighborhood: "Inner Sunset", zip: "94122", breed: "Yorkshire Terrier", dogName: "Teddy", sex: "M", spayedNeutered: true, licenseExpiration: "2026-07-10" },
  { id: "SF-2024-005", ownerName: "Emily Roberts", address: "332 Hayes St", neighborhood: "Hayes Valley", zip: "94102", breed: "French Bulldog", dogName: "Bruno", sex: "M", spayedNeutered: false, licenseExpiration: "2026-05-30" },
  { id: "SF-2024-006", ownerName: "Michael Torres", address: "1450 Noriega St", neighborhood: "Outer Sunset", zip: "94122", breed: "Labrador Retriever", dogName: "Luna", sex: "F", spayedNeutered: true, licenseExpiration: "2026-11-01" },
  { id: "SF-2024-007", ownerName: "Lisa Kim", address: "78 Divisadero St", neighborhood: "NoPa", zip: "94117", breed: "Yorkshire Terrier Mix", dogName: "Pixie", sex: "F", spayedNeutered: true, licenseExpiration: "2026-04-15" },
  { id: "SF-2024-008", ownerName: "Robert Garcia", address: "2100 Mission St", neighborhood: "Mission", zip: "94110", breed: "German Shepherd", dogName: "Rex", sex: "M", spayedNeutered: true, licenseExpiration: "2026-10-22" },
  { id: "SF-2024-009", ownerName: "Amanda Lee", address: "560 Green St", neighborhood: "North Beach", zip: "94133", breed: "Chihuahua", dogName: "Tiny", sex: "F", spayedNeutered: false, licenseExpiration: "2026-03-18" },
  { id: "SF-2024-010", ownerName: "Kevin O'Brien", address: "1233 9th Ave", neighborhood: "Inner Sunset", zip: "94122", breed: "Pomeranian", dogName: "Gizmo", sex: "M", spayedNeutered: true, licenseExpiration: "2026-08-05" },
  { id: "SF-2024-011", ownerName: "Patricia Nguyen", address: "420 Clement St", neighborhood: "Inner Richmond", zip: "94118", breed: "Yorkshire Terrier", dogName: "Bella", sex: "F", spayedNeutered: true, licenseExpiration: "2026-12-01" },
  { id: "SF-2024-012", ownerName: "Daniel Martinez", address: "88 Potrero Ave", neighborhood: "Potrero Hill", zip: "94110", breed: "Beagle", dogName: "Charlie", sex: "M", spayedNeutered: true, licenseExpiration: "2026-06-15" },
  { id: "SF-2024-013", ownerName: "Jennifer Wu", address: "2340 Lombard St", neighborhood: "Marina", zip: "94123", breed: "Yorkshire Terrier", dogName: "Lola", sex: "F", spayedNeutered: true, licenseExpiration: "2026-09-10" },
  { id: "SF-2024-014", ownerName: "Chris Thompson", address: "650 Stanyan St", neighborhood: "Haight-Ashbury", zip: "94117", breed: "Australian Shepherd", dogName: "Cooper", sex: "M", spayedNeutered: true, licenseExpiration: "2026-05-20" },
  { id: "SF-2024-015", ownerName: "Natalie Russo", address: "1800 15th St", neighborhood: "Mission", zip: "94103", breed: "Cavalier King Charles Spaniel", dogName: "Daisy", sex: "F", spayedNeutered: true, licenseExpiration: "2026-07-30" },
  { id: "SF-2024-016", ownerName: "Andrew Patel", address: "3100 Geary Blvd", neighborhood: "Outer Richmond", zip: "94118", breed: "Shih Tzu", dogName: "Max", sex: "M", spayedNeutered: false, licenseExpiration: "2026-04-01" },
  { id: "SF-2024-017", ownerName: "Stephanie Lam", address: "725 Pine St", neighborhood: "Nob Hill", zip: "94108", breed: "Yorkshire Terrier", dogName: "Rosie", sex: "F", spayedNeutered: true, licenseExpiration: "2026-11-15" },
  { id: "SF-2024-018", ownerName: "Tom Davis", address: "445 Balboa St", neighborhood: "Inner Richmond", zip: "94118", breed: "Corgi", dogName: "Winston", sex: "M", spayedNeutered: true, licenseExpiration: "2026-08-22" },
  { id: "SF-2024-019", ownerName: "Rachel Hoffman", address: "920 Cole St", neighborhood: "Cole Valley", zip: "94117", breed: "Dachshund", dogName: "Oscar", sex: "M", spayedNeutered: true, licenseExpiration: "2026-06-08" },
  { id: "SF-2024-020", ownerName: "Victor Chang", address: "155 Sanchez St", neighborhood: "Duboce Triangle", zip: "94114", breed: "Yorkshire Terrier", dogName: "Benny", sex: "M", spayedNeutered: true, licenseExpiration: "2026-10-05" },
  { id: "SF-2024-021", ownerName: "Olivia Santos", address: "2600 Ocean Ave", neighborhood: "Ingleside", zip: "94132", breed: "Maltese", dogName: "Pearl", sex: "F", spayedNeutered: true, licenseExpiration: "2026-03-25" },
  { id: "SF-2024-022", ownerName: "Brandon Liu", address: "580 Guerrero St", neighborhood: "Mission", zip: "94110", breed: "French Bulldog", dogName: "Frank", sex: "M", spayedNeutered: true, licenseExpiration: "2026-09-14" },
  { id: "SF-2024-023", ownerName: "Michelle Rivera", address: "1045 Taraval St", neighborhood: "Parkside", zip: "94116", breed: "Yorkshire Terrier Mix", dogName: "Ziggy", sex: "M", spayedNeutered: true, licenseExpiration: "2026-07-18" },
  { id: "SF-2024-024", ownerName: "Ryan Kelly", address: "300 Broderick St", neighborhood: "Western Addition", zip: "94117", breed: "Labradoodle", dogName: "Ollie", sex: "M", spayedNeutered: true, licenseExpiration: "2026-12-20" },
  { id: "SF-2024-025", ownerName: "Diana Petrov", address: "1322 Grant Ave", neighborhood: "North Beach", zip: "94133", breed: "Poodle", dogName: "Sophie", sex: "F", spayedNeutered: true, licenseExpiration: "2026-05-05" },
  { id: "SF-2024-026", ownerName: "Marcus Williams", address: "4200 Judah St", neighborhood: "Outer Sunset", zip: "94122", breed: "Golden Retriever", dogName: "Duke", sex: "M", spayedNeutered: true, licenseExpiration: "2026-08-30" },
  { id: "SF-2024-027", ownerName: "Nicole Tanaka", address: "660 Sacramento St", neighborhood: "Financial District", zip: "94111", breed: "Yorkshire Terrier", dogName: "Yuki", sex: "F", spayedNeutered: true, licenseExpiration: "2026-06-25" },
  { id: "SF-2024-028", ownerName: "Greg Foster", address: "1575 Haight St", neighborhood: "Haight-Ashbury", zip: "94117", breed: "Pit Bull Mix", dogName: "Tank", sex: "M", spayedNeutered: true, licenseExpiration: "2026-04-10" },
  { id: "SF-2024-029", ownerName: "Elena Morales", address: "825 Cortland Ave", neighborhood: "Bernal Heights", zip: "94110", breed: "Chihuahua Mix", dogName: "Chloe", sex: "F", spayedNeutered: true, licenseExpiration: "2026-11-08" },
  { id: "SF-2024-030", ownerName: "Paul Nakamura", address: "2200 Sutter St", neighborhood: "Japantown", zip: "94115", breed: "Shiba Inu", dogName: "Hiro", sex: "M", spayedNeutered: true, licenseExpiration: "2026-09-30" },
];

export const breeds = Array.from(new Set(sampleRecords.map((r) => r.breed))).sort();
export const neighborhoods = Array.from(new Set(sampleRecords.map((r) => r.neighborhood))).sort();
export const zips = Array.from(new Set(sampleRecords.map((r) => r.zip))).sort();
