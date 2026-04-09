import Image from "next/image";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
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

import { useDrivers } from "../contexts/driversContext";

const DriverCard = ({ index }: { index: number }) => {
  const [driver, setDriver] = useState<Driver | null>(null);

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const handleSelectDriver = (selectedDriver: Driver) => {
    setDriver(selectedDriver);
    setOpen(false);
    addDriverToList(selectedDriver, index);
  };

  const { addDriverToList } = useDrivers();

  return (
    <div>
      <div>{index}</div>
      {driver ? (
        <div className="justify-center items-center flex flex-col gap-2">
          <Image
            src="/car.png"
            alt="car"
            width={100}
            height={100}
            className="brightness-0 invert"
          />
          <Chip label={driver.forename + " " + driver.surname} color="accent" />
        </div>
      ) : (
        <div className="justify-center items-center flex flex-col gap-2">
          <Button
            onClick={() => setOpen(true)}
            color="secondary"
            variant="outlined"
            sx={{ borderRadius: "50%", minWidth: "56px", height: "56px" }}
          >
            <AddIcon />
          </Button>
          <Chip label="Add Driver" color="primary" variant="outlined" />
        </div>
      )}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: "40.33%",
            backgroundColor: "base.100",
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
