import { PATH_DASHBOARD } from "@routes/paths";

const navConfigManager = [
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
