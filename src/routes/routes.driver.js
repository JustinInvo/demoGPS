import { DriverLayout } from "../layouts"
import { 
  TablesDriver,
  GpsDriver,
} from "../pages/Driver"

const routesDriver = [
  {
    path: "/driver/tables",
    layout: DriverLayout,
    component: TablesDriver,
    exact: true,
  },
  {
    path: "/driver/tables/:career",
    layout: DriverLayout,
    component: GpsDriver,
    exact: true,
  },
];
export default routesDriver