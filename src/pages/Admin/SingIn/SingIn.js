import React from "react";
import { Layout, Tabs } from "antd";
import { Redirect } from "react-router-dom";
import Logo from "../../../assets/img/SVG/corhuila.svg";
import LoginForm from "../../../components/Admin/LoginForm";
import { getAccessTokenApi } from "../../../api/auth";

import "./SingIn.scss";

export default function SingIn() {
  const { Content } = Layout;
  const { TabPane } = Tabs;

  if (getAccessTokenApi()) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Layout className="sing-in">
        <Content className="sing-in__content">
          <h1 className="sing-in__content-logo">
            <img
              src={Logo}
              alt="Corhuila"
              style={{ witdh: "200px", height: "200px" }}
            />
          </h1>
          <div className="sing-in__content-tabs">
            <Tabs type="card">
              <TabPane tab={<span>Inicio de sesión</span>}>
                <LoginForm />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </div>
  );
}
