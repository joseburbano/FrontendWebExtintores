import LayoutAdmin from "../layouts/LayoutAdmin";

import AdminHome from "../pages/Admin";
import AdminSingIn from "../pages/Admin/SingIn";
import adminUsers from "../pages/Admin/Users";

import Permisos from "../pages/Admin/Permisos";
import Extintores from "../pages/Admin/Extintores";
import ExtintorUser from "../pages/Admin/ExtintorUser";
import ExtintorAuxiliar from "../pages/Admin/ExtintorAuxiliar";
import Normativas from "../pages/Admin/Normativa";
import CondicionSegura from "../pages/Admin/NormativaUser";
import Extintor from "../pages/Admin/Extintor/index";
import Covid from "../pages/Admin/Covid";
import CovidUser from "../pages/Admin/CovidUser";
import Normativa from "../pages/Admin/NormativaParticipacion";
import Covids from "../pages/Admin/Covids";

import Error404 from "../pages/Error404";



const routes = [
  {
    path: "/",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/login",
        component: AdminSingIn,
        exact: true,
      },
      {
        path: "/",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/users",
        component: adminUsers,
        exact: true,
      },
      {
        path: "/admin/permisos",
        component: Permisos,
        exact: true,
      },
      {
        path: "/admin/extintor",
        component: Extintor,
        exact: true,
      },
      {
        path: "/admin/extintoruser",
        component: ExtintorUser,
        exact: true,
      },
      {
        path: "/admin/extintorauxiliar",
        component: ExtintorAuxiliar,
        exact: true,
      },
      {
        path: "/admin/covid",
        component: Covid,
        exact: true,
      },
      {
        path: "/admin/coviduser",
        component: CovidUser,
        exact: true,
      },
      {
        path: "/admin/normativa-participacion",
        component: Normativa,
        exact: true,
      },
      {
        path: "/admin/normativa-participacion-user",
        component: CondicionSegura,
        exact: true,
      },
      {
        path: "/admin/extintores/:url",
        component: Extintores,
        exact: true,
      },
      {
        path: "/admin/normativa/:url",
        component: Normativas,
        exact: true,
      },
      {
        path: "/admin/covids/:url",
        component: Covids,
        exact: true,
      },
      {
        component: Error404,
      },
    ],
  },
];

export default routes;
