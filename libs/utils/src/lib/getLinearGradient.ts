import { alpha } from "@mui/system";

export const getLinearGradient = (coverColor: string) => {
  const baseColor = alpha(coverColor, 0.6);
  const gradient = `linear-gradient(75deg, ${coverColor} 22% , ${baseColor} 34% , ${baseColor} 58%, ${coverColor} 90%)`;

  return gradient;
};

export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
