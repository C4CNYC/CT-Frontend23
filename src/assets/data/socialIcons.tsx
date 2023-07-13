import React from "react";

import {
  AiFillDribbbleCircle,
  AiFillFacebook,
  AiFillInstagram,
  AiFillLinkedin,
  AiFillTwitterSquare,
  AiFillYoutube,
  AiOutlineWhatsApp,
} from "react-icons/ai";
import { BsTelegram } from "react-icons/bs";
import { SiViber } from "react-icons/si";

interface SocialTypes {
  name: string;
  icon: React.ReactElement;
}

type Props = Record<string, React.ReactElement>;

export const SOCIAL_ICONS: Props = {
  youtube: <AiFillYoutube size={28} color="#FF0000" />,
  facebook: <AiFillFacebook size={28} color="#4267B2" />,
  twitter: <AiFillTwitterSquare size={28} color="#1DA1F2" />,
  linkedin: <AiFillLinkedin size={28} color="#0077b5" />,
  telegram: <BsTelegram size={28} color="#229ED9" />,
  whatsapp: <AiOutlineWhatsApp size={28} color="#25D366" />,
  viber: <SiViber size={28} color="#7360F2" />,
  instagram: <AiFillInstagram size={28} color="#E1306C" />,
  dribble: <AiFillDribbbleCircle size={28} color="#ea4c89" />,
};

export const Socials: SocialTypes[] = [
  {
    name: "youtube",
    icon: <AiFillYoutube size={28} color="#FF0000" />,
  },
  {
    name: "facebook",
    icon: <AiFillFacebook size={28} color="#4267B2" />,
  },
  {
    name: "twitter",
    icon: <AiFillTwitterSquare size={28} color="#1DA1F2" />,
  },
  {
    name: "linkedin",
    icon: <AiFillLinkedin size={28} color="#0077b5" />,
  },
  {
    name: "telegram",
    icon: <BsTelegram size={28} color="#229ED9" />,
  },
  {
    name: "whatsapp",
    icon: <AiOutlineWhatsApp size={28} color="#25D366" />,
  },
  {
    name: "viber",
    icon: <SiViber size={28} color="#7360F2" />,
  },
  {
    name: "instagram",
    icon: <AiFillInstagram size={28} color="#E1306C" />,
  },
  {
    name: "dribble",
    icon: <AiFillDribbbleCircle size={28} color="#ea4c89" />,
  },
];
