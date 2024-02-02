export const createRandomAvatar = async (user?: boolean): Promise<File> => {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  const emoji = generateRandomEmoji(user);

  const EMOJI_SIZE = 30;
  canvas.width = EMOJI_SIZE + 15;
  canvas.height = EMOJI_SIZE + 15;

  if (context) {
    context.fillStyle = getRandomColor();
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.font = `${EMOJI_SIZE}px sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillStyle = "#000";

    const textMetrics = context.measureText(emoji);
    const emojiWidth = Math.min(textMetrics.width, EMOJI_SIZE);
    const emojiHeight = EMOJI_SIZE * 0.8;

    const scale = Math.min(EMOJI_SIZE / emojiWidth, EMOJI_SIZE / emojiHeight);

    const x = canvas.width / 2;
    const y = canvas.height / 2;

    context.save();
    context.scale(scale, scale);
    context.fillText(emoji, x / scale, y / scale);
    context.restore();
  }

  const dataUrl = canvas.toDataURL("image/png");

  const response = await fetch(dataUrl);
  const blob = await response.blob();

  const file = new File([blob], "emoji.png", { type: "image/png" });

  return file;
};

export const generateRandomEmoji = (user?: boolean): string => {
  const arrayEmoji = user ? USER_EMOJI : EMOJI_ARRAY;
  const emoji = arrayEmoji[Math.floor(Math.random() * arrayEmoji.length)];
  return emoji;
};

const getRandomColor = (cover?: boolean): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  if (cover) {
    return color;
  }
  const transparency = "70";
  color += transparency;
  return color;
};
const USER_EMOJI = [
  "😂",
  "😝",
  "😁",
  "😜",
  "😍",
  "😉",
  "😳",
  "😊",
  "🤩",
  "😉",
  "🤑",
  "😏",
  "😇",
  "🙂",
  "🤣",
  "😄",
  "😃",
  "😀",
  "😎",
  "🙃",
];
const EMOJI_ARRAY = [
  "😂",
  "😝",
  "😁",
  "🍻",
  "🔥",
  "🌈",
  "☀",
  "🎈",
  "🌹",
  "🎀",
  "⚽",
  "🏁",
  "🐻",
  "🐶",
  "🐬",
  "🐟",
  "🍀",
  "👀",
  "🚗",
  "🍎",
  "💝",
  "💙",
  "😍",
  "😉",
  "😓",
  "😳",
  "💪",
  "🔑",
  "💖",
  "🌟",
  "🌺",
  "🎶",
  "🏈",
  "⚾",
  "🏆",
  "🐩",
  "🐎",
  "💣",
  "🍓",
  "💘",
  "💜",
  "👊",
  "😜",
  "💎",
  "🚀",
  "🌙",
  "🎁",
  "⛄",
  "🌊",
  "⛵",
  "🏀",
  "🎱",
  "💰",
  "🐰",
  "🐍",
  "🐫",
  "🚲",
  "🍉",
  "💛",
  "💚",
  "🤖",
  "👾",
];
