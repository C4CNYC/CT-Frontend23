import { Iconify } from "@components";
import { PATH_AUTH, PATH_PAGE } from "@routes/paths";

// ----------------------------------------------------------------------

const navConfig = [
  {
    title: "Home",
    icon: <Iconify icon="eva:home-fill" />,
    path: "/",
  },
  {
    title: "Price",
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_PAGE.components,
  },
  {
    title: "Login",
    icon: <Iconify icon="ic:round-grain" />,
    path: PATH_AUTH.singIn,
  },
];

export default navConfig;
