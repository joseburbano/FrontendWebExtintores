import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  Button,
  notification,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";

import { addRolApi } from "../../../../api/roles";
import { getAccessTokenApi } from "../../../../api/auth";

export default function AddEditRoles(props) {
  const { setIsVisibleModal, setReloadRol, roles } = props;
  const [rolData, setRolData] = useState({});

  useEffect(() => {
    if (roles) {
      setRolData(roles);
    } else {
      setRolData({});
    }
  }, [roles]);

  const processRol = (e) => {
    e.preventDefault();

    const { name } = rolData;

    if (!name) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (!roles) {
        addRol();
      }
    }
  };

  const addRol = () => {
    const token = getAccessTokenApi();
    addRolApi(token, rolData)
      .then((response) => {
        const typeNotification = response.code === 200 ? "success" : "warning";
        notification[typeNotification]({
          message: response.message,
          icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        });
        setIsVisibleModal(false);
        setReloadRol(true);
        setRolData({});
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
  };

  return (
    <div className="extintor">
      <AddEditForm
        rolData={rolData}
        setRolData={setRolData}
        roles={roles}
        processRol={processRol}
      />
    </div>
  );
}

function AddEditForm(props) {
  const { rolData, setRolData, processRol } = props;

  return (
    <Form className="form-add" onSubmit={processRol}>
      <Input
        style={{ width: "100%" }}
        placeholder="Nobre del Rol"
        value={rolData.name}
        onChange={(e) =>
          setRolData({
            ...rolData,
            name: e.target.value,
          })
        }
      />

      <Button
        type="primary"
        htmlType="submit"
        className="boton"
        onClick={processRol}
      >
        Crear Rol
      </Button>
    </Form>
  );
}
