"use client"

import React, { createContext, useContext, useState } from "react";
import { Driver } from "../apis/ui_options";

interface DriversContextType {
  drivers: Record<number, Driver>;
  addDriverToList: (driver: Driver, index: number) => void;
  getDrivers: () => Record<number, Driver>;
}

const DriversContext = createContext<DriversContextType>({
  drivers: {},
  addDriverToList: () => {},
  getDrivers: () => ({})
});

export const DriversProvider = ({ children }: { children: React.ReactNode }) => {
  const [drivers, setDrivers] = useState<Record<number, Driver>>({});

  const getDrivers = () => {
    return drivers;
  }

  const addDriverToList = (driver: Driver, index: number) => {
    setDrivers((prev) => ({
      ...prev,
      [index]: driver
    }));
  }

  return (
    <DriversContext.Provider value={{ drivers, addDriverToList, getDrivers }}>
      {children}
    </DriversContext.Provider>
  );
}

export const useDrivers = () => useContext(DriversContext);