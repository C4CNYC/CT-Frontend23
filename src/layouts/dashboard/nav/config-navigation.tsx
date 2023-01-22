// routes
import { PATH_DASHBOARD } from "../../../routes/paths";
// components
import SvgColor from "../../../components/svg-color";

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

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      { title: "app", path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard },
      {
        title: "analytics",
        path: PATH_DASHBOARD.general.analytics,
        icon: ICONS.analytics,
      },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      // USER
      {
        title: "Organisation",
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: "profile",
            path: PATH_DASHBOARD.user.profile,
            icon: ICONS.user
          },
          { title: "General",
            path: PATH_DASHBOARD.user.general,
            icon: ICONS.user
          },
          { title: "Schools",
            path: PATH_DASHBOARD.user.schools,
            icon: ICONS.user
          },
          { title: "Contacts",
            path: PATH_DASHBOARD.user.contacts,
            icon: ICONS.user
          },
        ],
      },

      // INVOICE
      {
        title: "invoice",
        path: PATH_DASHBOARD.invoice.root,
        icon: ICONS.invoice,
        children: [
          { title: "list", path: PATH_DASHBOARD.invoice.list },
          { title: "details", path: PATH_DASHBOARD.invoice.demoView },
          { title: "create", path: PATH_DASHBOARD.invoice.new },
          { title: "edit", path: PATH_DASHBOARD.invoice.demoEdit },
        ],
      },
    ],
  }
]
export default navConfig;
