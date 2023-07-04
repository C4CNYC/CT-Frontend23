export function convertNumber(num: number): string {
  if (num >= 1000 && num < 1000000) {
    return (num / 1000).toFixed(1) + "k";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else {
    return num.toString();
  }
}
