import React, { useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { getAccessTokenApi, logout } from "../../../api/auth";
import { getRolesSegunPermi } from "../../../api/menu";
import {
  HomeOutlined,
  UserOutlined,
  FireOutlined,
  FileProtectOutlined,
  BugOutlined,
  MonitorOutlined,
} from "@ant-design/icons";
import "./MenuSider.scss";

function MenuSider(props) {
  const { menuCollapsed, location, use } = props;
  const [menuData, setMenuData] = useState([]);
  const { Sider } = Layout;
  const {
    user: { rol },
  } = use;

  useEffect(() => {
    if (!rol) {
      logout();
      window.location.reload();
    } else {
      const accessToke = getAccessTokenApi();
      getRolesSegunPermi(accessToke, rol).then((response) => {
        const arrayMenu = [];
        response.menus.menus.forEach((item) => {
          item.active && arrayMenu.push(item);
        });
        setMenuData(arrayMenu);
      });
    }
  }, [rol]);

  function Icon(props) {
    const { Icono } = props;

    if (Icono === "HomeOutlined") {
      return <HomeOutlined />;
    } else {
      if (Icono === "UserOutlined") {
        return <UserOutlined />;
      } else {
        if (Icono === "FireOutlined") {
          return <FireOutlined />;
        } else {
          if (Icono === "FileProtectOutlined") {
            return <FileProtectOutlined />;
          } else {
            if (Icono === "BugOutlined") {
              return <BugOutlined />;
            } else {
              if (Icono === "MonitorOutlined") {
                return <MonitorOutlined />;
              } else {
                return null;
              }
            }
          }
        }
      }
    }
  }

  return (
    <Sider className="menu-sider" collapsed={menuCollapsed}>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[location.pathname]}
      >
        {menuData.map((item) => {
          return (
            <Menu.Item key={item.key} className="menu-sider-web__item">
              <Link to={item.url}>
                <Icon Icono={item.icon} />
                <span className="nav-text">{item.span}</span>
              </Link>
            </Menu.Item>
          );
        })}
      </Menu>
      <div className="menu-sider__versi">v1.0</div>
    </Sider>
  );
}

export default withRouter(MenuSider);
