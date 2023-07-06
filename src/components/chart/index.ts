import dynamic from "next/dynamic";

export const Chart = dynamic(async () => await import("react-apexcharts"), {
  ssr: false,
});

// ----------------------------------------------------------------------

export * from "./styles";
export * from "./useChart";
