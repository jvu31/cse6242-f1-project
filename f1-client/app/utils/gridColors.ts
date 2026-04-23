export const getGridPositionColor = (position: number): string => {
  const t = (position - 1) / 19;
  const hue = 120 * (1 - t);
  const lightness = 60 - 15 * t;
  return `hsl(${hue}, 85%, ${lightness}%)`;
};
