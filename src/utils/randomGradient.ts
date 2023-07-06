const HEX_STRING = "0123456789abcdef";
export const randomGradient = () => {
  const colorOne = randomColor();
  const colorTwo = randomColor();
  const angle = Math.floor(Math.random() * 360);

  return `linear-gradient(${angle}deg, ${colorOne}, ${colorTwo})`;
};

const randomColor = () => {
  let hexCode = "#";
  for (let i = 0; i < 6; i++) {
    hexCode =
      hexCode + HEX_STRING[Math.floor(Math.random() * HEX_STRING.length)];
  }
  return hexCode;
};
