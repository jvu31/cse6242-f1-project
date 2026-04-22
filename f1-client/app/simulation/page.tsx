"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import DriverCard from "./DriverCard";

import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { getCircuits, Circuit, getModels, Model } from "../apis/ui_options";
import { Button } from "@mui/material";
import { useFeatures } from "../contexts/featuresContext";
import Track from "./Track";
import { getPredictions } from "../apis/ui_options";

export default function Simulator() {
  const [circuits, setCircuits] = useState<Circuit[]>([]);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedCircuit, setSelectedCircuit] = useState<string>("");
  const [selectedModel, setSelectedModel] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<number | "">("");
  const { setFeatures, getFeatures } = useFeatures();
  const [simulationCount, setSimulationCount] = useState(0);
  const [bundle, setBundle] = useState<any>();
  const [isValid, setIsValid] = useState(false);
  

  const [type, setType] = useState("simulation");

  useEffect(() => {
    getCircuits().then((data) => setCircuits(data));
    getPredictions().then((data) => setBundle(data));
    getModels().then((data) => setModels(data));
  }, []);

  useEffect(() => {
    if (selectedCircuit === "" || selectedYear === "" || selectedModel === "") {
      setIsValid(false);
      return;
    }

    const races = bundle?.historical_records.filter(
      (r: any) => r.circuit_name === selectedCircuit && r.year === selectedYear,
    );

    if (races.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [selectedYear, selectedCircuit, selectedModel]);

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
            <Track simulationCount={simulationCount} type={type} />
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
                      onChange={(event) =>
                        setSelectedYear(event.target.value as number)
                      }
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

                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Models
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedModel}
                      label="Model"
                      onChange={(event) =>
                        setSelectedModel(event.target.value as string)
                      }
                    >
                      {models.map((model) => (
                        <MenuItem key={model.modelID} value={model.name_long}>
                          {model.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

              </div>
              {/* Buttons */}
              <div className="flex flex-row gap-4">
                <Button
                  variant="contained"
                  color="primary"
                  disabled={!isValid}
                  onClick={() => {
                    setFeatures({
                      circuit: selectedCircuit,
                      year: selectedYear as number,
                      model: selectedModel,
                    });
                    setSimulationCount((c) => c + 1);
                    setType("real");
                  }}
                >
                  Real Results
                </Button>
                <Button
                  variant="contained"
                  color="accent"
                  disabled={!isValid}
                  onClick={() => {
                    setFeatures({
                      circuit: selectedCircuit,
                      year: selectedYear as number,
                      model: selectedModel,
                    });
                    setSimulationCount((c) => c + 1);
                    setType("simulation");
                  }}
                >
                  Simulated Results
                </Button>
              </div>
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
