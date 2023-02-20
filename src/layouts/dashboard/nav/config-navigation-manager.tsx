// routes
import { PATH_DASHBOARD } from "@routes/paths";
// components
import SvgColor from "@components/svg-color";

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const ICONS = {
  user: icon("ic_user"),
  invoice: icon("ic_invoice"),
  analytics: icon("ic_analytics"),
  dashboard: icon("ic_dashboard"),
};

const navConfigManager = [
  // GENERAL
  // ----------------------------------------------------------------------
  // {
  //   subheader: "general",
  //   items: [
  //     { title: "app", path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
  //     {
  //       title: "analytics",
  //       path: PATH_DASHBOARD.general.analytics,
  //       icon: ICONS.analytics,
  //     },
  //   ],
  // },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      // organizations
      { title: "Profile", path: PATH_DASHBOARD.organization.general },
      { title: "Classes", path: PATH_DASHBOARD.organization.schools },
      { title: "Students", path: PATH_DASHBOARD.organization.members },
      { title: "Lessons", path: PATH_DASHBOARD.organization.contacts },
    ],
  },
];
export default navConfigManager;
