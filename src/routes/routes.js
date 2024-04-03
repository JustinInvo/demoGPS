import { AdminLayout, DriverLayout, DefaultLayout } from "../layouts/index"
import { Admin, Driver, Login } from "../pages"

const routesClient = [
  {
    path: "/",
    layout: DefaultLayout,
    component: Login,
    exact: true,
  },
  {
    path: "/admin/",
    layout: AdminLayout,
    component: Admin,
    exact: true,
  },
  {
    path: "/driver/",
    layout: DriverLayout,
    component: Driver,
    exact: true,
  }
];
export default routesClient