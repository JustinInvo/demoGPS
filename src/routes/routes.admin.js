import { AdminLayout } from "../layouts"
import {
  TablesAdmin,
  GpsAdmin,
} from "../pages/Admin"

const routesAdmin = [
  {
    path: "/admin/tables",
    layout: AdminLayout,
    component: TablesAdmin,
    exact: true,
  },
  {
    path: "/admin/tables/:career",
    layout: AdminLayout,
    component: GpsAdmin,
    exact: true,
  },
];
export default routesAdmin