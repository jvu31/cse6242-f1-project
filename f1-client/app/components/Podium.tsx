import { Box, Grid, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../customTheme";
import { useState, useEffect } from "react";
import { useFeatures } from "../contexts/featuresContext"
import { getPredictions } from "../apis/ui_options";
import { DriversProvider } from "../contexts/driversContext";

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
   //const [bundleData, setBundleData] = useState<BundleData | null>(null);
    const { features } = useFeatures()
    // New variables here
    const [data, setData] = useState<any>();
    const [driverProbabilities, setDriverProbabilities] = useState<any[]>([]);
  
    useEffect(() => {
      getPredictions().then((data) => setData(data));
    }, []);
  
    useEffect(() => {
      if (!data) return;
      const drivers = data.historical_records.filter(
        (r: any) =>
          r.circuit_name === features.circuit && r.year === features.year,
      )
      .sort((a: any, b: any) => b.podium_probability - a.podium_probability);
      setDriverProbabilities(drivers);
      //console.log("drivers", drivers);
    }, [data, features.circuit, features.year]);

    const podiumNames = driverProbabilities.slice(0,3).map((driver, index) => {
      return {place: index+1, name: driver.driver_name}
    })


  
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <Grid
        container
        direction="row"
        spacing={{ xs: 1, md: 1 }} 
        columns={{ xs: 3, sm: 9, md: 12 }}
        sx={{
          justifyContent: "center",
          alignItems: "flex-end",
        }}
        >
          <Stack spacing={1} sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
            <span>{podiumNames.find(p => p.place === 2)?.name}</span>
            <Box
              sx={{
                width: 144,
                height: 180,
                borderRadius: 1,
                bgcolor: "base.100",
                margin: "auto"
              }}>
              <img
                src="/2nd.png"
                alt="2nd"
                width="auto"
                height="auto"
              />
            </Box>
          </Stack>
          <Stack spacing={1} sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
            <span>{podiumNames.find(p => p.place === 1)?.name}</span>
            <Box
              sx={{
                width: 144,
                height: 236,
                borderRadius: 1,
                bgcolor: "base.100",
                margin: "auto"
              }}>
              <img
                src="/1st.png"
                alt="1st"
                width="auto"
                height="auto"
              />
            </Box>
          </Stack>
          <Stack spacing={1} sx={{
            justifyContent: "flex-end",
            alignItems: "center",
          }}>
            <span>{podiumNames.find(p => p.place === 3)?.name}</span>
            <Box
              sx={{
                width: 144,
                height: 140,
                borderRadius: 1,
                bgcolor: "base.100",
                margin: "auto"
              }}>
              <img
                src="/3rd.png"
                alt="3rd"
                width="auto"
                height="auto"
              />
            </Box>
          </Stack>
        </Grid>
      </ThemeProvider>
    </>
  );
}