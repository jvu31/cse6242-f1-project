import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useFeatures } from '../contexts/featuresContext';
import { getPredictions, getModels, Model } from "../apis/ui_options";


export default function TimeTable() {
  //const [bundleData, setBundleData] = useState<BundleData | null>(null);
  const { features } = useFeatures()
  // New variables here
  const [data, setData] = useState<any>();
  const [driverProbabilities, setDriverProbabilities] = useState<any[]>([]);
  const [models, setModels] = useState<Model[]>([]);

  useEffect(() => {
    getPredictions().then((data) => setData(data));
    getModels().then((data) => setModels(data));
  }, []);

  useEffect(() => {
    if (!data) return;
    const drivers = data.historical_records.filter(
      (r: any) =>
        r.circuit_name === features.circuit && r.year === features.year,
    )
    .sort((a: any, b: any) => {
      const aProb = a.predictions?.[features.model] ?? -Infinity;
      const bProb = b.predictions?.[features.model] ?? -Infinity;
      return bProb - aProb;
    });
    setDriverProbabilities(drivers);
    //console.log("drivers", drivers);
  }, [data, features.circuit, features.year, features.model]);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Predicted Place</TableCell>
            <TableCell align="left">Driver</TableCell>
            <TableCell align="left">Probability (%)</TableCell>
            <TableCell align="left">Actual Place</TableCell>
            <TableCell align="left">Difference</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {driverProbabilities.slice(0, 20).map((driver, index) => {
            
            return (
              <TableRow key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index+1}
                </TableCell>
                <TableCell align="left">{driver.driver_name}</TableCell>
                <TableCell align="left">{(driver.predictions?.[features.model] * 100).toFixed(2) ?? null}</TableCell>
                <TableCell align="left">{driver.finish_position}</TableCell>
                <TableCell align="left">{index-  driver.finish_position + 1}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}