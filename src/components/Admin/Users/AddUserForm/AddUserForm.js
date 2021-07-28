import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import {
  UserOutlined,
  AuditOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
  SkinOutlined,
} from "@ant-design/icons";
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";


import "./AddUserForm.scss";

export default function EditUserForm(props) {
  const { setIsVisibleModal, setReloadUsers, roles } = props;
  const [userData, setUserData] = useState({});

  const addUser = (event) => {
    event.preventDefault();

    if (
      !userData.fullname ||
      !userData.cedula ||
      !userData.tipo ||
      !userData.cargo ||
      !userData.tel ||
      !userData.rol ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguale.",
      });
    } else {
      const accesToken = getAccessTokenApi();

      signUpAdminApi(accesToken, userData)
        .then((response) => {
          notification["success"]({
            message: response,
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch((err) => {
          notification["error"]({
            message: err,
          });
        });
    }
  };
  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
        roles={roles}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser, roles } = props;
  const { Option } = Select;


  return (
    <Form className="form-add" onSubmit={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Nombre Completo"
              value={userData.fullname}
              onChange={(e) =>
                setUserData({ ...userData, fullname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<AuditOutlined />}
              placeholder="Cedula"
              value={userData.cedula}
              onChange={(e) =>
                setUserData({ ...userData, cedula: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Seleccionar Usuario"
              onChange={(e) => setUserData({ ...userData, tipo: e })}
              defaultValue={userData.tipo}
            >
              <Option value="estudiante">Estudiante</Option>
              <Option value="docente">Docente</Option>
              <Option value="administrativo">Administrativo</Option>
              <Option value="directivo">Directivo</Option>
              <Option value="contratistas">Contratista</Option>
              <Option value="visitante">Visitante</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<SkinOutlined />}
              placeholder="Cargo"
              value={userData.cargo}
              onChange={(e) =>
                setUserData({ ...userData, cargo: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<PhoneOutlined />}
              placeholder="Telefono"
              value={userData.tel}
              onChange={(e) =>
                setUserData({ ...userData, tel: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={24}>
          <Form.Item>
            <Select
              placeholder="Seleccionar un Rol"
              onChange={(e) => setUserData({ ...userData, rol: e })}
              defaultValue={userData.rol}
            >
              {roles.map((rol) => (
                <option value={rol.name}>
                  {rol.name}
                </option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir Contraseña"
              onChange={(e) =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          onClick={addUser}
          htmlType="submit"
          className="btn-submit"
        >
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
