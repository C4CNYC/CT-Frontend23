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
  youtube: <AiFillYoutube size={32} />,
  facebook: <AiFillFacebook size={32} />,
  twitter: <AiFillTwitterSquare size={32} />,
  linkedin: <AiFillLinkedin size={32} />,
  telegram: <BsTelegram size={32} />,
  whatsapp: <AiOutlineWhatsApp size={32} />,
  viber: <SiViber size={32} />,
  instagram: <AiFillInstagram size={32} />,
  dribble: <AiFillDribbbleCircle size={32} />,
};

export const Socials: SocialTypes[] = [
  {
    name: "youtube",
    icon: <AiFillYoutube size={32} />,
  },
  {
    name: "facebook",
    icon: <AiFillFacebook size={32} />,
  },
  {
    name: "twitter",
    icon: <AiFillTwitterSquare size={32} />,
  },
  {
    name: "linkedin",
    icon: <AiFillLinkedin size={32} />,
  },
  {
    name: "telegram",
    icon: <BsTelegram size={32} />,
  },
  {
    name: "whatsapp",
    icon: <AiOutlineWhatsApp size={32} />,
  },
  {
    name: "viber",
    icon: <SiViber size={32} />,
  },
  {
    name: "instagram",
    icon: <AiFillInstagram size={32} />,
  },
  {
    name: "dribble",
    icon: <AiFillDribbbleCircle size={32} />,
  },
];
