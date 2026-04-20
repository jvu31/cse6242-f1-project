import { motion } from "framer-motion";
import { get } from "http";
import { use, useEffect, useState } from "react"
import { getPredictions } from "../apis/ui_options";
import { useFeatures } from "../contexts/featuresContext";
import { useDrivers } from "../contexts/driversContext";


interface GridTrack {
  grid_position: number;
  path: string;
}


/* Witchcraft math for svgs idk */
const GridTracks: GridTrack[] = [
  { grid_position: 2, path: "M854 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 4, path: "M783 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 6, path: "M712 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 8, path: "M641 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 10, path: "M570 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 12, path: "M499 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 14, path: "M428 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 16, path: "M357 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 18, path: "M286 385.5 H1068 V50 H0 V385.5 H190" },
  { grid_position: 20, path: "M215 385.5 H1068 V50 H0 V385.5 H190" },

  { grid_position: 1, path: "M791 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 3, path: "M720 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 5, path: "M649 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 7, path: "M578 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 9, path: "M507 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 11, path: "M436 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 13, path: "M365 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 15, path: "M294 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 17, path: "M223 293.5 H942 V50 H0 V293.5 H120" },
  { grid_position: 19, path: "M152 293.5 H942 V50 H0 V293.5 H120" },
];

const getStartPoint = (path: string) => {
  const match = path.match(/^M\s*([\d.]+)\s*([\d.]+)/);
  if (!match) return { x: 0, y: 0 };
  return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
};


export default function Track({ simulationCount, type }: { simulationCount: number, type: string }) {
  const SMALL_OFFSET_X = (1132 - 1000) / 2;
  const SMALL_OFFSET_Y = (455 - 370) / 2;


  const [data, setData] = useState<any>()

  const { features } = useFeatures();
  //const { drivers } = useDrivers();

  const [driverProbabilities, setDriverProbabilities] = useState<any[]>([])

  //const [joinedData, setJoinedData] = useState<any[]>([])

  const [tooltip, setTooltip] = useState<{ name: string; grid: number; probability: number; x: number; y: number } | null>(null)

  useEffect(() => {
    getPredictions().then((data) => setData(data))
  }, [])

  useEffect(() => {
    if (!data) return;
    const drivers = data.historical_records
      .filter(
        (r: any) =>
          r.circuit_name === features.circuit &&
          r.year === features.year
      )
    setDriverProbabilities(drivers);
    //console.log("drivers", drivers);
    
  }, [data, features.circuit, features.year])

  /*
  useEffect(() => {
    if (driverProbabilities.length === 0 || Object.keys(drivers).length === 0) return;

    const joined = driverProbabilities
      .map((dp) => {
        const driverInfo = Object.values(drivers).find((d) => d.driverId === dp.driver_id);
        if (!driverInfo) return null;
        return {
          grid_position: dp.position,
          probability: dp.probability,
          driver_name: `${driverInfo.forename} ${driverInfo.surname}`,
        };
      })
      .filter((dp) => dp !== null);
    
    setJoinedData(joined);
    

  }, [driverProbabilities, drivers])*/


  





  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold">Track Map</h2>

      {tooltip && (
        <div
          style={{ top: tooltip.y + 12, left: tooltip.x + 12 }}
          className="fixed z-50 pointer-events-none bg-gray-900 border border-gray-600 rounded px-3 py-2 text-sm text-white shadow-lg"
        >
          <div className="font-semibold">{tooltip.name}</div>
          <div>Grid: {tooltip.grid}</div>
          <div>Podium probability: {(tooltip.probability * 100).toFixed(1)}%</div>
        </div>
      )}

      <div className="flex items-center justify-center h-full">
        <div className="relative">
          {GridTracks.map((gridTrack, index) => {
            const { x, y } = getStartPoint(gridTrack.path);

            const isOdd = gridTrack.grid_position % 2 !== 0;

            const currentDriver = driverProbabilities.find((d) => d.start_position === gridTrack.grid_position);

            const t = (gridTrack.grid_position - 1) / 19;
            const hue = 120 * (1 - t);
            const lightness = 60 - 15 * t;
            const circleColor = `hsl(${hue}, 85%, ${lightness}%)`;

            return (
              <div key={gridTrack.grid_position}>
                <svg
                  width="1132"
                  height="455"
                  viewBox="0 0 1132 455"
                  fill="none"
                  className={index === 0 ? "relative" : "absolute inset-0"}
                  style={{ pointerEvents: "none" }}
                >
                  <g
                    transform={
                      isOdd
                        ? `translate(${SMALL_OFFSET_X}, ${SMALL_OFFSET_Y})`
                        : undefined
                    }
                  >
                    {/* Line*/}
                    <motion.path
                      key={`path-${simulationCount}-${type}`}
                      d={gridTrack.path}
                      fill="transparent"
                      strokeWidth="2"
                      stroke="rgba(255,255,255,0.7)"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 || 0 }}
                      transition={{
                        duration: 60 * (currentDriver ? (2 - (type === "simulation" ? currentDriver.podium_probability : (20 - currentDriver.finish_position) / 19)) : 1),
                      }}
                    />

                    {/* Tracking circle */}
                    <motion.circle
                      key={`circle-${simulationCount}-${type}`}
                      r={10}
                      fill={circleColor}
                      filter={`url(#glow-${gridTrack.grid_position})`}
                      style={{
                        offsetPath: `path("${gridTrack.path}")`,
                        offsetRotate: "0deg",
                        cursor: "pointer",
                        pointerEvents: "auto",
                      }}
                      initial={{ offsetDistance: "0%" }}
                      animate={{ offsetDistance: "100%" }}
                      transition={{
                        duration: 60 * (currentDriver ? (2 - (type === "simulation" ? currentDriver.podium_probability : (20 - currentDriver.finish_position) / 19)) : 1),
                      }}
                      onMouseEnter={(e) => {
                        if (!currentDriver) return;
                        setTooltip({
                          name: currentDriver.driver_name,
                          grid: currentDriver.start_position,
                          probability: currentDriver.podium_probability,
                          x: e.clientX,
                          y: e.clientY,
                        });
                      }}
                      onMouseLeave={() => setTooltip(null)}
                    />

                    {/* Label */}
                    <text
                      x={x}
                      y={y - 20}
                      fontSize="14"
                      fill="white"
                      textAnchor="end"
                    >
                      {gridTrack.grid_position}
                    </text>
                  </g>
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
