import { useState, useEffect } from "react";
import Image from "next/image";
import DriverCard from "./DriverCard";
import customTheme from "../customTheme";

import { Box, Grid, Button } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getCircuits, Circuit } from "../apis/ui_options";
import { useFeatures } from "../contexts/featuresContext";
import { Pallet } from "@mui/icons-material";
import TimeTable from "../components/TimeTable";
import Podium from "../components/Podium";

import Paper from '@mui/material/Paper';
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

export default function Analytics() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [selectedCircuit, setSelectedCircuit] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  const { setFeatures, getFeatures} = useFeatures();

  useEffect(() => {
    getCircuits().then((data) => setCircuits(data));
  }, []);

  return (
    <>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid size={6}>
                <Podium/>
            </Grid>
            <Grid size={6}>
                <Item>Coefficient Matrix</Item>
            </Grid>
            <Grid size={6}>
                <TimeTable/>
            </Grid>
            <Grid size={6}>
                <Item>Model Statistics (f1 stat)</Item>
            </Grid>
            </Grid>
    
    
    
    
    </>

    
    

  );
}


