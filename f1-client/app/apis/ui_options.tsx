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

export interface Model {
  modelID: number;
  name: string;
  name_long: string;
}

let driversCache: Driver[] | null = null;
let circuitCache: Circuit[] | null = null;
let predictionCache: any[] | null = null;
let modelCache: Model[] | null = null;

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



  predictionCache = await fetch("/data/f1_frontend_bundle_v5_full_predictions_and_metrics.json")
    .then(res => res.text())
    .then(text => JSON.parse(text.replace(/:\s*NaN/g, ": null")))
    .then(json => predictionCache = json)

  return predictionCache!;
}

export const getModels = async(): Promise<Model[]> => {
  if (modelCache) return modelCache

  modelCache = [
    {modelID: 1, name: "Logistic Regression", name_long: "logistic_regression_feature_set_a"},
    {modelID: 2, name: "Logistic Regression w/PCA", name_long: "logistic_regression_feature_set_a_with_pca"},
    {modelID: 3, name: "XG Boost", name_long: "xgboost_feature_set_a"},
    {modelID: 4, name: "XG Boost w/PCA", name_long: "xgboost_feature_set_a_with_pca"}
  ]
  return modelCache
}
