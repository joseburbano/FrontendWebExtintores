import React, { useState, useEffect } from "react";
import { notification, Button, Spin } from "antd";
import Modal from "../../../components/Modal";
import AddEditRoles from "../../../components/Admin/Roles/AddEditRoles";
import ListRoles from "../../../components/Admin/Roles/ListRoles";
import AddPermisosRoles from "../../../components/Admin/Roles/AddPermisosRoles";
import { getRolApi } from "../../../api/roles";
import { getAccessTokenApi } from "../../../api/auth";

import "./Permisos.scss";

export default function Permisos() {
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [reloadRol, setReloadRol] = useState(false);
  const [roles, setRoles] = useState(null);

  useEffect(() => {
    const accessToken = getAccessTokenApi();
    getRolApi(accessToken)
      .then((response) => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setRoles(response.roles);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor.",
        });
      });
    setReloadRol(false);
  }, [reloadRol]);

  const AddRol = () => {
    setIsVisibleModal(true);
    setModalTitle("Crear roles");
    setModalContent(
      <AddEditRoles
        setIsVisibleModal={setIsVisibleModal}
        setReloadRol={setReloadRol}
        roles={null}
      />,
    );
  };

  const selectPermiso = (uno) => {
    setIsVisibleModal(true);
    setModalTitle("Asignar permisos");
    setModalContent(
      <AddPermisosRoles uno={uno} setIsVisibleModal={setIsVisibleModal} />,
    );
  };

  if (!roles) {
    return (
      <Spin tip="Cargando" style={{ width: "100%", padding: "200px 0" }} />
    );
  }
  return (
    <div className="normativa">
      <div className="botones">
        <Button type="primary" onClick={() => AddRol()}>
          Crear Roles
        </Button>
      </div>

      <ListRoles
        roles={roles}
        setReloadRol={setReloadRol}
        selectPermiso={selectPermiso}
      />

      <Modal
        width="75%"
        title={modalTitle}
        isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}
      >
        {modalContent}
      </Modal>
    </div>
  );
}
