"use client";

import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import { useFeatures } from '../contexts/featuresContext';
import { getPredictions, getModels, Model } from "../apis/ui_options";

interface BarData {
  feature: string,
  coeff: number,
  absCoeff: number
}


function createData(
  feature: string,
  coeff: number,
  absCoeff: number
) {

  return { feature, coeff, absCoeff };
}

const coefficients = [
  createData('Epperly', 3.690291, 3.690291),
    createData('Start Pos', -2.351850, 2.351850),
    createData('Brabham-Alfa Romeo', -1.817750, 1.817750),
    createData('Phillips', 1.767156, 1.767156),
    createData('Benetton', 1.615663, 1.615663),
    createData('Eagle-Climax', -1.574673, 1.574673),
    createData('start_position_pct', 1.569093, 1.569093),
    createData('Haas F1 Team', -1.565443, 1.565443),
    createData('Ferrari', 1.558407, 1.558407),
    createData('Minardi', -1.551772, 1.551772),
    createData('Lotus F1', 1.525580, 1.525580),
    createData('Irish', -1.425784, 1.425784),
    createData('Ensign', -1.339544, 1.339544),
    createData('Portuguese', 1.333269, 1.333269),
    createData('Onyx', 1.320627, 1.320627),
    createData('Cooper-BRM', 1.290886, 1.290886),
    createData('ATS', -1.257664, 1.257664),
    createData('HWM', -1.213432, 1.213432),
    createData('Dallara', 1.209935, 1.209935),
    createData('Brawn', 1.205488, 1.205488)
];


export default function CoefficientMatrix() {
  const { features } = useFeatures()
  // New variables here
  const [data, setData] = useState<any>();
  const [modelStats, setModelStats] = useState<any | null>(null)
  const [models, setModels] = useState<Model[]>([]);
  const [barData, setBarData] = useState<BarData[]>([]);

  useEffect(() => {
    getPredictions().then((data) => setData(data));
    getModels().then((data) => setModels(data));
  }, []);

  useEffect(() => {
    if (!data) return;

    const stats = data.model_metrics?.[features.model] ?? null;

    setModelStats(stats);
    console.log("stats", stats);
    console.log("modelStats VALUE:", modelStats);
    console.log("modelStats is array?", Array.isArray(modelStats));

  }, [data, features.model]);

  return (
    <BarChart
      dataset={coefficients}
      xAxis={[{ dataKey: 'feature' }]}
      series={[
        { dataKey: 'coeff', label: 'Coefficient' },
        { dataKey: 'absCoeff', label: 'Abs(Coefficient)'}
      ]}
      height={400}
    />
  );
}