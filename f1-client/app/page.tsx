"use client";

import customTheme from "./customTheme";
import { ThemeProvider } from "@mui/material/styles";
import Image from "next/image";
import Button from "@mui/material/Button";
import Simulator from "./simulation/page";
import { useRef } from "react";
import Analytics from "./analytics/page";

export default function Home() {

  const simulatorSection = useRef<HTMLElement>(null);
  const analyticsSection = useRef<HTMLElement>(null);

  return (
    <ThemeProvider theme={customTheme}>
      <main className="bg-base-100 flex flex-col p-10 w-full">
        {/* Top Bar */}
        <div className="w-full bg-base-200 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/F1.svg.png"
              alt="Podium Predictor Logo"
              width={60}
              height={60}
              style={{ height: "auto", width: "auto"}}
            />
            <h1 className="text-2xl font-bold">Podium Predictor</h1>
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="text" color="secondary" onClick={() => simulatorSection.current?.scrollIntoView({ behavior: "smooth" })}>
              Driver Simulations
            </Button>
            <Button variant="text" color="accent" onClick={() => analyticsSection.current?.scrollIntoView({ behavior: "smooth" })}>
              Analytics
            </Button>
          </div>
        </div>

        {/* Simulator */}
        <section ref={simulatorSection} className="w-full">
          <Simulator />
        </section>

      
        {/* Analytics */}
        <section ref={analyticsSection} className="w-full">
          <Analytics />
        </section>

      </main>
    </ThemeProvider>
  );
}
