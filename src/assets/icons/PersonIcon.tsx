import { type FC, memo } from "react"

import { Box, BoxProps } from "@mui/material";

const PersonIcon: FC<BoxProps> = memo((props) => {
  return (
    <Box {...props}>
      <svg xmlns="http://www.w3.org/2000/svg" width="31" height="29" viewBox="0 0 31 29" fill="none">
        <rect x="0.328125" y="0.638672" width="29.7812" height="28.2429" rx="14.1215" fill="#919EAB" fillOpacity="0.32"/>
        <path d="M21.9781 19.6387C22.4555 19.6387 22.9134 19.449 23.2509 19.1115C23.5885 18.7739 23.7781 18.3161 23.7781 17.8387V7.93867C23.7781 7.46128 23.5885 7.00345 23.2509 6.66588C22.9134 6.32831 22.4555 6.13867 21.9781 6.13867H12.4921C12.8071 6.68767 12.9781 7.30867 12.9781 7.93867H21.9781V17.8387H13.8781V19.6387M17.4781 10.6387V12.4387H12.0781V24.1387H10.2781V18.7387H8.47813V24.1387H6.67813V16.9387H5.32812V12.4387C5.32812 11.9613 5.51777 11.5034 5.85533 11.1659C6.1929 10.8283 6.65074 10.6387 7.12813 10.6387H17.4781ZM11.1781 7.93867C11.1781 8.41606 10.9885 8.8739 10.6509 9.21146C10.3134 9.54903 9.85552 9.73867 9.37813 9.73867C8.90074 9.73867 8.4429 9.54903 8.10533 9.21146C7.76777 8.8739 7.57812 8.41606 7.57812 7.93867C7.57812 7.46128 7.76777 7.00345 8.10533 6.66588C8.4429 6.32831 8.90074 6.13867 9.37813 6.13867C9.85552 6.13867 10.3134 6.32831 10.6509 6.66588C10.9885 7.00345 11.1781 7.46128 11.1781 7.93867Z" fill="#0198ED"/>
        <g filter="url(#filter0_d_80344_41197)">
          <circle cx="22.6562" cy="6.63867" r="3" fill="#EE467A"/>
        </g>
        <defs>
          <filter id="filter0_d_80344_41197" x="15.6562" y="3.63867" width="14" height="14" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0.933333 0 0 0 0 0.27451 0 0 0 0 0.478431 0 0 0 0.2 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_80344_41197"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_80344_41197" result="shape"/>
          </filter>
        </defs>
      </svg>
    </Box>
  )
});

export default PersonIcon;
