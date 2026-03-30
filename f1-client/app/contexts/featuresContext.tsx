"use client"

import React, { createContext, useContext, useState } from "react";

interface Features {
  circuit: string;
  year: number;
}

interface FeaturesContextType {
  features: Features;
  setFeatures: (features: Features) => void;
  getFeatures: () => Features;
}

const FeaturesContext = createContext<FeaturesContextType>({
  features: { circuit: "", year: 0 },
  setFeatures: () => {},
  getFeatures: () => ({ circuit: "", year: 0 })
});

export const FeaturesProvider = ({ children }: { children: React.ReactNode }) => {
  const [features, setFeatures] = useState<Features>({ circuit: "", year: 0 });


  const getFeatures = () => {
    return features;
  }

  



  return (
    <FeaturesContext.Provider value={{ features, setFeatures, getFeatures}}>
      {children}
    </FeaturesContext.Provider>
  );
}

export const useFeatures = () => useContext(FeaturesContext);