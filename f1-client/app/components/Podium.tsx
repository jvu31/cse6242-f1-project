import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { Box, Grid, Button } from "@mui/material";
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

const stylesRect = {
  rectangle: {
    width: '100px',
    height: '100px',
    fill: '#f81919',
  }
}

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
  createData('Gingerbread', 5, 89.8),
];

export default function Podium() {
  return (
    <>
      <Grid
        container
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "flex-end",
        }}
      >
          <Grid size = {2}>
            <Item>2nd</Item>
          </Grid>
          <Grid size = {2}>
            <Item>1st</Item>
          </Grid>
          <Grid size = {2}>
            <Item>3rd</Item>
        </Grid>

      </Grid>
    
    
    
    
    
    
    </>


  );
}