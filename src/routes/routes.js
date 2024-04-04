import { DefaultLayout } from "../layouts/index"
import { Login } from "../pages"
import routesAdmin from "./routes.admin"
import routesClient from "./routes.driver"
// import {Error404} from "../pages"
// import {BasicLayout} from "../layouts"

// const routes = [ ...routesAdmin, ...routesClient, 
//   {
//     path: "*",
//     layout: BasicLayout,
//     component: Error404,
//   },
// ]
const routes = [
  {
    path: "/",
    layout: DefaultLayout,
    component: Login,
    exact: true,
  },
  ...routesAdmin, 
  ...routesClient]
// [[{}] [{}]]
// [{}, {}] para tenerlo asi sirven los '...'
export default routes