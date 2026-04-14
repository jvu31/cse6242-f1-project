import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  name: string,
  stat: number,
  range: string,
  desc: string
) {
  return { name, stat, range, desc };
}

const rows = [
  createData('ROC AUC', 0.932, '0.5-1.0', 'ROC AUC: Reciever Operating Characteristic - Area Under Curve. 1.0 = Perfect Model, 0.5 = Random Guessing'),
  createData('F1 Score', 0.620, '0.0-1.0', '0.8-0.9 is considered "good"'),
  createData('Average Precision', 0.679, '0.0-1.0', 'A higher score indicates better model performance'),
  createData('Recall', 0.901, '0.0-1.0', 'Ability for model to predict all true positives, where 1.0 indicates all true positives are identified'),
];

export default function AccessibleTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="caption table">
        <caption>Model summary is based off of [INSERT ASSUMPTIONS]</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left">Statistic Name</TableCell>
            <TableCell align="left">Value</TableCell>
            <TableCell align="left">Range</TableCell>
            <TableCell align="left">Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
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