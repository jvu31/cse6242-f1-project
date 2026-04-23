"use client"

import React, { createContext, useContext, useState } from "react";
import { Driver } from "../apis/ui_options";

interface DriversContextType {
  drivers: Record<number, Driver>;
  driverStats: Record<number, any>;
  addDriverToList: (driver: Driver, index: number) => void;
  setAllDrivers: (drivers: Record<number, Driver>) => void;
  setAllDriverStats: (stats: Record<number, any>) => void;
  getDrivers: () => Record<number, Driver>;
}

const DriversContext = createContext<DriversContextType>({
  drivers: {},
  driverStats: {},
  addDriverToList: () => {},
  setAllDrivers: () => {},
  setAllDriverStats: () => {},
  getDrivers: () => ({})
});

export const DriversProvider = ({ children }: { children: React.ReactNode }) => {
  const [drivers, setDrivers] = useState<Record<number, Driver>>({});
  const [driverStats, setDriverStats] = useState<Record<number, any>>({});

  const getDrivers = () => {
    return drivers;
  }

  const addDriverToList = (driver: Driver, index: number) => {
    setDrivers((prev) => ({
      ...prev,
      [index]: driver
    }));
  }

  const setAllDrivers = (newDrivers: Record<number, Driver>) => {
    setDrivers(newDrivers);
  }

  const setAllDriverStats = (stats: Record<number, any>) => {
    setDriverStats(stats);
  }

  return (
    <DriversContext.Provider value={{ drivers, driverStats, addDriverToList, setAllDrivers, setAllDriverStats, getDrivers }}>
      {children}
    </DriversContext.Provider>
  );
}

export const useDrivers = () => useContext(DriversContext);