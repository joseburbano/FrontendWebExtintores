import React from "react";
import { Button } from "antd";
import LogoCorhuila from "../../../assets/img/SVG/corhuila.svg";
import {
  PoweroffOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { logout } from "../../../api/auth";
//componente
import Nombre from "./Usu/index";
import Rol from "./Rol/index";

import "./MenuTop.scss";

export default function MenuTop(props) {
  const { menuCollapsed, setMenuCollapsed, use } = props;

  const logoutUser = () => {
    logout();
    window.location.reload();
  };
  return (
    <div className="menu-Top">
      <div className="menu-Top__left">
        <Button
          type="link"
          style={{ width: "80px" }}
          onClick={() => setMenuCollapsed(!menuCollapsed)}
        >
          {React.createElement(
            menuCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
          )}
        </Button>
        <img
          className="menu-Top__left-logo"
          src={LogoCorhuila}
          alt="Corhuila"
        />
      </div>
      <div className="menu-Top__rol">
        <Rol use={use} />
      </div>
      <div className="menu-Top__nombre">
        <Nombre use={use} />
      </div>
      <div className="menu-Top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
          Salir
        </Button>
      </div>
    </div>
  );
}
