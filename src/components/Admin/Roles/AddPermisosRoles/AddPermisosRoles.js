import React, { useState, useEffect } from "react";
import { Transfer, notification } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { getPermisos, actualizarPermiso } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

export default function AddPermisosRoles(props) {
  const { uno } = props;
  const [permisoData, setPermisoData] = useState([]);
  const [targetKeys, setTargetKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const accessToke = getAccessTokenApi();
    getPermisos(accessToke).then((response) => {
      const arrayPermiso = [];
      response.permisos.forEach((item) => {
        item.active && arrayPermiso.push(item);
      });
      setPermisoData(arrayPermiso);
    });
  }, []);

  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);

    //setPermisoDosData.idPermi = moveKeys;

    var datosCargar = { idRol: uno._id, idPermi: moveKeys };

    const accessToke = getAccessTokenApi();
    actualizarPermiso(accessToke, datosCargar)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys]);
  };

  return (
    <div>
      <Transfer
        dataSource={permisoData}
        targetKeys={targetKeys}
        selectedKeys={selectedKeys}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        render={(item) => item.name}
      />
    </div>
  );
}
