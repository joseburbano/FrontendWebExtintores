import React from "react";
import { List, Modal, Button, notification } from "antd";
import {} from "../../../../api/roles";
import { getAccessTokenApi } from "../../../../api/auth";
import { deleteRolApi } from "../../../../api/roles";

import "./ListRoles.scss";

export default function ListRoles(props) {
  const { roles, setReloadRol, selectPermiso } = props;
  const { confirm } = Modal;

  const deleteRol = (uno) => {
    const accessToken = getAccessTokenApi();
    confirm({
      title: "Eliminando Rol",
      content: `¿Estas seguro de eliminar el registro ${uno.name}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteRolApi(accessToken, uno._id)
          .then((response) => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message,
            });
            setReloadRol(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor.",
            });
          });
      },
    });
  };
  return (
    <div className="covid-list">
      <List
        className="covid-list__Unolist"
        itemLayout="horizontal"
        dataSource={roles}
        renderItem={(uno) => (
          <Roless
            uno={uno}
            deleteRol={deleteRol}
            selectPermiso={selectPermiso}
          />
        )}
      />
    </div>
  );
}

function Roless(props) {
  const { uno, selectPermiso, deleteRol } = props;

  return (
    <List.Item
      actions={[
        <Button type="primary" onClick={() => selectPermiso(uno)}>
          Permisos
        </Button>,
        <Button type="danger" onClick={() => deleteRol(uno)}>
          Eliminar
        </Button>,
      ]}
    >
      <List.Item.Meta title={<a>{uno.name}</a>} />
    </List.Item>
  );
}
