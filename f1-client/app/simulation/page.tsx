"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DriverCard from "./DriverCard";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { getCircuits, Circuit } from "../apis/ui_options";
import { Button } from "@mui/material";
import { useFeatures } from "../contexts/featuresContext";

export default function Simulator() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [selectedCircuit, setSelectedCircuit] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");

  const { setFeatures, getFeatures} = useFeatures();

  useEffect(() => {
    getCircuits().then((data) => setCircuits(data));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "calc(100vh - 180px)",
        overflow: "hidden",
      }}
    >
      {/* Left Side */}
      <div
        style={{
          flex: "0 0 66.66%",
          padding: "1rem",
          height: "100%",
          overflowY: "auto",
        }}
      >
        <div className="h-full flex flex-col gap-10">
          <div className="h-3/4 gap-2">
            {/* Track Map */}
            <h2 className="text-2xl font-bold">Track Map</h2>
            <Image
              src="/track.jpg"
              alt="track"
              width={500}
              height={500}
              className="w-auto h-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            {/* User Controls */}
            <h2 className="text-2xl font-bold">Features</h2>
            <div className="flex justify-between">
              {/* Dropdowns */}
              <div className="flex flex-row gap-4">
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Circuits
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedCircuit}
                      label="Circuit"
                      onChange={(event) =>
                        setSelectedCircuit(event.target.value as string)
                      }
                    >
                      {circuits.map((circuit) => (
                        <MenuItem key={circuit.circuitId} value={circuit.name}>
                          {circuit.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Year</InputLabel>
                    <Select
                      value={selectedYear}
                      onChange={(event) => setSelectedYear(event.target.value as number)}
                      label="Year"
                    >
                      {Array.from({ length: 75 }, (_, i) => 2024 - i).map(
                        (year) => (
                          <MenuItem key={year} value={year}>
                            {year}
                          </MenuItem>
                        ),
                      )}
                    </Select>
                  </FormControl>
                </Box>
              </div>
              <Button variant="contained" color="accent" onClick={() => {
                if (selectedYear !== "" && selectedCircuit !== "") {
                  setFeatures({ circuit: selectedCircuit, year: selectedYear as number });
                }
              }}>
                Simulate
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: "0 0 33.33%",
          padding: "1rem",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <h2 className="text-2xl font-bold mb-4">Select Driver</h2>

        {/* Grid List */}
        <DriverGrid />
      </div>
    </div>
  );
}

const DriverGrid = () => {
  const drivers = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="grid grid-cols-2 gap-4 overflow-y-auto h-full max-h-full">
      {drivers.map((_, index) => (
        <div key={index}>
          <DriverCard index={index + 1} />
        </div>
      ))}
    </div>
  );
};
