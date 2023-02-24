import { PATH_AUTH, PATH_PAGE } from "@routes/paths";
import Iconify from "@components/iconify";

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
    path: PATH_AUTH.loginUnprotected,
  },
];

export default navConfig;
