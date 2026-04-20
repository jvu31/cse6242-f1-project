import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, useEffect } from 'react';
import { useFeatures } from '../contexts/featuresContext';

function createData(
  name: string,
  place: number,
  probability: number,
) {

  return { name, place, probability };
}

const rows = [
  createData('George', 1, 97.5),
  createData('Henry', 2, 95.0),
  createData('Dave', 3, 93.4),
  createData('Kevin', 4, 90.2),
  createData('Pumperknickle', 5, 89.8),
];

export default function TimeTable() {
  const [bundleData, setBundleData] = useState<BundleData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
  const { features } = useFeatures()

  useEffect(() => {
    fetch("/data/f1_frontend_bundle.json")
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load bundle (${res.status})`);
        return res.json();
      })
      .then((data) => {
        console.log("bundle loaded:", data.historical_records.length, "records");
        setBundleData(data);
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
    }, [])

  if (loading) return <div>Loading F1 data...</div>;
  if (error) return (
  <div>
    Error: {error}<br />Make sure f1_frontend_bundle.json is in your /public folder.
  </div>
  );

  const years = bundleData.ui_options.years.slice().sort((a, b) => b - a);

  const drivers = 
  features.year && features.circuit
    ? bundleData.historical_records
      .filter(
        (r) =>
          r.year === features.year &&
          r.circuitID === parseInt(features.circuit)
      )
      .sort((a, b) => b.podium_probability - a.podium_probability)
    : [];
  

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Place</TableCell>
            <TableCell align="left">Driver</TableCell>
            <TableCell align="left">Probability (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {drivers.map((driver, i) => {
            const prob = driver.podium_probability;
            const isPodium = i < 3;
            // some older races have null start_position after NaN cleanup — EDAVIS 2026/03/25
            const gridPos = driver.start_position != null ? `P${driver.start_position}` : "N/A";

            return (
              <TableRow
              key={driver.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {driver.place}
              </TableCell>
              <TableCell align="left">{driver.name}</TableCell>
              <TableCell align="left">{driver.probability}</TableCell>
            </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}