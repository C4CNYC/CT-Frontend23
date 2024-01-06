export function capitalize(s: string, joinSymbol?: string) {
  if (!joinSymbol) joinSymbol = " ";
  if (s.includes(" ")) {
    const words = s.split(" ");
    words.map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLocaleLowerCase()
    );
    return words.join(joinSymbol);
  } else if (s.includes("_")) {
    const words = s.split("_");
    words.map(
      (w) => w.charAt(0).toUpperCase() + w.slice(1).toLocaleLowerCase()
    );
    return words.join(joinSymbol);
  } else {
    return s;
  }
}
