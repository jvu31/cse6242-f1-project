import Papa from "papaparse";

export interface Driver {
  driverId: number;
  driverRef: string;
  number: number | string;
  code: string;
  forename: string;
  surname: string;
  dob: string;
  nationality: string;
  url: string;
}

export interface Circuit {
  circuitId: number;
  circuitRef: string;
  name: string;
  location: string;
  country: string;
  lat: number;
  lng: number;
  alt: number;
  url: string;
}

let driversCache: Driver[] | null = null;
let circuitCache: Circuit[] | null = null;

export const getDrivers = async (): Promise<Driver[]> => {
  if (driversCache) return driversCache;

  try {
    const response = await fetch("/data/drivers.csv");

    if (!response.ok) {
      throw new Error(`Failed to fetch drivers: ${response.statusText}`);
    }

    const csvText = await response.text();
    const result = Papa.parse<Driver>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    driversCache = result.data;
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error loading drivers:", error);
    return [];
  }
};

export const getCircuits = async (): Promise<Circuit[]> => {
  if (circuitCache) return circuitCache;

  try {
    const response = await fetch("/data/circuits.csv");

    if (!response.ok) {
      throw new Error(`Failed to fetch circuits: ${response.statusText}`);
    }

    const csvText = await response.text();
    const result = Papa.parse<Circuit>(csvText, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    circuitCache = result.data;
    console.log(result.data);
    return result.data;
  } catch (error) {
    console.error("Error loading drivers:", error);
    return [];
  }
};
