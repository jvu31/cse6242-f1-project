"use client";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useFeatures } from '../contexts/featuresContext';
import { getPredictions } from "../apis/ui_options";

interface StatRow {
  name: string;
  stat: number;
  range: string;
  desc: string;
}

function createData(
  name: string,
  stat: number,
  range: string,
  desc: string
) {
  return { name, stat, range, desc };
}


export default function AccessibleTable() {
  const { features } = useFeatures()
  // New variables here
  const [data, setData] = useState<any>();
  const [modelStats, setModelStats] = useState<any | null>(null)
  const [statRows, setStatRows] = useState<StatRow[]>([]);

  useEffect(() => {
    getPredictions().then((data) => setData(data));
  }, []);

  // const bProb = b.predictions?.[features.model] ?? -Infinity;

  useEffect(() => {
    if (!data) return;

    const stats = data.model_metrics?.[features.model] ?? null;

    setModelStats(stats);
    console.log("stats", stats);
    console.log("modelStats VALUE:", modelStats);
    console.log("modelStats is array?", Array.isArray(modelStats));

  }, [data, features.model]);

  useEffect(() => {
    if (!modelStats) return;

    setStatRows([
    createData(
      "Accuracy",
      modelStats.threshold_row_metrics.accuracy.toFixed(2),
      "0.0–1.0",
      "Quality of being correct"
      ),
    createData(
      "Average Precision",
      modelStats.threshold_row_metrics.average_precision.toFixed(2),
      "0.0–1.0",
      "A higher score indicates better model performance"
      ),
    createData(
      "ROC AUC",
      modelStats.threshold_row_metrics.roc_auc.toFixed(2),
      "0.5–1.0",
      "ROC AUC: Receiver Operating Characteristic - Area Under Curve. 1.0 = Perfect Model, 0.5 = Random Guessing"
      ),
    createData(
      "F1 Score",
      modelStats.threshold_row_metrics.f1.toFixed(2),
      "0.0–1.0",
      '0.8–0.9 is considered "good"'
      ),
    createData(
      "Recall",
      modelStats.threshold_row_metrics.recall.toFixed(2),
      "0.0–1.0",
      "Ability for model to predict all true positives"
      ),
    ]);
  }, [modelStats]);




  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Prefered model is XGBoost without PCA</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left">Statistic Name</TableCell>
            <TableCell align="left">Value</TableCell>
            <TableCell align="left">Range</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {statRows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="left">{row.stat}</TableCell>
              <TableCell align="left">{row.range}</TableCell>
              <TableCell align="left">{row.desc}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}