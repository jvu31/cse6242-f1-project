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
let predictionCache: any[] | null = null

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
    return result.data;
  } catch (error) {
    console.error("Error loading drivers:", error);
    return [];
  }
};

export const getPredictions = async(): Promise<any[]> => {
  if (predictionCache) return predictionCache



  predictionCache = await fetch("/data/f1_frontend_bundle.json")
    .then(res => res.text())
    .then(text => JSON.parse(text.replace(/:\s*NaN/g, ": null")))
    .then(json => predictionCache = json)

  return predictionCache!;
}
