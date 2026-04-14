import { Box, Grid, Button } from "@mui/material";
import Stack from '@mui/material/Stack';
import { ThemeProvider } from "@mui/material/styles";
import customTheme from "../customTheme";

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
            <text>[2nd Place]</text>
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
            <text>[1st Place]</text>
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
            <text>[3rd Place]</text>
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