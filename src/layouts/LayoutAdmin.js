import React, { useState } from "react";
import { Layout } from "antd";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SingIn";
import useAuth from "../hooks/useAuth";
import jwt from "jwt-decode";
import { ACCESS_TOKEN } from "../utils/constants";
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const [menuCollapsed, setMenuCollapsed] = useState(true);
  const { user, isLoading } = useAuth();
  const { Header, Content, Footer } = Layout;
  let usuario;
  let use;

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  try {
    usuario = localStorage.getItem("accessToken");
    localStorage.setItem(ACCESS_TOKEN, usuario);
    use = jwt(usuario);
  } catch (error) {
    console.log("Error al extraer datos de localStored.");
  }
  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider use={use} menuCollapsed={menuCollapsed} />
        <Layout
          className="layout-admin"
          style={{ marginLeft: menuCollapsed ? "80px" : "200px" }}
        >
          <Header
            className="layout-admin__header"
            style={{ position: "fixed", zIndex: 1, width: "100%" }}
          >
            <MenuTop
              use={use}
              menuCollapsed={menuCollapsed}
              setMenuCollapsed={setMenuCollapsed}
            />
          </Header>
          <Content className="layout-admin__content">
            <LoadRoutes routes={routes} />
          </Content>
          <Footer className="layout-admin__footer">
            CORPORACIÓN UNIVERSITARIA DEL HUILA "CORHUILA" v1.0
          </Footer>
        </Layout>
      </Layout>
    );
  }
  return null;
}

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
