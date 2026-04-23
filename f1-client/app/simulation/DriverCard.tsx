"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import React from "react";
import { getDrivers, Driver } from "../apis/ui_options";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import TextField from "@mui/material/TextField";

import Link from "next/link";

import Tooltip from "@mui/material/Tooltip";
import { useDrivers } from "../contexts/driversContext";
import { useFeatures } from "../contexts/featuresContext";
import { getGridPositionColor } from "../utils/gridColors";

const fmt = (v: number | null, decimals = 1) =>
  v != null ? v.toFixed(decimals) : "—";

const DriverCard = ({ index }: { index: number }) => {
  const { drivers, driverStats, addDriverToList } = useDrivers();
  const { features } = useFeatures();
  const driver = drivers[index] ?? null;
  const stats = driverStats[index] ?? null;
  const podiumProbability: number | null = stats?.predictions?.[features.model] ?? null;

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSelectDriver = (selectedDriver: Driver) => {
    setOpen(false);
    addDriverToList(selectedDriver, index);
  };

  return (
    <div>
      <div>{index}</div>
      {driver ? (
        <div className="justify-center items-center flex flex-col gap-2">
          <Tooltip
            arrow
            placement="left"
            title={
              stats ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 4, fontSize: 13 }}>
                  <div><strong>{driver.forename} {driver.surname}</strong></div>
                  <div>#{driver.number} · {driver.nationality}</div>
                  <hr style={{ opacity: 0.3, margin: "4px 0" }} />
                  <div>Grid: {stats.start_position} → Finish: {stats.finish_position}</div>
                  <div>Podium probability: {fmt(podiumProbability != null ? podiumProbability * 100 : null)}%</div>
                  {stats.driver_prev_podium_rate != null && (
                    <div>Career podium rate: {fmt(stats.driver_prev_podium_rate * 100)}%</div>
                  )}
                  {stats.driver_prev_avg_finish != null && (
                    <div>Career avg finish: {fmt(stats.driver_prev_avg_finish)}</div>
                  )}
                  {stats.driver_last5_avg_points != null && (
                    <div>Last 5 races avg pts: {fmt(stats.driver_last5_avg_points)}</div>
                  )}
                </div>
              ) : ""
            }
          >
            <div
              style={{
                backgroundColor: getGridPositionColor(index),
                borderRadius: "8px",
                padding: "8px",
                display: "inline-flex",
                cursor: "pointer",
              }}
            >
              <Image
                src="/car.png"
                alt="car"
                width={100}
                height={100}
                style={{ filter: "brightness(0)" }}
              />
            </div>
          </Tooltip>
          <Chip label={driver.forename + " " + driver.surname} color="accent" />
        </div>
      ) : (
        <div className="justify-center items-center flex flex-col gap-2">
          {/*}
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            variant="outlined"
            sx={{ borderRadius: "50%", minWidth: "56px", height: "56px" }}
          >
            <AddIcon />
          </Button>*/}
          <Chip label="Add Driver" color="primary" variant="outlined" />
        </div>
      )}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        slotProps={{
          paper: {
            sx: {
              width: "40.33%",
              backgroundColor: "base.100",
            },
          },
        }}
      >
        <DriversList onSelect={handleSelectDriver} />
      </Drawer>
    </div>
  );
};

const DriversList = ({ onSelect }: { onSelect: (driver: Driver) => void }) => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [searchString, setSearchString] = useState("");
  const [filteredDrivers, setFilteredDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = drivers.filter((driver) =>
        driver.forename.toLowerCase().includes(searchString.toLowerCase()),
      );
      setFilteredDrivers(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchString, drivers]);

  useEffect(() => {
    const fetchDrivers = async () => {
      const data = await getDrivers();
      setDrivers(data);
    };
    fetchDrivers();
  }, []);

  return (
    <div className="py-10 px-6 bg-base-100 gap-4 flex flex-col">
      <h1 className="text-2xl font-bold">Select Driver</h1>
      <TextField
        id="outlined-basic"
        label="Search Name..."
        variant="outlined"
        value={searchString}
        onChange={(e) => setSearchString(e.target.value)}
      />
      {filteredDrivers.map((driver) => (
        <div key={driver.driverId}>
          <Accordion
            sx={{ backgroundColor: "base.200" }}
            slotProps={{ transition: { unmountOnExit: true } }}
          >
            <AccordionSummary
              expandIcon={<ArrowDropDownIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{ color: "base.contrastText" }}
            >
              <h1 className="text-2xl font-bold">
                {driver.forename + " " + driver.surname}
              </h1>
            </AccordionSummary>
            <AccordionDetails>
              <div className="flex flex-col gap-2 text-base-content">
                <div className="gap-4 flex flex-col">
                  <h2 className="text-xl font-bold">Driver Details</h2>
                  <div className="flex flex-col gap-2">
                    <p>Code: {driver.code}</p>
                    <p>Forename: {driver.forename}</p>
                    <p>Surname: {driver.surname}</p>
                    <p>DOB: {driver.dob}</p>
                    <p>Nationality: {driver.nationality}</p>
                    <p>
                      URL:
                      <Link
                        href={driver.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-200 no-underline"
                      >
                        {driver.url}
                      </Link>
                    </p>
                  </div>
                  <Button
                    variant="contained"
                    color="accent"
                    onClick={() => onSelect(driver)}
                  >
                    Add Driver
                  </Button>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default DriverCard;
