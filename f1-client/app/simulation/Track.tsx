import { motion } from "framer-motion";

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

interface RaceProbabilities {
  driver: string,
  position: number,
  probability: number,
}

const RaceProbabilities: RaceProbabilities[] = [
  { driver: "Driver A", position: 1, probability: 0.32 },
  { driver: "Driver B", position: 2, probability: 0.90 },
  { driver: "Driver C", position: 3, probability: 0.78 },
  { driver: "Driver D", position: 4, probability: 0.87 },
  { driver: "Driver E", position: 5, probability: 0.40 },
]

export default function Track() {
  const SMALL_OFFSET_X = (1132 - 1000) / 2;
  const SMALL_OFFSET_Y = (455 - 370) / 2;
  return (
    <div className="h-full">
      <h2 className="text-2xl font-bold">Track Map</h2>
      <div className="flex items-center justify-center h-full">
        <div className="relative">
          {GridTracks.map((gridTrack, index) => {
            const { x, y } = getStartPoint(gridTrack.path);

            const isOdd = gridTrack.grid_position % 2 !== 0;

            return (
              <div key={gridTrack.grid_position}>
                <svg
                  width="1132"
                  height="455"
                  viewBox="0 0 1132 455"
                  fill="none"
                  className={index === 0 ? "relative" : "absolute inset-0"}
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
                      d={gridTrack.path}
                      fill="transparent"
                      strokeWidth="2"
                      stroke="rgba(255,255,255,0.7)"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 20,
                        ease: [0.22, 1, 0.36, 1],
                        delay: index * 0.1,
                      }}
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
