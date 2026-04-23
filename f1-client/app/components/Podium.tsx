import { Box, Grid, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../customTheme";
import { useState, useEffect } from "react";
import { useFeatures } from "../contexts/featuresContext"
import { getPredictions, getModels, Model } from "../apis/ui_options";
import { DriversProvider } from "../contexts/driversContext";



export default function Podium() {
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