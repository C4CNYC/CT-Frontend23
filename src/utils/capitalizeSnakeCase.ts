export function capitalize(s: string, joinSymbol?: string) {
  if (!joinSymbol) joinSymbol = " ";
  if (s.includes(" ")) {
    const words = s.split(" ");
    const res = words.map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLocaleLowerCase()
    );
    return res.join(joinSymbol);
  } else if (s.includes("_")) {
    const words = s.split("_");
    const res = words.map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLocaleLowerCase()
    );
    return res.join(joinSymbol);
  } else {
    return s.charAt(0).toUpperCase() + s.slice(1).toLocaleLowerCase();
  }
}
